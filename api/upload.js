import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    const filename = req.headers['x-filename'] || `agreement-${Date.now()}.png`;
    const contentType = req.headers['content-type'] || 'application/octet-stream';

    const { url } = await put(`agreements/${filename}`, buffer, {
      access: 'public',
      contentType,
    });

    res.status(200).json({ url });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: String(err) });
  }
}
