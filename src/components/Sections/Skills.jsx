import SkillBadge from "../UI/SkillBadge";
import { useLanguage } from "../../context/LanguageContext";
import { useApi } from "../../hooks/useApi";

export default function Skills({ isDark }) {
  const { lang } = useLanguage();
  const { data: skillsData } = useApi('skills');

  return (
    <div className="mb-8 transition-colors duration-300 ease-in-out">
        <div className="flex items-center gap-2 mb-6">
            <svg className={`w-5 h-5 transition-colors duration-300 ease-in-out ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                {lang === 'en' ? 'Skills' : 'Keahlian'}
            </h3>
        </div>

        <p className={`text-sm md:text-base mb-6 transition-colors duration-300 ease-in-out ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {lang === 'en' ? 'My professional skills.' : 'Keahlian profesional saya.'}
        </p>
            
        <div className="flex flex-wrap gap-3 md:gap-4 justify-start">
            {skillsData.map((skill, idx) => (
                <SkillBadge 
                    key={idx} 
                    name={skill.name} 
                    icon={skill.icon} 
                    color={skill.color} 
                    isDark={isDark} 
                />
            ))}
        </div>
    </div>
  );
}