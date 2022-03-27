import React, { useContext, Fragment, useState } from "react";

import { FormContext } from "../../store/form-context";

import classes from "./Form.module.css";

const Form: React.FC = () => {
  const { setType, setName } = useContext(FormContext);

  const [nameInput, setNameInput] = useState<string>("");
  const [typeInput, setTypeInput] = useState<string>("");

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setName(nameInput);
    setType(typeInput);
  };

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const typeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeInput(event.target.value);
  };

  return (
    <Fragment>
      <h1 className={classes.caption}>Find Your pokemon!</h1>
      <form onSubmit={formSubmissionHandler}>
        <div className={`col-sm-10 ${classes["input-wrap"]}`}>
          <input
            type="text"
            className={`form-control form-control-lg ${classes.input}`}
            placeholder="Name"
            value={nameInput}
            onChange={nameChangeHandler}
          />
        </div>
        <div className={`col-sm-10 ${classes["input-wrap"]}`}>
          <input
            type="text"
            className={`form-control form-control-lg ${classes.input}`}
            placeholder="Type"
            value={typeInput}
            onChange={typeChangeHandler}
          />
        </div>
        <div className={classes["button-wrap"]}>
          <button
            type="submit"
            className={`btn btn-primary btn-lg btn-block  ${classes.button}`}
          >
            Search
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Form;
