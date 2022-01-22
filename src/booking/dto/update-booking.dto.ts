import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
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
      grandTotal: '',
    },
  })
  totalPrice: {
    deliveryCharges: number;
    price: number;
    grandTotal: number;
  };
}
