import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetFilterDto {
  @ApiPropertyOptional({
    type: String,
    description: 'search by id',
    default: '',
  })
  id: string;
  @ApiPropertyOptional({
    type: String,
    description: 'filter with a userid',
    default: '',
  })
  userId: string;

  @ApiPropertyOptional({
    type: String,
    description: 'filter with a productid',
    default: '',
  })
  productId: string;
}
