import { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

import PropTypes from "prop-types";

import "./receipt-card.css";

// Services
import { receiptService } from "../../services/receipt.service";

// Models
import { UpdateReceipt } from "../../models/update.receipt.model";

function ReceiptCard({ receipt, onEvent }) {
  const currencyOptions = [
    { id: 0, currencyName: "Sol" },
    { id: 1, currencyName: "Dollar" },
    { id: 2, currencyName: "Euro" },
  ];

  const documentTypeOptions = [
    { id: 0, currencyName: "Dni" },
    { id: 1, currencyName: "Passport" },
    { id: 2, currencyName: "ImmigrationCard" },
  ];

  const [visible, setVisible] = useState(false);

  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState();
  const [documentType, setDocumentType] = useState(); 

  
  // Cycles
  useEffect(() => {
    receiptService.getReceiptById(receipt.id).then((res) => {
      const receivedReceipts = res.data;
      setId(receivedReceipts.id);
      setTitle(receivedReceipts.title);
      setAmount(receivedReceipts.amount);
      setCurrency(receivedReceipts.currency);
      setDescription(receivedReceipts.description);
      setAddress(receivedReceipts.address);
      setDocumentType(receivedReceipts.documentType);
      setIdentificationNumber(receivedReceipts.identificationNumber);
    });
    
    return () => {};
  }, []);


  // Methods

  function updateReceipt() {
    event.preventDefault();
    var updatedReceipt = new UpdateReceipt(title, amount, currency.id, description, identificationNumber, documentType.id, address);
    console.log(updatedReceipt);
    receiptService.updateReceipt(id, updatedReceipt).then(res => { console.log(res); onEvent("timeToUpdate"); },);
  }

  const footer = (
    <>
      <div className="flex gap-2 justify-content-end">
        <Button className="p-button-danger">Delete</Button>
        <Button className="p-button" onClick={() => setVisible(true)}>
          Edit
        </Button>
      </div>
    </>
  );

  // eslint-disable-next-line no-unused-vars

  const titleHtml = (
    <>
      <div className="flex justify-content-between">
        <h3>{receipt.title}</h3>
        <i className="bi bi-archive-fill"></i>
      </div>
    </>
  );

  return (
    <>
      <div className="receipt-card">
        <Card title={titleHtml} footer={footer}>
          <p>
            <span>
              <strong className="text-gray-500 pr-1">Id:</strong>
            </span>
            <span className="text-gray-500">{receipt.id}</span>
          </p>
        </Card>
        <Dialog
          style={{ width: "500px" }}
          header="Edit Receipt"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="mt-5">
            <form action="">
              <div className="flex-column">
                <div className="p-float-label mb-5">
                  <InputText
                    disabled
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <label htmlFor="username">GUID</label>
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
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <label htmlFor="ammount">Ammount</label>
                  </div>
                  <div className="p-float-label mb-5">
                    <Dropdown
                      editable
                      options={currencyOptions}
                      id="currency"
                      value={currency}
                      optionLabel="currencyName"
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
                  <div style={{width: "100%"}} className="p-float-label mb-5">
                    <InputText
                      id="identificationNumber"
                      value={identificationNumber}
                      onChange={(e) => setIdentificationNumber(e.target.value)}
                    />
                    <label htmlFor="identificationNumber">
                      Identification Number
                    </label>
                  </div>
                  <div style={{width: "100%"}} className="p-float-label mb-5">
                    <Dropdown
                      editable 
                      options={documentTypeOptions}
                      id="documentType"
                      value={documentType}
                      optionLabel="currencyName"
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
                <Button
                  className="p-button-success"
                  onClick={updateReceipt}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
}

ReceiptCard.propTypes = {
  receipt: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // Add more prop types for other receipt properties if needed
  }).isRequired,
  onEvent: PropTypes.func.isRequired
};

export { ReceiptCard };
