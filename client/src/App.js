// App.js
import React, { useState, useRef, useCallback, useEffect } from 'react';
import LandingPage from './panels/components/LandingPage';
import QuickUploadPage from './panels/components/QuickUploadPage';
import FeaturesPage from './panels/components/FeaturesPage'; // YENİ EKLEME
import Navbar from './panels/components/layout/Navbar';
import HomePage from './panels/components/HomePage';
import GalleryPage from './panels/components/GalleryPage';
import DashboardPage from './panels/components/DashboardPage';
import {LoginModal} from './panels/components/modals/LoginModal';
import {RegisterModal} from './panels/components/modals/RegisterModal';
import PhotoModal from './panels/components/modals/PhotoModal';
import UploadModal from './panels/components/modals/UploadModal';

const App = () => {
  // Routing State
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'features', 'wedding', 'upload'
  const [weddingSlug, setWeddingSlug] = useState('');
  
  // Wedding App State
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
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
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Wedding Database (basit örnek - gerçekte API'den gelecek)
  const [weddings, setWeddings] = useState({
    'ayse-mehmet-2024': {
      brideName: "Ayşe",
      groomName: "Mehmet", 
      weddingDate: "15 Haziran 2024",
      location: "İstanbul",
      weddingCode: "AYSE-MEHMET-2024",
      photos: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
          title: "Mutlu An",
          uploader: "Mehmet",
          date: "2024-06-15",
          likes: 12,
          isLiked: false,
          isApproved: true
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400",
          title: "İlk Dans",
          uploader: "Ayşe",
          date: "2024-06-15",
          likes: 8,
          isLiked: true,
          isApproved: true
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400",
          title: "Çiçek Buketi",
          uploader: "Fatma",
          date: "2024-06-15",
          likes: 15,
          isLiked: false,
          isApproved: false
        }
      ]
    },
    'mert-sevval-2025': {
      brideName: "Sevval",
      groomName: "Mert",
      weddingDate: "20 Temmuz 2025", 
      location: "Antalya",
      weddingCode: "MERT-SEVVAL-2025",
      photos: []
    }
  });

  const [photos, setPhotos] = useState([]);
  const [weddingInfo, setWeddingInfo] = useState({
    brideName: "Ayşe",
    groomName: "Mehmet",
    weddingDate: "15 Haziran 2024",
    location: "İstanbul",
    weddingCode: "AYSE-MEHMET-2024"
  });
  const [currentUser, setCurrentUser] = useState({
    name: "Ayşe & Mehmet",
    email: "ayse.mehmet@example.com",
    role: "owner"
  });

  const fileInputRef = useRef(null);

  // URL Routing
  useEffect(() => {
    const path = window.location.pathname;
    
    if (path === '/' || path === '') {
      setCurrentPage('landing');
    } else if (path === '/features' || path === '/ozellikler') {
      setCurrentPage('features');
    } else if (path.includes('/upload')) {
      // /mert-sevval-2025/upload formatında URL
      const slug = path.split('/')[1];
      if (weddings[slug]) {
        setCurrentPage('upload');
        setWeddingSlug(slug);
        loadWeddingData(slug);
      } else {
        setCurrentPage('landing');
      }
    } else {
      // Normal düğün sayfası /mert-sevval-2025
      const slug = path.substring(1);
      if (weddings[slug]) {
        setCurrentPage('wedding');
        setWeddingSlug(slug);
        loadWeddingData(slug);
      } else {
        setCurrentPage('landing');
      }
    }
  }, [weddings]); // weddings dependency eklendi

  // Wedding data'sını yükle
  const loadWeddingData = useCallback((slug) => {
    const wedding = weddings[slug];
    if (wedding) {
      setWeddingInfo({
        brideName: wedding.brideName,
        groomName: wedding.groomName,
        weddingDate: wedding.weddingDate,
        location: wedding.location,
        weddingCode: wedding.weddingCode
      });
      setPhotos(wedding.photos || []);
      setCurrentUser({
        name: `${wedding.brideName} & ${wedding.groomName}`,
        email: "example@email.com",
        role: "owner"
      });
    }
  }, [weddings]);

  // Navigation functions
  const handleCreateWedding = useCallback(() => {
    setShowRegisterModal(true);
  }, []);

  const navigateToWedding = useCallback((slug) => {
    window.history.pushState(null, '', `/${slug}`);
    setCurrentPage('wedding');
    setWeddingSlug(slug);
    loadWeddingData(slug);
  }, [loadWeddingData]);

  const navigateToUpload = useCallback((slug) => {
    window.history.pushState(null, '', `/${slug}/upload`);
    setCurrentPage('upload');
    setWeddingSlug(slug);
    loadWeddingData(slug);
  }, [loadWeddingData]);

  const navigateToLanding = useCallback(() => {
    window.history.pushState(null, '', '/');
    setCurrentPage('landing');
    setWeddingSlug('');
  }, []);

  // YENİ EKLEME: Özellikler sayfasına navigasyon
  const navigateToFeatures = useCallback(() => {
    window.history.pushState(null, '', '/features');
    setCurrentPage('features');
    setWeddingSlug('');
  }, []);

  // Photo upload from QR page
  const handleQuickPhotoUpload = useCallback((photo) => {
    setPhotos(prev => [photo, ...prev]);
    
    // Wedding database'ini de güncelle
    setWeddings(prev => ({
      ...prev,
      [weddingSlug]: {
        ...prev[weddingSlug],
        photos: [photo, ...(prev[weddingSlug]?.photos || [])]
      }
    }));
  }, [weddingSlug]);

  // Form handlers
  const updateRegisterForm = useCallback((field, value) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateLoginForm = useCallback((field, value) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const openLoginModal = useCallback(() => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  }, []);

  const openRegisterModal = useCallback(() => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  }, []);

  const closeAllModals = useCallback(() => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowUploadModal(false);
    setSelectedPhoto(null);
  }, []);

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setCurrentView('dashboard');
      setLoginForm({ email: '', password: '' });
    }
  }, [loginForm]);

  const handleRegister = useCallback((e) => {
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
      // Yeni slug oluştur
      const newSlug = `${registerForm.brideName.toLowerCase()}-${registerForm.groomName.toLowerCase()}-${new Date().getFullYear()}`;
      
      // Yeni düğünü database'e ekle
      const newWedding = {
        brideName: registerForm.brideName,
        groomName: registerForm.groomName,
        weddingDate: registerForm.weddingDate,
        location: registerForm.location,
        weddingCode: `${registerForm.brideName.toUpperCase()}-${registerForm.groomName.toUpperCase()}-${new Date().getFullYear()}`,
        photos: []
      };
      
      setWeddings(prev => ({
        ...prev,
        [newSlug]: newWedding
      }));
      
      // Wedding sayfasına yönlendir
      navigateToWedding(newSlug);
      
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
  }, [registerForm, navigateToWedding]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentView('home');
  }, []);

  const handlePhotoUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          url: event.target.result,
          title: file.name.split('.')[0],
          uploader: "Siz",
          date: new Date().toISOString().split('T')[0],
          likes: 0,
          isLiked: false,
          isApproved: isLoggedIn
        };
        setPhotos(prev => [newPhoto, ...prev]);
        
        // Wedding database'ini de güncelle
        setWeddings(prev => ({
          ...prev,
          [weddingSlug]: {
            ...prev[weddingSlug],
            photos: [newPhoto, ...(prev[weddingSlug]?.photos || [])]
          }
        }));
      };
      reader.readAsDataURL(file);
    });
    setShowUploadModal(false);
  }, [isLoggedIn, weddingSlug]);

  const toggleLike = useCallback((photoId) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, isLiked: !photo.isLiked, likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1 }
        : photo
    ));
  }, []);

  const approvePhoto = useCallback((photoId) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, isApproved: true }
        : photo
    ));
  }, []);

  const deletePhoto = useCallback((photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  }, []);

  // Filtered photos
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.uploader.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!isLoggedIn) {
      return matchesSearch && photo.isApproved;
    }
    
    return matchesSearch;
  });

  // Common props object
  const commonProps = {
    photos,
    filteredPhotos,
    weddingInfo,
    currentUser,
    isLoggedIn,
    toggleLike,
    setSelectedPhoto,
    setCurrentView,
    setShowUploadModal
  };

  // YENİ EKLEME: Features Page Render
  if (currentPage === 'features') {
    return (
      <FeaturesPage 
        onBackToLanding={navigateToLanding}
        onCreateWedding={handleCreateWedding}
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
        showLoginModal={showLoginModal}
        showRegisterModal={showRegisterModal}
        closeAllModals={closeAllModals}
        loginForm={loginForm}
        updateLoginForm={updateLoginForm}
        handleLogin={handleLogin}
        registerForm={registerForm}
        updateRegisterForm={updateRegisterForm}
        handleRegister={handleRegister}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
      />
    );
  }

  // Landing Page Render
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage 
          onCreateWedding={handleCreateWedding} 
          onNavigateToFeatures={navigateToFeatures} 
        />
        
        <RegisterModal
          show={showRegisterModal}
          onClose={closeAllModals}
          registerForm={registerForm}
          updateRegisterForm={updateRegisterForm}
          handleRegister={handleRegister}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          openLoginModal={openLoginModal}
        />
        
        <LoginModal
          show={showLoginModal}
          onClose={closeAllModals}
          loginForm={loginForm}
          updateLoginForm={updateLoginForm}
          handleLogin={handleLogin}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          openRegisterModal={openRegisterModal}
        />
      </>
    );
  }

  // Quick Upload Page Render (QR Code sayfası)
  if (currentPage === 'upload') {
    return (
      <QuickUploadPage
        weddingInfo={weddingInfo}
        onPhotoUpload={handleQuickPhotoUpload}
        onBackToWedding={() => navigateToWedding(weddingSlug)}
      />
    );
  }

  // Wedding Page Render
  return (
    <div className="min-h-screen">
      <Navbar
        weddingInfo={weddingInfo}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
        setShowUploadModal={setShowUploadModal}
        onBackToLanding={navigateToLanding}
      />

      {currentView === 'home' && <HomePage {...commonProps} />}
      {currentView === 'gallery' && (
        <GalleryPage 
          {...commonProps}
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {currentView === 'dashboard' && isLoggedIn && (
        <DashboardPage 
          {...commonProps}
          approvePhoto={approvePhoto}
          deletePhoto={deletePhoto}
          weddingSlug={weddingSlug}
        />
      )}

      {/* Modals */}
      {selectedPhoto && (
        <PhotoModal 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)}
          isLoggedIn={isLoggedIn}
          toggleLike={toggleLike}
          approvePhoto={approvePhoto}
        />
      )}
      
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          fileInputRef={fileInputRef}
          handlePhotoUpload={handlePhotoUpload}
          isLoggedIn={isLoggedIn}
        />
      )}
      
      <RegisterModal
        show={showRegisterModal}
        onClose={closeAllModals}
        registerForm={registerForm}
        updateRegisterForm={updateRegisterForm}
        handleRegister={handleRegister}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        openLoginModal={openLoginModal}
      />
      
      <LoginModal
        show={showLoginModal}
        onClose={closeAllModals}
        loginForm={loginForm}
        updateLoginForm={updateLoginForm}
        handleLogin={handleLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        openRegisterModal={openRegisterModal}
      />
    </div>
  );
};

export default App;