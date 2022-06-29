import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRaceById, resetDetail } from "../../redux/actions";

function Detail() {
  //   const { id } = useParams();

  const dispatch = useDispatch();
  const detailInfo = useSelector((state) => state.detail);
  console.log(detailInfo);

  useEffect(() => {
    return () => {
      dispatch(resetDetail());
    };
  }, [dispatch]);

  return (
    <div className="detail">
      <h1>Information about the dog race: {detailInfo.name}</h1>
      <img src={detailInfo.image} alt={detailInfo.image} width={400} />
      <p>
        Temperament:{" "}
        {isNaN(detailInfo.weight)
          ? detailInfo.temperament.toString()
          : detailInfo.temperament}
      </p>
      <p>Weight: {detailInfo.weight}</p>
      <p>Height: {detailInfo.height}</p>
      <p>Years of life: {detailInfo.lifeYears}</p>
    </div>
  );
}

export default Detail;
