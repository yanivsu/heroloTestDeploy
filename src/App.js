import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness5Icon from "@material-ui/icons/Brightness5";

import { loadWeaterByCoords } from "./actions/defaultAction";
import Header from "./components/Header/headerComp";
import WeatherMain from "./components/weatherMainComp/weatherMain";
import WeatherCard from "./components/weatherMainComp/weatherCard";
import SerachCity from "./components/SearchComp/searchComp";
import Favorite from "./components/FavoriteComp/favoiteComp";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },

  header: {
    padding: theme.spacing(2),
    fontWeight: "Bold",
    textAlign: "center",
    color: "whitesmoke",
    background: "#3f51b5",
  },
  searchCity: {
    padding: theme.spacing(2),
  },
  mainWeather: {
    padding: theme.spacing(10),
  },
  darkIcon: {
    margin: theme.spacing(2, 2, 2, 2),
  },
}));
function App() {
  const classes = useStyles();

  const [darkMode, setDarkMode] = useState(false);

  const dispatcher = useDispatch();
  const weatherSelector = useSelector((state) => state.weatherReducer);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  theme.typography.h4 = {
    fontSize: "0rem",
    "@media (min-width:600px)": {
      fontSize: "5rem",
    },
  };

  theme.typography.h5 = {
    fontSize: "1.0rem",
    fontFamily: "Segoe UI",
    "@media (min-width:600px)": {
      fontSize: "1.8rem",
    },
  };
  theme.typography.h3 = {
    fontSize: "1.0rem",
    "@media (min-width:600px)": {
      fontSize: "1.8rem",
    },
  };

  theme.typography.h2 = {
    fontSize: "2rem",
    fontFamily: "Segoe UI",
    "@media (min-width:600px)": {
      fontSize: "5rem",
    },
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        dispatcher(
          loadWeaterByCoords(result.coords.latitude, result.coords.longitude)
        );
      },
      (err) => {
        console.error(err);
      },
      { timeout: 8000 }
    );
  }, []);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router exact path="/heroloTestDeploy">
          <Header />
          {darkMode ? (
            <Brightness5Icon
              className={classes.darkIcon}
              onClick={handleDarkMode}
            />
          ) : (
            <Brightness3Icon
              className={classes.darkIcon}
              onClick={handleDarkMode}
            />
          )}
          <Switch>
            {weatherSelector.isLoading ? (
              <CircularProgress />
            ) : (
              <Route exact path="/heroloTestDeploy">
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  className={classes.searchCity}
                >
                  <SerachCity />
                </Grid>
                <Grid container className={classes.mainWeather}>
                  <WeatherMain
                    data={weatherSelector.weatherForecast[0]}
                    cityName={weatherSelector.cityName}
                    unitMode={weatherSelector.tempFunction}
                  />

                  <Grid
                    container
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    {weatherSelector.weatherForecast.map((day) => {
                      return (
                        <WeatherCard
                          data={day}
                          unitMode={weatherSelector.tempFunction}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </Route>
            )}

            <Route exact path="/favorites">
              <Favorite unitMode={weatherSelector.tempFunction} />
            </Route>
          </Switch>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
