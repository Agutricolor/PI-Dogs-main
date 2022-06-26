import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByApiOrDb,
  filterByTemperament,
  getTemperaments,
} from "../../redux/actions";
import SearchBar from "../Searchbar/searchbar";

function Navbar({ paged }) {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  //   console.log(temperaments);

  const [temp, setTemp] = useState("");
  const [filter, setFilter] = useState("");

  const handleChangeTemp = (e) => {
    e.preventDefault();
    setTemp(e.target.value);
    dispatch(filterByTemperament(e.target.value));
    paged(1);
  };
  //   console.log(temp);

  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(filterByApiOrDb(e.target.value));
    paged(1);
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="navbar">
      <select value={filter} onChange={handleChangeFilter}>
        <option selected="selected">Default</option>
        <option value="db">Data Base</option>
        <option value="api">API</option>
      </select>
      <select
        name="select"
        disabled={!temperaments}
        value={temp}
        onChange={handleChangeTemp}
      >
        <option selected="selected">No one</option>
        {temperaments ? (
          temperaments.map((temp) => {
            return <option value={temp}>{temp}</option>;
          })
        ) : (
          <option value="disabled">Loading</option>
        )}
      </select>

      <SearchBar paged={paged} />
    </div>
  );
}

export default Navbar;
