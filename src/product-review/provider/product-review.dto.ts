import { Connection } from 'mongoose';
import { productReviewSchema } from '../schema/product-review.schema';

export const productReviewProviders = [
  {
    provide: 'PRODUCT_REVIEW_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('ProductReviews', productReviewSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
