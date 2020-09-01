// import { useState } from "react";
import { useHttpClient } from "./http-hook";
import { useAuth } from "./auth-hook";
// import { useQueryPrepare } from "../hooks/query-prepare-hook";

export const useQuerySubmit = (
  query,
  // statements,
  // setStatements,
  selectedRow,
  refresh,
  setRefresh
) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { token } = useAuth();
  // const statement = {};

  const session = JSON.parse(window.localStorage.getItem("sessionData"));

  const submitQuery = async (event) => {
    // submit the query
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_LIVYAPP_URL +
          "/statements/new" +
          "/" +
          session.sessionId,
        "POST",
        JSON.stringify({
          code: query,
          kind: "sql",
        }),
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      responseData.id && setRefresh(!refresh);
      // statement.id = responseData.id;
      // statement.statement = query;
      // statement.status = responseData.state;
      // statement.submittedts = "";

      // setStatements([...statements, statement]);
    } catch (err) {
      console.log(err);
    }
  };

  // const getQueriesStatus = async () => {
  //   let updatedStatements = [];
  //   try {
  //     const responseData = await sendRequest(
  //       process.env.REACT_APP_LIVYAPP_URL + "/statements/" + session.sessionId,
  //       "GET",
  //       null,
  //       {
  //         "Content-type": "application/json",
  //         Authorization: "Bearer " + token,
  //       }
  //     );

  //     // return row to update query list
  //     // console.log(resonseData.statements);
  //     responseData.statements.map((row) => {
  //       // console.log(row);
  //       updatedStatements = [
  //         ...updatedStatements,
  //         { id: row.id, statement: row.code, status: row.state },
  //       ];
  //       return updatedStatements;
  //     });
  //     // console.log(updatedStatements);
  //     setStatements(updatedStatements);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const cancelQuery = async () => {
    // return query output
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_LIVYAPP_URL +
          "/statements/cancel" +
          session.sessionId +
          "/" +
          selectedRow.id,
        "POST",
        null,
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
      // update query status
      // console.log(responseData);
      responseData && setRefresh(!refresh);
      // const updatedStatements = statements.map((statement) =>
      //   statement.id === selectedRow.id
      //     ? { ...statement, state: responseData.state }
      //     : statement
      // );
      // setStatements(updatedStatements);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    submitQuery,
    cancelQuery,
    // getQueriesStatus,
    isLoading,
    error,
    clearError,
  };
};
