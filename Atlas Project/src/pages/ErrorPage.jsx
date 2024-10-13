import React from "react";
import { NavLink, useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);

  const handleGoback = () => {
    navigate(-1);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Oops! An Error Has Occurred.</h1>
      {error && <p>{error.data}</p>}
      <figure style={{ maxWidth: "400px", margin: "0 auto" }}>
        <img
          src="/images/error.gif"
          alt="Error"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </figure>
      {/* <NavLink to="/">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            margin: "auto",
          }}
        >
          Go Back
        </button>
      </NavLink> */}
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          margin: "auto",
        }}
        onClick={handleGoback}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
