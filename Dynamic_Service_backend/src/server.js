import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import auth from './routes/auth.js';
import products from './routes/products.js';
import orders from './routes/orders.js';
import payments from './routes/payments.js';
import users from './routes/users.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configuredOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',').map(v => v.trim()).filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Allow browser apps from configured origins and non-browser tools such as Postman.
    if (!origin || configuredOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '2mb' }));

app.get('/', (_req, res) => res.json({
  service: 'Dynamic Service API',
  status: 'online',
  frontend: process.env.CLIENT_URL || 'http://localhost:5173'
}));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, database: 'connected', service: 'Dynamic Service API' });
  } catch (error) {
    res.status(503).json({ ok: false, database: 'disconnected', message: error.message });
  }
});

app.get('/api/config', (_req, res) => res.json({
  business: {
    name: 'Dynamic Service',
    mobileMoney: process.env.MOBILE_MONEY_NUMBER || '+250793881000',
    bankName: process.env.BANK_NAME || 'EquityBank',
    bankAccountName: process.env.BANK_ACCOUNT_NAME || 'Dynamic Service',
    bankAccountNumber: process.env.BANK_ACCOUNT_NUMBER || '',
    address: process.env.BUSINESS_ADDRESS || 'Kigali, Rwanda'
  }
}));

app.use('/media', express.static(path.join(__dirname, '../../../frontend/public/media')));
app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/payments', payments);
app.use('/api/users', users);

app.use((_req, res) => res.status(404).json({ message: 'API route not found.' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal server error.' });
});

async function start() {
  try {
    await pool.query('SELECT 1');
    app.listen(PORT, () => {
      console.log(`Dynamic Service API running on http://localhost:${PORT}`);
      console.log(`Frontend allowed: ${configuredOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('Unable to connect to PostgreSQL. Check backend/.env and PostgreSQL.');
    console.error(error.message);
    process.exit(1);
  }
}

start();
