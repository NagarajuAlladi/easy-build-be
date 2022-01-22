import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/auth/interface/user.interface';
import { Product } from 'src/product/interface/product.interface';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductReview } from './interface/product-review.dto';

@Injectable()
export class ProductReviewService {
  constructor(
    @Inject('PRODUCT_REVIEW_MODEL')
    private productReviewModel: Model<ProductReview>,
    @Inject('USER_MODEL') private userModel: Model<User>,
    @Inject('PRODUCT_MODEL') private productModel: Model<Product>,
  ) {}

  async create(
    createProductReviewDto: CreateProductReviewDto,
  ): Promise<ProductReview> {
    try {
      const { userId, productId } = createProductReviewDto;
      const user = await this.userModel.findById({ _id: userId });
      const product = await this.productModel.findOne({ _id: productId });

      const product_review = new this.productReviewModel(
        createProductReviewDto,
      );
      product_review.customerName = await user.name;
      product_review.productId = await product.companyId;
      await product_review.save();

      return product_review;
    } catch (error) {
      console.log(error.message);
      throw new ForbiddenException();
    }
  }

  async findAll() {
    try {
      return this.productReviewModel.find({});
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException();
    }
  }

  async find(id, productId, userId) {
    try {
      if (id && productId === undefined && userId === undefined) {
        const reviews = await this.productReviewModel.findById({ _id: id });
        return reviews;
      } else if (productId && id === undefined && userId === undefined) {
        const reviews = await this.productReviewModel.find({
          productId: productId,
        });
        return reviews;
      } else if (userId && id === undefined && productId === undefined) {
        const reviews = await this.productReviewModel.find({
          userId: userId,
        });

        return reviews;
      }
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException();
    }
  }

  async update(
    id: string,
    updateProductReviewDto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    try {
      const updatedReview = await this.productReviewModel.findByIdAndUpdate(
        { _id: id },
        updateProductReviewDto,
        { new: true },
      );

      return updatedReview;
    } catch (error) {
      console.log(error.message);
      throw new ForbiddenException();
    }
  }

  async remove(id: string): Promise<ProductReview> {
    try {
      const deletedReview = await this.productReviewModel.findByIdAndDelete({
        _id: id,
      });

      return deletedReview;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException();
    }
  }
}
