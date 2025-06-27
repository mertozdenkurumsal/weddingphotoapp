// components/DashboardPage.js
import React from 'react';
import { Crown, Calendar, MapPin, Image, Camera, Filter, Heart, Plus, QrCode, Download, Share2, Printer } from 'lucide-react';

const DashboardPage = ({
  photos,
  weddingInfo,
  currentUser,
  setShowUploadModal,
  setSelectedPhoto,
  approvePhoto,
  deletePhoto,
  weddingSlug
}) => {
  const pendingPhotos = photos.filter(p => !p.isApproved);
  const approvedPhotos = photos.filter(p => p.isApproved);
  const totalLikes = photos.reduce((acc, photo) => acc + photo.likes, 0);

  // QR kod URL'si - fotoğraf yükleme sayfasına direkt gider
  const qrUrl = `${window.location.origin}/${weddingSlug}/upload`;
  
  // Gerçek QR kod oluştur
  const generateQRCode = (text, size = 200) => {
    // QR kod API'si kullanarak gerçek QR kod oluştur
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=png&margin=10`;
  };

  const downloadQR = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 500;
      
      // Beyaz arka plan
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Başlık
      ctx.fillStyle = '#ec4899';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${weddingInfo.brideName} & ${weddingInfo.groomName}`, 200, 30);
      
      // QR kodu çiz
      const qrImage = new Image();
      qrImage.crossOrigin = "anonymous";
      qrImage.onload = () => {
        ctx.drawImage(qrImage, 100, 50, 200, 200);
        
        // Alt metin
        ctx.fillStyle = '#6b7280';
        ctx.font = '16px Arial';
        ctx.fillText('Fotoğraflarınızı paylaşın!', 200, 280);
        ctx.fillText('QR kodu taratın ve anılarınızı yükleyin', 200, 300);
        
        // Tarih ve yer
        ctx.font = '14px Arial';
        ctx.fillText(weddingInfo.weddingDate, 200, 330);
        ctx.fillText(weddingInfo.location, 200, 350);
        
        // URL
        ctx.font = '12px Arial';
        ctx.fillText(qrUrl, 200, 380);
        
        // İndir
        const link = document.createElement('a');
        link.download = `${weddingSlug}-qr-kod.png`;
        link.href = canvas.toDataURL();
        link.click();
      };
      qrImage.src = generateQRCode(qrUrl, 200);
    };
    
    img.src = generateQRCode(qrUrl, 200);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${weddingInfo.brideName} & ${weddingInfo.groomName} Düğün Fotoğrafları`,
          text: 'QR kodu taratarak düğün fotoğraflarınızı paylaşabilirsiniz!',
          url: qrUrl
        });
      } catch (err) {
        console.log('Share failed:', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrUrl).then(() => {
      alert('Link kopyalandı!');
    });
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${weddingInfo.brideName} & ${weddingInfo.groomName} - QR Kod</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              margin: 40px;
              background: white;
            }
            .qr-container {
              border: 2px solid #ec4899;
              border-radius: 20px;
              padding: 30px;
              max-width: 400px;
              margin: 0 auto;
              background: white;
            }
            .title {
              color: #ec4899;
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .qr-image {
              margin: 20px 0;
            }
            .description {
              color: #6b7280;
              font-size: 16px;
              margin: 15px 0;
            }
            .wedding-details {
              color: #374151;
              font-size: 14px;
              margin: 10px 0;
            }
            .url {
              color: #6b7280;
              font-size: 12px;
              word-break: break-all;
              margin-top: 20px;
            }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div class="title">${weddingInfo.brideName} & ${weddingInfo.groomName}</div>
            <div class="qr-image">
              <img src="${generateQRCode(qrUrl, 200)}" alt="QR Kod" />
            </div>
            <div class="description">
              <strong>Fotoğraflarınızı Paylaşın!</strong><br>
              QR kodu taratın ve düğün anılarınızı yükleyin
            </div>
            <div class="wedding-details">
              <div>${weddingInfo.weddingDate}</div>
              <div>${weddingInfo.location}</div>
            </div>
            <div class="url">${qrUrl}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-pink-100 rounded-full">
              <Crown className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Düğün Yönetim Paneli</h1>
              <p className="text-gray-600">Hoş geldiniz, {currentUser.name}</p>
            </div>
          </div>
          
          {/* Wedding Info Card */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{weddingInfo.brideName} & {weddingInfo.groomName}</h2>
                <div className="flex flex-wrap gap-4 text-pink-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{weddingInfo.weddingDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{weddingInfo.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-pink-100 mb-1">Düğün Kodu</p>
                <p className="text-lg font-mono font-semibold bg-white/20 px-3 py-1 rounded">
                  {weddingInfo.weddingCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Toplam Fotoğraf</p>
                <p className="text-2xl font-bold text-gray-800">{photos.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Image className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Onaylı Fotoğraf</p>
                <p className="text-2xl font-bold text-green-600">{approvedPhotos.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Camera className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Onay Bekleyen</p>
                <p className="text-2xl font-bold text-orange-600">{pendingPhotos.length}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Filter className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Toplam Beğeni</p>
                <p className="text-2xl font-bold text-pink-600">{totalLikes}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-full">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Section - Inline Component */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <QrCode className="w-8 h-8 text-pink-500" />
                <h2 className="text-2xl font-bold text-gray-800">QR Kod</h2>
              </div>
              <p className="text-gray-600">
                Misafirleriniz bu QR kodu taratarak kolayca fotoğraf yükleyebilir
              </p>
            </div>

            {/* QR Kod Gösterimi */}
            <div className="flex justify-center mb-8">
              <div className="bg-white p-6 rounded-2xl border-4 border-pink-100 shadow-inner">
                <img
                  src={generateQRCode(qrUrl, 200)}
                  alt="Düğün QR Kodu"
                  className="w-48 h-48"
                />
                <div className="text-center mt-4">
                  <p className="text-sm font-semibold text-gray-800">
                    {weddingInfo.brideName} & {weddingInfo.groomName}
                  </p>
                  <p className="text-xs text-gray-600">{weddingInfo.weddingDate}</p>
                </div>
              </div>
            </div>

            {/* URL Gösterimi */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Fotoğraf Yükleme Linki:</p>
              <code className="text-sm text-pink-600 bg-white px-3 py-2 rounded border block break-all">
                {qrUrl}
              </code>
            </div>

            {/* Aksiyon Butonları */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={downloadQR}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">İndir</span>
              </button>
              
              <button
                onClick={shareQR}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Paylaş</span>
              </button>
              
              <button
                onClick={printQR}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm">Yazdır</span>
              </button>
              
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span className="text-sm">Link</span>
              </button>
            </div>

            {/* Kullanım Talimatları */}
            <div className="mt-8 p-6 bg-pink-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3">Nasıl Kullanılır?</h3>
              <ol className="text-sm text-gray-700 space-y-2">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>QR kodu yazdırın veya dijital olarak masalarda gösterin</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Misafirleriniz telefon kamerasıyla QR kodu taratsın</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Otomatik olarak fotoğraf yükleme sayfasına yönlendirilecekler</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        {pendingPhotos.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-500" />
                Onay Bekleyen Fotoğraflar ({pendingPhotos.length})
              </h3>
              <p className="text-gray-600 mt-1">Bu fotoğraflar misafirler tarafından gönderildi ve onayınızı bekliyor</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingPhotos.map(photo => (
                  <div key={photo.id} className="border rounded-lg overflow-hidden">
                    <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-1">{photo.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{photo.uploader} tarafından • {photo.date}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approvePhoto(photo.id)}
                          className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                        >
                          Onayla
                        </button>
                        <button
                          onClick={() => deletePhoto(photo.id)}
                          className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        >
                          Reddet
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Photos Management */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Tüm Fotoğraflar</h3>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Fotoğraf Ekle
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photos.map(photo => (
                <div key={photo.id} className="relative group">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      onClick={() => setSelectedPhoto(photo)}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {photo.isApproved ? (
                        <div className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Onaylı</div>
                      ) : (
                        <div className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">Bekliyor</div>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm rounded p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-semibold truncate">{photo.title}</p>
                      <p className="truncate">{photo.uploader} • {photo.likes} beğeni</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;