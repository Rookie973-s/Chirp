import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

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
  const [theme, setTheme]           = useState("dark");
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
      <BackToTop />

      {/* ── TOPBAR — height controlled by .app-topbar CSS class (68px desktop / 56px mobile) ── */}
      <header className="app-topbar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(11,31,53,.97)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        display: "flex", alignItems: "center", padding: "0 20px", gap: 10,
      }}>

        {/* Logo */}
        <button onClick={() => handleNav("home")} style={{
          display: "flex", alignItems: "center", gap: 9,
          background: "none", border: "none", cursor: "pointer", flexShrink: 0,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `linear-gradient(135deg,${T.gold},${T.goldL})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Playfair Display,serif", fontWeight: 700, fontSize: 15, color: T.navyD,
          }}>A</div>
          {/* hide brand name on very small phones */}
          <span className="hide-xs" style={{
            fontFamily: "Playfair Display,serif", fontWeight: 700, fontSize: 17,
            color: "#fff", letterSpacing: -.3, whiteSpace: "nowrap",
          }}>ATBUConnect</span>
        </button>
<Ic n="search" s={14} c="rgba(255,255,255,.4)" style={{
            position: "absolute", left: 10, top: "200%", transform: "translateY(-20%)",
            pointerEvents: "none",
          }} />
        

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

          {/* Ask — hidden on phones <480px */}
          <button className="btn btn-pri hide-xs" style={{ height: 32, fontSize: 12, padding: "0 11px", borderRadius: 8 }}
            onClick={() => setQuickAsk(true)}>
            <Ic n="plus" s={12} c={T.navyD} />Ask
          </button>

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
                  background: T.gold, borderRadius: "50%", border: "2px solid #0B1F35",
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
            <button className="btn btn-gold" style={{ height: 32, fontSize: 12, padding: "0 13px", borderRadius: 8 }}
              onClick={openLogin}>
              Sign In
            </button>
          )}

          {/* Hamburger — only visible on mobile via .hide-desktop */}
          <button className="ib hide-desktop" onClick={() => setDrawerOpen(p => !p)}
            style={{ color: "rgba(255,255,255,.7)", width: 32, height: 32 }}>
            <HamburgerIcon open={drawerOpen} />
          </button>
        </div>
      </header>

      {/* ── MAIN — padding-top via .app-main CSS class (68px desktop / 56px mobile) ── */}
      <main className="app-main" style={{ flex: 1, paddingBottom: 72 }}>
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
            toast(u ? `Welcome back, ${u.name}!` : "Welcome to ATBUConnect!", "success");
          }}
        />
      )}
      {quickAsk && <QuickAskModal onClose={() => setQuickAsk(false)} user={user} onLogin={openLogin} toast={toast} />}
      {chatOpen  && <ChatModal    onClose={() => setChatOpen(false)}  user={user} onLogin={openLogin} />}
      {aiOpen    && <AiAskModal   onClose={() => setAiOpen(false)} />}
    </div>
  );
}