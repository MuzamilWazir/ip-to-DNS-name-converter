import express from 'express';
import dnsRouter from './routes/dns.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/dns', dnsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
