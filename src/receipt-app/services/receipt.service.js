import http from "../../core/services/http.common";

class ReceiptService {
  
  path = "receipt"

  getReceiptById(guid) {
    return http.get(`${this.path}/${guid}`);
  }
  getReceiptsByUserId(userGuid) {
    return http.get(`${this.path}/user/${userGuid}`);
  }

}

const receiptService = new ReceiptService();

export { receiptService }