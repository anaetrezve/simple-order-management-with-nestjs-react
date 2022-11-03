import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class OrderHistory {
  @Prop()
  status: string;

  @Prop()
  changedAt: string;
}

export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);
