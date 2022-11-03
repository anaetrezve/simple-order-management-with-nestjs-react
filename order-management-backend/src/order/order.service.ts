import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const newOrder = {
      ...createOrderInput,
      history: [
        { status: OrderStatus.OPEN, changedAt: new Date().toISOString() },
      ],
    };
    const order = await this.orderModel.create(newOrder);

    return order;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find();
  }

  async findOne(_id: string): Promise<Order> {
    return await this.orderModel.findById(_id);
  }

  async update(updateOrderInput: UpdateOrderInput): Promise<Order> {
    const { _id, ...rest } = updateOrderInput;
    let payload = {
      ...rest,
    };

    if (payload.status) {
      const order = await this.orderModel.findById(_id);
      const oldStatus = order.status;
      const newStatus = payload.status;
      await checkStatus(oldStatus, newStatus);

      const statusInHistory = order.history.filter((history) => {
        return history.status === newStatus;
      });

      if (statusInHistory?.length > 0) {
        throw new BadRequestException('reverting status not allowed');
      }
      payload = {
        ...payload,
        $push: {
          history: {
            status: newStatus,
            changedAt: new Date().toISOString(),
          },
        },
      } as any;
    }

    return await this.orderModel.findOneAndUpdate({ _id }, payload, {
      new: true,
    });
  }

  async remove(_id: string): Promise<Order> {
    return await this.orderModel.findOneAndRemove({ _id });
  }
}

async function checkStatus(oldStatus: string, newStatus: string) {
  if (oldStatus === newStatus) {
    throw new BadRequestException("order status can't be same");
  }
  if (
    (oldStatus === OrderStatus.OPEN && newStatus !== OrderStatus.IN_PROGRESS) ||
    (oldStatus === OrderStatus.IN_PROGRESS &&
      newStatus !== OrderStatus.COMPLETE)
  ) {
    throw new BadRequestException('order status should be in order');
  }
}
