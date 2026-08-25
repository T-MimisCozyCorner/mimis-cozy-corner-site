export default async function handler(req: any, res: any) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'POST only' });
  const STORE_ID = process.env.PRINTIFY_STORE_ID || '1';
  const TOKEN = process.env.PRINTIFY_API_TOKEN;
  if (!TOKEN) return res.status(500).json({ error: 'Missing PRINTIFY_API_TOKEN in Vercel!' });
  const { title, imageUrl, blueprint_id, print_provider_id, variant_ids } = req.body;
  let BP = blueprint_id || 6;
  let PP = print_provider_id || 99;
  let VARS = variant_ids || [40142];
  let PRICE = 2499;
  if (BP === 5) { VARS = [40049,40050,40051]; PRICE = 3999; }
  if (BP === 635 || BP === 86) { BP = 86; VARS = [47745]; PRICE = 1499; }
  if (BP === 12) { VARS = [41021]; PRICE = 1999; }
  if (BP === 6) { VARS = variant_ids || [40142,40143,40144]; PRICE = 2499; }
  try {
    const cleanUrl = imageUrl.replace(/ /g, '%20');
    const upRes = await fetch('https://api.printify.com/v1/uploads/images.json', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_name: (title||'design').replace(/[^a-z0-9]/gi,'-').slice(0,40)+'.png', url: cleanUrl })
    });
    const up: any = await upRes.json();
    if (!up.id) return res.status(500).json({ error: `Upload failed: ${JSON.stringify(up).slice(0,800)}`, details: up });
    const body = {
      title: title.slice(0,80),
      description: title,
      blueprint_id: BP,
      print_provider_id: PP,
      variants: VARS.map((id: number) => ({ id, price: PRICE, is_enabled: true })),
      print_areas: [{ variant_ids: VARS, placeholders: [{ position: "front", images: [{ id: up.id, x: 0.5, y: 0.5, scale: 0.9, angle: 0 }] }] }]
    };
    const prodRes = await fetch(`https://api.printify.com/v1/shops/${STORE_ID}/products.json`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const txt = await prodRes.text();
    let prod: any; try { prod = JSON.parse(txt); } catch { prod = { raw: txt }; }
    if (!prodRes.ok ||!prod.id) return res.status(500).json({ error: `Create failed: ${JSON.stringify(prod).slice(0,1000)}`, details: prod, status: prodRes.status });
    return res.status(200).json({ success: true, product_id: prod.id });
  } catch (e: any) { return res.status(500).json({ error: e.message }); }
}
