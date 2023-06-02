import { Card } from "primereact/card";
import { Button } from "primereact/button";

import "./receipt-card.css";

function ReceiptCard() {
  const id = "286b8b8e-145d-4a81-b33a-8b8e752d1585";

  const footer = (
    <>
      <div className="flex gap-2 justify-content-end">
        <Button className="p-button-danger">Delete</Button>
        <Button className="p-button">Edit</Button>
      </div>
    </>
  );

  const title = (
    <>
    <div className="flex justify-content-between">
      <h3>Receipt1</h3>
      <i className="bi bi-archive-fill"></i>
    </div>
    </>
  );

  return (
    <>
      <div className="receipt-card">
        <Card title={title} id={id} footer={footer}>
          <p>
            <span>
              <strong className="text-gray-500 pr-1">Id:</strong>
            </span>
            <span className="text-gray-500">{id}</span>
          </p>
        </Card>
      </div>
    </>
  );
}

export { ReceiptCard };
