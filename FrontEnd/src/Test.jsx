import React from "react";
import { useLocation } from "react-router-dom";

const Test = () => {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Testing Page</h1>
      {product ? (
        <div className="mt-4">
          <h2 className="text-xl">{product.name}</h2>
          <img src={product.image} alt={product.name} className="w-40 h-40" />
          <p className="mt-2 font-semibold text-gray-700">
            Price: ${product.price}
          </p>
        </div>
      ) : (
        <p>No product details found</p>
      )}
    </div>
  );
};

export default Test;
