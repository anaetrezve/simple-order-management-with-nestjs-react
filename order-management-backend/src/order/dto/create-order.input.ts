export class CreateOrderInput {
  status: string;
  total: number;
  products: [OrderedProduct];
  orderBy: string;
  assignee: string;
}

export class OrderedProduct {
  product: string;
  quantity: number;
}
