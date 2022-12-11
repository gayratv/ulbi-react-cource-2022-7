import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { userSliceTest } from "./Redux/slices/usersSliceTest";
import { testFetchArticle } from "./Redux/services/fetchArticleByIdTest";

function App() {
  const onClickReg = () => {
    // userSliceTest();
    testFetchArticle();
  };
  return (
    <div className="App">
      <p>Привет</p>
      <button onClick={onClickReg}>Test</button>
    </div>
  );
}

export default App;
