import * as React from "react";
import { useEffect } from "react";
import { getGoogleToken, getGoogleClient } from "../services/googleauth.service";

interface IGoogleAuthProps {}

export const GoogleAuth: React.FunctionComponent<IGoogleAuthProps> = (
  props
) => {
  useEffect(() => {
    getGoogleClient();
  });

  return (
    <>
      <button onClick={getGoogleToken}>Login</button>
    </>
  );
};
