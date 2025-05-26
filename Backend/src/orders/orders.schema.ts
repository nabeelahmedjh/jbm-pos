import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vendor } from '../vendors/vendors.schema';


export type OrderDocument = HydratedDocument<Order>;

@Schema({
    timestamps: true
})
export class Order {

    @Prop({ required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor' // Reference to the Vendor schema 
     })
    vendor: Vendor;

    @Prop({ required: true })
    unitPrice: number;

    @Prop({ required: true })
    quantity: number;
    
    @Prop({ required: true })
    totalPrice: number;

    @Prop()
    orderDateTime: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);