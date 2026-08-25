
import { useState } from "react";

const mods = import.meta.glob("/public/images/*.{png,jpg,jpeg,webp,PNG,JPG,WEBP}", { eager: true, as: "url" }) as Record<string, string>;
type Design = { title: string; image: string; brand: "budget" | "daily" | "creative" | "atlas" | "other" };
type Prod = { name: string; bp: number; pp: number; vars: number[]; price: string; emoji: string };

const PRODS: Prod[] = [
  { name: "Unisex T-Shirt", bp: 6, pp: 99, vars: [40142,40143,40144,40145], price: "$24.99", emoji: "👕" },
  { name: "Hoodie", bp: 5, pp: 99, vars: [40049,40050,40051], price: "$44.99", emoji: "🧥" },
  { name: "Mug 11oz", bp: 86, pp: 99, vars: [47745], price: "$14.99", emoji: "☕" },
  { name: "Tote Bag", bp: 12, pp: 99, vars: [41021], price: "$19.99", emoji: "👜" },
];

const getBrand = (fn: string): Design["brand"] => {
  const f = fn.toLowerCase();
  if (f.includes("budget") || f.includes("broke") || f.includes("save") || f.includes("cheap") || f.includes("dollar") || f.includes("coupon")) return "budget";
  if (f.includes("daily") || f.includes("find") || f.includes("cozy") || f.includes("soft life") || f.includes("mom fuel") || f.includes("bookish") || f.includes("cozy reader")) return "daily";
  if (f.includes("ad") || f.includes("creative") || f.includes("mama needs") || f.includes("stfu") || f.includes("snarky") || f.includes("funny")) return "creative";
  if (f.includes("atlas") || f.includes("sec 8") || f.includes("sec8") || f.includes("section") || f.includes("spirit") || f.includes("manifest") || f.includes("chakra") || f.includes("divine") || f.includes("cosmic") || f.includes("heal") || f.includes("calm") || f.includes("peace")) return "atlas";
  // default bucket by keyword
  if (f.includes("mom") || f.includes("dad") || f.includes("family")) return "daily";
  return "other";
};

const allDesigns: Design[] = Object.entries(mods)
.filter(([p])=>!p.toLowerCase().includes("mimis-cozy-logo") && !p.toLowerCase().includes("rochestercontent_logo") && !p.toLowerCase().includes(".htm"))
.map(([path])=>{
  const fn = path.split("/").pop()||"";
  const name = fn.replace(/\.[^/.]+$/,"").replace(/[_-]/g," ").trim();
  const title = name.split(" ").slice(0,5).map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(" ");
  return { title, image: "/images/"+encodeURIComponent(fn), brand: getBrand(fn) };
});

