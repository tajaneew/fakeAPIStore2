import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(productId)
      .then((product) => setProduct(product))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [productId]);

  async function fetchProductDetails(productId) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const product = await response.json();
      return product;
    } catch (error) {
      throw error;
    }
  }

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h1>Fake API Store</h1>
      <div className="container">
        <div className="box" key={product.id}>
          <div className="content">
            <h5>{product.title}</h5>
            <p>{product.description}</p>
          </div>
          <img src={product.image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
