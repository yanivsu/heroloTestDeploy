import produce from "immer";
import * as enums from "../helpers/enums";

const INITIAL_STATE = {
  isLoading: true,
  cityName: "",
  cityCode: "",
  tempFunction: true, // true -- Cel , false -- F
  weatherForecast: [
    {
      tempatureMin: "",
      tempatureMax: "",
      date: "",
      iconNumber: 0,
      iconPharse: "",
      cityCode: "",
    },
  ],
};

const weatherReducer = (state = INITIAL_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case enums.weatherEnums.WEATHER_FETCH_DATA: {
        draft.isLoading = false;
        draft.cityCode = action.payload.cityCode;
        draft.cityName = action.payload.cityName;
        let fiveDaysForecast = [];
        action.payload.data.DailyForecasts.forEach((day) => {
          let date = new Date(day.EpochDate * 1000);
          var options = { weekday: "short" };
          let tempDay = new Intl.DateTimeFormat("en-US", options).format(date);
          let oneDayForecaste = {
            tempatureMin: Math.floor(parseInt(day.Temperature.Minimum.Value)),
            tempatureMax: Math.floor(parseInt(day.Temperature.Maximum.Value)),
            date: day.Date,
            foreCastDay: tempDay,
            iconNumber: day.Day.Icon,
            iconPharse: day.Day.IconPhrase,
            cityCode: action.payload.cityCode,
          };
          if (!draft.tempFunction) {
            oneDayForecaste.tempatureMin =
              oneDayForecaste.tempatureMin * (9 / 5) + 32;
            oneDayForecaste.tempatureMax =
              oneDayForecaste.tempatureMax * (9 / 5) + 32;
          }
          fiveDaysForecast.push(oneDayForecaste);
        });
        draft.weatherForecast = fiveDaysForecast;
        return draft;
      }
      case enums.weatherEnums.CHANGE_C_OR_F: {
        if (!action.payload) {
          draft.tempFunction = false;
          draft.weatherForecast.forEach((day, index) => {
            draft.weatherForecast[index].tempatureMin = Math.floor(
              parseInt(day.tempatureMin * (9 / 5) + 32)
            );
            draft.weatherForecast[index].tempatureMax = Math.floor(
              parseInt(day.tempatureMax * (9 / 5) + 32)
            );
          });
          return draft;
        } else if (action.payload) {
          draft.tempFunction = true;
          draft.weatherForecast.forEach((day, index) => {
            draft.weatherForecast[index].tempatureMin = Math.floor(
              parseInt((day.tempatureMin - 32) * (5 / 9))
            );

            draft.weatherForecast[index].tempatureMax = Math.floor(
              parseInt((day.tempatureMax - 32) * (5 / 9))
            );
          });
          return draft;
        }
        return draft;
      }
      default:
        return draft;
    }
  });

export default weatherReducer;
