import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { authProviders } from 'src/auth/provider/auth.provider';
import { CaslModule } from 'src/casl/casl.module';
import { companyProviders } from 'src/company/provider/company.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductProvider } from './provider/product.provider';

@Module({
  imports: [DatabaseModule, AuthModule, CaslModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ...ProductProvider,
    ...companyProviders,
    ...authProviders,
  ],
})
export class ProductModule {}
