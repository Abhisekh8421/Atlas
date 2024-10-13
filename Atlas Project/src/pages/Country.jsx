import React, { useEffect, useState, useTransition } from "react";
import { getCountryData, getCountryPageData } from "../Api/PostApi";
import { Loader } from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";
import SearchFilter from "../components/UI/SearchFilter";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      setCountries(res.data);
    });
  }, []);

  const {
    data = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["flags", page],
    queryFn: () => getCountryPageData(page),
    staleTime: 5000,
    keepPreviousData: true,
  });

  if (isPending || isLoading) return <Loader />;
  if (isError) return <p>Error loading data: {error.message}</p>;

  const searchCountry = (country) => {
    if (!country?.name?.common) return false; 
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  };

  const filterCountry = (country) => {
    if (filter === "all") return country;
    return country.region === filter;
  };

  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterCountry(country)
  );

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setsearch={setSearch}
        filter={filter}
        setfilter={setFilter}
        countries={countries}
        setcountries={setCountries}
      />
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxHeight: "200px",
          overflowY: "auto",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          width: "100%",
          zIndex: "1000",
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
        {data.slice(0, 10).map((country, index) => {   ///data is used there 
          return <CountryCard country={country} key={index} />;
        })}
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: window.innerWidth < 600 ? "14px" : "16px",
            backgroundColor: page === 1 ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: page === 1 ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
            width: window.innerWidth < 600 ? "80px" : "auto",
          }}
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>

        <p
          style={{
            fontSize: window.innerWidth < 600 ? "14px" : "16px",
            fontWeight: "bold",
            margin: "0",
          }}
        >
          Page {page}
        </p>

        <button
          style={{
            padding: "10px 20px",
            fontSize: window.innerWidth < 600 ? "14px" : "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            width: window.innerWidth < 600 ? "80px" : "auto",
          }}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Country;
