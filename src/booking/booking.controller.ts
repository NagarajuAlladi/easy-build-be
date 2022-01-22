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
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { GetFilterDto } from './filters/get-filters.dto';
import { Booking } from './interface/booking.interface';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Booking))
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  // @UseInterceptors(FileInterceptor('file', screenShotStorage))
  create(
    @Param('id') id: string,
    @Body() createBookingDto: CreateBookingDto,
    // @UploadedFile() file,
  ) {
    return this.bookingService.create(id, createBookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Get, Booking))
  @ApiOkResponse({
    description: 'The resource list has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  find(@Query() { id, userId, productId }: GetFilterDto) {
    if (id || userId || productId) {
      return this.bookingService.find(id, userId, productId);
    } else {
      return this.bookingService.findAll();
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Booking))
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The resource has been updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.update(id, updateBookingDto);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Booking))
  @Delete(':id')
  @ApiOkResponse({ description: 'The resource has been successfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id') id: string): Promise<Booking> {
    return this.bookingService.remove(id);
  }
}
