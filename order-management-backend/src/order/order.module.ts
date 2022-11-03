import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderedProductResolver, OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule,
    UserModule,
  ],
  providers: [OrderResolver, OrderService, OrderedProductResolver],
})
export class OrderModule {}
