import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import QuizComingSoon from './QuizComingSoon';

export default function QuizCTA({ isDark }) {
  const { lang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-12 mt-6">
       
       <QuizComingSoon 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         isDark={isDark} 
       />

       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5 }}
         className={`relative overflow-hidden rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 shadow-sm hover:shadow-md
            ${isDark ? 'bg-gradient-to-r from-[#18181b] to-[#1f1f22] border-[#27272a]' : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'}`}
       >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>

          <div className="flex items-center gap-4 md:gap-5 z-10 w-full md:w-auto">
             <div className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-colors duration-300
                ${isDark ? 'bg-[#27272a] text-white border border-[#3f3f46]' : 'bg-white text-gray-900 border border-gray-100'}`}>
                <img 
                src="/ghost.png" 
                alt="Profile" 
                className="w-12 h-12"
            />
             </div>
             <div className="flex flex-col">
                <h3 className={`text-lg md:text-2xl font-bold mb-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                   {lang === 'en' ? 'Fun IT Quiz!' : 'Quiz IT Seru!'}
                </h3>
                <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 ${isDark ? 'text-[#a1a1aa]' : 'text-gray-600'}`}>
                   {lang === 'en' 
                      ? 'Test your knowledge in web development and technology.' 
                      : 'Uji pengetahuan kamu seputar web development dan teknologi.'}
                </p>
             </div>
          </div>

          <button 
             onClick={() => setIsModalOpen(true)}
             className={`relative z-10 w-full md:w-auto whitespace-nowrap px-5 py-1 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2
             ${isDark 
                ? 'bg-green-500 text-white hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                : 'bg-green-600 text-white hover:bg-green-500 shadow-[0_0_15px_rgba(22,163,74,0.2)]'}`}
          >
             {lang === 'en' ? 'Play Now' : 'Mainkan Sekarang'}
             <img 
                src="/go.png" 
                alt="Profile" 
                className="w-10 h-10"
            />
             {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> */}
          </button>
       </motion.div>
    </div>
  );
}