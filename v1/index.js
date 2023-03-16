import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { hostname, port } from './config/index.js';
import App from './routes/index.js';

// === 1 - CREATE SERVER ===
const server = express();
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors());
server.disable('x-powered-by'); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json());

// === 3 - CONFIGURE ROUTES ===
// Configure Route
server.use(App);

// === 4 - START UP SERVER ===
server.listen(port, () =>
  console.log(`Server running on http://${hostname}:${port}`),
);
