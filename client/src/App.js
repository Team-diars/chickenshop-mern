import React, { useEffect } from "react";
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
import DashboardScreen from "./components/dashboard/DashboardScreen";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./routing/PrivateRoute";
import SettingsScreen from "./components/settings/SettingsScreen";
import UserScreen from "./components/users/UserScreen";
import EmployeeScreen from "./components/employees/EmployeeScreen";
import OrderScreen from "./components/orders/OrderScreen";
import SaleScreen from "./components/sales/SaleScreen";
import Alert from "./components/layout/Alert";
import EditProduct from "./components/products/EditProduct";
import EditEmployee from "./components/employees/EditEmployee";
import EditUser from "./components/users/EditUser";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[]);
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <main className="py-3">
          <Container>
            <Alert />
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/login" component={LoginScreenClient}/>
            <Route exact path="/auth" component={LoginScreenEmployee}/>
            <Route exact path="/register" component={RegisterScreen}/>
            <PrivateRoute exact path="/profile" component={DashboardScreen}/>
            <PrivateRoute exact path="/products" component={ProductScreen}/>
            <PrivateRoute exact path="/products/edit/:id" component={EditProduct}/>
            <PrivateRoute exact path="/employees" component={EmployeeScreen}/>
            <PrivateRoute exact path="/employees/edit/:id" component={EditEmployee}/>
            <PrivateRoute exact path="/settings" component={SettingsScreen}/>
            <PrivateRoute exact path="/users" component={UserScreen}/>
            <PrivateRoute exact path="/users/edit/:id" component={EditUser}/>
            <PrivateRoute exact path="/orders" component={OrderScreen}/>
            <PrivateRoute exact path="/sales" component={SaleScreen}/>
          </Container>
        </main>
        <Footer/>
      </Router>
    </Provider>
  )
}

export default App;
