import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px",
        fontSize: "14px",
        fontWeight: "500",
        color: "white",
      }}
    >
      <NavLink
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          marginRight: "5px",
        }}
      >
        Home
      </NavLink>
      {pathnames.map((name, index) => {
        const breadcrumbPath = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span
            key={index}
            style={{
              color: "#d3d3d3",
              marginLeft: "5px",
            }}
          >
            / {name}
          </span>
        ) : (
          <span key={index} style={{ display: "flex", alignItems: "center" }}>
            <NavLink
              style={{
                color: "white",
                textDecoration: "none",
                marginLeft: "5px",
                marginRight: "5px",
              }}
              to={breadcrumbPath}
            >
              / {name}
            </NavLink>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
