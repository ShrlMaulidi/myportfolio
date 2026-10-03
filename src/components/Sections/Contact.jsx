import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser'; 
import toast from 'react-hot-toast';
import { useLanguage } from '../../context/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi';

const Icons = {
  Gmail: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  ),
  Instagram: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  ),
  LinkedIn: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  TikTok: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.36-4.04 1.86-6.15 1.25-2.11-.61-3.91-2.2-4.57-4.26-.66-2.06-.05-4.4 1.48-5.91 1.54-1.52 3.86-1.95 5.86-1.07V15c-1.04-.75-2.52-.86-3.66-.27-1.15.59-1.89 1.87-1.8 3.16.09 1.3.93 2.45 2.11 2.91 1.19.46 2.54.12 3.42-.85.88-.96 1.24-2.27 1.05-3.56V.02h1.08z" />
    </svg>
  ),
  GitHub: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
};

export default function Contact({ isDark }) {
  // Safelist for Tailwind JIT (API colors):
  // bg-gradient-to-br from-[#d94838] to-[#99251a]
  // bg-gradient-to-br from-[#8a3ab9] via-[#e95950] to-[#fccc63]
  // bg-gradient-to-br from-[#0077b5] to-[#004182]
  // bg-gradient-to-br from-[#1f1f1f] to-[#000000]
  // bg-gradient-to-br from-[#171515] to-[#0d1117]
  const { lang } = useLanguage();
  const { data: socialMediaData = [] } = useApi('social-media');
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = 'service_sv8kxhg'; 
    const TEMPLATE_ID = 'template_rhvri0j';
    const PUBLIC_KEY = 'qF4MYuOH79AbrVRir';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          toast.success(lang === 'en' ? 'Message sent successfully! Thank you.' : 'Pesan berhasil terkirim! Terima kasih.');
          setIsSending(false);
          e.target.reset();
      }, (error) => {
          console.log(error.text);
          toast.error(lang === 'en' ? 'Failed to send message. Please try again.' : 'Gagal mengirim pesan. Silakan coba lagi.');
          setIsSending(false);
      });
  };

  return (
    <div className="mb-10 animate-fade-in-up transition-colors duration-300 ease-in-out">
        <Helmet>
            <title>{lang === 'en' ? 'Contact | Sahrul Maulidi' : 'Kontak | Sahrul Maulidi'}</title>
            <meta name="description" content={lang === 'en' ? 'Get in touch with Sahrul Maulidi.' : 'Hubungi Sahrul Maulidi.'} />
        </Helmet>

        <div className="mb-8">
             <h1 className={`text-3xl md:text-4xl font-bold mb-2 tracking-tight transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                {lang === 'en' ? 'Contact' : 'Kontak'}
            </h1>
            <p className={`text-base md:text-lg transition-colors duration-300 ease-in-out ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                {lang === 'en' ? 'Let\'s connect' : 'Mari kita terhubung'}
            </p>
        </div>

        <div className={`h-px w-full my-8 border-dashed transition-colors duration-300 ease-in-out ${isDark ? 'bg-[#27272a]' : 'bg-gray-200'}`}></div>

        <div className="mb-6">
            <h2 className={`text-lg font-medium transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                {lang === 'en' ? 'Find me on social media' : 'Temukan saya di media sosial'}
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {socialMediaData.map((card, idx) => {
                const IconComponent = Icons[card.icon];

                return (
                    <div 
                        key={idx} 
                        className={`
                            relative overflow-hidden rounded-3xl p-6 md:p-8 flex flex-col justify-between group
                            ${card.span}
                            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                            ${isDark ? 'bg-[#18181b] border border-[#27272a]' : 'bg-white border border-gray-200'}
                        `}
                    >
                        {/* Background color layer */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${card.color}`}></div>

                        {IconComponent && (
                            <div className={`absolute -top-16 -left-16 z-0 pointer-events-none transform rotate-12 opacity-5 transition-colors duration-300 group-hover:text-white ${isDark ? 'text-white' : 'text-black'}`}>
                                <IconComponent className="w-96 h-96" />
                            </div>
                        )}

                        {card.icon === 'Instagram' && (
                          <img 
                            src="/kontak/back.png" 
                            alt="Background Pattern" 
                            className="absolute inset-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-40 mix-blend-overlay pointer-events-none transition-opacity duration-500"
                          />
                        )}

                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none z-0"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none z-0"></div>

                        <div className="relative z-10">
                            <h3 className={`text-xl md:text-2xl font-bold mb-2 tracking-tight transition-colors duration-300 group-hover:text-white ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                                {lang === 'en' && card.titleEn ? card.titleEn : card.title}
                            </h3>
                            <p className={`text-sm md:text-base font-medium mb-8 max-w-sm leading-relaxed transition-colors duration-300 group-hover:text-white/90 ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                                {lang === 'en' && card.descEn ? card.descEn : card.desc}
                            </p>
                            
                            <a 
                                href={card.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-flex px-5 py-2.5 rounded-lg text-sm font-bold items-center gap-2 transition-all duration-300 shadow-sm cursor-pointer
                                    ${isDark 
                                        ? 'bg-[#27272a] text-white hover:bg-[#3f3f46] group-hover:bg-white group-hover:text-black group-hover:hover:bg-gray-100' 
                                        : 'bg-black text-white hover:bg-gray-800 group-hover:bg-white group-hover:text-black group-hover:hover:bg-gray-100'}
                                `}
                            >
                                {lang === 'en' && card.btnTextEn ? card.btnTextEn : card.btnText}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </a>
                        </div>

                        <div className="absolute bottom-6 right-6 opacity-90 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg z-10">
                            <div className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/30 ${isDark ? 'bg-[#27272a] border-[#3f3f46]' : 'bg-gray-100 border-gray-200'}`}>
                                {IconComponent ? <IconComponent className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-300 group-hover:text-white ${isDark ? 'text-white' : 'text-black'}`} /> : null}
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>

        <div className={`h-px w-full my-10 border-dashed transition-colors duration-300 ease-in-out ${isDark ? 'bg-[#27272a]' : 'bg-gray-200'}`}></div>

        <div className="mb-6">
            <h2 className={`text-lg font-medium mb-6 transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                {lang === 'en' ? 'Or send me a message' : 'Atau kirim saya pesan'}
            </h2>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        name="user_name" 
                        placeholder={lang === 'en' ? 'Name' : 'Nama'} 
                        required
                        className={`w-full p-4 rounded-xl outline-none border transition-all duration-300
                        ${isDark 
                            ? 'bg-[#18181b] border-[#27272a] text-white placeholder-gray-500 focus:border-gray-500' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400'}`}
                    />
                    <input 
                        type="email" 
                        name="user_email" 
                        placeholder="Email" 
                        required
                        className={`w-full p-4 rounded-xl outline-none border transition-all duration-300
                        ${isDark 
                            ? 'bg-[#18181b] border-[#27272a] text-white placeholder-gray-500 focus:border-gray-500' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400'}`}
                    />
                </div>
                <textarea 
                    name="message" 
                    rows="4" 
                    placeholder={lang === 'en' ? 'Message' : 'Pesan'} 
                    required
                    className={`w-full p-4 rounded-xl outline-none border transition-all duration-300 resize-none
                    ${isDark 
                        ? 'bg-[#18181b] border-[#27272a] text-white placeholder-gray-500 focus:border-gray-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400'}`}
                ></textarea>

                <button 
                    type="submit" 
                    disabled={isSending}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex justify-center items-center gap-2
                    ${isDark 
                        ? 'bg-[#27272a] text-white hover:bg-[#3f3f46]' 
                        : 'bg-black text-white hover:bg-gray-800'}
                    ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isSending ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {lang === 'en' ? 'Sending...' : 'Mengirim...'}
                        </>
                    ) : (
                        lang === 'en' ? 'Send Email' : 'Kirim Email'
                    )}
                </button>
            </form>
        </div>

    </div>
  );
}