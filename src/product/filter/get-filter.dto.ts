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
    description: 'search by company-id',
    default: '',
  })
  companyId: string;
}
