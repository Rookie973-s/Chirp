import T from '../../tokens';
import Ic from '../Ic';

function NotifDropdown({notifs,onMarkAll,onClose}) {
  const unread = notifs.filter(n=>n.unread).length;
  return (
    <div style={{position:"fixed",top:68,right:16,width:"min(310px,calc(100vw - 32px))",maxWidth:310,background:"var(--surf)",border:"1px solid var(--brd)",borderRadius:16,boxShadow:"0 20px 40px rgba(0,0,0,.15)",zIndex:1200,overflow:"hidden",animation:"popIn .3s cubic-bezier(.34,1.56,.64,1)"}}>
      <div style={{padding:"14px 18px",borderBottom:"1px solid var(--brd)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--surfA)"}}>
        <span style={{fontWeight:700,fontSize:14}}>Notifications {unread>0&&<span style={{background:T.error,color:"#fff",borderRadius:10,padding:"2px 7px",fontSize:11,marginLeft:6}}>{unread}</span>}</span>
        <button onClick={onMarkAll} style={{fontSize:12,color:T.gold,fontWeight:600,cursor:"pointer",background:"none",border:"none",fontFamily:"inherit"}}>Mark all read</button>
      </div>
      {notifs.map((n,i)=>(
        <div key={i} style={{padding:"14px 18px",display:"flex",gap:12,borderBottom:"1px solid var(--brd)",background:n.unread?"rgba(212,175,55,.06)":"transparent",cursor:"pointer",transition:"background .15s"}}
          onMouseEnter={e=>e.currentTarget.style.background="var(--surfH)"}
          onMouseLeave={e=>e.currentTarget.style.background=n.unread?"rgba(212,175,55,.06)":"transparent"}>
          <div style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:n.type==="like"?"#FEE2E2":"#D1FAE5",flexShrink:0}}>
            <Ic n={n.type==="like"?"heart":"msg"} s={15} c={n.type==="like"?"#EF4444":"#10B981"}/>
          </div>
          <div>
            <p style={{fontSize:13,lineHeight:1.5,marginBottom:3}} dangerouslySetInnerHTML={{__html:n.text}}/>
            <span style={{fontSize:11,color:"var(--faint)"}}>{n.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


  

export default NotifDropdown;
