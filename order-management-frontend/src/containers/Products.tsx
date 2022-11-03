import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ALL_PRODUCTS_QUERY } from '../api';

const ProductPage = () => {
  const { data: { products } = {} } = useQuery(GET_ALL_PRODUCTS_QUERY);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Code</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: any, index: number) => (
                <tr key={index}>
                  <td>
                    <Link to={`/products/${product._id}`}>{product.title}</Link>
                  </td>
                  <td>{product.code}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
