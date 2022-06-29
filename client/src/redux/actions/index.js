import axios from "axios";

export const getRaces = () => (dispatch) => {
  axios
    .get("http://localhost:3001/dogs")
    .then((r) => {
      return dispatch({ type: "GET_RACES", payload: r.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRaceByName = (name) => (dispatch) => {
  axios
    .get(`http://localhost:3001/dogs?name=${name}`)
    .then((r) => {
      return dispatch({ type: "GET_RACE_BY_NAME", payload: r.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRaceById = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/dogs/${id}`)
    .then((r) => {
      return dispatch({ type: "GET_RACE_BY_ID", payload: r.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createRace = (race) => (dispatch) => {
  axios
    .post("http://localhost:3001/dogs", race)
    .then((r) => {
      return dispatch({ type: "CREATE_RACE", payload: r.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTemperaments = () => (dispatch) => {
  axios
    .get("http://localhost:3001/temperaments")
    .then((r) => {
      return dispatch({ type: "GET_TEMPERAMENTS", payload: r.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const filterByTemperament = (temperament) => (dispatch) => {
  return dispatch({ type: "FILTER_BY_TEMPERAMENT", payload: temperament });
};

export const filterByApiOrDb = (filter) => (dispatch) => {
  return dispatch({ type: "FILTER_DB_API", payload: filter });
};

export const filterAscOrDesc = (filter) => (dispatch) => {
  return dispatch({ type: "FILTER_ASC_DESC", payload: filter });
};

export const resetRaces = () => (dispatch) => {
  return dispatch({ type: "RESET" });
};

export const resetDetail = () => (dispatch) => {
  return dispatch({ type: "RESET_DETAIL" });
};
