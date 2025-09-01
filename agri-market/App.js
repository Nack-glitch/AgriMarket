import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import MarketplaceScreen from "./screens/MarketplaceScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AuthScreen from "./screens/AuthScreen";
import SplashScreen from './screens/SplashScreen';

// ----------------- TabIcon -----------------
const TabIcon = ({ name, active }) => {
  let icon = "";
  if (name === "Home") icon = "🏠";
  else if (name === "Market") icon = "🛒";
  else if (name === "Profile") icon = "👤";

  return <Text style={{ fontSize: 20, color: active ? "#16A34A" : "#9CA3AF" }}>{icon}</Text>;
};

// ----------------- AppContent -----------------
function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true); // Splash defined here

  const handleViewChange = (view) => {
    if (view === "auth") {
      setShowAuthModal(true);
    } else {
      setCurrentView(view);
      setShowAuthModal(false);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "marketplace":
        return <MarketplaceScreen onAuthRequired={() => setShowAuthModal(true)} />;
      case "dashboard":
        return <DashboardScreen onNavigate={handleViewChange} />;
      case "home":
      default:
        return <HomeScreen onNavigate={handleViewChange} />;
    }
  };

  // ---------------- Splash Screen ----------------
  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setSplashVisible(false)} />;
  }

  // ---------------- Main App ----------------
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => setCurrentView("home")}
        >
          <View style={styles.logoCircle}>
            <Text style={{ color: "#fff" }}>🌱</Text>
          </View>
          <Text style={styles.logoText}>AgriMarket</Text>
        </TouchableOpacity>

        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>Welcome, {user.name}</Text>
            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => setCurrentView("dashboard")}
            >
              <Text style={styles.dashboardButtonText}>Dashboard</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Main Content */}
      <ScrollView style={{ flex: 1 }}>{renderCurrentView()}</ScrollView>

      {/* Bottom Navigation */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, currentView === "home" && styles.navButtonActive]}
          onPress={() => setCurrentView("home")}
        >
          <TabIcon name="Home" active={currentView === "home"} />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, currentView === "marketplace" && styles.navButtonActive]}
          onPress={() => setCurrentView("marketplace")}
        >
          <TabIcon name="Market" active={currentView === "marketplace"} />
          <Text style={styles.navLabel}>Market</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, currentView === "dashboard" && styles.navButtonActive]}
          onPress={() => (user ? setCurrentView("dashboard") : setShowAuthModal(true))}
        >
          <TabIcon name="Profile" active={currentView === "dashboard"} />
          <Text style={styles.navLabel}>{user ? "Dashboard" : "Profile"}</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Auth Modal */}
      <Modal visible={showAuthModal} animationType="slide" transparent>
        <AuthScreen onClose={() => setShowAuthModal(false)} onNavigate={handleViewChange} />
      </Modal>
    </SafeAreaView>
  );
}

// ----------------- App -----------------
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { marginLeft: 8, fontSize: 18, fontWeight: "600", color: "#16A34A" },
  userInfo: { flexDirection: "row", alignItems: "center" },
  welcomeText: { fontSize: 14, color: "#374151", marginRight: 8 },
  dashboardButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dashboardButtonText: { color: "#fff", fontSize: 14, fontWeight: "500" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  navButton: { alignItems: "center", padding: 8 },
  navButtonActive: { backgroundColor: "#ECFDF5", borderRadius: 8 },
  navLabel: { fontSize: 12, color: "#374151", marginTop: 2 },
});
