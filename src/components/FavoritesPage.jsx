import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites selected</p>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite}>
              <span>{favorite}</span>
              <button onClick={() => removeFromFavorites(favorite)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;