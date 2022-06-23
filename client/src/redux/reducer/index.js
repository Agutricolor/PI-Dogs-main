const initialState = {
  races: [],
  temperaments: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RACES":
      return {
        ...state,
        races: action.payload,
      };
    case "GET_RACE_BY_NAME":
      return {
        ...state,
        races: action.payload,
      };
    case "GET_RACE_BY_ID":
      return {
        ...state,
        races: action.payload,
      };
    case "CREATE_RACE":
      return {
        ...state,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    default:
      return { ...state };
  }
}

export default reducer;
