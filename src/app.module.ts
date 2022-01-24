import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { ProductReviewModule } from './product-review/product-review.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CompanyModule,
    ProductModule,
    ProductReviewModule,
    BookingModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
