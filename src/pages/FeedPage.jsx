import { useState, useEffect, useRef } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';
import { Skel, VoteButtons, ReadingTime } from '../components/ui/shared';
import CategoryPicker from '../components/CategoryPicker';
import { QUESTIONS, DEPTS, TRENDING, feedCatItems } from '../data';

/* ────────────────────────────────────────────────────────
   LEFT SIDEBAR — scrollable Browse Topics + Community Stats
──────────────────────────────────────────────────────── */
function LeftSidebarTopics({topicF, setTopicF}) {
  const scrollRef = useRef(null);
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanUp(el.scrollTop > 8);
    setCanDown(el.scrollTop < el.scrollHeight - el.clientHeight - 8);
  };

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({top: dir * 120, behavior: "smooth"});
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, {passive: true});
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const allTopics = [{name:"All Questions", color:T.gold, count:"3.2k"}, ...DEPTS];

  return (
    <div className="card" style={{position:"relative", display:"flex", flexDirection:"column", maxHeight:"calc(100vh - 120px)"}}>
      {/* Header */}
      <div style={{padding:"14px 16px", borderBottom:"1px solid var(--brd)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0}}>
        <span style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.5, color:"var(--faint)"}}>Browse Topics</span>
        <button onClick={()=>setTopicF("All")} style={{fontSize:12, color:T.gold, fontWeight:600, cursor:"pointer", background:"none", border:"none", fontFamily:"inherit"}}>Clear</button>
      </div>

      {/* Scroll-up button */}
      <button onClick={()=>scrollBy(-1)} style={{
        width:"100%", padding:"5px 0", background:canUp?"var(--surfH)":"transparent",
        border:"none", borderBottom:"1px solid var(--brd)", cursor:canUp?"pointer":"default",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:canUp?T.gold:"var(--brd)", transition:"all .18s", flexShrink:0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
      </button>

      {/* Scrollable list */}
      <div ref={scrollRef} style={{flex:1, overflowY:"auto", padding:"8px 10px", display:"flex", flexDirection:"column", gap:3, scrollbarWidth:"thin"}}>
        {allTopics.map(d=>{
          const key = d.name==="All Questions"?"All":d.name;
          const isOn = topicF===key;
          return (
            <button key={d.name} onClick={()=>setTopicF(key)}
              style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 12px", borderRadius:10, border:"none", cursor:"pointer",
                background:isOn?"rgba(59,130,246,.15)":"transparent", color:isOn?T.gold:"var(--mut)",
                fontWeight:isOn?600:400, fontSize:14, transition:"all .15s", fontFamily:"inherit", width:"100%", textAlign:"left"}}>
              <span style={{display:"flex", alignItems:"center", gap:8}}>
                <span style={{width:8, height:8, borderRadius:"50%", background:d.color, display:"inline-block", flexShrink:0}}/>
                {d.name}
              </span>
              <span style={{fontSize:11, background:"var(--surfA)", padding:"2px 8px", borderRadius:10, color:"var(--faint)"}}>{d.count}</span>
            </button>
          );
        })}

        {/* Community Stats inside scroll area */}
        <div style={{marginTop:12, borderTop:"1px solid var(--brd)", paddingTop:12}}>
          <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.5, color:"var(--faint)", padding:"0 4px 10px"}}>Community Stats</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)"}}>
            {[["3.2k","Q's"],["12k","Ans"],["450","Staff"]].map(([v,l],i)=>(
              <div key={l} style={{textAlign:"center", borderRight:i<2?"1px solid var(--brd)":undefined, padding:"0 6px"}}>
                <div style={{fontSize:18, fontWeight:700, fontFamily:"'Playfair Display',serif"}}>{v}</div>
                <div style={{fontSize:10, color:"var(--faint)", textTransform:"uppercase", letterSpacing:.5, marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll-down button */}
      <button onClick={()=>scrollBy(1)} style={{
        width:"100%", padding:"5px 0", background:canDown?"var(--surfH)":"transparent",
        border:"none", borderTop:"1px solid var(--brd)", cursor:canDown?"pointer":"default",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:canDown?T.gold:"var(--brd)", transition:"all .18s", flexShrink:0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>
  );
}

function FeedPage({user,onLogin,toast,onViewQ}) {
  const [filter,setFilter] = useState("Trending");
  const [topicF,setTopicF] = useState("All");
  const [loading,setLoading] = useState(true);
  const [qs,setQs] = useState([]);
  const [expanded,setExpanded] = useState({});

  useEffect(()=>{
    const t = setTimeout(()=>{setQs(QUESTIONS);setLoading(false)},900);
    return ()=>clearTimeout(t);
  },[]);

  const handleLike = (id)=>{
    if(!user){onLogin();toast("Sign in to like posts","error");return;}
    setQs(p=>p.map(q=>q.id===id?{...q,liked:!q.liked,likes:q.liked?q.likes-1:q.likes+1}:q));
  };

  const handleVote = (id, dir)=>{
    if(!user){onLogin();toast("Sign in to vote","error");return;}
    setQs(p=>p.map(q=>{
      if(q.id!==id) return q;
      const prev = q.voted;
      if(prev===dir) return {...q,voted:null,votes:q.votes+(dir==="up"?-1:1)};
      const delta = (dir==="up"?1:-1) - (prev==="up"?1:prev==="down"?-1:0);
      return {...q,voted:dir,votes:q.votes+delta};
    }));
  };

  const handleBookmark = (id)=>{
    if(!user){onLogin();toast("Sign in to save questions","error");return;}
    const q = qs.find(q=>q.id===id);
    setQs(p=>p.map(q=>q.id===id?{...q,saved:!q.saved}:q));
    toast(q?.saved?"Removed from saved":"Question saved!","success");
  };

  const handleShare = (q)=>{
    navigator.clipboard.writeText(`${window.location.origin}?q=${q.id}`).catch(()=>{});
    toast("Link copied to clipboard!","success");
  };

  const toggleExpand = (id)=>setExpanded(p=>({...p,[id]:!p[id]}));

  const filtered = topicF==="All"?qs:qs.filter(q=>q.tags.some(t=>t.toLowerCase().includes(topicF.toLowerCase())));

  return (
    <div style={{display:"flex",gap:24,width:"100%",minWidth:0}} className="feed-wrap">
      {/* Left sidebar */}
      <aside className="lsb">
        <LeftSidebarTopics topicF={topicF} setTopicF={setTopicF}/>
      </aside>

      {/* Main */}
      <main style={{flex:1,minWidth:0}}>

        {/* Mobile category picker (visible below 1050px) */}
        <div style={{display:"none"}} className="mob-cat-row">
          <CategoryPicker items={feedCatItems} value={topicF} onChange={v=>setTopicF(v||"All")} placeholder="All Questions"/>
        </div>

        {/* Filter bar: category picker (mobile) + filter pills */}
        <div className="feed-filter-bar fu fu2" style={{display:"flex",gap:8,marginBottom:18,alignItems:"center",flexWrap:"wrap",  position:"relative", zIndex:'50'}}>
          {/* Category picker — only visible when sidebar is hidden (<1050px) */}
          <div className="mob-only-cat">
            <CategoryPicker items={feedCatItems} value={topicF} onChange={v=>setTopicF(v||"All")} placeholder="All Questions"/>
          </div>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:2,flex:1}}>
            {["Trending","Most Recent","Unanswered","Answered"].map(f=>(
              <button key={f} className={`pill${filter===f?" on":""}`} onClick={()=>setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        {/* Feed */}
        {loading?(
          [1,2,3].map(i=>(
            <div key={i} className="card" style={{padding:22,marginBottom:14}}>
              <div style={{display:"flex",gap:12,marginBottom:14}}><div className="skel" style={{width:44,height:44,borderRadius:"50%",flexShrink:0}}/><div style={{flex:1}}><Skel h={13} w="50%" mb={8}/><Skel h={11} w="30%"/></div></div>
              <Skel h={20} w="80%" mb={10}/><Skel h={12} mb={8}/><Skel h={12} w="90%"/>
            </div>
          ))
        ):(
          filtered.map((q,i)=>(
            <div key={q.id} className="q-card fu" style={{animationDelay:`${i*.08}s`,display:"flex",gap:0,padding:0,overflow:"hidden"}}>
              {/* Vote column */}
              <div className="vote-col" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"16px 10px",background:"var(--surfA)",borderRight:"1px solid var(--brd)",flexShrink:0,minWidth:42}}>
                <VoteButtons votes={q.votes} voted={q.voted} onVote={dir=>handleVote(q.id,dir)} vertical/>
              </div>

              {/* Content */}
              <div className="post-content" style={{flex:1,padding:"14px 14px",minWidth:0,overflow:"hidden",width:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8,gap:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0,flex:1}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:q.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:11,flexShrink:0}}>{q.av}</div>
                    <div style={{minWidth:0,flex:1,overflow:"hidden"}}>
                      <div style={{fontWeight:600,fontSize:12,display:"flex",alignItems:"center",gap:4}}>
                        <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{q.user}</span>
                        {q.staff&&<Ic n="shield" s={11} c={T.gold}/>}
                      </div>
                      <div style={{fontSize:10,color:"var(--faint)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {q.dept} · {q.time} · <ReadingTime text={q.body}/>
                      </div>
                    </div>
                  </div>
                  <span style={{padding:"2px 7px",borderRadius:8,fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:.4,background:q.answered?"#D1FAE5":"var(--surfA)",color:q.answered?"#10B981":"var(--faint)",flexShrink:0,whiteSpace:"nowrap"}}>
                    {q.answered?<span style={{display:"flex",alignItems:"center",gap:3}}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Ans</span>:"Open"}
                  </span>
                </div>

                <h3 onClick={()=>onViewQ(q)} style={{fontSize:15,fontWeight:700,marginBottom:6,cursor:"pointer",transition:"color .15s",lineHeight:1.35,wordBreak:"break-word",overflowWrap:"break-word"}}
                  onMouseEnter={e=>e.target.style.color=T.gold} onMouseLeave={e=>e.target.style.color="var(--txt)"}>{q.title}</h3>

                {/* Expandable body */}
                <div>
                  <p style={{fontSize:13,color:"var(--mut)",lineHeight:1.6,marginBottom:4,wordBreak:"break-word",overflowWrap:"break-word",
                    ...(!expanded[q.id]?{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}:{})
                  }}>{q.body}</p>
                  <button onClick={()=>toggleExpand(q.id)}
                    style={{fontSize:11,color:T.gold,fontWeight:600,background:"none",border:"none",cursor:"pointer",padding:"2px 0",marginBottom:8}}>
                    {expanded[q.id]?<>Show less <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg></>:<>Read more <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg></>}
                  </button>
                </div>

                <div className="tags-row" style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10,overflow:"hidden"}}>
                  {q.tags.map(t=><span key={t} className="tag" style={{fontSize:11,padding:"3px 9px"}} onClick={()=>setTopicF(t)}>{t}</span>)}
                </div>

                <div className="q-card-actions" style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:12,borderTop:"1px solid var(--brd)",flexWrap:"wrap",gap:8}}>
                  <div style={{display:"flex",gap:4}}>
                    <button onClick={()=>handleLike(q.id)}
                      style={{display:"flex",alignItems:"center",gap:5,padding:"6px 10px",borderRadius:8,border:"none",cursor:"pointer",
                        background:q.liked?"#FEE2E2":"transparent",color:q.liked?"#EF4444":"var(--mut)",fontSize:12,fontWeight:600,transition:"all .15s",fontFamily:"inherit"}}>
                      <Ic n="heart" s={14} c={q.liked?"#EF4444":"currentColor"}/>{q.likes}
                    </button>
                    <button onClick={()=>onViewQ(q)}
                      style={{display:"flex",alignItems:"center",gap:5,padding:"6px 10px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:"var(--mut)",fontSize:12,fontWeight:600,transition:"all .15s",fontFamily:"inherit"}}
                      onMouseEnter={e=>e.currentTarget.style.background="var(--surfH)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <Ic n="msg" s={14}/>{q.ans} Answers
                    </button>
                    <button onClick={()=>handleShare(q)}
                      style={{display:"flex",alignItems:"center",gap:5,padding:"6px 10px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:"var(--mut)",fontSize:12,fontWeight:600,transition:"all .15s",fontFamily:"inherit"}}
                      onMouseEnter={e=>e.currentTarget.style.background="var(--surfH)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <Ic n="send" s={13}/>Share
                    </button>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:11,color:"var(--faint)",display:"flex",alignItems:"center",gap:3}}><Ic n="eye" s={12}/>{q.views}</span>
                    <button onClick={()=>handleBookmark(q.id)}
                      className={q.saved?"bm-active":""}
                      style={{display:"flex",alignItems:"center",gap:4,padding:"6px 10px",borderRadius:8,border:"none",cursor:"pointer",
                        background:q.saved?"rgba(59,130,246,.1)":"transparent",
                        color:q.saved?T.gold:"var(--mut)",fontSize:12,fontWeight:600,transition:"all .15s",fontFamily:"inherit"}}
                      onMouseEnter={e=>{if(!q.saved)e.currentTarget.style.background="var(--surfH)"}}
                      onMouseLeave={e=>{if(!q.saved)e.currentTarget.style.background="transparent"}}>
                      {q.saved?
                        <svg width="13" height="13" viewBox="0 0 24 24" fill={T.gold} stroke={T.gold} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>:
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      }
                      {q.saved?"Saved":"Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Right sidebar */}
      <aside className="rsb">
        <div className="card" style={{marginBottom:20}}>
          <div style={{padding:"14px 18px",borderBottom:"1px solid var(--brd)"}}>
            <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,color:"var(--faint)"}}>Trending Now</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14,padding:"16px 18px"}}>
            {TRENDING.map(t=>(
              <div key={t.n} style={{display:"flex",gap:12,cursor:"pointer"}} className="card" style={{border:"none",boxShadow:"none",padding:"8px 0",cursor:"pointer"}}>
                <span className='trndtxt' style={{fontSize:22,fontWeight:800,lineHeight:1,flexShrink:0,transition:"color .15s"}}>{t.n}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600,lineHeight:1.4,marginBottom:4}}>{t.q}</div>
                  <div style={{fontSize:11,color:"#4A413C"}}>{t.m}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:`linear-gradient(145deg,${T.navy},${T.navyD})`,borderRadius:16,padding:24,textAlign:"center",color:"#fff",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-50,right:-50,width:100,height:100,background:"rgba(59,130,246,.15)",borderRadius:"50%",filter:"blur(20px)"}}/>
          <div style={{width:48,height:48,background:"rgba(255,255,255,.1)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:T.gold,animation:"float 3s ease-in-out infinite"}}><Ic n="cap" s={24} c={T.gold}/></div>
          <h3 style={{fontSize:16,marginBottom:8,color:"#fff"}}>Are you ATBU Staff?</h3>
          <p style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:18,lineHeight:1.5}}>Join as a verified lecturer to guide students with authoritative answers.</p>
          <button className="btn btn-pri" style={{width:"100%"}} onClick={()=>toast("Navigating to Staff Application…","info")}>Apply for Staff Access</button>
        </div>
      </aside>
    </div>
  );
}




export default FeedPage;
