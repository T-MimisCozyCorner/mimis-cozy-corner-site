import { useState } from 'react'
import { Link, Route, Switch, useLocation } from 'wouter'
import { ArrowRight, BadgeDollarSign, Check, ChevronRight, House, Menu, X, Mail, Sparkles } from 'lucide-react'
import avatar from './assets/mimi-avatar.png'
import creativeAdsLogo from './assets/mimis-creative-ads-logo.png'
import laTambora from './assets/la-tambora-sample.jpg'

const branches = [
  { slug: 'creative-ads', name: "Mimi's Creative Ads", desc: "Logos, ad copy, and $25 social ads that sell" },
  { slug: 'digital-tools', name: "Digital Tools", desc: "Helpful tools and templates" },
  { slug: 'finds', name: "Cozy Finds", desc: "Curated products and resources" },
  { slug: 'housing', name: "Housing Resources", desc: "Practical guides for renters and buyers" },
]

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">Mimi's Cozy Corner</Link>
        <nav className={open ? "nav open" : "nav"}>
          <Link href="/"><House size={16}/> Home</Link>
          <Link href="/creative-ads"><BadgeDollarSign size={16}/> Creative Ads - $25</Link>
          <Link href="/about">About</Link>
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
        <p>© 2026 Mimi's Cozy Corner • Mimi's Creative Ads - Starting at $25</p>
        <div className="socials">
          <a href="https://instagram.com/mimis_corner_co" target="_blank">Instagram @mimis_corner_co</a>
          <a href="https://shop.mimiscozycorner.com/products" target="_blank">Shop</a>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <>
      <Header/>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">WELCOME TO THE COZY CORNER</div>
              <h1>Creative ideas, made cozy and useful.</h1>
              <p>One place for ads, tools, finds, and resources that actually help. <strong>Now offering $25 custom social ads for small businesses!</strong></p>
              <div className="cta-row">
                <Link className="button primary" href="/creative-ads">See $25 Ad Sample <ArrowRight size={18}/></Link>
                <Link className="button secondary" href="/about">About Mimi</Link>
              </div>
            </div>
            <div className="avatar-card"><img src={avatar} alt="Mimi avatar"/><div className="avatar-chip"><Sparkles size={15}/> Mimi's Creative Ads</div></div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}

