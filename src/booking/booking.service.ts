import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/auth/interface/user.interface';
import { Company } from 'src/company/interface/company.interface';
import { Product } from 'src/product/interface/product.interface';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './interface/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @Inject('BOOKING_MODEL') private readonly bookingModel: Model<Booking>,
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
    @Inject('COMPANY_MODEL') private readonly companyModel: Model<Company>,
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,
  ) {}

  async create(id: string, createBookingDto: CreateBookingDto) {
    try {
      const newBooking = new this.bookingModel(createBookingDto);
      // const bookingProduct = await this.productModel.findOne({
      //   _id: createBookingDto.productId,
      // });
      // newBooking.productId = bookingProduct.companyId;
      newBooking.productId = id;
      newBooking.save();
      return newBooking;
    } catch (error) {
      throw new ForbiddenException({
        message: error.message,
      });
    }
  }

  async findAll(): Promise<any> {
    try {
      const bookingList = await this.bookingModel.find({});
      return bookingList;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException();
    }
  }

  async find(id, userId, productId) {
    try {
      if (id) {
        return this.bookingModel.findById({ _id: id });
      }
      if (userId) {
        const bookingList = await this.bookingModel.find({ userId: userId });
        return bookingList;
      }
      if (productId) {
        const bookingList = await this.bookingModel.find({
          productId: productId,
        });
        return bookingList;
      }
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException();
    }
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    try {
      return this.bookingModel.findByIdAndUpdate(
        { _id: id },
        updateBookingDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async remove(id: string): Promise<Booking> {
    try {
      return this.bookingModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
