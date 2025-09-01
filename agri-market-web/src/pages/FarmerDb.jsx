import React, { useState } from "react";

export default function FarmerDb({ user }) {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ name: "", price: "", quantity: "" });

  const addProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.quantity) return;
    setProducts([...products, { ...productForm, id: Date.now().toString() }]);
    setProductForm({ name: "", price: "", quantity: "" });
  };

  return (
    <div>
      <h2>Farmer Dashboard</h2>
      <p>Welcome, {user.name}</p>
      <p>Farm Name: {user.farmName}</p>
      <p>Location: {user.location}</p>
      <p>Phone: {user.phone}</p>

      <h3>Add Product</h3>
      <input
        placeholder="Product Name"
        value={productForm.name}
        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={productForm.price}
        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={productForm.quantity}
        onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
      />
      <button onClick={addProduct}>Add Product</button>

      <h3>Your Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} - {p.quantity} pcs
          </li>
        ))}
      </ul>
    </div>
  );
}
