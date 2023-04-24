import React, { useState } from "react";
import axios from "axios";

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/product/search?q=${searchQuery}`);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <img src={product.images[0]} alt={product.title} />
        </div>
      ))}
    </div>
  );
};
export default SearchProducts;
