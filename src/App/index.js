import React, { useEffect, createContext } from "react";
import Menu from "../Menu";
import Nav from "../Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import Games from "../Games";
import ToggleButton from "./ToggleButton";
import Table from "../Table";
import Lobby from "../Lobby";
import dispatch from "../dispatch";
import { WARM_UP } from "../lib/types";

import "./styles.scss";

export const AppContext = createContext();

function App() {
  const [user, loading, error] = useAuthState(firebase.auth());

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

  useEffect(() => {
    if (user && user.uid) {
      dispatch({ type: WARM_UP, tableId: "dev_private_1" });
    }
  }, [user]);

  const [{ balance, hash } = { balance: 0 }] = useDocumentData(
    user &&
      user.uid &&
      firebase
        .firestore()
        .collection("profiles")
        .doc(user.uid)
  );

  return (
    <AppContext.Provider
      value={{
        balance,
        profileId: user && user.uid,
        profileHash: hash
      }}
    >
      <Router>
        <Nav />
        <div className="app">
          <Route path="/:tableId" component={Table} />
          <Route path="/" exact component={Lobby} />
        </div>
        <Menu />
        <aside className="games-drawer">
          <Route path="/:tableId" component={ToggleButton} />
          <Route path="/:tableId" component={Games} />
        </aside>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
