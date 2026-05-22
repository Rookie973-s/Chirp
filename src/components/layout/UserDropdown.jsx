import T from '../../tokens';
import Ic from '../Ic';

function UserDropdown({onProfile,onLogout}) {
  return (
    <div style={{position:"fixed",top:68,right:16,width:220,background:"var(--surf)",border:"1px solid var(--brd)",borderRadius:16,boxShadow:"0 20px 40px rgba(0,0,0,.15)",zIndex:1200,overflow:"hidden",animation:"popIn .3s cubic-bezier(.34,1.56,.64,1)"}}>
      <div style={{padding:"16px 18px",borderBottom:"1px solid var(--brd)",display:"flex",alignItems:"center",gap:12,background:"var(--surfA)"}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:T.gold,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:T.navyD,fontSize:13}}>AY</div>
        <div><div style={{fontWeight:700,fontSize:14}}>Amina Yusuf</div><div style={{fontSize:12,color:"var(--mut)"}}>Computer Science · 300L</div></div>
      </div>
      {[{ic:"user",l:"My Profile",fn:onProfile},{ic:"book",l:"Saved Questions",fn:onProfile},{ic:"settings",l:"Settings",fn:onProfile}].map(({ic,l,fn})=>(
        <button key={l} onClick={fn} style={{width:"100%",padding:"11px 18px",display:"flex",alignItems:"center",gap:10,fontSize:14,color:"var(--txt)",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",transition:"background .15s",textAlign:"left"}}
          onMouseEnter={e=>{e.currentTarget.style.background="var(--surfH)";e.currentTarget.style.color=T.gold;}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--txt)";}}>
          <Ic n={ic} s={15} c="var(--mut)"/>{l}
        </button>
      ))}
      <div style={{height:1,background:"var(--brd)",margin:"4px 0"}}/>
      <button onClick={onLogout} style={{width:"100%",padding:"11px 18px",display:"flex",alignItems:"center",gap:10,fontSize:14,color:"#EF4444",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",transition:"background .15s"}}
        onMouseEnter={e=>e.currentTarget.style.background="#FEE2E2"}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <Ic n="logout" s={15} c="#EF4444"/>Sign Out
      </button>
    </div>
  );
}

export default UserDropdown;
