// panels/components/FeaturesPage.js
import React from 'react';
import { 
  Camera, 
  Heart, 
  QrCode, 
  Shield, 
  Download, 
  Users, 
  Sparkles, 
  Clock, 
  Share2, 
  Star,
  CheckCircle,
  ArrowRight,
  Crown,
  Zap,
  Globe,
  Lock,
  ArrowLeft
} from 'lucide-react';
import {LoginModal} from './modals/LoginModal';
import {RegisterModal} from './modals/RegisterModal';

const FeaturesPage = ({
  onBackToLanding,
  onCreateWedding,
  openLoginModal,
  openRegisterModal,
  showLoginModal,
  showRegisterModal,
  closeAllModals,
  loginForm,
  updateLoginForm,
  handleLogin,
  registerForm,
  updateRegisterForm,
  handleRegister,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  const mainFeatures = [
    {
      icon: <QrCode className="w-12 h-12" />,
      title: "QR Kod ile Kolay Paylaşım",
      description: "Misafirleriniz QR kodu taratarak anında fotoğraf yükleyebilir. Karmaşık linkler veya uygulamalar gerektirmez.",
      color: "bg-pink-500",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Moderasyon Sistemi",
      description: "Tüm fotoğraflar yayınlanmadan önce onayınızdan geçer. İstenmeyen içerikleri kolayca filtreleyebilirsiniz.",
      color: "bg-green-500",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Etkileşimli Galeri",
      description: "Misafirler fotoğrafları beğenebilir, yorum yapabilir ve favorilerine ekleyebilir.",
      color: "bg-red-500",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: <Download className="w-12 h-12" />,
      title: "Toplu İndirme",
      description: "Tüm fotoğrafları tek seferde indirebilir, özel albümler oluşturabilirsiniz.",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Sınırsız Misafir",
      description: "İstediğiniz kadar misafir fotoğraf yükleyebilir"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Anlık Bildirimler",
      description: "Yeni fotoğraflar geldiğinde anında haberdar olun"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Sosyal Medya Entegrasyonu",
      description: "Fotoğrafları sosyal medyada kolayca paylaşın"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Özel Albümler",
      description: "Fotoğrafları kategorilere ayırın ve düzenleyin"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Mobil Uyumlu",
      description: "Tüm cihazlarda mükemmel çalışır"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Gizlilik Koruması",
      description: "Fotoğraflarınız güvenli ve özel kalır"
    }
  ];

  const plans = [
    {
      name: "Ücretsiz",
      price: "₺0",
      period: "Sonsuza kadar",
      description: "Küçük düğünler için ideal",
      features: [
        "50'ye kadar fotoğraf",
        "QR kod oluşturma",
        "Temel moderasyon",
        "7 gün saklama"
      ],
      color: "border-gray-200",
      buttonColor: "bg-gray-600 hover:bg-gray-700",
      popular: false
    },
    {
      name: "Premium",
      price: "₺99",
      period: "Tek seferlik",
      description: "Çoğu düğün için mükemmel",
      features: [
        "Sınırsız fotoğraf",
        "Gelişmiş QR kodlar",
        "Tam moderasyon sistemi",
        "1 yıl saklama",
        "Toplu indirme",
        "Özel albümler"
      ],
      color: "border-pink-500 ring-2 ring-pink-500",
      buttonColor: "bg-pink-600 hover:bg-pink-700",
      popular: true
    },
    {
      name: "Pro",
      price: "₺199",
      period: "Tek seferlik",
      description: "Büyük etkinlikler için",
      features: [
        "Premium'daki her şey",
        "Çoklu düğün yönetimi",
        "API erişimi",
        "Öncelikli destek",
        "Özel domain",
        "Gelişmiş analitikler"
      ],
      color: "border-purple-500",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Ana Sayfa
            </button>
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-pink-500" />
              <span className="text-xl font-bold text-gray-800">WeddingPhotos</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={openLoginModal}
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                Giriş Yap
              </button>
              <button
                onClick={onCreateWedding}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Düğün Oluştur
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="w-12 h-12 text-yellow-300" />
              <h1 className="text-5xl font-bold">Özellikler</h1>
            </div>
            <p className="text-xl text-pink-100 max-w-3xl mx-auto mb-8">
              Düğün fotoğraflarınızı paylaşmanın en kolay ve güvenli yolu. 
              Misafirlerinizle anılarınızı effortlessly paylaşın.
            </p>
            <div className="flex items-center justify-center gap-8 text-pink-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>100% Güvenli</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Kolay Kullanım</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Anlık Paylaşım</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ana Özellikler */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Temel Özellikler</h2>
          <p className="text-xl text-gray-600">Düğün fotoğraf paylaşımını kolaylaştıran özellikler</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ek Özellikler */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Daha Fazlası</h2>
            <p className="text-xl text-gray-600">Size hayatı kolaylaştıracak ek özellikler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="p-3 bg-pink-100 rounded-lg text-pink-600 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fiyatlandırma */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Fiyatlandırma</h2>
            <p className="text-xl text-gray-600">İhtiyacınıza uygun planı seçin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-lg ${plan.color} relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      En Popüler
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onCreateWedding}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-200 ${plan.buttonColor} flex items-center justify-center gap-2`}
                >
                  Başla
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-12 h-12 text-yellow-300" />
            <h2 className="text-4xl font-bold text-white">Hemen Başlayın</h2>
          </div>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Düğün fotoğraflarınızı paylaşmanın en kolay yolunu keşfedin. 
            Dakikalar içinde kurulum yapın ve misafirlerinizle anılarınızı paylaşmaya başlayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onCreateWedding}
              className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Ücretsiz Deneyin
            </button>
            <button 
              onClick={onBackToLanding}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors duration-200"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-pink-400" />
            <span className="text-2xl font-bold">WeddingPhotos</span>
          </div>
          <p className="text-gray-400">
            Düğün anılarınızı paylaşmanın en güzel yolu
          </p>
        </div>
      </div>

      {/* Modals */}
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

export default FeaturesPage;