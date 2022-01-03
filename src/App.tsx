import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";

const Hits = lazy(() => import("./Components/Hits"));
const Details = lazy(() => import("./Components/Details"));

const App: React.FC = () => {
  return (
    <div data-testid="app" className="App">
      <Suspense fallback={<p>Loading...</p>}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Hits} />
            <Route exact path="/details" component={Details} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
