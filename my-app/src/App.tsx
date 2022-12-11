import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { userSliceTest } from "./Redux/slices/usersSliceTest";

function App() {
  const onClickReg = () => {
    userSliceTest();
  };
  return (
    <div className="App">
      <p>Привет</p>
      <button onClick={onClickReg}>Test</button>
    </div>
  );
}

export default App;
