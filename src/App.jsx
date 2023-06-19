import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Categories from './components/Categories';
import ProductDetails from './ProductDetails';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesPage from './components/FavoritesPage';
import HeartIcon from './components/HeartIcon';




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
     // Fetches the categories from the API and sets the state
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      setCategories(categories);
    } catch (error) {
      setError('Failed to fetch categories');
    }
  }

  async function fetchProducts(category) {
    // Fetches the products based on the selected category from the API and sets the state
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <BrowserRouter>
    <FavoritesProvider>
      <div>
      <h2>Fake API Store</h2>
        <nav>
        <ul>
          <li>
            <Link to= "/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>

        </nav>

       
        <Routes>
        <Route path="/" element={
                <div>
                  <Categories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory ={handleCategoryChange}
                  />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : null}
         <div className="container">
          {products.map((product) => (
            <div className="box" key={product.id}>
              <Link to={`/products/${product.id}`}>
              <div className="content">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
              </div>
              <img src={product.image} alt="{product.title}" />
              </Link>
              <HeartIcon productId={product.id} />
              
            </div>
          ))}
        </div>
        </div> 
        } />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        </div>
        </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App;
