import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from "./components/landing/HomeScreen";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import LoginScreenClient from "./components/auth/LoginScreenClient";
import LoginScreenEmployee from "./components/auth/LoginScreenEmployee";
import RegisterScreen from "./components/auth/RegisterScreen";
import ProductScreen from "./components/products/ProductScreen";
import {Provider} from 'react-redux';
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <main className="py-3">
          <Container>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/products" component={ProductScreen}/>
            <Route exact path="/login" component={LoginScreenClient}/>
            <Route exact path="/auth" component={LoginScreenEmployee}/>
            <Route exact path="/register" component={RegisterScreen}/>
          </Container>
        </main>
        <Footer/>
      </Router>
    </Provider>
  )
}

export default App;
