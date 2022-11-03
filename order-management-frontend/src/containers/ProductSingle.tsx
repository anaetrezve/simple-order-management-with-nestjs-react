import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_PRODUCT_BY_ID_QUERY } from '../api';
import Modal from '../components/Modal';

const SingleProductPage = () => {
  const initNewProduct = {
    title: '',
    price: 0,
    code: '',
    category: '',
    description: '',
  };
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState(initNewProduct);
  const { data: { product } = {} } = useQuery(GET_PRODUCT_BY_ID_QUERY, {
    variables: {
      _id: id,
    },
  });

  const handleSave = () => {
    setOpenModal(false);
  };
  const handleClose = () => {
    setOpenModal(false);
    setNewProduct(initNewProduct);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h3>Title: </h3>
            <p>{product?.title}</p>
          </div>

          <div className="col-4">
            <h3>Product Code: </h3>
            <p>{product?.code}</p>
          </div>

          <div className="col-4">
            <h3>Description</h3>
            <p>{product?.description}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <h3>Price: </h3>
            {/* eslint-disable-next-line no-unsafe-optional-chaining */}
            <p>${(product?.price / 100).toFixed(2)}</p>
          </div>

          <div className="col-4">
            <h3>Category: </h3>
            <p>{product?.category}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={openModal} title="Create Product" handleClose={handleClose} handleSave={handleSave}>
        <p>Hello</p>
      </Modal>
    </>
  );
};

export default SingleProductPage;
