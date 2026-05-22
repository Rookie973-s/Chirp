import { useState, useEffect, useRef } from 'react';
import T from '../../tokens';
import Ic from '../Ic';

const BottomNav = ({ page, onNav, hidden }) => {
  const [scrollHide, setScrollHide] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) { setScrollHide(false); lastY.current = y; return; }
      if (y > lastY.current + 8) setScrollHide(true);
      else if (y < lastY.current - 8) setScrollHide(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHidden = hidden || scrollHide;

  return (
    <div
      className="bottom-nav"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
        background: "rgba(0,11,24,.97)", backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,.07)",
        display: "flex",
        padding: "6px 8px calc(6px + env(safe-area-inset-bottom))",
        justifyContent: "space-around", alignItems: "flex-end",
        transform: isHidden ? "translateY(105%)" : "translateY(0)",
        transition: "transform .32s cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 -8px 32px rgba(0,0,0,.3)",
      }}
    >
      {[
        { ic: "home",     l: "Home",  p: "home"    },
        { ic: "trending",     l: "Feed",  p: "feed"    },
        { ic: "feed", l: "Media", p: "media"   },
        { ic: "users",    l: "Staff", p: "staff"   },
        { ic: "user",     l: "Me",    p: "profile" },
      ].map(({ ic, l, p }) => {
        const active = page === p;
        return (
          <button key={p} onClick={() => onNav(p)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            padding: "6px 14px 4px", background: "none", border: "none", cursor: "pointer",
            fontFamily: "inherit", position: "relative", transition: "all .18s",
            color: active ? T.gold : "rgba(255,255,255,.45)",
          }}>
            {active && (
              <span style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: 20, height: 2.5, borderRadius: 2,
                background: `linear-gradient(90deg,${T.gold},#2563EB)`,
                boxShadow: "0 0 8px rgba(59,130,246,.6)",
              }} />
            )}
            <span style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36, borderRadius: 12,
              background: active ? "rgba(59,130,246,.14)" : "transparent",
              transition: "all .18s",
            }}>
              <Ic n={ic} s={19} c={active ? T.gold : "rgba(255,255,255,.45)"} />
            </span>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: .2 }}>{l}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
