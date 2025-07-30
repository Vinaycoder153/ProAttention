
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('edutracker_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock Firebase authentication - replace with actual Firebase auth
      const users = JSON.parse(localStorage.getItem('edutracker_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      const userSession = {
        uid: foundUser.uid,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      };
      
      setUser(userSession);
      localStorage.setItem('edutracker_user', JSON.stringify(userSession));
      
      toast({
        title: "Welcome back! 🎉",
        description: `Successfully logged in as ${foundUser.role}`,
      });
      
      return userSession;
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (email, password, name, role) => {
    try {
      // Mock Firebase registration - replace with actual Firebase auth
      const users = JSON.parse(localStorage.getItem('edutracker_users') || '[]');
      
      if (users.find(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      const newUser = {
        uid: Date.now().toString(),
        email,
        password,
        name,
        role
      };
      
      users.push(newUser);
      localStorage.setItem('edutracker_users', JSON.stringify(users));
      
      const userSession = {
        uid: newUser.uid,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      };
      
      setUser(userSession);
      localStorage.setItem('edutracker_user', JSON.stringify(userSession));
      
      toast({
        title: "Account Created! 🚀",
        description: `Welcome to EduTracker Pro, ${name}!`,
      });
      
      return userSession;
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    toast({
      title: "🚧 Google Sign-in isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edutracker_user');
    toast({
      title: "Logged out successfully",
      description: "See you soon! 👋",
    });
  };

  const value = {
    user,
    login,
    register,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
