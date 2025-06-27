// components/HomePage.js
import React from 'react';
import { Heart, Camera, Upload, Users } from 'lucide-react';

const HomePage = ({ 
  weddingInfo, 
  photos, 
  setCurrentView, 
  setShowUploadModal 
}) => {
  const approvedPhotos = photos.filter(p => p.isApproved);
  const totalLikes = approvedPhotos.reduce((acc, photo) => acc + photo.likes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-100 to-purple-100 py-20">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/30 rounded-full backdrop-blur-sm">
              <Heart className="w-12 h-12 text-pink-500" fill="currentColor" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {weddingInfo.brideName} & {weddingInfo.groomName}
          </h1>
          <p className="text-xl text-gray-600 mb-2">{weddingInfo.weddingDate}</p>
          <p className="text-lg text-gray-500 mb-8">{weddingInfo.location}</p>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Özel günümüzün anılarını paylaşın! Çektiğiniz fotoğrafları yükleyerek 
            bu mutlu günü birlikte ölümsüzleştirelim.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentView('gallery')}
              className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Camera className="w-5 h-5 inline mr-2" />
              Fotoğrafları Görüntüle
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-8 py-3 bg-white text-pink-500 border-2 border-pink-500 rounded-full hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Fotoğraf Yükle
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {approvedPhotos.length}
              </h3>
              <p className="text-gray-600">Onaylı Fotoğraf</p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">25</h3>
              <p className="text-gray-600">Katkıda Bulunan</p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {totalLikes}
              </h3>
              <p className="text-gray-600">Toplam Beğeni</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Photos Preview */}
      <div className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Son Paylaşılan Anılar</h2>
            <p className="text-gray-600">En son yüklenen güzel anılarımız</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedPhotos.slice(0, 3).map(photo => (
              <div key={photo.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold">{photo.title}</h3>
                    <p className="text-sm">{photo.uploader} tarafından</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentView('gallery')}
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
            >
              Tüm Fotoğrafları Gör
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;