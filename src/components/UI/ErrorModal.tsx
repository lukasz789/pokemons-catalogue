import React from "react";

import classes from "./ErrorModal.module.css";

const ErrorModal: React.FC<{
  errorMessage: string;
}> = ({ errorMessage }) => {
  return (
    <div className={`alert alert-danger ${classes.error}`} role="alert">
      {errorMessage}
    </div>
  );
};

export default ErrorModal;
