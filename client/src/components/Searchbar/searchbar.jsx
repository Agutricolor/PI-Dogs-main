import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRaceByName } from "../../redux/actions";
import "./searchbar.css";

function SearchBar({ paged }) {
  const dispatch = useDispatch();
  const [race, setRace] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setRace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRaceByName(race));
    setRace("");
    paged(1);
  };

  return (
    <div className="searchbar">
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a race..."
          value={race}
          onChange={handleInput}
        />
        <button type="submit">SEARCH</button>
      </form>
    </div>
  );
}

export default SearchBar;
