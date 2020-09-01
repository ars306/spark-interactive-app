import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import CodeIcon from "@material-ui/icons/Code";
// import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AuthContext } from "../../context/auth-context";
import Session from "./Session";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: 6,
    paddingRight: 9,
    minHeight: 45,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const token = userData && userData.token;

  return (
    <AppBar position="absolute" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <AppsIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Spark Interactive Editor
        </Typography>
        {/* <Button color="inherit">Run</Button>
        <Button color="inherit">Stop</Button>
        <Button color="inherit">Data</Button> */}
        {auth.isLoggedIn && <Session />}

        <IconButton color="inherit" component={NavLink} to={"/"}>
          <CodeIcon />
        </IconButton>
        <IconButton color="inherit" component={NavLink} to={"/settings"}>
          <SettingsIcon />
        </IconButton>
        {/* {token ? ( */}
        {auth.isLoggedIn ? (
          <IconButton color="inherit" onClick={auth.logout}>
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <IconButton color="inherit" component={NavLink} to={"/auth"}>
            <PowerSettingsNewIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
