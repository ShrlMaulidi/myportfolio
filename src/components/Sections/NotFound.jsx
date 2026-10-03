import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function NotFound({ isDark }) {
  const { lang } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in-up transition-colors duration-300 ease-in-out">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-7xl md:text-9xl font-black mb-4 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
          404
        </h1>
        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {lang === 'en' ? 'Page Not Found' : 'Halaman Tidak Ditemukan'}
        </h2>
        <p className={`text-base md:text-lg mb-8 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {lang === 'en' 
            ? "Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
            : "Oops! Halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau sementara tidak tersedia."}
        </p>
        <Link 
          to="/" 
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          {lang === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}
        </Link>
      </motion.div>
    </div>
  );
}
