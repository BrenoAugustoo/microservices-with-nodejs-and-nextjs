import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';

import { Customer } from '../models/customer';

import { CustomersService } from '../../../services/customers.service';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomersService,
    private purchasesService: PurchasesService
  ){}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(
    @CurrentUser() user: AuthUser
  ) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(
    @Parent() customer: Customer
  ) {
    return this.purchasesService.listAllFromCustomer(customer.id)
  }
}
