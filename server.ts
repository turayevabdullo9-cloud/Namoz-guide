import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Islamic Advisor API endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Xabar matni kiritilmagan' });
      return;
    }

    const systemInstruction = `Siz «Namoz Guide» ilmiy-ma'rifiy platformasining Islomiy Maslahatchisisiz.
Vazifangiz: Foydalanuvchilarga namoz, tahorat, g'usl, ro'za, duolar, sunnat amallar va sahih hadislar bo'yicha Hanafiy mazhabi asosida o'zbek tilida sodda, tushunarli, muloyim va aniq ma'lumot berish.

QAT'IY QOIDALAR:
1. Mazhab: Asosiy e'tibor Imomi A'zam Abu Hanifa rahmatullohi alayh mazhabiga qaratiladi.
2. Sahihlik: Faqat ishonchli manbalarga (Qur'oni Karim, Sahihul Buxoriy, Sahih Muslim, Sunani Termiziy, Marg'inoniyning «Al-Hidoya», «Muxtasarul Viqoya», Ibn Obidinning «Raddu-l-Muhtor») tayaning.
3. Fatvo da'vo qilmang: Siz fatvo bermaysiz, faqat mo'tabar kitoblardagi ma'lumotlarni tushuntirasiz.
4. Javob tuzilishi:
   - Muloyim salom/kirish;
   - Masalaning Hanafiy mazhabi bo'yicha aniq hukmi (Farz, Vojib, Sunnat, Mustahab, Makruh yoki Mubtil);
   - Amaliy maslahat;
   - Mo'tabar manba (Kitob nomi yoki hadis roviysi);
   - Agar masala shaxsiy oilaviy (taloq, meros, qasam) yoki nozik bo'lsa, O'zbekiston Musulmonlari Idorasi Fatvo hay'atiga yoki mahalliy malakali imomga murojaat qilishni eslatish.
5. Soxta hadis, to'qima raqamlar yoki asossiz rivoyatlarni aslo keltirmang.`;

    // Construct conversation contents
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'assistant') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents.length === 1 ? message : contents,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const replyText = response.text || "Kechirasiz, javob olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: "Sun'iy intellekt xizmati bilan bog'lanishda xatolik yuz berdi",
      details: error?.message || 'Noma\'lum xatolik',
    });
  }
});

// Cache for Aladhan Prayer Times (1 hour TTL)
const prayerTimesCache = new Map<string, { data: any; timestamp: number }>();
const PRAYER_CACHE_TTL = 60 * 60 * 1000;

// External Aladhan API Proxy for Uzbekistan Realtime Timings
app.get('/api/prayer-times', async (req: Request, res: Response) => {
  try {
    const lat = req.query.latitude ? parseFloat(req.query.latitude as string) : 41.2995;
    const lng = req.query.longitude ? parseFloat(req.query.longitude as string) : 69.2401;
    const school = req.query.school !== undefined ? req.query.school : 1; // 1 = Hanafi, 0 = Shafi
    const method = req.query.method || 3; // 3 = Muslim World League
    const date = req.query.date as string | undefined;

    const roundedLat = lat.toFixed(2);
    const roundedLng = lng.toFixed(2);
    const cacheKey = `${roundedLat}_${roundedLng}_${school}_${method}_${date || 'today'}`;

    const cached = prayerTimesCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < PRAYER_CACHE_TTL) {
      res.json(cached.data);
      return;
    }

    const url = date
      ? `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=${method}&school=${school}`
      : `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}&school=${school}`;

    const apiRes = await fetch(url, {
      headers: {
        'User-Agent': 'NamozGuideUz/1.0',
        'Accept': 'application/json',
      },
    });

    if (!apiRes.ok) {
      throw new Error(`Aladhan API returned ${apiRes.status}`);
    }

    const data: any = await apiRes.json();
    if (data && data.code === 200 && data.data) {
      prayerTimesCache.set(cacheKey, { data, timestamp: Date.now() });
      res.json(data);
      return;
    }

    throw new Error('Aladhan API invalid structure');
  } catch (error: any) {
    console.error('Aladhan API proxy error:', error?.message);
    res.status(502).json({
      error: 'Tashqi namoz vaqtlari xizmati bilan bog‘lanib bo‘lmadi',
      details: error?.message,
    });
  }
});

// Setup Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Namoz Guide server running at http://localhost:${PORT}`);
  });
}

startServer();
