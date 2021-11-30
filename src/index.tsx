import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "App";
import "./index.css";
import User from "pages/User";
import { store } from "store/configureStore";

ReactDOM.render(
  <>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Provider>
    </Router>
  </>,
  document.getElementById("root")
);
