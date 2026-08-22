import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

const BLUEPRINTS = [
  { id: "saas", name: "SaaS Starter", desc: "Complete SaaS boilerplate - Auth, Stripe, DB, Dashboard ready to ship. Includes login, billing, database, dashboard.", price: 97, badge: "Most Popular", includes: "Auth + Stripe + DB + Dashboard" },
  { id: "ecom", name: "Ecom Kit", desc: "Shopify-ready storefront with admin panel, payments, inventory, orders. Clone and launch.", price: 67, badge: "", includes: "Storefront + Admin + Payments" },
  { id: "atlas", name: "Atlas Core", desc: "Atlas Core - Your AI workforce with 100 prompts and 5 agents. Run on autopilot.", price: 147, badge: "AI Agent OS", includes: "100 prompts + 5 agents + OS" },
  { id: "ads", name: "Creative Ads Pack", desc: "50+ Canva ad templates including La Tambora - Fully editable.", price: 25, badge: "La Tambora Inside", includes: "50 templates + Canva link" },
  { id: "tools", name: "Digital Tools Stack", desc: "10 Landing pages, 3 funnels, lead magnets, email system.", price: 47, badge: "", includes: "10 pages + 3 funnels + Leads" },
  { id: "factory", name: "Product Factory", desc: "Idea to product in 24h - Complete build and scale system.", price: 197, badge: "New", includes: "24h Build System + Scale" },
  { id: "bundle", name: "Atlas OS Bundle", desc: "ALL 6 blueprints + factory access + 1:1 support + lifetime updates - Best Value", price: 497, badge: "Best Value - Save 261", includes: "ALL 6 + Factory + 1:1 + Lifetime" },
]

const TOOLS = [
  { name: "Product Generator", color: "#FF6B6B", desc: "Generate product ideas - AI creates your next product", status: "Live" },
  { name: "Ad Creator", color: "#4ECDC4", desc: "Create ads in seconds - 50+ templates including La Tambora", status: "Live" },
  { name: "Blueprint Builder", color: "#45B7D1", desc: "Build custom blueprints - Mix and match SaaS, Ecom, Atlas", status: "Live" },
  { name: "Supabase Connector", color: "#96CEB4", desc: "Connect your database - No more ID in footer", status: "Live" },
  { name: "Stripe Checkout", color: "#FFEAA7", desc: "Payments integration - Tees and bundles in one checkout", status: "Live" },
  { name: "Factory Pipeline", color: "#DDA0DD", desc: "Automate production - Rochester POD to Custom One", status: "Live" },
]

function Header() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "1px solid #eee", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" style={{ fontWeight: 800, fontSize: "20px", textDecoration: "none", color: "#0a0a0a" }}>Mimis Cozy Corner - Atlas OS</Link>
      <nav style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Link to="/blueprints" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 600 }}>Blueprints (7)</Link>
        <Link to="/tools" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 600 }}>Tools (6)</Link>
        <Link to="/products" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 600 }}>Products</Link>
        <Link to="/factory" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 600 }}>Factory</Link>
        <Link to="/ads" style={{ color: "#0a0a0a", textDecoration: "none", fontWeight: 600 }}>Ads $25</Link>
      </nav>
    </header>
  )
}

function Page({ title, subtitle, children }: any) {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <div style={{ padding: "60px 24px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ color: "#BC13FE", fontSize: "42px", fontWeight: 800, margin: "0 0 12px", display: "block", opacity: 1, textShadow: "0 0 10px #BC13FE" }}>{title}</h1>
        {subtitle && <p style={{ color: "#666", fontSize: "18px", margin: 0, lineHeight: "1.5" }}>{subtitle}</p>}
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 24px 80px" }}>{children}</div>
    </div>
  )
}

function Home() {
  const nav = useNavigate()
  return (
    <Page title="284 Designs plus 7 Blueprints for Overthinkers" subtitle="Mimis Cozy Corner plus Atlas OS - Paying rent one design at a time">
      <div style={{ display: "grid", gap: "24px" }}>
        <div style={{ background: "#0a0a0a", color: "white", padding: "32px", borderRadius: "20px", border: "2px solid #BC13FE", boxShadow: "0 0 20px #BC13FE50" }}>
          <h2 style={{ color: "#BC13FE", margin: "0 0 12px" }}>BUDGET BUSTER - RENT WEEK MATH</h2>
          <p>Your brain has 47 tabs open and your cart has 1 shirt. Lets fix one.</p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
            <div style={{ background: "#BC13FE", padding: "8px 16px", borderRadius: "20px", fontWeight: 700 }}>3 Tees for 55</div>
            <div style={{ background: "white", color: "#0a0a0a", padding: "8px 16px", borderRadius: "20px", fontWeight: 700 }}>5 Tees for 89</div>
            <div style={{ background: "#00FFF7", color: "#0a0a0a", padding: "8px 16px", borderRadius: "20px", fontWeight: 700 }}>Bundle 497</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => nav("/blueprints")} style={{ background: "#BC13FE", color: "white", padding: "14px 24px", borderRadius: "12px", border: "none", fontWeight: 800, cursor: "pointer" }}>View 7 Blueprints</button>
          <button onClick={() => nav("/products")} style={{ background: "white", color: "#0a0a0a", padding: "14px 24px", borderRadius: "12px", border: "2px solid #0a0a0a", fontWeight: 800, cursor: "pointer" }}>Shop 284 Tees</button>
        </div>
      </div>
    </Page>
  )
}

