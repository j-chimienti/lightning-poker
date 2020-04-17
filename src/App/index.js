import React, { useEffect, createContext, useReducer } from "react";
import Menu from "../Menu";
import Nav from "../Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import Games from "../Games";
import ToggleButton from "./ToggleButton";
import Room from "../Room";
import Lobby from "../Lobby";
import reducer, { addHandler } from "./reducer";
import "./styles.scss";
import mobile from "is-mobile";
import { Helmet } from "react-helmet";

export const AppContext = createContext();

export const PORTRAIT = "portrait";
export const LANDSCAPE = "landscape";
export const TOGGLE_ORIENTATION = "TOGGLE_ORIENTATION";

addHandler(TOGGLE_ORIENTATION, (action) => {
  if (!mobile()) {
    return;
  }
  return {
    orientation:
      action.orientation === 0 || action.orientation === 180
        ? PORTRAIT
        : LANDSCAPE,
  };
});

const initialState = {
  orientation: LANDSCAPE,
  showRooms: false,
  mobile: mobile(),
};

function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: TOGGLE_ORIENTATION,
      orientation: window.orientation,
    });
    window.addEventListener(
      "orientationchange",
      function () {
        dispatch({
          type: TOGGLE_ORIENTATION,
          orientation: window.orientation,
        });
      },
      false
    );
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      console.log(error);
    }

    if (!user) {
      firebase.auth().signInAnonymously();
    }
  }, [user, loading, error]);

  const [{ balance, hash } = { balance: 0 }] = useDocumentData(
    user &&
      user.uid &&
      firebase.firestore().collection("profiles").doc(user.uid)
  );

  return (
    <AppContext.Provider
      value={{
        state,
        balance,
        profileId: user && user.uid,
        profileHash: hash,
        dispatch,
      }}
    >
      <Router>
        <Helmet>
          <body data-games={state.showRooms ? "visible" : "hidden"} />
        </Helmet>
        <Nav />
        <div
          className={`app${mobile ? " mobile" : ""}${
            state.orientation === PORTRAIT ? " portrait" : ""
          }`}
        >
          <Route path="/:tableId" component={Room} />
          <Route path="/" exact component={Lobby} />
        </div>
        <Menu />
        {!state.mobile && (
          <aside className="games-drawer">
            <Route path="/:tableId" component={ToggleButton} />
            <Route path="/:tableId" component={Games} />
          </aside>
        )}
      </Router>
    </AppContext.Provider>
  );
}

export default App;
