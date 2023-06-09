// React
import { useContext, useEffect, useState } from "react";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

import { classNames } from "primereact/utils";

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
import { InputTextarea } from "primereact/inputtextarea";

function ReceiptCard({ receipt, onEvent }) {
  // Consts
  const navigate = useNavigate();
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

  // Inputs
  let defaultValues = {
    ammount: "",
    currency: "",
    title: "",
    description: "",
    address: "",
    identificationNumber: "",
    documentType: "",
    logoImageUrl: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const [id, setId] = useState("");
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
      setLogoImageUrl(receivedReceipts.logoImageUrl);
      reset({
        title: receivedReceipts.title,
        amount: receivedReceipts.amount,
        currency: receivedReceipts.currency,
        description: receivedReceipts.description,
        address: receivedReceipts.address,
        documentType: receivedReceipts.documentType,
        identificationNumber: receivedReceipts.identificationNumber,
      });
    });

    return () => {};
  }, [receipt.id]);

  // Methods
  // Update Receipt
  function updateReceipt(data) {
    event.preventDefault();
    var updatedReceipt = new UpdateReceipt(
      data.title,
      data.amount,
      data.currency.id,
      data.description,
      data.identificationNumber,
      data.documentType.id,
      data.address,
      data.logoImageUrl
    );
    console.log(updatedReceipt);
    receiptService.updateReceipt(id, updatedReceipt).then((res) => {
      console.log(res);
      setVisible(false);
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

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

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
            <form action="" onSubmit={handleSubmit(updateReceipt)}>
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
                <div className="flex gap-2 mb-3">
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: "Title is required" }}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="">
                          <span className="p-float-label ">
                            <InputText
                              id={field.name}
                              value={field.value}
                              className={classNames({
                                "p-invalid": fieldState.error,
                              })}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                            <label htmlFor={field.name}>Title</label>
                          </span>
                          {getFormErrorMessage(field.name)}
                        </div>
                      </>
                    )}
                  />
                  <Controller
                    name="amount"
                    control={control}
                    rules={{ required: "Amount is required" }}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="">
                          <span className="p-float-label ">
                            <InputNumber
                              minFractionDigits={2}
                              id={field.name}
                              inputRef={field.ref}
                              value={field.value}
                              inputClassName={classNames({
                                "p-invalid": fieldState.error,
                              })}
                              onValueChange={(e) => field.onChange(e)}
                            />
                            <label htmlFor={field.name}>Amount</label>
                          </span>
                          {getFormErrorMessage(field.name)}
                        </div>
                      </>
                    )}
                  />
                  <Controller
                    name="currency"
                    control={control}
                    rules={{ required: "Currency is required" }}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="">
                          <span className="p-float-label ">
                            <Dropdown
                              editable
                              options={currencyOptions}
                              id={field.name}
                              value={field.value}
                              optionLabel="name"
                              className={classNames({
                                "p-invalid": fieldState.error,
                              })}
                              onChange={(e) => field.onChange(e.value)}
                            />
                            <label htmlFor={field.name}>Currency</label>
                          </span>
                          {getFormErrorMessage(field.name)}
                        </div>
                      </>
                    )}
                  />
                </div>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="mb-4">
                        <span className="p-float-label ">
                          <InputTextarea
                            id={field.name}
                            value={field.value}
                            className={classNames({
                              "p-invalid": fieldState.error,
                            })}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                          <label htmlFor={field.name}>Description</label>
                        </span>
                        {getFormErrorMessage(field.name)}
                      </div>
                    </>
                  )}
                />
                <div className="flex gap-2 mb-3">
                  <Controller
                    name="identificationNumber"
                    control={control}
                    rules={{ required: "Identification Number is required" }}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="">
                          <span
                            style={{ width: "100%" }}
                            className="p-float-label"
                          >
                            <InputNumber
                              useGrouping={false}
                              id={field.name}
                              value={field.value}
                              className={classNames({
                                "p-invalid": fieldState.error,
                              })}
                              onValueChange={(e) => field.onChange(e)}
                            />
                            <label htmlFor={field.name}>
                              Identification Number
                            </label>
                          </span>
                          {getFormErrorMessage(field.name)}
                        </div>
                      </>
                    )}
                  />
                  <Controller
                    name="documentType"
                    control={control}
                    rules={{ required: "Document Type is required" }}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="">
                          <span className="p-float-label ">
                            <Dropdown
                              editable
                              options={documentTypeOptions}
                              id={field.name}
                              value={field.value}
                              optionLabel="name"
                              focusInputRef={field.ref}
                              className={classNames({
                                "p-invalid": fieldState.error,
                              })}
                              onChange={(e) => field.onChange(e.value)}
                            />
                            <label htmlFor={field.name}>Document Type</label>
                          </span>
                          {getFormErrorMessage(field.name)}
                        </div>
                      </>
                    )}
                  />
                </div>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="mb-4">
                        <span className="p-float-label ">
                          <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({
                              "p-invalid": fieldState.error,
                            })}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                          <label htmlFor={field.name}>Address</label>
                        </span>
                        {getFormErrorMessage(field.name)}
                      </div>
                    </>
                  )}
                />
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
                          getValues("title"),
                          getValues("amount"),
                          getValues("currency"),
                          getValues("description"),
                          getValues("identificationNumber"),
                          getValues("documentType"),
                          getValues("address"),
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
                  <Button type="submit" className="p-button-success">
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
