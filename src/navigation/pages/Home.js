import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import CssBaseLine from "@material-ui/core/CssBaseline";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Header from "../../navigation/components/Header";
import Editor from "../../pages/Editor";
import Settings from "../../pages/Settings";
import Auth from "../../user/Auth";
import { AuthContext } from "../../context/auth-context";
import { useAuth } from "../../hooks/auth-hook";
import LoadingSpinner from "../../navigation/components/LoadingSpinner";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1a73e8",
    },
    secondary: {
      main: "#ff9100",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
  },
  content: {
    flexFlow: 1,
    height: "100vh",
    overflow: "auto",
    paddingTop: theme.spacing(6),
  },
  // appBarSpacer: theme.mixins.toolbar,
}));

const Home = () => {
  // console.log("Home");
  const classes = useStyles();
  const { token, login, logout, userId } = useAuth();
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const token = userData && userData.token;

  // initialize local storage
  localStorage.removeItem("sessionData");

  let routes;
  // console.log(token);
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Editor />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseLine />
          <div className={classes.root}>
            <Header />
            <div className={classes.content}>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner />
                  </div>
                }
              >
                {routes}
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    </AuthContext.Provider>
  );
};

export default Home;
