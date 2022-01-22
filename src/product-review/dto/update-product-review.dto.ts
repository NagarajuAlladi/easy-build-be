import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductReviewDto } from './create-product-review.dto';

export class UpdateProductReviewDto extends PartialType(
  CreateProductReviewDto,
) {
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
