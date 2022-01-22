import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Company } from 'src/company/interface/company.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('COMPANY_MODEL') private readonly companyModel: Model<Company>,
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,
  ) {}

  async create(id: string, createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      newProduct.companyId = id;
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async findAll() {
    try {
      return this.productModel.find({});
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async find(id, companyId) {
    try {
      if (id && companyId === undefined) {
        return this.productModel.findById({ _id: id });
      } else if (companyId && id === undefined) {
        return this.productModel.find({ companyId: companyId });
      }
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return this.productModel.findByIdAndUpdate(
        { _id: id },
        updateProductDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return this.productModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
