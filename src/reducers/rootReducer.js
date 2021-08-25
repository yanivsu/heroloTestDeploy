import { combineReducers } from "redux";

import weatherReducer from "./weatherReducer";
import searchCityReducer from "./searchCityReducer";
import faivorteCitiesReducer from "./favoriteCitiesReducer";

const rootReducer = combineReducers({
  weatherReducer,
  searchCityReducer,
  faivorteCitiesReducer,
});
export default rootReducer;
