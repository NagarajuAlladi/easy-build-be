import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiProperty({
    type: String,
    description: 'Company Name',
    default: '',
  })
  companyName: String;

  @ApiProperty({
    type: String,
    description: 'Company Inforamation',
    default: '',
  })
  companyInfo: String;

  @ApiProperty({
    type: String,
    description: 'Company Name',
    default: '',
  })
  @IsEmail()
  companyEmail: String;

  @MaxLength(10)
  @ApiProperty({
    type: String,
    description: 'Company Phone Number',
    default: '',
  })
  companyPhoneNumber: Number;

  @ApiProperty({
    type: Object,
    description: 'Company Address',
    default: {
      street: '',
      city: '',
      state: '',
      country: '',
      pinCode: '',
    },
  })
  address: {
    street: String;
    city: String;
    state: String;
    country: String;
    pinCode: String;
  };

  @ApiProperty({
    type: Array,
    description: 'Available Products',
    default: [],
  })
  availableProducts: Array<String>;
}
