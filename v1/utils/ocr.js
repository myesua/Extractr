import { createWorker } from 'tesseract.js';

export async function OCR(image) {
  const worker = await createWorker({
    logger: (m) => {
      console.log(m);
    },
  });
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data } = await worker.recognize(image);
  await worker.terminate();
  return { data };
}
