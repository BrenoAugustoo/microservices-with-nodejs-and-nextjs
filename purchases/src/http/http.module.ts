import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { ProductsService } from '../services/products.service';
import { DatabaseModule } from '../database/database.module';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from '../services/purchases.service';
import { CustomersService } from '../services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
    })
  ],
  providers: [
    ProductsResolver, 
    PurchasesResolver, 
    CustomersResolver,

    ProductsService, 
    PurchasesService,
    CustomersService
  ]
})
export class HttpModule {}
