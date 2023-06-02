import { useEffect } from "react";

// Own Components
import { ReceiptCard } from "../../components/receipt/receipt-card";


// Style
import "./receipt-page.css"

// Service
import { receiptService } from "../../services/receipt.service";

function ReceiptPage() {

  useEffect(() => {
    receiptService.getReceiptsByUserId("286b8b8e-145d-4a81-b33a-8b8e752d1585").then(res => {
      console.log(res.data);
    });

    return () => {

    }
  }, []);

  return (
    <div>
      <div className="receipts p-4">
        <ReceiptCard></ReceiptCard>
      </div>
    </div>
  );
}

export { ReceiptPage };