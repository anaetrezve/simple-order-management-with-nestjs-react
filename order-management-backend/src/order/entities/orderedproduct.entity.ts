import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
export class OrderedProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: string;

  @Prop()
  quantity: string;
}

export const OrderedProductSchema =
  SchemaFactory.createForClass(OrderedProduct);
