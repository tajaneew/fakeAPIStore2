import React, { useContext } from 'react';
import FavoritesContext from '../context/FavoritesContext';


const HeartIcon = ({ productId }) => {
  const { favorites, addFavorite, removeFromFavorites } = useContext(FavoritesContext);

  const isFavorited = favorites.includes(productId);



  const handleClick = () => {
    if (isFavorited) {
      removeFromFavorites(productId);
    } else {
      addFavorite(productId);
    }
  };


  return (
    <div>
      <button onClick={handleClick}>
      {isFavorited ? 'Favorited' : 'Not Favorited'}
      </button>
    </div>
  );
};

export default HeartIcon;
