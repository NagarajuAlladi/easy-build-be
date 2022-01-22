import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Action } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factor';
import { CheckPolicies } from 'src/casl/decorator/check-policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetFilterDto } from './filter/get-filter.dto';
import { Company } from './interface/company.interface';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Company))
  @Post()
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(createCompanyDto);
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Get()
  @ApiOkResponse({
    description: 'This resource list has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Query('id') filterDto: GetFilterDto) {
    if (filterDto) {
      return this.companyService.find(filterDto);
    } else {
      return this.companyService.findAll();
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Company))
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The resource has been updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.update(id, updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Company))
  @Delete(':id')
  @ApiOkResponse({ description: 'The resource has been successfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}
