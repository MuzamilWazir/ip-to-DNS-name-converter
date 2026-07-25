import { Router } from 'express';
import dns from 'dns';

const dnsRouter = Router();

dnsRouter.get('/', (req, res) => {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'Missing ip query parameter' });
  }

  const cleanIp = String(ip).split('/')[0];

  dns.reverse(cleanIp, (err, hostnames) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ ip: String(ip), hostnames });
  });
});

export default dnsRouter;
