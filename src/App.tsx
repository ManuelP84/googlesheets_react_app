import { useState } from "react"
import { GoogleAuth } from "./components/GoogleAuth"
import { createSpreadsheet, getSheetsFromSpreadsheet, getSpreadsheetsFromAccount, getSpreadsheetValuesFromId, insertRowsToSheet, updateValueFromSheet } from "./services/googleapi.service"

function App() {
  const [id, setId] = useState<string | null>(null);

  const spreadSheetOperations = async () => {
    const spreadSheetId = await createSpreadsheet("Invoices Data", "Invoices", 50, 50)
    if(!!spreadSheetId) setId(spreadSheetId);    
  }

  const insertRow = () => {
    const values = ["monday", "tuesday", "wednesday", "thursday", "friday"]
    const range = "A1:F1"
    if(!!id){
    insertRowsToSheet(range, id, values)
    }
  }

  const getValuesFromSheet = () => {
    const range = "A1:1"
    console.log(id);
    
    if(!!id){
      const values = getSpreadsheetValuesFromId(id, range);
      console.log(values);      
    }
  }

  const updateValue = () => {
    const row = "E"
    const column = "1";
    const data = "sunday";
    if(!!id){
      updateValueFromSheet(row, column, data, id);
    }
  }

  const getSpreadsheet = () => {
    if(!!id){
      getSpreadsheetsFromAccount(id);
    }
  }

  const getSheets = () => {
    if(!!id){
      getSheetsFromSpreadsheet(id);
    }
  }

  return (
    <>
    <GoogleAuth/>
    <button onClick={spreadSheetOperations}>Create Spreadsheet</button>
    <button onClick={insertRow}>Append Data</button>
    <button onClick={getValuesFromSheet}>Get Data</button>
    <button onClick={updateValue}>Update Data</button>
    <button onClick={getSpreadsheet}>Get Spreadsheet</button>
    <button onClick={getSheets}>Get Sheets</button>
    </>
  )
}

export default App
