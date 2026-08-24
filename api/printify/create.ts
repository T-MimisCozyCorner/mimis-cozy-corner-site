export default async function handler(req: any, res: any) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'POST only' });
  const STORE_ID = process.env.PRINTIFY_STORE_ID || '1';
  const TOKEN = process.env.PRINTIFY_API_TOKEN;
  const { title, imageUrl, blueprint_id, print_provider_id, variant_ids } = req.body;
  const bp = blueprint_id || 6; const pp = print_provider_id || 99; const vars = variant_ids || [40142,40143,40144];
  try{
    const up = await (await fetch('https://api.printify.com/v1/uploads/images.json',{method:'POST',headers:{'Authorization':`Bearer ${TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({file_name:title.replace(/[^a-z0-9]/gi,'-')+'.png',url:imageUrl})})).json();
    if(!up.id) return res.status(500).json({error:'Upload failed',details:up});
    const prod = await (await fetch(`https://api.printify.com/v1/shops/${STORE_ID}/products.json`,{method:'POST',headers:{'Authorization':`Bearer ${TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({title,description:`${title} - Mimi's Cozy Corner`,blueprint_id:bp,print_provider_id:pp,variants:vars.map((id:number)=>({id,price:2499,is_enabled:true})),print_areas:[{variant_ids:vars,placeholders:[{position:"front",images:[{id:up.id,x:0.5,y:0.5,scale:0.9,angle:0}]}]}]})})).json();
    const finalId = prod.id || prod.product?.id;
    if(!finalId) return res.status(500).json({error:'Create failed',details:prod});
    return res.status(200).json({success:true,product_id:finalId,product:prod});
  }catch(e:any){return res.status(500).json({error:e.message})}
}
