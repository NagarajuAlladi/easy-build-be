export class Company {
  companyName: String;
  companyInfo: String;
  companyEmail: String;
  companyPhoneNumber: Number;
  address: {
    street: String;
    city: String;
    state: String;
    country: String;
    pinCode: String;
  };
  availableProducts: Array<String>;
}
