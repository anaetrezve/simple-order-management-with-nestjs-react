import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderedProduct } from './entities/orderedproduct.entity';
import { Order } from './entities/order.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/entities/user.entity';

@Resolver('Order')
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createOrder')
  create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query('orders')
  findAll() {
    return this.orderService.findAll();
  }

  @Query('order')
  findOne(@Args('_id') _id: string) {
    return this.orderService.findOne(_id);
  }

  @Mutation('updateOrder')
  update(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput);
  }

  @Mutation('removeOrder')
  remove(@Args('_id') _id: string) {
    return this.orderService.remove(_id);
  }

  @ResolveField('createdAt')
  async createdAt(@Parent() parent) {
    const date = new Date(parent.createdAt).toISOString();
    return date;
  }

  @ResolveField('updatedAt')
  async updatedAt(@Parent() parent) {
    const date = new Date(parent.updatedAt).toISOString();
    return date;
  }

  @ResolveField('products', () => [OrderedProduct])
  async products(@Parent() parent: Order) {
    const { products } = parent;
    return products;
  }

  @ResolveField('orderBy', () => User)
  async orderBy(@Parent() parent: Order) {
    const { orderBy } = parent;
    return await this.userService.findOne(String(orderBy));
  }

  @ResolveField('assignee', () => User)
  async assignee(@Parent() parent: Order) {
    const { assignee } = parent;
    if (!assignee) return null;
    return await this.userService.findOne(String(assignee));
  }
}

@Resolver('OrderedProduct')
export class OrderedProductResolver {
  constructor(private readonly productService: ProductService) {}

  @ResolveField()
  async product(@Parent() parent: OrderedProduct) {
    const { product } = parent;
    return await this.productService.findOne(product);
  }
}
