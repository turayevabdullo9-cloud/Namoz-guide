import React, { useState, useRef, useEffect } from 'react';
import { FIQH_KNOWLEDGE_BASE } from '../data/fiqhKnowledgeBase';
import { PRAYERS_DATA } from '../data/prayersData';
import {
  HelpCircle,
  Send,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Bot,
  User,
  RotateCcw,
  Loader2,
  ExternalLink,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  isAi?: boolean;
}

export const AskAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Assalomu alaykum va rahmatullohi va barakotuh!\n\nMen «Namoz Guide» ilmiy-ma'rifiy platformasining Islomiy Maslahatchisisiz. Sizga Imomi A'zam Abu Hanifa rahmatullohi alayh mazhabi va sahih hadislar asosida namoz, tahorat, g'usl, duolar hamda kundalik ibodatlar bo‘yicha to‘g‘ri ma'lumot berishga tayyorman.\n\nQanday savolingiz bor?",
      source: "O‘zbekiston Musulmonlari Idorasi va mo‘tabar Hanafiy fiqh manbalari",
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickQuestions = [
    'Namozda adashsam nima qilaman (sajdai sahv)?',
    'Jamoatga kechikib kelsam nima qilaman?',
    'Tahoratim buzildimi-yo‘qmi, qanday bilaman?',
    'Bomdod namozi vaqti qachongacha davom etadi?',
    'Taroveh namozini uyda o‘qisa bo‘ladimi?',
    'Safarda namozni qisqartirish (qasr) qoidalari?',
    'Asr vaqtida Hanafiy mazhabining o‘ziga xosligi nima?',
  ];

  const handleAsk = async (queryText: string) => {
    const q = queryText.trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    // Call server-side full-stack Gemini API endpoint
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          const assistantMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: data.reply,
            source: 'Hanafiy mazhabi va sahih hadislar asosida (AI Maslahatchi)',
            isAi: true,
          };
          setMessages((prev) => [...prev, assistantMsg]);
          setIsLoading(false);
          return;
        }
      }
      throw new Error('Server javob bermadi');
    } catch (err) {
      console.warn('API error, falling back to local KB:', err);

      // Local Fallback from Fiqh Knowledge Base
      const lowerQ = q.toLowerCase();
      const foundFiqh = FIQH_KNOWLEDGE_BASE.find(
        (f) =>
          lowerQ.includes(f.titleUz.toLowerCase()) ||
          f.titleUz.toLowerCase().includes(lowerQ) ||
          (lowerQ.includes('adash') && f.id === 'f-sajdai-sahv-holatlari') ||
          (lowerQ.includes('kech') && f.id === 'f-masbuq-jamoat') ||
          (lowerQ.includes('shubha') && f.id === 'f-shubha-tahorat') ||
          (lowerQ.includes('buz') && f.id === 'f-mubtilat-namoz') ||
          (lowerQ.includes('taroveh') && f.id === 'f-taroveh-uyda') ||
          (lowerQ.includes('juma') && f.id === 'f-juma-kech-qolish')
      );

      const foundPrayer = PRAYERS_DATA.find(
        (p) =>
          lowerQ.includes(p.name.toLowerCase()) ||
          (lowerQ.includes('safar') && p.id === 'musofir') ||
          (lowerQ.includes('qasr') && p.id === 'musofir') ||
          (lowerQ.includes('bemor') && p.id === 'bemor')
      );

      let replyText = '';
      let replySource = '';

      if (foundFiqh) {
        replyText = `${foundFiqh.summaryUz}\n\n${foundFiqh.hanafiRuling}`;
        replySource = `${foundFiqh.source.book}, muallif: ${foundFiqh.source.author}`;
      } else if (foundPrayer) {
        replyText = `${foundPrayer.name}: ${foundPrayer.rakatsSummary}.\n\nQoidalar:\n${foundPrayer.rulesHanafi.join('\n• ')}`;
        replySource = `${foundPrayer.sources[0]?.book}, ${foundPrayer.sources[0]?.author}`;
      } else {
        replyText =
          "Bu savol bo‘yicha aniq ma'lumot olish uchun O‘zbekiston Musulmonlari Idorasi Fatvo hay'atiga yoki mahalliy ishonchli imom-domlaga murojaat qilishingiz tavsiya etiladi. Dinimizda har bir kishining holati va sharoiti alohida e'tiborga olinadi.";
        replySource = "Shar'iy maslahat odobi";
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        source: replySource,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Bot className="w-4 h-4" />
          <span>Realtime AI Islomiy Maslahatchi • Hanafiy Mazhabi</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Islomiy Ta'limiy AI Maslahatchi
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Namoz, tahorat, sahih hadislar va fiqh qoidalari bo‘yicha savollaringizga tekshirilgan manbalar bilan sun'iy intellekt orqali javob oling.
        </p>
      </div>

      {/* Strict disclaimer card */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Shar'iy ogohlantirish:</strong> Ushbu sun'iy intellekt maslahatchisi fatvo berish huquqiga ega emas. U faqatgina mo‘tabar manbalar (Qur'on, Sahihul Buxoriy, Muslim, Termiziy, Marg‘inoniyning «Al-Hidoya», «Muxtasarul Viqoya») asosida tushuntirish beradi. Shaxsiy, taloq, meros yoki ixtilofli masalalarda O‘zbekiston Musulmonlari Idorasi Fatvo hay'atiga murojaat qiling.
        </p>
      </div>

      {/* Quick Questions */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
          Tezkor savollar:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl text-xs bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 border border-stone-200/80 dark:border-stone-700/60 transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="space-y-4 min-h-[380px] max-h-[550px] overflow-y-auto p-4 sm:p-5 rounded-3xl bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-bl-none border border-stone-200/80 dark:border-stone-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-stone-100 dark:border-stone-800 text-[11px] font-semibold text-stone-400">
                {msg.sender === 'user' ? (
                  <>
                    <User className="w-3.5 h-3.5 text-emerald-200" />
                    <span className="text-emerald-100">Siz</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 dark:text-emerald-400">
                      Islomiy Maslahatchi
                    </span>
                  </>
                )}
              </div>

              <div className="whitespace-pre-line leading-relaxed font-normal">{msg.text}</div>

              {msg.source && (
                <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  <strong>Manba:</strong> {msg.source}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-white dark:bg-stone-900 rounded-2xl rounded-bl-none p-4 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-2 text-xs text-stone-500">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Hanafiy fiqhi va sahih manbalar asosida javob shakllanmoqda...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Query Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(inputQuery);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Namoz, tahorat yoki hadislar bo‘yicha savolingizni yozing..."
          disabled={isLoading}
          className="flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:border-emerald-500 transition-colors shadow-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors shrink-0 shadow-sm"
          title="Yuborish"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
