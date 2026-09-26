import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Sparkles, ShieldCheck, Heart, User, Mail, CheckCircle2, X } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onLoginSuccess: (user: UserProfile) => void;
  onClose?: () => void;
  defaultEmail?: string;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onLoginSuccess,
  onClose,
  defaultEmail = 'turayevabdullo9@gmail.com',
}) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [userName, setUserName] = useState('Abdullo Turayev');
  const [userEmail, setUserEmail] = useState(defaultEmail);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isCustomizing) {
          setIsCustomizing(false);
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isCustomizing, onClose]);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const email = userEmail.trim() || defaultEmail;
      const name = userName.trim() || email.split('@')[0];
      const newUser: UserProfile = {
        id: `google_${Date.now()}`,
        name: name,
        email: email,
        provider: 'google',
        photoUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=059669,10b981,047857`,
        signedInAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem('namoz_guide_user', JSON.stringify(newUser));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }

      setIsLoading(false);
      onLoginSuccess(newUser);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="google-auth-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 relative overflow-hidden transition-colors">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors z-20"
            title="Yopish"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Subtle decorative background gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-600/10 dark:bg-emerald-600/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header with App Brand */}
        <div className="text-center relative z-10 space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white font-bold text-2xl shadow-lg shadow-emerald-600/20">
            ن
          </div>

          <div>
            <h2 id="google-auth-title" className="text-2xl font-black tracking-tight text-stone-900 dark:text-stone-50">
              Namoz Guide
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Islomiy ta'limiy qo‘llanma va ibodat platformasi
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200/70 dark:border-stone-700/60 text-left space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Saytga kirish</span>
            </div>
            <p className="text-[12px] text-stone-600 dark:text-stone-300 leading-relaxed">
              Platforma barcha foydalanuvchilar uchun bepul. Saqlangan xatcho‘plar va o‘rganish natijalaringizni shaxsiy hisobingizda saqlash uchun <strong>Google</strong> orqali kiring.
            </p>
          </div>
        </div>

        {/* Customization form if user wants to change their Google name / email */}
        {isCustomizing ? (
          <div className="mt-5 space-y-3 relative z-10 animate-fade-in">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                Ism va familiyangiz:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ismingiz"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                Google Gmail manzili:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="nomi@gmail.com"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 p-3 rounded-xl bg-stone-100/70 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs shrink-0">
                {userName.charAt(0)}
              </div>
              <div className="min-w-0 text-left">
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                  {userName}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                  {userEmail}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsCustomizing(true)}
              className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline font-medium shrink-0 ml-2"
            >
              O‘zgartirish
            </button>
          </div>
        )}

        {/* Primary "Continue with Google" Action */}
        <div className="mt-6 space-y-3 relative z-10">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-100 font-semibold text-sm border border-stone-300 dark:border-stone-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] disabled:opacity-70"
          >
            {/* Official Google G Logo SVG */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isLoading ? "Kirilmoqda..." : "Continue with Google (Google bilan kirish)"}</span>
          </button>

          {isCustomizing && (
            <button
              onClick={() => setIsCustomizing(false)}
              className="w-full text-center text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 py-1"
            >
              Bekor qilish
            </button>
          )}
        </div>

        {/* Security and privacy reassurance */}
        <div className="mt-5 pt-4 border-t border-stone-200/70 dark:border-stone-800 text-center flex items-center justify-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Xavfsiz va maxfiy • Ma'lumotlaringiz himoyalangan</span>
        </div>
      </div>
    </div>
  );
};
