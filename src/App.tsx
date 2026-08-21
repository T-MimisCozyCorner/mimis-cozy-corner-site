import { useState } from 'react'
import { Link, Route, Switch, useLocation } from 'wouter'
import { ArrowRight, BadgeDollarSign, Bot, BriefcaseBusiness, Check, ChevronRight, House, Menu, Search, ShoppingBag, Sparkles, X, PenLine, Download, Mail } from 'lucide-react'
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
  const [loc] = useLocation()
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">Mimi's Cozy Corner</Link>
        <nav className={open ? "nav open" : "nav"}>
          <Link href="/"><House size={16}/> Home</Link>
          <Link href="/creative-ads"><BadgeDollarSign size={16}/> Creative Ads</Link>
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
        <p>© 2026 Mimi's Cozy Corner • Built with love</p>
        <div className="socials">
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://facebook.com" target="_blank">Facebook</a>
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
              <p>One place for ads, tools, finds, and resources that actually help.</p>
              <div className="cta-row">
                <Link className="button primary" href="/creative-ads">Explore Creative Ads <ArrowRight size={18}/></Link>
                <Link className="button secondary" href="/about">About Mimi</Link>
              </div>
            </div>
            <div className="avatar-card"><img src={avatar} alt="Mimi avatar"/><div className="avatar-chip"><Sparkles size={15}/> Creative mind at work</div></div>
          </div>
        </section>
        <section className="about-strip"><div className="container about-grid"><img src={avatar} alt="Mimi avatar"/><div><div className="eyebrow">MEET MIMI</div><h2>One person. A bunch of ideas. A cozy corner to put them.</h2><p>Mimi's Cozy Corner brings creative services, digital products, helpful resources, and practical online ideas together so customers don't have to hunt through a dozen different places.</p><Link className="text-link" href="/about">Meet Mimi <ChevronRight size={17}/></Link></div></div></section>
      </main>
      <Footer/>
    </>
  )
}

function CreativeAds() {
  return <><Header/><main><section className="page-hero"><div className="container"><img src={creativeAdsLogo} alt="Creative Ads Logo" style={{maxWidth:200}}/><h1>Mimi's Creative Ads</h1><p>From $25 social ads to full brand kits.</p><img src={laTambora} alt="sample" style={{maxWidth:400, marginTop:20}}/></div></section></main><Footer/></>
}
function About() { return <><Header/><main><section className="page-hero purple-bg"><div className="container about-page"><img src={avatar} alt="Mimi avatar"/><div><div className="eyebrow">ABOUT MIMI'S COZY CORNER</div><h1>Welcome to my little corner of the internet.</h1><p>Mimi's Cozy Corner is the umbrella for a collection of creative projects, services, digital products, finds, and resources. The goal is simple: make useful things, make them look good, and make them easier for real people to use.</p><p>From helping a small business turn its products into better copy to creating a $25 social-media ad, building digital tools, sharing useful finds, and creating practical housing resources — this corner is designed to keep growing.</p><Link className="button primary" href="/contact">Work With Mimi <ArrowRight size={18}/></Link></div></div></section></main><Footer/></> }
function Contact() { return <><Header/><main><section className="page-hero"><div className="container"><h1>Contact</h1><p>Email: hello@mimiscozycorner.com</p></div></section></main><Footer/></> }
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
