import React from "react";
// import Logo from "./Logo";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.scss";
// import HiddenCard from "./HiddenCard";

// import Card from "./Card";
import Table from "./Table";

function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/:tableId" component={Table} />
        {/* <Logo /> */}
      </div>
    </Router>
  );
}

export default App;
