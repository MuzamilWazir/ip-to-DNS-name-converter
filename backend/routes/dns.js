import { Router } from 'express';
import dns from 'dns';

const dnsRouter = Router();

dnsRouter.get('/:ip', (req, res) => {
  const { ip } = req.params;

  dns.reverse(ip, (err, hostnames) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ ip, hostnames });
  });
});

export default dnsRouter;
