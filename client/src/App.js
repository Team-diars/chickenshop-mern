import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./routing/PrivateRoute";
//
import HomeScreen from "./website/HomeScreen";
import Header from "./components/layout/Header";
import LoginScreenEmployee from "./components/auth/LoginScreenEmployee";
import RegisterScreen from "./components/auth/RegisterScreen";
import ProductScreen from "./components/products/ProductScreen";
import EditProduct from "./components/products/EditProduct";
import ProfileScreen from "./components/profile/ProfileScreen";
import SettingsScreen from "./components/settings/SettingsScreen";
import UserScreen from "./components/users/UserScreen";
import EditUser from "./components/users/EditUser";
import EmployeeScreen from "./components/employees/EmployeeScreen";
import EditEmployee from "./components/employees/EditEmployee";
import SaleScreen from "./components/sales/SaleScreen";
import { MenuScreen } from "./components/menu/MenuScreen";
import FoodMenuScreen from "./components/menu/FoodMenuScreen";
import OrderScreen from "./components/orders/OrderScreen";
import LiveOrders from "./components/orders/LiveOrders";
//
import WebSocketProvider from "./ws/index";
import Alert from "./components/layout/Alert";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <ChakraProvider>
          <Router>
            <Header />
            <Box>
              <Container maxWidth="container.xl">
                <Alert />
              </Container>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/auth" component={LoginScreenEmployee} />
              <Route exact path="/menu2" component={MenuScreen} />
              <Route exact path="/menu" component={FoodMenuScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <PrivateRoute exact path="/profile" component={ProfileScreen} />
              <PrivateRoute exact path="/products" component={ProductScreen} />
              <PrivateRoute
                exact
                path="/employees"
                component={EmployeeScreen}
              />
              <PrivateRoute exact path="/settings" component={SettingsScreen} />
              <PrivateRoute exact path="/users" component={UserScreen} />
              <PrivateRoute
                exact
                path="/employees/edit/:id"
                component={EditEmployee}
              />
              <PrivateRoute
                exact
                path="/products/edit/:id"
                component={EditProduct}
              />
              <PrivateRoute exact path="/users/edit/:id" component={EditUser} />
              {/* <PrivateRoute exact path="/orders" component={OrderScreen} /> */}
              {/* <PrivateRoute exact path="/orders/edit/:id" component={EditOrder} /> */}
              <PrivateRoute exact path="/sales" component={SaleScreen} />
              <PrivateRoute exact path="/orders" component={OrderScreen} />
              <PrivateRoute exact path="/liveorders" component={LiveOrders} />
            </Box>
          </Router>
        </ChakraProvider>
      </WebSocketProvider>
    </Provider>
  );
}

export default App;
