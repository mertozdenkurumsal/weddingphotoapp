import React, { memo } from 'react';
import { X, Eye, EyeOff, Mail, Lock, Crown } from 'lucide-react';

export const LoginModal = memo(({ 
  show, 
  onClose, 
  loginForm, 
  updateLoginForm, 
  handleLogin, 
  showPassword, 
  setShowPassword,
  openRegisterModal 
}) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Crown className="w-5 h-5 text-pink-500" />
              Düğün Sahibi Girişi
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" type="button">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <form onSubmit={handleLogin} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => updateLoginForm('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                  autoComplete="username"
                  name="email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => updateLoginForm('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              İptal
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
              Giriş Yap
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Demo için herhangi bir e-posta ve şifre girebilirsiniz</p>
            <p className="text-sm text-gray-600 mt-2">
              Hesabınız yok mu?{' '}
              <button type="button" onClick={openRegisterModal} className="text-pink-600 hover:text-pink-700 font-medium">
                Kayıt Olun
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
});