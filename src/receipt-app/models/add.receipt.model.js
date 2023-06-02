class AddReceipt {
  constructor(userId, title, amount, currency, description, identificationNumber, documentType, address) {
    this.userId = userId;
    this.title = title;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
    this.identificationNumber = identificationNumber;
    this.documentType = documentType;
    this.address = address;
  }
}

export { AddReceipt }