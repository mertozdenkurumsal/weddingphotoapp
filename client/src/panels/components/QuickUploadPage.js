// components/QuickUploadPage.js
import React, { useState, useRef } from 'react';
import { Heart, Upload, Camera, CheckCircle, ArrowLeft, Users, Image, Share2 } from 'lucide-react';

const QuickUploadPage = ({ weddingInfo, onPhotoUpload, onBackToWedding }) => {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploaderName, setUploaderName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);

    // Her dosyayı işle
    const processedPhotos = await Promise.all(
      files.map((file) => 
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              id: Date.now() + Math.random(),
              file,
              url: event.target.result,
              title: file.name.split('.')[0],
              uploader: uploaderName || 'Misafir',
              date: new Date().toISOString().split('T')[0],
              likes: 0,
              isLiked: false,
              isApproved: false // Misafir fotoğrafları onay bekler
            });
          };
          reader.readAsDataURL(file);
        })
      )
    );

    setUploadedPhotos(prev => [...prev, ...processedPhotos]);
    setIsUploading(false);
    setShowSuccess(true);

    // Ana uygulamaya fotoğrafları gönder
    processedPhotos.forEach(photo => {
      onPhotoUpload(photo);
    });

    // Success mesajını 3 saniye sonra kapat
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      const event = { target: { files: imageFiles } };
      handleFileSelect(event);
    }
  };

  const openCamera = () => {
    // Mobil cihazlarda kamera açma
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Arka kamera
    input.onchange = handleFileSelect;
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToWedding}
                className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    {weddingInfo.brideName} & {weddingInfo.groomName}
                  </h1>
                  <p className="text-sm text-gray-600">Fotoğraf Paylaşımı</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{weddingInfo.weddingDate}</p>
              <p className="text-sm text-gray-500">{weddingInfo.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Hoş Geldiniz! 📸
          </h2>
          <p className="text-lg text-gray-600">
            Düğünden çektiğiniz güzel fotoğrafları buradan paylaşabilirsiniz.
            Yüklediğiniz fotoğraflar çiftimizin onayından sonra galeride görünecektir.
          </p>
        </div>

        {/* Uploader Name Input */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            İsminiz (İsteğe bağlı)
          </label>
          <input
            type="text"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            placeholder="Örn: Ahmet Yılmaz"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
          />
          <p className="text-sm text-gray-500 mt-2">
            İsminizi yazmak fotoğraflarınızın kim tarafından yüklendiğini gösterir
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div
            className="border-3 border-dashed border-pink-300 rounded-2xl p-12 text-center transition-all duration-300 hover:border-pink-400 hover:bg-pink-50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-pink-100 rounded-full">
                <Upload className="w-12 h-12 text-pink-500" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Fotoğraflarınızı Yükleyin
            </h3>
            
            <p className="text-gray-600 mb-8 text-lg">
              Fotoğrafları buraya sürükleyip bırakın veya seçmek için butona tıklayın
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-8 py-4 bg-pink-500 text-white rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <Image className="w-6 h-6" />
                {isUploading ? 'Yükleniyor...' : 'Fotoğraf Seç'}
              </button>
              
              <button
                onClick={openCamera}
                disabled={isUploading}
                className="px-8 py-4 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <Camera className="w-6 h-6" />
                Kamera Aç
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-green-800">Başarılı!</h3>
              <p className="text-green-700">
                Fotoğraflarınız başarıyla yüklendi. Çiftimizin onayından sonra galeride görünecektir.
              </p>
            </div>
          </div>
        )}

        {/* Uploaded Photos Preview */}
        {uploadedPhotos.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Yüklenen Fotoğraflar ({uploadedPhotos.length})
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700">
                <strong>Bilgi:</strong> Yüklediğiniz fotoğraflar çiftimizin onayından sonra herkese açık galeride görünecektir.
                Bu işlem genellikle birkaç saat sürer.
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">💡 İpuçları</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Users className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Birden Fazla Fotoğraf</h4>
                <p className="text-pink-100">Aynı anda birden fazla fotoğraf seçebilir ve yükleyebilirsiniz.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Share2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Bu Linki Paylaş</h4>
                <p className="text-pink-100">Bu sayfanın linkini diğer misafirlerle paylaşabilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickUploadPage;