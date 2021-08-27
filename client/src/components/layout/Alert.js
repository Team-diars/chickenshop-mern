import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AlertIcon, Alert, AlertTitle } from "@chakra-ui/react";

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Alert
      key={alert.id}
      variant="solid"
      status={alert.alertType}
      colorScheme="blue"
    >
      {/* <AlertIcon /> */}
      <AlertTitle mr={2}>{alert.msg}</AlertTitle>
      {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
    </Alert>
    // <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    // {
    //   
    // }
    //   {alert.msg}
    // </div>
  ));

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
