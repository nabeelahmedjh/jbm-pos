import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './orders.schema';
import { Ledger, LedgerSchema } from 'src/ledgers/ledgers.schema';
import { Vendor, VendorSchema } from 'src/vendors/vendors.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Order.name,
      schema: OrderSchema,
    },
    {
      name: Ledger.name,
      schema: LedgerSchema,
    },
    {
      name: Vendor.name,
      schema: VendorSchema,
    }
  ])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
