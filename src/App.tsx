import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

const SOCIALS = [
  { name: "Instagram", url: "https://instagram.com/mimis_corner_co", icon: "📷" },
  { name: "TikTok", url: "https://tiktok.com/@mimis_corner_co", icon: "🎵" },
  { name: "Facebook", url: "https://facebook.com/tonya.stewart.566", icon: "👥" },
  { name: "Shop", url: "/products", icon: "🛍️" },
]

const BLUEPRINTS = [
  { id: "saas", name: "SaaS Starter", desc: "Complete SaaS boilerplate - Auth, Stripe, DB, Dashboard", price: 97, badge: "Most Popular", img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400", includes: "Auth + Stripe + DB + Dashboard" },
  { id: "ecom", name: "Ecom Kit", desc: "Shopify-ready storefront with admin panel and payments", price: 67, badge: "", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400", includes: "Storefront + Admin + Payments" },
  { id: "atlas", name: "Atlas Core", desc: "Atlas Core - Your AI workforce with 100 prompts and 5 agents", price: 147, badge: "AI Agent OS", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400", includes: "100 prompts + 5 agents + OS" },
  { id: "ads", name: "Creative Ads Pack", desc: "50+ Canva ad templates including La Tambora - Fully editable", price: 25, badge: "La Tambora Inside", img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400", includes: "50 templates + Canva link" },
  { id: "tools", name: "Digital Tools Stack", desc: "10 Landing pages, 3 funnels, lead magnets, email system", price: 47, badge: "", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400", includes: "10 pages + 3 funnels + Leads" },
  { id: "factory", name: "Product Factory", desc: "Idea to product in 24h - Complete build and scale system", price: 197, badge: "New", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400", includes: "24h Build System + Scale" },
  { id: "bundle", name: "Atlas OS Bundle", desc: "ALL 6 blueprints + factory access + 1:1 support + lifetime updates", price: 497, badge: "Best Value", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400", includes: "ALL 6 + Factory + 1:1 + Lifetime" },
]

function Header() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "2px solid #BC13FE20", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 20px #BC13FE10" }}>
      <Link to="/" style={{ fontWeight: 900, fontSize: "22px", textDecoration: "none", color: "#0a0a0a", textShadow: "0 0 10px #BC13FE40" }}>Mimis Cozy Corner • Atlas OS</Link>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link to="/blueprints" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 700 }}>Blueprints</Link>
          <Link to="/tools" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 700 }}>Tools</Link>
          <Link to="/products" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 700 }}>Products</Link>
          <Link to="/factory" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 700 }}>Factory</Link>
        </nav>
        <div style={{ display: "flex", gap: "8px", borderLeft: "1px solid #eee", paddingLeft: "12px" }}>
          {SOCIALS.map(s => <a key={s.name} href={s.url} target="_blank" style={{ textDecoration: "none", fontSize: "18px" }}>{s.icon}</a>)}
        </div>
      </div>
    </header>
  )
}