export default function App(){
  const [q,setQ]=useState("");
  const [brand,setBrand]=useState<"all"|"budget"|"daily"|"creative"|"atlas">("all");
  const [sel,setSel]=useState<Design|null>(null);
  const [selProd,setSelProd]=useState<Prod>(PRODS[0]);
  const [creating,setCreating]=useState(false);
  const [genTab,setGenTab]=useState(false);
  const [prompt,setPrompt]=useState("");
  const [genImage,setGenImage]=useState<string|null>(null);
  const [generating,setGenerating]=useState(false);

  const filtered = allDesigns.filter(d=>{
    if (brand!=="all" && d.brand!==brand) return false;
    if (q && !d.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: allDesigns.length,
    budget: allDesigns.filter(d=>d.brand==="budget").length,
    daily: allDesigns.filter(d=>d.brand==="daily").length,
    creative: allDesigns.filter(d=>d.brand==="creative").length,
    atlas: allDesigns.filter(d=>d.brand==="atlas").length,
  };

  const create = async (img: string, title: string)=>{
    setCreating(true);
    try{
      const fullUrl = img.startsWith("http") ? img : window.location.origin + img;
      const res = await fetch('/api/printify/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title: `${title} - ${selProd.name}`, imageUrl: fullUrl, blueprint_id: selProd.bp, print_provider_id: selProd.pp, variant_ids: selProd.vars})});
      const data = await res.json();
      if(data.success){ alert(`✅ Created ${selProd.name}! ID:${data.product_id}`); window.open(`https://printify.com/app/store/1/products/${data.product_id}`,'_blank'); }
      else alert('Failed:'+JSON.stringify(data).slice(0,600));
    }catch(e:any){ alert(e.message); }
    setCreating(false);
  };

  const gen = async ()=>{
    if(!prompt.trim()) return alert("Enter prompt");
    setGenerating(true);
    const encoded = encodeURIComponent(prompt + ", high quality print design, transparent background");
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&nologo=true`;
    const i = new Image(); i.onload=()=>{ setGenImage(url); setGenerating(false); }; i.onerror=()=>{ alert("Failed"); setGenerating(false); }; i.src=url;
  };

  return (
    <div style={{background:"#fffaf5", minHeight:"100vh", fontFamily:"system-ui"}}>
      {/* HEADER */}
      <div style={{background:"white", textAlign:"center", borderBottom:"4px solid #a2006d"}}>
        <img src="/images/mimis-cozy-logo.png" style={{width:"100%", maxWidth:"1100px", margin:"0 auto", display:"block"}}/>
        <div style={{padding:"8px 12px 12px"}}>
          <h1 style={{margin:"0", fontSize:"20px", color:"#a2006d"}}>One Website - 4 Brands Separated</h1>
          <p style={{margin:"4px 0 0", fontSize:"12px", color:"#666"}}>Budget Buster • Daily Finds • Creative Ads • Atlas OS — all on mimiscozycorner.com</p>
          <div style={{display:"flex", justifyContent:"center", gap:"6px", flexWrap:"wrap", marginTop:"10px"}}>
            <button onClick={()=>{setBrand("all"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="all" && !genTab?"2px solid #a2006d":"1px solid #ddd", background: brand==="all" && !genTab?"#a2006d":"white", color: brand==="all" && !genTab?"white":"#333", fontWeight:800, fontSize:"11px"}}>ALL ({counts.all})</button>
            <button onClick={()=>{setBrand("budget"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="budget" && !genTab?"2px solid #0f5ca8":"1px solid #ddd", background: brand==="budget" && !genTab?"#0f5ca8":"white", color: brand==="budget" && !genTab?"white":"#333", fontWeight:800, fontSize:"11px"}}>💰 BUDGET BUSTER ({counts.budget})</button>
            <button onClick={()=>{setBrand("daily"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="daily" && !genTab?"2px solid #ff69b4":"1px solid #ddd", background: brand==="daily" && !genTab?"#ff69b4":"white", color: brand==="daily" && !genTab?"white":"#333", fontWeight:800, fontSize:"11px"}}>☕ DAILY FINDS ({counts.daily})</button>
            <button onClick={()=>{setBrand("creative"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="creative" && !genTab?"2px solid #ff6a00":"1px solid #ddd", background: brand==="creative" && !genTab?"#ff6a00":"white", color: brand==="creative" && !genTab?"white":"#333", fontWeight:800, fontSize:"11px"}}>📣 CREATIVE ADS ({counts.creative})</button>
            <button onClick={()=>{setBrand("atlas"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="atlas" && !genTab?"2px solid #6a00ff":"1px solid #ddd", background: brand==="atlas" && !genTab?"#6a00ff":"white", color: brand==="atlas" && !genTab?"white":"#333", fontWeight:800, fontSize:"11px"}}>✨ ATLAS OS ({counts.atlas})</button>
            <button onClick={()=>setGenTab(true)} style={{padding:"8px 14px", borderRadius:"20px", border: genTab?"2px solid #111":"1px solid #111", background: genTab?"#111":"white", color: genTab?"white":"#111", fontWeight:800, fontSize:"11px"}}>🎨 IMAGE GENERATOR</button>
          </div>
          <div style={{marginTop:"8px"}}>
            <input placeholder={`Search ${brand} designs...`} value={q} onChange={e=>setQ(e.target.value)} style={{padding:"8px 16px", borderRadius:"20px", border:"1px solid #ffb6d9", width:"280px", fontSize:"12px"}}/>
          </div>
        </div>
      </div>

      {genTab ? (
        <div style={{maxWidth:"760px", margin:"0 auto", padding:"16px"}}>
          <div style={{background:"white", borderRadius:"14px", padding:"16px", border:"2px solid #111"}}>
            <h2 style={{margin:"0 0 6px"}}>🎨 Image Generator - Make Products for Any Brand</h2>
            <p style={{fontSize:"11px", color:"#666", margin:"0 0 12px"}}>Type prompt → choose brand → generate → create product. For Budget Buster, Daily Finds, Creative Ads, Atlas OS.</p>
            <div style={{display:"flex", gap:"8px"}}>
              <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. 'budget buster, save money, coupon queen, funny' or 'atlas os sec 8 housing manifesting'" style={{flex:1, padding:"10px 14px", borderRadius:"10px", border:"1px solid #ddd", fontSize:"12px"}}/>
              <button onClick={gen} disabled={generating} style={{padding:"10px 18px", background:"#111", color:"white", border:"none", borderRadius:"10px", fontWeight:800, fontSize:"12px"}}>{generating?"GEN...":"GENERATE"}</button>
            </div>
            <div style={{display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"10px"}}>
              {["budget buster save money funny","mimis daily finds cozy mom coffee","mimis creative ads mama needs wine stfu","atlas os sec 8 spiritual manifesting"].map(ex=>(
                <button key={ex} onClick={()=>setPrompt(ex)} style={{fontSize:"10px", padding:"4px 8px", borderRadius:"12px", border:"1px solid #eee", background:"#fafafa"}}>{ex}</button>
              ))}
            </div>
            {genImage ? (
              <div style={{marginTop:"14px"}}>
                <img src={genImage} style={{width:"100%", maxHeight:"380px", objectFit:"contain", background:"#f7f7f7", borderRadius:"12px", border:"1px solid #eee"}}/>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginTop:"10px"}}>
                  {PRODS.map(p=><button key={p.name} onClick={()=>setSelProd(p)} style={{padding:"8px", borderRadius:"8px", border: selProd.name===p.name?"2px solid #111":"1px solid #eee", background: selProd.name===p.name?"#f5f5f5":"white", fontSize:"11px", fontWeight:700}}>{p.emoji} {p.name} {p.price}</button>)}
                </div>
                <button onClick={()=>create(genImage, prompt.slice(0,40))} disabled={creating} style={{width:"100%", marginTop:"10px", padding:"12px", background:"#111", color:"white", border:"none", borderRadius:"10px", fontWeight:800}}>{creating?"CREATING...":`CREATE ${selProd.name}`}</button>
              </div>
            ) : (
              <div style={{marginTop:"14px", border:"1px dashed #ccc", borderRadius:"12px", padding:"28px", textAlign:"center", color:"#888", fontSize:"12px"}}>Generated image will appear here</div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div style={{maxWidth:"1300px", margin:"0 auto", padding:"12px 16px 0", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{fontSize:"12px", fontWeight:700, color:"#a2006d"}}>{brand.toUpperCase()} • {filtered.length} products</div>
            <div style={{fontSize:"10px", color:"#888"}}>Separated brands, one website: mimiscozycorner.com</div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"12px", padding:"16px", maxWidth:"1300px", margin:"0 auto"}}>
            {filtered.map((d,i)=>(
              <div key={i} style={{background:"white", borderRadius:"12px", overflow:"hidden", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", borderTop: d.brand==="budget"?"3px solid #0f5ca8":d.brand==="daily"?"3px solid #ff69b4":d.brand==="creative"?"3px solid #ff6a00":d.brand==="atlas"?"3px solid #6a00ff":"3px solid #ddd"}}>
                <div onClick={()=>{setSel(d); setSelProd(PRODS[0]);}} style={{background:"#fef2f8", aspectRatio:"1", cursor:"pointer", position:"relative"}}><img src={d.image} loading="lazy" style={{width:"100%",height:"100%",objectFit:"contain",padding:"6px"}}/><span style={{position:"absolute", top:"6px", left:"6px", fontSize:"8px", fontWeight:800, color:"white", background: d.brand==="budget"?"#0f5ca8":d.brand==="daily"?"#ff69b4":d.brand==="creative"?"#ff6a00":d.brand==="atlas"?"#6a00ff":"#999", padding:"3px 6px", borderRadius:"8px"}}>{d.brand.toUpperCase()}</span></div>
                <div style={{padding:"8px", fontSize:"11px", fontWeight:600, height:"32px", overflow:"hidden"}}>{d.title}</div>
                <div onClick={()=>setSel(d)} style={{textAlign:"center", padding:"0 8px 8px", fontSize:"10px", fontWeight:800, color:"#a2006d", cursor:"pointer"}}>CHOOSE PRODUCT →</div>
              </div>
            ))}
          </div>
        </>
      )}

      {sel&&(
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:"16px"}} onClick={()=>setSel(null)}>
          <div style={{background:"white", borderRadius:"16px", maxWidth:"480px", width:"100%", overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
            <img src={sel.image} style={{width:"100%", maxHeight:"360px", objectFit:"contain", background:"#fef2f8"}}/>
            <div style={{padding:"14px"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><h3 style={{margin:0, fontSize:"14px"}}>{sel.title}</h3><span style={{fontSize:"9px", background:"#eee", padding:"3px 6px", borderRadius:"8px"}}>{sel.brand}</span></div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", marginTop:"10px"}}>
                {PRODS.map(p=><button key={p.name} onClick={()=>setSelProd(p)} style={{padding:"8px", borderRadius:"8px", border: selProd.name===p.name?"2px solid #a2006d":"1px solid #eee", background: selProd.name===p.name?"#fef2f8":"white", fontSize:"11px", fontWeight:700}}>{p.emoji} {p.name}</button>)}
              </div>
              <button onClick={()=>create(sel.image, sel.title)} disabled={creating} style={{width:"100%", marginTop:"10px", padding:"11px", background:"#a2006d", color:"white", border:"none", borderRadius:"10px", fontWeight:800, fontSize:"12px"}}>{creating?"CREATING...":`CREATE ${selProd.name}`}</button>
              <button onClick={()=>setSel(null)} style={{width:"100%", marginTop:"8px", padding:"8px", border:"none", background:"#eee", borderRadius:"8px", fontSize:"11px"}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
