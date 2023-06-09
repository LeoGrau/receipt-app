// React 
import { useContext, useEffect, useState } from "react";

// React Hook Form
// import { Controller, useForm } from "react-hook-form";

// Primereact 
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

import PropTypes from "prop-types";

import "./receipt-card.css";
import { useNavigate } from "react-router-dom";

// Services
import { receiptService } from "../../services/receipt.service";

// Models
import { UpdateReceipt } from "../../models/update.receipt.model";
import { Receipt } from "../../models/receipt.model";

// Context
import { PrintContext } from "../../contexts/print-context";


function ReceiptCard({ receipt, onEvent }) {
  
  // Consts
  const navigate = useNavigate();
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

  // Inputs
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [logoImageUrl, setLogoImageUrl] = useState("");
  
  // Visibility for Dialog
  const [visible, setVisible] = useState(false);
  
  // Visibility for Delete Dialog Confirmation
  const [deleteVisible, setDeleteVisible] = useState(false);
  
  // Contexts
  const { updatePrintData } = useContext(PrintContext);

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
      setLogoImageUrl(receivedReceipts.logoImageUrl);
    });

    return () => {};
  }, [receipt.id]);

  // Methods
  // Update Receipt
  function updateReceipt() {
    event.preventDefault();
    var updatedReceipt = new UpdateReceipt(
      title,
      amount,
      currency.id,
      description,
      identificationNumber,
      documentType.id,
      address,
      logoImageUrl
    );
    console.log(updatedReceipt);
    receiptService.updateReceipt(id, updatedReceipt).then((res) => {
      console.log(res);
      onEvent("timeToUpdate");
    });
  }

  // Delete Receipt
  function deleteReceipt() {
    event.preventDefault();
    receiptService.deleteReceipt(id).then((res) => {
      console.log(res);
      onEvent("timeToUpdate");
    });
  }

  // Template
  const footer = (
    <>
      <div className="flex gap-2 justify-content-end">
        <Button
          className="p-button-danger"
          onClick={() => setDeleteVisible(true)}
        >
          Delete
        </Button>
        <Button className="p-button" onClick={() => setVisible(true)}>
          Edit
        </Button>
      </div>
    </>
  );

  const titleHtml = (
    <>
      <div className="flex justify-content-between">
        <h3>{receipt.title}</h3>
        <i className="bi bi-archive-fill"></i>
      </div>
    </>
  );
  const headerHtml = (
    <>
      <div className="flex flex-column gap-4">
        <h3>{receipt.title}</h3>
        <div className="flex justify-content-center">
          <img
            src={logoImageUrl}
            style={{ width: "50%", objectFit: "contain" }}
          />
        </div>
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
          header="Delete"
          id="delete-dialog"
          visible={deleteVisible}
          onHide={() => setDeleteVisible(false)}
        >
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-content-end gap-2 mt-3">
            <Button className="p-button" onClick={deleteReceipt}>
              Yes
            </Button>
            <Button
              className="p-button-danger"
              onClick={() => setDeleteVisible(false)}
            >
              Cancel
            </Button>
          </div>
        </Dialog>
        <Dialog
          style={{ width: "500px" }}
          header={headerHtml}
          visible={visible}
          id="print-content"
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
                      minFractionDigits={2}
                      id="ammount"
                      value={amount}
                      onChange={(e) => setAmount(e.value)}
                    />
                    <label htmlFor="ammount">Amount</label>
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
              <div className="flex justify-content-between">
                <a
                  target="_blank"
                  onClick={() => {
                    navigate({ pathname: "/print" });
                    updatePrintData(
                      JSON.stringify(
                        new Receipt(
                          id,
                          title,
                          amount,
                          currency,
                          description,
                          identificationNumber,
                          documentType,
                          address,
                          logoImageUrl
                        )
                      )
                    );
                  }}
                >
                  <i className="bi bi-printer-fill text-2xl"></i>
                </a>
                <div className="flex justify-content-end gap-3">
                  <Button className="p-button-danger">Cancel</Button>
                  <Button className="p-button-success" onClick={updateReceipt}>
                    Save
                  </Button>
                </div>
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
  onEvent: PropTypes.func.isRequired,
};

export { ReceiptCard };
