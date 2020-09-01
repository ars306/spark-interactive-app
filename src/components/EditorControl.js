import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import CodeEditor from "./CodeEditor";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import TModal from "../navigation/components/TModal";
import LoadingSpinner from "../navigation/components/LoadingSpinner";

import { useQueryOptions } from "../hooks/query-hook";

// import { useHttpClient } from "../hooks/http-hook";

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

const EditorControl = (props) => {
  // console.log("editor control");
  const classes = useStyles();
  const [code, setCode] = useState(null);
  const [selCode, setSelCode] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  let query = "";
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const { sendRequest } = useHttpClient();

  // const statement = {};

  // const { refreshQueryList } = useQueryOptions();

  const session = JSON.parse(window.localStorage.getItem("sessionData"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData && userData.token;

  const submitQuery = async (event) => {
    // submit the query
    if (session.sessionId !== null && session.sessionState) {
      setIsLoading(true);
      // console.log("submit query");
      try {
        const response = await fetch(
          process.env.REACT_APP_LIVYAPP_URL +
            "/statements/new" +
            "/" +
            session.sessionId,
          {
            method: "POST",
            body: JSON.stringify({
              code: query,
              kind: "sql",
            }),
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const responseData = await response.json();
        responseData.id && props.setListRefresh(!props.listRefresh);
        // responseData.id && refreshQueryList();
        setIsLoading(false);
        return responseData;
      } catch (err) {
        // console.log(err);
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    } else {
      setError("No valid active session to submit query");
    }
  };

  const onChange = (newValue) => {
    // console.log(newValue);
    setCode(newValue);
  };

  const onSelectionChange = (selection, evt) => {
    // console.log("selection", selection.getRange());
    // console.log("selection", selection.getRange().start["row"]);
    // console.log("selection", selection.getRange().end["row"]);
    setSelCode({
      start: selection.getRange().start["row"],
      end: selection.getRange().end["row"],
      startCol: selection.getRange().start["column"],
      endCol: selection.getRange().end["column"],
    });
  };

  // console.log(selCode);

  if (code) {
    const codeArray = code.split("\n");

    codeArray.map((row, index) => {
      // console.log(row, index);
      if (index >= selCode.start && index <= selCode.end) {
        if (selCode.start !== selCode.end) {
          if (index === selCode.start) {
            row = row.substring(selCode.startCol);
          } else if (index === selCode.end) {
            row = row.substring(0, selCode.endCol);
          }
        } else {
          row = row.substring(selCode.startCol, selCode.endCol);
        }

        query = query + " " + row;
      }
      return query;
    });
  }

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      {error && <TModal error={error} onClear={clearError} />}
      {/* {isLoading && <LinearProgress />} */}
      {isLoading && <LoadingSpinner asOverlay />}
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="body1" className={classes.title}>
            Editor
          </Typography>
          <Button
            color="primary"
            // disabled={!code || selCode.end === selCode.start}
            disabled={!code || selCode.startCol === selCode.endCol}
            // disabled={!code}
            onClick={submitQuery}
          >
            Run
          </Button>
          {/* <Button color="primary">Save</Button> */}
          <IconButton
            color="inherit"
            onClick={() => {
              props.setEditWinNor(!props.editWinNor);
            }}
          >
            {props.editWinNor && <FullscreenIcon color="primary" />}
            {!props.editWinNor && <FullscreenExitIcon color="primary" />}
          </IconButton>
        </Toolbar>

        <Box border={1}>
          <CodeEditor
            onChange={onChange}
            onSelectionChange={onSelectionChange}
          />
        </Box>
      </Paper>
    </>
  );
};

export default EditorControl;
