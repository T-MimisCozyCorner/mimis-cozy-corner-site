export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const STORE_ID = process.env.PRINTIFY_STORE_ID || '1';
  const TOKEN = process.env.PRINTIFY_API_TOKEN;
  if (!TOKEN) return res.status(500).json({ error: 'Missing PRINTIFY_API_TOKEN in Vercel env' });
  const { title, imageUrl } = req.body;
  try {
    // 1. Upload
    const upRes = await fetch('https://api.printify.com/v1/uploads/images.json', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_name: title.replace(/[^a-z0-9]/gi,'-')+'.png', url: imageUrl })
    });
    const upload = await upRes.json();
    console.log('upload', upload);
    if (!upload.id) return res.status(500).json({ error: 'Upload failed', details: upload });

    // 2. Create product - use simple blueprint
    const prodRes = await fetch(`https://api.printify.com/v1/shops/${STORE_ID}/products.json`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: `${title} - Mimi's Cozy Corner - Made to order!`,
        blueprint_id: 12, // Bella Canvas 3001 - more reliable
        print_provider_id: 1,
        variants: [{ id: 1, price: 2499, is_enabled: true }, { id: 2, price: 2499, is_enabled: true }, { id: 3, price: 2499, is_enabled: true }],
        print_areas: [{ variant_ids: [1,2,3], placeholders: [{ position: "front", images: [{ id: upload.id, x: 0.5, y: 0.5, scale: 0.9, angle: 0 }] }] }]
      })
    });
    const product = await prodRes.json();
    console.log('product', product);
    // Printify returns {id: ...} or error
    const finalId = product.id || product.product?.id || product._id;
    if (!finalId) return res.status(500).json({ error: 'Create failed', details: product, upload_id: upload.id });
    return res.status(200).json({ success: true, product_id: finalId, product });
  } catch (e:any) {
    return res.status(500).json({ error: e.message });
  }
}
