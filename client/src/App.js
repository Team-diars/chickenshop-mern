import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./routing/PrivateRoute";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
import HomeScreen from "./website/HomeScreen";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import LoginScreenEmployee from "./components/auth/LoginScreenEmployee";
import RegisterScreen from "./components/auth/RegisterScreen";
import ProductScreen from "./components/products/ProductScreen";
import DashboardScreen from "./components/dashboard/DashboardScreen";
import SettingsScreen from "./components/settings/SettingsScreen";
import UserScreen from "./components/users/UserScreen";
import EmployeeScreen from "./components/employees/EmployeeScreen";
import OrderScreen from "./components/orders/OrderScreen";
import SaleScreen from "./components/sales/SaleScreen";
import Alert from "./components/layout/Alert";
import EditProduct from "./components/products/EditProduct";
import EditEmployee from "./components/employees/EditEmployee";
import EditUser from "./components/users/EditUser";
import EditOrder from "./components/orders/EditOrder";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Header />
          <Box>
            <Container maxWidth="container.xl">
              <Alert />
            </Container>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/auth" component={LoginScreenEmployee} />
            <Route exact path="/register" component={RegisterScreen} />
            <PrivateRoute exact path="/profile" component={DashboardScreen} />
            <PrivateRoute exact path="/products" component={ProductScreen} />
            <PrivateRoute
              exact
              path="/products/edit/:id"
              component={EditProduct}
            />
            <PrivateRoute exact path="/employees" component={EmployeeScreen} />
            <PrivateRoute
              exact
              path="/employees/edit/:id"
              component={EditEmployee}
            />
            <PrivateRoute exact path="/settings" component={SettingsScreen} />
            <PrivateRoute exact path="/users" component={UserScreen} />
            <PrivateRoute exact path="/users/edit/:id" component={EditUser} />
            <PrivateRoute exact path="/orders" component={OrderScreen} />
            <PrivateRoute exact path="/orders/edit/:id" component={EditOrder} />
            <PrivateRoute exact path="/sales" component={SaleScreen} />
          </Box>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
