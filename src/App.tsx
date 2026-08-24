import { useState } from "react";
const mods = import.meta.glob("/public/images/*.{png,jpg,jpeg,webp,PNG,JPG,WEBP}", { eager: true, as: "url" }) as Record<string, string>;
type Design = { title: string; image: string; fileName: string };
type Prod = { name: string; bp: number; pp: number; vars: number[]; price: string; emoji: string };
const PRODS: Prod[] = [
  { name: "Unisex T-Shirt", bp: 6, pp: 99, vars: [40142,40143,40144,40145], price: "$24.99", emoji: "👕" },
  { name: "Hoodie", bp: 5, pp: 99, vars: [40057,40058,40059], price: "$44.99", emoji: "🧥" },
  { name: "Mug 11oz", bp: 635, pp: 99, vars: [49201], price: "$14.99", emoji: "☕" },
  { name: "Tote Bag", bp: 12, pp: 99, vars: [41021], price: "$19.99", emoji: "👜" },
  { name: "Sweatshirt", bp: 13, pp: 99, vars: [41067,41068], price: "$39.99", emoji: "👚" },
];
const designs: Design[] = Object.entries(mods).filter(([p])=>!p.toLowerCase().includes("mimis-cozy-logo")).filter(([p])=>!p.toLowerCase().includes(".htm")).map(([path])=>{
  const fn = path.split("/").pop()||""; const name = fn.replace(/\.[^/.]+$/,"").replace(/[_-]/g," ").trim();
  const title = name.split(" ").slice(0,4).map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(" ");
  return { title, image: "/images/"+encodeURIComponent(fn), fileName: fn };
});
export default function App(){
  const [q,setQ]=useState(""); const [sel,setSel]=useState<Design|null>(null);
  const [selProd,setSelProd]=useState<Prod>(PRODS[0]); const [creating,setCreating]=useState(false);
  const list = designs.filter(d=>d.title.toLowerCase().includes(q.toLowerCase()));
  const create = async ()=>{
    if(!sel) return; setCreating(true);
    try{
      const res = await fetch('/api/printify/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:`${sel.title} - ${selProd.name}`,imageUrl:window.location.origin+sel.image,blueprint_id:selProd.bp,print_provider_id:selProd.pp,variant_ids:selProd.vars})});
      const data = await res.json();
      if(data.success){ alert(`✅ Created ${selProd.name}! ID:${data.product_id}`); window.open(`https://printify.com/app/store/1/products/${data.product_id}`,'_blank'); }
      else alert('Failed:'+JSON.stringify(data).slice(0,600));
    }catch(e:any){ alert(e.message); } setCreating(false);
  };
  return (
    <div style={{background:"#fffaf5",minHeight:"100vh",fontFamily:"system-ui"}}>
      <div style={{background:"#a2006d",color:"white",padding:"8px",textAlign:"center",fontSize:"12px"}}>
        <a href="https://mimiscozycorner.com" style={{color:"white",fontWeight:800,margin:"0 12px",textDecoration:"none"}}>← Back to mimiscozycorner.com</a>
        <span>|</span>
        <a href="https://mimis-cozy-corner.printify.me" target="_blank" style={{color:"white",fontWeight:800,margin:"0 12px",textDecoration:"none"}}>🛒 Live Store: 5 Products Published ✅</a>
      </div>
      <div style={{background:"white",textAlign:"center",borderBottom:"3px solid #ff69b4",paddingBottom:"14px"}}>
        <img src="/images/mimis-cozy-logo.png" style={{width:"100%",maxWidth:"1100px",margin:"0 auto",display:"block"}}/>
        <p style={{color:"#a2006d",fontWeight:700,margin:"8px 0"}}>{list.length} Designs • Click → Choose Product Type 👕🧥☕👜</p>
        <input placeholder="Search 330+ designs..." value={q} onChange={e=>setQ(e.target.value)} style={{padding:"10px 20px",borderRadius:"20px",border:"1px solid #ffb6d9",width:"320px"}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:"14px",padding:"18px",maxWidth:"1280px",margin:"0 auto"}}>
        {list.map((d,i)=>(
          <div key={i} style={{background:"white",borderRadius:"14px",overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div onClick={()=>{setSel(d); setSelProd(PRODS[0]);}} style={{background:"#fef2f8",aspectRatio:"1",cursor:"pointer"}}><img src={d.image} loading="lazy" style={{width:"100%",height:"100%",objectFit:"contain",padding:"8px"}}/></div>
            <div style={{padding:"8px",fontWeight:600,fontSize:"12px",height:"32px",overflow:"hidden"}}>{d.title}</div>
            <div onClick={()=>setSel(d)} style={{textAlign:"center",padding:"0 8px 8px",color:"#a2006d",fontSize:"11px",fontWeight:800,cursor:"pointer"}}>👕🧥☕ CHOOSE PRODUCT →</div>
          </div>
        ))}
      </div>
      {sel&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}} onClick={()=>setSel(null)}>
          <div style={{background:"white",borderRadius:"20px",maxWidth:"520px",width:"100%",overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
            <img src={sel.image} style={{width:"100%",maxHeight:"340px",objectFit:"contain",background:"#fef2f8"}}/>
            <div style={{padding:"16px"}}>
              <h3 style={{margin:"0 0 10px"}}>{sel.title}</h3>
              <p style={{margin:"0 0 8px",fontSize:"12px",fontWeight:700}}>Step 1: What should we print it on?</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"12px"}}>
                {PRODS.map(p=>(
                  <button key={p.name} onClick={()=>setSelProd(p)} style={{padding:"10px",borderRadius:"10px",border: selProd.name===p.name? '2px solid #a2006d':'1px solid #eee',background: selProd.name===p.name? '#fef2f8':'white',fontWeight:700,fontSize:"12px"}}>{p.emoji} {p.name} {p.price}</button>
                ))}
              </div>
              <button onClick={create} disabled={creating} style={{width:"100%",padding:"12px",background:"#a2006d",color:"white",borderRadius:"10px",fontWeight:800,border:"none"}}>{creating? 'CREATING...': `CREATE ${selProd.name} IN PRINTIFY`}</button>
              <button onClick={()=>setSel(null)} style={{width:"100%",marginTop:"8px",padding:"8px",border:"none",background:"#eee",borderRadius:"8px"}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
