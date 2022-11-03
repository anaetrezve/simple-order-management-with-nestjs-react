import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_ORDER_BY_ID_QUERY } from '../api';

const SingleOrderPage = () => {
  const { id } = useParams();
  const { data: { order } = {} } = useQuery(GET_ORDER_BY_ID_QUERY, {
    variables: {
      _id: id,
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h3>ID: </h3>
          <p>{order?._id}</p>

          <h3>Status: </h3>
          <p>{order?.status}</p>

          <h3>Ordered By: </h3>
          <p>{order?.orderBy?.name}</p>

          <h3>Assigned To: </h3>
          <p>{order?.assignee?.name || 'N/A'}</p>
        </div>
        <div className="col-4">
          <h3>Created At: </h3>
          <p>{new Date(order?.createdAt as string).toLocaleString()}</p>

          <h3>Updated At: </h3>
          <p>{new Date(order?.updatedAt as string).toLocaleString()}</p>

          <h3>Total Price: </h3>
          {/* eslint-disable-next-line no-unsafe-optional-chaining */}
          <p>${(order?.total / 100).toFixed(2)}</p>
        </div>

        <div className="col-4">
          <h3>Order History: </h3>
          {order?.history?.map((h: any, index: number) => (
            <div className="row" key={index}>
              <div className="col">
                <h5>Status: </h5>
                <p>{h.status}</p>
              </div>

              <div className="col">
                <h5>Changed At: </h5>
                <p>{new Date(h.changedAt as string).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col mt-5">
          <h3>Ordered Products: </h3>
          {order?.products?.map((item: any, index: number) => (
            <div className="row" key={index}>
              <div className="col">
                <h4>Product: </h4>

                <div className="row">
                  <div className="col">
                    <h5>Title: </h5>
                    <p>
                      <Link to={`/products/${item?.product?._id}`}>{item?.product?.title}</Link>
                    </p>
                  </div>

                  <div className="col">
                    <h5>Code: </h5>
                    <p>{item?.product?.code}</p>
                  </div>

                  <div className="col">
                    <h5>Price: </h5>
                    {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                    <p>${(item.product?.price / 100).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <h4>Quantity: </h4>
                <p>{item?.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
