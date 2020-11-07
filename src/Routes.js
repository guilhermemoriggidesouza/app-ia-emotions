import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

function AllRoutes() {
    return (
        <Switch>
            <Route exact path="/" render={props => <Login {...props} />} />
            <Route exact path="/home" render={props => <Home {...props} />} />
        </Switch>
    );
}

export default AllRoutes;