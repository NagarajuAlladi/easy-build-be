import { ApiProperty } from '@nestjs/swagger';

export class CreateProductReviewDto {
  @ApiProperty({
    type: String,
    description: 'Id of thr User,who is giving the review',
    default: '',
  })
  userId: string;

  @ApiProperty({
    type: String,
    description: 'Id of the Product',
    default: '',
  })
  productId: string;

  @ApiProperty({
    type: String,
    description: 'Comment for the Product',
    default: '',
  })
  comment: string;

  @ApiProperty({
    type: Number,
    description: 'rating for the Product',
    default: '',
  })
  rate: number;
}
