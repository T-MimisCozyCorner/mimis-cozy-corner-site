import { useState } from 'react'
import { Link, Route, Switch } from 'wouter'
import { ArrowRight, BadgeDollarSign, Check, ChevronRight, House, Menu, X, Mail, Sparkles, Monitor } from 'lucide-react'
import { ArrowRight, BadgeDollarSign, Check, House, Menu, X, Mail, Sparkles, Monitor, Home as HomeIcon, ShoppingBag } from 'lucide-react'
import avatar from './assets/mimi-avatar.png'
import creativeAdsLogo from './assets/mimis-creative-ads-logo.png'
import laTambora from './assets/la-tambora-sample.jpg'

const branches = [
  { slug: 'creative-ads', name: "Mimi's Creative Ads", desc: "Logos, ad copy, and $25 social ads that sell" },
  { slug: 'atlas-os', name: "Atlas OS Hub", desc: "Lightweight Windows for speed" },
  { slug: 'digital-tools', name: "Digital Tools", desc: "Helpful tools and templates" },
]

function Header() {
  const [open, setOpen] = useState(false)
  return (
@@ -21,22 +15,17 @@ function Header() {
          <Link href="/"><House size={16}/> Home</Link>
          <Link href="/creative-ads"><BadgeDollarSign size={16}/> Ads $25</Link>
          <Link href="/atlas-os"><Monitor size={16}/> Atlas OS</Link>
          <Link href="/housing"><HomeIcon size={16}/> Housing</Link>
          <Link href="/finds"><ShoppingBag size={16}/> Finds</Link>
          <Link href="/contact"><Mail size={16}/> Contact</Link>
        </nav>
        <button className="menu-btn" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </header>
  )
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© 2026 Mimi's Cozy Corner • Mimi's Creative Ads $25 • Atlas OS Resource Hub</p>
      </div>
    </footer>
  )
}
function Footer() { return <footer className="footer"><div className="container"><p>© 2026 Mimi's Cozy Corner • Ads $25 • Atlas OS Hub • Housing & Finds</p></div></footer> }

function Home() {
  return (
    <>
@@ -47,15 +36,22 @@ function Home() {
            <div>
              <div className="eyebrow">WELCOME TO THE COZY CORNER</div>
              <h1>Creative ideas, made cozy and useful.</h1>
              <p>Ads that sell for $25, plus tools like Atlas OS that make your PC faster.</p>
              <div className="cta-row">
                <Link className="button primary" href="/creative-ads">See $25 Ad Sample <ArrowRight size={18}/></Link>
                <Link className="button secondary" href="/atlas-os">Atlas OS Hub <Monitor size={16}/></Link>
              <p>Ads that sell for $25, tools that speed up your PC, housing guides, and cozy finds - all in one corner.</p>
              <div className="cta-row" style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:20}}>
                <Link className="button primary" href="/creative-ads">Ads $25 Sample <ArrowRight size={18}/></Link>
                <Link className="button secondary" href="/atlas-os">Atlas OS Hub</Link>
                <Link className="button secondary" href="/housing">Housing Resources</Link>
              </div>
            </div>
            <div className="avatar-card"><img src={avatar} alt="Mimi avatar"/><div className="avatar-chip"><Sparkles size={15}/> Mimi's Creative Ads</div></div>
            <div className="avatar-card"><img src={avatar} alt="Mimi"/><div className="avatar-chip"><Sparkles size={15}/> Mimi's Cozy Corner</div></div>
          </div>
        </section>
        <section style={{padding:'40px 0'}}><div className="container" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16}}>
          <Link href="/creative-ads" style={{background:'white', padding:20, borderRadius:16}}><h3>🎨 Mimi's Creative Ads</h3><p>Custom social ads $25 that sell</p></Link>
          <Link href="/atlas-os" style={{background:'#0a0a0a', color:'white', padding:20, borderRadius:16}}><h3>⚡ Atlas OS Hub</h3><p>Make Windows faster & private</p></Link>
          <Link href="/housing" style={{background:'#F0F7FF', padding:20, borderRadius:16}}><h3>🏠 Housing Resources</h3><p>Guides for renters & buyers</p></Link>
          <Link href="/finds" style={{background:'#FFF0F5', padding:20, borderRadius:16}}><h3>🛍️ Cozy Finds</h3><p>Curated products we love</p></Link>
        </div></div></section>
      </main>
      <Footer/>
    </>
