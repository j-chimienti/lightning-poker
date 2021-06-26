import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "typeface-oswald";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
});

ReactDOM.render(<App />, document.getElementsByTagName("main")[0]);

reportWebVitals();
serviceWorkerRegistration.register();
