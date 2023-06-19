import React from "react";


function Categories({ categories, setSelectedCategory}) {
    return (
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
    )
}

export default Categories;