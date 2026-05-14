import { useState } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';

// ── Moved outside AuthModal to avoid re-creating on every render ──
function SocialRow() {
  return (
    <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:12}}>
      {[["G","#EA4335"],["f","#1877F2"],["in","#0A66C2"],["𝕏","#000"]].map(([ic])=>(
        <button key={ic} className="auth-social-btn">{ic}</button>
      ))}
    </div>
  );
}

function AuthModal({tab:initTab,onClose,onSuccess}) {
  const [active,setActive] = useState(initTab==="register");
  const [form,setForm] = useState({id:"",pass:"",fname:"",lname:"",matric:"",email:"",rpass:""});
  const upd = (k,v) => setForm(p=>({...p,[k]:v}));

  return (
    <div className="overlay auth-modal-overlay" style={{zIndex:2000}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className={`auth-outer${active?" active":""}`}>

        {/* Close — sits on the conic border, above everything */}
        <button className="auth-close" onClick={onClose}><Ic n="x" s={14}/></button>

        {/* Inner container clips all panels so nothing bleeds out */}
        <div className="auth-inner">

          {/* ── LOGIN PANEL ── */}
          <div className="auth-form-panel auth-login">
          <div style={{width:"100%",maxWidth:310}}>
            <div style={{marginBottom:22,textAlign:"center"}}>
              <div style={{width:50,height:50,borderRadius:13,background:"linear-gradient(135deg,#D4AF37,#b89228)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",boxShadow:"0 6px 20px rgba(212,175,55,.35)"}}>
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                  <path d="M20 7L26 13H22V20H18V13H14L20 7Z" fill="#0B1F35"/>
                  <path d="M12 21H28V23C28 27.418 24.418 31 20 31C15.582 31 12 27.418 12 23V21Z" fill="#0B1F35"/>
                  <circle cx="20" cy="18" r="3" fill="#D4AF37"/>
                </svg>
              </div>
              <h2 style={{fontSize:21,marginBottom:3,fontFamily:"'Playfair Display',serif"}}>Welcome Back</h2>
              <p style={{fontSize:13,color:"var(--faint)"}}>Sign in to ATBUConnect</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:16}}>
              <input className="auth-inp" value={form.id} onChange={e=>upd("id",e.target.value)} placeholder="Matric No. or Email (U22CS0001)"/>
              <input className="auth-inp" type="password" value={form.pass} onChange={e=>upd("pass",e.target.value)} placeholder="Password"/>
              <div style={{textAlign:"right",marginTop:-4}}>
                <span style={{fontSize:12,color:T.gold,cursor:"pointer",fontWeight:600}}>Forgot Password?</span>
              </div>
            </div>
            <button className="auth-btn" onClick={onSuccess}>Sign In to ATBUConnect</button>
            <p style={{fontSize:12,color:"var(--faint)",textAlign:"center",marginTop:14,marginBottom:0}}>or continue with</p>
            <SocialRow/>
          </div>
        </div>

        {/* ── REGISTER PANEL ── */}
        <div className="auth-form-panel auth-register">
          <div style={{width:"100%",maxWidth:310}}>
            <div style={{marginBottom:18,textAlign:"center"}}>
              <h2 style={{fontSize:21,marginBottom:3,fontFamily:"'Playfair Display',serif"}}>Create Account</h2>
              <p style={{fontSize:13,color:"var(--faint)"}}>Join the ATBUConnect community</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <input className="auth-inp" value={form.fname} onChange={e=>upd("fname",e.target.value)} placeholder="First Name"/>
                <input className="auth-inp" value={form.lname} onChange={e=>upd("lname",e.target.value)} placeholder="Last Name"/>
              </div>
              <input className="auth-inp" value={form.matric} onChange={e=>upd("matric",e.target.value)} placeholder="Matric Number (U22CS0001)"/>
              <input className="auth-inp" type="email" value={form.email} onChange={e=>upd("email",e.target.value)} placeholder="University Email"/>
              <input className="auth-inp" type="password" value={form.rpass} onChange={e=>upd("rpass",e.target.value)} placeholder="Create a strong password"/>
            </div>
            <button className="auth-btn gold-btn" onClick={onSuccess}>Create My Account</button>
            <p style={{fontSize:12,color:"var(--faint)",textAlign:"center",marginTop:12,marginBottom:0}}>or register with</p>
            <SocialRow/>
          </div>
        </div>
          </div>
        </div>

        {/* ── TOGGLE OVERLAY ── */}
        <div className="auth-toggle-box">
          {/* Left panel — shown when NOT active (login mode) */}
          <div className="auth-toggle-panel auth-toggle-left">
            <div style={{width:58,height:58,borderRadius:16,background:"rgba(212,175,55,.18)",border:"1.5px solid rgba(212,175,55,.35)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
              <Ic n="cap" s={28} c="#D4AF37"/>
            </div>
            <h2 style={{fontSize:22,fontFamily:"'Playfair Display',serif",marginBottom:10,textShadow:"0 2px 12px rgba(0,0,0,.3)"}}>Hello, Welcome!</h2>
            <p style={{fontSize:13,opacity:.8,marginBottom:26,lineHeight:1.65,maxWidth:200}}>Don't have an account? Join thousands of ATBU students today.</p>
            <button className="auth-toggle-btn" onClick={()=>setActive(true)}>Register Now</button>
          </div>
          {/* Right panel — shown when active (register mode) */}
          <div className="auth-toggle-panel auth-toggle-right">
            <div style={{width:58,height:58,borderRadius:16,background:"rgba(212,175,55,.18)",border:"1.5px solid rgba(212,175,55,.35)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
              <Ic n="user" s={28} c="#D4AF37"/>
            </div>
            <h2 style={{fontSize:22,fontFamily:"'Playfair Display',serif",marginBottom:10,textShadow:"0 2px 12px rgba(0,0,0,.3)"}}>Welcome Back!</h2>
            <p style={{fontSize:13,opacity:.8,marginBottom:26,lineHeight:1.65,maxWidth:200}}>Already have an account? Sign in to continue your journey.</p>
            <button className="auth-toggle-btn" onClick={()=>setActive(false)}>Sign In</button>
          </div>
        </div>

        </div>
        
  
  );
}

export default AuthModal;