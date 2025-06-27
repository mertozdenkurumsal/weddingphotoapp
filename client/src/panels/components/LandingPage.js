// components/LandingPage.js
import React from 'react';
import { Heart, Camera, Users, Shield, Star, CheckCircle, ArrowRight, Play } from 'lucide-react';

const LandingPage = ({ onCreateWedding }) => {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Kolay Fotoğraf Paylaşımı",
      description: "Misafirleriniz tek tıkla fotoğraf yükleyebilir, anılarınızı bir arada toplayabilirsiniz."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Güvenli ve Özel",
      description: "Sadece davetlileriniz erişebilir. Tüm fotoğrafları onaylayarak kontrol sizde kalır."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Misafir Dostu",
      description: "Misafirleriniz uygulama indirmeden, sadece link ile kolayca fotoğraf paylaşabilir."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Romantic Tasarım",
      description: "Düğününüzün havasına uygun özel tasarım ile anılarınızı güzel bir şekilde sergileyin."
    }
  ];

  const testimonials = [
    {
      name: "Ayşe & Mehmet",
      date: "15 Haziran 2024",
      photo: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=100",
      review: "Düğünümüzde 200 misafirimiz vardı ve hepsi fotoğraflarını buraya yükledi. Harika bir deneyimdi!",
      rating: 5
    },
    {
      name: "Elif & Can",
      date: "3 Eylül 2024", 
      photo: "https://images.unsplash.com/photo-1594736797933-d0f06ba3707d?w=100",
      review: "Çok pratik ve güvenli. Tüm anılarımız tek yerde toplandı. Kesinlikle tavsiye ederim!",
      rating: 5
    },
    {
      name: "Zeynep & Ömer",
      date: "12 Kasım 2024",
      photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100", 
      review: "Misafirlerimiz çok beğendi. Özellikle yaşlı akrabalarımız bile kolayca kullanabildi.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Mutlu Çift" },
    { number: "2M+", label: "Paylaşılan Fotoğraf" },
    { number: "50K+", label: "Düğün Misafiri" },
    { number: "99%", label: "Memnuniyet Oranı" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
              <span className="text-2xl font-bold text-gray-800">DüğünFoto</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#features" className="text-gray-600 hover:text-pink-600 transition-colors">Özellikler</a>
              <a href="#pricing" className="text-gray-600 hover:text-pink-600 transition-colors">Fiyatlar</a>
              <a href="#testimonials" className="text-gray-600 hover:text-pink-600 transition-colors">Yorumlar</a>
              <button
                onClick={onCreateWedding}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                Ücretsiz Başla
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-purple-100/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Düğün Anılarınızı
                <span className="text-pink-500 block">Bir Arada Toplayın</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Misafirlerinizin çektiği tüm fotoğrafları tek platformda birleştirin. 
                Güvenli, kolay ve tamamen ücretsiz!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onCreateWedding}
                  className="px-8 py-4 bg-pink-500 text-white rounded-full text-lg font-semibold hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Düğününüzü Oluşturun
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full text-lg font-semibold hover:border-pink-500 hover:text-pink-500 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Demo İzle
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600"
                  alt="Düğün Fotoğrafı"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 transform -rotate-6">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                  <div>
                    <p className="font-semibold text-gray-800">127 Fotoğraf</p>
                    <p className="text-sm text-gray-600">45 Misafir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl lg:text-4xl font-bold text-pink-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Neden DüğünFoto?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Düğününüzün tüm anılarını bir araya getirmek hiç bu kadar kolay olmamıştı
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-pink-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nasıl Çalışır?</h2>
            <p className="text-xl text-gray-600">3 basit adımda düğün fotoğraf galerinizi oluşturun</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-500">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Düğününüzü Kaydedin</h3>
              <p className="text-gray-600">Düğün bilgilerinizi girin ve özel linkinizi alın</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-500">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Misafirlerle Paylaşın</h3>
              <p className="text-gray-600">Özel linki misafirlerinizle paylaşın</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Anıları Toplayın</h3>
              <p className="text-gray-600">Tüm fotoğraflar otomatik olarak galerinizde toplanır</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mutlu Çiftlerimiz</h2>
            <p className="text-xl text-gray-600">DüğünFoto'yu kullanan çiftlerin deneyimleri</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.review}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Basit ve Şeffaf Fiyatlandırma</h2>
          <p className="text-xl text-gray-600 mb-12">Düğününüz için mükemmel paketi seçin</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ücretsiz</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">₺0</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100 fotoğraf kapasitesi</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Sınırsız misafir</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Temel galeri</span>
                </li>
              </ul>
              <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-pink-500 hover:text-pink-500 transition-colors">
                Ücretsiz Başla
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                Popüler
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold mb-6">₺49</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Sınırsız fotoğraf</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Özel tasarım seçenekleri</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>HD fotoğraf indirme</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Öncelikli destek</span>
                </li>
              </ul>
              <button
                onClick={onCreateWedding}
                className="w-full py-3 bg-white text-pink-500 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Premium'u Seç
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Düğün Anılarınızı Kaçırmayın!</h2>
          <p className="text-xl mb-8 opacity-90">
            Bugün başlayın ve misafirlerinizin çektiği tüm güzel anları bir araya getirin
          </p>
          <button
            onClick={onCreateWedding}
            className="px-8 py-4 bg-white text-pink-500 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Hemen Başlayın - Ücretsiz
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                <span className="text-2xl font-bold">DüğünFoto</span>
              </div>
              <p className="text-gray-400">
                Düğün anılarınızı bir araya getiren en kolay platform
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Ürün</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Özellikler</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fiyatlar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SSS</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Şirket</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gizlilik</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DüğünFoto. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;