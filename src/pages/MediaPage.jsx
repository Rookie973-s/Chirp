import { useState } from 'react';
import Ic from '../components/Ic';
import { MEDIA_POSTS } from '../data';

/* ── MEDIA PAGE ── */
function MediaPage({user,onLogin,toast}) {
  const [liked,setLiked] = useState({});
  const toggleLike = (id)=>{
    if(!user){onLogin();toast("Sign in to like","error");return;}
    setLiked(p=>({...p,[id]:!p[id]}));
  };
  return (
  <div style={{flex:1, padding:"0 16px"}} className="media-wrap">
    <div style={{marginBottom:24, paddingTop:8}}>
      <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>Media</h2>
      <p style={{fontSize:13,color:"var(--mut)"}}>Photos and videos from the ATBU community</p>
    </div>
    <div style={{columns:"2 220px", gap:16, padding:"0 0 24px"}}>
      {MEDIA_POSTS.map((p,i)=>(
        <div key={p.id} className="card fu" style={{
          animationDelay:`${i*.07}s`, marginBottom:16,
          breakInside:"avoid", overflow:"hidden",
          cursor:"pointer", borderRadius:18,
          border:"1px solid var(--brd)",
        }}>
            <div style={{position:"relative"}}>
              <img src={p.thumb} alt={p.caption} style={{width:"100%",display:"block",aspectRatio:"4/3",objectFit:"cover"}}
                onError={e=>{e.target.style.background="var(--surfH)";e.target.style.minHeight="160px";}}/>
              {p.type==="video"&&(
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.25)"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,.85)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#000B18"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              )}
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:10,color:"#fff",flexShrink:0}}>{p.av}</div>
                <span style={{fontSize:12,fontWeight:600,color:"var(--txt)"}}>{p.user}</span>
                <span style={{fontSize:11,color:"var(--faint)",marginLeft:"auto"}}>{p.time}</span>
              </div>
              <p style={{fontSize:12,color:"var(--mut)",lineHeight:1.5,marginBottom:10}}>{p.caption}</p>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <button onClick={()=>toggleLike(p.id)} style={{display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600,color:liked[p.id]?"#EF4444":"var(--faint)",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",padding:0}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={liked[p.id]?"#EF4444":"none"} stroke={liked[p.id]?"#EF4444":"currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {p.likes+(liked[p.id]?1:0)}
                </button>
                <span style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:"var(--faint)"}}>
                  <Ic n="msg" s={13} c="var(--faint)"/>{p.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaPage;
