import React from "react";
import "./default.scss";
import Header from "./components/header/index";
import Homepage from "./pages/homePage/index";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
};

export default App;
