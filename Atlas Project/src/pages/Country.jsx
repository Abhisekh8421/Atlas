import React, { useEffect, useState, useTransition } from "react";
import { getCountryData, getCountryNamedata } from "../Api/PostApi";
import { Loader } from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";
import SearchFilter from "../components/UI/SearchFilter";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setcountries] = useState([]);
  const [search, setsearch] = useState();
  const [filter, setfilter] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      // console.log(res);
      setcountries(res.data);
    });
  }, []);

  // useEffect(() => {
  //   startTransition(async () => {
  //     if (search !== "") {
  //       const res = await getCountryNamedata(search);
  //       console.log(res);
  //     }
  //   });
  // }, [search]);
  if (isPending) return <Loader />;
  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  };
  const filterCountry = (country) => {
    if (filter === "all") return country;
    return country.region === filter;
  };

  console.log(search);

  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterCountry(country)
  );
  // console.log(filterCountries);

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setsearch={setsearch}
        filter={filter}
        setfilter={setfilter}
        countries={countries}
        setcountries={setcountries}
      />{" "}
      {/* Container for suggestion box */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxHeight: "200px",
          overflowY: "auto",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "absolute", // So it appears below the search box
          width: "100%", // Take the full width of the container
          zIndex: "1000", // Ensure it appears on top
        }}
      >
        {filterCountries.slice(0, 10).map((country, index) => {
          const { name } = country;
          return (
            <div
              key={index}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #f0f0f0",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "grey")
              } 
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              } 
            >
              <NavLink
                to={`/country/${name.common}`}
                style={{ textDecoration: "none", color: "#333" }}
              >
                <p style={{ margin: "0", color: "black" }}>{name.common}</p>
              </NavLink>
            </div>
          );
        })}
      </div>
      <ul className="grid grid-four-cols" style={{ marginTop: "23rem" }}>
        {countries.map((country, index) => {
          return <CountryCard country={country} key={index} />;
        })}
      </ul>
    </section>
  );
};

export default Country;
