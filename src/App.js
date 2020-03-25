import React, { useEffect, createContext } from "react";
import Menu from "./Menu";
import Nav from "./Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import Lobby from "./Lobby";
import ToggleButton from "./Lobby/ToggleButton";

import "./App.scss";
import Table from "./Table";

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
        </div>
        <Menu />
        <aside className="games">
          <ToggleButton />
          <Lobby />
        </aside>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
