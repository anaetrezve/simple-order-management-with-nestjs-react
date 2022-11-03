import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { OrderedProduct, OrderedProductSchema } from './orderedproduct.entity';
import { OrderHistory, OrderHistorySchema } from './orderhistory.entity';

export enum OrderStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETE = 'complete',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.OPEN,
  })
  status: string;

  @Prop({ required: true })
  total: number;

  @Prop({
    type: [OrderedProductSchema],
  })
  products: OrderedProduct[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  orderBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  assignee: User;

  @Prop({ type: [OrderHistorySchema] })
  history: OrderHistory[];
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
