import { useState, useEffect } from 'react';
import Ic from '../Ic.jsx';

// ── ToastContainer ──
const ToastContainer = ({toasts}) => (
  <div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",zIndex:3000,display:"flex",flexDirection:"column",gap:10,alignItems:"center",pointerEvents:"none"}}>
    {toasts.map(t=>(
      <div key={t.id} className={`toast`} style={{background:t.type==="success"?"#10B981":t.type==="error"?"#EF4444":"#0B1F35",color:"#fff"}}>
        {t.type==="success"?<Ic n="check" s={16}/>:t.type==="error"?<Ic n="x" s={16}/>:<Ic n="bell" s={16}/>}
        {t.msg}
      </div>
    ))}
  </div>
);

// ── Modal ──
/* ── MODAL ── */
const Modal = ({onClose,children,maxW=500}) => (
  <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="modal" style={{maxWidth:maxW}}>{children}</div>
  </div>
);

// ── Skeleton ──
/* ── SKELETON ── */
const Skel = ({h=14,w="100%",r=6,mb=10})=>(
  <div className="skel" style={{height:h,width:w,borderRadius:r,marginBottom:mb}}/>
);

// ── Stars ──
/* ── STAR RATING ── */
const Stars = ({r=5})=>(
  <span>{[1,2,3,4,5].map(i=>(
    <span key={i} style={{color:i<=Math.round(r)?"#D4AF37":"#CBD5E1",fontSize:14}}>★</span>
  ))}</span>
);

// ── VoteButtons ──
/* ── VOTE BUTTONS (Reddit-style) ── */
function VoteButtons({votes,voted,onVote,vertical=false}) {
  const score = votes + (voted==="up"?0:voted==="down"?0:0);
  return (
    <div style={{display:"flex",flexDirection:vertical?"column":"row",alignItems:"center",gap:vertical?2:4}}>
      <button className={`vote-btn up${voted==="up"?" active":""}`}
        onClick={e=>{e.stopPropagation();onVote("up");}}
        title="Upvote"
        style={{color:voted==="up"?"#F97316":"var(--mut)"}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
      <span className="vote-score" style={{color:voted==="up"?"#F97316":voted==="down"?"#6366F1":"var(--mut)"}}>
        {votes}
      </span>
      <button className={`vote-btn down${voted==="down"?" active":""}`}
        onClick={e=>{e.stopPropagation();onVote("down");}}
        title="Downvote"
        style={{color:voted==="down"?"#6366F1":"var(--mut)"}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>
  );
}

// ── ReadingTime ──
/* ── READING TIME ── */
const ReadingTime = ({text}) => {
  const mins = Math.max(1, Math.ceil(text.split(" ").length / 200));
  return <span className="rt-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{mins} min read</span>;
};

// ── BackToTop ──
/* ── BACK TO TOP ── */
function BackToTop() {
  const [show,setShow] = useState(false);
  useEffect(()=>{
    const fn=()=>setShow(window.scrollY>300);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  if(!show) return null;
  return (
    <button className="b2t" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} title="Back to top">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  );
}

export { ToastContainer, Modal, Skel, Stars, VoteButtons, ReadingTime, BackToTop };