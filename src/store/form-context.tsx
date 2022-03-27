import React, { useState } from "react";

type FormContextObj = {
  name: string;
  type: string;
  setName: (user: string) => void;
  setType: (type: string) => void;
};

export const FormContext = React.createContext<FormContextObj>({
  name: "",
  type: "",
  setName: () => {},
  setType: () => {},
});

const FormContextProvider: React.FC = (props) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");

  return (
    <FormContext.Provider value={{ name, setName, type, setType }}>
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
