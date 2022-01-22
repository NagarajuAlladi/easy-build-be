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
    description: 'filter with a userId',
    default: '',
  })
  userId: string;

  @ApiPropertyOptional({
    type: String,
    description: 'filter with a productId',
    default: '',
  })
  productId: string;
}
