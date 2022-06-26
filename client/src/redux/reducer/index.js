const initialState = {
  races: [],
  showRaces: [],
  temperaments: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RACES":
      return {
        ...state,
        races: action.payload,
        showRaces: action.payload,
      };
    case "GET_RACE_BY_NAME":
      return {
        ...state,
        races: action.payload,
        showRaces: action.payload,
      };
    case "GET_RACE_BY_ID":
      return {
        ...state,
        races: action.payload,
        showRaces: action.payload,
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
    case "FILTER_BY_TEMPERAMENT":
      const races = state.races;
      const filteredRaces = races.filter((race) => {
        if (race.temperament) return race.temperament.includes(action.payload);
        return false;
      });
      return {
        ...state,
        showRaces: filteredRaces,
      };
    case "FILTER_DB_API":
      const allRaces = state.races;
      if (action.payload === "db") {
        const filteredRaces = allRaces.filter((race) => {
          return isNaN(race.id);
        });
        return {
          ...state,
          showRaces: filteredRaces,
        };
      } else {
        const filteredRaces = allRaces.filter((race) => {
          return !isNaN(race.id);
        });
        return {
          ...state,
          showRaces: filteredRaces,
        };
      }
    default:
      return { ...state };
  }
}

export default reducer;
