import React from "react";

const SearchFilter = ({
  search,
  setsearch,
  filter,
  setfilter,
  countries,
  setcountries,
}) => {
  const handleInputChange = (event) => {
    event.preventDefault();
    setsearch(event.target.value);
  };

  const sortCountries = (value) => {
    const sortcountry = [...countries].sort((a, b) => {
      return value === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common);
    });
    setcountries(sortcountry);
  };

  const handleSelectChange = (event) => {
    event.preventDefault();
    setfilter(event.target.value);
  };
  return (
    <section className="section-searchFilter container">
      <div >
        <input
          type="text"
          placeholder="search...."
          value={search}
          onChange={handleInputChange}
          style={{ borderRadius: "10px", padding:"5px 10px" }}
        />
      </div>
      <div>
        <button onClick={() => sortCountries("asc")}>Asc</button>
      </div>

      <div>
        <button onClick={() => sortCountries("des")}>Desc</button>
      </div>
      <div>
        <select
          className="select-section"
          value={filter}
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default SearchFilter;
