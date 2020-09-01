import { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useLocalStorageState } from "./local-storage-hook";

export const useSessionState = () => {
  const intitialValue = {
    sessionId: null,
    sessionState: null,
    appId: null,
    driverLogUrl: null,
    sparkUiUrl: null,
  };
  const auth = useContext(AuthContext);
  //   const [session, setSession] = useState(intitialValue);
  const [session, setSession] = useLocalStorageState(
    "sessionData",
    intitialValue
  );
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refreshSession = async (event) => {
    event && event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_LIVYAPP_URL + "/sessions/" + session.sessionId,
        {
          method: "GET",
          body: null,
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      // console.log(responseData);

      const responseData = await response.json();

      if (!response.ok) {
        // throw new Error(responseData.message);
      }

      let udriverLogUrl, usparkUiUrl;
      if (responseData.appInfo) {
        udriverLogUrl = responseData.appInfo.driverLogUrl;
        usparkUiUrl = responseData.appInfo.sparkUiUrl;
      }

      setSession({
        sessionId: session.sessionId,
        sessionState: responseData.state,
        appId: responseData.appId,
        driverLogUrl: udriverLogUrl,
        sparkUiUrl: usparkUiUrl,
      });
      setIsLoading(false);
      return responseData;
    } catch (err) {
      //   console.log(err);
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const getUserSession = () => {
    // console.log("getUserSession");
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_LIVYAPP_URL + "/sessions/user",
          {
            method: "GET",
            body: null,
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        const responseData = await response.json();
        // console.log(responseData);

        if (!response.ok) {
          //   console.log(responseData.message);
        }

        if (responseData.sid) {
          // console.log(responseData.sid.sessionId);
          await setSession({ sessionId: responseData.sid.sessionId });
          // responseData.sid.sessionId !== null && (await refreshSession());
          setIsLoading(false);
          // console.log(session);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        // console.log(err);
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    };
    getData();
  };

  const createSession = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_LIVYAPP_URL + "/sessions/new",
        {
          method: "POST",
          body: JSON.stringify({
            name: "my-session",
            executorMemory: "1G",
            executorCores: 1,
            numExecutors: 1,
            driverMemory: "1G",
          }),
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      const responseData = await response.json();

      if (!responseData.ok) {
        // console.log(responseData.message);
        // throw new Error(responseData.message);
      }
      setSession({
        sessionId: responseData.id,
        sessionState: responseData.state,
        appId: responseData.appId,
        driverLogUrl: responseData.appInfo.driverLogUrl,
        sparkUiUrl: responseData.appInfo.sparkUiUrl,
      });
      setIsLoading(false);
      return responseData;
    } catch (err) {
      //   console.log(err);
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const deleteSession = async (event) => {
    event && event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_LIVYAPP_URL +
          "/sessions/delete/" +
          session.sessionId,
        {
          method: "DELETE",
          body: null,
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      // console.log(responseData);

      const responseData = await response.json();
      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      responseData && setSession(intitialValue);
      setIsLoading(false);
      return responseData;
    } catch (err) {
      //   console.log(err);
      setSession(intitialValue);
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    session,
    getUserSession,
    refreshSession,
    createSession,
    deleteSession,
    error,
    isLoading,
    clearError,
  };
};
