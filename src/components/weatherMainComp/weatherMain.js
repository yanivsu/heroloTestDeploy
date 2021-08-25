import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { addCityToFavorite } from "../../actions/defaultAction";
import * as enums from "../../helpers/enums";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },

  title: {
    fontFamily: "Titillium Web",
    fontWeight: "bold",
  },
  weatherStatus: {
    margin: theme.spacing(1),
  },
}));

export default function WeatherMain(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState("");
  const selectorFavorites = useSelector((state) => state.faivorteCitiesReducer);
  const dispatcher = useDispatch();

  const handleAddToFavoriteCities = () => {
    let cityIndex = selectorFavorites.faivorteCities.findIndex((city) => {
      if (city.cityCode === props.data.cityCode) return true;
    });
    if (selectorFavorites.faivorteCities.length === 0 || cityIndex === -1) {
      dispatcher(addCityToFavorite(props));
      setAlertInfo("City Added to favorite List.");
      setOpen(!open);
    } else {
      setAlertInfo("City already in the favorite list.");
      setOpen(!open);
    }
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid
        container
        direction="row"
        xs={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography className={classes.title} variant="h3">
          <img
            src={
              enums.serverWeatherEnums.API_ICON_LINK +
              props.data.iconNumber +
              enums.serverWeatherEnums.SVG
            }
            style={{ width: "2.5em", height: "2.5em" }}
            alt="Weather Icon"
          ></img>

          {props.cityName}
          {" " + props.data.tempatureMax}
          {props.unitMode ? enums.weatherEnums.CEL : enums.weatherEnums.FER}
        </Typography>

        <Button onClick={handleAddToFavoriteCities}>
          <Typography className={classes.title} variant="h5">
            {enums.mainEnums.ADD_TO_FAV}
          </Typography>
        </Button>
      </Grid>

      {/* Wheather Status */}
      <Grid
        className={classes.weatherStatus}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">{props.data.iconPharse}</Typography>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert variant="filled" severity="info" onClose={handleCloseAlert}>
          {alertInfo}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
