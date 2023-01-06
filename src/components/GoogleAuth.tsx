import * as React from "react";
import { useEffect } from "react";
import {
  getGoogleToken,
  getGoogleClient,
  loadGapiClient,
  startGapiClient,
} from "../services/googleauth.service";

interface IGoogleAuthProps {}

export const GoogleAuth: React.FunctionComponent<IGoogleAuthProps> = (
  props
) => {
  useEffect(() => {
    getGoogleClient()
      .then(() => {
        loadGapiClient(startGapiClient);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  });

  return (
    <>
      <button onClick={getGoogleToken}>Login</button>
    </>
  );
};
