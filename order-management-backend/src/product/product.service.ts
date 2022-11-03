import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = await this.productModel.create(createProductInput);
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();

    return products;
  }

  async findOne(_id: string): Promise<Product[]> {
    return await this.productModel.findById(_id);
  }

  async update(updateProductInput: UpdateProductInput): Promise<Product> {
    const { _id, ...payload } = updateProductInput;
    return await this.productModel.findOneAndUpdate({ _id }, payload, {
      new: true,
    });
  }

  async remove(_id: string): Promise<Product> {
    return await this.productModel.findOneAndRemove({ _id });
  }
}
