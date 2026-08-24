import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  
  const STORE_ID = process.env.PRINTIFY_STORE_ID || '1';
  const TOKEN = process.env.PRINTIFY_API_TOKEN;
  if (!TOKEN) return res.status(500).json({ error: 'Missing PRINTIFY_API_TOKEN in Vercel env' });

  const { title, imageUrl } = req.body;
  if (!title || !imageUrl) return res.status(400).json({ error: 'Missing title or imageUrl' });

  try {
    // 1. Upload image to Printify
    const uploadRes = await fetch(`https://api.printify.com/v1/uploads/images.json`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_name: `${title}.png`, url: imageUrl })
    });
    const upload = await uploadRes.json();
    if (!upload.id) throw new Error('Image upload failed: ' + JSON.stringify(upload));

    // 2. Create T-shirt product (Gildan 64000)
    const productRes = await fetch(`https://api.printify.com/v1/shops/${STORE_ID}/products.json`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: `Custom ${title} - Designed for cozy mamas in Mimi's Cozy Corner. Made to order with love!`,
        blueprint_id: 6,
        print_provider_id: 99,
        variants: [
          { id: 40142, price: 2499, is_enabled: true },
          { id: 40143, price: 2499, is_enabled: true },
          { id: 40144, price: 2499, is_enabled: true },
        ],
        print_areas: [{
          variant_ids: [40142,40143,40144],
          placeholders: [{ position: "front", images: [{ id: upload.id, x: 0.5, y: 0.5, scale: 0.9, angle: 0 }] }]
        }]
      })
    });
    const product = await productRes.json();
    return res.status(200).json({ success: true, product_id: product.id, product });
  } catch (e:any) {
    return res.status(500).json({ error: e.message });
  }
}
