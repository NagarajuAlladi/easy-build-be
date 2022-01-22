import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
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
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { GetFilterDto } from './filter/get-filter.dto';
import { ProductReview } from './interface/product-review.dto';
import { ProductReviewService } from './product-review.service';

@ApiTags('product-review')
@Controller('product-review')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, ProductReview),
  )
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createProductReviewDto: CreateProductReviewDto) {
    return this.productReviewService.create(createProductReviewDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The resource list has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  find(@Query() { id, productId, userId }: GetFilterDto) {
    if (id || userId || productId) {
      return this.productReviewService.find(id, productId, userId);
    } else {
      return this.productReviewService.findAll();
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, ProductReview),
  )
  @ApiCreatedResponse({
    description: 'The resource has been updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Param('id') id: string,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
  ) {
    return this.productReviewService.update(id, updateProductReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Delete, ProductReview),
  )
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource has been successfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id') id: string) {
    return this.productReviewService.remove(id);
  }
}
