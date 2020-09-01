import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import TModal from "../navigation/components/TModal";
import LoadingSpinner from "../navigation/components/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
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

const Auth = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_USER_URL + "/users/login",
        "POST",
        JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token);
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {error && <TModal error={error} onClear={clearError} />}
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <form className={classes.form} onSubmit={authSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E Mail"
                  autoComplete="name"
                  autoFocus
                  onChange={handleInputChange}
                  value={inputs.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  onChange={handleInputChange}
                  value={inputs.password}
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
              Login
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Auth;
