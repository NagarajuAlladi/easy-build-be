import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/interface/user.interface';
import { Booking } from 'src/booking/interface/booking.interface';
import { Company } from 'src/company/interface/company.interface';
import { ProductReview } from 'src/product-review/interface/product-review.dto';
import { Product } from 'src/product/interface/product.interface';
import { Action } from './action.enum';

type Subjects =
  | InferSubjects<
      typeof Company | typeof ProductReview | typeof Product | typeof Booking
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      // can(Action.Get, 'all');
      // can(Action.Create, 'all');
      // can(Action.Delete, 'all');
      can(Action.Manage, 'all');
      // can(Action.Get, Cat);
    } else {
      can(Action.Get, Company);
      can(Action.Get, Product);
      can(Action.Get, ProductReview);
      can(Action.Update, ProductReview);
      can(Action.Delete, ProductReview);
      can(Action.Create, ProductReview);
      can(Action.Manage, Booking);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
