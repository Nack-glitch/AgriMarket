import React, { useState } from "react";
import "../App.css";

const mockProducts = [
  // Vegetables
  { id: '1', name: 'Tomato', price: 2.5, unit: 'kg', farmer: 'John Doe', location: 'Addis Ababa', rating: 4.5, image: 'http://wallsdesk.com/wp-content/uploads/2017/01/Tomato-full-HD.jpg', category: 'Vegetables', description: 'Fresh organic tomatoes', inStock: true, organic: true },
  { id: '2', name: 'Carrot', price: 2.0, unit: 'kg', farmer: 'Mulugeta Kebede', location: 'Adama', rating: 4.3, image: 'https://ucarecdn.com/459eb7be-115a-4d85-b1d8-deaabc94c643/-/format/auto/-/preview/3000x3000/-/quality/lighter/', category: 'Vegetables', description: 'Crunchy sweet carrots', inStock: true, organic: true },
  { id: '3', name: 'Cabbage', price: 1.5, unit: 'kg', farmer: 'Alemayehu Getachew', location: 'Debre Birhan', rating: 4.1, image: 'https://healthyfamilyproject.com/wp-content/uploads/2020/05/Cabbage-background.jpg', category: 'Vegetables', description: 'Fresh green cabbage', inStock: true, organic: false },
  { id: '4', name: 'Onion', price: 1.8, unit: 'kg', farmer: 'Mesfin Fekadu', location: 'Mekelle', rating: 4.6, image: 'https://img.freepik.com/premium-photo/fresh-onion-wallpaper-photo_234209-1958.jpg', category: 'Vegetables', description: 'Locally grown onions', inStock: true, organic: true },

  // Fruits
  { id: '5', name: 'Apple', price: 3.0, unit: 'kg', farmer: 'Jane Smith', location: 'Bahir Dar', rating: 4.8, image: 'https://cdn.stocksnap.io/img-thumbs/960w/fresh-apple_KNCHMWUOR0.jpg', category: 'Fruits', description: 'Juicy red apples', inStock: false, organic: true },
  { id: '6', name: 'Banana', price: 2.0, unit: 'kg', farmer: 'Kebede Tadesse', location: 'Jimma', rating: 4.6, image: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1FZ3wT.img?w=768&h=502&m=6', category: 'Fruits', description: 'Sweet ripe bananas', inStock: true, organic: true },
  { id: '7', name: 'Mango', price: 3.5, unit: 'kg', farmer: 'Lidya Alemayehu', location: 'Arba Minch', rating: 4.9, image: 'https://ichef.bbci.co.uk/images/ic/1920x1080/p06hk0h6.jpg', category: 'Fruits', description: 'Sweet tropical mangoes', inStock: true, organic: true },
  { id: '8', name: 'Orange', price: 2.8, unit: 'kg', farmer: 'Hana Worku', location: 'Dire Dawa', rating: 4.7, image: 'https://img.freepik.com/premium-photo/orange-fruit-market-stall_687801-3014.jpg', category: 'Fruits', description: 'Fresh juicy oranges', inStock: true, organic: true },

  // Grains
  { id: '9', name: 'Wheat', price: 1.8, unit: 'kg', farmer: 'Abebe Alemu', location: 'Oromia', rating: 4.2, image: 'https://www.foodbusinessafrica.com/wp-content/uploads/2021/02/wheat_1600x900.jpg', category: 'Grains', description: 'High-quality wheat grains', inStock: true, organic: false },
  { id: '10', name: 'Teff', price: 2.2, unit: 'kg', farmer: 'Lensa Bekele', location: 'Arsi', rating: 4.9, image: 'https://www.thespruceeats.com/thmb/JEp6mHKVtQSqpK_kVk8Q7odX7eg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1126178992-cd55726165e0437085b4b68350062723.jpg', category: 'Grains', description: 'Premium teff for Injera', inStock: true, organic: true },
  { id: '11', name: 'Barley', price: 1.7, unit: 'kg', farmer: 'Bekele Mulugeta', location: 'Debre Markos', rating: 4.4, image: 'https://content.api.news/v3/images/bin/a95c99bdf494d09ca112ba968dbd9bc2', category: 'Grains', description: 'Organic barley grains', inStock: true, organic: true },

  // Herbs
  { id: '12', name: 'Basil', price: 1.2, unit: 'bunch', farmer: 'Sara Mekonnen', location: 'Hawassa', rating: 4.7, image: 'https://s.hdnux.com/photos/15/45/70/3563038/3/gallery_medium.jpg', category: 'Herbs', description: 'Fresh green basil leaves', inStock: true, organic: true },
  { id: '13', name: 'Mint', price: 1.5, unit: 'bunch', farmer: 'Tesfaye Yohannes', location: 'Gondar', rating: 4.4, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0', category: 'Herbs', description: 'Refreshing mint leaves', inStock: true, organic: true },
  { id: '14', name: 'Rosemary', price: 1.4, unit: 'bunch', farmer: 'Fikirte Abebe', location: 'Addis Ababa', rating: 4.5, image: 'https://www.austockphoto.com.au/imgcache/uploads/photos/compressed/rosemary-for-sale-at-a-market-austockphoto-000086092.jpg?v=1.3.5', category: 'Herbs', description: 'Aromatic rosemary sprigs', inStock: true, organic: true },

];

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Herbs'];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = mockProducts.filter(
    p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || p.category === selectedCategory)
  );

  return (
    <div className="products-container">
      <h2 className="section-title">Marketplace</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
              {product.organic && <span className="organic-badge">Organic</span>}
              {!product.inStock && <span className="out-of-stock-overlay">Out of Stock</span>}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">${product.price.toFixed(2)}/{product.unit}</p>
              <p className="farmer">{product.farmer} 📍 {product.location}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedProduct(null)}>✕</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
            <h3>{selectedProduct.name}</h3>
            <p className="modal-price">${selectedProduct.price.toFixed(2)}/{selectedProduct.unit}</p>
            <p className="modal-rating">⭐ {selectedProduct.rating}</p>
            <p className="modal-description">{selectedProduct.description}</p>
            <p className="modal-farmer">{selectedProduct.farmer} 📍 {selectedProduct.location}</p>
            <button className={`add-button ${!selectedProduct.inStock ? 'disabled' : ''}`} disabled={!selectedProduct.inStock}>
              {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
