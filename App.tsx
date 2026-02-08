
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, Contract, Language } from './types';
import ConciergeChat from './components/ConciergeChat';
import ProviderSignup from './components/ProviderSignup';
import UserSignup from './components/UserSignup';
import AdminPanel from './components/AdminPanel';
import ContractView from './components/ContractView';
import ProfileView from './components/ProfileView';
import DirectChat from './components/DirectChat';
import Logo from './components/Logo';
import { translations } from './translations';
import { MessageSquareCode, Boxes, UserCircle, ChevronRight, Sparkles, HeartHandshake, UserPlus, ShieldCheck, Wallet, ArrowUpCircle, LogIn, Lock, LayoutDashboard, FileText, LogOut, X, User as UserIcon, AlertTriangle, Zap, Headphones, Menu, Globe, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CONCIERGE);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeChatContract, setActiveChatContract] = useState<Contract | null>(null);
  const [pinTarget, setPinTarget] = useState<'Requester' | 'Provider' | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('nexus_lang') as Language) || 'EN';
  });

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('nexus_lang', language);
  }, [language]);

  useEffect(() => {
    const savedUser = localStorage.getItem('anthro_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
    }
  }, []);

  const loginAsDemo = (role: 'Requester' | 'Provider') => {
    const newUser: UserProfile = {
      id: role.toLowerCase() + '-' + Math.random().toString(36).substr(2, 9),
      name: role.toUpperCase(),
      phone: '+1 555 000 0000',
      role: role,
      walletBalance: role === 'Requester' ? 500.00 : 0.00,
      isSubscribed: false, 
      hasFreeCreditClaimed: true,
      skills: role === 'Provider' ? ['Specialized Labor', 'Caregiving', 'Chef', 'Artisan'] : [],
      rating: 4.8,
      feedbackCount: 12,
      requestHistory: []
    };
    handleUserUpdate(newUser);
    setCurrentView(AppView.CONCIERGE);
    setPinTarget(null);
    setPinInput('');
  };

  const handleUserUpdate = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('anthro_user', JSON.stringify(updatedUser));
  };

  const handlePinSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pinInput === '123') {
      if (pinTarget) loginAsDemo(pinTarget);
    } else {
      alert(t.unauthorized);
      setPinInput('');
    }
  };

  const handleRegistrationComplete = (role: 'Requester' | 'Provider', data: { name: string; phone: string }) => {
    const newUser: UserProfile = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: data.name,
      phone: data.phone,
      role: role,
      walletBalance: role === 'Requester' ? 50.00 : 0.00,
      isSubscribed: false,
      hasFreeCreditClaimed: role === 'Requester',
      skills: [],
      rating: 5.0,
      feedbackCount: 0,
      requestHistory: []
    };
    handleUserUpdate(newUser);
    setCurrentView(AppView.CONCIERGE);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('anthro_user');
    setCurrentView(AppView.CONCIERGE);
  };

  const openContractChat = (contract: Contract) => {
    setActiveChatContract(contract);
    setCurrentView(AppView.DIRECT_CHAT);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.CONCIERGE: return <ConciergeChat user={user} onUpdateUser={handleUserUpdate} language={language} />;
      case AppView.PROVIDER_SIGNUP: return <ProviderSignup onComplete={(d) => handleRegistrationComplete('Provider', d)} language={language} />;
      case AppView.USER_SIGNUP: return <UserSignup onComplete={(d) => handleRegistrationComplete('Requester', d)} language={language} />;
      case AppView.ADMIN: return <AdminPanel language={language} />;
      case AppView.CONTRACTS: return user ? <ContractView user={user} onOpenChat={openContractChat} language={language} /> : <ConciergeChat user={null} language={language} />;
      case AppView.PROFILE: return user ? <ProfileView user={user} onUpdate={handleUserUpdate} language={language} /> : <ConciergeChat user={null} language={language} />;
      case AppView.DIRECT_CHAT: return (user && activeChatContract) ? <DirectChat user={user} contract={activeChatContract} onBack={() => setCurrentView(AppView.CONTRACTS)} language={language} /> : <ConciergeChat user={null} language={language} />;
      default: return <ConciergeChat user={user} onUpdateUser={handleUserUpdate} language={language} />;
    }
  };

  return (
    <div className="h-screen flex flex-col selection:bg-brand-light selection:text-white overflow-hidden relative">
      {pinTarget && (
        <div className="fixed inset-0 z-[100] bg-[#0F0F1E]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in">
          <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center space-y-6 md:space-y-8 shadow-2xl relative">
            <button onClick={() => {setPinTarget(null); setPinInput('');}} className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-white"><X size={20} /></button>
            <Lock className="text-red-500 mx-auto" size={24} />
            <h3 className="text-xl md:text-2xl font-display font-light uppercase tracking-widest text-white">{pinTarget?.toUpperCase()} Access</h3>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder={t.loginPin} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-white tracking-[0.4em] text-lg focus:outline-none focus:ring-1 focus:ring-white/20" />
              <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded-xl uppercase tracking-widest text-xs">{t.authenticate}</button>
            </form>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 px-3 md:px-8 py-3 md:py-6 bg-[#0F0F1E]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 md:gap-3 cursor-pointer" onClick={() => setCurrentView(AppView.CONCIERGE)}>
            <Logo className="w-6 h-6 md:w-10 md:h-10" />
            <span className="text-sm md:text-2xl font-display font-bold tracking-[0.05em] md:tracking-[0.1em] text-white whitespace-nowrap uppercase">CALL A HUMAN</span>
          </div>

          <div className="hidden lg:flex items-center bg-[#1A1A3A]/40 border border-white/10 rounded-full p-1.5 mx-4">
            <button onClick={() => setCurrentView(AppView.CONCIERGE)} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === AppView.CONCIERGE ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}>{t.concierge}</button>
            <button onClick={() => setCurrentView(AppView.ADMIN)} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${currentView === AppView.ADMIN ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}><Lock size={12} /> {t.admin}</button>
          </div>

          <div className="flex items-center gap-1.5 md:gap-4">
            <div className="hidden xs:flex items-center bg-white/5 border border-white/10 rounded-full p-1">
              {(['EN', 'FR', 'TR'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-bold transition-all ${language === lang ? 'bg-white text-black' : 'text-white/40'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => setPinTarget('Requester')} className="flex items-center gap-2 px-4 py-2 bg-cyan-950/30 border border-cyan-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/10">
                <Lock size={10} /> {t.req}
              </button>
              <button onClick={() => setPinTarget('Provider')} className="flex items-center gap-2 px-4 py-2 bg-purple-950/30 border border-purple-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-purple-400 hover:bg-purple-500/10">
                <Lock size={10} /> {t.pro}
              </button>
            </div>

            {!user ? (
              <button onClick={() => setCurrentView(AppView.PROVIDER_SIGNUP)} className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-brand-gold text-black rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                <UserPlus size={10} className="md:size-3" /> <span className="inline">{t.join}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 md:gap-2">
                <button onClick={() => setCurrentView(AppView.PROFILE)} className="p-1.5 text-white/60 hover:text-white"><UserIcon size={16} md:size={18}/></button>
                <button onClick={logout} className="p-1.5 text-red-400 hover:text-red-300"><LogOut size={16} md:size={18}/></button>
              </div>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 text-white/60">
               {isMobileMenuOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0F0F1E] border-b border-white/5 p-3 flex flex-col gap-2 z-[60] animate-in slide-in-from-top-2 shadow-2xl backdrop-blur-3xl">
            <button onClick={() => {setCurrentView(AppView.CONCIERGE); setIsMobileMenuOpen(false);}} className="w-full p-3.5 bg-white/5 rounded-xl text-left text-[10px] font-bold uppercase tracking-widest">{t.concierge}</button>
            <button onClick={() => {setCurrentView(AppView.ADMIN); setIsMobileMenuOpen(false);}} className="w-full p-3.5 bg-white/5 rounded-xl text-left text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Lock size={12}/> {t.admin}</button>
            
            <div className="flex gap-2">
               <button onClick={() => {setPinTarget('Requester'); setIsMobileMenuOpen(false);}} className="flex-1 p-3.5 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-left text-[9px] font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                  <Lock size={12} /> {t.req} Access
               </button>
               <button onClick={() => {setPinTarget('Provider'); setIsMobileMenuOpen(false);}} className="flex-1 p-3.5 bg-purple-950/30 border border-purple-500/20 rounded-xl text-left text-[9px] font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                  <Lock size={12} /> {t.pro} Access
               </button>
            </div>

            <div className="flex gap-1 p-1 bg-white/5 rounded-xl items-center justify-center mt-1">
              {(['EN', 'FR', 'TR'] as Language[]).map(lang => (
                <button key={lang} onClick={() => setLanguage(lang)} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold ${language === lang ? 'bg-white text-black' : 'text-white/40'}`}>{lang}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
