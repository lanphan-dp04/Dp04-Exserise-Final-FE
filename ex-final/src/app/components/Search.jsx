import React from "react";
import { useState } from "react";
import "../views/homepage/homepage.css";

export default function Search(props) {
  const [search, setSearch] = useState();

  const handleOnChange = (e) => {
    setSearch(e.target.value);
    console.log("search", search);
  };

  const handleSearch = () => {};

  return (
    <div>
      <form className="form-inline" onSubmit={handleSearch}>
        {/* <label htmlFor="">Request Status</label> */}

        <input
          className="form-control search-col"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={handleOnChange}
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
