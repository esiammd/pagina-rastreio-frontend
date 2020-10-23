import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import TrackList from "./pages/TrackList";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Page404 from "./pages/Page404";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tracklist" exact component={TrackList} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
