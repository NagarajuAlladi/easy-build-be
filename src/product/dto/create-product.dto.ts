import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'Product Name',
    default: '',
  })
  productName: String;

  @ApiProperty({
    type: String,
    description: 'Product Information',
    default: '',
  })
  productInfo: String;

  @ApiProperty({
    type: String,
    description: 'Product Weight',
    default: '',
  })
  weight: Number;

  @ApiProperty({
    type: Number,
    description: 'No. Of Products',
    default: '',
  })
  noOfProducts: Number;

  @ApiProperty({
    type: String,
    description: 'Product Type',
    default: '',
  })
  productType: String;

  @ApiProperty({
    type: String,
    description: 'Product COst',
    default: '',
  })
  cost: Number;
}
