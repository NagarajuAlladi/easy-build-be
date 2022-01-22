import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { authProviders } from 'src/auth/provider/auth.provider';
import { CaslModule } from 'src/casl/casl.module';
import { DatabaseModule } from 'src/database/database.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { companyProviders } from './provider/company.provider';

@Module({
  imports: [DatabaseModule, AuthModule, CaslModule],
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders, ...authProviders],
})
export class CompanyModule {}
