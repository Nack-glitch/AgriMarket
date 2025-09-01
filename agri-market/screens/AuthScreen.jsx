import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen({ onClose }) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer',
    farmName: '',
    location: '',
    phone: ''
  });

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const user = { id: '1', name: loginData.email.split('@')[0], email: loginData.email, userType: 'buyer' };
    await login(user);
    onClose();
  };

  const handleRegister = async () => {
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (registerData.userType === 'farmer' && (!registerData.farmName || !registerData.location)) {
      Alert.alert('Error', 'Please fill in farm name and location');
      return;
    }
    const user = { ...registerData, id: Date.now().toString() };
    await login(user);
    onClose();
  };

  return (
    <KeyboardAvoidingView
      style={styles.overlay}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>AgriMarket 🌱</Text>
          <TouchableOpacity onPress={onClose}><Text style={styles.close}>✕</Text></TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, isLogin && styles.activeTab]} onPress={() => setIsLogin(true)}>
            <Text style={isLogin ? styles.activeTabText : styles.tabText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, !isLogin && styles.activeTab]} onPress={() => setIsLogin(false)}>
            <Text style={!isLogin ? styles.activeTabText : styles.tabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {isLogin ? (
            <View>
              <TextInput style={styles.input} placeholder="Email" value={loginData.email} onChangeText={text => setLoginData({ ...loginData, email: text })} keyboardType="email-address" />
              <TextInput style={styles.input} placeholder="Password" value={loginData.password} onChangeText={text => setLoginData({ ...loginData, password: text })} secureTextEntry />
              <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <TouchableOpacity style={[styles.userTypeButton, registerData.userType === 'buyer' && styles.userTypeActive]} onPress={() => setRegisterData({ ...registerData, userType: 'buyer' })}>
                  <Text style={registerData.userType === 'buyer' ? styles.userTypeTextActive : styles.userTypeText}>🛒 Buyer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.userTypeButton, registerData.userType === 'farmer' && styles.userTypeActive]} onPress={() => setRegisterData({ ...registerData, userType: 'farmer' })}>
                  <Text style={registerData.userType === 'farmer' ? styles.userTypeTextActive : styles.userTypeText}>🚜 Farmer</Text>
                </TouchableOpacity>
              </View>

              <TextInput style={styles.input} placeholder="Full Name" value={registerData.name} onChangeText={text => setRegisterData({ ...registerData, name: text })} />
              <TextInput style={styles.input} placeholder="Email" value={registerData.email} onChangeText={text => setRegisterData({ ...registerData, email: text })} keyboardType="email-address" />
              {registerData.userType === 'farmer' && (
                <>
                  <TextInput style={styles.input} placeholder="Farm Name" value={registerData.farmName} onChangeText={text => setRegisterData({ ...registerData, farmName: text })} />
                  <TextInput style={styles.input} placeholder="Location" value={registerData.location} onChangeText={text => setRegisterData({ ...registerData, location: text })} />
                </>
              )}
              <TextInput style={styles.input} placeholder="Phone Number" value={registerData.phone} onChangeText={text => setRegisterData({ ...registerData, phone: text })} keyboardType="phone-pad" />
              <TextInput style={styles.input} placeholder="Password" value={registerData.password} onChangeText={text => setRegisterData({ ...registerData, password: text })} secureTextEntry />
              <TextInput style={styles.input} placeholder="Confirm Password" value={registerData.confirmPassword} onChangeText={text => setRegisterData({ ...registerData, confirmPassword: text })} secureTextEntry />
              <TouchableOpacity style={styles.button} onPress={handleRegister}><Text style={styles.buttonText}>Create Account</Text></TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 16 },
  container: { backgroundColor: '#fff', borderRadius: 10, padding: 16, maxHeight: '90%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: 'green' },
  close: { fontSize: 20, color: 'gray' },
  tabContainer: { flexDirection: 'row', marginBottom: 16, borderRadius: 8, backgroundColor: '#f0f0f0' },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: 'white' },
  tabText: { color: 'gray', fontWeight: '500' },
  activeTabText: { color: 'green', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  button: { backgroundColor: 'green', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  userTypeButton: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', alignItems: 'center' },
  userTypeActive: { backgroundColor: 'green', borderColor: 'green' },
  userTypeText: { color: 'gray', fontWeight: '500' },
  userTypeTextActive: { color: 'white', fontWeight: 'bold' }
});
