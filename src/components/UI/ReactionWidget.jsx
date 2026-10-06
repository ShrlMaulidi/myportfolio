import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';

export default function ReactionWidget({ type, itemId, reactions, onReactUpdate, isDark }) {
  const { lang } = useLanguage();
  const [active, setActive] = useState(false);
  const emojis = ['❤️', '👍', '😂', '👏', '🔥'];

  const user = (() => {
    const saved = localStorage.getItem('guestbook_user');
    return saved ? JSON.parse(saved) : null;
  })();

  const doGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        const userData = {
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture,
        };
        localStorage.setItem('guestbook_user', JSON.stringify(userData));
        toast.success(lang === 'id' ? 'Login berhasil!' : 'Login successful!');
        // Refresh to show reactions for user
        window.location.reload(); 
      } catch (err) {
        toast.error('Gagal mengambil data profil Google');
      }
    },
    onError: () => toast.error('Google Login Gagal'),
  });

  const handleReact = async (emoji) => {
    if (!user) {
      toast.error(lang === 'id' ? 'Tolong login dulu untuk bereaksi' : 'Please login to react');
      doGoogleLogin();
      return;
    }
    
    // Optimistic
    const previousReactions = { ...reactions };
    const email = user.email;
    const newReactions = { ...(reactions || {}) };
    
    if (!newReactions[emoji]) newReactions[emoji] = [];
    const userIndex = newReactions[emoji].indexOf(email);
    if (userIndex > -1) {
      newReactions[emoji].splice(userIndex, 1);
      if (newReactions[emoji].length === 0) delete newReactions[emoji];
    } else {
      newReactions[emoji].push(email);
    }
    
    onReactUpdate(itemId, newReactions);
    setActive(false);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      const response = await fetch(`${API_URL}/${type}/${itemId}/react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ emoji, email: user.email }),
      });
      if (!response.ok) throw new Error('Failed');
      const updated = await response.json();
      onReactUpdate(itemId, updated.reactions);
    } catch (error) {
      onReactUpdate(itemId, previousReactions);
      toast.error('Gagal memberikan reaksi');
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-2 relative">
      {reactions && Object.entries(reactions).map(([emoji, users]) => (
        <button 
          key={emoji}
          onClick={(e) => { e.stopPropagation(); handleReact(emoji); }}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border transition-colors ${
            user && users.includes(user.email) 
              ? (isDark ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-green-100 border-green-300 text-green-700')
              : (isDark ? 'bg-[#1c1c1c] border-gray-700 hover:bg-gray-800 text-gray-300' : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-600')
          }`}
        >
          <span>{emoji}</span>
          <span>{users.length}</span>
        </button>
      ))}
      
      <div className="relative">
        <button 
          onClick={(e) => { e.stopPropagation(); setActive(!active); }}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-sm border transition-colors ${
            isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400 hover:text-white' : 'border-gray-300 hover:bg-gray-100 text-gray-500 hover:text-black'
          }`}
        >
          +
        </button>
        
        {active && (
          <div className={`absolute bottom-9 left-0 z-20 flex gap-1 p-2 rounded-full shadow-lg border animate-fade-in-up ${
            isDark ? 'bg-[#27272a] border-gray-700' : 'bg-white border-gray-200'
          }`} onClick={e => e.stopPropagation()}>
            {emojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => handleReact(emoji)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-lg hover:scale-110 transition-transform ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
