import { useEffect, useState } from "react";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// PrimeReact Components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

import { classNames } from "primereact/utils";

// Own Components
import { ReceiptCard } from "../../components/receipt/receipt-card";

// Style
import "./receipt-page.css";

// Service
import { receiptService } from "../../services/receipt.service";
import { AddReceipt } from "../../models/add.receipt.model";

function ReceiptPage() {
  // Attributes
  // Inputs
  // const [amount, setAmount] = useState();
  // const [currency, setCurrency] = useState("");
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [address, setAddress] = useState("");
  // const [identificationNumber, setIdentificationNumber] = useState();
  // const [documentType, setDocumentType] = useState();
  // const [logoImageUrl, setLogoImageUrl] = useState();

  // To Show Receipts
  const [receipts, setReceipts] = useState([]);

  // For Dialog Visibility
  const [visible, setVisible] = useState(false);

  // Consts
  const currencyOptions = [
    { id: -1, name: "" },
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
  const defaultValues = {
    amount: null,
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
    reset,
  } = useForm({ defaultValues });

  // Methods
  // Add receipt
  function createReceipt(data) {
    event.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user")).id;
    console.log("data", data);
    const newReceipt = new AddReceipt(
      userId,
      data.title,
      data.amount,
      data.currency.id,
      data.description,
      data.identificationNumber,
      data.documentType.id,
      data.address,
      data.logoImageUrl
    );
    console.log(newReceipt);
    receiptService.createReceipt(newReceipt).then((res) => {
      console.log(res.data);
      getReceipts();
      reset();
      setVisible(false);
    });
  }

  // Get all receipts
  function getReceipts() {
    var user = JSON.parse(localStorage.getItem("user"));
    receiptService.getReceiptsByUserId(user.id).then((res) => {
      const receivedReceipts = res.data;
      setReceipts(receivedReceipts);
    });
  }

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  // UseEffect
  useEffect(() => {
    localStorage.getItem("printReceipt")
      ? localStorage.removeItem("printReceipt")
      : null;
    getReceipts();
    return () => {};
  }, []);

  // Template
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
            <form action="" onSubmit={handleSubmit(createReceipt)}>
              <div className="flex-column">
                <Controller
                  name="logoImageUrl"
                  control={control}
                  rules={{ required: "Image URL is required" }}
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
                          <label htmlFor={field.name}>Logo Image Url</label>
                        </span>
                        {getFormErrorMessage(field.name)}
                      </div>
                    </>
                  )}
                />
                <div className="flex gap-2 mb-4">
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
                <div className="flex gap-2 mb-4">
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
              <div className="flex justify-content-end gap-3">
                <Button className="p-button-danger">Cancel</Button>
                <Button type="submit" className="p-button-success">
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
