import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation('createProduct')
  create(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query('products')
  findAll() {
    return this.productService.findAll();
  }

  @Query('product')
  findOne(@Args('_id') _id: string) {
    return this.productService.findOne(_id);
  }

  @Mutation('updateProduct')
  update(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productService.update(updateProductInput);
  }

  @Mutation('removeProduct')
  remove(@Args('_id') _id: string) {
    return this.productService.remove(_id);
  }
}
