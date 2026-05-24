import { useState, useEffect } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';
import { DEPTS } from '../data';
import bgImg from '../images/bg.png';

// ── Hero carousel slides ──────────────────────────────────────────
// Slot 0 is your local campus bg image.
// Replace the Unsplash URLs (slots 1-3) with any images you prefer.
const HERO_SLIDES = [
  bgImg,
  "https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80",
];

function HomePage({onNav}) {
  const [slide, setSlide] = useState(0);

  // Auto-advance every 5 s
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setSlide(s => (s + 1) % HERO_SLIDES.length);

  const stats = [
    ["3,200+","Questions Asked"],
    ["12,000+","Answers Given"],
    ["450","Verified Staff"],
    ["8","Faculties Covered"],
  ];

  const features = [
    {ic:"sparkle",title:"AI-Powered Answers",   desc:"Get instant preliminary answers from ATBUb AI, then verify with real lecturers and peers."},
    {ic:"shield", title:"Verified Staff",        desc:"All lecturer accounts are verified against ATBU HR records — no impersonation."},
    {ic:"trending",title:"Trending Topics",      desc:"See what the ATBU community is discussing right now, filtered by faculty."},
    {ic:"globe",  title:"Faculty Coverage",      desc:"From Computing to Agriculture — all 8 faculties are represented on ATBUConnect."},
  ];

  return (
    <div>

      {/* ── HERO ── */}
      <div
        style={{
          textAlign:"center", padding:"60px 20px 80px",
          position:"relative", marginTop:-1, minHeight:480,
        }}
        className="home-hero fu"
      >

        {/* Cross-fading background slides */}
        {HERO_SLIDES.map((src, i) => (
          <div
            key={i}
            className="home-hero-bg"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === slide ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              // Each slide is stacked at the same z-index via the class;
              // only the active one is visible.
            }}
          />
        ))}
        <div className="home-hero-overlay"/>

        {/* ── Left arrow ── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            position:"absolute", left:16, top:"50%", transform:"translateY(-50%)",
            width:38, height:38, borderRadius:"50%", zIndex:10,
            background:"rgba(0,0,0,.45)", border:"1px solid rgba(255,255,255,.2)",
            color:"#fff", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            backdropFilter:"blur(6px)", transition:"background .18s",
          }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(59,130,246,.65)"}
          onMouseLeave={e => e.currentTarget.style.background="rgba(0,0,0,.45)"}
        >
          <Ic n="arrowL" s={16}/>
        </button>

        {/* ── Right arrow ── */}
        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            position:"absolute", right:16, top:"50%", transform:"translateY(-50%)",
            width:38, height:38, borderRadius:"50%", zIndex:10,
            background:"rgba(0,0,0,.45)", border:"1px solid rgba(255,255,255,.2)",
            color:"#fff", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            backdropFilter:"blur(6px)", transition:"background .18s",
          }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(59,130,246,.65)"}
          onMouseLeave={e => e.currentTarget.style.background="rgba(0,0,0,.45)"}
        >
          <Ic n="arrow" s={16}/>
        </button>

        {/* ── Dot indicators ── */}
        <div style={{
          position:"absolute", bottom:18, left:"50%", transform:"translateX(-50%)",
          display:"flex", gap:8, zIndex:10,
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === slide ? 26 : 8,
                height:8, borderRadius:4, padding:0, border:"none", cursor:"pointer",
                background: i === slide ? "#3B82F6" : "rgba(255,255,255,.38)",
                boxShadow: i === slide ? "0 0 10px rgba(59,130,246,.7)" : "none",
                transition:"all .4s cubic-bezier(.34,1.1,.64,1)",
              }}
            />
          ))}
        </div>

        {/* ── Hero content ── */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",
          borderRadius:20,background:"rgba(0,0,0,.4)",
          border:"1px solid rgba(59,130,246,.35)",
          marginBottom:20,fontSize:13,fontWeight:600,color:"#93C5FD",
          position:"relative",backdropFilter:"blur(8px)"}}>
          <div style={{width:8,height:8,background:"#3B82F6",borderRadius:"50%",animation:"pulse 1.5s infinite"}}/>
          Live · 842 students online now
        </div>

        <h1 style={{
          fontSize:"clamp(28px,5vw,52px)", lineHeight:1.15,
          marginBottom:16, maxWidth:700, margin:"0 auto 16px",
          position:"relative", color:"#ffffff",
          textShadow:"0 2px 24px rgba(0,0,0,.9), 0 1px 4px rgba(0,0,0,.95)",
        }}>
          The Official Network Hub for{" "}
          <span style={{color:"#60A5FA",fontStyle:"italic"}}>ATBU Students</span>
        </h1>

        <p style={{
          fontSize:17, color:"rgba(255,255,255,.88)",
          maxWidth:540, margin:"0 auto 32px", lineHeight:1.7,
          position:"relative", textShadow:"0 1px 8px rgba(0,0,0,.8)",
        }}>
          Ask questions, get verified answers from lecturers, and connect with
          the Abubakar Tafawa Balewa University community.
        </p>

        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",position:"relative"}}>
          <button className="btn btn-pri" style={{height:48,padding:"0 28px",fontSize:15}} onClick={()=>onNav("feed")}>
            <Ic n="trending" s={17} c="#000B18"/>Browse Questions
          </button>
          <button className="btn btn-out" style={{height:48,padding:"0 28px",fontSize:15,color:"#ffffff",borderColor:"rgba(255,255,255,.5)"}} onClick={()=>onNav("staff")}>
            <Ic n="users" s={17} c="#ffffff"/>Meet the Staff
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,padding:16,marginBottom:48}}>
        {stats.map(([v,l]) => (
          <div key={l} className="card" style={{padding:"20px 12px",textAlign:"center",overflow:"hidden"}}>
            <div className="stat-value" style={{fontSize:"clamp(20px,4vw,30px)",fontWeight:700,fontFamily:"'Playfair Display',serif",color:T.gold,marginBottom:6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</div>
            <div style={{fontSize:"clamp(11px,2.5vw,13px)",color:"var(--mut)",lineHeight:1.4}}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <h2 style={{fontSize:22,textAlign:"center",marginBottom:24}} className="fu fu2">Why ATBUConnect?</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:18,padding:16,marginBottom:48}} className="fu fu2">
        {features.map(({ic,title,desc})=>(
          <div key={title} className="card" style={{padding:24}}>
            <div style={{width:46,height:46,background:"rgba(59,130,246,.12)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><Ic n={ic} s={22} c={T.gold}/></div>
            <h4 style={{fontSize:16,marginBottom:8}}>{title}</h4>
            <p style={{fontSize:14,color:"var(--mut)",lineHeight:1.65}}>{desc}</p>
          </div>
        ))}
      </div>

      {/* ── DEPARTMENTS ── */}
      <section style={{position:"relative",overflow:"hidden"}}>
        <h2 style={{fontSize:22,marginBottom:16,padding:16,position:"relative"}} className="fu fu3">Browse by Faculty</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,padding:16,marginBottom:48,position:"relative"}} className="fu fu3">
          {DEPTS.map(d=>(
            <button key={d.name} onClick={()=>onNav("feed")}
              style={{display:"flex",alignItems:"center",gap:9,padding:"12px 16px",borderRadius:14,background:"var(--surf)",border:"1px solid var(--brd)",cursor:"pointer",fontSize:14,fontWeight:600,color:"var(--txt)",transition:"all .18s",fontFamily:"inherit",width:"100%",textAlign:"left"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=d.color;e.currentTarget.style.color=d.color;e.currentTarget.style.background="var(--surfH)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.color="var(--txt)";e.currentTarget.style.background="var(--surf)";}}>
              <span style={{width:10,height:10,borderRadius:"50%",background:d.color,flexShrink:0}}/>
              <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span>
              <span style={{fontSize:11,color:"var(--faint)",flexShrink:0}}>·{d.count}</span>
            </button>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{padding:16,position:"relative"}}>
          <div style={{background:`linear-gradient(135deg,${T.navy},${T.navyL})`,borderRadius:20,padding:"40px 32px",textAlign:"center",color:"#fff",position:"relative",overflow:"hidden"}} className="fu fu4">
            <div style={{position:"absolute",top:-60,right:-60,width:160,height:160,background:"rgba(59,130,246,.15)",borderRadius:"50%",filter:"blur(30px)"}}/>
            <div style={{animation:"float 3s ease-in-out infinite",display:"inline-block",marginBottom:16}}><Ic n="cap" s={44} c={T.gold}/></div>
            <h2 style={{fontSize:26,color:"#fff",marginBottom:12}}>Are you ATBU Staff?</h2>
            <p style={{color:"rgba(255,255,255,.75)",fontSize:15,marginBottom:24,maxWidth:460,margin:"0 auto 24px"}}>Apply for a verified staff account and help shape the next generation of ATBU graduates.</p>
            <button className="btn btn-pri" style={{height:48,padding:"0 32px",fontSize:15}} onClick={()=>onNav("apply")}>
              <Ic n="award" s={16} c="#000B18"/>Apply for Staff Access
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;