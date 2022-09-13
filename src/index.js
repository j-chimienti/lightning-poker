import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "typeface-oswald";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";


ReactDOM.render(<App />, document.getElementsByTagName("main")[0]);

reportWebVitals();
serviceWorkerRegistration.register();
