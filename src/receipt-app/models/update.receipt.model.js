class UpdateReceipt {
  constructor(title, amount, currency, description, identificationNumber, documentType, address) {
    this.title = title;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
    this.identificationNumber = identificationNumber;
    this.documentType = documentType;
    this.address = address;
  }
}

export { UpdateReceipt }