export const serverWeatherEnums = {
  API_5DAYS_FORECAST:
    "https://dataservice.accuweather.com/forecasts/v1/daily/5day/",
  API_SEARCH_CITY_BY_NAME:
    "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?",
  API_GET_CITY_CODE_BY_COORDS:
    "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?",
  API_QUERY: "&q=",
  API_ICON_LINK: "https://vortex.accuweather.com/adc2010/images/slate/icons/",
  APIKEY: "apikey=jLMc5cduIdwlcXOpx7os5VopnXqUldFt",
  TEMPERATURE: "&metric=true", // Celsuis
  HAIFA_KEY: "213181",
  QUESTION_MARK: "?",
  HAIFA: "Haifa",
  SVG: ".svg",
  COMMA: ",",
};

export const weatherEnums = {
  WEATHER_FETCH_DATA: "WEATHER_FETCH_DATA",
  AUTOCOMPLETE_CITIES_LIST: "AUTOCOMPLETE_CITIES_LIST",
  ADD_FAVORITE_CITY: "ADD_FAVORITE_CITY",
  CHANGE_C_OR_F: "CHANGE_C_OR_F",
  CEL: "°C",
  FER: "°F",
};

export const mainEnums = {
  ADD_TO_FAV: "❤️ Add to Favorites",
};
