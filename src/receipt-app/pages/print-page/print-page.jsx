import { useContext, useEffect, useState } from "react";
import { PrintContext } from "../../contexts/print-context";
// import { Receipt } from "../../models/receipt.model";

// Styles
import "./print-page.css";
import { Button } from "primereact/button";

function PrintPage() {
  const { printData } = useContext(PrintContext);

  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState();
  const [description, setDescription] = useState();
  const [identificationNumber, setIdentificationNumber] = useState();
  const [documentType, setDocumentType] = useState();
  const [address, setAddress] = useState();
  const [logoImageUrl, setLogoImageUrl] = useState();

  function setReceiptForPrinting() {
    console.log(localStorage.getItem("printReceipt"));
    if (localStorage.getItem("printReceipt") == null) {
      console.log("Item is null so i will fill it");
      localStorage.setItem("printReceipt", printData);
    }

    var printReceipt = JSON.parse(localStorage.getItem("printReceipt"));

    setId(printReceipt.id);
    setTitle(printReceipt.title);
    setAmount(printReceipt.amount);
    setCurrency(printReceipt.currency);
    setDescription(printReceipt.description);
    setIdentificationNumber(printReceipt.identificationNumber);
    setDocumentType(printReceipt.documentType);
    setAddress(printReceipt.address);
    setLogoImageUrl(printReceipt.logoImageUrl);
  }

  function setCurrencyAbbreviation(currency) {
    switch (currency) {
      case "Sol":
        return "S/."
      case "Dollar":
        return "$"
      case "Euro":
        return "€"
      default:
        break;
    }
  }

  // Use Effect Cycle
  useEffect(() => {
    setReceiptForPrinting();
    // window.addEventListener("beforeunload", () => { localStorage.removeItem("printReceipt"); });
    return () => {
      //window.removeEventListener("beforeunload", () => { localStorage.removeItem("printReceipt"); })
    };
  }, []);

  return (
    <>
      <div className="flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="receipt-print bg-black-alpha-90">
          <div className="bg-white">
            <img src={logoImageUrl} alt="" />
          </div>
          <div className="flex bg-black-alpha-90" style={{gap: "2px"}}>
            <p style={{width: "auto"}}> ID </p>
            <p className="bg-white" style={{width: "100%"}}> {id} </p>
          </div>
          <div className="flex bg-black-alpha-90" style={{gap: "2px"}}>
            <p style={{width: "auto"}}> { documentType } </p>
            <p className="bg-white" style={{width: "100%"}}> {identificationNumber} </p>
          </div>
          <div className="flex bg-black-alpha-90" style={{gap: "2px"}}>
            <p style={{width: "auto"}}> Amount </p>
            <p className="bg-white"style={{width: "100%"}}> {amount + " " + setCurrencyAbbreviation(currency)} </p>
          </div>
          <div className="flex bg-black-alpha-90" style={{gap: "2px"}}>
            <p style={{width: "auto"}}> Title </p>
            <p className="bg-white" style={{width: "100%"}}> {title} </p>
          </div>
          <div className="flex bg-black-alpha-90" style={{gap: "2px"}}>
            <p style={{width: "auto"}}> Address </p>
            <p className="bg-white" style={{width: "100%"}}> {address} </p>
          </div>
          <div className="flex bg-black-alpha-90" style={{gap: "2px", gridColumn: "1 / 4"}}>
            <p style={{width: "auto"}}> Description </p>
            <p className="bg-white" style={{width: "100%"}}> {description} </p>
          </div>
      </div>
      </div>
      <div className="fixed z-2" style={{ right: "20px", bottom: "20px"}}>
        <Button onClick={window.print()} rounded icon="bi bi-printer-fill" className="text-2xl" style={{width: "50px", height: "50px"}}></Button>
      </div>
    </>
  );
}

export { PrintPage };
