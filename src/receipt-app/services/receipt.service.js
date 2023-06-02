import http from "../../core/services/http.common";

class ReceiptService {
  
  path = "receipt"

  getReceiptById(guid) {
    return http.get(`${this.path}/${guid}`);
  }
  getReceiptsByUserId(userGuid) {
    return http.get(`${this.path}/user/${userGuid}`);
  }
  createReceipt(receipt) {
    return http.post(`${this.path}`, receipt);
  }
  updateReceipt(guid,receipt) {
    return http.put(`${this.path}/${guid}`, receipt);
  }

}

const receiptService = new ReceiptService();

export { receiptService }