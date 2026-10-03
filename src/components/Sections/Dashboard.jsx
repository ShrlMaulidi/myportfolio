import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi';
import { useLanguage } from '../../context/LanguageContext';

export default function Dashboard({ isDark }) {
  const { lang } = useLanguage();
  const { data: profile } = useApi('profiles', null);
  const { data: topLanguages = [] } = useApi('top-languages');
  const { data: tools = [] } = useApi('tools');
  const { data: learningGoals = [] } = useApi('learning-goals');
  
  const availability = profile ? {
    isAvailable: profile.isAvailable,
    status: profile.avail_status,
    statusEn: profile.avail_statusEn,
    description: profile.avail_desc,
    descriptionEn: profile.avail_descEn,
    link: profile.avail_link
  } : {};
  const [githubData, setGithubData] = useState({
    public_repos: 0,
    followers: 0,
    following: 0,
    avatar_url: '',
    loading: true
  });

  useEffect(() => {
    const USERNAME = 'ShrlMaulidi'; 
    
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then(res => res.json())
      .then(data => {
        setGithubData({
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          avatar_url: data.avatar_url,
          loading: false
        });
      })
      .catch(err => {
        console.error("Gagal mengambil data GitHub:", err);
        setGithubData(prev => ({ ...prev, loading: false }));
      });
  }, []);

  const realStats = [
    { 
      label: 'Public Repos', 
      value: githubData.loading ? '...' : githubData.public_repos, 
      icon: '📂', 
      color: 'bg-orange-500/10 text-orange-500' 
    },
    { 
      label: 'Followers', 
      value: githubData.loading ? '...' : githubData.followers, 
      icon: '👥', 
      color: 'bg-yellow-500/10 text-yellow-500' 
    },
    { 
      label: 'Following', 
      value: githubData.loading ? '...' : githubData.following, 
      icon: '👣', 
      color: 'bg-blue-500/10 text-blue-500' 
    },
    { 
      label: lang === 'en' ? 'Total Projects' : 'Total Project', 
      value: '12+',
      icon: '🚀', 
      color: 'bg-green-500/10 text-green-500' 
    },
  ];

  return (
    <div className="mb-10 animate-fade-in-up transition-colors duration-300 ease-in-out">
        <Helmet>
            <title>{lang === 'en' ? 'Dashboard | Sahrul Maulidi' : 'Dasbor | Sahrul Maulidi'}</title>
            <meta name="description" content={lang === 'en' ? 'Coding statistics and skills dashboard.' : 'Statistik koding dan dasbor keahlian.'} />
        </Helmet>
        
        <div className="mb-8">
             <h1 className={`text-3xl md:text-4xl font-bold mb-3 tracking-tight transition-colors duration-300 ease-in-out ${isDark ? 'text-white' : 'text-[#18181b]'}`}>
                {lang === 'en' ? 'Dashboard' : 'Dasbor'}
            </h1>
            <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ease-in-out ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                {lang === 'en' ? (
                  <>Statistical data is fetched <strong>Real-time</strong> from the GitHub API.</>
                ) : (
                  <>Data statistik diambil secara <strong>Real-time</strong> dari GitHub API.</>
                )}
            </p>
        </div>

        <div className={`h-px w-full my-8 border-dashed border-b transition-colors duration-300 ease-in-out ${isDark ? 'border-[#27272a]' : 'border-gray-300'}`}></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-1 p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden
                ${isDark 
                    ? 'bg-gradient-to-br from-emerald-900/20 to-[#18181b] border-emerald-500/30' 
                    : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'}`}>
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="relative flex h-3 w-3">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${availability.isAvailable ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${availability.isAvailable ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        </span>
                        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                            {lang === 'en' && availability.statusEn ? availability.statusEn : availability.status}
                        </h3>
                    </div>
                    <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-emerald-100/70' : 'text-emerald-800/70'}`}>
                        {lang === 'en' && availability.descriptionEn ? availability.descriptionEn : availability.description}
                    </p>
                </div>
                
                <Link to={availability.link} className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5
                    ${isDark 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500' 
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
                    Hire Me
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                {realStats.map((stat, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border flex flex-col justify-center gap-2 transition-all hover:-translate-y-1
                        ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-gray-200'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1 ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</h3>
                            <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`md:col-span-2 p-6 rounded-2xl border flex flex-col justify-between
                ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'en' ? 'Top Programming Languages' : 'Bahasa Pemrograman Teratas'}
                </h3>
                <div className="space-y-5">
                    {topLanguages.map((langItem, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{langItem.name}</span>
                                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>{langItem.percent}%</span>
                            </div>
                            <div className={`w-full h-3 rounded-full ${isDark ? 'bg-[#27272a]' : 'bg-gray-100'}`}>
                                <div className={`h-3 rounded-full ${langItem.color}`} style={{ width: `${langItem.percent}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`md:col-span-1 p-6 rounded-2xl border flex flex-col
                ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'en' ? 'Favorite Tools' : 'Tools Favorit'}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {tools.map((tool, idx) => (
                        <div key={idx} className={`p-3 rounded-xl flex items-center gap-3 transition-colors ${isDark ? 'bg-[#27272a] hover:bg-[#3f3f46]' : 'bg-gray-50 hover:bg-gray-100'}`}>
                            <span className="text-2xl">{tool.icon}</span>
                            <div className="flex flex-col">
                                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{tool.name}</span>
                                <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {lang === 'en' && tool.descEn ? tool.descEn : tool.desc}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`md:col-span-2 p-6 rounded-2xl border overflow-hidden
                ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-gray-200'}`}>
                
                <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'en' ? 'GitHub Contributions (Real-time)' : 'Kontribusi GitHub (Real-time)'}
                    </h3>
                    <a href="https://github.com/ShrlMaulidi" target="_blank" rel="noreferrer" className="text-xs text-green-500 font-mono bg-green-500/10 px-2 py-1 rounded hover:bg-green-500/20 transition">
                        @ShrlMaulidi
                    </a>
                </div>

                <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                    <div className="min-w-[600px]">
                        <img 
                            src={`https://ghchart.rshah.org/22c55e/ShrlMaulidi`} 
                            alt="Github Chart" 
                            className="w-full h-auto"
                        />
                    </div>
                </div>
                
                <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {lang === 'en' ? '*This chart is fetched directly from my GitHub profile.' : '*Grafik ini diambil langsung dari profil GitHub saya.'}
                </p>
            </div>

            <div className={`md:col-span-1 p-6 rounded-2xl border
                ${isDark ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'en' ? 'Learning Goals' : 'Target Belajar'}
                </h3>
                <div className="space-y-4">
                    {learningGoals.map((goal, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0 border-dashed border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${goal.status === 'Done' ? 'bg-green-500' : (goal.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-500')}`}></div>
                                <span className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{goal.name}</span>
                            </div>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-opacity-10 ${goal.color.replace('text-', 'bg-')} ${goal.color}`}>
                                {lang === 'en' && goal.statusEn ? goal.statusEn : goal.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
}