import React from 'react';
import { HomePage, ProductPage} from "./pages";
import {
  Switch,
  Route
} from "react-router-dom";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <HomePage />
        </Route>
        <Route path={ROUTES.PRODUCT}>
          <ProductPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
