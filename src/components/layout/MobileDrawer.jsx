import T from '../../tokens';
import Ic from '../Ic';
import { TRENDING } from '../../data';

function HamburgerIcon({open}) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <style>{`
        .hb-l1,.hb-l2,.hb-l3{
          transform-origin:11px center;
          transition:transform .3s cubic-bezier(.34,1.1,.64,1),opacity .2s;
        }
        .hb-open .hb-l1{transform:translateY(6px) rotate(45deg)}
        .hb-open .hb-l2{opacity:0;transform:scaleX(0)}
        .hb-open .hb-l3{transform:translateY(-6px) rotate(-45deg)}
      `}</style>
      <g className={open?"hb-open":""}>
        <line className="hb-l1" x1="3" y1="5"  x2="19" y2="5"  stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line className="hb-l2" x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line className="hb-l3" x1="3" y1="17" x2="19" y2="17" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function MobileDrawer({open, onClose, page, onNav, user, onLogin, onLogout, toggleTheme, theme, onOpenAuth, unread}) {
  if (!open) return null;
  const navItems = [
    {ic:"home",l:"Home",p:"home"},
    {ic:"feed",l:"Q&A Feed",p:"feed"},
    {ic:"users",l:"Staff Directory",p:"staff"},
    {ic:"trending",l:"Media",p:"media"},
    {ic:"cap",l:"Apply for Staff",p:"apply"},
    {ic:"user",l:"My Profile",p:"profile"},
  ];

  return (
    <div className="mob-drawer-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="mob-drawer">
        {/* Drawer header */}
        <div style={{
          background:`linear-gradient(135deg,${T.navyD},${T.navyL})`,
          padding:"20px 20px 18px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          borderBottom:"1px solid rgba(255,255,255,.07)",flexShrink:0,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#D4AF37,#b89228)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <path d="M20 7L26 13H22V20H18V13H14L20 7Z" fill="#0B1F35"/>
                <path d="M12 21H28V23C28 27.418 24.418 31 20 31C15.582 31 12 27.418 12 23V21Z" fill="#0B1F35"/>
                <circle cx="20" cy="18" r="3" fill="#D4AF37"/>
              </svg>
            </div>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:15,lineHeight:1.1}}>ATBUConnect</div>
              <div style={{color:"rgba(255,255,255,.45)",fontSize:11}}>Student Hub</div>
            </div>
          </div>
          <button onClick={onClose} style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.1)",border:"none",cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ic n="x" s={15}/>
          </button>
        </div>

        {/* User pill if logged in */}
        {user ? (
          <div style={{padding:"14px 20px",borderBottom:"1px solid var(--brd)",display:"flex",alignItems:"center",gap:12,background:"var(--surfA)"}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:T.gold,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:T.navyD,fontSize:13,flexShrink:0}}>AY</div>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>Amina Yusuf</div>
              <div style={{fontSize:12,color:"var(--mut)"}}>Computer Science · 300L</div>
            </div>
            {unread>0 && <span style={{marginLeft:"auto",background:"#EF4444",color:"#fff",borderRadius:10,padding:"2px 8px",fontSize:11,fontWeight:700,flexShrink:0}}>{unread}</span>}
          </div>
        ) : (
          <div style={{padding:"14px 20px",borderBottom:"1px solid var(--brd)",display:"flex",gap:8}}>
            <button className="auth-btn" style={{flex:1,padding:"11px 8px",fontSize:13,height:"auto"}} onClick={()=>{onClose();onLogin();}}>Sign In</button>
            <button className="auth-btn gold-btn" style={{flex:1,padding:"11px 8px",fontSize:13,height:"auto"}} onClick={()=>{onClose();onOpenAuth("register");}}>Join Free</button>
          </div>
        )}

        {/* Nav items */}
        <div style={{flex:1,overflowY:"auto",padding:"8px 0"}}>
          {navItems.map(({ic,l,p})=>(
            <button key={p}
              className={`mob-drawer-item${page===p?" on":""}`}
              onClick={()=>{onNav(p);onClose();}}>
              <span style={{width:34,height:34,borderRadius:9,background:page===p?"rgba(212,175,55,.14)":"var(--surfA)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ic n={ic} s={17} c={page===p?T.gold:"var(--mut)"}/>
              </span>
              {l}
              {p==="profile" && unread>0 && <span style={{marginLeft:"auto",width:8,height:8,borderRadius:"50%",background:"#EF4444",flexShrink:0}}/>}
            </button>
          ))}

          {/* Trending Now section */}
          <div style={{margin:"10px 0 0",borderTop:"1px solid var(--brd)",padding:"14px 20px 4px"}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:.8,color:"var(--faint)",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
              <Ic n="trending" s={12} c={T.gold}/> Trending Now
            </div>
            {TRENDING.map(t=>(
              <div key={t.n} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"9px 0",borderBottom:"1px solid var(--brd)",cursor:"pointer"}}
                onMouseEnter={e=>e.currentTarget.style.opacity=".75"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <span style={{fontSize:18,fontWeight:800,color:T.gold,lineHeight:1,flexShrink:0,minWidth:20,textAlign:"center"}}>{t.n}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600,lineHeight:1.4,marginBottom:3,color:"var(--txt)"}}>{t.q}</div>
                  <div style={{fontSize:11,color:"var(--faint)"}}>{t.m}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom actions */}
        <div style={{borderTop:"1px solid var(--brd)",padding:"12px 14px",display:"flex",gap:8,flexShrink:0,background:"var(--surfA)"}}>
          <button onClick={toggleTheme}
            style={{flex:1,height:40,borderRadius:10,border:"1.5px solid var(--brdS)",background:"var(--surf)",color:"var(--txt)",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontFamily:"inherit"}}>
            {theme==="dark"?<Ic n="sun" s={15}/>:<Ic n="moon" s={15}/>}
            {theme==="dark"?"Light":"Dark"} Mode
          </button>
          {user && (
            <button onClick={()=>{onLogout();onClose();}}
              style={{height:40,padding:"0 16px",borderRadius:10,border:"1.5px solid #FCA5A5",background:"transparent",color:"#EF4444",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontFamily:"inherit",flexShrink:0}}>
              <Ic n="logout" s={15} c="#EF4444"/>Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


export { HamburgerIcon, MobileDrawer };
export default MobileDrawer;
