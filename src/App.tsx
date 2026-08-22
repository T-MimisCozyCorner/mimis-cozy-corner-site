import { useState } from 'react'
import { Link, Route, Switch } from 'wouter'
import { ArrowRight, BadgeDollarSign, House, Menu, X, Mail, Sparkles, LayoutDashboard, Box, Factory as FactoryIcon, FileCode } from 'lucide-react'
import avatar from './assets/mimi-avatar.png'
import creativeAdsLogo from './assets/mimis-creative-ads-logo.png'
import laTambora from './assets/la-tambora-sample.jpg'

function Header(){
  const[open,setOpen]=useState(false);
  return(
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">Mimi's Cozy Corner</Link>
        <nav className={open?"nav open":"nav"}>
          <Link href="/"><House size={16}/> Home</Link>
          <Link href="/dashboard"><LayoutDashboard size={16}/> Dash</Link>
          <Link href="/blueprints"><FileCode size={16}/> Blueprints</Link>
          <Link href="/products"><Box size={16}/> Products</Link>
          <Link href="/product-factory"><FactoryIcon size={16}/> Factory</Link>
          <Link href="/creative-ads"><BadgeDollarSign size={16}/> Ads $25</Link>
          <Link href="/contact"><Mail size={16}/> Contact</Link>
        </nav>
        <button className="menu-btn" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
      </div>
    </header>
  )
}
function Footer(){return<footer className="footer"><div className="container"><p>© 2026 Mimi's Cozy Corner - Atlas Fixed</p></div></footer>}
function Home(){
  return(
    <>
      <Header/>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">ATLAS OS INCORPORATED - BLUEPRINTS 404 FIXED</div>
              <h1>Cozy + Atlas OS</h1>
              <p>Blueprints, Products, Factory now inside mimiscozycorner.com</p>
              <div className="cta-row" style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:20}}>
                <Link className="button primary" href="/dashboard">Dashboard <ArrowRight size={18}/></Link>
                <Link className="button secondary" href="/blueprints">Blueprints Fixed</Link>
              </div>
            </div>
            <div className="avatar-card"><img src={avatar} alt="Mimi"/><div className="avatar-chip"><Sparkles size={15}/> Atlas Inside</div></div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
function Dashboard(){return<><Header/><main><section className="page-hero" style={{background:'#0a0a0a', color:'white'}}><div className="container"><h1>Dashboard - Atlas OS Inside</h1><p>Incorporated from sprint-2.8.1</p></div></section></main><Footer/></>}
function Blueprints(){return<><Header/><main><section className="page-hero"><div className="container"><h1>Blueprints - 404 FIXED!</h1><p>Was 2 empty folders - now working here!</p><div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, marginTop:20}}><div style={{background:'white', border:'1px solid #eee', padding:20, borderRadius:12}}>SaaS Starter - From Atlas OS</div><div style={{background:'white', border:'1px solid #eee', padding:20, borderRadius:12}}>Ecom Kit - From Atlas OS</div></div></div></section></main><Footer/></>}
function Products(){return<><Header/><main><section className="page-hero" style={{background:'#F0F7FF'}}><div className="container"><h1>Products</h1><p>From Atlas OS - will add Supabase next</p><div style={{background:'white', padding:16, borderRadius:12, marginTop:12}}>La Tambora Ad Kit - $25</div><div style={{background:'white', padding:16, borderRadius:12, marginTop:12}}>Atlas OS Lite</div></div></section></main><Footer/></>}
function ProductFactory(){return<><Header/><main><section className="page-hero" style={{background:'#FFF0F5'}}><div className="container" style={{maxWidth:600}}><h1>Product Factory</h1><p>Atlas OS Factory incorporated</p><div style={{background:'white', padding:20, borderRadius:12, marginTop:20}}><input placeholder="Product name" style={{width:'100%', padding:12, borderRadius:8, border:'1px solid #ddd'}}/><button className="button primary" style={{width:'100%', marginTop:12}}>Create</button></div></div></section></main><Footer/></>}
function CreativeAds(){return<><Header/><main><section className="page-hero"><div className="container" style={{maxWidth:700, textAlign:'center'}}><img src={creativeAdsLogo} alt="logo" style={{maxWidth:200, margin:'0 auto 20px'}}/><h1>Ads $25</h1><img src={laTambora} alt="ad" style={{width:'100%', borderRadius:16, margin:'20px 0'}}/></div></section></main><Footer/></>}
function Contact(){return<><Header/><main><section className="page-hero"><div className="container" style={{textAlign:'center'}}><h1>Contact Mimi</h1><p>@mimis_corner_co</p></div></section></main><Footer/></>}
export default function App(){
  return(
    <Switch>
      <Route path="/"><Home/></Route>
      <Route path="/dashboard"><Dashboard/></Route>
      <Route path="/blueprints"><Blueprints/></Route>
      <Route path="/products"><Products/></Route>
      <Route path="/product-factory"><ProductFactory/></Route>
      <Route path="/creative-ads"><CreativeAds/></Route>
      <Route path="/atlas-os"><Dashboard/></Route>
      <Route path="/contact"><Contact/></Route>
      <Route><Home/></Route>
    </Switch>
  )
}
