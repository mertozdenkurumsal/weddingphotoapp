// components/modals/PhotoModal.js
import React from 'react';
import { X, Heart, Download } from 'lucide-react';

const PhotoModal = ({ photo, onClose, isLoggedIn, toggleLike, approvePhoto }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{photo.title}</h3>
            <p className="text-gray-600">{photo.uploader} tarafından • {photo.date}</p>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn && !photo.isApproved && (
              <button
                onClick={() => {
                  approvePhoto(photo.id);
                  onClose();
                }}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
              >
                Onayla
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <img src={photo.url} alt={photo.title} className="w-full max-h-96 object-contain rounded-lg" />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleLike(photo.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  photo.isLiked ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${photo.isLiked ? 'fill-current' : ''}`} />
                <span>{photo.likes}</span>
              </button>
              {!photo.isApproved && (
                <div className="px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">Onay Bekliyor</div>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;