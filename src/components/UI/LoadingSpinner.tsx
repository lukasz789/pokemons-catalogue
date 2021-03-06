import React from "react";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={classes.backdrop}>
      <div
        className={`spinner-border text-primary ${classes.spinner}`}
        role="status"
      />
    </div>
  );
};

export default LoadingSpinner;
