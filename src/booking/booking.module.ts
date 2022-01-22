import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { authProviders } from 'src/auth/provider/auth.provider';
import { CaslModule } from 'src/casl/casl.module';
import { companyProviders } from 'src/company/provider/company.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ProductProvider } from 'src/product/provider/product.provider';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { bookingProviders } from './provider/booking.provider';

@Module({
  imports: [DatabaseModule, AuthModule, CaslModule],
  controllers: [BookingController],
  providers: [
    BookingService,
    ...bookingProviders,
    ...authProviders,
    ...companyProviders,
    ...ProductProvider,
  ],
})
export class BookingModule {}
