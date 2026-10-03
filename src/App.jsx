import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import { useApi } from "./hooks/useApi";

import React from "react";
import Sidebar from "./components/Layout/Sidebar";
import Hero from "./components/Sections/Hero";
import Skills from "./components/Sections/Skills";
import About from "./components/Sections/About";
import Contact from "./components/Sections/Contact";
import Achievements from "./components/Sections/Achievements";
import Projects from "./components/Sections/Projects";
import Dashboard from "./components/Sections/Dashboard";
import Gallery from "./components/Sections/Gallery";
import Guestbook from "./components/Sections/Guestbook";
import QuizCTA from "./components/Sections/QuizCTA";
import NotFound from "./components/Sections/NotFound";

import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";


const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

const Home = ({ isDark }) => (
  <PageTransition>
    <Helmet>
      <title>Sahrul Maulidi | Portfolio</title>
      <meta name="description" content="Personal portfolio of Sahrul Maulidi, a passionate Web Developer from Indonesia." />
    </Helmet>
    <Hero isDark={isDark} />
    <Skills isDark={isDark} />
    <QuizCTA isDark={isDark} />
  </PageTransition>
);

function AppContent({ isDark, mobileMenuOpen, setMobileMenuOpen, setIsDark }) {
  const location = useLocation();
  const { data: profileData } = useApi('profiles', null);

  return (
    <div className="w-full max-w-7xl min-h-screen flex flex-col md:flex-row mx-auto relative antialiased selection:bg-green-500 selection:text-black py-0 md:py-8 px-0 md:px-8 gap-0 md:gap-12 transition-colors duration-300 ease-in-out">

      <div className={`md:hidden flex items-center justify-between p-4 border-b sticky top-0 z-40 transition-colors duration-300 ease-in-out ${isDark ? 'bg-[#0c0c0c] border-[#27272a]' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-2">
          {profileData ? (
            <>
              <img
                src={profileData.img}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className={`font-bold text-base transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {profileData.name}
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-[#27272a]"></div>
              <div className="h-4 w-24 bg-gray-300 dark:bg-[#27272a] rounded"></div>
            </div>
          )}
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}>
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      <Sidebar isDark={isDark} setIsDark={setIsDark} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="flex-1 relative w-full overflow-hidden">
        <div className="w-full h-full max-w-full px-6 py-8 md:px-0 md:py-4">
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: isDark ? '#333' : '#fff',
                color: isDark ? '#fff' : '#333',
              },
            }}
          />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home isDark={isDark} />} />

              <Route path="/about" element={
                <PageTransition>
                  <About isDark={isDark} />
                </PageTransition>
              } />

              <Route path="/achievements" element={
                <PageTransition>
                  <Achievements title="Pencapaian" isDark={isDark} />
                </PageTransition>
              } />

              <Route path="/projects" element={
                <PageTransition>
                  <Projects title="Proyek" isDark={isDark} />
                </PageTransition>
              } />

              <Route path="/dashboard" element={
                <PageTransition>
                  <Dashboard title="Dasbor" isDark={isDark} />
                </PageTransition>
              } />

              <Route path="/gallery" element={
                <PageTransition>
                  <Gallery title="Gallery" isDark={isDark} />
                </PageTransition>
              } />

              <Route path="/guestbook" element={
                <PageTransition>
                  <Guestbook title="Ruang Diskusi" isDark={isDark} />
                </PageTransition>
              } />

              <Route path="/contact" element={
                <PageTransition>
                  <Contact title="Kontak" isDark={isDark} />
                </PageTransition>
              } />

              <Route path="*" element={
                <PageTransition>
                  <NotFound isDark={isDark} />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>

          <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm gap-4 md:gap-0 transition-colors duration-300 ease-in-out ${isDark ? 'border-[#27272a] text-[#52525b]' : 'border-zinc-200 text-zinc-500'}`}>
            <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <div className="flex gap-6">
              <span className="hover:text-green-500 cursor-pointer transition">Privasi</span>
              <span className="hover:text-green-500 cursor-pointer transition">Syarat</span>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("theme") === "dark" || (!("theme" in localStorage));
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.backgroundColor = '';

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <GoogleOAuthProvider clientId="1020356043198-gohr19fdud1dmps8mh90iqhn2lsqsp8j.apps.googleusercontent.com">
      <HelmetProvider>
        <LanguageProvider>
          <Router>
            <AppContent
              isDark={isDark}
              setIsDark={setIsDark}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </Router>
        </LanguageProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  );
}