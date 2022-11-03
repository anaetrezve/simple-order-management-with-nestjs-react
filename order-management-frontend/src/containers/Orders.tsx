import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ALL_ORDERS_QUERY } from '../api';

const OrderPage = () => {
  const { data: { orders } = {} } = useQuery(GET_ALL_ORDERS_QUERY);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Status</th>
                <th scope="col">Ordered By</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Product Count</th>
                <th scope="col">Total Price</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any, index: number) => (
                <tr key={index}>
                  <td>
                    <Link to={`/orders/${order._id}`}>{order._id}</Link>
                  </td>
                  <td>{order.status}</td>
                  <td>{order.orderBy.name}</td>
                  <td>{order.assignee?.name || 'N/A'}</td>
                  <td>{order.products?.length}</td>
                  <td>{order.total}</td>
                  <td>{new Date(order.createdAt as string).toLocaleDateString()}</td>
                  <td>{new Date(order.updatedAt as string).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
