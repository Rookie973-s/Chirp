import { useState } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';

/* ── AI ASK MODAL (from "Ask" button in search) ── */
function AiAskModal({onClose}) {
  const [q,setQ] = useState("");
  const [loading,setLoading] = useState(false);
  const [ans,setAns] = useState("");
  const ask = async()=>{
    if(!q.trim()) return;
    setLoading(true);setAns("");
    await new Promise(r=>setTimeout(r,1600));
    setLoading(false);
    setAns(`Based on ATBU resources and community knowledge:\n\n**Summary:** Here's what I found about "${q}".\n\n1. Check the ATBU student portal for official information.\n2. Contact the relevant faculty office directly.\n3. Browse the community feed for peer experiences.\n\nWould you like to post this to the community for more answers?`);
  };
  return (
    <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="modal" style={{maxWidth:500}}>
        <div style={{background:`linear-gradient(135deg,${T.navy},${T.navyL})`,padding:"20px 24px",position:"relative",overflow:"hidden"}}>
          <button onClick={onClose} style={{position:"absolute",top:14,right:14,width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,.1)",border:"none",cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="x" s={14}/></button>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Ic n="sparkle" s={22} c={T.gold}/>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:17}}>ATBUb AI</div>
              <div style={{color:"rgba(255,255,255,.55)",fontSize:12}}>Ask anything about ATBU</div>
            </div>
          </div>
        </div>
        <div style={{padding:24,display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",gap:8}}>
            <input className="inp" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")ask();}} placeholder="Ask about courses, deadlines, campus life…" style={{flex:1}}/>
            <button className="btn btn-pri" onClick={ask} style={{height:46,flexShrink:0}}>{loading?"…":"Ask"}</button>
          </div>
          {loading&&<div style={{display:"flex",alignItems:"center",gap:8,color:T.gold,fontSize:13,fontWeight:600}}><div style={{width:8,height:8,background:T.gold,borderRadius:"50%",animation:"pulse 1s infinite"}}/> ATBUb AI is thinking…</div>}
          {ans&&<div style={{padding:16,borderRadius:12,background:"rgba(212,175,55,.08)",border:"1px solid rgba(212,175,55,.25)",fontSize:13,lineHeight:1.8,color:"var(--txt)",whiteSpace:"pre-line"}}>{ans.replace(/\*\*(.*?)\*\*/g,"$1")}</div>}
        </div>
      </div>
    </div>
  );
}

export default AiAskModal;
