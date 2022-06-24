import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperament, getTemperaments } from "../../redux/actions";
import SearchBar from "../Searchbar/searchbar";

function Navbar({ paged }) {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  //   console.log(temperaments);

  const [temp, setTemp] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setTemp(e.target.value);
    dispatch(filterByTemperament(e.target.value));
  };
  //   console.log(temp);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="navbar">
      <select
        name="select"
        disabled={!temperaments}
        value={temp}
        onChange={handleChange}
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
