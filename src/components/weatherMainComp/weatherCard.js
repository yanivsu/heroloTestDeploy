import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import * as enums from "../../helpers/enums";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
}));

export default function WeatherCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h5" component="h2">
            {props.data.foreCastDay !== undefined
              ? props.data.foreCastDay
              : props.data.cityName}
          </Typography>
          <Typography variant="body2" component="p">
            <img
              src={
                enums.serverWeatherEnums.API_ICON_LINK +
                props.data.iconNumber +
                enums.serverWeatherEnums.SVG
              }
              style={{ width: "4.5em", height: "4.5em", margin: "2px" }}
              alt="Weather Icon"
            ></img>
          </Typography>
          <Typography variant="h5" component="h2">
            {props.data.tempatureMin}
            {props.unitMode
              ? enums.weatherEnums.CEL
              : enums.weatherEnums.FER} - {props.data.tempatureMax}
            {props.unitMode ? enums.weatherEnums.CEL : enums.weatherEnums.FER}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
