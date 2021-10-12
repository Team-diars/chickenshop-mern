import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { removeAlert } from "../../actions/alert";

function Alerts(props) {
  const toast = useToast();
  console.log("alert props", props);
  return (
    <>
      {props.alerts !== null &&
        props.alerts.length > 0 &&
        props.alerts.map((alert) => {
          console.log("alert:", alert);
          toast({
            title: alert.msg,
            status: alert.alertType,
            isClosable: true,
          });
          setTimeout(() => {
            props.removeAlert(alert.id);
          }, 800);
        })}
    </>
  );
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const mapDispatchToProps = {
  removeAlert: (id) => removeAlert(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
