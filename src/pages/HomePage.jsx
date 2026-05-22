import T from '../tokens';
import Ic from '../components/Ic';
import { DEPTS } from '../data';
import bgImg from '../images/bg.png';

function HomePage({onNav}) {
  const stats = [["3,200+","Questions Asked"],["12,000+","Answers Given"],["450","Verified Staff"],["8","Faculties Covered"]];
  const features = [
    {ic:"sparkle",title:"AI-Powered Answers",desc:"Get instant preliminary answers from ATBUb AI, then verify with real lecturers and peers."},
    {ic:"shield",title:"Verified Staff",desc:"All lecturer accounts are verified against ATBU HR records — no impersonation."},
    {ic:"trending",title:"Trending Topics",desc:"See what the ATBU community is discussing right now, filtered by faculty."},
    {ic:"globe",title:"Faculty Coverage",desc:"From Computing to Agriculture — all 8 faculties are represented on ATBUConnect."},
  ];
  return (
    <div>
      {/* Hero */}
      <div style={{textAlign:"center", padding:"40px 20px 56px", position:"relative", overflow:"hidden"}} className="home-hero fu">
        {/* Campus bg image — higher opacity so it shows in both light and dark modes */}
        <div className="home-hero-bg" style={{backgroundImage:`url(${bgImg})`}}/>
        <div className="home-hero-overlay"/>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:20,background:"rgba(59,130,246,.12)",border:"1px solid rgba(59,130,246,.25)",marginBottom:20,fontSize:13,fontWeight:600,color:T.gold,position:"relative"}}>
          <div style={{width:8,height:8,background:T.gold,borderRadius:"50%",animation:"pulse 1.5s infinite"}}/>
          Live · 842 students online now
        </div>
        <h1 style={{fontSize:"clamp(28px,5vw,52px)",lineHeight:1.15,marginBottom:16,maxWidth:700,margin:"0 auto 16px",position:"relative"}}>
          The Official Network Hub for <span style={{color:T.gold,fontStyle:"italic"}}>ATBU Students</span>
        </h1>
        <p style={{fontSize:17,color:"var(--mut)",maxWidth:540,margin:"0 auto 32px",lineHeight:1.7,position:"relative"}}>
          Ask questions, get verified answers from lecturers, and connect with the Abubakar Tafawa Balewa University community.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",position:"relative"}}>
          <button className="btn btn-pri" style={{height:48,padding:"0 28px",fontSize:15}} onClick={()=>onNav("feed")}>
            <Ic n="feed" s={17} c="#000B18"/>Browse Questions
          </button>
          <button className="btn btn-out" style={{height:48,padding:"0 28px",fontSize:15}} onClick={()=>onNav("staff")}>
            <Ic n="users" s={17}/>Meet the Staff
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:12, padding:16, marginBottom:48}}>
        {stats.map(([v,l]) => (
          <div key={l} className="card" style={{padding:"20px 12px", textAlign:"center", overflow:"hidden"}}>
            <div className="stat-value" style={{fontSize:"clamp(20px,4vw,30px)", fontWeight:700, fontFamily:"'Playfair Display',serif", color:T.gold, marginBottom:6, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{v}</div>
            <div style={{fontSize:"clamp(11px,2.5vw,13px)", color:"var(--mut)", lineHeight:1.4}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <h2 style={{fontSize:22,textAlign:"center", marginBottom:24}} className="fu fu2">Why ATBUConnect?</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:18, padding: 16, marginBottom:48}} className="fu fu2">
        {features.map(({ic,title,desc})=>(
          <div key={title} className="card" style={{padding:24}}>
            <div style={{width:46,height:46,background:"rgba(59,130,246,.12)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14,color:T.gold}}><Ic n={ic} s={22} c={T.gold}/></div>
            <h4 style={{fontSize:16,marginBottom:8}}>{title}</h4>
            <p style={{fontSize:14,color:"var(--mut)",lineHeight:1.65}}>{desc}</p>
          </div>
        ))}
      </div>

      <section style={{position:"relative",overflow:"hidden"}}>
        <div style={{
          position:"absolute",inset:0,
        
          backgroundSize:"cover",backgroundPosition:"center",
          opacity:0.1,pointerEvents:"none",
        }}/>

        {/* Departments */}
        <h2 style={{fontSize:22,marginBottom:16,padding:16,position:"relative"}} className="fu fu3">Browse by Faculty</h2>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(160px,1fr))",
          gap:10, padding:16, marginBottom:48, position:"relative",
        }} className="fu fu3">
          {DEPTS.map(d=>(
            <button key={d.name} onClick={()=>onNav("feed")}
              style={{
                display:"flex",alignItems:"center",gap:9,
                padding:"12px 16px",borderRadius:14,
                background:"var(--surf)",border:"1px solid var(--brd)",
                cursor:"pointer",fontSize:14,fontWeight:600,
                color:"var(--txt)",transition:"all .18s",fontFamily:"inherit",
                width:"100%",textAlign:"left",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=d.color;e.currentTarget.style.color=d.color;e.currentTarget.style.background="var(--surfH)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.color="var(--txt)";e.currentTarget.style.background="var(--surf)";}}>
              <span style={{width:10,height:10,borderRadius:"50%",background:d.color,flexShrink:0}}/>
              <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span>
              <span style={{fontSize:11,color:"var(--faint)",flexShrink:0}}>·{d.count}</span>
            </button>
          ))}
        </div>

        {/* CTA */}
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
