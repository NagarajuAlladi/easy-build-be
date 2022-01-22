import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { ProductReviewModule } from './product-review/product-review.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [CompanyModule, ProductModule, ProductReviewModule, BookingModule],
})
export class AppModule {}
