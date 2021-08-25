import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  loadCitiesByName,
  loadWeaterByCode,
} from "../../actions/defaultAction";

export default function SerachCity(props) {
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const citiesListSelector = useSelector((state) => state.searchCityReducer);
  const loading =
    searchCity !== "" && citiesListSelector.citiesOptions.length === 0;

  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(loadCitiesByName(searchCity));
  }, [searchCity]);

  useEffect(() => {
    dispatcher(loadWeaterByCode(selectedCity.code, selectedCity.cityName));
  }, [selectedCity]);

  return (
    <Autocomplete
      getOptionSelected={(option, value) => {
        if (option.cityName === value.cityName) {
          setSelectedCity(option);
        }
      }}
      loading={loading}
      options={citiesListSelector.citiesOptions}
      getOptionLabel={(option) => {
        if (option !== undefined) {
          return `${option.cityName}, ${option.countryName}`;
        } else {
          return;
        }
      }}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          placeholder="Search City..."
          onChange={(event) => {
            let str = event.target.value;
            str = str.charAt(0).toUpperCase() + str.slice(1);
            setSearchCity(str);
          }}
          {...params}
          variant="outlined"
        />
      )}
    />
  );
}
