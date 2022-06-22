import axios from "axios";

export const getRaces = () => (dispatch) => {
  axios.get("http://localhost:3001/dogs").then((r) => {
    return dispatch({ type: "GET_RACES", payload: r });
  });
};

export const getRaceByName = (name) => (dispatch) => {
  axios.get(`http://localhost:3001/dogs?name=${name}`).then((r) => {
    return dispatch({ type: "GET_RACE_BY_NAME", payload: r });
  });
};

export const getRaceById = (id) => (dispatch) => {
  axios.get(`http://localhost:3001/dogs/${id}`).then((r) => {
    return dispatch({ type: "GET_RACE_BY_ID", payload: r });
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
  axios.get("http://localhost:3001/temperaments").then((r) => {
    return dispatch({ type: "GET_TEMPERAMENTS", payload: r });
  });
};
