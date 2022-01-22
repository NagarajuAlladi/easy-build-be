export class Booking{
  productId: String;
  products: Number;
  userId: String;
  bookingDate: Date;
  name: String;
  email: String;
  phone: Number;
  totalPrice: {
    deliveryCharges: Number;
    price: Number;
    grandTotal: Number;
  }
}