function CreativeAds() {
  return (
    <>
      <Header/>
      <main>
        <section className="page-hero">
          <div className="container" style={{maxWidth:720}}>
            <div style={{textAlign:'center'}}>
              <img src={creativeAdsLogo} alt="Mimi's Creative Ads Logo" style={{maxWidth:220, margin:'0 auto 20px', borderRadius:12}}/>
              <h1>Mimi's Creative Ads</h1>
              <p style={{fontSize:20}}>Custom Social Media Ads for Small Businesses</p>
              <p><strong>Social Media Ads That Make Your Business Stand Out.</strong></p>
            </div>

            {/* LA TAMBORA SAMPLE AD */}
            <div style={{background:'white', borderRadius:20, padding:24, marginTop:32, boxShadow:'0 10px 40px rgba(0,0,0,0.1)'}}>
              <img src={laTambora} alt="La Tambora Dominican Restaurant Sample Ad" style={{width:'100%', borderRadius:16, marginBottom:20}}/>
              
              <h2 style={{textAlign:'center'}}>🇩🇴🔥 REAL DOMINICAN FLAVOR. REAL GOOD.</h2>
              
              <p>If you're looking for food that tastes like it was made with tradition, love, and plenty of flavor, La Tambora is where you want to be! ❤</p>
              
              <p>From those crispy, golden empanadas to the authentic Dominican flavors that bring you right back to the table with family, every bite is made to satisfy. The food is flavorful, comforting, and made to give you that real taste of the Dominican Republic.</p>
              
              <p>Whether you're craving something delicious for yourself or looking for authentic Dominican food for your next gathering, La Tambora brings the flavor! 🇩🇴🔥</p>
              
              <p><strong>📲 Scan the QR code above and follow @LATAMBORA405 to discover more and support this amazing small business.</strong></p>
              
              <p style={{textAlign:'center', fontWeight:'bold'}}>❤🇩🇴 La Tambora — Authentic Dominican Flavor.</p>

              <hr style={{margin:'30px 0', border:'none', borderTop:'2px dashed #eee'}} />

              <div style={{background:'#FFF7F0', border:'2px dashed #FF9A6A', borderRadius:16, padding:24, textAlign:'center'}}>
                <h2>✨ LIKE THIS AD? I CAN CREATE ONE FOR YOUR BUSINESS TOO!</h2>
                <h3>Mimi's Creative Ads</h3>
                <p>Social Media Ads That Make Your Business Stand Out.</p>
                <p>I create custom social-media advertisements designed to make your business stand out, look professional, and get attention. I create the graphic, write the promo copy, incorporate your logo/QR code, and make it ready to post.</p>
                
                <div style={{textAlign:'left', background:'white', padding:16, borderRadius:12, margin:'16px 0'}}>
                  <p><Check size={16} style={{display:'inline'}}/> Custom graphic design</p>
                  <p><Check size={16} style={{display:'inline'}}/> Promotional copy written for you</p>
                  <p><Check size={16} style={{display:'inline'}}/> Your logo + QR code / socials included</p>
                  <p><Check size={16} style={{display:'inline'}}/> Ready to post on Instagram/Facebook</p>
                </div>

                <p style={{fontSize:28, fontWeight:'bold', color:'#E85D3F', margin:'20px 0'}}>💰 Custom Business Ad — $25</p>
                <p style={{fontSize:13, opacity:0.7}}>Introductory price - will be $35-$50 soon after portfolio fills!</p>
                
                <p>📸 Send me your business name, photos/logo, contact information, and what you offer.</p>
                
                <Link href="/contact" className="button primary" style={{marginTop:16, display:'inline-flex'}}>📩 Message Me To Get Yours <ArrowRight size={18}/></Link>
                
                <p style={{marginTop:16}}><a href="https://instagram.com/mimis_corner_co" target="_blank" style={{fontWeight:'bold'}}>DM on Instagram @mimis_corner_co</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}

function About() { 
  return <><Header/><main><section className="page-hero purple-bg"><div className="container about-page"><img src={avatar} alt="Mimi avatar"/><div><div className="eyebrow">ABOUT MIMI'S COZY CORNER</div><h1>Welcome to my little corner of the internet.</h1><p>Mimi's Cozy Corner is the umbrella for creative projects. Our first service: <strong>Mimi's Creative Ads - custom $25 social ads</strong> for small businesses like La Tambora.</p><Link className="button primary" href="/creative-ads">See What I Can Create <ArrowRight size={18}/></Link></div></div></section></main><Footer/></> 
}

function Contact() { 
  return <><Header/><main><section className="page-hero"><div className="container" style={{maxWidth:600, textAlign:'center'}}><h1>Let's Create Your Ad!</h1><p>Mimi's Creative Ads - Starting at $25</p><div style={{background:'white', padding:30, borderRadius:16, marginTop:20}}><p>📧 hello@mimiscozycorner.com</p><p>📸 Instagram: <a href="https://instagram.com/mimis_corner_co" target="_blank">@mimis_corner_co</a></p><p>🛍️ Shop: <a href="https://shop.mimiscozycorner.com" target="_blank">shop.mimiscozycorner.com</a></p><p style={{marginTop:20}}>Send: Business name, photos/logo, what you offer, contact info</p></div></div></section></main><Footer/></> 
}

function BranchPage({ branch }: any) { return <><Header/><main><section className="page-hero"><div className="container"><h1>{branch.name}</h1><p>{branch.desc}</p></div></section></main><Footer/></> }

export default function App() {
  return <Switch>
    <Route path="/"><Home/></Route>
    <Route path="/creative-ads"><CreativeAds/></Route>
    <Route path="/about"><About/></Route>
    <Route path="/contact"><Contact/></Route>
    {branches.filter(b => b.slug !== 'creative-ads').map(b => <Route key={b.slug} path={`/${b.slug}`}><BranchPage branch={b}/></Route>)}
    <Route><Home/></Route>
  </Switch>
}
