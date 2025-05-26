import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { OrderDocument } from './orders.schema';
import { LedgerDocument } from 'src/ledgers/ledgers.schema';
import { VendorDocument } from 'src/vendors/vendors.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    @InjectModel('Ledger') private readonly ledgerModel: Model<LedgerDocument>,
    @InjectModel('Vendor') private readonly vendorModel: Model<VendorDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createOrderDto: CreateOrderDto) {

    const totalPrice = createOrderDto.quantity * createOrderDto.unitPrice
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const createdOrder = new this.orderModel({
        ...createOrderDto,
        totalPrice
      });
      const savedOrder = await createdOrder.save({ session });

      // Update the vendor's totalAmountPayable
      const vendor = await this.vendorModel
        .findById(savedOrder.vendor)
        .session(session);
      if (!vendor) {
        throw new Error('Vendor not found');
      }
      vendor.totalAmountPayable += savedOrder.totalPrice; // Assuming totalPrice is a field in CreateOrderDto
      await vendor.save({ session });

      // Assuming you want to create a ledger entry for the order
      const ledgerEntry = new this.ledgerModel({
        vendor: savedOrder.vendor, // Assuming vendor is a field in CreateOrderDto
        transactionType: 'order',
        description: `Order from vendor ${vendor.name} of ${savedOrder.quantity} ${vendor.unit}`,
        amountChange: savedOrder.totalPrice, // Assuming totalAmount is a field in CreateOrderDto
        balanceAfterTransaction: vendor.totalAmountPayable,
      });
      await ledgerEntry.save({ session });

      await session.commitTransaction();
      return savedOrder.toObject();
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
