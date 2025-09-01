import React, { useState } from 'react'
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react'

export default function Order ({ user }){
  const [activeTab, setActiveTab] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      farmer: "John's Farm",
      items: [
        { name: 'Organic Tomatoes', quantity: 5, unit: 'kg', price: 5.99 },
        { name: 'Fresh Lettuce', quantity: 2, unit: 'heads', price: 1.99 }
      ],
      total: 33.93,
      status: 'delivered',
      deliveryDate: '2024-01-17',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2024-01-18',
      farmer: "Green Valley Orchard",
      items: [
        { name: 'Fresh Apples', quantity: 3, unit: 'kg', price: 3.99 }
      ],
      total: 11.97,
      status: 'processing',
      estimatedDelivery: '2024-01-22'
    },
    {
      id: 'ORD-003',
      date: '2024-01-20',
      farmer: "Sunny Acres",
      items: [
        { name: 'Organic Carrots', quantity: 2, unit: 'kg', price: 2.99 },
        { name: 'Fresh Corn', quantity: 1, unit: 'dozen', price: 4.99 }
      ],
      total: 10.97,
      status: 'pending',
      estimatedDelivery: '2024-01-25'
    },
    {
      id: 'ORD-004',
      date: '2024-01-12',
      farmer: "Berry Best Farm",
      items: [
        { name: 'Fresh Strawberries', quantity: 1, unit: 'kg', price: 7.99 }
      ],
      total: 7.99,
      status: 'cancelled',
      cancelReason: 'Out of stock'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true
    return order.status === activeTab
  })

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Orders List */}
        <div className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No orders found</p>
              <p className="text-gray-500 mt-2">
                {activeTab === 'all' ? 'You haven\'t placed any orders yet.' : `No ${activeTab} orders.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className="font-semibold text-lg">Order {order.id}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="flex items-center space-x-1 text-primary hover:text-secondary transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Farmer</p>
                      <p className="font-medium">{order.farmer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold text-lg text-primary">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {order.status === 'delivered' && order.deliveryDate && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Delivered on</p>
                      <p className="font-medium text-green-600">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                      {order.trackingNumber && (
                        <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                      )}
                    </div>
                  )}

                  {(order.status === 'pending' || order.status === 'processing') && order.estimatedDelivery && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                    </div>
                  )}

                  {order.status === 'cancelled' && order.cancelReason && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Cancellation Reason</p>
                      <p className="font-medium text-red-600">{order.cancelReason}</p>
                    </div>
                  )}

                  {/* Order Details */}
                  {selectedOrder === order.id && (
                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-semibold mb-3">Order Items</h3>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">{item.quantity} {item.unit}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-gray-600">${item.price} per {item.unit}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-3 mt-3 border-t">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg text-primary">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

