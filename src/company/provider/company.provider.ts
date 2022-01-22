import { Connection } from 'mongoose';
import { companySchema } from '../schema/company.schema';

export const companyProviders = [
  {
    provide: 'COMPANY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Company', companySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
