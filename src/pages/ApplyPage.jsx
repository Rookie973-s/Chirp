import { useState } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';
import { DEPTS } from '../data';

function ApplyPage({toast}) {
  const [step,setStep] = useState(0);
  const [form,setForm] = useState({fname:"",lname:"",email:"",staffId:"",dept:"",role:"",bio:"",why:"",refs:""});
  const [submitted,setSubmitted] = useState(false);

  const upd = (k,v)=>setForm(p=>({...p,[k]:v}));
  const steps = ["Personal Info","Academic Details","Statement","Review & Submit"];

  const canNext = ()=>{
    if(step===0)return form.fname&&form.lname&&form.email;
    if(step===1)return form.staffId&&form.dept&&form.role;
    if(step===2)return form.bio&&form.why;
    return true;
  };

  const submit = ()=>{
    toast("Application submitted! You'll hear back within 3 working days.","success");
    setSubmitted(true);
  };

  if(submitted) return (
    <div style={{maxWidth:560,margin:"0 auto",textAlign:"center"}} className="fu">
      <div style={{width:90,height:90,background:"#D1FAE5",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",animation:"glow 2s ease-in-out infinite"}}>
        <Ic n="check" s={38} c="#10B981"/>
      </div>
      <h2 style={{fontSize:28,marginBottom:12}}>Application Received!</h2>
      <p style={{color:"var(--mut)",lineHeight:1.7,marginBottom:28}}>Thank you {form.fname}. The ATBUConnect team will review your application and verify your staff credentials. You'll receive a confirmation email within 3 working days.</p>
      <button className="btn btn-navy" onClick={()=>{setSubmitted(false);setStep(0);setForm({fname:"",lname:"",email:"",staffId:"",dept:"",role:"",bio:"",why:"",refs:""});}}>Submit Another Application</button>
    </div>
  );

  return (
    <div style={{maxWidth:640,margin:"0 auto"}}>
      <div className="fu" style={{marginBottom:28,textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:56,height:56,background:"rgba(212,175,55,.15)",borderRadius:16,marginBottom:16}}><Ic n="cap" s={26} c={T.gold}/></div>
        <h2 style={{fontSize:26,marginBottom:8}}>Apply for Staff Access</h2>
        <p style={{color:"var(--mut)",fontSize:15}}>Join ATBUConnect as a verified lecturer to guide and empower students.</p>
      </div>

      {/* Step indicator */}
      <div style={{display:"flex",alignItems:"center",marginBottom:32}} className="fu fu1">
        {steps.map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:"auto"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <div className="step-dot" style={{background:i<step?"#10B981":i===step?T.gold:"var(--brd)",color:i<=step?"#fff":"var(--mut)",fontSize:12}}>
                {i<step?<Ic n="check" s={14} c="#fff"/>:i+1}
              </div>
              <span style={{fontSize:11,color:i===step?T.gold:i<step?"#10B981":"var(--faint)",fontWeight:600,whiteSpace:"nowrap"}}>{s}</span>
            </div>
            {i<steps.length-1&&<div style={{flex:1,height:2,background:i<step?"#10B981":"var(--brd)",margin:"0 8px",marginBottom:22,transition:"background .3s"}}/>}
          </div>
        ))}
      </div>

      <div className="apply-border-wrap fu fu2">
        <div className="apply-border-inner" style={{padding:28}}>
        {step===0&&(
          <div style={{animation:"fadeUp .35s ease"}}>
            <h3 style={{marginBottom:20,fontSize:18}}>Personal Information</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <div><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>First Name *</label><input className="inp" value={form.fname} onChange={e=>upd("fname",e.target.value)} placeholder="Adamu"/></div>
              <div><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Last Name *</label><input className="inp" value={form.lname} onChange={e=>upd("lname",e.target.value)} placeholder="Garba"/></div>
            </div>
            <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>University Email *</label><input className="inp" type="email" value={form.email} onChange={e=>upd("email",e.target.value)} placeholder="a.garba@atbu.edu.ng"/></div>
            <div><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Phone Number</label><input className="inp" value={form.phone||""} onChange={e=>upd("phone",e.target.value)} placeholder="+234 80X XXX XXXX"/></div>
          </div>
        )}
        {step===1&&(
          <div style={{animation:"fadeUp .35s ease"}}>
            <h3 style={{marginBottom:20,fontSize:18}}>Academic Details</h3>
            <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Staff ID / IPPIS Number *</label><input className="inp" value={form.staffId} onChange={e=>upd("staffId",e.target.value)} placeholder="ATBU/STF/0001"/></div>
            <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Department *</label>
              <select className="inp" value={form.dept} onChange={e=>upd("dept",e.target.value)}>
                <option value="">Select your department</option>
                {DEPTS.map(d=><option key={d.name} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Current Role / Title *</label><input className="inp" value={form.role} onChange={e=>upd("role",e.target.value)} placeholder="e.g. Senior Lecturer, Lecturer I…"/></div>
            <div><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Academic References</label><input className="inp" value={form.refs} onChange={e=>upd("refs",e.target.value)} placeholder="e.g. Prof. X, Dr. Y (optional)"/></div>
          </div>
        )}
        {step===2&&(
          <div style={{animation:"fadeUp .35s ease"}}>
            <h3 style={{marginBottom:20,fontSize:18}}>Personal Statement</h3>
            <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Academic Bio *</label><textarea className="inp" style={{minHeight:100}} value={form.bio} onChange={e=>upd("bio",e.target.value)} placeholder="Brief description of your research interests, expertise, and courses you teach…"/></div>
            <div><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:7}}>Why do you want to join ATBUConnect? *</label><textarea className="inp" style={{minHeight:100}} value={form.why} onChange={e=>upd("why",e.target.value)} placeholder="How do you plan to contribute to the student community?"/></div>
          </div>
        )}
        {step===3&&(
          <div style={{animation:"fadeUp .35s ease"}}>
            <h3 style={{marginBottom:20,fontSize:18}}>Review Your Application</h3>
            {[["Name",`${form.fname} ${form.lname}`],["Email",form.email],["Staff ID",form.staffId],["Department",form.dept],["Role",form.role]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid var(--brd)",fontSize:14}}>
                <span style={{color:"var(--mut)",fontWeight:500}}>{l}</span>
                <span style={{fontWeight:600}}>{v||"—"}</span>
              </div>
            ))}
            <div style={{padding:14,background:"rgba(212,175,55,.1)",borderRadius:12,marginTop:18,border:"1px solid rgba(212,175,55,.3)"}}>
              <p style={{fontSize:13,color:"var(--mut)",lineHeight:1.6}}>By submitting, you confirm all information is accurate and you consent to the ATBUConnect team verifying your credentials with ATBU HR records.</p>
            </div>
          </div>
        )}

        <div style={{display:"flex",justifyContent:"space-between",marginTop:28,gap:12}}>
          <button className="btn btn-out" onClick={()=>setStep(p=>Math.max(0,p-1))} style={{visibility:step===0?"hidden":"visible"}}>← Back</button>
          {step<3?(
            <button className="btn btn-navy" onClick={()=>canNext()&&setStep(p=>p+1)} style={{opacity:canNext()?1:.5,cursor:canNext()?"pointer":"not-allowed"}}>
              Continue →
            </button>
          ):(
            <button className="btn btn-pri" onClick={submit}><Ic n="check" s={15} c="#061220"/>Submit Application</button>
          )}
        </div>
        </div>{/* apply-border-inner */}
      </div>{/* apply-border-wrap */}
    </div>
  );
}




export default ApplyPage;
