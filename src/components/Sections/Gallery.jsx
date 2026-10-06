import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi';
import ReactionWidget from '../UI/ReactionWidget';

export default function Gallery({ isDark }) {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: galleryPhotos, loading, updateData: updateGalleryPhotos } = useApi('galleries');

  useEffect(() => {
    if (selectedImage) {
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
  }, [selectedImage]);

  const categories = ['Semua', ...new Set(galleryPhotos.map(photo => photo.category))];

  const getCategoryLabel = (cat) => {
    if (cat === 'Semua') return lang === 'en' ? 'All' : 'Semua';
    if (lang === 'en') {
        const photo = galleryPhotos.find(p => p.category === cat);
        return photo && photo.categoryEn ? photo.categoryEn : cat;
    }
    return cat;
  };

  const filteredPhotos = selectedCategory === 'Semua' 
    ? galleryPhotos 
    : galleryPhotos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="mb-10 animate-fade-in-up transition-colors duration-300 ease-in-out">
        <Helmet>
            <title>{lang === 'en' ? 'Gallery | Sahrul Maulidi' : 'Galeri | Sahrul Maulidi'}</title>
            <meta name="description" content={lang === 'en' ? 'Photo gallery and moments.' : 'Galeri foto dan momen-momen.'} />
        </Helmet>
        
        <div className="mb-8">
             <h1 className={`text-3xl md:text-4xl font-bold mb-3 tracking-tight transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                {lang === 'en' ? 'Gallery' : 'Galeri'}
            </h1>
            <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ease-in-out ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                {lang === 'en' 
                    ? 'A collection of my moments, activities, and visual memories.' 
                    : 'Koleksi momen, kegiatan, dan kenangan visual saya.'}
            </p>
        </div>
        <div className={`h-px w-full my-8 border-dashed border-b transition-colors duration-300 ease-in-out ${isDark ? 'border-[#27272a]' : 'border-gray-300'}`}></div>

        <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, idx) => (
                <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${selectedCategory === cat 
                        ? (isDark ? 'bg-white text-black' : 'bg-black text-white')
                        : (isDark ? 'bg-[#27272a] text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                    }`}
                >
                    {getCategoryLabel(cat)}
                </button>
            ))}
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {filteredPhotos.map((photo) => (
                <div 
                    key={photo.id}
                    onClick={() => setSelectedImage(photo)}
                    className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer mb-4"
                >
                    <img 
                        src={photo.src} 
                        alt={lang === 'en' && photo.captionEn ? photo.captionEn : photo.caption} 
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 mb-2">
                            {lang === 'en' && photo.captionEn ? photo.captionEn : photo.caption}
                        </p>
                        <div onClick={e => e.stopPropagation()}>
                            <ReactionWidget 
                                type="gallery" 
                                itemId={photo.id} 
                                reactions={photo.reactions} 
                                isDark={true} 
                                onReactUpdate={(id, newReactions) => {
                                    updateGalleryPhotos(galleryPhotos.map(p => p.id === id ? { ...p, reactions: newReactions } : p));
                                }} 
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredPhotos.length === 0 && (
            <div className="text-center py-20 opacity-50">
                <p>{lang === 'en' ? 'No photos in this category.' : 'Tidak ada foto di kategori ini.'}</p>
            </div>
        )}

        {selectedImage && (
            <div 
                className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
                onClick={() => setSelectedImage(null)} 
            >
                <button 
                    className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                    onClick={() => setSelectedImage(null)}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div 
                    className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img 
                        src={selectedImage.src} 
                        alt={lang === 'en' && selectedImage.captionEn ? selectedImage.captionEn : selectedImage.caption} 
                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    />
                    <div className="mt-4 text-center">
                        <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full mb-2 inline-block backdrop-blur-md">
                            {getCategoryLabel(selectedImage.category)}
                        </span>
                        <p className="text-white text-lg font-medium">
                            {lang === 'en' && selectedImage.captionEn ? selectedImage.captionEn : selectedImage.caption}
                        </p>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}