@@ -68,24 +64,16 @@ function CreativeAds() {
      <main>
        <section className="page-hero">
          <div className="container" style={{maxWidth:720}}>
            <div style={{textAlign:'center'}}>
              <img src={creativeAdsLogo} alt="Mimi's Creative Ads Logo" style={{maxWidth:220, margin:'0 auto 20px', borderRadius:12}}/>
              <h1>Mimi's Creative Ads</h1>
              <p>Custom Social Media Ads - Starting at $25</p>
            </div>
            <div style={{textAlign:'center'}}><img src={creativeAdsLogo} alt="logo" style={{maxWidth:220, margin:'0 auto 20px', borderRadius:12}}/><h1>Mimi's Creative Ads</h1><p>Starting at $25</p></div>
            <div style={{background:'white', borderRadius:20, padding:24, marginTop:32, boxShadow:'0 10px 40px rgba(0,0,0,0.1)'}}>
              <img src={laTambora} alt="La Tambora Sample Ad" style={{width:'100%', borderRadius:16, marginBottom:20}}/>
              <img src={laTambora} alt="La Tambora" style={{width:'100%', borderRadius:16, marginBottom:20}}/>
              <h2 style={{textAlign:'center'}}>🇩🇴🔥 REAL DOMINICAN FLAVOR. REAL GOOD.</h2>
              <p>If you're looking for food that tastes like it was made with tradition, love, and plenty of flavor, La Tambora is where you want to be! ❤</p>
              <p>From those crispy, golden empanadas to the authentic Dominican flavors that bring you right back to the table with family, every bite is made to satisfy.</p>
              <p>Whether you're craving something delicious for yourself or looking for authentic Dominican food for your next gathering, La Tambora brings the flavor! 🇩🇴🔥</p>
              <p><strong>📲 Scan the QR code above and follow @LATAMBORA405</strong></p>
              <p style={{textAlign:'center', fontWeight:'bold'}}>❤🇩🇴 La Tambora — Authentic Dominican Flavor.</p>
              <hr style={{margin:'30px 0', borderTop:'2px dashed #eee'}} />
              <div style={{background:'#FFF7F0', border:'2px dashed #FF9A6A', borderRadius:16, padding:24, textAlign:'center'}}>
              <p>If you're looking for food that tastes like it was made with tradition, love, and plenty of flavor, La Tambora is where you want to be!</p>
              <p><strong>📲 Scan QR & follow @LATAMBORA405</strong></p>
              <div style={{background:'#FFF7F0', border:'2px dashed #FF9A6A', borderRadius:16, padding:24, textAlign:'center', marginTop:20}}>
                <h2>✨ LIKE THIS AD? I CAN CREATE ONE FOR YOUR BUSINESS TOO!</h2>
                <p>Custom graphic, promo copy, logo/QR, ready-to-post</p>
                <p style={{fontSize:28, fontWeight:'bold', color:'#E85D3F'}}>💰 Custom Business Ad — $25</p>
                <p style={{fontSize:28, fontWeight:'bold', color:'#E85D3F'}}>💰 Custom Ad — $25</p>
                <p><Check size={14}/> Graphic + Copy + Logo/QR + Ready to post</p>
                <Link href="/contact" className="button primary" style={{marginTop:16, display:'inline-flex'}}>📩 Message Me <ArrowRight size={18}/></Link>
              </div>
            </div>
@@ -101,35 +89,51 @@ function AtlasOS() {
    <>
      <Header/>
      <main>
        <section className="page-hero" style={{background:'#0a0a0a', color:'white', minHeight:'80vh'}}>
          <div className="container" style={{maxWidth:800}}>
            <div style={{textAlign:'center', marginBottom:40}}>
              <div className="eyebrow" style={{color:'#7EB8FF'}}>DIGITAL TOOLS • COZY FINDS</div>
              <h1 style={{fontSize:52, margin:'16px 0'}}>Atlas OS</h1>
              <p style={{fontSize:20, opacity:0.8}}>A lightweight, secure, high-performance mod of Windows 10 & 11. Curated resource hub by Mimi's Cozy Corner.</p>
              <a href="https://atlasos.net" target="_blank" className="button primary" style={{marginTop:20, display:'inline-flex', background:'white', color:'black'}}>Visit Official Site atlasos.net <ArrowRight size={18}/></a>
        <section className="page-hero" style={{background:'#0a0a0a', color:'white', minHeight:'70vh'}}>
          <div className="container" style={{maxWidth:800, textAlign:'center'}}>
            <h1 style={{fontSize:52}}>Atlas OS</h1>
            <p style={{opacity:0.8}}>Lightweight, secure Windows mod - Resource Hub</p>
            <div style={{display:'grid', gap:20, marginTop:30, textAlign:'left'}}>
              <div style={{background:'#151515', padding:24, borderRadius:12}}><h3>⚡ What is Atlas?</h3><p>Removes bloat & tracking for faster gaming & work.</p><p><a href="https://atlasos.net" target="_blank" style={{color:'#7EB8FF'}}>→ Official Site atlasos.net</a></p></div>
            </div>
            <div style={{display:'grid', gap:20, textAlign:'left'}}>
              <div style={{background:'#151515', padding:24, borderRadius:12, border:'1px solid #222'}}>
                <h3>⚡ What is Atlas?</h3>
                <p style={{opacity:0.8}}>Atlas removes bloatware, tracking, and mitigations that slow down Windows. Designed for gaming, creators, and low-latency workflows while keeping security.</p>
              </div>
              <div style={{background:'#151515', padding:24, borderRadius:12, border:'1px solid #222'}}>
                <h3>🛡️ Why People Use It</h3>
                <p style={{opacity:0.8}}><Check size={14} style={{display:'inline'}}/> Lower latency & higher FPS • <Check size={14} style={{display:'inline'}}/> Privacy focused • <Check size={14} style={{display:'inline'}}/> Debloated • <Check size={14} style={{display:'inline'}}/> Open Source on GitHub</p>
              </div>
              <div style={{background:'#151515', padding:24, borderRadius:12, border:'1px solid #222'}}>
                <h3>📥 Official & Safe Links Only</h3>
                <p><a href="https://atlasos.net" target="_blank" style={{color:'#7EB8FF'}}>→ atlasos.net (Official Download)</a></p>
                <p><a href="https://docs.atlasos.net" target="_blank" style={{color:'#7EB8FF'}}>→ docs.atlasos.net (Install Guide)</a></p>
                <p><a href="https://github.com/Atlas-OS/Atlas" target="_blank" style={{color:'#7EB8FF'}}>→ GitHub.com/Atlas-OS (Source Code)</a></p>
                <p style={{fontSize:12, opacity:0.5, marginTop:16}}>⚠️ Always download from official site only. This hub is independent, not affiliated with Atlas OS.</p>
              </div>
            </div>
            <div style={{textAlign:'center', marginTop:40, padding:20, background:'#111', borderRadius:12}}>
              <h3>Need help installing Atlas OS?</h3>
              <p style={{opacity:0.7}}>I can create a custom install guide graphic for your PC shop or tech business - $25 via Mimi's Creative Ads</p>
              <Link href="/creative-ads" className="button secondary" style={{marginTop:10}}>Get a $25 Tech Ad <ArrowRight size={16}/></Link>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
function Housing() {
  return (
    <>
      <Header/>
      <main>
        <section className="page-hero" style={{background:'#F0F7FF'}}>
          <div className="container" style={{maxWidth:700}}>
            <h1>🏠 Housing Resources</h1>
            <p>Practical guides for renters and buyers - coming from Mimi's Cozy Corner.</p>
            <div style={{background:'white', padding:24, borderRadius:16, marginTop:20}}><h3>Coming Soon:</h3><p>✔️ First-time renter checklist</p><p>✔️ How to read a lease</p><p>✔️ Moving on a budget</p></div>
            <Link href="/contact" className="button primary" style={{marginTop:20, display:'inline-flex'}}>Get Early Access <ArrowRight size={18}/></Link>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
function Finds() {
  return (
    <>
      <Header/>
      <main>
        <section className="page-hero" style={{background:'#FFF0F5'}}>
          <div className="container" style={{maxWidth:700}}>
            <h1>🛍️ Cozy Finds</h1>
            <p>Curated products, tools, and resources we actually use and love.</p>
            <div style={{display:'grid', gap:16, marginTop:20}}>
              <div style={{background:'white', padding:20, borderRadius:12}}><h3>🎨 Mimi's Creative Ads - $25 Social Ad</h3><p>Our #1 find - custom ads that sell. <Link href="/creative-ads">See sample →</Link></p></div>
              <div style={{background:'white', padding:20, borderRadius:12}}><h3>⚡ Atlas OS - Free Windows Mod</h3><p>Speed up your old PC. <Link href="/atlas-os">Visit hub →</Link></p></div>
              <a href="https://shop.mimiscozycorner.com" target="_blank" style={{background:'white', padding:20, borderRadius:12, display:'block'}}><h3>🛒 Shop Mimi's Cozy Corner</h3><p>shop.mimiscozycorner.com →</p></a>
            </div>
          </div>
        </section>
@@ -138,16 +142,18 @@ function AtlasOS() {
    </>
  )
}
function Contact() { return <><Header/><main><section className="page-hero"><div className="container" style={{maxWidth:600, textAlign:'center'}}><h1>Contact Mimi</h1><p>Ads $25 | Atlas OS Help | Digital Tools</p><p>DM: @mimis_corner_co</p></div></section></main><Footer/></> }
function Contact() { return <><Header/><main><section className="page-hero"><div className="container" style={{maxWidth:600, textAlign:'center'}}><h1>Contact Mimi</h1><p>DM @mimis_corner_co • hello@mimiscozycorner.com</p><p>Ads $25 | Atlas OS Help | Housing Guides</p></div></section></main><Footer/></> }

export default function App() {
  return (
    <Switch>
      <Route path="/"><Home/></Route>
      <Route path="/creative-ads"><CreativeAds/></Route>
      <Route path="/atlas-os"><AtlasOS/></Route>
      <Route path="/about"><div><Header/><main><section className="page-hero"><div className="container"><h1>About Mimi</h1></div></section></main><Footer/></div></Route>
      <Route path="/housing"><Housing/></Route>
      <Route path="/finds"><Finds/></Route>
      <Route path="/contact"><Contact/></Route>
      <Route path="/about"><Contact/></Route>
      <Route><Home/></Route>
    </Switch>
  )
