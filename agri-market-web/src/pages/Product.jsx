import React, { useState } from 'react'
import { Search, Filter, Star, MapPin, ShoppingCart } from 'lucide-react'

export default function Product (){
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')

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
    },
    {
      id: 5,
      name: "Organic Lettuce",
      farmer: "Green Leaf Farm",
      location: "Arizona",
      price: 1.99,
      unit: "head",
      rating: 4.6,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=200&fit=crop",
      category: "Vegetables",
      description: "Crisp organic lettuce perfect for salads"
    },
    {
      id: 6,
      name: "Fresh Corn",
      farmer: "Midwest Harvest",
      location: "Iowa",
      price: 4.99,
      unit: "dozen",
      rating: 4.8,
      reviews: 28,
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop",
      category: "Vegetables",
      description: "Sweet corn harvested at peak freshness"
    }
  ]

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Fresh Products</h1>
        <p className="text-gray-600">Discover fresh produce from local farmers</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
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

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
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

              <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}