function BlueprintsPage() {
  const nav = useNavigate()
  return (
    <Page title="Business Blueprints - 7 Live" subtitle="Full descriptions, prices visible, Launch goes to Factory">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {BLUEPRINTS.map(b => (
          <div key={b.id} style={{ border: b.id==="bundle"?"3px solid #BC13FE":"2px solid #eee", borderRadius: "16px", padding: "24px", background: b.id==="bundle"?"#FFF8FF":"white" }}>
            {b.badge && <div style={{ background: b.id==="bundle"?"#BC13FE":"#0a0a0a", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-block", marginBottom: "10px" }}>{b.badge}</div>}
            <h3 style={{ margin: "0 0 8px", color: "#0a0a0a", fontSize: "20px" }}>{b.name}</h3>
            <p style={{ color: "#555", fontSize: "14px", lineHeight: "1.5", minHeight: "60px" }}>{b.desc}</p>
            <div style={{ background: "#f5f5f5", padding: "8px 12px", borderRadius: "8px", fontSize: "12px", margin: "10px 0", fontWeight: 600 }}>{b.includes}</div>
            <div style={{ fontSize: "28px", fontWeight: 800, margin: "12px 0" }}>${b.price}</div>
            <button onClick={() => nav("/factory")} style={{ width: "100%", background: b.id==="bundle"?"#BC13FE":"#0a0a0a", color: "white", border: "none", padding: "12px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>Launch Factory</button>
          </div>
        ))}
      </div>
    </Page>
  )
}

function ToolsPage() {
  return (
    <Page title="Tools - 6 Real Tools" subtitle="Product Generator, Ad Creator, Blueprint Builder, Supabase, Stripe, Factory">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
        {TOOLS.map(t => (
          <div key={t.name} style={{ borderLeft: "6px solid "+t.color, border: "2px solid #eee", borderRadius: "12px", padding: "20px", background: "white" }}>
            <h3 style={{ margin: "0 0 8px", color: "#0a0a0a" }}>{t.name}</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>{t.desc}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}

function ProductsPage() {
  return (
    <Page title="Products - Mimis 284 plus Atlas 7" subtitle="All blueprints plus Rochester POD - Custom One Online">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {BLUEPRINTS.map(b => (
          <div key={b.id} style={{ border: "2px solid #eee", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ color: "#0a0a0a" }}>{b.name} - ${b.price}</h3>
            <p style={{ color: "#555", fontSize: "14px" }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}

function FactoryPage() { return <Page title="Factory - Idea to Product in 24h" subtitle="Product Factory 197 plus Atlas OS Bundle includes factory access"><div style={{ padding: "24px", background: "#0a0a0a", color: "white", borderRadius: "16px" }}><h3 style={{ color: "#BC13FE" }}>Factory Pipeline Active</h3><p>Blueprint to Tools to Stripe to Supabase to Rochester POD to Ship</p></div></Page> }
function AdsPage() { return <Page title="Ads Pack 25 - 50 Templates" subtitle="Includes La Tambora plus 49 more"><p>La Tambora sample inside.</p></Page> }

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
      <footer style={{ textAlign: "center", padding: "20px", color: "#888", borderTop: "1px solid #eee" }}>2026 Mimis Cozy Corner - Atlas OS</footer>
    </BrowserRouter>
  )
}