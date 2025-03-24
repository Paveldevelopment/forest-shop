// PAV maz nebo presunout nekam do folder

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  // Add other fields you need, e.g., 'stock' or 'description'
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} style={{ marginBottom: "1rem" }}>
            <strong>{product.name}</strong>
            <div>Price: {product.price}</div>
            {/* Display other fields if needed */}
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsList;
