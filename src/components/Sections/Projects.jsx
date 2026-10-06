import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "../../context/LanguageContext";
import { Helmet } from 'react-helmet-async';
import { useApi } from "../../hooks/useApi";
import ReactionWidget from "../UI/ReactionWidget";

export default function Projects({ isDark }) {
  const { lang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch data dynamically from Laravel Backend
  const { data: projectsData, loading: loadingProjects, updateData: updateProjectsData } = useApi('projects');
  const { data: skillsData } = useApi('skills');

  useEffect(() => {
    if (selectedProject) {
      // Mencegah halaman bergeser (layout shift/flash) karena hilangnya scrollbar
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [selectedProject]);

  const getTechIcon = (techName) => {
    const skill = skillsData.find(s => s.name === techName);
    return skill ? skill.icon : null;
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const getImages = (project) => {
    if (!project) return [];
    if (project.images && project.images.length > 0) return project.images;
    if (project.image) return [project.image];
    return [];
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const images = getImages(selectedProject);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const images = getImages(selectedProject);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const activeImages = getImages(selectedProject);

  return (
    <div className="mb-10 animate-fade-in-up transition-colors duration-300 ease-in-out">
        <Helmet>
            <title>{lang === 'en' ? 'Projects | Sahrul Maulidi' : 'Proyek | Sahrul Maulidi'}</title>
            <meta name="description" content={lang === 'en' ? 'Explore the projects built by Sahrul Maulidi.' : 'Jelajahi proyek-proyek yang telah dibangun oleh Sahrul Maulidi.'} />
        </Helmet>

        <div className="mb-8">
             <h1 className={`text-3xl md:text-4xl font-bold mb-3 tracking-tight transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                {t('proyekTitle')}
            </h1>
            <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ease-in-out ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                {t('proyekDesc')}
            </p>
        </div>

        <div className={`h-px w-full my-8 border-dashed border-b transition-colors duration-300 ease-in-out ${isDark ? 'border-[#27272a]' : 'border-gray-300'}`}></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
                <div 
                    key={project.id} 
                    className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col
                    ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-gray-200 shadow-sm'}`}
                >
                    <div className="relative w-full h-56 overflow-hidden">
                        <img 
                            src={getImages(project)[0]} 
                            alt={lang === 'en' && project.titleEn ? project.titleEn : project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button 
                                onClick={() => openModal(project)}
                                className="text-white font-semibold text-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
                            >
                                {t('lihatDetail')}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </button>
                        </div>

                        {project.featured && (
                            <div className="absolute top-4 right-4 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                Featured
                            </div>
                        )}
                        
                        {getImages(project).length > 1 && (
                            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                1/{getImages(project).length}
                            </div>
                        )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                        <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'en' && project.titleEn ? project.titleEn : project.title}
                        </h3>
                        <p className={`text-sm mb-6 line-clamp-3 leading-relaxed transition-colors duration-300 flex-1 ${isDark ? 'text-[#a1a1aa]' : 'text-gray-600'}`}>
                            {lang === 'en' && project.descEn ? project.descEn : project.desc}
                        </p>

                        <div className="flex items-center gap-3 mt-auto flex-wrap">
                            {(project.tech || []).map((techName, idx) => {
                                const iconPath = getTechIcon(techName);
                                return (
                                    <div key={idx} className="relative group/tooltip">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${isDark ? 'bg-[#27272a] border-[#3f3f46]' : 'bg-gray-50 border-gray-200'}`}>
                                            {iconPath ? (
                                                <img src={iconPath} alt={techName} className="w-6 h-6 object-contain" />
                                            ) : (
                                                <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-black'}`}>{techName[0]}</span>
                                            )}
                                        </div>
                                        <span className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                            {techName}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <ReactionWidget 
                          type="project" 
                          itemId={project.id} 
                          reactions={project.reactions} 
                          isDark={isDark} 
                          onReactUpdate={(id, newReactions) => {
                            updateProjectsData(projectsData.map(p => p.id === id ? { ...p, reactions: newReactions } : p));
                          }} 
                        />
                    </div>
                </div>
            ))}
        </div>

        <AnimatePresence>
            {selectedProject && (
                <motion.div 
                    key="project-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    <div 
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/95 cursor-pointer"
                    />

                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 
                        ${isDark ? 'bg-[#18181b]' : 'bg-white'}`}
                    >
                        <button 
                            onClick={closeModal}
                            className={`absolute top-3 right-3 z-50 p-1.5 md:p-2 rounded-full shadow-md transition-colors ${isDark ? 'bg-black/60 text-white hover:bg-black' : 'bg-white/80 text-black hover:bg-white'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className={`relative w-full h-48 md:h-auto md:w-1/2 bg-[#0a0a0a] flex shrink-0 items-center justify-center group`}>
                            <img 
                                src={activeImages[currentImageIndex]} 
                                alt={`${lang === 'en' && selectedProject.titleEn ? selectedProject.titleEn : selectedProject.title} - img ${currentImageIndex + 1}`} 
                                className="w-full h-full object-contain p-3 md:p-6 transition-all duration-300"
                            />

                            {activeImages.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="absolute left-2 md:left-3 p-1.5 md:p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-opacity">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                    </button>
                                    <button onClick={nextImage} className="absolute right-2 md:right-3 p-1.5 md:p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-opacity">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </button>

                                    <div className="absolute bottom-2 md:bottom-3 flex gap-1.5">
                                        {activeImages.map((_, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`} 
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className={`w-full md:w-1/2 p-5 md:p-6 flex flex-col justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <div>
                                <h2 className={`text-xl md:text-2xl font-bold mb-3 pr-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {lang === 'en' && selectedProject.titleEn ? selectedProject.titleEn : selectedProject.title}
                                </h2>

                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    {(selectedProject.tech || []).map((techName, idx) => (
                                        <span key={idx} className={`text-[10px] md:text-xs px-2.5 py-1 rounded-md font-medium border ${isDark ? 'bg-[#27272a] border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                                            {techName}
                                        </span>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 md:mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {t('tentangProyek')}
                                    </h4>
                                    <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line line-clamp-4 md:line-clamp-none">
                                        {lang === 'en' && selectedProject.descEn ? selectedProject.descEn : selectedProject.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2 mt-auto">
                                {selectedProject.link ? (
                                    <a 
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-2.5 md:py-3 text-sm rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg
                                            ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#18181b] text-white hover:bg-black'}`}
                                    >
                                        {t('kunjungiWeb')}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    </a>
                                ) : (
                                    <button disabled className={`w-full py-2.5 md:py-3 text-sm rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed ${isDark ? 'bg-[#27272a] text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                                        {t('tautanMati')}
                                    </button>
                                )}
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    </div>
  );
}