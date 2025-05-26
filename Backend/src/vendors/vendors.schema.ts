import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VendorDocument = HydratedDocument<Vendor>;

@Schema()
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;
}

const ContactSchema = SchemaFactory.createForClass(Contact);

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Vendor {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, enum: ['kg', 'pack', 'tone'] })
  unit: 'kg' | 'pack' | 'tone';

  @Prop({ required: true, type: Number })
  totalAmountPayable: number;

  @Prop({
    required: true,
    type: [
      ContactSchema
    ],
  })
  contact: Contact[];


}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
// This schema defines a Vendor with a unique name and an array of contacts, each containing a name and phone number.
