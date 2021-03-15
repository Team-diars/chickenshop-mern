import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { HomeScreen } from "../components/Web/Home/HomeScreen";
import { ProductScreen } from "../components/Web/Products/ProductScreen";

export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route exact path="/products">
          <ProductScreen />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
