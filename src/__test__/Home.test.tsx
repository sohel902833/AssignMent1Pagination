import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Components/Home";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
test("renders learn react link", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Home />
    </Router>
  );
  const home = screen.getByTestId("home");
  expect(home).toBeInTheDocument();
});
