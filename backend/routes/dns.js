import router from 'express';

const dnsRouter = router();

dnsRouter.get('/', (req, res) => {
  res.send('DNS endpoint');
});

export default dnsRouter;