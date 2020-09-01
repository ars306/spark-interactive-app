import { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const useQueryOptions = () => {
  const auth = useContext(AuthContext);
  const [statements, setStatements] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const session = JSON.parse(window.localStorage.getItem("sessionData"));

  const [selected, setSelected] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const refreshQueryList = () => {
    // console.log("refresh query");
    let updatedStatements = [];
    const getQueriesStatus = async () => {
      //   console.log("run");
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_LIVYAPP_URL +
            "/statements/" +
            session.sessionId,
          {
            method: "GET",
            body: null,
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        // return row to update query list

        const responseData = await response.json();
        // console.log(responseData.statements);
        let uid, ucode, ustate, ustatus;
        if (responseData.statements) {
          responseData.statements.map((row) => {
            // console.log(row);
            uid = row.id;
            ucode = row.code;
            ustate = row.state;
            row.output && (ustatus = row.output.status);

            updatedStatements = [
              ...updatedStatements,
              {
                id: uid,
                statement: ucode,
                status: ustate,
                output_status: ustatus,
              },
            ];
            return updatedStatements;
          });
        }
        if (!response.ok) {
          // throw new Error(responseData.message);
        }

        // console.log(updatedStatements);
        setStatements(updatedStatements);
        setIsLoading(false);
        // console.log(statements);
      } catch (err) {
        // console.log(err);
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    };
    // getQueriesStatus();
    // console.log(session.sessionId);
    // console.log(session.sessionState);
    if (session && session.sessionId !== null && session.sessionState) {
      getQueriesStatus();
    }
    // else {
    //   setError("No Valid active sesssion to show statements");
    // }

    // session.sessionId && getQueriesStatus();
  };

  const clearError = () => {
    setError(null);
  };

  const cancelQuery = async (selectedId) => {
    // console.log("cancel query");
    // return query output
    setIsLoading(true);
    try {
      const responseData = await fetch(
        process.env.REACT_APP_LIVYAPP_URL +
          "/statements/cancel" +
          session.sessionId +
          "/" +
          selectedId,
        {
          method: "POST",
          body: null,
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      // update query status
      // console.log(responseData);
      setIsLoading(false);
      return responseData;
    } catch (err) {
      //   console.log(err);
      setError(err.message);
      setIsLoading(true);
      throw err;
    }
  };

  return {
    error,
    isLoading,
    clearError,
    refreshQueryList,
    statements,
    selected,
    selectedState,
    cancelQuery,
    setSelectedState,
    setSelected,
  };
};
