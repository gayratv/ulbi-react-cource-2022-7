import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./Redux/services/reduxStore";
import "./Redux/slices/usersSliceTest";
import "./Redux/slices/bookSliceTest";

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
