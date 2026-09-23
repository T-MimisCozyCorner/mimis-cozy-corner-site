
import { useEffect, useState } from "react";

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

function ExistingApp(){
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


const restoredProducts = [
  { id:'budget-buster', title:'Budget Buster Smart Workbook', subtitle:'Big Savings • Smart Finds • Happy Wallets', price:'$5', image:'/products/budget-buster.png', badge:'SMART Workbook',
    pages:[
      ['Cover','Budget Buster','A practical money tracker for income, bills, spending, and next steps.'],
      ['Income Tracker','Date • Source • Amount • Notes','Track every income source in one place.'],
      ['Bills Due','Due date • Bill name • Amount • Paid','Keep upcoming bills organized and visible.'],
      ['Expense Log','Category • Amount • Date • Notes','Record spending and see where your money is going.'],
      ['Reflection & Next Steps','What went well? • What can improve? • Next money move','Finish with one realistic step for the next month.']
    ] },
  { id:'self-care', title:'Self Care Reset Smart Workbook', subtitle:"Custom Designs for Cozy Mamas • Let's Make Something Cozy", price:'$5', image:'/products/self-care.jpg', badge:'SMART Workbook',
    pages:[
      ['Cover','Self Care Reset','A gentle place to pause, reset, and care for yourself.'],
      ['Daily Pages','Date • Mood • Top 3 today','Cozy prompt: What would make today lighter?'],
      ['Prompts','Rest • boundaries • tiny acts of care','Write a kind note to tired me.'],
      ['Reflection','What went well? • What felt hard? • What do I need next?','One small step I can take.'],
      ['Next Steps','Choose one realistic act of care.','Keep the goal small enough to actually do.']
    ] },
  { id:'gratitude', title:'Gratitude Journal Smart Reflection', subtitle:'Daily gratitude prompts • Mindful moments • Feel-good vibes', price:'$5', image:'/products/gratitude.jpg', badge:'SMART Reflection',
    pages:[
      ['Cover','Gratitude Journal','Daily gratitude prompts • Mindful moments • Feel-good vibes.'],
      ['Daily Pages','Date • Mood • Top 3 today','What am I grateful for?'],
      ['Prompts','Three tiny joys today? • Who made me smile?','A small win I can celebrate.'],
      ['Reflection','What changed when I slowed down?','What deserves more appreciation?'],
      ['Next Steps','Keep a simple daily gratitude habit.','Use reflection pages to notice patterns and small wins.']
    ] },
  { id:'dream', title:'Dream Journal Smart Reflection', subtitle:'Capture dreams • Night notes • Reflect & grow', price:'$5', image:'/products/dream.jpg', badge:'SMART Reflection',
    pages:[
      ['Cover','Dream Journal','Capture dreams • Night notes • Reflect & grow.'],
      ['Dream Entry','Date • Dream notes • Mood / emotion','What stood out?'],
      ['Symbols','What symbol stood out? • How did it feel?','What does it remind you of?'],
      ['Prompts','What did I dream? • Emotion? • Symbol?','Message for today?'],
      ['Reflection','What do I want to remember?','What will I carry into today?']
    ] },
  { id:'home-binder', title:'Home Binder Smart Writable', subtitle:'Organize your home • Writable pages • Everyday ease', price:'$5', image:'/products/home-binder.jpg', badge:'SMART Writable',
    pages:[
      ['Cover: Welcome Home','Home Binder Smart Writable','One place for the everyday details that keep home moving.'],
      ['Cozy Mama System','Daily 5-Minute Flow • Weekly Reset • Monthly Truth Check','A simple rhythm for everyday organization.'],
      ['Meal Planning','Pantry Inventory • Weekly Menu • Grocery List','Meal prep, freezer meals, kids lunches, and budget meals.'],
      ['Cleaning Schedule','Daily Sparkle • Weekly Deep Zones • Laundry Flow','Bathroom, kitchen, clutter, and chore planning.'],
      ['Budget Tracker','Income Map • Bills • Expenses • Savings','Payday planning and savings buckets.'],
      ['Family & Home','Emergency Family • School • Pets • Projects','Keep important household information together.'],
      ['Reflection','Morning Routine • Night Routine • Weekly Reflection','Monthly goals, wins, decluttering, and cozy inspiration.']
    ] },
  { id:'unfiltered-mama', title:'Unfiltered Mama Smart Workbook', subtitle:'Raw motherhood • rage • joy • Real talk for real mamas', price:'$5', image:'/products/unfiltered-mama.png', badge:'SMART Workbook',
    pages:[
      ['Cover','Unfiltered Mama','Raw motherhood • rage • joy • real talk for real mamas.'],
      ['Daily Pages','Date • Mood • Top 3 today','What would make today lighter?'],
      ['Prompts','What am I not saying out loud?','Rage → what do I actually need?'],
      ['Reflection','What went well? • What was too much?','What support do I need? What can wait?'],
      ['Next Steps','Choose one small act of care.','Give yourself permission to be human.']
    ] },
  { id:'twin-story', title:'My Twin Story Method Smart Workbook', subtitle:'Every story has a twin • Guided storytelling method', price:'$5', image:'/products/twin-story.jpg', badge:'SMART Workbook',
    pages:[
      ['Cover','My Twin Story Method','Every story has a twin • Guided storytelling method.'],
      ['Story One','What happened? • Who was there?','Capture the first version of the story.'],
      ['Story Twin','What is the parallel story?','Find the second story, pattern, or perspective.'],
      ['Compare','What is similar? • What changed?','Notice the meaning between the two stories.'],
      ['Reflection','What did I learn?','What story do I want to carry forward?']
    ] },
  { id:'mimi-finds', title:'Mimi Finds Daily Smart Guide', subtitle:'Top Finds • Real Reviews • Every Day • Curated with love', price:'$5', image:'/products/mimi-finds.png', badge:'SMART Guide',
    pages:[
      ['Cover','Mimi Finds Daily','Top Finds • Real Reviews • Every Day • Curated with love.'],
      ['Daily Finds','Find of the day • Why it is useful','Record price and where you found it.'],
      ['Top Finds','What is worth checking out?','Track the useful finds you discover.'],
      ['Reviews','What I liked • What I would change','Who is it useful for? Would I recommend it?'],
      ['How It Works','Organize finds, reviews, and everyday recommendations.','Build your own personal list as you discover products.']
    ] },
  { id:'section8', title:'Section 8 Housing Smart Guide', subtitle:'All 50 States • Helping Families Find a Place to Call Home', price:'$5', image:'/products/section8.jpg', badge:'SMART Guide',
    pages:[
      ['Cover','Section 8 Housing Smart Guide','All 50 States • Helping Families Find a Place to Call Home.'],
      ['Application Organizer','Application date • Agency • Contact','Keep housing application details together.'],
      ['Document Checklist','Identification • Income • Household documents','Track what has been gathered and what is still needed.'],
      ['Housing Search','Property • Contact • Rent • Requirements','Record housing options and follow-ups.'],
      ['Follow-Up Tracker','Date contacted • Response • Next step','Stay organized while you move through the process.']
    ] },
  { id:'shoprescue', title:'ShopRescue Smart Guide', subtitle:'Auto repair rescue • Guidance • Save at the shop • Know before you go', price:'$49', image:'/products/shoprescue.jpg', badge:'SMART Guide',
    pages:[
      ['Cover','ShopRescue Smart Guide','Auto repair rescue • guidance • save at the shop • know before you go.'],
      ['Repair Guide','Symptoms • Proposed repair • Parts','Write down what the shop is telling you.'],
      ['Cost Estimator','Labor • Parts • Total','Questions to ask before approving work.'],
      ['Shop Checklist','Written estimate • Parts • Warranty • Old parts','Keep your repair decisions organized.'],
      ['Save Tips','Compare written estimates.','Ask what is urgent versus what can wait.']
    ] }
];

function PreviewWatermark(){
  return <div style={{position:'absolute',inset:0,pointerEvents:'none',userSelect:'none',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',opacity:.14}}>
    <div style={{transform:'rotate(-18deg)',fontSize:'clamp(28px,5vw,68px)',fontWeight:1000,letterSpacing:'.08em',color:'#111827',whiteSpace:'nowrap'}}>
      MIMI'S COZY CORNER • PREVIEW ONLY
    </div>
  </div>;
}

function ProductPreview({p,onClose}:{p:any,onClose:()=>void}){
  useEffect(()=>{
    const block=(e:KeyboardEvent)=>{
      if((e.ctrlKey||e.metaKey)&&['s','p','c','u'].includes(e.key.toLowerCase())) e.preventDefault();
    };
    document.addEventListener('keydown',block);
    const old=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return()=>{document.removeEventListener('keydown',block);document.body.style.overflow=old;};
  },[]);
  return <div
    style={{position:'fixed',inset:0,zIndex:100,background:'rgba(3,5,15,.92)',backdropFilter:'blur(8px)',padding:12,boxSizing:'border-box'}}
    onContextMenu={e=>e.preventDefault()}
    onClick={onClose}
  >
    <div onClick={e=>e.stopPropagation()} style={{height:'100%',maxWidth:1180,margin:'0 auto',background:'#e5e7eb',borderRadius:20,overflow:'hidden',display:'flex',flexDirection:'column',boxShadow:'0 30px 100px rgba(0,0,0,.55)'}}>
      <header style={{flex:'none',background:'#070b16',color:'#fff',padding:'18px 22px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:15}}>
        <div>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.15em',color:'#5eead4',fontWeight:900}}>Full Product Preview</div>
          <div style={{fontSize:'clamp(18px,3vw,28px)',fontWeight:900,marginTop:4}}>{p.title}</div>
          <div style={{fontSize:12,color:'#94a3b8',marginTop:5}}>{p.pages.length} preview pages • View only</div>
        </div>
        <button onClick={onClose} style={{width:42,height:42,borderRadius:'50%',border:'1px solid rgba(255,255,255,.15)',background:'rgba(255,255,255,.08)',color:'#fff',fontSize:25,cursor:'pointer'}}>×</button>
      </header>
      <div style={{flex:1,overflowY:'auto',padding:'16px'}}>
        <div style={{background:'#ccfbf1',color:'#134e4a',border:'1px solid #99f6e4',borderRadius:14,padding:14,fontSize:14,lineHeight:1.55,marginBottom:18}}>
          <strong>Preview only:</strong> Customers can look through the pages before buying. Downloading, printing, copying, and right-click saving are blocked on this preview layer. Screenshots cannot be technically prevented.
        </div>
        {p.pages.map((page:any,index:number)=><div key={index}
          onContextMenu={e=>e.preventDefault()}
          style={{position:'relative',minHeight:650,background:'#fff',color:'#0f172a',borderRadius:12,border:'1px solid #cbd5e1',boxShadow:'0 8px 24px rgba(15,23,42,.1)',padding:'38px',boxSizing:'border-box',overflow:'hidden',marginBottom:18,userSelect:'none'}}
        >
          <div style={{position:'relative',zIndex:2}}>
            <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'.2em',color:'#0f766e',fontWeight:900,marginBottom:35}}>Mimi's Cozy Corner • Preview Page {index+1}</div>
            <h3 style={{fontSize:'clamp(28px,4vw,44px)',lineHeight:1.08,fontWeight:900,margin:'0 0 30px'}}>{page[0]}</h3>
            <div style={{display:'grid',gap:14,maxWidth:850}}>
              <div style={{background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:12,padding:20,fontSize:20,lineHeight:1.5,color:'#334155',fontWeight:800}}>{page[1]}</div>
              <div style={{background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:12,padding:20,fontSize:17,lineHeight:1.6,color:'#475569'}}>{page[2]}</div>
            </div>
            <div style={{position:'absolute',left:38,right:38,bottom:24,paddingTop:13,borderTop:'1px solid #e2e8f0',color:'#94a3b8',fontSize:11}}>Preview only • Purchased files are delivered through Payhip.</div>
          </div>
          <PreviewWatermark/>
        </div>)}
        <div style={{textAlign:'center',padding:'20px 0 30px'}}>
          <button onClick={()=>{ if(p.id==='budget-buster') window.location.href='https://payhip.com/b/BzZT8'; else alert(`${p.title} — checkout link will be connected next.`); }}
            style={{border:0,borderRadius:999,padding:'15px 25px',fontWeight:900,fontSize:16,background:'#ff4fbe',color:'#fff',cursor:'pointer'}}>
            Get {p.title} — {p.price}
          </button>
        </div>
      </div>
    </div>
  </div>;
}

function DigitalProducts(){
  const [selected,setSelected]=useState<any|null>(null);
  return <div style={{background:'#080713',minHeight:'100vh',color:'#fff',fontFamily:'system-ui,-apple-system,Segoe UI,sans-serif'}}>
    <header style={{padding:'18px 24px',borderBottom:'1px solid rgba(255,255,255,.12)',position:'sticky',top:0,background:'rgba(8,7,19,.94)',backdropFilter:'blur(12px)',zIndex:10}}>
      <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
        <a href='/' style={{color:'#fff',textDecoration:'none',fontWeight:900,letterSpacing:'.04em'}}>Mimi's Cozy Corner</a>
        <a href='/' style={{color:'#28e8ff',textDecoration:'none',fontWeight:700}}>← Back Home</a>
      </div>
    </header>
    <section style={{padding:'64px 20px 34px',textAlign:'center',background:'radial-gradient(circle at 50% 0%, rgba(255,200,87,.18), transparent 45%)'}}>
      <div style={{display:'inline-block',padding:'7px 12px',border:'1px solid rgba(255,200,87,.45)',borderRadius:999,color:'#ffc857',fontSize:12,fontWeight:800,letterSpacing:'.08em'}}>MIMI'S DIGITAL PRODUCTS</div>
      <h1 style={{fontSize:'clamp(34px,6vw,64px)',margin:'18px auto 10px',maxWidth:900,lineHeight:1.02}}>Smart products made to be used.</h1>
      <p style={{maxWidth:700,margin:'0 auto',color:'#c9c6d7',fontSize:17}}>Browse the products, then open a watermarked page-by-page preview before buying.</p>
    </section>
    <section style={{padding:'24px 20px 70px'}}>
      <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:22}}>
        {restoredProducts.map(p=><article key={p.id} style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.12)',borderRadius:20,overflow:'hidden',boxShadow:'0 12px 35px rgba(0,0,0,.22)'}}>
          <div style={{background:'#111022',aspectRatio:'1/1',display:'grid',placeItems:'center',padding:12}}>
            <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:12}}/>
          </div>
          <div style={{padding:18}}>
            <div style={{display:'inline-block',padding:'5px 9px',borderRadius:999,background:'rgba(255,200,87,.12)',color:'#ffc857',fontSize:10,fontWeight:900,letterSpacing:'.06em'}}>{p.badge}</div>
            <h2 style={{fontSize:19,lineHeight:1.2,margin:'12px 0 8px'}}>{p.title}</h2>
            <p style={{color:'#aaa7b9',fontSize:13,lineHeight:1.5,minHeight:58,margin:'0 0 16px'}}>{p.subtitle}</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
              <strong style={{fontSize:24,color:'#ffc857'}}>{p.price}</strong>
              <div style={{display:'flex',gap:8}}>
                <button type='button' onClick={()=>setSelected(p)} style={{border:'1px solid #28e8ff',borderRadius:12,padding:'10px 12px',fontWeight:900,background:'rgba(40,232,255,.08)',color:'#28e8ff',cursor:'pointer'}}>👁 Preview</button>
                <button type='button' onClick={()=>{if(p.id==='budget-buster')window.location.href='https://payhip.com/b/BzZT8';else alert(`${p.title} — product checkout link can be connected next.`);}} style={{border:0,borderRadius:12,padding:'10px 14px',fontWeight:900,background:'#ff4fbe',color:'#fff',cursor:'pointer'}}>View Product</button>
              </div>
            </div>
          </div>
        </article>)}
      </div>
    </section>
    {selected&&<ProductPreview p={selected} onClose={()=>setSelected(null)}/>}
  </div>;
}

export default function App(){
  const path=window.location.pathname.replace(/\/$/,'')||'/';
  if(path==='/digital-products') return <DigitalProducts/>;
  return <ExistingApp/>;
}
