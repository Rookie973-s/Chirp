import { useState } from 'react';
import T from '../tokens';
import { QUESTIONS } from '../data';
import Ic from '../components/Ic';

function ProfilePage({user,toast}) {
  const [tab,setTab] = useState("questions");
  const tabs = ["questions","saved","settings"];

  if(!user) return (
    <div style={{textAlign:"center",padding:"60px 20px"}} className="fu">
      <Ic n="user" s={48} c="var(--faint)"/>
      <h3 style={{marginTop:16,marginBottom:8}}>Sign in to view your profile</h3>
      <p style={{color:"var(--mut)"}}>Your questions, answers and settings will appear here.</p>
    </div>
  );

  return (
    <div style={{maxWidth:760,margin:"0 auto"}}>
      {/* Profile header */}
      <div className="card fu" style={{marginBottom:20,overflow:"hidden"}}>
        <div style={{height:90,background:`linear-gradient(135deg,${T.navy},${T.navyL})`}}/>
        <div style={{padding:"0 24px 24px",position:"relative"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:T.gold,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:T.navyD,fontSize:22,border:"4px solid var(--surf)",position:"relative",top:-40,marginBottom:-24,boxShadow:"0 4px 12px rgba(0,0,0,.12)"}}>AY</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
            <div>
              <h2 style={{fontSize:22,marginBottom:3}}>Amina Yusuf</h2>
              <p style={{color:"var(--mut)",fontSize:14}}>Computer Science · 300 Level · ATBU Bauchi</p>
              <div style={{display:"flex",gap:14,marginTop:10,flexWrap:"wrap"}}>
                {[["12","Questions"],["34","Answers"],["8","Saved"]].map(([v,l])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontWeight:700,fontSize:18,fontFamily:"'Playfair Display',serif"}}>{v}</div>
                    <div style={{fontSize:11,color:"var(--faint)",textTransform:"uppercase",letterSpacing:.5}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btn-out" style={{height:38,fontSize:13}}><Ic n="settings" s={14}/>Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:20,background:"var(--surf)",padding:6,borderRadius:14,border:"1px solid var(--brd)"}} className="fu fu1">
        {tabs.map(t=>(
          <button key={t} className={`nav-tab${tab===t?" on":""}`} style={{flex:1,justifyContent:"center",textTransform:"capitalize"}} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>

      {tab==="questions"&&(
        <div className="fu">
          {QUESTIONS.slice(0,2).map(q=>(
            <div key={q.id} className="q-card" style={{marginBottom:12}}>
              <h4 style={{fontSize:16,marginBottom:6}}>{q.title}</h4>
              <p style={{fontSize:13,color:"var(--mut)",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{q.body}</p>
              <div style={{display:"flex",gap:10,marginTop:12,fontSize:12,color:"var(--faint)"}}>
                <span><Ic n="heart" s={12}/> {q.likes}</span>
                <span><Ic n="msg" s={12}/> {q.ans}</span>
                <span><Ic n="eye" s={12}/> {q.views}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab==="saved"&&(
        <div className="fu" style={{textAlign:"center",padding:"40px 0"}}>
          <Ic n="book" s={40} c="var(--faint)"/>
          <p style={{color:"var(--mut)",marginTop:12}}>No saved questions yet. Bookmark questions that you want to revisit.</p>
        </div>
      )}
      {tab==="settings"&&(
        <div className="card fu" style={{padding:24}}>
          <h3 style={{marginBottom:20,fontSize:18}}>Account Settings</h3>
          {["Display Name","Email Address","Matric Number"].map(l=>(
            <div key={l} style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>{l}</label>
              <input className="inp" defaultValue={l==="Display Name"?"Amina Yusuf":l==="Email Address"?"amina@student.atbu.edu.ng":"U22CS0001"}/>
            </div>
          ))}
          <button className="btn btn-pri" onClick={()=>toast("Settings saved!","success")}>Save Changes</button>
        </div>
      )}
    </div>
  );
}


   // eslint-disable-next-line no-undef
   HOME / LANDING

export default ProfilePage;
