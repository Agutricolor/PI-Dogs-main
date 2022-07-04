import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRaceByName, resetRaces } from "../../redux/actions";
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
    dispatch(resetRaces());
    dispatch(getRaceByName(race));
    setRace("");
    paged(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search"
          type="text"
          placeholder="Search a race..."
          value={race}
          onChange={handleInput}
        />
        <button className="searchSubmit" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
