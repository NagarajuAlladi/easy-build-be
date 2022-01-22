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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetFilterDto } from './filter/get-filter.dto';
import { Product } from './interface/product.interface';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Product))
  @Post(':id')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Param('id') id: string, @Body() createProductDto: CreateProductDto) {
    return this.productService.create(id, createProductDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The resource list has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Query() { id, companyId }: GetFilterDto) {
    if (id || companyId) {
      return this.productService.find(id, companyId);
    } else {
      return this.productService.findAll();
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Product))
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The resource has been updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Product))
  @Delete(':id')
  @ApiOkResponse({ description: 'The resource has been successfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(id);
  }
}
