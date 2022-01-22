import { Connection } from 'mongoose';
import { bookingSchema } from '../schema/booking.schema';

export const bookingProviders = [
  {
    provide: 'BOOKING_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Booking', bookingSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
