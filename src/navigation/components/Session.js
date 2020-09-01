import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import TModal from "./TModal";
import IconButton from "@material-ui/core/IconButton";
// import LinearProgress from "@material-ui/core/LinearProgress";
import RefreshIcon from "@material-ui/icons/Refresh";
import LoadingSpinner from "../../navigation/components/LoadingSpinner";

import { useSessionState } from "../../hooks/session-hook";

const Session = () => {
  // console.log("session");
  // const classes = useStyles();

  const [is1Loading, setIs1Loading] = useState(false);

  const {
    session,
    getUserSession,
    refreshSession,
    createSession,
    deleteSession,
    error,
    clearError,
    isLoading,
  } = useSessionState();

  useEffect(() => {
    // get user session from database

    const init = async () => {
      setIs1Loading(true);
      session.sessionId === null && (await getUserSession());
      // refresh sessaion status
      session.sessionId !== null && (await refreshSession());
      setIs1Loading(false);
    };
    init();
  }, [session.sessionId]);

  return (
    <React.Fragment>
      {error && <TModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {is1Loading && <LoadingSpinner asOverlay />}
      {session.sessionId === null && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={createSession}
          disabled={isLoading}
        >
          Create Session
        </Button>
      )}
      {session.sessionId !== null && (
        <div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={isLoading || is1Loading}
          >
            {session.sessionId + " : " + session.sessionState}
          </Button>
          <IconButton color="inherit" onClick={refreshSession}>
            <RefreshIcon />
          </IconButton>
        </div>
      )}
      <Button
        href={session.sparkUiUrl}
        target="_blank"
        color="inherit"
        disabled={!session.sparkUiUrl}
      >
        SparkUI
      </Button>
      <Button
        href={session.driverLogUrl}
        target="_blank"
        color="inherit"
        disabled={!session.driverLogUrl}
      >
        App Log
      </Button>
      <Button
        color="inherit"
        onClick={deleteSession}
        disabled={session.sessionId === null}
      >
        Delete
      </Button>
    </React.Fragment>
  );
};

export default Session;
