import React from "react";
import FormContextProvider from "./store/form-context";

import Form from "./components/Form/Form";
import Pokemons from "./components/Pokemons/Pokemons";

function App() {
  return (
    <FormContextProvider>
      <Form />
      <Pokemons />
    </FormContextProvider>
  );
}

export default App;
