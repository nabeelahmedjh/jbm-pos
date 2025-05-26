import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vendor } from '../vendors/vendors.schema';
export type LedgerDocument = HydratedDocument<Ledger>;
@Schema({
    timestamps: true // Automatically adds createdAt and updatedAt fields
})
export class Ledger {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }) // Reference to the Vendor schema
    vendor: Vendor;

    @Prop({ required: true,
        enum: ['order', 'payment']
     })
    transactionType: 'order' | 'payment'; // Type of transaction

    @Prop({ required: true })
    description: string; // Description of the transaction

    @Prop({ required: true })
    amountChange: number; // Amount charged in the transaction

    @Prop({ required: true })
    balanceAfterTransaction: number; // Balance after the transaction
}

export const LedgerSchema = SchemaFactory.createForClass(Ledger);