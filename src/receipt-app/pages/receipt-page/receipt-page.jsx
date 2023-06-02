import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

// Own Components
import { ReceiptCard } from "../../components/receipt/receipt-card";

// Style
import "./receipt-page.css";

// Service
import { receiptService } from "../../services/receipt.service";
import { AddReceipt } from "../../models/add.receipt.model";

function ReceiptPage() {
  const [receipts, setReceipts] = useState([]);

  const [visible, setVisible] = useState(false);
  

  const [logoImageUrl, setLogoImageUrl] = useState("");

  const currencyOptions = [
    { id: 0, name: "Sol" },
    { id: 1, name: "Dollar" },
    { id: 2, name: "Euro" },
  ];

  const documentTypeOptions = [
    { id: 0, name: "Dni" },
    { id: 1, name: "Passport" },
    { id: 2, name: "ImmigrationCard" },
  ];

  // For adding
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState();
  const [documentType, setDocumentType] = useState();

  function createReceipt() {
    event.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const newReceipt = new AddReceipt(
      userId,
      title,
      amount,
      currency.id,
      description,
      identificationNumber,
      documentType.id,
      address
    );
    console.log(newReceipt);
    receiptService.createReceipt(newReceipt).then((res) => {
      console.log(res.data);
    });
  }

  function getReceipts() {
    var user = JSON.parse(localStorage.getItem("user"));
    receiptService.getReceiptsByUserId(user.id).then((res) => {
      const receivedReceipts = res.data;
      setReceipts(receivedReceipts);
    });
  }

  useEffect(() => {
    getReceipts();
    return () => {};
  }, []);

  return (
    <div className="receipt-page flex justify-content-center ">
      <div>
        <div
          style={{ display: "flex", flexFlow: "row wrap" }}
          className="receipts p-4 gap-7"
        >
          {receipts.map((receipt) => (
            <ReceiptCard
              onEvent={getReceipts}
              key={receipt.id}
              receipt={receipt}
            />
          ))}
        </div>
      </div>
      <div style={{ right: "30px", bottom: "30px" }} className="fixed z-4">
        <Button
          icon="bi bi-plus-lg"
          rounded
          severity="success"
          aria-label="Bookmark"
          onClick={() => setVisible(true)}
        />
        <Dialog
          style={{ width: "500px" }}
          header="Add Receipt"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="mt-5">
            <form action="">
              <div className="flex-column">
                <div className="p-float-label mb-5">
                  <InputText
                    id="logoImageUrl"
                    value={logoImageUrl}
                    onChange={(e) => setLogoImageUrl(e.target.value)}
                  />
                  <label htmlFor="logoImageUrl">Logo Image Url</label>
                </div>
                <div className="flex gap-2">
                  <div className="p-float-label mb-5">
                    <InputText
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="username">Title</label>
                  </div>
                  <div className="p-float-label mb-5">
                    <InputNumber
                      id="ammount"
                      value={amount}
                      onChange={(e) => setAmount(e.value)}
                    />
                    <label htmlFor="ammount">Ammount</label>
                  </div>
                  <div className="p-float-label mb-5">
                    <Dropdown
                      editable
                      options={currencyOptions}
                      id="currency"
                      value={currency}
                      optionLabel="name"
                      onChange={(e) => setCurrency(e.target.value)}
                    />
                    <label htmlFor="currency">Currency</label>
                  </div>
                </div>
                <div className="p-float-label mb-5">
                  <InputText
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label htmlFor="username">Description</label>
                </div>
                <div className="flex gap-2">
                  <div style={{ width: "100%" }} className="p-float-label mb-5">
                    <InputText
                      id="identificationNumber"
                      value={identificationNumber}
                      onChange={(e) => setIdentificationNumber(e.target.value)}
                    />
                    <label htmlFor="identificationNumber">
                      Identification Number
                    </label>
                  </div>
                  <div style={{ width: "100%" }} className="p-float-label mb-5">
                    <Dropdown
                      editable
                      options={documentTypeOptions}
                      id="documentType"
                      value={documentType}
                      optionLabel="name"
                      onChange={(e) => setDocumentType(e.target.value)}
                    />
                    <label htmlFor="currency">Document Type</label>
                  </div>
                </div>
                <div className="p-float-label mb-5">
                  <InputText
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label htmlFor="address">Address</label>
                </div>
              </div>
              <div className="flex justify-content-end gap-3">
                <Button className="p-button-danger">Cancel</Button>
                <Button className="p-button-success" onClick={createReceipt}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export { ReceiptPage };
