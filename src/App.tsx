import { useState, useEffect } from 'react'
import { Link, Route, Switch, useLocation } from 'wouter'
import { ArrowRight, BadgeDollarSign, House, Menu, X, Mail, Sparkles, Box, Factory as FactoryIcon, FileCode, Rocket, ShoppingBag, Bot, Palette, Globe, Zap, Layers, Wrench } from 'lucide-react'
import avatar from './assets/mimi-avatar.png'
import creativeAdsLogo from './assets/mimis-creative-ads-logo.png'
import laTambora from './assets/la-tambora-sample.jpg'

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function Header(){const[open,setOpen]=useState(false);const[loc]=useLocation();return(<header className="header"><div className="container header-inner"><Link href="/" className="logo">Mimi's Cozy Corner • Atlas</Link><nav className={open?"nav open":"nav"}><Link href="/" className={loc==='/'?'active':''}><House size={16}/> Home</Link><Link href="/atlas"><Layers size={16}/> Atlas</Link><Link href="/blueprints"><FileCode size={16}/> Blueprints</Link><Link href="/tools"><Wrench size={16}/> Tools</Link><Link href="/products"><Box size={16}/> Products</Link><Link href="/product-factory"><FactoryIcon size={16}/> Factory</Link><Link href="/creative-ads"><BadgeDollarSign size={16}/> Ads $25</Link><Link href="/contact"><Mail size={16}/> Contact</Link></nav><button className="menu-btn" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>)}
function Footer(){return<footer className="footer"><div className="container"><p>© 2026 Mimi's Cozy Corner • Atlas OS • gjcmflhymliizvgtifjv</p></div></footer>}
function useProducts(){const[p,setP]=useState<any[]>([]);useEffect(()=>{if(!SUPA_URL)return;fetch(`${SUPA_URL}/rest/v1/products?select=*&order=created_at.desc&limit=50`,{headers:{apikey:SUPA_KEY,Authorization:`Bearer ${SUPA_KEY}`}}).then(r=>r.json()).then(d=>{if(Array.isArray(d))setP(d)})},[]);return p}

const BLUEPRINTS = [
  { id:'saas', icon: Rocket, title: "SaaS Starter", desc: "Complete SaaS boilerplate - Auth, Stripe, DB, Dashboard ready to ship", price: "$97", color: "#EFF6FF", tag: "Most Popular", link: "/product-factory" },
  { id:'ecom', icon: ShoppingBag, title: "Ecom Kit", desc: "Shopify-ready storefront with admin panel and payments", price: "$67", color: "#F0FDF4", link: "/product-factory" },
  { id:'ai', icon: Bot, title: "AI Agent OS", desc: "Atlas Core - Your AI workforce with 100 prompts and 5 agents", price: "$147", color: "#FEF3C7", tag: "Atlas Core", link: "/product-factory" },
  { id:'ads', icon: Palette, title: "Creative Ads Pack", desc: "50+ Canva ad templates including La Tambora - Editable", price: "$25", color: "#FFF0F5", link: "/creative-ads" },
  { id:'tools', icon: Globe, title: "Digital Tools Stack", desc: "10 Landing pages, 3 funnels, lead magnets system", price: "$47", color: "#F5F3FF", link: "/product-factory" },
  { id:'factory', icon: FactoryIcon, title: "Product Factory", desc: "Idea to product in 24h - Complete build and scale system", price: "$197", color: "#ECFDF5", tag: "New", link: "/product-factory" },
  { id:'bundle', icon: Zap, title: "Atlas OS Bundle", desc: "ALL 6 blueprints + factory access + 1:1 support + lifetime updates - Best Value", price: "$497", color: "#0a0a0a", dark: true, tag: "Best Value", link: "/contact" },
]

const TOOLS = [
  { name: "Product Generator", desc: "Generate product ideas from niche - AI powered", color: "#EFF6FF", status: "Live", href: "/product-factory" },
  { name: "Ad Creator", desc: "La Tambora + Mimi ads - Canva instant access", color: "#FFF0F5", status: "Live", href: "/creative-ads" },
  { name: "Blueprint Builder", desc: "Build your own blueprint from template", color: "#F5F3FF", status: "Live", href: "/blueprints" },
  { name: "Supabase Connector", desc: "Live DB: gjcmflhymliizvgtifjv - Products table", color: "#F0FDF4", status: "Live", href: "/products" },
  { name: "Stripe Checkout", desc: "Sell blueprints $25 to $497 - Ready to connect", color: "#FEF3C7", status: "Ready", href: "/blueprints" },
  { name: "Factory Pipeline", desc: "Idea to Build to Ship to Scale system", color: "#ECFDF5", status: "Live", href: "/product-factory" },
]

function Home(){const products=useProducts();return<><Header/><main><section className="hero"><div className="container hero-grid"><div><div className="eyebrow">ATLAS OS • INCORPORATED • LIVE</div><h1>Your Cozy Empire OS</h1><p>{products.length} custom products • 7 Atlas blueprints • 6 tools</p><div style={{display:'flex', gap:12, marginTop:20}}><Link className="button primary" href="/atlas">Enter Atlas OS <ArrowRight size={18}/></Link><Link className="button secondary" href="/blueprints">7 Blueprints</Link></div></div><div className="avatar-card"><img src={avatar} alt="Mimi"/><div className="avatar-chip"><Sparkles size={15}/> Live</div></div></div></section></main><Footer/></>}
function AtlasOS(){return<><Header/><main><section className="page-hero" style={{background:'#0a0a0a', color:'white', padding:'60px 0'}}><div className="container"><h1>Atlas OS — Now Inside Cozy Corner</h1><p>Atlas had empty folders causing 404s. Now 7 blueprints, 6 tools, all with color and images.</p></div></section></main><Footer/></>}

function Blueprints(){
  const[sel,setSel]=useState<any>(null);
  return<><Header/><main>
    <section className="page-hero"><div className="container">
      <h1>Business Blueprints — 7 Live with Products</h1><p>Full descriptions, prices visible, Launch goes to Factory not Contact</p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:20, marginTop:32}}>
        {BLUEPRINTS.map((b,i)=>{
          const Icon=b.icon;
          const isDark=(b as any).dark;
          return(
            <div key={i} onClick={()=>setSel(b)} style={{background:isDark?'#0a0a0a':'white', color:isDark?'white':'#0a0a0a', border:'1px solid #eee', borderRadius:20, padding:24, position:'relative', cursor:'pointer'}}>
              {b.tag&&<span style={{position:'absolute', top:16, right:16, background:isDark?'white':'#0a0a0a', color:isDark?'black':'white', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20}}>{b.tag}</span>}
              <div style={{width:48, height:48, borderRadius:12, background:isDark?'#222':b.color, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16}}><Icon size={24}/></div>
              <h3 style={{margin:'0 0 8px', fontSize:20}}>{b.title}</h3>
              <p style={{color:isDark?'#aaa':'#666', fontSize:13, margin:0, lineHeight:1.5, minHeight:60}}>{b.desc}</p>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:20}}>
                <strong style={{fontSize:24}}>{b.price}</strong>
                <button className="button primary" style={{padding:'10px 18px', fontSize:14, background:isDark?'white':'#0a0a0a', color:isDark?'black':'white'}}>Launch</button>
              </div>
            </div>
          )
        })}
      </div>
    </div></section>
    {sel&&<div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:20}} onClick={()=>setSel(null)}><div style={{background:'white', borderRadius:20, padding:32, maxWidth:520, width:'100%'}} onClick={e=>e.stopPropagation()}><div style={{display:'flex', justifyContent:'space-between'}}><h2 style={{margin:0}}>{sel.title}</h2><span style={{fontSize:24, fontWeight:700}}>{sel.price}</span></div><p style={{color:'#666', marginTop:12}}>{sel.desc} — Full source files, docs, setup guide, lifetime updates.</p><div style={{display:'flex', gap:12, marginTop:24}}><Link href={sel.link} className="button primary" style={{flex:1, justifyContent:'center', textDecoration:'none', padding:'14px'}}>Launch — {sel.price}</Link><button className="button secondary" onClick={()=>setSel(null)}>Close</button></div></div></div>}
  </main><Footer/></>
}

