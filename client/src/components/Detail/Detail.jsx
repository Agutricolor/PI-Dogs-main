import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRaceById, resetDetail } from "../../redux/actions";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailInfo = useSelector((state) => state.detail);
  console.log(detailInfo);

  useEffect(() => {
    dispatch(getRaceById(id));
    return () => {
      dispatch(resetDetail());
    };
  }, [dispatch, id]);

  return (
    <div className="detail">
      {detailInfo.temperament ? (
        <div>
          <h1>Information about the dog race: {detailInfo.name}</h1>
          <img
            src={
              detailInfo.image
                ? detailInfo.image
                : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
            }
            alt={detailInfo.image}
            width={400}
          />
          <p>
            Temperament:{" "}
            {isNaN(detailInfo.weight)
              ? detailInfo.temperament
              : detailInfo.temperament.join(", ")}
          </p>
          <p>Weight: {detailInfo.weight}</p>
          <p>Height: {detailInfo.height}</p>
          <p>Years of life: {detailInfo.lifeYears}</p>
        </div>
      ) : (
        <p>The required information can't be showed, please try again</p>
      )}
    </div>
  );
}

export default Detail;
