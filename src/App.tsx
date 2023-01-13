import { useState } from "react";
import { GoogleAuth } from "./components/GoogleAuth";
import {
  createSpreadsheet,
  getSheetsFromSpreadsheet,
  getSpreadsheetsFromAccount,
  getSpreadsheetValuesFromId,
  insertRowsToSheet,
  updateValueFromSheet,
} from "./services/googleapi.service";
import { Button, Form, Input, InputNumber } from "antd";

function App() {
  const [id, setId] = useState<string | null>(null);
  const [spreadsheetTitle, setSpreadsheetTitle] = useState("");
  const [sheetTitle, setSheetTitle] = useState("");
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);

  const spreadSheetOperations = async (title: string,
    sheetTitle: string,
    numColumns: number,
    numRows: number,) => {
    const spreadSheetId = await createSpreadsheet(
      title,
      sheetTitle,
      numColumns,
      numRows
    );
    if (!!spreadSheetId) setId(spreadSheetId);
  };

  const insertRow = () => {
    const values = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const range = "A1:F1";
    if (!!id) {
      insertRowsToSheet(range, id, values);
    }
  };

  const getValuesFromSheet = () => {
    const range = "A1:1";
    console.log(id);

    if (!!id) {
      const values = getSpreadsheetValuesFromId(id, range);
      console.log(values);
    }
  };

  const updateValue = () => {
    const row = "E";
    const column = "1";
    const data = "sunday";
    if (!!id) {
      updateValueFromSheet(row, column, data, id);
    }
  };

  const getSpreadsheet = () => {
    if (!!id) {
      getSpreadsheetsFromAccount(id);
    }
  };

  const getSheets = () => {
    if (!!id) {
      getSheetsFromSpreadsheet(id);
    }
  };

  return (
    <>
    <br/>
    <br/>
    <br/>
      <GoogleAuth />
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: "40px" }}
      >
        <Form.Item label="Spreadsheet title" rules={[{ required: true }]}>
          <Input style={{ width: "50%" }} onChange={(value) => {setSpreadsheetTitle(value.target.value)}}/>
        </Form.Item>

        <Form.Item label="Sheet title" rules={[{ required: true }]}>
          <Input style={{ width: "50%" }} onChange={(value) => {setSheetTitle(value.target.value)}}/>
        </Form.Item>
        <Form.Item label="Rows" rules={[{ required: true }]}>
          <InputNumber style={{ width: "50%" }} onChange={(value: number | null) => {if(!!value){setRows(value)}}}/>
        </Form.Item>
        <Form.Item label="Columns" rules={[{ required: true }]}>
          <InputNumber  style={{ width: "50%" }} onChange={(value: number | null) => {if(!!value){setColumns(value)}}}/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={() =>spreadSheetOperations(spreadsheetTitle, sheetTitle, rows, columns)}>Create Spreadsheet</Button>
        </Form.Item>
      </Form>
      <br/>
      <Form>
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={spreadSheetOperations}>
            Create Spreadsheet
          </Button>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={insertRow}>
            Append Data
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={getValuesFromSheet}>
            Get Data
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={updateValue}>
            Update Data
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={getSpreadsheet}>
            Get Spreadsheet
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={getSheets}>
            Get Sheets
          </Button>
        </Form.Item>
      </Form>

      
    </>
  );
}

export default App;
