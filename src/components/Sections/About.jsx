import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { useApi } from "../../hooks/useApi";
import { renderParagraphs } from "../../utils/formatText";

const DEFAULT_ABOUT = {
  id: "Halo! Terima kasih telah mengunjungi situs pribadi saya. Saya **Sahrul Maulidi**, seorang mahasiswa Informatika di **Horizon University Indonesia**. Saya adalah seorang Web Developer dengan minat besar dalam membangun produk perangkat lunak yang berdampak. Stack teknologi saya meliputi teknologi frontend modern seperti **React.js, Tailwind CSS**, serta pengembangan backend menggunakan **Laravel (PHP)**.\n\nSaya menikmati menciptakan solusi yang ramah pengguna dan memiliki performa tinggi. Baik saat membangun antarmuka yang intuitif maupun merancang layanan backend, saya selalu berusaha membawa efisiensi dan kejelasan pada setiap lapisan aplikasi. Saya pembelajar cepat yang tumbuh dalam lingkungan dinamis dan senang menyelesaikan masalah kompleks secara kolaboratif.",
  en: "Hello! Thank you for visiting my personal website. I am **Sahrul Maulidi**, an Informatics student at **Horizon University Indonesia**. I am a Web Developer with a strong interest in building impactful software products. My tech stack includes modern frontend technologies such as **React.js, Tailwind CSS**, as well as backend development using **Laravel (PHP)**.\n\nI enjoy creating user-friendly and high-performance solutions. Whether building intuitive interfaces or designing backend services, I always strive to bring efficiency and clarity to every layer of the application. I am a fast learner who thrives in dynamic environments and enjoys solving complex problems collaboratively.",
};

