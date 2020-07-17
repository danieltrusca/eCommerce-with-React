import React from "react";
import Header from "../components/header/index";
import Footer from "../components/Footer/index";

const MainLayout = (props) => {
  return (
    <div>
      <Header {...props} />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
