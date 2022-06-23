import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "../../redux/actions";
import Card from "../Card/card";
import SearchBar from "../Searchbar/searchbar";

function Home() {
  const dispatch = useDispatch();
  const races = useSelector((state) => state.races);
  console.log("1", races);
  console.log("2", races[0]);

  useEffect(() => {
    dispatch(getRaces());
  }, [dispatch]);

  return (
    <div className="home">
      <SearchBar />
      {races.map((race) => {
        return (
          <Card
            key={race.id}
            id={race.id}
            name={race.name}
            temperament={race.temperament}
            weight={race.weight.metric}
            image={race.image}
          />
        );
      })}
    </div>
  );
}

export default Home;
