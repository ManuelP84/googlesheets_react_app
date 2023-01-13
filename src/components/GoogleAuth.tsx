import { Button, Form } from "antd";
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
      <Form>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={getGoogleToken}>
            Login with Google
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
