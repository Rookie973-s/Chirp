import { useState } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';
import { Modal } from '../components/ui/shared';
import { DEPTS } from '../data';

/* ── QUICK ASK MODAL ── */
function QuickAskModal({onClose,user,onLogin,toast}) {
  const [q,setQ] = useState("");
  const [dept,setDept] = useState("General");
  const [tags,setTags] = useState("");
  const submit = ()=>{
    if(!user){onLogin();toast("Sign in to post questions","error");return;}
    if(!q.trim()){toast("Please enter your question","error");return;}
    toast("Question posted to community!","success");
    onClose();
  };
  return (
    <Modal onClose={onClose} maxW={520}>
      <div style={{background:`linear-gradient(135deg,${T.navy},${T.navyL})`,padding:"22px 24px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.1)",border:"none",cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Ic n="x" s={15}/>
        </button>
        <div style={{position:"absolute",right:-20,top:-30,width:120,height:120,background:"radial-gradient(circle,rgba(59,130,246,.2),transparent 70%)"}}/>
        <h3 style={{fontSize:20,color:"#fff",marginBottom:4}}>Ask the Community</h3>
        <p style={{fontSize:13,color:"rgba(255,255,255,.65)"}}>Get answers from ATBU lecturers and peers</p>
      </div>
      <div style={{padding:24,display:"flex",flexDirection:"column",gap:14}}>
        <div>
          <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Your Question *</label>
          <textarea className="inp" value={q} onChange={e=>setQ(e.target.value)} placeholder="Be specific — good questions get faster answers…" style={{minHeight:120}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
          <div>
            <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Department</label>
            <select className="inp" value={dept} onChange={e=>setDept(e.target.value)} style={{height:42}}>
              <option value="General">General / Campus Life</option>
              {DEPTS.map(d=><option key={d.name} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Tags (comma-separated)</label>
            <input className="inp" style={{height:42}} value={tags} onChange={e=>setTags(e.target.value)} placeholder="Exams, Portal, Help…"/>
          </div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:4}}>
          <button className="btn btn-out" onClick={onClose}>Cancel</button>
          <button className="btn btn-pri" onClick={submit}><Ic n="send" s={15} c="#000B18"/>Post Question</button>
        </div>
      </div>
    </Modal>
  );
}

export default QuickAskModal;
