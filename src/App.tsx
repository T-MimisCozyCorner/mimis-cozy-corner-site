import { useState } from "react";
const imageModules = import.meta.glob("/public/images/*.{png,jpg,jpeg,webp,svg,JPG,PNG,WEBP}", { eager: true, as: 'url' }) as Record<string, string>;
const STORE_URL = "https://shop.mimiscozycorner.com/";
type Design = { title: string; image: string; file: string };
const designs: Design[] = Object.entries(imageModules).map(([path, url]) => {
    const fileName = path.split("/").pop() || "";
    const lower = fileName.toLowerCase();
    if (lower.includes("logo") || lower.includes("business plan") || lower.includes(".htm") || lower.includes("zip") || lower.includes("html")) return null;
    const name = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").trim();
    const title = name.split(" ").slice(0, 5).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    const cleanUrl = `/images/${encodeURIComponent(fileName)}`;
    return { title: title || "Cozy Design", image: cleanUrl, file: fileName };
  }).filter(Boolean) as Design[];
export default function App() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Design | null>(null);
  const filtered = designs.filter(d => d.title.toLowerCase().includes(q.toLowerCase()) || d.file.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ background: "#fffaf5", minHeight: "100vh", fontFamily: "system-ui" }}>
      <header style={{ padding: "28px 20px", textAlign: "center", borderBottom: "2px solid #ff69b4", background: "white", position: "sticky", top: 0, zIndex: 10 }}>
        <h1 style={{ color: "#a2006d", margin: 0, fontSize: "34px", fontWeight: 900 }}>Mimi's Cozy Corner</h1>
        <p style={{ margin: "8px 0 0", opacity: 0.7, fontSize: "14px" }}>{filtered.length} Unique Designs • You Choose The Product</p>
        <input placeholder="Search designs..." value={q} onChange={e => setQ(e.target.value)} style={{ padding: "12px 22px", width: "340px", maxWidth: "90%", borderRadius: "24px", border: "1.5px solid #ffb6d9", marginTop: "16px" }} />
        <div style={{ marginTop: "12px" }}><a href={STORE_URL} target="_blank" style={{ color: "#a2006d", fontWeight: 700, fontSize: "13px" }}>Visit Full Shop → shop.mimiscozycorner.com ✨</a></div>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "18px", padding: "22px", maxWidth: "1400px", margin: "0 auto" }}>
        {filtered.map((d, i) => (
          <div key={i} onClick={() => setSelected(d)} style={{ background: "white", borderRadius: "18px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer" }}>
            <div style={{ background: "#fef2f8", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={d.image} alt={d.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }} loading="lazy" onError={e => { (e.target as HTMLImageElement).parentElement!.parentElement!.parentElement!.style.display = "none" }} />
            </div>
            <div style={{ padding: "12px" }}><div style={{ fontWeight: 600, fontSize: "13px", height: "36px", overflow: "hidden" }}>{d.title}</div><div style={{ marginTop: "10px", background: "#a2006d", color: "white", textAlign: "center", padding: "9px", borderRadius: "10px", fontSize: "12px", fontWeight: 800 }}>CHOOSE PRODUCT</div></div>
          </div>
        ))}
      </div>
      {selected && (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }} onClick={() => setSelected(null)}><div style={{ background: "white", borderRadius: "22px", maxWidth: "520px", width: "100%", overflow: "hidden" }} onClick={e => e.stopPropagation()}><img src={selected.image} alt={selected.title} style={{ width: "100%", maxHeight: "420px", objectFit: "contain", background: "#fef2f8" }} /><div style={{ padding: "22px" }}><h2 style={{ margin: "0 0 6px" }}>{selected.title}</h2><p style={{ opacity: 0.6, fontSize: "13px" }}>Pick your product on our official shop:</p><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "16px 0" }}>{["T-Shirt","Hoodie","Mug","Tote","Canvas","Sticker","Sweatshirt","Onesie"].map(p=>(<div key={p} style={{ padding: "11px", border: "1px solid #ffd6e8", borderRadius: "11px", textAlign: "center", fontWeight: 600 }}>{p}</div>))}</div><a href={STORE_URL} target="_blank" style={{ display: "block", padding: "15px", background: "#a2006d", color: "white", textAlign: "center", borderRadius: "12px", fontWeight: 900, textDecoration: "none" }}>SHOP THIS AT shop.mimiscozycorner.com →</a><button onClick={() => setSelected(null)} style={{ marginTop: "10px", width: "100%", padding: "11px", background: "#f5f5f5", border: "none", borderRadius: "10px" }}>Close</button></div></div></div>)}
      <footer style={{ textAlign: "center", padding: "36px", fontSize: "11px", opacity: 0.5 }}>{designs.length} Designs • <a href={STORE_URL} style={{ color: "#a2006d" }}>shop.mimiscozycorner.com</a></footer>
    </div>
  );
}
