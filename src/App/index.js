import React, {createContext, useEffect, useReducer, useState} from "react";
import Menu from "../Menu";
import Nav from "../Nav";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Games from "../Games";
import ToggleButton from "./ToggleButton";
import Room from "../Room";
import Lobby from "../Lobby";
import reducer, {addHandler} from "./reducer";
import mobile from "is-mobile";
import {Helmet} from "react-helmet";
import ErrorMessage from "./ErrorMessage";
import "./styles.scss";
import {resumeSession} from "../api";

export const AppContext = createContext();

export const PORTRAIT = "portrait";
export const LANDSCAPE = "landscape";
export const TOGGLE_ORIENTATION = "TOGGLE_ORIENTATION";
export const SHOW_ERROR = "SHOW_ERROR";
export const CLEAR_ERROR = "CLER_ERROR";

addHandler(TOGGLE_ORIENTATION, action => {
  if (!mobile()) {
    return;
  }
  return {
    orientation:
      action.orientation === 0 || action.orientation === 180
        ? PORTRAIT
        : LANDSCAPE
  };
});

addHandler(SHOW_ERROR, action => {
  return {
    errorMessage: action.error
  };
});

addHandler(CLEAR_ERROR, action => {
  return {
    errorMessage: null
  };
});

const initialState = {
  orientation: LANDSCAPE,
  showRooms: false,
  mobile: mobile()
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [profile, setProfile] =  useState(null)

  useEffect(() => {
    resumeSession().then(profile => {
      setProfile(profile)
    }).catch(err => {
      alert(err)
    })
  }, []);

  useEffect(() => {
    dispatch({
      type: TOGGLE_ORIENTATION,
      orientation: window.orientation
    });
    window.addEventListener(
      "orientationchange",
      function() {
        dispatch({
          type: TOGGLE_ORIENTATION,
          orientation: window.orientation
        });
      },
      false
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        ...profile
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
        {state.errorMessage && <ErrorMessage message={state.errorMessage} />}
      </Router>
    </AppContext.Provider>
  );
}

export default App;
