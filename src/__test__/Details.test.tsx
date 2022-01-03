import React from "react";
import { render, screen } from "@testing-library/react";
import Details from "../Components/Details";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
test("renders learn react link", () => {
  const history = createMemoryHistory();
  history.push("/details", {});
  render(
    <Router history={history}>
      <Details />
    </Router>
  );
  const details = screen.getByTestId("details");
  expect(details).toBeInTheDocument();
});
