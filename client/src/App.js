import React from "react";
import { Route, Switch } from "react-router-dom";

//layouts
import MainLayout from "./layouts/mainLayout";
import HomepageLayout from "./layouts/homePageLayout";

//pages
import Homepage from "./pages/homePage/index";
import Registration from "./pages/registration/index";
import "./default.scss";

const App = (props) => {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
