import { useState } from 'react';
import T from '../tokens';
import Ic from '../components/Ic';

/* Lifted outside component to avoid re-creating on every render */
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
      <div className="auth-shadow-wrap">
        <div className={`auth-outer${active ? " active" : ""}`}>

          {/* Close button */}
          <button className="auth-close" onClick={onClose}>
            <Ic n="x" s={14} />
          </button>

          {/* auth-inner: clips the two sliding form panels */}
          <div className="auth-inner">

            {/* ── LOGIN PANEL ── */}
            <div className="auth-form-panel auth-login">
              <div style={{ width: "100%", maxWidth: 310 }}>
                {/* Heading — no logo icon */}
                <div style={{ marginBottom: 24, textAlign: "center" }}>
                  <h2 style={{ fontSize: 22, marginBottom: 4, fontFamily: "'Playfair Display',serif" }}>
                    Welcome Back
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--faint)" }}>Sign in to CeNet</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                  <input
                    className="auth-inp"
                    value={form.id}
                    onChange={e => upd("id", e.target.value)}
                    placeholder="Matric No. or Email (U22CS0001)"
                  />
                  <input
                    className="auth-inp"
                    type="password"
                    value={form.pass}
                    onChange={e => upd("pass", e.target.value)}
                    placeholder="Password"
                  />
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 12, color: T.gold, cursor: "pointer", fontWeight: 600 }}>
                      Forgot Password?
                    </span>
                  </div>
                </div>

                <button className="auth-btn"
                  onClick={() => onSuccess({ name: form.id || "Student" })}>
                  Sign In to CeNet
                </button>
                <p style={{ fontSize: 12, color: "var(--faint)", textAlign: "center", margin: "12px 0 0" }}>
                  or continue with
                </p>
                <SocialRow />
              </div>
            </div>

            {/* ── REGISTER PANEL ── */}
            <div className="auth-form-panel auth-register">
              <div style={{ width: "100%", maxWidth: 310 }}>
                {/* Heading — no logo icon */}
                <div style={{ marginBottom: 18, textAlign: "center" }}>
                  <h2 style={{ fontSize: 22, marginBottom: 4, fontFamily: "'Playfair Display',serif" }}>
                    Create Account
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--faint)" }}>Join the CeNet community</p>
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

          {/* ── TOGGLE OVERLAY ── */}
          <div className="auth-toggle-box">

            <div className="auth-toggle-panel auth-toggle-left">
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(59,130,246,.18)", border: "1.5px solid rgba(59,130,246,.35)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
              }}>
                <Ic n="cap" s={26} c="#3B82F6" />
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
                background: "rgba(59,130,246,.18)", border: "1.5px solid rgba(59,130,246,.35)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
              }}>
                <Ic n="user" s={26} c="#3B82F6" />
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