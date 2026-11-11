import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import { useApi } from '../../hooks/useApi';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';

export default function Guestbook({ title, isDark }) {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [hiddenReplies, setHiddenReplies] = useState({});
  const containerRef = useRef(null);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('guestbook_user');
    return saved ? JSON.parse(saved) : null;
  });

  const fetchMessages = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      const response = await fetch(`${API_URL}/guestbook`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    
    // Auto-refresh (polling) setiap 5 detik agar realtime tanpa memuat ulang halaman
    const interval = setInterval(() => {
      fetchMessages(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [messages, loading]);

  const handleLogin = useGoogleLogin({
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
        setUser(userData);
        localStorage.setItem('guestbook_user', JSON.stringify(userData));
        toast.success(lang === 'id' ? 'Login berhasil!' : 'Login successful!');
      } catch (err) {
        toast.error('Gagal mengambil data profil Google');
      }
    },
    onError: error => toast.error('Google Login Gagal'),
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('guestbook_user');
    toast.success(lang === 'id' ? 'Keluar berhasil!' : 'Logged out!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    // --- OPTIMISTIC UI UPDATE ---
    // Tampilkan pesan di layar secara instan sebelum dikirim ke server
    const tempId = Date.now();
    const optimisticMsg = {
      id: tempId,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      message: newMessage,
      created_at: new Date().toISOString(),
      reactions: {},
      replies: []
    };
    
    if (replyingTo) {
      setMessages(prev => prev.map(msg => 
        msg.id === replyingTo.id 
          ? { ...msg, replies: [...(msg.replies || []), optimisticMsg] } 
          : msg
      ));
    } else {
      setMessages(prev => [...prev, optimisticMsg]);
    }
    
    const messageToSend = newMessage;
    const parentIdToSend = replyingTo ? replyingTo.id : null;
    setNewMessage(''); // Kosongkan form seketika
    setReplyingTo(null); // Reset balas
    // ----------------------------

    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      const response = await fetch(`${API_URL}/guestbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          message: messageToSend,
          parent_id: parentIdToSend,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (parentIdToSend) {
          setMessages(prev => prev.map(msg => {
            if (msg.id === parentIdToSend) {
              return {
                ...msg,
                replies: msg.replies.map(r => r.id === tempId ? data : r)
              };
            }
            return msg;
          }));
        } else {
          setMessages(prev => prev.map(msg => msg.id === tempId ? data : msg));
        }
      } else {
        // Jika gagal, hapus pesan sementara
        if (parentIdToSend) {
          setMessages(prev => prev.map(msg => {
            if (msg.id === parentIdToSend) {
              return { ...msg, replies: msg.replies.filter(r => r.id !== tempId) };
            }
            return msg;
          }));
        } else {
          setMessages(prev => prev.filter(msg => msg.id !== tempId));
        }
        setNewMessage(messageToSend); // Kembalikan teks ke form
        toast.error('Gagal mengirim pesan');
      }
    } catch (error) {
      console.error('Failed to post message', error);
      if (parentIdToSend) {
        setMessages(prev => prev.map(msg => {
          if (msg.id === parentIdToSend) {
            return { ...msg, replies: msg.replies.filter(r => r.id !== tempId) };
          }
          return msg;
        }));
      } else {
        setMessages(prev => prev.filter(msg => msg.id !== tempId));
      }
      setNewMessage(messageToSend);
      toast.error('Terjadi kesalahan jaringan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [activeReactId, setActiveReactId] = useState(null);
  const emojis = ['❤️', '👍', '😂', '👏', '🔥'];

  const handleReact = async (msgId, emoji) => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }
    
    // Optimistic update
    const previousMessages = [...messages];
    
    // Fungsi rekursif untuk update reaction
    const updateReaction = (msgs) => msgs.map(msg => {
      if (msg.id === msgId) {
        const reactions = msg.reactions || {};
        const email = user.email;
        const newReactions = { ...reactions };
        if (!newReactions[emoji]) newReactions[emoji] = [];
        
        const userIndex = newReactions[emoji].indexOf(email);
        if (userIndex > -1) {
          newReactions[emoji].splice(userIndex, 1);
          if (newReactions[emoji].length === 0) delete newReactions[emoji];
        } else {
          newReactions[emoji].push(email);
        }
        return { ...msg, reactions: newReactions };
      }
      if (msg.replies) {
        return { ...msg, replies: updateReaction(msg.replies) };
      }
      return msg;
    });

    setMessages(updateReaction(messages));
    setActiveReactId(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      const response = await fetch(`${API_URL}/guestbook/${msgId}/react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          emoji,
          email: user.email,
        }),
      });
      if (!response.ok) throw new Error('Failed');
      const updatedMsg = await response.json();
      
      const applyUpdate = (msgs) => msgs.map(m => {
        if (m.id === msgId) return updatedMsg;
        if (m.replies) return { ...m, replies: applyUpdate(m.replies) };
        return m;
      });
      setMessages(msgs => applyUpdate(msgs));
    } catch (error) {
      setMessages(previousMessages);
      toast.error('Gagal memberikan reaksi');
    }
  };

  const renderMessage = (msg, isReply = false) => (
    <div key={msg.id} className={`flex gap-3 sm:gap-4 group ${isReply ? 'mt-4' : ''}`}>
      <img
        src={msg.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.name)}`}
        alt={msg.name}
        referrerPolicy="no-referrer"
        className={`${isReply ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex-shrink-0 object-cover bg-gray-800`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm truncate">{msg.name}</span>
          <span className={`text-xs whitespace-nowrap ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {new Date(msg.created_at).toLocaleString('id-ID', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </span>
        </div>
        <div className={`inline-block px-4 py-2 rounded-2xl rounded-tl-sm text-sm break-words max-w-full ${isDark ? 'bg-[#1c1c1c] text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
          {msg.message}
        </div>
        
        {/* Reactions & Actions */}
        <div className="mt-2 flex flex-wrap items-center gap-2 relative">
          {msg.reactions && Object.entries(msg.reactions).map(([emoji, users]) => (
            <button 
              key={emoji}
              onClick={(e) => { e.stopPropagation(); handleReact(msg.id, emoji); }}
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
              onClick={(e) => { e.stopPropagation(); setActiveReactId(activeReactId === msg.id ? null : msg.id); }}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors ${
                isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400 hover:text-white' : 'border-gray-300 hover:bg-gray-100 text-gray-500 hover:text-black'
              }`}
            >
              +
            </button>
            
            {activeReactId === msg.id && (
              <div className={`absolute bottom-full mb-2 left-0 sm:left-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:left-8 z-50 flex gap-1 p-2 rounded-full shadow-lg border animate-fade-in-up ${
                isDark ? 'bg-[#27272a] border-gray-700' : 'bg-white border-gray-200'
              }`} onClick={e => e.stopPropagation()}>
                {emojis.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleReact(msg.id, emoji)}
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

          {!isReply && user && (
            <button 
              onClick={() => {
                setReplyingTo(msg);
                document.getElementById('message-input')?.focus();
              }}
              className={`text-xs font-medium ml-2 hover:underline transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
            >
              Balas
            </button>
          )}
        </div>

        {/* Nested Replies */}
        {msg.replies && msg.replies.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setHiddenReplies(prev => ({ ...prev, [msg.id]: !prev[msg.id] }))}
              className={`text-xs font-medium flex items-center gap-1 hover:underline transition-colors ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
              }`}
            >
              <svg className={`w-3 h-3 transform transition-transform ${hiddenReplies[msg.id] ? '-rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              {hiddenReplies[msg.id] 
                ? (lang === 'id' ? `Tampilkan ${msg.replies.length} balasan` : `Show ${msg.replies.length} replies`) 
                : (lang === 'id' ? 'Sembunyikan balasan' : 'Hide replies')}
            </button>
            {!hiddenReplies[msg.id] && (
              <div className={`mt-3 border-l-2 pl-4 sm:pl-6 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                {msg.replies.map(reply => renderMessage(reply, true))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`mb-10 w-full animate-fade-in-up transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <Helmet>
        <title>{title} | Sahrul Maulidi</title>
      </Helmet>

      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{lang === 'id' ? 'Ruang Diskusi' : 'Guestbook'}</h2>
        <p className={`text-base md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {lang === 'id'
            ? 'Jangan ragu untuk berbagi pemikiran, saran, pertanyaan, atau apa pun!'
            : 'Feel free to share your thoughts, suggestions, questions, or anything!'}
        </p>
      </div>

      <div className={`w-full border-t border-b py-8 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        
        {/* Messages List */}
        <div 
          ref={containerRef}
          className="space-y-6 mb-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar" 
          onClick={() => setActiveReactId(null)}
        >
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {lang === 'id' ? 'Belum ada pesan. Jadilah yang pertama!' : 'No messages yet. Be the first!'}
            </div>
          ) : (
            messages.map((msg) => renderMessage(msg))
          )}
        </div>

        {/* Input Area */}
        <div className={`pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          {!user ? (
            <div className="flex flex-col items-center justify-center py-6 gap-4">
              <p className="text-sm text-center">
                {lang === 'id' ? 'Silakan masuk dengan akun Google untuk meninggalkan pesan.' : 'Please log in with your Google account to leave a message.'}
              </p>
              <button
                type="button"
                onClick={() => handleLogin()}
                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span>Profile emoji:</span>
                <button type="button" className={`w-6 h-6 rounded-full flex items-center justify-center text-xs bg-gray-800 text-white hover:bg-gray-700`}>
                  +
                </button>
              </div>
              {replyingTo && (
                <div className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg text-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                  <span className="truncate flex-1">
                    Membalas <strong>{replyingTo.name}</strong>: "{replyingTo.message}"
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setReplyingTo(null)}
                    className="ml-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-400/20"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  id="message-input"
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={lang === 'id' ? 'Ketik pesan Anda...' : 'Type your message...'}
                  className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 transition-colors ${isDark
                      ? 'bg-[#0c0c0c] border-gray-700 focus:border-gray-500 focus:ring-gray-500'
                      : 'bg-white border-gray-300 focus:border-gray-400 focus:ring-gray-400'
                    }`}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newMessage.trim()}
                  className={`px-4 py-3 rounded-xl transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Masuk sebagai {user.name} ({user.email})
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Keluar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
