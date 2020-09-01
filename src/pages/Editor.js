import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import QueryData from "../components/QueryData";

import EditorControl from "../components/EditorControl";
import QueryControl from "../components/QueryControl";

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

const Editor = () => {
  // console.log("editor");
  const [editWinNor, setEditWinNor] = useState(true);
  const [resWinNor, setResWinNor] = useState(true);

  const [listRefresh, setListRefresh] = useState(false);
  const [resultRefresh, setResultRefresh] = useState(false);
  const [listSelected, setListSelected] = useState(null);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="xl" disableGutters={true}>
        <Grid container spacing={1}>
          {resWinNor && (
            <Grid item lg={editWinNor ? 6 : 12}>
              <EditorControl
                // listRefresh={listRefresh}
                // setListRefresh={setListRefresh}
                setEditWinNor={setEditWinNor}
                setResWinNor={setResWinNor}
                editWinNor={editWinNor}
                resWinNor={resWinNor}
                listRefresh={listRefresh}
                setListRefresh={setListRefresh}
                // statements={statements}
                // setStatements={setStatements}
              />
            </Grid>
          )}

          {editWinNor && (
            <Grid item lg={resWinNor ? 6 : 12}>
              <QueryControl
                // handleClick={handleClick}
                // selected={selected}
                // setSelected={setSelected}
                // statements={statements}
                // setStatements={setStatements}
                // getQueriesStatus={getQueriesStatus}
                // listRefresh={listRefresh}
                setEditWinNor={setEditWinNor}
                setResWinNor={setResWinNor}
                editWinNor={editWinNor}
                resWinNor={resWinNor}
                listRefresh={listRefresh}
                setListRefresh={setListRefresh}
                resultRefresh={resultRefresh}
                setResultRefresh={setResultRefresh}
                listSelected={listSelected}
                setListSelected={setListSelected}
              />
            </Grid>
          )}

          <Grid item lg={12}>
            <Paper className={classes.data}>
              <Box border={0}>
                {/* {selected ? (
                  <QueryData
                    selected={selected}
                    selectedState={selectedState}
                  />
                ) : (
                  <p>Please select a query to display data</p>
                )} */}
                <QueryData
                  resultRefresh={resultRefresh}
                  listSelected={listSelected}
                  // setResultRefresh={setResultRefresh}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Editor;