function ToolsPage(){return<><Header/><main><section className="page-hero"><div className="container"><h1>Tools — 6 Live</h1><p>Atlas OS tools now inside Cozy Corner with color</p><div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16, marginTop:24}}>{TOOLS.map((t,i)=><div key={i} style={{background:'white', padding:20, borderRadius:16, borderLeft:`6px solid ${t.color}`, borderTop:'1px solid #eee', borderRight:'1px solid #eee', borderBottom:'1px solid #eee'}}><div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0, fontSize:18}}>{t.name}</h3><span style={{fontSize:11, background:t.status==='Live'?'#dcfce7':'#fef3c7', padding:'4px 10px', borderRadius:20, fontWeight:700}}>{t.status}</span></div><p style={{color:'#666', fontSize:14, margin:'8px 0 16px'}}>{t.desc}</p><Link href={t.href} className="button secondary" style={{width:'100%', justifyContent:'center', background:t.color}}>Open →</Link></div>)}</div></div></section></main><Footer/></>}

function ProductsPage(){const products=useProducts();return<><Header/><main><section className="page-hero"><div className="container"><div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><h1>Products — {products.length} Custom + 7 Blueprints</h1><Link href="/product-factory" className="button primary"><FactoryIcon size={16}/> New</Link></div><p style={{marginTop:8, color:'#666'}}>Your 7 Atlas blueprints ARE products! Plus custom products from Supabase gjcmflhymliizvgtifjv</p><h3 style={{marginTop:24}}>Atlas Blueprints (Always There)</h3><div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12, marginTop:12}}>{BLUEPRINTS.map((b,i)=><div key={i} style={{background:'white', padding:16, borderRadius:12, border:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><strong style={{fontSize:14}}>{b.title}</strong><div style={{fontSize:12, color:'#666'}}>{b.desc.slice(0,40)}...</div></div><strong>{b.price}</strong></div>)}</div><h3 style={{marginTop:32}}>Custom Factory Products ({products.length})</h3>{products.length===0&&<div style={{background:'white', padding:24, borderRadius:12, border:'2px dashed #ddd', textAlign:'center', marginTop:12}}><p>Fix Cloudflare VITE_SUPABASE_URL = https://gjcmflhymliizvgtifjv.supabase.co then create in Factory</p><Link href="/product-factory" className="button primary" style={{marginTop:8}}>Go to Factory</Link></div>}<div style={{display:'grid', gap:10, marginTop:12}}>{products.map((p:any,i:number)=><div key={i} style={{background:'white', padding:16, borderRadius:12, display:'flex', justifyContent:'space-between', border:'1px solid #eee'}}><div><strong>{p.name||p.title}</strong><div style={{fontSize:12, color:'#666'}}>{p.created_at?new Date(p.created_at).toLocaleDateString():''}</div></div><strong>{p.price||'$25'}</strong></div>)}</div></div></section></main><Footer/></>}

function ProductFactory(){const[name,setName]=useState("");const[price,setPrice]=useState("$25");const[msg,setMsg]=useState("");async function create(){if(!name)return setMsg("Enter name");setMsg("Creating...");const r=await fetch(`${SUPA_URL}/rest/v1/products`,{method:'POST',headers:{apikey:SUPA_KEY,Authorization:`Bearer ${SUPA_KEY}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({name,title:name,price,status:'Draft',created_at:new Date().toISOString()})});setMsg(r.ok?`✅ ${name} created! Go to /products`:"Error "+r.status)}return<><Header/><main><section className="page-hero" style={{background:'#FFF0F5'}}><div className="container" style={{maxWidth:600}}><h1>Factory — Create Real Products</h1><input value={name} onChange={e=>setName(e.target.value)} placeholder="Product name" style={{width:'100%', padding:14, borderRadius:10, border:'1px solid #ddd', marginTop:20}}/><button onClick={create} className="button primary" style={{width:'100%', marginTop:12, padding:14}}>Create Product</button><p>{msg}</p></div></section></main><Footer/></>}
function CreativeAds(){return<><Header/><main><section className="page-hero"><div className="container" style={{maxWidth:700, textAlign:'center'}}><img src={creativeAdsLogo} alt="logo" style={{maxWidth:220, margin:'0 auto 20px'}}/><h1>Ads Pack $25</h1><img src={laTambora} alt="ad" style={{width:'100%', borderRadius:16, margin:'20px 0'}}/></div></section></main><Footer/></>}
function Contact(){return<><Header/><main><section className="page-hero"><div className="container" style={{textAlign:'center'}}><h1>Contact @mimis_corner_co</h1></div></section></main><Footer/></>}
export default function App(){return(<Switch><Route path="/"><Home/></Route><Route path="/atlas"><AtlasOS/></Route><Route path="/blueprints"><Blueprints/></Route><Route path="/tools"><ToolsPage/></Route><Route path="/products"><ProductsPage/></Route><Route path="/product-factory"><ProductFactory/></Route><Route path="/creative-ads"><CreativeAds/></Route><Route path="/contact"><Contact/></Route><Route><Home/></Route></Switch>)}