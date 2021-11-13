import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistedStore } from "./store";
//Pages
import HomeScreen from "./pages/website/Home";
import ProfileScreen from "./pages/profile/Profile";
import SettingsScreen from "./pages/settings/Settings";
import UserScreen from "./pages/users/Users";
import EditUser from "./pages/users/EditUser";
import EmployeeScreen from "./pages/employees/Employees";
import EditEmployee from "./pages/employees/EditEmployee";
import SaleScreen from "./pages/sales/Sales";
import MenuScreen from "./pages/menu/FoodMenu";
import MenuTableScreen from "./pages/menu/FoodMenuTable";
import OrderScreen from "./pages/orders/Orders";
import EditOrder from "./pages/orders/EditOrder";
import LiveOrders from "./pages/orders/LiveOrders";
import ProductScreen from "./pages/products/Products";
import EditProduct from "./pages/products/EditProduct";
import LoginScreenEmployee from "./pages/auth/LoginEmployee";
import RegisterScreen from "./pages/auth/RegisterScreen";
import { LiveOrdersKitchen } from "./pages/orders/LiveOrdersKitchen";

//Components
import Header from "./components/layout/Header";
import { LayoutContext } from "./components/layout/LayoutContext";
import { Loader } from "./components/loader/Loader";
//Utils
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";
//Actions
import { loadUser } from "./actions/auth";
import { getSettings } from "./actions/settings";
//Chakra UI
import {
  ChakraProvider,
  Container,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

//WS
import WebSocketProvider from "./ws/index";
import Alert from "./components/layout/Alert";

//Validate Token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  // const [settingsData, setSettingsData] = useState({});

  const {
    isOpen: navIsOpen,
    onClose: navOnClose,
    onOpen: navOnOpen,
  } = useDisclosure();

  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  // useEffect(() => {
  //   store.dispatch(getSettings());
  // }, [getSettings]);

  return (
    <Provider store={store}>
      <PersistGate loading={<p>loading</p>} persistor={persistedStore}>
        <WebSocketProvider>
          <LayoutContext.Provider
            value={{
              isFocusMode,
              setIsFocusMode,
              navIsOpen,
              navOnClose,
              navOnOpen,
            }}
          >
            <ChakraProvider>
              {/* <Suspense fallback={<Loader />}> */}
              <Router>
                <Header />
                <Box>
                  <Container maxWidth="container.xl">
                    <Alert />
                  </Container>
                  {/* <Switch> */}
                  <Route exact path="/" component={HomeScreen} />
                  <Route exact path="/auth" component={LoginScreenEmployee} />
                  <Route exact path="/menu" component={MenuScreen} />
                  <Route
                    exact
                    path="/menu/table/:id"
                    component={MenuTableScreen}
                  />
                  <Route exact path="/register" component={RegisterScreen} />
                  <PrivateRoute
                    exact
                    path="/profile"
                    component={ProfileScreen}
                  />
                  <PrivateRoute
                    exact
                    path="/products"
                    component={ProductScreen}
                  />
                  <PrivateRoute
                    exact
                    path="/employees"
                    component={EmployeeScreen}
                  />
                  <PrivateRoute
                    exact
                    path="/settings"
                    component={SettingsScreen}
                  />
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
                  <PrivateRoute
                    exact
                    path="/users/edit/:id"
                    component={EditUser}
                  />
                  <PrivateRoute
                    exact
                    path="/orders/edit/:id"
                    component={EditOrder}
                  />
                  <PrivateRoute exact path="/sales" component={SaleScreen} />
                  <PrivateRoute exact path="/orders" component={OrderScreen} />
                  <PrivateRoute
                    exact
                    path="/liveorders"
                    component={LiveOrders}
                  />
                  <PrivateRoute
                    exact
                    path="/kitchen"
                    component={LiveOrdersKitchen}
                  />
                  {/* </Switch> */}
                </Box>
                {/* </Suspense> */}
              </Router>
            </ChakraProvider>
          </LayoutContext.Provider>
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
