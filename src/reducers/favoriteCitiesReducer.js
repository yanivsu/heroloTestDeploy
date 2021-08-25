import produce from "immer";
import * as enums from "../helpers/enums";

const INITIAL_STATE = {
  isLoading: true,
  faivorteCities: [],
  tempFunction: true, // 1 -- Cel , 0 -- F
};

const faivorteCitiesReducer = (state = INITIAL_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case enums.weatherEnums.ADD_FAVORITE_CITY: {
        draft.isLoading = false;
        // Check if the city is already exist in fav cities:
        let index = draft.faivorteCities.findIndex((value) => {
          if (value.cityCode === action.payload.data.cityCode) {
            return true;
          }
        });
        if (index === -1) {
          let newCity = {
            cityName: action.payload.cityName,
            cityCode: action.payload.data.cityCode,
            tempatureMin: action.payload.data.tempatureMin,
            tempatureMax: action.payload.data.tempatureMax,
            date: action.payload.data.date,
            dayName: action.payload.data.foreCastDay,
            iconNumber: action.payload.data.iconNumber,
            iconPharse: action.payload.data.iconPharse,
          };
          draft.faivorteCities.push(newCity);
        }

        return draft;
      }
      case enums.weatherEnums.CHANGE_C_OR_F: {
        if (!action.payload) {
          draft.tempFunction = false;
          draft.faivorteCities.forEach((city, index) => {
            draft.faivorteCities[index].tempatureMin = Math.floor(
              parseInt(city.tempatureMin * (9 / 5) + 32)
            );
            draft.faivorteCities[index].tempatureMax = Math.floor(
              parseInt(city.tempatureMax * (9 / 5) + 32)
            );
          });
          return draft;
        } else if (action.payload) {
          draft.tempFunction = true;
          draft.faivorteCities.forEach((city, index) => {
            draft.faivorteCities[index].tempatureMin = Math.floor(
              parseInt((city.tempatureMin - 32) * (5 / 9))
            );

            draft.faivorteCities[index].tempatureMax = Math.floor(
              parseInt((city.tempatureMax - 32) * (5 / 9))
            );
          });
          return draft;
        }
      }
      default:
        return draft;
    }
  });

export default faivorteCitiesReducer;
