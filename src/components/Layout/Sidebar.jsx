import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useApi } from "../../hooks/useApi";

const navItems = [
  { path: "/", label: "Beranda", iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { path: "/about", label: "Tentang", iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { path: "/achievements", label: "Pencapaian", iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { path: "/projects", label: "Proyek", iconPath: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
  { path: "/dashboard", label: "Dasbor", iconPath: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { path: "/gallery", label: "Galleri", iconPath: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { path: "/guestbook", label: "Ruang Diskusi", iconPath: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" },
  { path: "/contact", label: "Kontak", iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default function Sidebar({ isDark, setIsDark, mobileMenuOpen, setMobileMenuOpen }) {
  const { lang, setLang } = useLanguage(); 
  const { data: profileData } = useApi('profiles', null);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [showLetter, setShowLetter] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenModal = () => {
    setShowLetter(true);
    setIsLetterOpen(false); 
    setIsOpening(false);
    setMobileMenuOpen(false); 
  };

  const handleOpenLetter = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsLetterOpen(true);
    }, 600); // Wait for flap animation
  };

  // Fungsi pembantu untuk menerjemahkan menu navigasi dengan aman
  const translateNav = (label) => {
    if (lang === 'id') return label;
    const dict = { 
        "Beranda": "Home", 
        "Tentang": "About", 
        "Pencapaian": "Achievements", 
        "Proyek": "Projects", 
        "Dasbor": "Dashboard", 
        "Galleri": "Gallery", 
        "Ruang Diskusi": "Guestbook",
        "Kontak": "Contact" 
    };
    return dict[label] || label;
  };
  
  return (
    <>
      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"></div>
      )}

      <AnimatePresence>
        {showLetter && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowLetter(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <AnimatePresence mode="wait">
              {!isLetterOpen ? (
                <motion.div
                  key="envelope"
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 50, transition: { duration: 0.3 } }}
                  onClick={!isOpening ? handleOpenLetter : undefined}
                  className={`relative z-10 ${!isOpening ? 'cursor-pointer group' : ''}`}
                  style={{ perspective: 1200 }}
                >
                  <div className={`w-72 h-48 md:w-80 md:h-52 rounded-lg shadow-2xl relative flex flex-col items-center justify-center border-2 transition-colors duration-300 ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-[#fef3c7] border-[#fde68a]'}`}>
                    
                    <motion.div 
                        className={`absolute top-0 left-0 w-0 h-0 border-l-[144px] md:border-l-[160px] border-r-[144px] md:border-r-[160px] border-t-[96px] md:border-t-[104px] border-transparent origin-top ${isDark ? 'border-t-zinc-600' : 'border-t-[#fbbf24]'}`}
                        initial={{ rotateX: 0, zIndex: 30 }}
                        animate={{ rotateX: isOpening ? 180 : 0, zIndex: isOpening ? 10 : 30 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ backfaceVisibility: "hidden" }}
                    />
                    
                    <div className={`absolute bottom-0 left-0 w-0 h-0 border-l-[144px] md:border-l-[160px] border-r-[144px] md:border-r-[160px] border-b-[96px] md:border-b-[104px] border-transparent z-20 ${isDark ? 'border-b-zinc-900' : 'border-b-[#f59e0b]'}`}></div>
                    
                    <motion.div 
                        className={`absolute inset-0 flex flex-col items-center justify-center z-40 transform transition-transform duration-300 ${!isOpening ? 'group-hover:scale-110' : ''}`}
                        animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.8 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                      <div className={`p-3 rounded-full mb-2 shadow-lg animate-pulse ${isDark ? 'bg-zinc-700 text-zinc-300' : 'bg-white text-amber-600'}`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <span className={`font-bold text-xs tracking-widest ${isDark ? 'text-zinc-300' : 'text-amber-800'}`}>
                          {lang === 'en' ? 'OPEN LETTER' : 'BUKA SURAT'}
                      </span>
                    </motion.div>

                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="letter"
                  initial={{ scale: 0.6, opacity: 0, y: 150 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50 }}
                  transition={{ type: "spring", damping: 22, stiffness: 130 }}
                  className={`relative z-10 w-full max-w-lg p-8 md:p-10 rounded-xl shadow-2xl overflow-hidden ${isDark ? 'bg-[#1c1c1e] text-gray-300 border border-[#27272a]' : 'bg-[#faf9f6] text-[#333] border border-[#e5e5e5]'}`}
                >
                  {/* Decorative Header Line */}
                  <div className={`absolute top-0 left-0 w-full h-1.5 ${isDark ? 'bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700' : 'bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300'}`}></div>

                  {/* Stamp / Decorative Icon */}
                  <div className={`absolute top-6 right-6 md:top-8 md:right-8 opacity-10 pointer-events-none ${isDark ? 'text-white' : 'text-amber-900'}`}>
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>

                  <button 
                    onClick={() => setShowLetter(false)} 
                    className={`absolute top-4 right-4 p-2 rounded-full z-50 transition-colors ${isDark ? 'bg-[#27272a]/80 hover:bg-[#3f3f46] text-gray-400 hover:text-white' : 'bg-gray-200/50 hover:bg-gray-300 text-gray-500 hover:text-black'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>

                  <div className="relative z-10">
                    <h3 className={`text-3xl font-serif italic font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-zinc-100' : 'text-[#1a1a1a]'}`}>
                        {lang === 'en' ? "Let's Connect" : "Mari Terhubung"}
                    </h3>

                    <div className={`space-y-4 text-sm md:text-base leading-relaxed mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-700'}`}>
                        <p>{lang === 'en' ? "Dear visitor," : "Halo kawan,"}</p>
                        <p>{lang === 'en' ? "Thank you for taking the time to explore my profile. I am constantly on the lookout for new discussions, collaborations, and partnership opportunities in technology and web development." : "Terima kasih telah meluangkan waktu menjelajahi profil saya. Saya selalu terbuka untuk diskusi, kolaborasi, maupun peluang kerja sama di bidang teknologi dan web development."}</p>
                        <p>{lang === 'en' ? "If you share similar interests or have a project in mind, let's have a chat. Click the button below to reach me directly." : "Jika Anda memiliki ketertarikan yang sama atau ide proyek yang ingin didiskusikan, mari mengobrol. Klik tombol di bawah untuk terhubung langsung."}</p>
                        
                        <div className="pt-6">
                            <p className="font-serif italic text-lg mb-1">{lang === 'en' ? "Warm regards," : "Salam hangat,"}</p>
                            <p className={`text-xl font-bold font-serif ${isDark ? 'text-zinc-200' : 'text-amber-800'}`}>Sahrul Maulidi</p>
                        </div>
                    </div>

                    <a 
                        href="https://wa.me/6285212867574?text=Halo%20Sahrul%2C%20saya%20melihat%20portfolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowLetter(false)}
                        className={`w-full py-4 font-bold text-sm rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md ${isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-green-400 border border-zinc-700' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        {lang === 'en' ? 'Send WhatsApp Message' : 'Kirim Pesan WhatsApp'}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      <aside className={`
            fixed inset-y-0 left-0 z-50 w-[280px] border-r flex flex-col overflow-hidden
            md:translate-x-0 md:static md:w-[280px] md:h-[calc(100vh-4rem)] md:sticky md:top-8 md:shadow-none md:border-none md:overflow-visible
            transition-all duration-300 ease-in-out
            ${isDark 
                ? 'bg-[#0c0c0c] border-[#27272a] text-[#a1a1aa]' 
                : 'bg-white border-gray-200 text-gray-600'}
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
          
          <button onClick={() => setMobileMenuOpen(false)} className={`absolute top-4 right-4 md:hidden z-50 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div className="p-6 md:p-0 md:pr-4 flex flex-col h-full">
              
              <div className="flex flex-col items-center text-center mt-2 mb-6">
                  <div className="relative w-28 h-28 mb-3"> 
                      <img src={profileData?.img || ''} alt="Profile" className={`rounded-full border-4 shadow-lg w-full h-full object-cover grayscale-[0.1] transition-all duration-300 ease-in-out ${isDark ? 'border-[#27272a]' : 'border-white shadow-gray-200'}`} />
                  </div>
                  
                  <div className="flex items-center gap-1.5 mb-1">
                      <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-gray-900'}`}>{profileData?.name || 'Loading...'}</h2>
                      <img className="w-5 h-5" src="/img/verified.png" alt="Verified" />
                  </div>
                  <p className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#71717a]' : 'text-gray-500'}`}>
                      {profileData?.username || ''}
                  </p>
              </div>

              <div className="flex justify-center gap-3 mb-6">
                  <div className={`p-1 rounded-full border flex items-center gap-1 transition-colors duration-300 ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-[#f4f4f5] border-transparent'}`}>
                      {/* Tombol Bendera US */}
                      <button 
                        onClick={() => setLang('en')} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 text-sm ${lang === 'en' ? 'bg-[#4ade80] text-white shadow-md' : 'opacity-40 hover:opacity-100'}`}
                      >
                          🇺🇸
                      </button>
                      {/* Tombol Bendera ID */}
                      <button 
                        onClick={() => setLang('id')} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 text-sm ${lang === 'id' ? 'bg-[#4ade80] text-white shadow-md' : 'opacity-40 hover:opacity-100'}`}
                      >
                          🇮🇩
                      </button>
                  </div>

                  <div className={`p-1 rounded-full border flex items-center gap-1 transition-colors duration-300 ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-[#f4f4f5] border-transparent'}`}>
                      <button onClick={() => setIsDark(false)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${!isDark ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707M12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                      </button>
                      <button onClick={() => setIsDark(true)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-[#27272a] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                      </button>
                  </div>
              </div>

              <div className={`h-px w-full mb-4 transition-colors duration-300 ${isDark ? 'bg-[#27272a]' : 'bg-gray-200'}`}></div>

              <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link 
                        to={item.path} 
                        key={item.path}
                        onClick={() => setMobileMenuOpen(false)} 
                        className={`group flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md
                        ${active 
                            ? (isDark ? 'bg-[#1f1f22] text-white' : 'bg-[#e4e4e7] text-gray-900 font-bold')
                            : (isDark ? 'text-[#a1a1aa] hover:text-white hover:bg-[#18181b]' : 'text-[#52525b] hover:text-gray-900 hover:bg-[#f4f4f5]')
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <svg className={`w-5 h-5 transition-transform duration-300 ease-in-out group-hover:-rotate-12 ${active ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-[#71717a] group-hover:text-white' : 'text-[#71717a] group-hover:text-gray-900')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.iconPath}></path></svg>
                            <span className="text-sm font-medium flex items-center gap-2">
                                {translateNav(item.label)}
                                {item.label === 'Ruang Diskusi' && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500 text-white animate-pulse shadow-sm">
                                        NEW
                                    </span>
                                )}
                            </span>
                        </div>
                        {active && (
                             <svg className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-[#52525b]' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        )}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-6">
                <button 
                  onClick={handleOpenModal}
                  className={`w-full py-3 border font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer
                      ${isDark 
                          ? 'border-[#4ade80] text-[#4ade80] bg-[#4ade80]/5 hover:bg-[#4ade80]/10' 
                          : 'border-[#16a34a] text-[#16a34a] bg-[#16a34a]/5 hover:bg-[#16a34a]/10'
                      }`}
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  {lang === 'en' ? "Let's Connect 😊" : "Ayo Terhubung 😊"}
                </button>
                <div className={`h-px w-full my-4 transition-colors duration-300 ${isDark ? 'bg-[#27272a]' : 'bg-gray-200'}`}></div>
                <div className="text-center">
                    <p className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${isDark ? 'text-[#52525b]' : 'text-[#71717a]'}`}>
                        {lang === 'en' ? 'COPYRIGHT' : 'HAK CIPTA'} © 2026
                    </p>
                    <p className={`text-[10px] mt-1 transition-colors duration-300 ${isDark ? 'text-[#71717a]' : 'text-[#a1a1aa]'}`}>
                        Sahrul Maulidi. {lang === 'en' ? 'All rights reserved.' : 'Seluruh hak dilindungi.'}
                    </p>
                </div>
              </div>

          </div>
      </aside>
    </>
  );
}