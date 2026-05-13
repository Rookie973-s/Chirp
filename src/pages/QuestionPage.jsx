import { useState } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';

function QuestionPage({q,onBack,user,onLogin,toast}) {
  const [reply,setReply] = useState("");
  const [answers,setAnswers] = useState([
    {id:1,user:"Dr. Sarah Ibrahim",av:"SI",bg:"#8B5CF6",staff:true,time:"1h ago",body:"Based on my experience as a lecturer in the faculty, I'd recommend focusing on the core textbooks listed in the course outline. Past questions from 2018–2023 are available at the faculty library. Pay attention to worked examples in chapters 3–6.",likes:18,liked:false,
     reactions:{fire:12,bulb:8,clap:5},myReactions:{}},
    {id:2,user:"Ahmed Musa",av:"AM",bg:"#3B82F6",staff:false,time:"3h ago",body:"I passed MTH201 last session. The trick is to not skip tutorials — the TA drops hints about exam topics there. Also, the library has compiled past questions for free.",likes:9,liked:false,
     reactions:{fire:4,bulb:11,clap:2},myReactions:{}},
  ]);

  const toggleReaction = (aid, rxn)=>{
    setAnswers(p=>p.map(a=>{
      if(a.id!==aid) return a;
      const has = a.myReactions[rxn];
      return {...a,
        reactions:{...a.reactions,[rxn]:a.reactions[rxn]+(has?-1:1)},
        myReactions:{...a.myReactions,[rxn]:!has}
      };
    }));
  };

  const postReply = ()=>{
    if(!user){onLogin();toast("Sign in to answer","error");return;}
    if(!reply.trim()){toast("Type your answer first","error");return;}
    setAnswers(p=>[...p,{id:Date.now(),user:"Amina Yusuf",av:"AY",bg:T.gold,staff:false,time:"Just now",body:reply,likes:0,liked:false}]);
    setReply("");toast("Answer posted!","success");
  };

  return (
    <div style={{maxWidth:760,margin:"0 auto"}}>
      <button className="btn btn-ghost" style={{marginBottom:18}} onClick={onBack}><Ic n="arrowL" s={16}/>Back to Feed</button>
      <div className="card fu" style={{padding:28,marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:48,height:48,borderRadius:"50%",background:q.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:14,flexShrink:0}}>{q.av}</div>
            <div>
              <div style={{fontWeight:700,display:"flex",alignItems:"center",gap:6}}>{q.user}{q.staff&&<Ic n="shield" s={13} c={T.gold}/>}</div>
              <div style={{fontSize:12,color:"var(--faint)"}}>{q.dept} · {q.time}</div>
            </div>
          </div>
          <span style={{padding:"5px 12px",borderRadius:12,fontSize:11,fontWeight:700,textTransform:"uppercase",background:q.answered?"#D1FAE5":"var(--surfA)",color:q.answered?"#10B981":"var(--faint)"}}>
            {q.answered?<span style={{display:"flex",alignItems:"center",gap:4}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Answered</span>:"Open"}
          </span>
        </div>
        <h1 style={{fontSize:24,lineHeight:1.35,marginBottom:14}}>{q.title}</h1>
        <p style={{fontSize:15,color:"var(--mut)",lineHeight:1.75,marginBottom:18}}>{q.body}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
          {q.tags.map(t=><span key={t} className="tag">{t}</span>)}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:16,borderTop:"1px solid var(--brd)"}}>
          <button style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:10,border:"none",cursor:"pointer",background:q.liked?"#FEE2E2":"var(--surfH)",color:q.liked?"#EF4444":"var(--mut)",fontSize:14,fontWeight:600,fontFamily:"inherit",transition:"all .15s"}}>
            <Ic n="heart" s={16} c={q.liked?"#EF4444":"currentColor"}/>{q.likes}
          </button>
          <span style={{fontSize:14,color:"var(--faint)",display:"flex",alignItems:"center",gap:5}}><Ic n="eye" s={14}/>{q.views} views</span>
        </div>
      </div>

      {/* Answers */}
      <h3 style={{fontSize:16,marginBottom:14,display:"flex",alignItems:"center",gap:8}}><Ic n="msg" s={16}/>{answers.length} Answers</h3>
      {answers.map((a,i)=>(
        <div key={a.id} className="card fu" style={{padding:22,marginBottom:12,animationDelay:`${i*.07}s`,borderLeft:`3px solid ${a.staff?T.gold:"var(--brd)"}`}}>
          <div style={{display:"flex",gap:12,marginBottom:14,alignItems:"center"}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:12,flexShrink:0}}>{a.av}</div>
            <div>
              <div style={{fontWeight:600,fontSize:14,display:"flex",alignItems:"center",gap:6}}>
                {a.user}
                {a.staff&&<span style={{background:"rgba(212,175,55,.15)",color:T.gold,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6,textTransform:"uppercase",letterSpacing:.5}}>Staff</span>}
              </div>
              <div style={{fontSize:11,color:"var(--faint)"}}>{a.time}</div>
            </div>
          </div>
          <p style={{fontSize:14,lineHeight:1.75,color:"var(--txt)",marginBottom:14}}>{a.body}</p>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <button style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:8,border:"none",cursor:"pointer",background:a.liked?"#FEE2E2":"transparent",color:a.liked?"#EF4444":"var(--mut)",fontSize:13,fontWeight:600,fontFamily:"inherit",transition:"all .15s"}}
              onClick={()=>setAnswers(p=>p.map(ans=>ans.id===a.id?{...ans,liked:!ans.liked,likes:ans.liked?ans.likes-1:ans.likes+1}:ans))}>
              <Ic n="heart" s={14} c={a.liked?"#EF4444":"currentColor"}/>{a.likes}
            </button>
            <div style={{width:1,height:16,background:"var(--brd)"}}/>
            {[
              {key:"fire", icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 0-5 5-5 10a5 5 0 0 0 10 0c0-4.5-3-8-5-10z"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>},
              {key:"bulb", icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="21" x2="15" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M12 2a7 7 0 0 0-7 7c0 2.7 1.5 5.1 4 6.3V17h6v-1.7c2.5-1.2 4-3.6 4-6.3a7 7 0 0 0-7-7z"/></svg>},
              {key:"clap", icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
            ].map(({key,icon})=>(
              <button key={key} className={`rxn${a.myReactions[key]?" on":""}`} onClick={()=>toggleReaction(a.id,key)}>
                {icon} {a.reactions[key]}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Reply box */}
      <div className="card" style={{padding:22,marginTop:20}}>
        <h4 style={{fontSize:15,marginBottom:14}}>Your Answer</h4>
        <textarea className="inp" placeholder="Share your knowledge…" value={reply} onChange={e=>setReply(e.target.value)} style={{marginBottom:12}}/>
        <button className="btn btn-pri" onClick={postReply}><Ic n="send" s={15} c="#061220"/>Post Answer</button>
      </div>
    </div>
  );
}

export default QuestionPage;