function Page({ title, subtitle, children }: any) {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <div style={{ padding: "50px 24px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ color: "#BC13FE", fontSize: "44px", fontWeight: 900, margin: "0 0 12px", textShadow: "0 0 15px #BC13FE" }}>{title}</h1>
        {subtitle && <p style={{ color: "#666", fontSize: "18px", margin: 0 }}>{subtitle}</p>}
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 24px 80px" }}>{children}</div>
    </div>
  )
}

function Home() {
  const nav = useNavigate()
  return (
    <Page title="284 Designs + 7 Blueprints" subtitle="Mimis Cozy Corner + Atlas OS - All visuals, products, socials linked">
      <div style={{ display: "grid", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ background: "#0a0a0a", color: "white", padding: "28px", borderRadius: "20px", border: "2px solid #BC13FE" }}>
            <h2 style={{ color: "#BC13FE", marginTop: 0 }}>BUDGET BUSTER</h2>
            <p>3 Tees for $55 = $18.33 each | 5 for $89 | Bundle $497</p>
            <p style={{ fontSize: "13px", opacity: 0.8 }}>Free shipping over $50. 4 payments of $6.25. Rochester POD - Custom One Online + AlphaGraphics.</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, #BC13FE20, #00FFF720)", padding: "28px", borderRadius: "20px", border: "2px solid #BC13FE40" }}>
            <h3 style={{ marginTop: 0 }}>Atlas OS Visuals Linked</h3>
            <p style={{ fontSize: "14px" }}>All 7 blueprints with images, 6 tools with colors, Factory pipeline, Ads with La Tambora</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>{SOCIALS.map(s => <a key={s.name} href={s.url} style={{ background: "white", padding: "6px 10px", borderRadius: "20px", fontSize: "12px", textDecoration: "none", color: "#0a0a0a", fontWeight: 700 }}>{s.icon} {s.name}</a>)}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {BLUEPRINTS.slice(0,4).map(b => (
            <div key={b.id} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #eee" }}>
              <img src={b.img} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
              <div style={{ padding: "12px" }}><strong>{b.name}</strong><div style={{ fontSize: "12px", color: "#666" }}>${b.price}</div></div>
            </div>
          ))}
        </div>
        <button onClick={() => nav("/blueprints")} style={{ background: "#BC13FE", color: "white", padding: "16px", borderRadius: "12px", border: "none", fontWeight: 800, fontSize: "16px", cursor: "pointer", boxShadow: "0 0 20px #BC13FE" }}>View All 7 Blueprints With Images →</button>
      </div>
    </Page>
  )
}

function BlueprintsPage() {
  const nav = useNavigate()
  return (
    <Page title="Business Blueprints - 7 Live With Images" subtitle="Full Atlas OS visuals + products + socials - Launch goes to Factory">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {BLUEPRINTS.map(b => (
          <div key={b.id} style={{ border: b.id==="bundle"?"3px solid #BC13FE":"2px solid #eee", borderRadius: "16px", overflow: "hidden", background: "white", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
            <img src={b.img} alt={b.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            <div style={{ padding: "20px" }}>
              {b.badge && <div style={{ background: b.id==="bundle"?"#BC13FE":"#0a0a0a", color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, display: "inline-block", marginBottom: "8px" }}>{b.badge}</div>}
              <h3 style={{ margin: "0 0 6px", color: "#0a0a0a" }}>{b.name}</h3>
              <p style={{ color: "#555", fontSize: "13px", lineHeight: "1.4", minHeight: "40px" }}>{b.desc}</p>
              <div style={{ background: "#f5f5f5", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", margin: "8px 0", fontWeight: 600 }}>{b.includes}</div>
              <div style={{ fontSize: "24px", fontWeight: 800, margin: "8px 0" }}>${b.price}</div>
              <button onClick={() => nav("/factory")} style={{ width: "100%", background: b.id==="bundle"?"#BC13FE":"#0a0a0a", color: "white", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>Launch Factory</button>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

function ToolsPage() {
  return (
    <Page title="Tools - 6 Visual Tools" subtitle="All tools with colors, icons, and images from Atlas OS">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {[
          { name: "Product Generator", color: "#FF6B6B", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400", desc: "Generate product ideas" },
          { name: "Ad Creator", color: "#4ECDC4", img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400", desc: "Create ads with La Tambora" },
          { name: "Blueprint Builder", color: "#45B7D1", img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400", desc: "Build custom blueprints" },
          { name: "Supabase Connector", color: "#96CEB4", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400", desc: "Connect database" },
          { name: "Stripe Checkout", color: "#FFEAA7", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400", desc: "Payments - Tees + Bundles" },
          { name: "Factory Pipeline", color: "#DDA0DD", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400", desc: "Rochester POD automation" },
        ].map(t => (
          <div key={t.name} style={{ border: "2px solid #eee", borderRadius: "16px", overflow: "hidden", borderLeft: "6px solid "+t.color }}>
            <img src={t.img} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
            <div style={{ padding: "16px" }}>
              <h3 style={{ margin: "0 0 6px" }}>{t.name}</h3>
              <p style={{ fontSize: "13px", color: "#666" }}>{t.desc}</p>
              <div style={{ marginTop: "8px", background: t.color, display: "inline-block", padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: 800 }}>LIVE</div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

function ProductsPage() {
  return (
    <Page title="Products - Full Visual Catalog" subtitle="284 Tees mockup + 7 Blueprints + Rochester printers linked">
      <div style={{ background: "#f9f9f9", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
        <strong>Printed in Rochester:</strong> Custom One Online (Marketplace Mall) + AlphaGraphics (478 Thurston) + SameDayCustom (1-hour). Socials: IG @mimis_corner_co, FB Tonya Stewart, TikTok @mimis_corner_co - All linked in header/footer.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={{ border: "1px solid #eee", borderRadius: "12px", overflow: "hidden" }}>
            <img src={`https://images.unsplash.com/photo-${i===1?"1576566588028-4147f3842f27":i===2?"1521572163474-6864f9cf17ab":i===3?"1562157873-818bc0726f68":i===4?"1571945153237-4929e783af4a":i===5?"1583743814966-8936f5b7be1a":"1529374255404-90db594a5d32"}?w=400`} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "10px" }}><div style={{ fontSize: "13px", fontWeight: 700 }}>Cozy Tee #{i} - $24.99</div><div style={{ fontSize: "11px", color: "#888" }}>ADHD Mom Collection</div></div>
          </div>
        ))}
      </div>
      <h3>Atlas Blueprints With Images</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {BLUEPRINTS.map(b => (
          <div key={b.id} style={{ border: "1px solid #eee", borderRadius: "12px", overflow: "hidden" }}>
            <img src={b.img} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <div style={{ padding: "14px" }}><strong>{b.name} - ${b.price}</strong><p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0" }}>{b.desc}</p></div>
          </div>
        ))}
      </div>
    </Page>
  )
}

function FactoryPage() { return <Page title="Factory - Visual Pipeline" subtitle="Idea to product in 24h with images"><img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200" style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "16px", marginBottom: "16px" }} /><div style={{ padding: "20px", background: "#0a0a0a", color: "white", borderRadius: "12px" }}><p>Blueprint → Tools → Stripe → Supabase → Rochester POD → Ship from 2 Eva Pl</p><p>Bundle $497 = ALL 6 + Factory + 1:1 + Lifetime</p></div></Page> }
function AdsPage() { return <Page title="Ads Pack $25 - Visual Templates" subtitle="50 templates including La Tambora with preview images"><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>{[1,2,3,4,5,6].map(i => <img key={i} src={`https://images.unsplash.com/photo-${i===1?"1611224923853-80b023f02d71":i===2?"1561070791-2526d30994b5":i===3?"1558655146-d09347e92766":i===4?"1460925895917-afdab827c52f":i===5?"1558655146-9f40138edfeb":"1558655146-364adaf1fcc9"}?w=400`} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }} />)}</div></Page> }

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blueprints" element={<BlueprintsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/factory" element={<FactoryPage />} />
        <Route path="/ads" element={<AdsPage />} />
      </Routes>
      <footer style={{ textAlign: "center", padding: "24px", color: "#888", borderTop: "2px solid #BC13FE20", background: "#fafafa" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
          {SOCIALS.map(s => <a key={s.name} href={s.url} target="_blank" style={{ background: "white", border: "1px solid #eee", padding: "8px 14px", borderRadius: "20px", textDecoration: "none", color: "#0a0a0a", fontWeight: 700, fontSize: "13px" }}>{s.icon} {s.name}</a>)}
        </div>
        <div>2026 Mimis Cozy Corner - Atlas OS - Paying rent one design at a time</div>
        <div style={{ fontSize: "12px", marginTop: "6px" }}>Rochester POD: Custom One Online + AlphaGraphics • Stripe + Supabase Connected</div>
      </footer>
    </BrowserRouter>
  )
}