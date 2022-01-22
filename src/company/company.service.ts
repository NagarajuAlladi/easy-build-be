import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Company } from './interface/company.interface';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetFilterDto } from './filter/get-filter.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(@Inject('COMPANY_MODEL') private companyModel: Model<Company>) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const newCompany = new this.companyModel(createCompanyDto);
      await newCompany.save();
      return newCompany;
    } catch (error) {
      throw new ForbiddenException({ message: error.message });
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return this.companyModel.find({});
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async find(filterDto: GetFilterDto): Promise<Company> {
    try {
      return this.companyModel.findById({ _id: filterDto });
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    try {
      return this.companyModel.findByIdAndUpdate(
        { _id: id },
        updateCompanyDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async delete(id: string): Promise<Company> {
    try {
      return this.companyModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
