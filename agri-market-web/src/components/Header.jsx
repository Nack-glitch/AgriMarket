import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Bell, User, ShoppingCart, Sprout } from 'lucide-react'

<<<<<<< HEAD
export default function Header ({ user, notifications }) {
=======
const Header = ({ user, notifications }) => {
>>>>>>> 4850fbe497d9ee32cf7c78f4d335c72d89c8fa2f
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications?.filter(n => !n.read).length || 0

  return (
<<<<<<< HEAD
    <header className="header">
      <nav className="navigation">
        <div className="header-main">
          {/* Logo */}
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <Link to="/" className="logo-link">
              <Sprout className="leaf" />
              <span className="agri-market">AgriMarket</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-navigation">
              <Link to="/" className='page'>Home</Link>
              <Link to="/products" className='page'>Products</Link>
              <Link to="/about" className='page'>About</Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/orders" className="text-gray-700 hover:text-primary transition-colors">Orders</Link>
                  
                  {/* Notifications */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center notification-badge">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                    
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border">
                        <div className="p-4 border-b">
                          <h3 className="font-semibold text-gray-800">Notifications</h3>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.map(notification => (
                            <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Menu */}
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Link>
                  
                  <Link 
                    to={user.type === 'farmer' ? '/farmer-dashboard' : '/client-dashboard'}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="login-register">
                  <Link to="/login" className='page'>Login</Link>
                  <Link to="/register" className='page'>
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            {/* <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>*/}
          </div>
        </div> 

        {/* Mobile Menu */}
        {/* {isMenuOpen && (
=======
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-800">AgriMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/orders" className="text-gray-700 hover:text-primary transition-colors">Orders</Link>
                
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center notification-badge">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map(notification => (
                          <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                
                <Link 
                  to={user.type === 'farmer' ? '/farmer-dashboard' : '/client-dashboard'}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">Login</Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
>>>>>>> 4850fbe497d9ee32cf7c78f4d335c72d89c8fa2f
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">Products</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
              
              {user ? (
                <>
                  <Link to="/orders" className="text-gray-700 hover:text-primary transition-colors">Orders</Link>
                  <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors">Profile</Link>
                  <Link 
                    to={user.type === 'farmer' ? '/farmer-dashboard' : '/client-dashboard'}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-center"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">Login</Link>
                  <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-center">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
<<<<<<< HEAD
        )} */}
=======
        )}
>>>>>>> 4850fbe497d9ee32cf7c78f4d335c72d89c8fa2f
      </nav>
    </header>
  )
}

<<<<<<< HEAD
=======
export default Header
>>>>>>> 4850fbe497d9ee32cf7c78f4d335c72d89c8fa2f
