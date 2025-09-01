import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Utility functions to handle localStorage
const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem("agriMarketUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const saveUserToStorage = (user) => {
  localStorage.setItem("agriMarketUser", JSON.stringify(user));
};

const removeUserFromStorage = () => {
  localStorage.removeItem("agriMarketUser");
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUserFromStorage());
  const [loading, setLoading] = useState(false);

  // Persist user session in localStorage
  useEffect(() => {
    if (user) saveUserToStorage(user);
    else removeUserFromStorage();
  }, [user]);

  // Mock "login" function
  const login = async ({ email, password }) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          setLoading(false);
          return reject("Email and password are required");
        }

        // Mock user
        const mockUser = {
          id: "1",
          name: email.split("@")[0],
          email,
          userType: "buyer", // or "farmer"
        };

        setUser(mockUser);
        setLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  // Mock "register" function
  const register = async ({ name, email, password, confirmPassword, userType, farmName, location, phone }) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password || !phone) {
          setLoading(false);
          return reject("All required fields must be filled");
        }
        if (password !== confirmPassword) {
          setLoading(false);
          return reject("Passwords do not match");
        }
        if (userType === "farmer" && (!farmName || !location)) {
          setLoading(false);
          return reject("Farm name and location required for farmers");
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          userType,
          farmName: userType === "farmer" ? farmName : null,
          location: userType === "farmer" ? location : null,
          phone,
        };

        setUser(newUser);
        setLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  // Logout function
  const logout = () => setUser(null);

  // Role check helper
  const isFarmer = () => user?.userType === "farmer";
  const isBuyer = () => user?.userType === "buyer";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isFarmer,
        isBuyer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
