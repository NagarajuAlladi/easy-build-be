import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { authProviders } from 'src/auth/provider/auth.provider';
import { CaslModule } from 'src/casl/casl.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProductProvider } from 'src/product/provider/product.provider';
import { ProductReviewController } from './product-review.controller';
import { ProductReviewService } from './product-review.service';
import { productReviewProviders } from './provider/product-review.dto';

@Module({
  imports: [DatabaseModule, CaslModule, AuthModule],
  controllers: [ProductReviewController],
  providers: [
    ProductReviewService,
    ...authProviders,
    ...ProductProvider,
    ...productReviewProviders,
  ],
})
export class ProductReviewModule {}
