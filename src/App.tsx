import { useState } from "react";

// Vite will auto-load EVERY image in public/images - no manual list needed
const imageModules = import.meta.glob("/public/images/*.{png,jpg,jpeg,webp,svg,JPG,PNG,WEBP}", { 
  eager: true, 
  as: 'url' 
}) as Record<string, string>;

const STORE_URL = "https://shop.mimiscozycorner.com/";

type Design = { title: string; image: string; file: string };

const designs: Design[] = Object.entries(imageModules)
  .map(([path, url]) => {
    const fileName = path.split("/").pop() || "";
    // Skip junk
    const lower = fileName.toLowerCase();
    if (lower.includes("logo") || lower.includes("business plan") || lower.includes(".htm") || lower.includes("zip") || lower.includes("html")) return null;
    const name = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").trim();
    const title = name.split(" ").slice(0, 5).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    // Convert /public/images/file.png -> /images/file.png
    const publicUrl = url.includes("/public/") ? url : `/images/${encodeURIComponent(fileName)}`;
    const finalUrl = publicUrl.startsWith("/public") ? publicUrl.replace("/public", "") : publicUrl.startsWith("/") ? publicUrl : `/images/${encodeURIComponent(fileName)}`;
    // For eager as url, it already gives /public/images/... or /src/assets... - normalize to /images/
    const cleanUrl = `/images/${encodeURIComponent(fileName)}`;
    return { title: title || "Cozy Design", image: cleanUrl, file: fileName };
  })
  .filter(Boolean) as Design[];

export default function App() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Design | null>(null);
  
  const filtered = designs.filter(d => 
    d.title.toLowerCase().includes(q.toLowerCase()) ||
    d.file.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{ background: "#fffaf5", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ padding: "28px 20px", textAlign: "center", borderBottom: "2px solid #ff69b4", background: "white", position: "sticky", top: 0, zIndex: 10 }}>
        <h1 style={{ color: "#a2006d", margin: 0, fontSize: "34px", fontWeight: 900, letterSpacing: "-0.5px" }}>Mimi's Cozy Corner</h1>
        <p style={{ margin: "8px 0 0", opacity: 0.7, fontSize: "14px" }}>{filtered.length} Unique Designs • You Choose The Product</p>
        <input 
          placeholder="Search designs..." 
          value={q} 
          onChange={e => setQ(e.target.value)} 
          style={{ padding: "12px 22px", width: "340px", maxWidth: "90%", borderRadius: "24px", border: "1.5px solid #ffb6d9", marginTop: "16px", fontSize: "14px", outline: "none" }}
        />
        <div style={{ marginTop: "12px" }}>
          <a href={STORE_URL} target="_blank" style={{ color: "#a2006d", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>Visit Full Shop → shop.mimiscozycorner.com ✨</a>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "18px", padding: "22px", maxWidth: "1400px", margin: "0 auto" }}>
        {filtered.map((d, i) => (
          <div 
            key={i} 
            onClick={() => setSelected(d)} 
            style={{ background: "white", borderRadius: "18px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            <div style={{ background: "#fef2f8", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <img 
                src={d.image} 
                alt={d.title}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }} 
                loading="lazy" 
                onError={e => { (e.target as HTMLImageElement).parentElement!.parentElement!.parentElement!.style.display = "none" }}
              />
            </div>
            <div style={{ padding: "12px 12px 14px" }}>
              <div style={{ fontWeight: 600, fontSize: "13px", lineHeight: "1.3", height: "36px", overflow: "hidden" }}>{d.title}</div>
              <div style={{ marginTop: "10px", background: "#a2006d", color: "white", textAlign: "center", padding: "9px", borderRadius: "10px", fontSize: "12px", fontWeight: 800, letterSpacing: "0.3px" }}>CHOOSE PRODUCT</div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }} onClick={() => setSelected(null)}>
          <div style={{ background: "white", borderRadius: "22px", maxWidth: "520px", width: "100%", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
            <img src={selected.image} alt={selected.title} style={{ width: "100%", maxHeight: "420px", objectFit: "contain", background: "#fef2f8" }} />
            <div style={{ padding: "22px" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: "19px" }}>{selected.title}</h2>
              <p style={{ margin: "0 0 16px", opacity: 0.6, fontSize: "13px" }}>Love this design? Pick your product on our official shop — you choose size, color & style:</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" }}>
                {["T-Shirt", "Hoodie", "Sweatshirt", "Mug", "Tote Bag", "Canvas Print", "Sticker", "Baby Onesie"].map(p => (
                  <div key={p} style={{ padding: "11px", border: "1px solid #ffd6e8", borderRadius: "11px", background: "#fffaf5", textAlign: "center", fontWeight: 600, fontSize: "13px" }}>{p}</div>
                ))}
              </div>
              <a href={STORE_URL} target="_blank" style={{ display: "block", padding: "15px", background: "#a2006d", color: "white", textDecoration: "none", textAlign: "center", borderRadius: "12px", fontWeight: 900, fontSize: "14px", letterSpacing: "0.3px" }}>
                SHOP THIS AT shop.mimiscozycorner.com →
              </a>
              <button onClick={() => setSelected(null)} style={{ marginTop: "10px", width: "100%", padding: "11px", background: "#f5f5f5", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>Close</button>
              <p style={{ fontSize: "11px", opacity: 0.45, marginTop: "12px", textAlign: "center" }}>No prices here — you choose product & options on Printify</p>
            </div>
          </div>
        </div>
      )}

      <footer style={{ textAlign: "center", padding: "36px 20px", fontSize: "11px", opacity: 0.5, lineHeight: "1.6" }}>
        {designs.length} Designs • Customer Chooses Product on Printify<br />
        <a href={STORE_URL} style={{ color: "#a2006d", fontWeight: 700 }}>shop.mimiscozycorner.com</a> • mimis-shop.vercel.app
      </footer>
    </div>
  );
}