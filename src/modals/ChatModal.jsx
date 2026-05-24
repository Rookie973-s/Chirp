import { useState, useEffect, useRef } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';

/* ── CHAT MODAL ── */
function ChatModal({onClose, user, onLogin}) {
  const [msgs, setMsgs] = useState([
    {from:"system",text:"Welcome to ATBUConnect Chat — connect with students and staff."},
    {from:"Dr. Sarah Ibrahim",text:"Has everyone submitted their CSC411 projects? Deadline is Friday!",time:"2m ago",av:"SI",bg:"#8B5CF6"},
    {from:"Mohammed Kabir",text:"Not yet, still working on the documentation.",time:"1m ago",av:"MK",bg:"#3B82F6"},
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const send = ()=>{
    if(!input.trim()) return;
    if(!user){alert("Sign in to chat");return;}
    setMsgs(p=>[...p,{from:"You",text:input,time:"now",av:"AY",bg:T.gold,self:true}]);
    setInput("");
  };

  return (
    <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="modal" style={{maxWidth:480,display:"flex",flexDirection:"column",height:"min(85vh, 600px)",maxHeight:"min(85vh, 600px)"}}>
        <div style={{background:`linear-gradient(135deg,${T.navy},${T.navyL})`,padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(59,130,246,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ic n="msg" s={18} c={T.gold}/>
            </div>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:15}}>Community Chat</div>
              <div style={{color:"rgba(255,255,255,.5)",fontSize:11,display:"flex",alignItems:"center",gap:5}}><span style={{width:7,height:7,borderRadius:"50%",background:"#22C55E",display:"inline-block",flexShrink:0}}/>42 online now</div>
            </div>
          </div>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.1)",border:"none",cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ic n="x" s={15}/>
          </button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:12,background:"var(--bg)"}}>
          {msgs.map((m,i)=>(
            m.from==="system"?(
              <div key={i} style={{textAlign:"center",fontSize:12,color:"var(--faint)",padding:"4px 12px",background:"var(--surfA)",borderRadius:20,margin:"0 auto"}}>{m.text}</div>
            ):(
              <div key={i} style={{display:"flex",gap:8,flexDirection:m.self?"row-reverse":"row"}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:m.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11,color:m.self?"#000B18":"#fff",flexShrink:0}}>{m.av}</div>
                <div style={{maxWidth:"72%"}}>
                  {!m.self&&<div style={{fontSize:11,fontWeight:600,color:"var(--faint)",marginBottom:3}}>{m.from} · {m.time}</div>}
                  <div style={{padding:"10px 14px",borderRadius:m.self?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.self?"linear-gradient(135deg,#3B82F6,#2563EB)":("var(--surf)"),color:m.self?"#000B18":"var(--txt)",fontSize:13,lineHeight:1.5,border:m.self?"none":"1px solid var(--brd)"}}>{m.text}</div>
                </div>
              </div>
            )
          ))}
          <div ref={bottomRef}/>
        </div>
        <div style={{padding:"12px 16px",borderTop:"1px solid var(--brd)",display:"flex",gap:8,background:"var(--surf)",flexShrink:0}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}}
            placeholder={user?"Type a message…":"Sign in to chat"}
            style={{flex:1,height:40,padding:"0 14px",borderRadius:20,border:"1.5px solid var(--brdS)",background:"var(--surfH)",color:"var(--txt)",fontSize:13,fontFamily:"inherit",outline:"none"}}
            disabled={!user}/>
          <button onClick={send} style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#3B82F6,#2563EB)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ic n="send" s={15} c="#000B18"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
