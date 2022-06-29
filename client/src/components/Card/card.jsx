import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRaceById } from "../../redux/actions";
import "./card.css";

function Card({ name, image, temperament, weight, id }) {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(getRaceById(id));
  };

  return (
    <div className="card">
      <Link to={`/dogs/${id}`} onClick={handleClick}>
        <h2>{name}</h2>
        <img src={image} alt={name} width={400} />
        <p>{temperament}</p>
        <p>{weight} kgs</p>
      </Link>
    </div>
  );
}

export default Card;