function CareerCard({ job, isDark, lang }) {
  const [isOpen, setIsOpen] = useState(false);

  const displayType = lang === 'en' && job.typeEn ? job.typeEn : job.type;
  const displayResponsibilities = lang === 'en' && job.responsibilitiesEn ? job.responsibilitiesEn : job.responsibilities;

  return (
    <div className={`border rounded-2xl p-5 mb-4 transition-all duration-300 ease-in-out hover:border-opacity-80
        ${isDark ? 'border-[#27272a] bg-transparent hover:border-[#3f3f46]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
      
      <div className="flex gap-4 items-start">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${isDark ? 'bg-white' : 'bg-gray-50 border border-gray-100'}`}>
           {job.logo ? (
             <img src={job.logo} alt={job.company} className="w-full h-full object-contain" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
           ) : null}
           <span className="text-xs font-bold text-black hidden" style={{display: job.logo ? 'none' : 'block'}}>{job.company.charAt(0)}</span>
        </div>

        <div className="flex-1 min-w-0">
            <h3 className={`text-base md:text-lg font-bold leading-tight mb-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {job.role}
            </h3>

            <p className={`text-sm mb-2 transition-colors duration-300 ${isDark ? 'text-[#a1a1aa]' : 'text-gray-600'}`}>
              {job.company} • <span className={`${isDark ? 'text-[#71717a]' : 'text-gray-500'}`}>{job.location}</span>
            </p>

            <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm mb-4 transition-colors duration-300 ${isDark ? 'text-[#71717a]' : 'text-gray-500'}`}>
                <span>{job.period}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                <span>{job.duration}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                <span>{displayType}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                <span>{job.work_mode}</span>
            </div>

            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`group flex items-center gap-2 text-sm font-medium transition-colors duration-300
                ${isDark ? 'text-[#a1a1aa] hover:text-white' : 'text-gray-500 hover:text-black'}`}
            >
                {isOpen ? (
                    <svg className="w-4 h-4 transition-transform duration-300 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                ) : (
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                )}
                <span>
                    {isOpen 
                        ? (lang === 'en' ? 'Hide responsibilities' : 'Sembunyikan tanggung jawab') 
                        : (lang === 'en' ? 'Show responsibilities' : 'Tampilkan tanggung jawab')}
                </span>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <ul className={`list-disc pl-5 space-y-1.5 text-sm md:text-[15px] leading-relaxed transition-colors duration-300 ${isDark ? 'text-[#a1a1aa] marker:text-[#52525b]' : 'text-gray-600 marker:text-gray-400'}`}>
                        {displayResponsibilities.map((task, idx) => (
                            <li key={idx}>{task}</li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

export default function About({ isDark }) {
  const { lang } = useLanguage();
  const { data: profileData } = useApi('profiles', null);
  const { data: careerHistory = [] } = useApi('careers');
  const { data: educationData = [] } = useApi('education');

  const aboutText = lang === 'en'
    ? (profileData?.aboutEn || profileData?.about || DEFAULT_ABOUT.en)
    : (profileData?.about || DEFAULT_ABOUT.id);
  const aboutCaption = lang === 'en'
    ? (profileData?.about_captionEn || 'A brief introduction about who I am.')
    : (profileData?.about_caption || 'Perkenalan singkat tentang siapa saya.');

  return (
    <div className="animate-fade-in-up transition-colors duration-300 ease-in-out">
      <Helmet>
        <title>{lang === 'en' ? 'About | Sahrul Maulidi' : 'Tentang | Sahrul Maulidi'}</title>
        <meta name="description" content={lang === 'en' ? 'Learn more about Sahrul Maulidi, education, and career history.' : 'Pelajari lebih lanjut tentang Sahrul Maulidi, pendidikan, dan riwayat karier.'} />
      </Helmet>
    
      <div className="mb-6">
        <h1 className={`text-3xl md:text-4xl font-bold mb-3 tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
          {lang === 'en' ? 'About' : 'Tentang'}
        </h1>
        <p className={`text-base md:text-lg transition-colors duration-300 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
          {aboutCaption}
        </p>
      </div>

      <div className={`w-full border-t border-dashed my-8 transition-colors duration-300 ${isDark ? 'border-[#27272a]' : 'border-gray-300'}`}></div>
      
      <div className={`prose max-w-none text-base md:text-lg leading-relaxed space-y-6 transition-colors duration-300 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
        {renderParagraphs(aboutText, `font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`)}

        <div className="pt-6">
            <p className="mb-4">{lang === 'en' ? 'Warm regards,' : 'Salam hangat,'}</p>
            <span className={`text-4xl font-bold font-cursive text-green-500`} style={{ fontFamily: '"Brush Script MT", cursive' }}>
                Sahrul
            </span>
        </div>
      </div>

      <div className={`w-full h-px my-12 transition-colors duration-300 ${isDark ? 'bg-[#27272a]' : 'bg-gray-200'}`}></div>

      <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <svg className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <div className="flex flex-col">
                <h2 className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                    {lang === 'en' ? 'Career' : 'Karier'}
                </h2>
                <p className={`text-sm md:text-base mt-1 transition-colors duration-300 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                    {lang === 'en' ? 'My professional journey.' : 'Perjalanan profesional saya.'}
                </p>
            </div>
          </div>

          <div className="flex flex-col">
            {careerHistory.map((job) => (
                <CareerCard key={job.id} job={job} isDark={isDark} lang={lang} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mb-0 mt-5">
            <button className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border font-medium text-sm transition-all duration-300 hover:-translate-y-0.5
                ${isDark 
                    ? 'border-[#27272a] text-gray-300 hover:bg-[#27272a] hover:text-white' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                {lang === 'en' ? 'Download Portfolio' : 'Unduh Portofolio'}
            </button>

            <a 
                href={profileData?.cv_file ? `${(import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/api\/?$/, '/storage')}/${profileData.cv_file}` : "/CV/CV.pdf"} 
                download
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-md ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#18181b] text-white hover:bg-black'}`}
            >
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                {lang === 'en' ? 'Download CV' : 'Unduh CV'}
            </a>
      </div>
      </div>

      <div className={`w-full border-t border-dashed my-12 transition-colors duration-300 ${isDark ? 'border-[#27272a]' : 'border-gray-300'}`}></div>

      <div>
            <h2 className={`text-xl font-bold mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                 <span className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                </span>
                {lang === 'en' ? 'Education' : 'Pendidikan'}
            </h2>

            <div className="grid grid-cols-1 gap-4">
                {educationData.map((edu) => (
                    <div key={edu.id} className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex items-start gap-5
                        ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-gray-200'}`}>
                        
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center p-2 shrink-0 ${isDark ? 'bg-white' : 'bg-gray-50 border'}`}>
                            {edu.logo ? (
                                <img src={edu.logo} alt={edu.school} className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-2xl">🎓</span>
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {edu.school}
                            </h3>
                            <p className={`text-sm md:text-base font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {lang === 'en' && edu.degreeEn ? edu.degreeEn : edu.degree}
                            </p>
                            
                            <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm ${isDark ? 'text-[#a1a1aa]' : 'text-gray-500'}`}>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    {edu.year}
                                </span>
                                <span className="hidden sm:inline">•</span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    {edu.location}
                                </span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>

    </div>
  );
}