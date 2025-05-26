import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vendor } from '../vendors/vendors.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({
    timestamps: true // Automatically adds createdAt and updatedAt fields
})
export class Payment {
    @Prop({ required: true, unique: true })
    paymentId: string;

    @Prop({ required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor' // Reference to the Vendor schema
     })
    to: Vendor;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    status: string; // e.g., 'pending', 'completed', 'failed'
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);