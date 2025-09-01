import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Modal 
} from 'react-native';
import { useAuth } from '../context/AuthContext';

// Mock products with multiple categories
const mockProducts = [
  // Vegetables
  { id: '1', name: 'Tomato', price: 2.5, unit: 'kg', farmer: 'John Doe', location: 'Addis Ababa', rating: 4.5, image: 'http://wallsdesk.com/wp-content/uploads/2017/01/Tomato-full-HD.jpg', category: 'Vegetables', description: 'Fresh organic tomatoes', inStock: true, organic: true },
  { id: '2', name: 'Carrot', price: 2.0, unit: 'kg', farmer: 'Mulugeta Kebede', location: 'Adama', rating: 4.3, image: 'https://ucarecdn.com/459eb7be-115a-4d85-b1d8-deaabc94c643/-/format/auto/-/preview/3000x3000/-/quality/lighter/', category: 'Vegetables', description: 'Crunchy sweet carrots', inStock: true, organic: true },
  { id: '3', name: 'Cabbage', price: 1.5, unit: 'kg', farmer: 'Alemayehu Getachew', location: 'Debre Birhan', rating: 4.1, image: 'https://healthyfamilyproject.com/wp-content/uploads/2020/05/Cabbage-background.jpg', category: 'Vegetables', description: 'Fresh green cabbage', inStock: true, organic: false },
  { id: '4', name: 'Onion', price: 1.8, unit: 'kg', farmer: 'Mesfin Fekadu', location: 'Mekelle', rating: 4.6, image: 'https://img.freepik.com/premium-photo/fresh-onion-wallpaper-photo_234209-1958.jpg', category: 'Vegetables', description: 'Locally grown onions', inStock: true, organic: true },

  // Fruits
  { id: '5', name: 'Apple', price: 3.0, unit: 'kg', farmer: 'Jane Smith', location: 'Bahir Dar', rating: 4.8, image: 'https://cdn.stocksnap.io/img-thumbs/960w/fresh-apple_KNCHMWUOR0.jpg', category: 'Fruits', description: 'Juicy red apples', inStock: false, organic: true },
  { id: '6', name: 'Banana', price: 2.0, unit: 'kg', farmer: 'Kebede Tadesse', location: 'Jimma', rating: 4.6, image: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1FZ3wT.img?w=768&h=502&m=6', category: 'Fruits', description: 'Sweet ripe bananas', inStock: true, organic: true },
  { id: '8', name: 'Mango', price: 3.5, unit: 'kg', farmer: 'Lidya Alemayehu', location: 'Arba Minch', rating: 4.9, image: 'https://ichef.bbci.co.uk/images/ic/1920x1080/p06hk0h6.jpg', category: 'Fruits', description: 'Sweet tropical mangoes', inStock: true, organic: true },
  { id: '7', name: 'Orange', price: 2.8, unit: 'kg', farmer: 'Hana Worku', location: 'Dire Dawa', rating: 4.7, image: 'https://img.freepik.com/premium-photo/orange-fruit-market-stall_687801-3014.jpg', category: 'Fruits', description: 'Fresh juicy oranges', inStock: true, organic: true },
  
  // Herbs
  { id: '9', name: 'Basil', price: 1.2, unit: 'bunch', farmer: 'Sara Mekonnen', location: 'Hawassa', rating: 4.7, image: 'https://s.hdnux.com/photos/15/45/70/3563038/3/gallery_medium.jpg', category: 'Herbs', description: 'Fresh green basil leaves', inStock: true, organic: true },
  { id: '10', name: 'Mint', price: 1.5, unit: 'bunch', farmer: 'Tesfaye Yohannes', location: 'Gondar', rating: 4.4, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0', category: 'Herbs', description: 'Refreshing mint leaves', inStock: true, organic: true },
  { id: '11', name: 'Rosemary', price: 1.4, unit: 'bunch', farmer: 'Fikirte Abebe', location: 'Addis Ababa', rating: 4.5, image: 'https://www.austockphoto.com.au/imgcache/uploads/photos/compressed/rosemary-for-sale-at-a-market-austockphoto-000086092.jpg?v=1.3.5', category: 'Herbs', description: 'Aromatic rosemary sprigs', inStock: true, organic: true },

  // Grains
  { id: '12', name: 'Wheat', price: 1.8, unit: 'kg', farmer: 'Abebe Alemu', location: 'Oromia', rating: 4.2, image: 'https://www.foodbusinessafrica.com/wp-content/uploads/2021/02/wheat_1600x900.jpg', category: 'Grains', description: 'High-quality wheat grains', inStock: true, organic: false },
  { id: '13', name: 'Teff', price: 2.2, unit: 'kg', farmer: 'Lensa Bekele', location: 'Arsi', rating: 4.9, image: 'https://www.thespruceeats.com/thmb/JEp6mHKVtQSqpK_kVk8Q7odX7eg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1126178992-cd55726165e0437085b4b68350062723.jpg', category: 'Grains', description: 'Premium teff for Injera', inStock: true, organic: true },
  { id: '14', name: 'Barley', price: 1.7, unit: 'kg', farmer: 'Bekele Mulugeta', location: 'Debre Markos', rating: 4.4, image: 'https://content.api.news/v3/images/bin/a95c99bdf494d09ca112ba968dbd9bc2', category: 'Grains', description: 'Organic barley grains', inStock: true, organic: true },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Herbs'];

const MarketplaceScreen = ({ onAuthRequired }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = mockProducts
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || p.category === selectedCategory)
    );

  const handleAddToCart = (product) => {
    if (!user) {
      onAuthRequired();
      return;
    }
    alert(`${product.name} has been added to your cart!`);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[styles.categoryButton, selectedCategory === cat && styles.categoryButtonActive]}
          >
            <Text style={selectedCategory === cat ? styles.categoryTextActive : styles.categoryText}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.productsContainer}>
        {filteredProducts.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => setSelectedProduct(product)}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            {product.organic && (
              <View style={styles.organicBadge}>
                <Text style={styles.organicText}>Organic</Text>
              </View>
            )}
            {!product.inStock && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}/{product.unit}</Text>
              <Text style={styles.productFarmer}>{product.farmer} 📍 {product.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedProduct && (
        <Modal animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedProduct(null)}>
                <Text style={{ fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
              <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                            <Text style={styles.modalName}>{selectedProduct.name}</Text>
              <Text style={styles.modalPrice}>${selectedProduct.price.toFixed(2)}/{selectedProduct.unit}</Text>
              <Text style={styles.modalRating}>⭐ {selectedProduct.rating}</Text>
              <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
              <Text style={styles.modalFarmer}>{selectedProduct.farmer} 📍 {selectedProduct.location}</Text>
              <TouchableOpacity
                disabled={!selectedProduct.inStock}
                onPress={() => handleAddToCart(selectedProduct)}
                style={[styles.addButton, !selectedProduct.inStock && styles.disabledButton]}
              >
                <Text style={styles.addButtonText}>
                  {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default MarketplaceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10 },
  categories: { flexDirection: 'row', marginBottom: 10 },
  categoryButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#eee', marginRight: 8 },
  categoryButtonActive: { backgroundColor: '#16A34A' },
  categoryText: { color: '#333' },
  categoryTextActive: { color: '#fff' },
  productsContainer: { paddingBottom: 100 },
  productCard: { marginBottom: 12, borderRadius: 12, backgroundColor: '#fff', overflow: 'hidden', elevation: 2 },
  productImage: { width: '100%', height: 150 },
  organicBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#16A34A', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  organicText: { color: '#fff', fontSize: 12 },
  outOfStockOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  outOfStockText: { color: '#fff', fontWeight: 'bold' },
  productInfo: { padding: 10 },
  productName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  productPrice: { color: '#16A34A', fontWeight: '600', marginBottom: 2 },
  productFarmer: { fontSize: 12, color: '#555' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#fff', borderRadius: 12, padding: 16, maxHeight: '90%' },
  closeButton: { position: 'absolute', top: 10, right: 10, zIndex: 1 },
  modalImage: { width: '100%', height: 200, borderRadius: 12 },
  modalName: { fontSize: 20, fontWeight: 'bold', marginVertical: 6 },
  modalPrice: { fontSize: 18, fontWeight: '600', color: '#16A34A', marginBottom: 6 },
  modalRating: { marginBottom: 6 },
  modalDescription: { marginBottom: 6 },
  modalFarmer: { fontSize: 14, color: '#555', marginBottom: 12 },
  addButton: { backgroundColor: '#16A34A', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  disabledButton: { backgroundColor: '#ccc' },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  
});

