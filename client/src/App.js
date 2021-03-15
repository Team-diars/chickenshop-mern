import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from "./components/landing/HomeScreen";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import LoginScreen from "./components/login/LoginScreen";
import { UsersScreen } from "./components/maintain-users/UsersScreen";
import ProductScreen from "./components/products/ProductScreen";

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/products" component={ProductScreen}/>
          <Route exact path="/login" component={LoginScreen}/>
          <Route exact path="/intranet/users" component={UsersScreen}/>
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App;
