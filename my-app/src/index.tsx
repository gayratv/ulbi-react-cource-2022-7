import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./Users/services/reduxStore";
import "./Users/slices/usersSliceTest";
import "./Users/slices/bookSliceTest";

console.log("START");
console.log("store.getState() ", store.getState());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
