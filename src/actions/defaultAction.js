import { getApi } from "../helpers/apiUtils";
import * as enums from "../helpers/enums";
//----------------- Async Action functions ----------//

export function loadWeaterByCode(cityCode, cityName) {
  return function (dispatch) {
    return getApi(
      enums.serverWeatherEnums.API_5DAYS_FORECAST +
        cityCode +
        enums.serverWeatherEnums.QUESTION_MARK +
        enums.serverWeatherEnums.APIKEY +
        enums.serverWeatherEnums.TEMPERATURE
    )
      .then(({ data }) => {
        dispatch({
          type: enums.weatherEnums.WEATHER_FETCH_DATA,
          payload: { data, cityCode, cityName },
        });
      })
      .catch((error) => console.log("loadData Error no data", error.message));
  };
}

export function loadCitiesByName(cityName) {
  return function (dispatch) {
    return getApi(
      enums.serverWeatherEnums.API_SEARCH_CITY_BY_NAME +
        enums.serverWeatherEnums.APIKEY +
        enums.serverWeatherEnums.API_QUERY +
        cityName
    )
      .then(({ data }) => {
        dispatch({
          type: enums.weatherEnums.AUTOCOMPLETE_CITIES_LIST,
          payload: data,
        });
      })
      .catch((error) => console.log("loadData Error no data", error.message));
  };
}

export function loadWeaterByCoords(lat, long) {
  return function (dispatch) {
    return getApi(
      enums.serverWeatherEnums.API_GET_CITY_CODE_BY_COORDS +
        enums.serverWeatherEnums.APIKEY +
        enums.serverWeatherEnums.API_QUERY +
        lat +
        enums.serverWeatherEnums.COMMA +
        long
    )
      .then(({ data }) => {
        // Get city Code from data
        let cityCode = data.Key;
        let cityName = data.LocalizedName;
        dispatch(loadWeaterByCode(cityCode, cityName));
      })
      .catch((error) => console.log("loadData Error no data", error.message));
  };
}

export function addCityToFavorite(cityDetails) {
  return { type: enums.weatherEnums.ADD_FAVORITE_CITY, payload: cityDetails };
}

export function changeToTempStatus(bit) {
  return { type: enums.weatherEnums.CHANGE_C_OR_F, payload: bit };
}
