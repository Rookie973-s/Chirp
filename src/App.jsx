import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import logoImg from './images/lg.png';

import GlobalStyle from "./components/GlobalStyle";
import Ic from "./components/Ic";
import useToast from "./hooks/useToast";
import { ToastContainer, BackToTop } from "./components/ui/shared";
import SearchDropdown from "./components/SearchDropdown";
import T from "./tokens";

import BottomNav from "./components/layout/BottomNav";
import { HamburgerIcon, MobileDrawer } from "./components/layout/MobileDrawer";
import NotifDropdown from "./components/layout/NotifDropdown";
import UserDropdown from "./components/layout/UserDropdown";

import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import StaffPage from "./pages/StaffPage";
import QuestionPage from "./pages/QuestionPage";
import ApplyPage from "./pages/ApplyPage";
import ProfilePage from "./pages/ProfilePage";
import MediaPage from "./pages/MediaPage";

import AuthModal from "./modals/AuthModal";
import QuickAskModal from "./modals/QuickAskModal";
import ChatModal from "./modals/ChatModal";
import AiAskModal from "./modals/AiAskModal";

import { NOTIFS } from "./data";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toasts, show: toast } = useToast();

  const [user, setUser]             = useState(null);
  const [authOpen, setAuthOpen]     = useState(false);
  const [authTab, setAuthTab]       = useState("login");
  const [theme, setTheme]           = useState("light");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen]   = useState(false);
  const [userDdOpen, setUserDdOpen] = useState(false);
  const [chatOpen, setChatOpen]     = useState(false);
  const [aiOpen, setAiOpen]         = useState(false);
  const [quickAsk, setQuickAsk]     = useState(false);
  const [searchQ, setSearchQ]       = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [viewQ, setViewQ]           = useState(null);
  const searchRef = useRef(null);

  const [notifs, setNotifs] = useState(NOTIFS);
  const unread = notifs.filter(n => !n.read).length;

  const pathToPage = {
    "/": "home", "/feed": "feed", "/staff": "staff",
    "/apply": "apply", "/profile": "profile", "/media": "media",
  };
  const page = pathToPage[location.pathname] || "home";

  useEffect(() => { document.documentElement.className = theme; }, [theme]);

  useEffect(() => {
    const fn = () => { setNotifOpen(false); setUserDdOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const openLogin    = () => { setAuthTab("login");    setAuthOpen(true); };
  const openRegister = () => { setAuthTab("register"); setAuthOpen(true); };
  const handleNav    = (p) => {
    const routes = {
      home: "/", feed: "/feed", staff: "/staff",
      apply: "/apply", profile: "/profile", media: "/media",
    };
    navigate(routes[p] || "/");
    setDrawerOpen(false);
  };
  const handleViewQ = (q) => { setViewQ(q); navigate("/feed"); };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <GlobalStyle />
      <ToastContainer toasts={toasts} />
      <BackToTop onAsk={() => setQuickAsk(true)} />

      {/* ── TOPBAR ── */}
      <header className="app-topbar" style={{
  position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
background: "linear-gradient(135deg, rgba(11, 15, 25, 0.97) 0%, rgba(22, 51, 89, 0.95) 100%)",
  backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(59,130,246,.2)",
  boxShadow: "0 1px 0 rgba(59,130,246,.1) inset, 0 4px 24px rgba(0,0,0,.4)",
  display: "flex", alignItems: "center", padding: "0 16px", gap: 10,
}}>

        {/* Logo + Brand name */}
        <button onClick={() => handleNav("home")} style={{
          display: "flex", alignItems: "center", gap: 9,
          background: "none", border: "none", cursor: "pointer", flexShrink: 0,
        }}>
        <img
  src={logoImg}
  alt="CeNet"
  style={{
    height: "clamp(36px, 10vw, 206px)",
    width: "auto",
    maxWidth: "clamp(120px, 16vw, 180px)",
    objectFit: "contain",
  }}
/>
          {/* Brand name — hidden on very small screens */}
         <span className="hide-xs" style={{
  fontFamily: "'Orbitron', sans-serif",
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: 2,
  lineHeight: 1,
}}>
</span>
        </button>

        {/* Search — grows to fill space */}
        <div style={{ flex: 1, maxWidth: 340, position: "relative", marginLeft: "auto" }} ref={searchRef}>
          <input
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search questions, staff…"
            style={{
              width: "100%", height: 30, background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.1)", borderRadius: 10,
              color: "#fff", paddingLeft: 30, paddingRight: 10,
              fontSize: 13, fontFamily: "inherit", outline: "none", transition: "all .2s",
            }}
          />
          {searchFocused && searchQ.length > 1 && (
            <SearchDropdown
              query={searchQ}
              onNavigate={q => { setViewQ(q); navigate("/feed"); }}
              onClose={() => setSearchQ("")}
            />
          )}
        </div>

        {/* Right action cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>

          {/* Theme */}
          <button className="ib" title="Toggle theme"
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            style={{ color: "rgba(255,255,255,.7)", width: 32, height: 32 }}>
            <Ic n={theme === "dark" ? "sun" : "moon"} s={16} />
          </button>

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button className="ib" title="Notifications"
              onClick={e => { e.stopPropagation(); setNotifOpen(p => !p); setUserDdOpen(false); }}
              style={{ color: "rgba(255,255,255,.7)", position: "relative", width: 32, height: 32 }}>
              <Ic n="bell" s={16} />
              {unread > 0 && (
                <span style={{
                  position: "absolute", top: 5, right: 5, width: 7, height: 7,
                  background: "#F97316", borderRadius: "50%", border: "2px solid #000B18",
                }} />
              )}
            </button>
            {notifOpen && (
              <NotifDropdown
                notifs={notifs}
                onMarkAll={() => setNotifs(p => p.map(n => ({ ...n, read: true })))}
                onClose={() => setNotifOpen(false)}
              />
            )}
          </div>

          {/* User avatar or Sign In */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button className="ib" style={{ width: 32, height: 32, padding: 0 }}
                onClick={e => { e.stopPropagation(); setUserDdOpen(p => !p); setNotifOpen(false); }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: `linear-gradient(135deg,${T.gold},${T.goldL})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, color: T.navyD, fontSize: 12,
                }}>{user.name[0]}</div>
              </button>
              {userDdOpen && (
                <UserDropdown
                  onProfile={() => { handleNav("profile"); setUserDdOpen(false); }}
                  onLogout={() => { setUser(null); setUserDdOpen(false); toast("Signed out", "info"); }}
                />
              )}
            </div>
          ) : (
            <button className="btn btn-gold hide-mobile" style={{ height: 32, fontSize: 12, padding: "0 13px", borderRadius: 14 }}
              onClick={openLogin}>
              Sign In
            </button>
          )}

          {/* Hamburger — only visible on mobile */}
          <button className="ib hide-desktop" onClick={() => setDrawerOpen(p => !p)}
            style={{ color: "rgba(255,255,255,.7)", width: 32, height: 32 }}>
            <HamburgerIcon open={drawerOpen} />
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="app-main" style={{ flex: 1, paddingBottom: 72, paddingLeft: 0, paddingRight: 0 }}>
        <Routes>
          <Route path="/"        element={<HomePage  onNav={handleNav} toast={toast} />} />
          <Route path="/feed"    element={
            viewQ
              ? <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
                  <QuestionPage q={viewQ} onBack={() => setViewQ(null)} user={user} onLogin={openLogin} toast={toast} />
                </div>
              : <FeedPage user={user} onLogin={openLogin} toast={toast} onViewQ={handleViewQ} />
          } />
          <Route path="/staff"   element={<StaffPage   user={user} onLogin={openLogin} toast={toast} />} />
          <Route path="/apply"   element={<ApplyPage   toast={toast} />} />
          <Route path="/profile" element={<ProfilePage user={user} toast={toast} />} />
          <Route path="/media"   element={<MediaPage   user={user} onLogin={openLogin} toast={toast} />} />
          <Route path="*"        element={
            <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--mut)" }}>
              <h2 style={{ fontSize: 32, marginBottom: 12 }}>404</h2>
              <p style={{ marginBottom: 24 }}>Page not found.</p>
              <button className="btn btn-pri" onClick={() => navigate("/")}>
                <Ic n="home" s={15} c={T.navyD} />Go Home
              </button>
            </div>
          } />
        </Routes>
      </main>

      <BottomNav page={page} onNav={handleNav} />

      <MobileDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        page={page} onNav={handleNav}
        user={user} onLogin={openLogin} onRegister={openRegister}
        onLogout={() => { setUser(null); toast("Signed out", "info"); }}
        toggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
        theme={theme} onOpenAuth={openLogin} unread={unread}
      />

      {authOpen && (
        <AuthModal
          tab={authTab}
          onClose={() => setAuthOpen(false)}
          onSuccess={(u) => {
            setUser(u);
            setAuthOpen(false);
            toast(u ? `Welcome back, ${u.name}!` : "Welcome to CeNet!", "success");
          }}
        />
      )}
      {quickAsk && <QuickAskModal onClose={() => setQuickAsk(false)} user={user} onLogin={openLogin} toast={toast} />}
      {chatOpen  && <ChatModal    onClose={() => setChatOpen(false)}  user={user} onLogin={openLogin} />}
      {aiOpen    && <AiAskModal   onClose={() => setAiOpen(false)} />}
    </div>
  );
}
