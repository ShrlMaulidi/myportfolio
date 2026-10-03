import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi';

export default function Achievements({ isDark }) {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  const { data: achievementsData } = useApi('achievements');

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const filteredData = achievementsData.filter(item => {
    const title = lang === 'en' && item.titleEn ? item.titleEn : item.title;
    return title.toLowerCase().includes(search.toLowerCase()) || 
           item.issuer.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="mb-10 animate-fade-in-up transition-colors duration-300 ease-in-out">
        <Helmet>
            <title>{lang === 'en' ? 'Achievements | Sahrul Maulidi' : 'Pencapaian | Sahrul Maulidi'}</title>
            <meta name="description" content={lang === 'en' ? 'Certifications and achievements of Sahrul Maulidi.' : 'Sertifikasi dan pencapaian Sahrul Maulidi.'} />
        </Helmet>
        
        <div className="mb-8">
             <h1 className={`text-3xl md:text-4xl font-bold mb-3 tracking-tight transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                {lang === 'en' ? 'Achievements' : 'Pencapaian'}
            </h1>
            <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ease-in-out ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                {lang === 'en' 
                    ? 'A collection of certificates and badges I have earned throughout my professional and academic journey.' 
                    : 'Kumpulan sertifikat dan badge yang saya peroleh sepanjang perjalanan profesional dan akademik.'}
            </p>
        </div>
        <div className={`h-px w-full my-8 border-dashed border-b transition-colors duration-300 ease-in-out ${isDark ? 'border-[#27272a]' : 'border-gray-300'}`}></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                    type="text"
                    placeholder={lang === 'en' ? 'Search...' : 'Cari...'}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-1 focus:ring-green-500 transition-colors duration-300
                    ${isDark 
                        ? 'bg-[#18181b] border-[#27272a] text-white placeholder-gray-600 focus:border-green-500' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-green-500'}`}
                />
            </div>

            <div className="relative w-full md:w-auto">
                <button className={`flex items-center justify-between w-full md:w-64 px-4 py-2.5 rounded-lg border text-sm transition-colors duration-300
                    ${isDark 
                        ? 'bg-[#18181b] border-[#27272a] text-gray-300 hover:bg-[#27272a]' 
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                    <span>{lang === 'en' ? 'Filter achievements...' : 'Filter pencapaian...'}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                </button>
            </div>
        </div>

        <div className={`text-sm mb-8 font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Total: {filteredData.length}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
                <div 
                    key={item.id} 
                    onClick={() => setSelectedCert(item)}
                    className={`group flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer
                    ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-gray-200 shadow-sm'}`}
                >
                    <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                        <img 
                            src={item.image} 
                            alt={lang === 'en' && item.titleEn ? item.titleEn : item.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                        <h3 className={`text-lg font-bold mb-2 line-clamp-2 leading-snug transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'en' && item.titleEn ? item.titleEn : item.title}
                        </h3>
                        
                        <div className="mt-auto pt-4 space-y-1">
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.issuer}
                            </p>
                            
                            <div className="flex flex-col text-xs space-y-0.5">
                                <span className={`${isDark ? 'text-[#52525b]' : 'text-gray-400'}`}>
                                    {lang === 'en' ? 'Issued on' : 'Diterbitkan pada'}
                                </span>
                                <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {lang === 'en' && item.dateEn ? item.dateEn : item.date}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <AnimatePresence>
            {selectedCert && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedCert(null)}
                >
                    <motion.div 
                        className={`relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row ${isDark ? 'bg-[#18181b]' : 'bg-white'}`}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <button 
                            onClick={() => setSelectedCert(null)}
                            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${isDark ? 'bg-black/50 text-white hover:bg-black/70' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="w-full md:w-2/3 bg-gray-100 flex items-center justify-center p-4 md:p-8">
                            <motion.img 
                                layoutId={`img-${selectedCert.id}`} 
                                src={selectedCert.image} 
                                alt={lang === 'en' && selectedCert.titleEn ? selectedCert.titleEn : selectedCert.title} 
                                className="max-w-full max-h-[60vh] object-contain shadow-lg rounded"
                            />
                        </div>

                        <div className={`w-full md:w-1/3 p-6 md:p-8 flex flex-col ${isDark ? 'bg-[#121212] text-white' : 'bg-white text-gray-900'}`}>
                            <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                                {lang === 'en' && selectedCert.titleEn ? selectedCert.titleEn : selectedCert.title}
                            </h3>
                            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {selectedCert.issuer}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {lang === 'en' ? 'CREDENTIAL ID' : 'ID KREDENSIAL'}
                                    </p>
                                    <p className="text-sm font-medium">{selectedCert.credentialId || '-'}</p>
                                </div>
                                
                                <div>
                                    <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {lang === 'en' ? 'TYPE' : 'TIPE'}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {lang === 'en' ? 'Certificate / Course' : 'Sertifikat / Kursus'}
                                    </p>
                                </div>

                                <div>
                                    <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {lang === 'en' ? 'ISSUE DATE' : 'TANGGAL TERBIT'}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {lang === 'en' && selectedCert.dateEn ? selectedCert.dateEn : selectedCert.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    </div>
  );
}