import React, { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../Api/PostApi";
import { Loader } from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";
import SearchFilter from "../components/UI/SearchFilter";

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

  // console.log(search, filter);

  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterCountry(country)
  );
  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setsearch={setsearch}
        filter={filter}
        setfilter={setfilter}
        countries={countries}
        setcountries={setcountries}
      />
      <ul className="grid grid-four-cols">
        {filterCountries.map((country, index) => {
          return <CountryCard country={country} key={index} />;
        })}
      </ul>
    </section>
  );
};

export default Country;
