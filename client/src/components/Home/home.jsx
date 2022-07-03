import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces, getTemperaments, resetRaces } from "../../redux/actions";
import Card from "../Card/card";
import Navbar from "../Navbar/navbar";

function Home() {
  const dispatch = useDispatch();
  const allRaces = useSelector((state) => state.races);
  const races = useSelector((state) => state.showRaces);
  const [page, setPage] = useState(1);
  const [elementsByPage] = useState(8);
  const lastElementIndex = page * elementsByPage;
  const firstElementIndex = lastElementIndex - elementsByPage;
  const actualElements = races.slice(firstElementIndex, lastElementIndex);
  const amountOfPages = races.length > 1 ? Math.ceil(races.length / 8) : 1;

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (page !== amountOfPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (allRaces.length < 1) dispatch(getRaces());
    dispatch(getTemperaments());
    return () => {
      dispatch(resetRaces());
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar paged={changePage} />
      <button onClick={handlePrev}>Prev</button>
      <span>
        Page {page} of {amountOfPages}
      </span>
      <button onClick={handleNext}>Next</button>
      {actualElements.length > 0 ? (
        actualElements?.map((race) => {
          return (
            <Card
              key={race.id}
              id={race.id}
              name={race.name}
              temperament={race.temperament}
              weight={isNaN(race.id) ? race.weight : race.weight.metric}
              image={
                race.image
                  ? race.image
                  : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
              }
            />
          );
        })
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default Home;
