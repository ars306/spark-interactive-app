import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import { useHttpClient } from "../hooks/http-hook";
import QueryTableRow from "./QueryTableRow";
import TModal from "../navigation/components/TModal";
import LoadingSpinner from "../navigation/components/LoadingSpinner";

import { useQueryOptions } from "../hooks/query-hook";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    height: "100%",
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}));

const QueryList = (props) => {
  // console.log("in QueryList Component");
  const classes = useStyles();
  const {
    statements,
    isLoading,
    error,
    clearError,
    refreshQueryList,
    // getQueryData,
    // setSelected,
    // setSelectedState,
  } = useQueryOptions();

  useEffect(() => {
    refreshQueryList();
  }, [props.listRefresh]);

  const handleClick = (event, id, status) => {
    // console.log("handle click");
    // console.log(id);
    // console.log(event.target.checked);
    // event.target.checked ? setSelected(id) : setSelected(null);
    // event.target.checked ? setSelectedState(status) : setSelectedState(null);
    event.target.checked
      ? props.setListSelected(id)
      : props.setListSelected(null);
    event.target.checked
      ? props.setListSelectedState(status)
      : props.setListSelectedState(null);
    props.setResultRefresh(!props.resultRefresh);
    // console.log(props.resultRefresh);
    // getQueryData(id);
  };

  return (
    <>
      {error && <TModal error={error} onClear={clearError} />}
      {/* {isLoading && <LinearProgress />} */}
      {isLoading && <LoadingSpinner asOverlay />}

      <TableContainer style={{ height: 310 }} component={Paper}>
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Sel</TableCell>
              <TableCell padding="none">id</TableCell>
              <TableCell>Statement</TableCell>
              {/* style={{ width: "300px" }} */}
              <TableCell>Status</TableCell>
              <TableCell>Output</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statements && (
              // {statements.length > 0 && (
              <QueryTableRow rows={statements} handleClick={handleClick} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default QueryList;
