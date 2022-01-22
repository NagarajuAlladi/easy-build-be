import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  // @ApiProperty({
  //   type: String,
  //   description: 'Product id',
  //   default: '',
  // })
  // productId: string;

  @ApiProperty({
    type: 'number',
    description: 'number of products',
    default: 2,
  })
  products: 'number';

  @ApiProperty({
    type: String,
    description: 'User id',
    default: '',
  })
  userId: string;

  @ApiProperty({
    type: String,
    description: 'Name of the User for booking',
    default: '',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email of the User',
    default: '',
  })
  email: string;

  @ApiProperty({
    type: Number,
    description: 'PhoneNumber of the User',
    default: '',
  })
  phone: Number;

  @ApiProperty({
    type: Object,
    description: 'Total Price of the Product',
    default: {
      deliveryCharges: '',
      price: '',
      grandTotal: ''
    },
  })
  totalPrice: {
    deliveryCharges: number;
    price: number;
    grandTotal: number;
  };
}
