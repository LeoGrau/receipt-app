class Receipt {
  constructor(id, title, amount, currency, description, identificationNumber, documentType, address, logoImageUrl) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
    this.identificationNumber = identificationNumber;
    this.documentType = documentType;
    this.address = address;
    this.logoImageUrl = logoImageUrl;
  }
}

export { Receipt }