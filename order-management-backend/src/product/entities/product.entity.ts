import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({
    unique: true,
    required: true,
  })
  code: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({
    required: true,
  })
  price: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
