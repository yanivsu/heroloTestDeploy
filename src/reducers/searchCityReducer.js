import produce from "immer";
import * as enums from "../helpers/enums";

const INITIAL_STATE = {
  isLoading: true,
  citiesOptions: [],
};

const searchCityReducer = (state = INITIAL_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case enums.weatherEnums.AUTOCOMPLETE_CITIES_LIST: {
        if (Array.isArray(action.payload)) {
          let options = [];
          action.payload.forEach((city) => {
            let newCity = {
              countryName: city.Country.LocalizedName,
              cityName: city.LocalizedName,
              code: city.Key,
            };
            options.push(newCity);
          });

          draft.citiesOptions = options;
          draft.isLoading = false;
        } else {
          draft.citiesOptions.length = 0;
        }
        return draft;
      }
      case enums.weatherEnums.CHANGE_C_OR_F: {
        if (draft.citiesOptions.length > 0) {
        }
      }
      default:
        return draft;
    }
  });

export default searchCityReducer;
