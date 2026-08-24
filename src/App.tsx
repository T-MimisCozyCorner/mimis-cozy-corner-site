import { useState } from "react";
// PRINTIFY ONLY - NO SHOPIFY
const PRINTIFY_POPUP_STORE = "https://printify.com/app/store/1"; // Your Printify dashboard
const PRINTIFY_STORE_FRONT = "https://mimis-cozy-corner.printify.me"; // Try this, or your custom printify.me URL

const imageModules = import.meta.glob("/public/images/*.{png,jpg,jpeg,webp,PNG,JPG,WEBP}", { eager: true, as: "url" }) as Record<string, string>;
type Design = { title: string; image: string; fileName: string };
const designs: Design[] = Object.entries(imageModules)
.filter(([p]) =>!p.toLowerCase().includes("mimis-cozy-logo") &&!p.toLowerCase().includes("cozy_corner_banner") &&!p.toLowerCase().includes("cozy_banner"))
.filter(([p]) =>!p.toLowerCase().includes(".htm") &&!p.toLowerCase().includes("business") &&!p.toLowerCase().includes("zip"))
.map(([path]) => {
    const fileName = path.split("/").pop() || "";
    const name = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").trim();
    const title = name.split(" ").slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    const cleanUrl = "/images/" + encodeURIComponent(fileName);
    return { title: title || "Cozy Design", image: cleanUrl, fileName };
  });

export default function App() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Design | null>(null);
  const [creating, setCreating] = useState(false);
  const list = designs.filter(d => d.title.toLowerCase().includes(q.toLowerCase()));

  const createInPrintify = async (design: Design) => {
    setCreating(true);
    try {
      const res = await fetch('/api/printify/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: design.title, imageUrl: window.location.origin + design.image })
      });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Created in Printify! Product ID: ${data.product_id}\nNow publish it to your Pop-up Store in Printify dashboard!`);
        window.open(`https://printify.com/app/store/1/products/${data.product_id}`, '_blank');
      } else {
        alert('❌ Failed: ' + data.error + '\nCheck Vercel env vars: PRINTIFY_STORE_ID and PRINTIFY_API_TOKEN');
      }
    } catch (e) { alert('Error: ' + e); }
    setCreating(false);
  };

  return (
    <div style={{ background: "#fffaf5", minHeight: "100vh", fontFamily: "system-ui" }}>
      <div style={{ background: "white", textAlign: "center", borderBottom: "3px solid #ff69b4" }}>
        <img src="/images/mimis-cozy-logo.png" alt="Mimi's Cozy Corner" style={{ width: "100%", maxWidth: "1200px", height: "auto", display: "block", margin: "0 auto" }} />
        <div style={{ padding: "0 20px 16px" }}>
          <p style={{ margin: "0", color: "#a2006d", fontWeight: 700 }}>{list.length} Designs - Direct to Printify</p>
          <div style={{ marginTop: "12px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <input placeholder="Search designs..." value={q} onChange={e => setQ(e.target.value)} style={{ padding: "10px 20px", borderRadius: "20px", border: "1px solid #ffb6d9", width: "280px" }} />
            <a href="https://printify.com/app/store/1/products" target="_blank" style={{ padding: "10px 18px", background: "#a2006d", color: "white", borderRadius: "20px", textDecoration: "none", fontWeight: 700, fontSize: "13px" }}>VIEW PRINTIFY STORE</a>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "16px", padding: "20px", maxWidth: "1300px", margin: "0 auto" }}>
        {list.map((d, i) => (
          <div key={i} style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div onClick={() => setSel(d)} style={{ background: "#fef2f8", aspectRatio: "1", cursor: "pointer" }}>
              <img src={d.image} alt={d.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} loading="lazy" onError={(e) => { (e.currentTarget.parentElement!.parentElement! as HTMLElement).style.display = "none"; }} />
            </div>
            <div style={{ padding: "10px" }}>
              <div style={{ fontWeight: 600, fontSize: "13px", height: "32px", overflow: "hidden" }}>{d.title}</div>
              <button onClick={() => createInPrintify(d)} disabled={creating} style={{ marginTop: "8px", background: "#a2006d", color: "white", width: "100%", padding: "10px", borderRadius: "8px", fontSize: "11px", fontWeight: 800, border: "none", cursor: "pointer" }}>
                {creating? 'CREATING...' : 'CREATE IN PRINTIFY'}
              </button>
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
              <button onClick={() => createInPrintify(sel)} disabled={creating} style={{ width: "100%", padding: "12px", background: "#a2006d", color: "white", borderRadius: "10px", fontWeight: 800, border: "none" }}>{creating? 'CREATING...' : 'CREATE THIS IN PRINTIFY'}</button>
              <button onClick={() => setSel(null)} style={{ width: "100%", marginTop: "8px", padding: "8px", border: "none", background: "#eee", borderRadius: "8px" }}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ textAlign: "center", padding: "30px", color: "#a2006d" }}>
        <p>All products fulfilled by Printify • <a href="https://printify.com/app/store/1" target="_blank" style={{ color: "#a2006d", fontWeight: 700 }}>Manage in Printify</a></p>
      </div>
    </div>
  );
}
