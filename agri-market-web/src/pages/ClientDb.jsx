import React, { useState } from "react";

export default function ClientDb({ user, products }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  const buyProducts = () => {
    setOrders([...orders, ...cart]);
    setCart([]);
  };

  return (
    <div>
      <h2>Client Dashboard</h2>
      <p>Welcome, {user.name}</p>

      <h3>Available Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} - {p.quantity} pcs
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h3>Cart</h3>
      <ul>
        {cart.map((c) => (
          <li key={c.id}>{c.name} - ${c.price} - {c.quantity} pcs</li>
        ))}
      </ul>
      {cart.length > 0 && <button onClick={buyProducts}>Buy Now</button>}

      <h3>Orders</h3>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>{o.name} - ${o.price} - {o.quantity} pcs</li>
        ))}
      </ul>
    </div>
  );
}
