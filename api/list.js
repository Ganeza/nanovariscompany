import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { blobs } = await list({ prefix: 'agreements/' });
    const urls = blobs.map((b) => b.url);
    res.status(200).json({ urls });
  } catch (err) {
    res.status(500).json({ error: 'List failed', details: String(err) });
  }
}
