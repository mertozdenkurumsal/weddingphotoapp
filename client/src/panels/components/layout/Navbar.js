// components/layout/Navbar.js
import React from 'react';
import { Heart, Upload, LogIn, LogOut, User, Crown, Home } from 'lucide-react';

const Navbar = ({
  weddingInfo,
  currentView,
  setCurrentView,
  isLoggedIn,
  handleLogout,
  openLoginModal,
  openRegisterModal,
  setShowUploadModal,
  onBackToLanding
}) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
              <span className="text-xl font-bold text-gray-800">
                {weddingInfo.brideName} & {weddingInfo.groomName}
              </span>
            </div>
            
            {/* Ana siteye dön butonu */}
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors px-3 py-1 rounded-lg hover:bg-pink-50"
              >
                <Home className="w-4 h-4" />
                Ana Sayfa 31
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('home')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'home' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              Düğün Sayfası
            </button>
            <button
              onClick={() => setCurrentView('gallery')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'gallery' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              Galeri
            </button>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    currentView === 'dashboard' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  Yönetim
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className="px-4 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Giriş Yap
                </button>
                <button
                  onClick={openRegisterModal}
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Kayıt Ol
                </button>
              </>
            )}
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-colors"
            >
              <Upload className="w-4 h-4 inline mr-1" />
              Yükle
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;