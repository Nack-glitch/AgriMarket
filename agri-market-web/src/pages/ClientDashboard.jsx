import React, { useState } from 'react'
import { Search, Filter, ShoppingCart, Star, MapPin } from 'lucide-react'

<<<<<<< HEAD
export default function ClientDashboard({ user }){
=======
const ClientDashboard = ({ user }) => {
>>>>>>> 4850fbe497d9ee32cf7c78f4d335c72d89c8fa2f
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "John's Farm",
      location: "California",
      price: 5.99,
      unit: "kg",
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300&h=200&fit=crop",
      category: "Vegetables",
      description: "Fresh organic tomatoes grown without pesticides"
    },
    {
      id: 2,
      name: "Fresh Apples",
      farmer: "Green Valley Orchard",
      location: "Washington",
      price: 3.99,
      unit: "kg",
      rating: 4.9,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=200&fit=crop",
      category: "Fruits",
      description: "Crisp and sweet apples from our orchard"
    },
    {
      id: 3,
      name: "Organic Carrots",
      farmer: "Sunny Acres",
      location: "Oregon",
      price: 2.99,
      unit: "kg",
      rating: 4.7,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=200&fit=crop",
      category: "Vegetables",
      description: "Sweet and crunchy organic carrots"
    },
    {
      id: 4,
      name: "Fresh Strawberries",
      farmer: "Berry Best Farm",
      location: "Florida",
      price: 7.99,
      unit: "kg",
      rating: 4.9,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=200&fit=crop",
      category: "Fruits",
      description: "Juicy and sweet strawberries picked fresh"
    }
  ]

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name || 'Client'}!
        </h1>
        <p className="text-gray-600">Discover fresh produce from local farmers</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Cart Summary */}
          <div className="flex items-center space-x-4 bg-primary text-white px-4 py-3 rounded-lg">
            <ShoppingCart className="h-5 w-5" />
            <span className="font-semibold">{getTotalItems()} items</span>
            <span className="font-bold">${getTotalPrice()}</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.farmer}</p>
              
              <div className="flex items-center space-x-1 mb-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 text-sm">{product.location}</span>
              </div>

              <div className="flex items-center space-x-1 mb-3">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-gray-600 text-sm">({product.reviews} reviews)</span>
              </div>

              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <span className="text-gray-600">per {product.unit}</span>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.farmer}</p>
                    <p className="text-primary font-semibold">${item.price} per {item.unit}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                  <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total: ${getTotalPrice()}</span>
                <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition-colors">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

<<<<<<< HEAD
=======
export default ClientDashboard
>>>>>>> 4850fbe497d9ee32cf7c78f4d335c72d89c8fa2f
