import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

const HomeScreen = ({ onNavigate }) => {
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      onNavigate("dashboard");
    } else {
      onNavigate("auth");
    }
  };

  const handleExploreProducts = () => {
    onNavigate("marketplace");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Connect <Text style={styles.highlight}>Farmers</Text> &{" "}
          <Text style={styles.highlight}>Buyers</Text> Directly
        </Text>
        <Text style={styles.heroSubtitle}>
          AgriMarket eliminates middlemen, ensuring farmers get fair prices and buyers get fresh, quality produce.
        </Text>

        <View style={styles.heroButtons}>
          <TouchableOpacity style={styles.getStartedBtn} onPress={handleGetStarted}>
            <Text style={styles.btnText}>Get Started →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreBtn} onPress={handleExploreProducts}>
            <Text style={styles.exploreText}>Explore Products</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Active Farmers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>2K+</Text>
            <Text style={styles.statLabel}>Happy Buyers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Orders Delivered</Text>
          </View>
        </View>
      </View>

      {/* Hero Image */}
      <View style={styles.heroImageWrapper}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1622385161916-27f0c8746f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" }}
          style={styles.heroImage}
        />
      </View>

      {/* Features Section */}
      <View style={styles.features}>
        <Text style={styles.sectionTitle}>Why Choose AgriMarket?</Text>
        <Text style={styles.sectionSubtitle}>
          We're revolutionizing agriculture by creating direct connections between farmers and consumers.
        </Text>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👥</Text>
            <Text style={styles.featureTitle}>Direct Connection</Text>
            <Text style={styles.featureDesc}>Connect directly with farmers and buyers without middlemen.</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🛡️</Text>
            <Text style={styles.featureTitle}>Quality Guaranteed</Text>
            <Text style={styles.featureDesc}>All products are verified for quality and freshness.</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🚚</Text>
            <Text style={styles.featureTitle}>Fast Delivery</Text>
            <Text style={styles.featureDesc}>Fresh produce delivered directly from farms within 24 hours.</Text>
          </View>
        </View>
      </View>

      {/* How It Works Section */}
      <View style={styles.howItWorks}>
        <Text style={styles.sectionTitle}>How AgriMarket Works</Text>
        <Text style={styles.sectionSubtitle}>Simple steps to connect farmers and buyers</Text>

        <View style={styles.steps}>
          <View style={styles.step}>
            <Text style={styles.stepIcon}>📝</Text>
            <Text style={styles.stepTitle}>1. Register</Text>
            <Text style={styles.stepDesc}>Sign up as a farmer or buyer to list or order products.</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepIcon}>🛒</Text>
            <Text style={styles.stepTitle}>2. Browse & Order</Text>
            <Text style={styles.stepDesc}>Explore fresh produce and order directly from farmers.</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepIcon}>🚚</Text>
            <Text style={styles.stepTitle}>3. Get Delivered</Text>
            <Text style={styles.stepDesc}>Receive produce delivered directly to your doorstep.</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.exploreAllBtn} onPress={handleExploreProducts}>
          <Text style={styles.btnText}>View All Products →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  hero: { marginBottom: 24 },
  heroTitle: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  highlight: { color: "#16A34A" },
  heroSubtitle: { fontSize: 16, color: "#4B5563", marginBottom: 16 },
  heroButtons: { flexDirection: "row", marginBottom: 16 },
  getStartedBtn: { backgroundColor: "#16A34A", padding: 12, borderRadius: 8, marginRight: 8 },
  btnText: { color: "#fff", fontWeight: "600" },
  exploreBtn: { borderWidth: 1, borderColor: "#16A34A", padding: 12, borderRadius: 8 },
  exploreText: { color: "#16A34A", fontWeight: "600" },
  statsContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  stat: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "700" },
  statLabel: { fontSize: 12, color: "#6B7280" },
  heroImageWrapper: { height: 200, marginBottom: 24, borderRadius: 16, overflow: "hidden" },
  heroImage: { width: "100%", height: "100%" },
  features: { marginBottom: 24 },
  sectionTitle: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  sectionSubtitle: { fontSize: 16, color: "#4B5563", marginBottom: 16 },
  featureList: { flexDirection: "row", justifyContent: "space-between" },
  featureItem: { alignItems: "center", width: "30%" },
  featureIcon: { fontSize: 32, marginBottom: 8 },
  featureTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  featureDesc: { fontSize: 14, textAlign: "center", color: "#6B7280" },
  howItWorks: { marginBottom: 24 },
  steps: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  step: { alignItems: "center", width: "30%" },
  stepIcon: { fontSize: 28, marginBottom: 8 },
  stepTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  stepDesc: { fontSize: 14, textAlign: "center", color: "#6B7280" },
  exploreAllBtn: { backgroundColor: "#16A34A", padding: 12, borderRadius: 8, alignItems: "center" },
});
