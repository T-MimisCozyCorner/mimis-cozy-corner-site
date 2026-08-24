export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const STORE_ID = process.env.PRINTIFY_STORE_ID || '1';
  const TOKEN = process.env.PRINTIFY_API_TOKEN;
  if (!TOKEN) return res.status(500).json({ error: 'Missing PRINTIFY_API_TOKEN' });
  const { title, imageUrl, blueprint_id, print_provider_id, variant_ids } = req.body;
  const BP = blueprint_id || 6;
  const PP = print_provider_id || 99;
  let VARS = variant_ids || [40142,40143,40144];
  try {
    const upRes = await fetch('https://api.printify.com/v1/uploads/images.json', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_name: title.replace(/[^a-z0-9]/gi,'-')+'.png', url: imageUrl })
    });
    const up: any = await upRes.json();
    if (!up.id) return res.status(500).json({ error: 'Upload failed', details: up });
    const body = {
      title: title.slice(0,80),
      description: `${title} - Mimi's Cozy Corner`,
      blueprint_id: BP,
      print_provider_id: PP,
      variants: VARS.map((id: number) => ({ id, price: 2499, is_enabled: true })),
      print_areas: [{ variant_ids: VARS, placeholders: [{ position: "front", images: [{ id: up.id, x: 0.5, y: 0.5, scale: 0.9, angle: 0 }] }] }]
    };
    const prodRes = await fetch(`https://api.printify.com/v1/shops/${STORE_ID}/products.json`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const prod: any = await prodRes.json();
    if (!prod.id) return res.status(500).json({ error: `Create failed: ${prod.message || JSON.stringify(prod).slice(0,500)}`, details: prod });
    return res.status(200).json({ success: true, product_id: prod.id, product: prod });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
