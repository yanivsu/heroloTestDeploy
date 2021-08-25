import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

import { changeToTempStatus } from "../../actions/defaultAction";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: "20px",
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  button: {
    fontSize: "1 rem",
    fontFamily: "Titillium Web",
    fontWeight: "bold",
    marginRight: theme.spacing(2),
  },
  toggle: {
    margin: theme.spacing(1),
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      light: "#30CE88",
      main: "#30CE88",
      dark: "#205374",
      contrastText: "#205374",
    },
    secondary: {
      main: "#205374",
    },
    menuItem: {
      width: "100%",
      height: "100%",
    },
  },
});

export default function Header(props) {
  const classes = useStyles();
  const dispatcher = useDispatch();

  const [state, setState] = useState({
    temp: true,
  });

  const history = useHistory();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    dispatcher(changeToTempStatus(!state.temp));
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" className={classes.title}>
              Weather
            </Typography>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                history.push("");
              }}
            >
              Home 🏡
            </Button>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                history.push("favorites");
              }}
            >
              Favorites 💖
            </Button>
            <Grid>
              <Typography>°F</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={state.temp}
                onChange={handleChange}
                name="temp"
              />
            </Grid>
            <Grid item>
              <Typography>°C</Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
