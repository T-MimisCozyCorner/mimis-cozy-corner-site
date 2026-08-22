import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const BLUEPRINTS = [
  { id: 'saas', name: 'SaaS Starter', desc: 'Complete SaaS boilerplate - Auth, Stripe, DB, Dashboard ready to ship', price: 97, badge: 'Most Popular' },
  { id: 'ecom', name: 'Ecom Kit', desc: 'Shopify-ready storefront with admin panel and payments', price: 67, badge: '' },
  { id: 'atlas', name: 'Atlas Core', desc: 'Atlas Core - Your AI workforce with 100 prompts and 5 agents', price: 147, badge: 'AI Agent OS' },
  { id: 'ads', name: 'Creative Ads Pack', desc: '50+ Canva ad templates including La Tambora - Editable', price: 25, badge: '' },
  { id: 'tools', name: 'Digital Tools Stack', desc: '10 Landing pages, 3 funnels, lead magnets system', price: 47, badge: '' },
  { id: 'factory', name: 'Product Factory', desc: 'Idea to product in 24h - Complete build and scale system', price: 197, badge: 'New' },
  { id: 'bundle', name: 'Atlas OS Bundle', desc: 'ALL 6 blueprints + factory access + 1:1 support + lifetime updates - Best Value', price: 497, badge: 'Best Value' },
]

const TOOLS = [
  { name: 'Product Generator', color: '#FF6B6B', desc: 'Generate product ideas' },
  { name: 'Ad Creator', color: '#4ECDC4', desc: 'Create ads in seconds' },
  { name: 'Blueprint Builder', color: '#45B7D1', desc: 'Build custom blueprints' },
  { name: 'Supabase Connector', color: '#96CEB4', desc: 'Connect your database' },
  { name: 'Stripe Checkout', color: '#FFEAA7', desc: 'Payments integration' },
  { name: 'Factory Pipeline', color: '#DDA0DD', desc: 'Automate production' },
]

function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white', borderBottom: '1px solid #eee', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ fontWeight: 800, fontSize: '20px', textDecoration: 'none', color: '#0a0a0a' }}>Mimi's Cozy Corner</Link>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <Link to="/blueprints" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: 600 }}>Blueprints</Link>
        <Link to="/tools" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: 600 }}>Tools</Link>
        <Link to="/products" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: 600 }}>Products</Link>
        <Link to="/factory" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: 600 }}>Factory</Link>
        <Link to="/ads" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: 600 }}>Ads $25</Link>
        <Link to="/contact" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: 600 }}>Contact</Link>
      </nav>
    </header>
  )
}

function Page({ title, subtitle, children }: any) {
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <div style={{ padding: '60px 24px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#0a0a0a', fontSize: '42px', fontWeight: 800, margin: '0 0 12px', display: 'block', opacity: 1 }}>{title}</h1>
        {subtitle && <p style={{ color: '#666', fontSize: '18px', margin: 0 }}>{subtitle}</p>}
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 80px' }}>{children}</div>
    </div>
  )
}

function Blueprints() {
  const nav = useNavigate()
  return (
    <Page title="Business Blueprints — 7 Live with Products" subtitle="Full descriptions, prices visible, Launch goes to Factory not Contact">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {BLUEPRINTS.map(b => (
          <div key={b.id} style={{ border: '2px solid #eee', borderRadius: '16px', padding: '24px', background: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            {b.badge && <div style={{ background: '#0a0a0a', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', display: 'inline-block', marginBottom: '10px' }}>{b.badge}</div>}
            <h3 style={{ margin: '0 0 8px', color: '#0a0a0a' }}>{b.name}</h3>
            <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5', minHeight: '60px' }}>{b.desc}</p>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '12px 0', color: '#0a0a0a' }}>${b.price}</div>
            <button onClick={() => nav('/factory')} style={{ width: '100%', background: '#0a0a0a', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Launch</button>
          </div>
        ))}
      </div>
    </Page>
  )
}

function Tools() {
  return (
    <Page title="Tools" subtitle="6 real tools with colors">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {TOOLS.map(t => (
          <div key={t.name} style={{ borderLeft: `6px solid ${t.color}`, border: '1px solid #eee', borderLeftWidth: '6px', borderRadius: '12px', padding: '20px', background: 'white' }}>
            <h3 style={{ margin: '0 0 8px', color: '#0a0a0a' }}>{t.name}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{t.desc}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}

function Products() {
  const [custom] = useState<any[]>([])
  return (
    <Page title="Products" subtitle="7 blueprints + your custom products">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {BLUEPRINTS.map(b => (
          <div key={b.id} style={{ border: '2px solid #eee', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ color: '#0a0a0a' }}>{b.name}</h3>
            <p style={{ color: '#555', fontSize: '14px' }}>{b.desc}</p>
            <div style={{ fontWeight: 800, marginTop: '8px' }}>${b.price}</div>
          </div>
        ))}
        {custom.map((p: any) => (
          <div key={p.id} style={{ border: '2px solid #4ECDC4', borderRadius: '16px', padding: '24px', background: '#F0FFF8' }}>
            <h3 style={{ color: '#0a0a0a' }}>{p.name || p.title}</h3>
            <p style={{ color: '#555' }}>{p.description}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}

function Factory() { return <Page title="Factory" subtitle="Build pipeline - Atlas OS production"><p>Factory pipeline active</p></Page> }
function Ads() { return <Page title="Ads $25 Pack" subtitle="50+ Canva templates"><p>La Tambora sample included</p></Page> }
function Contact() { return <Page title="Contact" subtitle="Get in touch"><p>hello@mimiscozycorner.com</p></Page> }
function Home() { return <Page title="Welcome to Mimi's Cozy Corner" subtitle="Atlas OS - Your business operating system"><Link to="/blueprints" style={{ background: '#0a0a0a', color: 'white', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none' }}>View Blueprints</Link></Page> }

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blueprints" element={<Blueprints />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/products" element={<Products />} />
        <Route path="/factory" element={<Factory />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer style={{ textAlign: 'center', padding: '20px', color: '#888', borderTop: '1px solid #eee' }}>© 2026 Mimi's Cozy Corner • Atlas OS</footer>
    </BrowserRouter>
  )
}