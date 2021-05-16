import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PlacesMap from "./pages/PlacesMap";
import Place from "./pages/Place";
import CreatePlace from "./pages/CreatePlace";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={PlacesMap} />
        <Route path="/place/create" component={CreatePlace} />
        <Route path="/place/:id" component={Place} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
