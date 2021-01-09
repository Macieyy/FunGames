import React from "react";
import {Alert} from "react-bootstrap";

const getVariant = (props) => {
  let variant = "";
  if (props.message.msgError) variant = "danger";
  else variant = "success";
  return variant;
};
const Message = (props) => {
  return (
      <Alert className="mt-3" variant={getVariant(props)}>
        <Alert.Heading className="text-center">{props.message.msgBody}</Alert.Heading>
      </Alert>
  );
};

export default Message;
