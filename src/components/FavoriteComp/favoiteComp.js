import React from "react";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import WeatherCard from "../weatherMainComp/weatherCard";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Titillium Web",
    fontWeight: "bold",
  },
}));

export default function Favorite(props) {
  const classes = useStyles();
  const selectorFavorite = useSelector((state) => state.faivorteCitiesReducer);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h3" className={classes.title}>
        Favorite Cities
      </Typography>
      <Grid
        direction="row"
        container
        alignItems="center"
        justifyContent="center"
      >
        {selectorFavorite.faivorteCities.length > 0
          ? selectorFavorite.faivorteCities.map((city) => {
              return <WeatherCard data={city} unitMode={props.unitMode} />;
            })
          : null}
      </Grid>
    </Grid>
  );
}
