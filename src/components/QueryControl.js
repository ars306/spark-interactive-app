import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

import QueryList from "../components/QueryList";

// import { useHttpClient } from "../hooks/http-hook";
import { useQueryOptions } from "../hooks/query-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    paddingTop: 0,
    display: "flex",
    overflow: "auto",
    height: "363px",
    flexDirection: "column",
  },
  data: {
    padding: theme.spacing(1),
    paddingTop: 0,
    display: "flex",
    overflow: "auto",
    height: "100%",
    flexDirection: "column",
  },
  area: {
    maxWidth: "xl",
    disableGutters: true,
  },
  toolbar: {
    paddingRight: 0,
    paddingLeft: 0,
    minHeight: 45,
  },
  title: {
    flexGrow: 1,
  },
}));

const QueryControl = (props) => {
  // console.log("Query Control");
  const classes = useStyles();
  const [listSelectedState, setListSelectedState] = useState();
  const {
    // refreshQueryList,
    // handleClick,
    cancelQuery,
    // selectedState,
  } = useQueryOptions();

  // const { sendRequest } = useHttpClient();

  // const selected = props.selected;
  // const selectedState = props.selectedState;

  // const session = JSON.parse(window.localStorage.getItem("sessionData"));
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const token = userData && userData.token;
  // const [listRefresh, setListRefresh] = useState(false);

  const sendRefresh = () => {
    props.setListRefresh(!props.listRefresh);
    // refreshQueryList();
  };

  const sendCancel = () => {
    cancelQuery(props.listSelected);
  };

  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="body1" className={classes.title}>
          Query List
        </Typography>
        <Button
          color="secondary"
          disabled={listSelectedState ? listSelectedState !== "running" : true}
          onClick={sendCancel}
        >
          Stop
        </Button>
        {/* <IconButton onClick={() => setListRefresh(!listRefresh)}> */}
        <IconButton onClick={sendRefresh}>
          <RefreshIcon color="primary" />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            props.setResWinNor(!props.resWinNor);
          }}
        >
          {props.resWinNor && <FullscreenIcon color="primary" />}
          {!props.resWinNor && <FullscreenExitIcon color="primary" />}
        </IconButton>
      </Toolbar>
      <Box border={0}>
        <QueryList
          listRefresh={props.listRefresh}
          setResultRefresh={props.setResultRefresh}
          resultRefresh={props.resultRefresh}
          setListSelected={props.setListSelected}
          setListSelectedState={setListSelectedState}
        />
      </Box>
    </Paper>
  );
};

export default QueryControl;
