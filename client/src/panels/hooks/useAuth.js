// hooks/useAuth.js
import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Ayşe & Mehmet",
    email: "ayse.mehmet@example.com",
    role: "owner"
  });
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    brideName: '',
    groomName: '',
    email: '',
    password: '',
    confirmPassword: '',
    weddingDate: '',
    location: ''
  });

  const updateRegisterForm = useCallback((field, value) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateLoginForm = useCallback((field, value) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleLogin = useCallback((e, setWeddingInfo, setCurrentView, setShowLoginModal) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setCurrentView('dashboard');
      setLoginForm({ email: '', password: '' });
    }
  }, [loginForm]);

  const handleRegister = useCallback((e, setWeddingInfo, setCurrentView, setShowRegisterModal) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    
    if (registerForm.password.length < 6) {
      alert('Şifre en az 6 karakter olmalıdır!');
      return;
    }
    
    if (registerForm.email && registerForm.password && registerForm.brideName && registerForm.groomName) {
      setWeddingInfo({
        brideName: registerForm.brideName,
        groomName: registerForm.groomName,
        weddingDate: registerForm.weddingDate,
        location: registerForm.location,
        weddingCode: `${registerForm.brideName.toUpperCase()}-${registerForm.groomName.toUpperCase()}-${new Date().getFullYear()}`
      });
      
      setCurrentUser({
        name: `${registerForm.brideName} & ${registerForm.groomName}`,
        email: registerForm.email,
        role: "owner"
      });
      
      setIsLoggedIn(true);
      setShowRegisterModal(false);
      setCurrentView('dashboard');
      setRegisterForm({
        brideName: '',
        groomName: '',
        email: '',
        password: '',
        confirmPassword: '',
        weddingDate: '',
        location: ''
      });
    }
  }, [registerForm]);

  const handleLogout = useCallback((setCurrentView) => {
    setIsLoggedIn(false);
    setCurrentView('home');
  }, []);

  return {
    isLoggedIn,
    currentUser,
    loginForm,
    registerForm,
    updateRegisterForm,
    updateLoginForm,
    handleLogin,
    handleRegister,
    handleLogout,
    setCurrentUser
  };
};