import { useState } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';

/* Lifted outside component to avoid re-creating on every render (ESLint fix) */
function SocialRow() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 12 }}>
      {[["G", "#EA4335"], ["f", "#1877F2"], ["in", "#0A66C2"], ["𝕏", "#000"]].map(([ic]) => (
        <button key={ic} className="auth-social-btn">{ic}</button>
      ))}
    </div>
  );
}

function AuthModal({ tab: initTab, onClose, onSuccess }) {
  const [active, setActive] = useState(initTab === "register");
  const [form, setForm] = useState({
    id: "", pass: "", fname: "", lname: "", matric: "", email: "", rpass: "",
  });
  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div
      className="overlay auth-modal-overlay"
      style={{ zIndex: 2000 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/*
        auth-shadow-wrap: holds drop-shadow so overflow:hidden on auth-outer
        doesn't clip the glow. auth-outer uses overflow:hidden to stop the
        conic-gradient animation from bleeding outside the border-radius.
      */}
      <div className="auth-shadow-wrap">
        <div className={`auth-outer${active ? " active" : ""}`}>

          {/* Close — z-index 30, floats above all panels */}
          <button className="auth-close" onClick={onClose}>
            <Ic n="x" s={14} />
          </button>

          {/* auth-inner: clips the two sliding form panels */}
          <div className="auth-inner">

            {/* LOGIN PANEL */}
            <div className="auth-form-panel auth-login">
              <div style={{ width: "100%", maxWidth: 310 }}>
                <div style={{ marginBottom: 20, textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 13,
                    background: "linear-gradient(135deg,#D4AF37,#b89228)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px", boxShadow: "0 6px 20px rgba(212,175,55,.35)",
                  }}>
                    <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                      <path d="M20 7L26 13H22V20H18V13H14L20 7Z" fill="#0B1F35" />
                      <path d="M12 21H28V23C28 27.418 24.418 31 20 31C15.582 31 12 27.418 12 23V21Z" fill="#0B1F35" />
                      <circle cx="20" cy="18" r="3" fill="#D4AF37" />
                    </svg>
                  </div>
                  <h2 style={{ fontSize: 20, marginBottom: 3, fontFamily: "'Playfair Display',serif" }}>
                    Welcome Back
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--faint)" }}>Sign in to ATBUConnect</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                  <input className="auth-inp" value={form.id}
                    onChange={e => upd("id", e.target.value)}
                    placeholder="Matric No. or Email (U22CS0001)" />
                  <input className="auth-inp" type="password" value={form.pass}
                    onChange={e => upd("pass", e.target.value)}
                    placeholder="Password" />
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 12, color: T.gold, cursor: "pointer", fontWeight: 600 }}>
                      Forgot Password?
                    </span>
                  </div>
                </div>

                <button className="auth-btn"
                  onClick={() => onSuccess({ name: form.id || "Student" })}>
                  Sign In to ATBUConnect
                </button>
                <p style={{ fontSize: 12, color: "var(--faint)", textAlign: "center", margin: "12px 0 0" }}>
                  or continue with
                </p>
                <SocialRow />
              </div>
            </div>

            {/* REGISTER PANEL */}
            <div className="auth-form-panel auth-register">
              <div style={{ width: "100%", maxWidth: 310 }}>
                <div style={{ marginBottom: 16, textAlign: "center" }}>
                  <h2 style={{ fontSize: 20, marginBottom: 3, fontFamily: "'Playfair Display',serif" }}>
                    Create Account
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--faint)" }}>Join the ATBUConnect community</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                    <input className="auth-inp" value={form.fname}
                      onChange={e => upd("fname", e.target.value)} placeholder="First Name" />
                    <input className="auth-inp" value={form.lname}
                      onChange={e => upd("lname", e.target.value)} placeholder="Last Name" />
                  </div>
                  <input className="auth-inp" value={form.matric}
                    onChange={e => upd("matric", e.target.value)} placeholder="Matric Number (U22CS0001)" />
                  <input className="auth-inp" type="email" value={form.email}
                    onChange={e => upd("email", e.target.value)} placeholder="University Email" />
                  <input className="auth-inp" type="password" value={form.rpass}
                    onChange={e => upd("rpass", e.target.value)} placeholder="Create a strong password" />
                </div>

                <button className="auth-btn gold-btn"
                  onClick={() => onSuccess({ name: form.fname || "Student" })}>
                  Create My Account
                </button>
                <p style={{ fontSize: 12, color: "var(--faint)", textAlign: "center", margin: "12px 0 0" }}>
                  or register with
                </p>
                <SocialRow />
              </div>
            </div>

          </div>{/* /auth-inner */}

          {/* TOGGLE OVERLAY — lives inside auth-outer but outside auth-inner */}
          <div className="auth-toggle-box">

            <div className="auth-toggle-panel auth-toggle-left">
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(212,175,55,.18)", border: "1.5px solid rgba(212,175,55,.35)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
              }}>
                <Ic n="cap" s={26} c="#D4AF37" />
              </div>
              <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display',serif", marginBottom: 8, color: "#fff" }}>
                Hello, Welcome!
              </h2>
              <p style={{ fontSize: 13, opacity: .8, marginBottom: 22, lineHeight: 1.6, maxWidth: 190, color: "#fff" }}>
                Don't have an account? Join thousands of ATBU students today.
              </p>
              <button className="auth-toggle-btn" onClick={() => setActive(true)}>Register Now</button>
            </div>

            <div className="auth-toggle-panel auth-toggle-right">
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(212,175,55,.18)", border: "1.5px solid rgba(212,175,55,.35)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
              }}>
                <Ic n="user" s={26} c="#D4AF37" />
              </div>
              <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display',serif", marginBottom: 8, color: "#fff" }}>
                Welcome Back!
              </h2>
              <p style={{ fontSize: 13, opacity: .8, marginBottom: 22, lineHeight: 1.6, maxWidth: 190, color: "#fff" }}>
                Already have an account? Sign in to continue your journey.
              </p>
              <button className="auth-toggle-btn" onClick={() => setActive(false)}>Sign In</button>
            </div>

          </div>{/* /auth-toggle-box */}

        </div>{/* /auth-outer */}
      </div>{/* /auth-shadow-wrap */}
    </div>
  );
}

export default AuthModal;