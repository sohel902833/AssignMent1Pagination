import React from "react";
import { useLocation } from "react-router-dom";
import { InitPost } from "./Hits";

const Details: React.FC = () => {
  const { state } = useLocation<InitPost>();
  const post = state;
  return (
    <div data-testid="details">
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};

export default Details;
