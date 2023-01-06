import { gapi } from "gapi-script";
import credentials from "../env/credentials.json";

const CLIENT_ID = credentials.CLIENT_ID;
const API_KEY = credentials.API_KEY;
const SCOPE = credentials.SPREADSHEET_SCOPE;
const CLIENT_SECRET = credentials.CLIENT_SECRET;
const REDIRECT_URL = credentials.REDIRECT_URL;
const SPREAD_SHEETS_URL =
  "https://sheets.googleapis.com/$discovery/rest?version=v4";
const API_NAME = "client:auth2";

let tokenClient: any;
let access_token: any;

export async function getGoogleClient() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPE,
    callback: (tokenResponse) => {
      access_token = tokenResponse.access_token;
      console.log(tokenResponse);
      gapi.auth.setToken(access_token);
    },
  });
}

export async function getGoogleToken() {
  await tokenClient.requestAccessToken();
}

export function startGapiClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
    })
    .then(function () {
      gapi.client.load(SPREAD_SHEETS_URL);
    })
    .then(
      () => {
        console.log("gapi loaded!");
        // const token = gapi.auth2
        //   .getAuthInstance()
        //   .currentUser.get()
        //   .getAuthResponse();
      },
      (err) => {
        console.log("Error: " + err.result.error.message);
      }
    );
}

export async function loadGapiClient(callback: any) {
  gapi.load(API_NAME, callback);
}