import React from "react";
import Menu from "./Menu";
import "./Base.css";

const base = ({
  title = "My Photo Gallery",
  description = "This is an app to store the photos.",
  children,
}) => {
  return (
    <div className="base">
      <Menu />

      <div className="jumbotron jumbotron-fluid p-4">
        <div className="container d-flex flex-column">
          <h1 className="display-4 d-flex justify-content-around title">
            {title}
          </h1>
          <p className="lead d-flex justify-content-around description">
            {description}
          </p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default base;
