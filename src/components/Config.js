import React, { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import TransitionModal from "../navigation/components/TModal";
import LoadingSpinner from "../navigation/components/LoadingSpinner";
// import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Config = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  //   const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [inputs, setInputs] = useState({
    name: "my-session",
    executorMemory: "1G",
    executorCores: "1",
    numExecutors: "1",
    driverMemory: "1G",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  //   const history = useHistory();

  const placeSubmitHandler = async (event) => {
    // console.log(inputs);
    event.preventDefault();
    setError("Working , will be available soon");
    // // uncomment after service creation
    // setIsLoading(true);
    // try {
    //   await fetch(process.env.REACT_APP_BACKEND_URL + "/sessions/config", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: inputs.name,
    //       executorMemory: inputs.executorMemory,
    //       executorCores: inputs.executorCores,
    //       numExecutors: inputs.numExecutors,
    //       driverMemory: inputs.driverMemory,
    //     }),
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: "Bearer " + auth.token,
    //     },
    //   });
    //   setIsLoading(false);
    //   // redirect user to a different page
    //   //   history.push("/");
    // } catch (err) {
    //   throw err;
    // }
  };

  const clearError = () => {
    setError(null);
  };

  //   name: "my-session",
  //   executorMemory: "1G",
  //   executorCores: 1,
  //   numExecutors: 1,
  //   driverMemory: "1G",

  return (
    <React.Fragment>
      {error && <TransitionModal error={error} onClear={clearError} />}
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Session Configuration
          </Typography>
          <form className={classes.form} onSubmit={placeSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Session Name"
                  autoComplete="name"
                  autoFocus
                  onChange={handleInputChange}
                  value={inputs.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="executorMemory"
                  label="executorMemory"
                  id="executorMemory"
                  autoComplete="executorMemory"
                  onChange={handleInputChange}
                  value={inputs.executorMemory}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="executorCores"
                  label="executorCores"
                  name="executorCores"
                  autoComplete="executorCores"
                  onChange={handleInputChange}
                  value={inputs.executorCores}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="numExecutors"
                  label="numExecutors"
                  id="numExecutors"
                  autoComplete="numExecutors"
                  onChange={handleInputChange}
                  value={inputs.numExecutors}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="driverMemory"
                  label="driverMemory"
                  id="driverMemory"
                  autoComplete="driverMemory"
                  onChange={handleInputChange}
                  value={inputs.driverMemory}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  multiline
                  rows={10}
                  rowsMax={15}
                  required
                  fullWidth
                  id="config"
                  label="Columns Definition (JSON)"
                  name="config"
                  autoComplete="config"
                  onChange={handleInputChange}
                  value={inputs.config}
                />
              </Grid> */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="checked" color="primary" />}
                  label="These value will be used for creating spark sessions. Please validate carefully and confirm ok ?"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Config;
