import express from 'express';
import path from 'path';
import getDirName from '../utils/dir.js';
import { OCR } from '../utils/ocr.js';
import fileUpload from 'express-fileupload';
const app = express();

const { __dirname } = getDirName(import.meta);

app.disable('x-powered-by'); //Reduce fingerprinting
app.get('/favico.ico', (req, res) => {
  res.sendStatus(404);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.get('/', (req, res) => {
  try {
    res.sendFile('index.html', { root: 'public' });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(200);
});
app.post('/extract', async (req, res) => {
  try {
    if (req.files.file) {
      const { data } = await OCR(req.files.file.data);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        status: 'success',
        hocr: data.hocr,
        text: data.text,
      });
    } else {
      const { data } = await OCR(req.files.undefined.data);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        status: 'success',
        hocr: data.hocr,
        text: data.text,
        message,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
export default app;
