import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

const mockOrders = [
  { id: "1024", customerName: "John Smith", farmerName: "Green Valley Farm", items: "5 lbs Tomatoes", total: 19.95, status: "pending", date: "2 hours ago" },
  { id: "1023", customerName: "Sarah Johnson", farmerName: "Sunrise Orchards", items: "3 heads Lettuce", total: 8.97, status: "completed", date: "Yesterday" },
  { id: "2045", customerName: "Current User", farmerName: "Green Valley Farm", items: "3 lbs Tomatoes, 2 lbs Carrots", total: 18.47, status: "processing", date: "Today" },
];

const DashboardScreen = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "", unit: "lb", category: "Vegetables", description: "" });

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Welcome to AgriMarket</Text>
        <Text style={styles.subtitle}>Sign in to access your dashboard.</Text>
        <TouchableOpacity style={styles.button} onPress={() => onNavigate("auth")}>
          <Text style={styles.buttonText}>Login / Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      alert("Please fill all required fields");
      return;
    }
    alert(`${newProduct.name} added!`);
    setNewProduct({ name: "", price: "", quantity: "", unit: "lb", category: "Vegetables", description: "" });
    setShowAddProductModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#FBBF24"; // yellow
      case "processing": return "#3B82F6"; // blue
      case "completed": return "#10B981"; // green
      case "cancelled": return "#EF4444"; // red
      default: return "#6B7280"; // gray
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Welcome back, {user.name}</Text>
          {user.userType === "farmer" && user.farmName && <Text style={styles.subtitle}>{user.farmName}</Text>}
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {user.userType === "farmer" && (
        <>
          {/* Quick Action */}
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddProductModal(true)}>
            <Text style={styles.addBtnText}>Add New Product ➕</Text>
          </TouchableOpacity>

          {/* Recent Orders */}
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {mockOrders.filter(o => o.customerName !== "Current User").map(order => (
            <View key={order.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Order #{order.id}</Text>
                <Text style={{ color: getStatusColor(order.status), fontWeight: "bold" }}>{order.status.toUpperCase()}</Text>
              </View>
              <Text>{order.customerName}</Text>
              <Text>{order.items}</Text>
              <Text>${order.total.toFixed(2)} • {order.date}</Text>
            </View>
          ))}
        </>
      )}

      {user.userType === "buyer" && (
        <>
          {/* Order History */}
          <Text style={styles.sectionTitle}>Order History</Text>
          {mockOrders.filter(o => o.customerName === "Current User").map(order => (
            <View key={order.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Order #{order.id}</Text>
                <Text style={{ color: getStatusColor(order.status), fontWeight: "bold" }}>{order.status.toUpperCase()}</Text>
              </View>
              <Text>{order.farmerName}</Text>
              <Text>{order.items}</Text>
              <Text>${order.total.toFixed(2)} • {order.date}</Text>
            </View>
          ))}
        </>
      )}

      {/* Add Product Modal */}
      <Modal visible={showAddProductModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add New Product</Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
            />
            <TextInput
              placeholder="Price"
              style={styles.input}
              keyboardType="numeric"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
            />
            <TextInput
              placeholder="Quantity"
              style={styles.input}
              keyboardType="numeric"
              value={newProduct.quantity}
              onChangeText={(text) => setNewProduct({ ...newProduct, quantity: text })}
            />
            <TouchableOpacity style={styles.modalBtn} onPress={handleAddProduct}>
              <Text style={styles.modalBtnText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, { backgroundColor: "#ccc", marginTop: 8 }]} onPress={() => setShowAddProductModal(false)}>
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#4B5563", marginBottom: 16 },
  button: { backgroundColor: "#16A34A", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  logoutBtn: { backgroundColor: "#E5E7EB", padding: 8, borderRadius: 6 },
  logoutText: { color: "#374151" },
  addBtn: { backgroundColor: "#D1FAE5", padding: 12, borderRadius: 8, marginBottom: 16 },
  addBtnText: { color: "#047857", fontWeight: "600" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, marginTop: 16 },
  card: { backgroundColor: "#F9FAFB", padding: 12, borderRadius: 8, marginBottom: 12 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  cardTitle: { fontWeight: "bold" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 16 },
  modal: { backgroundColor: "#fff", borderRadius: 8, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 6, padding: 10, marginBottom: 12 },
  modalBtn: { backgroundColor: "#16A34A", padding: 12, borderRadius: 8, alignItems: "center" },
  modalBtnText: { color: "#fff", fontWeight: "600" },
});
