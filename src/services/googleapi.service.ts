import { gapi } from "gapi-script";

export const getSpreadsheetValuesFromId = (spreadsheetId: string, range: string) => {
  const values = gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: spreadsheetId,
      range: range,
    })
    .then(function (response) {
      const values = response.result.values;
      console.log(values);
    });
    return values;
};

export const createSpreadsheet = async (
  title: string,
  sheetTitle: string,
  numColumns: number,
  numRows: number,
  callback?: any
) => {
  return gapi.client.sheets.spreadsheets
    .create({
      resource: {
        properties: {
          title,
        },
        sheets: [
          {
            properties: {
              title: sheetTitle,
              gridProperties: {
                columnCount: numColumns,
                rowCount: numRows,
                frozenRowCount: 1,
                frozenColumnCount: 1,
              },
              tabColor: {
                alpha: 0.5,
                red: 1.0,
                green: 0.3,
                blue: 0.4,
              },
            },
          },
        ],
      },
    })
    .then((response) => {
      if (callback) callback(response);      
      const spreadSheetId = response.result.spreadsheetId;
      const spreadSheetURL = response.result.spreadsheetUrl;
      console.log("Spreadsheet ID: " + spreadSheetId);
      window.open(spreadSheetURL, "_blank");
      return spreadSheetId;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

export const insertRowsToSheet = (
  range: string,
  spreadsheetId: string,
  values: any[]
) => {
  // values = ["2018-01-01", 2, 3, 4]
  const params = {
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
  };

  const valueRangeBody = {
    range: range,
    majorDimension: "ROWS",
    values: [values],
  };

  gapi.client.sheets.spreadsheets.values
    .append(params, valueRangeBody)
    .then(
      (response) => {
        console.log(response.result);
      },
      (response) => {
        console.error("error: " + response.result.error.message);
      }
    )
    .catch((err) => {
      console.log(err);
      return;
    });
};

export const updateValueFromSheet = (
  row: string,
  column: string,
  data: string,
  spreadsheetId: string
) => {
  const params = {
    spreadsheetId,
    range: `${row}${column}`,
    valueInputOption: "USER_ENTERED",
  };

  const valueRangeBody = {
    range: `${row}${column}`,
    majorDimension: "ROWS",
    values: [[data]],
  };

  gapi.client.sheets.spreadsheets.values
    .update(params, valueRangeBody)
    .then(
      (response) => {
        console.log(response.result);
      },
      (response) => {
        console.error("error: " + response.result.error.message);
      }
    )
    .catch((err) => {
      console.log(err);
      return;
    });
};

export const getSpreadsheetsFromAccount = async (id: string) => {
  gapi.client.drive.files
    .list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
    })
    .then((response) => {
      console.log(response.result.files);
      const isIdInDrive = response.result.files?.filter(id => id)
      if(!!isIdInDrive){
        console.log("Spreadsheet in account");        
        window.open(`https://docs.google.com/spreadsheets/d/${id}`, "_blank");
      }      
    });
};

export const getSheetsFromSpreadsheet = (spreadsheetId: string) => {
  const sheets = gapi.client.sheets.spreadsheets
    .get({
      spreadsheetId: spreadsheetId,
    })
    .then(function (response) {
      const sheets = response.result.sheets;
      console.log(sheets);
    });
    return sheets;
};
