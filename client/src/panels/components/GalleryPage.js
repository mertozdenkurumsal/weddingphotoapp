// components/GalleryPage.js
import React from 'react';
import { Search, Grid, List, Plus, Heart } from 'lucide-react';

const GalleryPage = (props) => {
  // Props'ları güvenli şekilde destructure et
  const {
    filteredPhotos = [],
    viewMode = 'grid',
    setViewMode = () => {},
    searchTerm = '',
    setSearchTerm = () => {},
    setShowUploadModal = () => {},
    setSelectedPhoto = () => {},
    toggleLike = () => {}
  } = props;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Fotoğraf Galerisi</h1>
              <p className="text-gray-600">{filteredPhotos.length} fotoğraf bulundu</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Fotoğraf ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  autoComplete="off"
                />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Upload Button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-1" />
                Yükle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredPhotos.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Fotoğraf bulunamadı</h3>
            <p className="text-gray-500">
              Henüz fotoğraf yüklenmemiş veya arama kriterlerinize uygun sonuç bulunamadı.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                setSelectedPhoto={setSelectedPhoto}
                toggleLike={toggleLike}
              />
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredPhotos.map((photo) => (
              <PhotoListItem 
                key={photo.id} 
                photo={photo} 
                setSelectedPhoto={setSelectedPhoto}
                toggleLike={toggleLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Grid Card Component
const PhotoCard = ({ photo, setSelectedPhoto, toggleLike }) => (
  <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="relative">
      <img
        src={photo.url}
        alt={photo.title}
        className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
        onClick={() => setSelectedPhoto(photo)}
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(photo.id);
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            photo.isLiked ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-pink-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${photo.isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 mb-1">{photo.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{photo.uploader} tarafından</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{photo.date}</span>
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3" />
          <span>{photo.likes}</span>
        </div>
      </div>
    </div>
  </div>
);

// List Item Component
const PhotoListItem = ({ photo, setSelectedPhoto, toggleLike }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-shadow">
    <img
      src={photo.url}
      alt={photo.title}
      className="w-20 h-20 object-cover rounded-lg cursor-pointer"
      onClick={() => setSelectedPhoto(photo)}
    />
    <div className="flex-1">
      <h3 className="font-semibold text-gray-800 mb-1">{photo.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{photo.uploader} tarafından yüklendi</p>
      <p className="text-xs text-gray-500">{photo.date}</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <Heart className="w-4 h-4" />
        <span>{photo.likes}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(photo.id);
        }}
        className={`p-2 rounded-full transition-colors ${
          photo.isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
        }`}
      >
        <Heart className={`w-5 h-5 ${photo.isLiked ? 'fill-current' : ''}`} />
      </button>
    </div>
  </div>
);

export default GalleryPage;