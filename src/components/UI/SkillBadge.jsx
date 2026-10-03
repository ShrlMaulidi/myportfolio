export default function SkillBadge({ name, icon, color, isDark }) {
  return (
    <div className="group relative flex flex-col items-center justify-center cursor-pointer">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} p-[1.5px] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden`}>
        
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/20 rounded-full pointer-events-none"></div>
        <div className={`w-full h-full rounded-full flex items-center justify-center shadow-inner transition-all duration-300 ease-in-out ${isDark ? 'bg-[#18181b]/20 backdrop-blur-sm border border-white/10' : 'bg-white/40 backdrop-blur-sm border border-white/40'}`}>
           
           {icon ? (
             <img 
               src={icon} 
               alt={name} 
               className="w-10 h-10 object-contain drop-shadow-sm transform transition-transform duration-300 group-hover:rotate-12" 
             />
           ) : (
             <span className="font-bold text-[10px] text-white drop-shadow-md">
               {name}
             </span>
           )}

        </div>
      </div>
      
      <span className={`mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-semibold px-2 py-0.5 rounded ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {name}
      </span>

    </div>
  );
}