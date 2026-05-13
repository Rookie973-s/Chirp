import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

// ── Shared utilities
import GlobalStyle from "./components/GlobalStyle";
import Ic from "./components/Ic";
import useToast from "./hooks/useToast";
import { ToastContainer, BackToTop } from "./components/ui/shared";
import SearchDropdown from "./components/SearchDropdown";
import T from "./tokens";

// ── Layout
import BottomNav from "./components/layout/BottomNav";
import { HamburgerIcon, MobileDrawer } from "./components/layout/MobileDrawer";
import NotifDropdown from "./components/layout/NotifDropdown";
import UserDropdown from "./components/layout/UserDropdown";

// ── Pages
import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import StaffPage from "./pages/StaffPage";
import QuestionPage from "./pages/QuestionPage";
import ApplyPage from "./pages/ApplyPage";
import ProfilePage from "./pages/ProfilePage";
import MediaPage from "./pages/MediaPage";

// ── Modals
import AuthModal from "./modals/AuthModal";
import QuickAskModal from "./modals/QuickAskModal";
import ChatModal from "./modals/ChatModal";
import AiAskModal from "./modals/AiAskModal";

// ── Data
import { NOTIFS } from "./data";

/* ─────────────────────────────────────────────────────────────────────
   INNER APP  (needs router hooks — wrapped by BrowserRouter below)
───────────────────────────────────────────────────────────────────── */
function InnerApp() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const {toasts, show: toast} = useToast();

  // ── Auth state
  const [user, setUser]           = useState(null);
  const [authOpen, setAuthOpen]   = useState(false);
  const [authTab, setAuthTab]     = useState("login");

  // ── UI state
  const [theme, setTheme]         = useState("dark");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDdOpen, setUserDdOpen] = useState(false);
  const [chatOpen, setChatOpen]   = useState(false);
  const [aiOpen, setAiOpen]       = useState(false);
  const [quickAsk, setQuickAsk]   = useState(false);
  const [searchQ, setSearchQ]     = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [viewQ, setViewQ]         = useState(null);   // QuestionPage state
  const searchRef = useRef(null);

  // ── Notifications
  const [notifs, setNotifs]       = useState(NOTIFS);
  const unread = notifs.filter(n => !n.read).length;

  // ── Derive current page from URL path
  const pathToPage = {
    "/":        "home",
    "/feed":    "feed",
    "/staff":   "staff",
    "/apply":   "apply",
    "/profile": "profile",
    "/media":   "media",
  };
  const page = pathToPage[location.pathname] || "home";

  // ── Theme
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // ── Close dropdowns on outside click
  useEffect(() => {
    const fn = () => {
      if (notifOpen || userDdOpen) {
        setNotifOpen(false);
        setUserDdOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [notifOpen, userDdOpen]);

  const openLogin   = () => { setAuthTab("login");    setAuthOpen(true); };
  const openRegister = () => { setAuthTab("register"); setAuthOpen(true); };
  const handleNav   = (p) => {
    const routes = { home:"/", feed:"/feed", staff:"/staff", apply:"/apply", profile:"/profile", media:"/media" };
    navigate(routes[p] || "/");
    setDrawerOpen(false);
  };

  const handleViewQ = (q) => {
    setViewQ(q);
    navigate("/feed");          // stay on feed route, show QuestionPage overlay
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <GlobalStyle />
      <ToastContainer toasts={toasts} />
      <BackToTop />

      {/* ── TOPBAR ───────────────────────────────────────────────── */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        height:68, background:"rgba(11,31,53,.95)",
        backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
        borderBottom:"1px solid rgba(255,255,255,.07)",
        display:"flex", alignItems:"center", padding:"0 20px", gap:14,
      }}>
        {/* Logo */}
        <button onClick={() => handleNav("home")} style={{
          display:"flex", alignItems:"center", gap:10,
          background:"none", border:"none", cursor:"pointer", flexShrink:0,
        }}>
          <div style={{
            width:36, height:36, borderRadius:10,
            background:`linear-gradient(135deg,${T.gold},${T.goldL})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"Playfair Display,serif", fontWeight:700, fontSize:16, color:T.navyD,
          }}>A</div>
          <span style={{
            fontFamily:"Playfair Display,serif", fontWeight:700, fontSize:18,
            color:"#fff", letterSpacing:-.3,
          }} className="hide-xs">ATBUConnect</span>
        </button>

        {/* Desktop nav links */}
        <nav style={{ display:"flex", gap:4, marginLeft:8 }} className="hide-mobile">
          {[
            {id:"home",   label:"Home",    ic:"home"},
            {id:"feed",   label:"Q&A Feed",ic:"msg"},
            {id:"staff",  label:"Staff",   ic:"users"},
            {id:"media",  label:"Media",   ic:"image"},
            {id:"apply",  label:"Apply",   ic:"shield"},
          ].map(({id,label,ic}) => (
            <button key={id}
              onClick={() => handleNav(id)}
              style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"7px 14px", borderRadius:10, border:"none",
                cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit",
                color: page===id ? T.gold : "rgba(255,255,255,.7)",
                background: page===id ? "rgba(212,175,55,.1)" : "transparent",
                transition:"all .15s",
              }}>
              <Ic n={ic} s={15} c={page===id ? T.gold : "currentColor"}/>{label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div style={{ flex:1, maxWidth:340, position:"relative", marginLeft:"auto" }} ref={searchRef}>
          <div style={{ position:"relative" }}>
            <Ic n="search" s={15} c="rgba(255,255,255,.4)"
              style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}/>
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search questions, staff…"
              style={{
                width:"100%", height:38, background:"rgba(255,255,255,.08)",
                border:"1px solid rgba(255,255,255,.1)", borderRadius:12,
                color:"#fff", paddingLeft:36, paddingRight:12,
                fontSize:13, fontFamily:"inherit",
                outline:"none", transition:"all .2s",
              }}
            />
          </div>
          {searchFocused && searchQ.length > 1 && (
            <SearchDropdown
              query={searchQ}
              onNavigate={(q) => { setViewQ(q); navigate("/feed"); }}
              onClose={() => setSearchQ("")}
            />
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
          {/* Quick Ask */}
          <button className="btn btn-pri hide-xs" style={{ height:36, fontSize:13, padding:"0 14px" }}
            onClick={() => setQuickAsk(true)}>
            <Ic n="plus" s={14} c={T.navyD}/>Ask
          </button>

          {/* Theme toggle */}
          <button className="ib" title="Toggle theme"
            onClick={() => setTheme(t => t==="dark" ? "light" : "dark")}
            style={{ color:"rgba(255,255,255,.7)" }}>
            <Ic n={theme==="dark" ? "sun" : "moon"} s={18}/>
          </button>

          {/* Chat */}
          <button className="ib" title="Community chat"
            onClick={() => setChatOpen(true)}
            style={{ color:"rgba(255,255,255,.7)" }}>
            <Ic n="msg" s={18}/>
          </button>

          {/* Notifications */}
          <div style={{ position:"relative" }}>
            <button className="ib" title="Notifications"
              onClick={e => { e.stopPropagation(); setNotifOpen(p => !p); setUserDdOpen(false); }}
              style={{ color:"rgba(255,255,255,.7)", position:"relative" }}>
              <Ic n="bell" s={18}/>
              {unread > 0 && (
                <span style={{
                  position:"absolute", top:4, right:4, width:8, height:8,
                  background:T.gold, borderRadius:"50%", border:"2px solid #0B1F35",
                }}/>
              )}
            </button>
            {notifOpen && (
              <NotifDropdown
                notifs={notifs}
                onMarkAll={() => setNotifs(p => p.map(n => ({...n, read:true})))}
                onClose={() => setNotifOpen(false)}
              />
            )}
          </div>

          {/* User / Login */}
          {user ? (
            <div style={{ position:"relative" }}>
              <button className="ib" onClick={e => { e.stopPropagation(); setUserDdOpen(p => !p); setNotifOpen(false); }}>
                <div style={{
                  width:34, height:34, borderRadius:"50%",
                  background:`linear-gradient(135deg,${T.gold},${T.goldL})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontWeight:700, color:T.navyD, fontSize:13,
                }}>{user.name[0]}</div>
              </button>
              {userDdOpen && (
                <UserDropdown
                  onProfile={() => { handleNav("profile"); setUserDdOpen(false); }}
                  onLogout={() => { setUser(null); setUserDdOpen(false); toast("Signed out","info"); }}
                />
              )}
            </div>
          ) : (
            <button className="btn btn-gold" style={{ height:36, fontSize:13, padding:"0 16px" }}
              onClick={openLogin}>
              Sign In
            </button>
          )}

          {/* Mobile hamburger */}
          <button className="ib hide-desktop"
            onClick={() => setDrawerOpen(p => !p)}
            style={{ color:"rgba(255,255,255,.7)" }}>
            <HamburgerIcon open={drawerOpen}/>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT (offset by topbar height) ───────────────── */}
      <main style={{ flex:1, paddingTop:68, paddingBottom:72 }}>
        <Routes>
          <Route path="/"        element={<HomePage  onNav={handleNav} toast={toast}/>}/>
          <Route path="/feed"    element={
            viewQ
              ? <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 16px"}}>
                  <QuestionPage q={viewQ} onBack={()=>setViewQ(null)} user={user} onLogin={openLogin} toast={toast}/>
                </div>
              : <FeedPage user={user} onLogin={openLogin} toast={toast} onViewQ={handleViewQ}/>
          }/>
          <Route path="/staff"   element={<StaffPage   user={user} onLogin={openLogin} toast={toast}/>}/>
          <Route path="/apply"   element={<ApplyPage   toast={toast}/>}/>
          <Route path="/profile" element={<ProfilePage user={user} toast={toast}/>}/>
          <Route path="/media"   element={<MediaPage   user={user} onLogin={openLogin} toast={toast}/>}/>
          <Route path="*"        element={
            <div style={{textAlign:"center",padding:"80px 20px",color:"var(--mut)"}}>
              <h2 style={{fontSize:32,marginBottom:12}}>404</h2>
              <p style={{marginBottom:24}}>Page not found.</p>
              <button className="btn btn-pri" onClick={()=>navigate("/")}>
                <Ic n="home" s={15} c={T.navyD}/>Go Home
              </button>
            </div>
          }/>
        </Routes>
      </main>

      {/* ── BOTTOM NAV (mobile) ──────────────────────────────────── */}
      <BottomNav page={page} onNav={handleNav}/>

      {/* ── MOBILE DRAWER ───────────────────────────────────────── */}
      <MobileDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        page={page} onNav={handleNav}
        user={user} onLogin={openLogin} onRegister={openRegister} onLogout={() => { setUser(null); toast("Signed out","info"); }}
        toggleTheme={() => setTheme(t => t==="dark" ? "light" : "dark")}
        theme={theme} onOpenAuth={openLogin} unread={unread}
      />

      {/* ── MODALS ──────────────────────────────────────────────── */}
      {authOpen && (
        <AuthModal
          tab={authTab}
          onClose={() => setAuthOpen(false)}
          onSuccess={(u) => {
            setUser(u);
            setAuthOpen(false);
            toast(`Welcome back, ${u.name}!`, "success");
          }}
        />
      )}
      {quickAsk && <QuickAskModal onClose={() => setQuickAsk(false)} user={user} onLogin={openLogin} toast={toast}/>}
      {chatOpen  && <ChatModal    onClose={() => setChatOpen(false)}  user={user} onLogin={openLogin}/>}
      {aiOpen    && <AiAskModal   onClose={() => setAiOpen(false)}/>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ROOT EXPORT — wraps everything in BrowserRouter
───────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}
