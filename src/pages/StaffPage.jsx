import { useState, useEffect } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';
import { Modal, Skel, Stars } from '../components/ui/shared';
import CategoryPicker from '../components/CategoryPicker';
import { STAFF, staffCatItems } from '../data';

function StaffPage({user,onLogin,toast}) {
  const [deptF,setDeptF] = useState("All");
  const [selected,setSelected] = useState(null);
  const [loading,setLoading] = useState(true);
  const [msgOpen,setMsgOpen] = useState(false);
  const [msgTxt,setMsgTxt] = useState("");
  const [search,setSearch] = useState("");

  useEffect(()=>{const t=setTimeout(()=>setLoading(false),700);return()=>clearTimeout(t);},[]);

  const filtered = STAFF.filter(s=>{
    const dOk = deptF==="All"||s.dept===deptF;
    const sOk = s.name.toLowerCase().includes(search.toLowerCase())||s.role.toLowerCase().includes(search.toLowerCase());
    return dOk&&sOk;
  });

  const sendMsg = ()=>{
    if(!user){onLogin();toast("Sign in to message staff","error");return;}
    if(!msgTxt.trim()){toast("Type your message","error");return;}
    toast(`Message sent to ${selected.name}!`,"success");
    setMsgOpen(false);setMsgTxt("");
  };

  return (
   <div style={{flex:1,minWidth:0,padding:"0 16px"}} className="staff-wrap">
      <div className="fu" style={{marginBottom:22,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <input className="inp" placeholder="Search staff by name or role…" value={search} onChange={e=>setSearch(e.target.value)} style={{paddingLeft:38}}/>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"var(--faint)"}}><Ic n="search" s={15}/></span>
        </div>
      </div>
      <div style={{display:"flex",gap:12,marginBottom:22,alignItems:"center",flexWrap:"wrap", position:'relative', zIndex:'50'}} className="fu fu1">
        <CategoryPicker items={staffCatItems} value={deptF} onChange={v=>setDeptF(v||"All")} placeholder="All Departments"/>
        {deptF!=="All"&&<span style={{fontSize:13,color:"var(--mut)"}}>Showing staff in <strong style={{color:T.gold}}>{deptF}</strong></span>}
      </div>

      {loading?(
       <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18, padding:"0 4px 8px"}}>
          {[1,2,3,4,5,6].map(i=>(
            <div key={i} className="card" style={{padding:20,textAlign:"center"}}>
              <div className="skel" style={{width:70,height:70,borderRadius:"50%",margin:"0 auto 14px"}}/>
              <Skel h={13} w="70%" mb={8}/><Skel h={11} w="50%" mb={0}/>
            </div>
          ))}
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
          {filtered.map((s,i)=>(
            <div key={s.id} className="sc fu" style={{animationDelay:`${i*.06}s`}} onClick={()=>setSelected(s)}>
              <div style={{height:56,background:`linear-gradient(135deg,${T.navyL},${T.navy})`}}/>
              <div style={{position:"relative",width:68,height:68,margin:"-34px auto 10px"}}>
                <div style={{width:68,height:68,borderRadius:"50%",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:20,border:"4px solid var(--surf)",boxShadow:"0 2px 8px rgba(0,0,0,.12)"}}>{s.av}</div>
                {s.online&&<div style={{position:"absolute",bottom:3,right:3,width:13,height:13,background:"#10B981",borderRadius:"50%",border:"2px solid var(--surf)"}}/>}
              </div>
              <div style={{padding:"0 16px 20px",textAlign:"center"}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:3}}>{s.name}</div>
                <div style={{fontSize:12,color:"var(--mut)",marginBottom:8}}>{s.role}</div>
                <Stars r={s.rating}/>
                <div style={{fontSize:11,color:"var(--faint)",marginBottom:12}}>{s.answers} answers</div>
                <span style={{display:"inline-block",padding:"3px 10px",background:"var(--surfA)",borderRadius:6,fontSize:11,fontWeight:600,marginBottom:14}}>{s.dept}</span>
                <button className="btn btn-out" style={{width:"100%",height:36,fontSize:13}} onClick={e=>{e.stopPropagation();setSelected(s);}}>View Profile</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Staff Detail Modal */}
      {selected&&(
        <Modal onClose={()=>setSelected(null)} maxW={520}>
          <div style={{background:`linear-gradient(135deg,${T.navy},${T.navyL})`,padding:"32px 28px 24px",position:"relative",color:"#fff"}} className="staff-wrap">
            <button onClick={()=>setSelected(null)} className="ib" style={{position:"absolute",top:14,right:14,color:"#fff",width:32,height:32}}>
              <Ic n="x" s={16}/>
            </button>
            <div style={{display:"flex",gap:18,alignItems:"center"}}>
              <div style={{position:"relative",flexShrink:0}}>
                <div style={{width:72,height:72,borderRadius:"50%",background:selected.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:22,border:"3px solid rgba(255,255,255,.3)"}}>{selected.av}</div>
                {selected.online&&<div style={{position:"absolute",bottom:3,right:3,width:14,height:14,background:"#10B981",borderRadius:"50%",border:"2px solid #03264A"}}/>}
              </div>
              <div>
                <h2 style={{fontSize:22,color:"#fff",marginBottom:3}}>{selected.name}</h2>
                <div style={{fontSize:14,color:"rgba(255,255,255,.75)",marginBottom:6}}>{selected.role} · {selected.dept}</div>
                <Stars r={selected.rating}/>
                <span style={{fontSize:12,color:"rgba(255,255,255,.6)",marginLeft:6}}>{selected.rating}/5 · {selected.answers} answers</span>
              </div>
            </div>
          </div>
          <div style={{padding:24}}>
            <div style={{padding:16,background:"var(--surfA)",borderRadius:12,marginBottom:20,fontSize:14,lineHeight:1.7,color:"var(--mut)"}}>{selected.bio}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
              {[{ic:"mail",label:"Email",val:selected.email},{ic:"phone",label:"Phone",val:selected.phone}].map(({ic,label,val})=>(
                <div key={label} style={{padding:14,background:"var(--surfA)",borderRadius:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,color:"var(--faint)",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>
                    <Ic n={ic} s={12}/>{label}
                  </div>
                  <div style={{fontSize:13,fontWeight:600}}>{val}</div>
                </div>
              ))}
            </div>
            {msgOpen?(
              <div style={{animation:"slideDown .3s ease"}}>
                <textarea className="inp" placeholder={`Write your message to ${selected.name}…`} value={msgTxt} onChange={e=>setMsgTxt(e.target.value)} style={{marginBottom:12}}/>
                <div style={{display:"flex",gap:10}}>
                  <button className="btn btn-pri" style={{flex:1}} onClick={sendMsg}><Ic n="send" s={15} c="#000B18"/>Send Message</button>
                  <button className="btn btn-out" onClick={()=>setMsgOpen(false)}>Cancel</button>
                </div>
              </div>
            ):(
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-navy" style={{flex:1}} onClick={()=>{if(!user){onLogin();toast("Sign in to message staff","error");}else setMsgOpen(true);}}>
                  <Ic n="msg" s={15}/>Message
                </button>
                <button className="btn btn-out" onClick={()=>{toast("Question link copied!","success");}}>
                  <Ic n="send" s={15}/>Share Profile
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}



export default StaffPage;
