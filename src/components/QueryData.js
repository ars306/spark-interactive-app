import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/auth-context";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import TModal from "../navigation/components/TModal";
import LoadingSpinner from "../navigation/components/LoadingSpinner";

// import { useQueryOptions } from "../hooks/query-hook";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    // maxHeight: 550,
    height: 300,
  },
}));

const QueryData = (props) => {
  // console.log("Query Data");
  const auth = useContext(AuthContext);
  const classes = useStyles();
  // const { session, selected } = useQueryOptions();
  const [schema, setSchema] = useState();
  const [resultData, setResultData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const session = JSON.parse(window.localStorage.getItem("sessionData"));

  // console.log(schema);

  // console.log(props.resultRefresh);
  // console.log(props.listSelected);
  useEffect(() => {
    const getQueryResult = async () => {
      // return query output
      // console.log("getQueryData");
      // console.log(props.listSelected);
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_LIVYAPP_URL +
            "/statements/" +
            session.sessionId +
            "/" +
            // selectedId,
            props.listSelected,
          {
            method: "GET",
            body: null,
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        // update result rows

        const responseData = await response.json();
        // console.log(responseData);
        // console.log(responseData.data["schema"]);
        // console.log(responseData.data["data"]);
        if (responseData.output) {
          if (responseData.output.status === "error") {
            setSchema([{ name: "ename" }, { name: "evalue" }]);
            setResultData([
              [responseData.output.ename, responseData.output.evalue],
            ]);
          } else {
            setResultData(responseData.output.data["application/json"].data);
            setSchema(
              responseData.output.data["application/json"].schema.fields
            );
          }
        }

        // console.log(responseData.output.data["application/json"]);
        // console.log(responseData.output.data["application/json"].schema.fields);
        // console.log(responseData.output.data["application/json"].data);
        // console.log(schema);
        // console.log(resultData);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
      // return { schema, resultData };
    };

    // console.log(selected);
    if (props.listSelected !== null) {
      //   console.log("data");
      getQueryResult();
    } else {
      setResultData(null);
      setSchema(null);
    }
  }, [props.listSelected]);

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      {error && <TModal error={error} onClear={clearError} />}
      {/* {isLoading && <LinearProgress />} */}
      {isLoading && <LoadingSpinner asOverlay />}
      {!props.listSelected && <p>Please select a query to display data</p>}
      {props.listSelected && (
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {schema &&
                  schema.map((row, index) => (
                    <TableCell key={index}>{row.name}</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {resultData &&
                resultData.map((row, index) => (
                  <TableRow key={index}>
                    {row.map((col, colIndex) => (
                      <TableCell key={colIndex}>{row[colIndex]}</TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default QueryData;
