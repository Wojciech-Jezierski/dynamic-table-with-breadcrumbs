import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { Table } from "./components/Table/Table";
import { Details } from "./components/Details/Details";
import { routerPaths } from "./config/router";

function App() {
  const { details } = routerPaths;
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Table />} />
          <Route path={details.url} element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
