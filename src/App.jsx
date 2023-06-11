import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      setCategories(categories);
    } catch (error) {
      setError('Failed to fetch categories');
    }
  }

  async function fetchProducts(category) {
    setLoading(true);
    try {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';
      const response = await fetch(url);
      const products = await response.json();
      setProducts(products);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }

  return (
    <BrowserRouter>
      <div>
        <h2>Fake API Store</h2>

        <div>
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category} onClick={() => setSelectedCategory(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="container">
          {products.map((product) => (
            <div className="box" key={product.id}>
              <div className="content">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
              </div>
              <img src={product.image} alt="" />
            </div>
          ))}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : null}

        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
