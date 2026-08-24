import { useState } from "react";
const STORE_URL = "https://shop.mimiscozycorner.com/";

// This will be replaced by the build script - placeholder for now
// The actual file list will be injected by the python script below that uses real files

const imageModules = import.meta.glob("/public/images/*.{png,jpg,jpeg,webp,PNG,JPG,WEBP}", { 
  eager: true, 
  as: "url" 
}) as Record<string, string>;

type Design = { title: string; image: string };

const designs: Design[] = Object.entries(imageModules)
  .filter(([p]) => {
    const lower = p.toLowerCase();
    return !lower.includes("logo") && !lower.includes(".htm") && !lower.includes("zip") && !lower.includes("business");
  })
  .map(([path, url]) => {
    const fileName = path.split("/").pop() || "";
    const name = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").trim();
    const title = name.split(" ").slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    const cleanUrl = "/images/" + encodeURIComponent(fileName);
    return { title: title || "Cozy Design", image: cleanUrl };
  });

export default function App() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Design | null>(null);
  const list = designs.filter(d => d.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ background: "#fffaf5", minHeight: "100vh", fontFamily: "system-ui" }}>
      <header style={{ padding: "20px", textAlign: "center", background: "white", borderBottom: "2px solid #ff69b4", position: "sticky", top: 0, zIndex: 10 }}>
        <h1 style={{ color: "#a2006d", margin: 0, fontSize: "32px", fontWeight: 900 }}>Mimi's Cozy Corner</h1>
        <p>{list.length} Designs - You Choose The Product</p>
        <input placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} style={{ padding: "10px 20px", borderRadius: "20px", border: "1px solid #ffb6d9", width: "300px", marginTop: "10px" }} />
        <div style={{ marginTop: "10px" }}>
          <a href={STORE_URL} target="_blank" style={{ color: "#a2006d", fontWeight: 700, fontSize: "13px" }}>shop.mimiscozycorner.com</a>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", padding: "20px", maxWidth: "1300px", margin: "0 auto" }}>
        {list.map((d, i) => (
          <div key={i} onClick={() => setSel(d)} style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: "pointer" }}>
            <div style={{ background: "#fef2f8", aspectRatio: "1" }}>
              <img src={d.image} alt={d.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).parentElement!.parentElement!.style.display = "none"; }} />
            </div>
            <div style={{ padding: "10px" }}>
              <div style={{ fontWeight: 600, fontSize: "13px", height: "32px", overflow: "hidden" }}>{d.title}</div>
              <div style={{ marginTop: "8px", background: "#a2006d", color: "white", textAlign: "center", padding: "8px", borderRadius: "8px", fontSize: "11px", fontWeight: 800 }}>CHOOSE PRODUCT</div>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }} onClick={() => setSel(null)}>
          <div style={{ background: "white", borderRadius: "20px", maxWidth: "480px", width: "100%", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
            <img src={sel.image} style={{ width: "100%", maxHeight: "380px", objectFit: "contain", background: "#fef2f8" }} alt={sel.title} />
            <div style={{ padding: "18px" }}>
              <h3 style={{ margin: "0 0 8px" }}>{sel.title}</h3>
              <p style={{ fontSize: "13px", opacity: 0.6 }}>Choose your product on our official shop:</p>
              <a href={STORE_URL} target="_blank" style={{ display: "block", padding: "12px", background: "#a2006d", color: "white", textAlign: "center", borderRadius: "10px", fontWeight: 800, textDecoration: "none", marginTop: "12px" }}>SHOP AT shop.mimiscozycorner.com</a>
              <button onClick={() => setSel(null)} style={{ width: "100%", marginTop: "8px", padding: "8px", border: "none", background: "#eee", borderRadius: "8px", cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ textAlign: "center", padding: "30px", fontSize: "11px", opacity: 0.5 }}>
        {designs.length} Designs • shop.mimiscozycorner.com
      </footer>
    </div>
  );
}
