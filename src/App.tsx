import { GoogleAuth } from "./components/GoogleAuth"
import { createSpreadsheet } from "./services/googleapi.service"

function App() {

  return (
    <>
    <GoogleAuth/>
    <button onClick={() => createSpreadsheet("Invoices Data", "Invoices", 50, 50)}>Create Spreadsheet</button>
    <button >Get Data</button>
    <button >Append Data</button>
    <button >Update Data</button>
    </>
  )
}

export default App
