import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Image from "./core/Image";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/upload" component={Image} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
