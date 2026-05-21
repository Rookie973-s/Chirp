import { QUESTIONS, STAFF } from '../data';

/* ── LIVE SEARCH DROPDOWN ── */
function SearchDropdown({query,onNavigate,onClose}) {
  const qHits = QUESTIONS.filter(q=>
    q.title.toLowerCase().includes(query.toLowerCase()) ||
    q.tags.some(t=>t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0,4);
  const sHits = STAFF.filter(s=>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.dept.toLowerCase().includes(query.toLowerCase())
  ).slice(0,3);

  if(!qHits.length && !sHits.length) return (
    <div className="sch-drop" style={{padding:"20px",textAlign:"center",color:"var(--faint)",fontSize:13}}>
      No results for "<strong style={{color:"var(--txt)"}}>{query}</strong>"
    </div>
  );

  return (
    <div className="sch-drop" style={{background:"#121B2B",color:"#fff"}}>
      {qHits.length>0 && (
        <>
          <div style={{padding:"10px 16px 6px",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"rgba(255,255,255,.35)"}}>Questions</div>
          {qHits.map(q=>(
            <button key={q.id} onClick={()=>{onNavigate(q);onClose();}}
              style={{width:"100%",padding:"10px 16px",display:"flex",gap:10,alignItems:"flex-start",background:"none",border:"none",cursor:"pointer",textAlign:"left",transition:"background .12s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.07)"}
              onMouseLeave={e=>e.currentTarget.style.background="none"}>
              <span style={{marginTop:2,flexShrink:0,opacity:.5}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#fff",lineHeight:1.4,marginBottom:2}}>{q.title}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{q.dept} · {q.time}</div>
              </div>
            </button>
          ))}
        </>
      )}
      {sHits.length>0 && (
        <>
          <div style={{padding:"10px 16px 6px",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"rgba(255,255,255,.35)",borderTop:qHits.length?"1px solid rgba(255,255,255,.07)":undefined}}>Staff</div>
          {sHits.map(s=>(
            <button key={s.id} onClick={()=>onClose()}
              style={{width:"100%",padding:"10px 16px",display:"flex",gap:10,alignItems:"center",background:"none",border:"none",cursor:"pointer",textAlign:"left",transition:"background .12s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.07)"}
              onMouseLeave={e=>e.currentTarget.style.background="none"}>
              <div style={{width:32,height:32,borderRadius:"50%",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:11,flexShrink:0}}>{s.av}</div>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{s.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{s.role}</div>
              </div>
            </button>
          ))}
        </>
      )}
      <div style={{padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,.07)"}}>
        <button onClick={onClose} style={{fontSize:12,color:"rgba(59,130,246,.8)",fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>
          Press Enter to search all results →
        </button>
      </div>
    </div>
  );
}

export default SearchDropdown;
