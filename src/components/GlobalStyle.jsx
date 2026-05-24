const GlobalStyle = () => (
  <style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Orbitron:wght@700&family=Montserrat:wght@700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;-webkit-tap-highlight-color:transparent}
    body{font-family:'DM Sans',system-ui,sans-serif;background:var(--bg);color:var(--txt);line-height:1.6;overflow-x:hidden;transition:background .25s,color .25s}
    h1,h2,h3,h4,h5{font-family:'Playfair Display',serif;line-height:1.3}
    a{text-decoration:none;color:inherit;cursor:pointer}
    button{cursor:pointer;background:none;border:none;font-family:inherit}
    img{max-width:100%;display:block}
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:10px}
    ::selection{background:#3B82F6;color:#000B18}
    :focus-visible{outline:2px solid #3B82F6;outline-offset:2px}

    .light {
      /* Backgrounds & Surfaces */
      --bg: #F8FAFC;      /* Soft, airy light-slate background */
      --surf: #FFFFFF;    /* Pure white for cards to pop against the bg */
      --surfH: #F1F5F9;   /* Gentle slate for hover states */
      --surfA: #E2E8F0;   /* Slightly deeper slate for active/selected items */
      
      /* Typography */
      --txt: #0F172A;     /* Crisp, near-black for maximum readability */
      --mut: #475569;     /* Slate gray for secondary/muted text */
      --faint: #94A3B8;   /* Soft gray for timestamps, meta info, placeholders */
      
      /* Borders */
      --brd: #E2E8F0;     /* Very subtle, elegant card and divider borders */
      --brdS: #CBD5E1;    /* Slightly stronger border for inputs and interactive elements */
    }

    .dark {
      /* Backgrounds & Surfaces */
      --bg: #131110;      
      --surf: #1C1918;    
      --surfH: #292422;   
      --surfA: #161413;   
      
      /* Typography */
      --txt: #F5EFEB;     /* Warm off-white for crisp, comfortable reading */
      --mut: #A89B93;     /* Muted taupe/bronze for secondary text */
      --faint: #F5EFEB;   /* Faint warm gray for timestamps and placeholders */
      
      /* Borders */
      --brd: #2E2825;     /* Subtle, elegant warm brown border */
      --brdS: #4A413C;    /* Stronger metallic bronze-toned border for inputs */
    }

    /* ── KEYFRAMES ── */
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes popIn{0%{opacity:0;transform:scale(.93) translateY(12px)}100%{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shimmer{0%{background-position:-800px 0}100%{background-position:800px 0}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.4)}50%{box-shadow:0 0 0 8px rgba(59,130,246,0)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

    .fu{animation:fadeUp .45s cubic-bezier(.34,1.56,.64,1) both}
    .fu1{animation-delay:.05s}.fu2{animation-delay:.1s}.fu3{animation-delay:.15s}.fu4{animation-delay:.2s}

    .skel{background:linear-gradient(90deg,var(--surfH) 25%,var(--brd) 50%,var(--surfH) 75%);background-size:800px 100%;animation:shimmer 1.4s infinite;border-radius:6px}

   .home-hero{isolation:isolate}
.home-hero-bg{
  position:absolute;inset:0;z-index:-2;
  background-size:cover;background-position:center center;background-repeat:no-repeat;
  pointer-events:none;
  opacity:1;filter:saturate(1.1) contrast(1.05) brightness(.55);
}
.home-hero-overlay{
  position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:
    radial-gradient(ellipse at 50% 30%,rgba(59,130,246,.14) 0%,transparent 60%),
    linear-gradient(180deg,rgba(0,8,20,.35) 0%,rgba(0,8,20,.15) 40%,rgba(0,8,20,.40) 100%);
}
.light .home-hero-bg{
  opacity:1;filter:saturate(1.1) contrast(1.05) brightness(.48);
}
.light .home-hero-overlay{
  background:
    radial-gradient(ellipse at 50% 30%,rgba(59,130,246,.12) 0%,transparent 60%),
    linear-gradient(180deg,rgba(0,8,20,.42) 0%,rgba(0,8,20,.22) 40%,rgba(0,8,20,.42) 100%);
}

    /* ── CARDS ── */
    .card{background:var(--surf);border:1px solid var(--brd);border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:box-shadow .2s,border-color .2s,transform .2s}
    .card:hover{box-shadow:0 8px 24px rgba(0,0,0,.09);border-color:var(--brdS)}

    /* ── PILLS ── */
    .pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;background:var(--surf);border:1px solid var(--brd);color:var(--mut);cursor:pointer;transition:all .18s;white-space:nowrap}
    .pill:hover{background:var(--surfH);color:var(--txt)}
    .pill.on{background:var(--txt);color:var(--surf);border-color:var(--txt)}

    /* ── BUTTONS ── */
    .btn{height:42px;padding:0 20px;border-radius:12px;font-size:14px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:all .18s;border:none}
    .btn-pri{background:#3B82F6;color:#000B18}
    .btn-pri:hover{background:#93C5FD;transform:translateY(-2px);box-shadow:0 6px 20px rgba(59,130,246,.35)}
    .btn-gold{background:linear-gradient(135deg,#3B82F6,#2563EB);color:#000B18;border:none}
    .btn-gold:hover{box-shadow:0 6px 20px rgba(59,130,246,.35);transform:translateY(-2px)}
    .btn-navy{background:#000B18;color:#fff}
    .btn-navy:hover{background:#03264A;transform:translateY(-2px)}
    .btn-out{background:transparent;border:1.5px solid var(--brdS);color:var(--txt)}
    .btn-out:hover{background:var(--surfH)}
    .btn-ghost{background:transparent;color:var(--mut)}
    .btn-ghost:hover{color:var(--txt);background:var(--surfH)}

    /* ── INPUTS ── */
    .inp{width:100%;height:46px;padding:0 14px;border-radius:12px;border:1.5px solid var(--brdS);background:var(--surfH);color:var(--txt);font-size:14px;font-family:inherit;transition:all .18s}
    .inp:focus{background:var(--surf);border-color:#3B82F6;box-shadow:0 0 0 4px rgba(59,130,246,.15);outline:none}
    .inp::placeholder{color:var(--faint)}
    textarea.inp{height:auto;min-height:100px;padding:12px 14px;resize:vertical;line-height:1.5}
    select.inp{appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}

    /* ── TAGS ── */
    .tag{padding:4px 12px;border-radius:6px;background:var(--surfA);color:var(--mut);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;display:inline-block}
    .tag:hover{background:rgba(59,130,246,.15);color:#3B82F6}

    /* ── MODAL ── */
    .overlay{position:fixed;inset:0;background:rgba(6,18,32,.65);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeUp .2s ease}
    .modal{background:var(--surf);width:100%;border-radius:20px;box-shadow:0 25px 60px rgba(0,0,0,.25);overflow:hidden;animation:popIn .35s cubic-bezier(.34,1.56,.64,1);border:1px solid rgba(255,255,255,.1);max-height:min(90vh,calc(100dvh - 32px));overflow-y:auto}
    @media(max-width:500px){
      .modal{border-radius:16px 16px 0 0}
      .overlay:not(.auth-modal-overlay){align-items:flex-end;padding:0}
    }

    @media(max-width:700px){ .bottom-nav{ display:none !important } }

    /* ── TOAST ── */
    .toast{padding:12px 22px;border-radius:30px;font-size:14px;font-weight:600;display:flex;align-items:center;gap:10px;box-shadow:0 8px 24px rgba(0,0,0,.15);animation:popIn .3s cubic-bezier(.34,1.56,.64,1);pointer-events:none}

    /* ── NAV TAB ── */
    .nav-tab{display:flex;align-items:center;gap:8px;padding:10px 16px;border-radius:12px;font-size:14px;font-weight:600;color:var(--mut);cursor:pointer;transition:all .18s;background:none;border:none;font-family:inherit;white-space:nowrap}
    .nav-tab:hover{background:var(--surfH);color:var(--txt)}
    .nav-tab.on{background:#000B18;color:#fff}
    .dark .nav-tab.on{background:#3B82F6;color:#000B18}

    /* ── TOPBAR ── */
    .topbar{position:fixed;top:0;left:0;right:0;z-index:1000;height:68px;background:rgba(0,11,24,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;padding:0 24px;gap:12px}
    .logo-ic{width:50px;height:45px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:13px;flex-shrink:0}
    .ib{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;background:rgba(255,255,255,.07);cursor:pointer;transition:all .18s;border:none;position:relative;flex-shrink:0}
    .ib:hover{background:rgba(255,255,255,.15)}
    .av{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;cursor:pointer;transition:all .18s;flex-shrink:0;border:2px solid transparent}
    .av:hover{border-color:#3B82F6}

    /* ── APP TOPBAR (responsive height) ── */
    .app-topbar { height: 56px !important; overflow: visible;  }
    .app-main   { padding-top: 66px; }

    @media(max-width:700px) {
      .app-topbar { height: 52px !important; }
      .app-main   { padding-top: 52px; }
    }

    /* ── RESPONSIVE VISIBILITY UTILITIES ── */
    @media(min-width:701px){ .hide-desktop{display:none !important} }
    @media(max-width:700px){ .hide-mobile{display:none !important} }
    @media(max-width:480px){ .hide-xs{display:none !important} }
    @media(max-width:580px){ .hide-sm{display:none !important} }

    /* ── SIDEBARS ── */
    .lsb{width:250px;flex-shrink:0;position:sticky;top:100px;height:max-content}
    .lsb-topics{max-height:calc(100vh - 160px);overflow-y:auto;overscroll-behavior:contain}
    .lsb-topics::-webkit-scrollbar{width:3px}
    .lsb-topics::-webkit-scrollbar-thumb{background:rgba(59,130,246,.3);border-radius:10px}
    @media(max-width:1050px){.lsb{display:none}}
    .rsb{width:280px;flex-shrink:0;position:sticky;top:100px;height:max-content}
    @media(max-width:1200px){.rsb{display:none}}

    /* Mobile-only category picker */
    .mob-only-cat{display:none}
    @media(max-width:1050px){.mob-only-cat{display:block}}

    /* ── QUESTION CARD ── */
    .q-card{background:var(--surf);border:1px solid var(--brd);border-radius:16px;padding:22px;margin-bottom:14px;box-shadow:0 1px 3px rgba(0,0,0,.05);cursor:pointer;transition:all .2s;position:relative;z-index:0}
    .q-card:hover{box-shadow:0 10px 28px rgba(0,0,0,.1);border-color:var(--brdS);transform:translateY(-2px)}

    /* ── STAFF CARD ── */
    .sc{background:var(--surf);border:1px solid var(--brd);border-radius:18px;overflow:hidden;text-align:center;transition:all .22s;cursor:pointer}
    .sc:hover{transform:translateY(-5px);box-shadow:0 12px 30px rgba(0,0,0,.12);border-color:#3B82F6}

    /* ── STAR RATING ── */
    .star{color:#3B82F6;font-size:18px}
    .star.empty{color:var(--brd)}

    /* ── STEP INDICATOR ── */
    .step-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;transition:all .3s;flex-shrink:0}

    /* ── MOBILE RESPONSIVE ── */
    @media(max-width:700px){
      .topbar{padding:0 12px;gap:8px;height:56px}
      .hide-m{display:none !important}
    }

    /* ── VOTE BUTTONS ── */
    @keyframes votePop{0%{transform:scale(1)}40%{transform:scale(1.4)}100%{transform:scale(1)}}
    .vote-btn{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:none;cursor:pointer;background:transparent;transition:all .15s;font-size:16px}
    .vote-btn:hover{background:var(--surfH)}
    .vote-btn.up.active{color:#F97316;animation:votePop .25s ease}
    .vote-btn.down.active{color:#6366F1;animation:votePop .25s ease}
    .vote-score{font-size:13px;font-weight:800;min-width:28px;text-align:center;transition:color .2s;line-height:1}

    /* ── SEARCH DROPDOWN ── */
    @keyframes dropIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
    .sch-drop{position:absolute;top:calc(100% + 8px);left:0;right:0;background:var(--surf);border:1px solid var(--brd);border-radius:14px;box-shadow:0 20px 40px rgba(0,0,0,.18);z-index:9999;overflow:hidden;animation:dropIn .2s ease}

    /* ── FAB ── */
    @keyframes fabIn{from{opacity:0;transform:scale(.7) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .fab{position:fixed;bottom:82px;right:20px;z-index:998;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#3B82F6,#2563EB);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(59,130,246,.45);animation:fabIn .4s cubic-bezier(.34,1.56,.64,1);transition:transform .18s,box-shadow .18s}
    .fab:hover{transform:scale(1.1);box-shadow:0 10px 32px rgba(59,130,246,.55)}
    .fab:active{transform:scale(.95)}

    /* ── BACK TO TOP ── */
    @keyframes b2tIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    .b2t{position:fixed;bottom:148px;right:22px;z-index:997;width:40px;height:40px;border-radius:50%;background:var(--surf);border:1px solid var(--brdS);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.12);animation:b2tIn .3s ease;transition:all .18s}
    .b2t:hover{background:var(--surfH);transform:translateY(-2px)}

    /* ── BOOKMARK ── */
    @keyframes bookmarkPop{0%{transform:scale(1)}50%{transform:scale(1.35)}100%{transform:scale(1)}}
    .bm-active{animation:bookmarkPop .25s ease;color:#3B82F6 !important}

    /* ── REACTION PILL ── */
    .rxn{padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid var(--brd);background:transparent;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;gap:5px;color:var(--mut)}
    .rxn:hover{border-color:var(--brdS);background:var(--surfH)}
    .rxn.on{border-color:rgba(59,130,246,.5);background:rgba(59,130,246,.1);color:#3B82F6}

    /* ── READING TIME ── */
    .rt-badge{font-size:11px;color:var(--faint);display:inline-flex;align-items:center;gap:3px}

    /* ── MOBILE PAGE BODY ── */
    @media(max-width:700px){
      .page-body{padding-top:64px !important;padding-bottom:90px !important;padding-left:12px !important;padding-right:12px !important;overflow-x:hidden !important}
      .q-card{border-radius:14px !important;overflow:hidden !important}
      .q-card h3{font-size:14px !important;word-break:break-word;overflow-wrap:break-word}
      .q-card p{word-break:break-word;overflow-wrap:break-word;font-size:12px !important}
      .vote-col{padding:10px 8px !important;min-width:36px}
      .vote-btn{width:24px !important;height:24px !important}
      .vote-score{font-size:11px !important;min-width:20px !important}
      .post-content{padding:12px 12px !important}
      .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .stat-value { font-size: 27px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .mob-only-cat { max-width: 100%; margin: 0 auto; padding-top: 10px; }
      .cat-trigger { max-width: 100%; min-width: 0; font-size: 13px !important; padding: 8px 12px !important; }
      .cat-drop { min-width: 0; width: 100%; left: 0; right: 0; }
      .pill { padding: 5px 11px !important; font-size: 11px !important; border-radius: 14px !important; }
      .page-pad { padding-left: 12px !important; padding-right: 12px !important; }
      .feed-wrap, .staff-wrap, .media-wrap, .apply-wrap {padding: 12px 12px 90px !important;}
      .q-card-actions{flex-wrap:nowrap !important;overflow-x:auto;padding-bottom:2px;gap:4px !important;-webkit-overflow-scrolling:touch}
      .q-card-actions button{white-space:nowrap;flex-shrink:0}
      .tags-row{flex-wrap:nowrap !important;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px}
      .pills-row{flex-wrap:nowrap !important;overflow-x:auto;-webkit-overflow-scrolling:touch}
      .cat-trigger{width:100%;justify-content:space-between}
      .feed-filter-bar{flex-direction:column;align-items:stretch !important;gap:10px !important}
    }

    /* ── CSS @property for animated border ── */
    @property --rot {
      syntax: "<angle>";
      inherits: false;
      initial-value: 0deg;
    }
    @keyframes authSpin { 0%{--rot:0deg} 100%{--rot:360deg} }

    /* ── AUTH MODAL ── */
    .auth-modal-overlay{padding:16px !important;align-items:center !important}

    .auth-shadow-wrap{
      filter:drop-shadow(0 20px 70px rgba(0,0,0,.6));
      border-radius:32px;
      flex-shrink:0;
    }
    @media(max-width:650px){
      .auth-shadow-wrap{border-radius:20px;width:min(96vw,460px)}
    }

    .auth-outer {
      position:relative;
      width:min(880px,96vw);
      height:min(566px,calc(100dvh - 80px));
      background:repeating-conic-gradient(from var(--rot), #3B82F6 0%,#3B82F6 5%,transparent 5%,transparent 40%,#3B82F6 50%);
      border-radius:32px;
      animation:authSpin 4s linear infinite;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
    }
    .auth-outer::before {
      content:'';position:absolute;width:100%;height:100%;
      background:repeating-conic-gradient(from var(--rot), #03264A 0%,#03264A 5%,transparent 5%,transparent 40%,#03264A 50%);
      border-radius:32px;
      animation:authSpin 4s linear infinite;
      animation-delay:-1s;
    }
    .auth-outer::after {
      content:'';position:absolute;inset:4px;
      background:#0A1628;
      border-radius:28px;
      border:7px solid #000B18;
    }

    /* Auth inner container */
    .auth-inner {
      position:absolute;inset:6px;border-radius:26px;
      overflow:hidden;background:var(--surf);
      z-index:1;
    }

    /* Form panels */
    .auth-form-panel {
      position:absolute;right:0;width:50%;height:100%;
      display:flex;align-items:center;justify-content:center;
      flex-direction:column;padding:36px 32px;text-align:center;
      background:var(--surf);color:var(--txt);z-index:1;
      transition:right .6s ease-in-out 1.2s,visibility 0s 1s;
      overflow-y:auto;
    }
    .auth-form-panel.auth-register{visibility:hidden}
    .auth-outer.active .auth-form-panel{right:50%}
    .auth-outer.active .auth-form-panel.auth-register{visibility:visible}

    /* Toggle sliding overlay
       pointer-events:none lets clicks pass through to the form panels below.
       Each .auth-toggle-panel re-enables pointer events for its own clickable area. */
    .auth-toggle-box{
      position:absolute;width:100%;height:100%;overflow:hidden;z-index:2;
      pointer-events:none;   /* <-- KEY FIX: stop blocking form inputs */
    }
    .auth-toggle-box::before {
      content:'';position:absolute;
      left:-250%;width:300%;height:100%;
      background:linear-gradient(135deg,#000B18 0%,#03264A 50%,#2563EB 150%);
      border-radius:150px;z-index:2;
      transition:left 1.8s ease-in-out;
      pointer-events:none;
    }
    .auth-outer.active .auth-toggle-box::before{left:50%}
    .auth-toggle-panel {
      position:absolute;width:50%;height:100%;color:#fff;
      display:flex;flex-direction:column;justify-content:center;align-items:center;
      text-align:center;padding:36px 28px;z-index:3;transition:.6s ease-in-out;
      pointer-events:all;   /* re-enable clicks on the actual toggle panels */
    }
    .auth-toggle-panel.auth-toggle-left{left:0;transition-delay:1.2s}
    .auth-outer.active .auth-toggle-panel.auth-toggle-left{left:-50%;transition-delay:.6s}
    .auth-toggle-panel.auth-toggle-right{right:-50%;transition-delay:.6s}
    .auth-outer.active .auth-toggle-panel.auth-toggle-right{right:0;transition-delay:1.2s}

    /* Auth close button */
    .auth-close {
      position:absolute;top:14px;right:14px;z-index:30;
      width:32px;height:32px;border-radius:50%;
      background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.2);
      cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;
      transition:all .18s;
      pointer-events:all;
    }
    .auth-close:hover{background:rgba(255,255,255,.24)}

    /* Auth input/button helpers */
    .auth-inp {
      width:100%;padding:12px 18px;border-radius:9px;border:none;
      background:var(--surfH);font-size:14px;color:var(--txt);
      font-family:inherit;transition:all .18s;outline:none;
      position:relative;z-index:2;   /* sit above the toggle-box overlay */
    }
    .auth-inp:focus{background:var(--surf);box-shadow:0 0 0 2px rgba(59,130,246,.5)}
    .auth-inp::placeholder{color:var(--faint)}
    .auth-btn {
      width:100%;padding:13px;border-radius:9px;font-size:15px;font-weight:700;
      font-family:inherit;cursor:pointer;border:none;
      background:#000B18;color:#fff;transition:all .18s;
      display:flex;align-items:center;justify-content:center;gap:8px;
      position:relative;z-index:2;
    }
    .auth-btn:hover{background:#03264A;transform:translateY(-1px)}
    .auth-btn.gold-btn{background:linear-gradient(135deg,#3B82F6,#2563EB);color:#000B18}
    .auth-btn.gold-btn:hover{box-shadow:0 6px 20px rgba(59,130,246,.4)}
    .auth-toggle-btn {
      padding:11px 30px;border-radius:24px;border:2px solid rgba(255,255,255,.65);
      background:transparent;color:#fff;font-size:14px;font-weight:700;
      font-family:inherit;cursor:pointer;transition:all .18s;
      pointer-events:all;
    }
    .auth-toggle-btn:hover{background:rgba(255,255,255,.12);border-color:#fff}
    .auth-social-btn {
      width:40px;height:40px;border-radius:9px;border:1.5px solid var(--brdS);
      background:transparent;font-size:14px;font-weight:700;cursor:pointer;
      color:var(--txt);font-family:inherit;transition:all .15s;display:inline-flex;
      align-items:center;justify-content:center;
      position:relative;z-index:2;
    }
    .auth-social-btn:hover{border-color:#3B82F6;background:rgba(59,130,246,.08)}

    /* ── AUTH MODAL — MOBILE (stacked vertical layout) ── */
    @media(max-width:650px){
      .auth-outer{
        width:min(96vw,460px);
        height:min(580px,calc(100dvh - 64px));
        border-radius:20px;
      }
      .auth-outer::before,.auth-outer::after{border-radius:20px}
      .auth-outer::after{inset:3px;border-radius:17px;border-width:5px}
      .auth-inner{inset:4px;border-radius:16px}

      .auth-form-panel{
        width:100%;height:65%;
        bottom:0;top:auto;right:0 !important;
        transition:bottom .6s ease-in-out 1.2s,visibility 0s 1s;
        padding:20px 24px;overflow-y:auto;
      }
      .auth-outer.active .auth-form-panel{bottom:36%}

      .auth-toggle-box::before{
        left:0;top:-270%;width:100%;height:300%;
        border-radius:20vw;
        transition:top 1.8s ease-in-out;
      }
      .auth-outer.active .auth-toggle-box::before{left:0;top:64%}

      .auth-toggle-panel{width:100%;height:36%}
      .auth-toggle-panel.auth-toggle-left{top:0;left:0;transition-delay:1.2s}
      .auth-outer.active .auth-toggle-panel.auth-toggle-left{top:-36%;transition-delay:.6s}
      .auth-toggle-panel.auth-toggle-right{right:0;top:auto;bottom:-36%;transition-delay:.6s}
      .auth-outer.active .auth-toggle-panel.auth-toggle-right{bottom:0;transition-delay:1.2s}
    }

    @media(max-width:400px){
      .auth-outer{height:min(560px,calc(100dvh - 48px))}
      .auth-toggle-panel{padding:16px}
      .auth-toggle-panel h2{font-size:18px !important}
      .auth-toggle-panel p{font-size:12px !important}
      .auth-form-panel{padding:14px 16px}
    }

    /* ── APPLY PAGE BORDER ── */
    .apply-border-wrap{
      position:relative;border-radius:22px;
      background:repeating-conic-gradient(from var(--rot),#3B82F6 0%,#3B82F6 5%,transparent 5%,transparent 40%,#3B82F6 50%);
      animation:authSpin 6s linear infinite;padding:3px;
      box-shadow:0 0 40px rgba(59,130,246,.12);
    }
    .apply-border-wrap::before{
      content:'';position:absolute;inset:0;border-radius:22px;
      background:repeating-conic-gradient(from var(--rot),#03264A 0%,#03264A 5%,transparent 5%,transparent 40%,#03264A 50%);
      animation:authSpin 6s linear infinite;animation-delay:-2s;
    }
    .apply-border-inner{position:relative;z-index:1;background:var(--surf);border-radius:19px;overflow:hidden}

    /* ── MOBILE DRAWER ── */
    .mob-drawer-overlay{
      position:fixed;inset:0;z-index:1500;
      background:rgba(0,0,0,.55);backdrop-filter:blur(5px);
      animation:fadeUp .18s ease;
    }
    .mob-drawer{
      position:absolute;top:0;right:0;width:288px;height:100%;
      background:var(--surf);border-left:1px solid var(--brd);
      box-shadow:-24px 0 60px rgba(0,0,0,.28);
      display:flex;flex-direction:column;
      animation:slideInRight .3s cubic-bezier(.34,1.1,.64,1);
    }
    @keyframes slideInRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
    .mob-drawer-item{
      display:flex;align-items:center;gap:14px;
      padding:14px 20px;font-size:15px;font-weight:600;
      color:var(--txt);background:none;border:none;cursor:pointer;
      font-family:inherit;transition:all .15s;text-align:left;width:100%;
    }
    .mob-drawer-item:hover{background:var(--surfH)}
    .mob-drawer-item.on{color:#3B82F6;background:rgba(59,130,246,.08)}

    /* ── CATEGORY PICKER ── */
    @keyframes catDrop{from{opacity:0;transform:translateY(-8px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
    .cat-trigger{
      display:inline-flex;align-items:center;gap:10px;
      padding:10px 16px;border-radius:14px;
      border:1.5px solid var(--brdS);background:var(--surf);
      color:var(--txt);font-size:14px;font-weight:600;
      cursor:pointer;font-family:inherit;transition:all .18s;
      white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.06);
    }
    .cat-trigger:hover{border-color:#3B82F6;background:rgba(59,130,246,.05)}
    .cat-trigger.open{border-color:#3B82F6;box-shadow:0 0 0 3px rgba(59,130,246,.15)}

    .cat-drop{
      position:absolute;top:calc(100% + 8px);left:0;min-width:240px;
      background:var(--surf);border:1.5px solid var(--brdS);
      border-radius:16px;box-shadow:0 12px 50px rgba(0,0,0,.22);
      z-index:9999;overflow:hidden;
      animation:catDrop .2s cubic-bezier(.34,1.1,.64,1);
    }
    .cat-drop-inner{max-height:320px;overflow-y:auto;padding:6px}
    .cat-drop-inner::-webkit-scrollbar{width:4px}
    .cat-drop-inner::-webkit-scrollbar-thumb{background:rgba(59,130,246,.3);border-radius:10px}
    .cat-item{
      display:flex;align-items:center;gap:10px;
      padding:10px 12px;border-radius:10px;
      border:none;background:transparent;
      color:var(--txt);font-size:14px;font-weight:500;
      cursor:pointer;font-family:inherit;
      transition:all .15s;width:100%;text-align:left;
    }
    .cat-item:hover{background:var(--surfH)}
    .cat-item.on{background:rgba(59,130,246,.12);color:#3B82F6;font-weight:700}

    /* ── SHARE FLASH ── */
    @keyframes shareFlash{0%{background:rgba(16,185,129,.2)}100%{background:transparent}}
  `}</style>
);

export default GlobalStyle;
