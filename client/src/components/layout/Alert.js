import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { removeAlert } from "../../actions/alert";

function Alerts({ alert: { alerts } }) {
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => {
        toast({
          title: alert.msg,
          status: alert.alertType,
          isClosable: true,
        });
        dispatch(removeAlert(alert.id));
      });
  }, [alerts]);
  return <></>;
}

const mapStateToProps = (state) => ({
  alert: state.alert,
});

const mapDispatchToProps = {
  removeAlert: (id) => removeAlert(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
