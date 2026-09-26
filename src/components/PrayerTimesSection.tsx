import React, { useState, useEffect, useRef } from 'react';
import {
  UZBEKISTAN_CITIES,
  CityLocation,
  calculatePrayerTimes,
  processPrayerSchedule,
  fetchAladhanPrayerTimes,
  findClosestUzbekistanCity,
  AladhanTimings,
  PrayerTimesResult,
} from '../utils/prayerTimes';
import {
  Clock,
  MapPin,
  Calendar,
  Info,
  Sparkles,
  Moon,
  Sun,
  Bot,
  X,
  RefreshCw,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface PrayerTimesSectionProps {
  selectedCity: CityLocation;
  onSelectCity: (city: CityLocation) => void;
  isHanafiAsr: boolean;
  onToggleHanafiAsr: () => void;
  onOpenAssistantWithPrompt?: (prompt: string) => void;
}

export const PrayerTimesSection: React.FC<PrayerTimesSectionProps> = ({
  selectedCity,
  onSelectCity,
  isHanafiAsr,
  onToggleHanafiAsr,
  onOpenAssistantWithPrompt,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [aiAdviceModalOpen, setAiAdviceModalOpen] = useState<boolean>(false);
  const [aiAdviceText, setAiAdviceText] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Aladhan API state
  const [aladhanTimings, setAladhanTimings] = useState<AladhanTimings | null>(null);
  const [hijriDateStr, setHijriDateStr] = useState<string | null>(null);
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string | null>(null);

  // Geolocation state
  const [isGeoDetecting, setIsGeoDetecting] = useState<boolean>(false);
  const [geoNotice, setGeoNotice] = useState<string | null>(null);

  // Live real-time clock: tick every 1000ms
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch from Aladhan API whenever selectedCity or isHanafiAsr changes
  const loadApiTimings = async (cityToFetch: CityLocation = selectedCity, hanafi: boolean = isHanafiAsr) => {
    setIsApiLoading(true);
    setApiError(null);

    try {
      const data = await fetchAladhanPrayerTimes(
        cityToFetch.latitude,
        cityToFetch.longitude,
        hanafi
      );
      setAladhanTimings(data.timings);
      if (data.hijriDateStr) {
        setHijriDateStr(data.hijriDateStr);
      }
      const nowStr = new Date().toLocaleTimeString('uz-UZ', { hour12: false });
      setLastUpdatedTime(nowStr);
    } catch (err: any) {
      console.warn('Aladhan API fetch warning:', err);
      setApiError("Tashqi API sekin javob bermoqda, avtomatik astronomik hisob-kitobga ulandi.");
    } finally {
      setIsApiLoading(false);
    }
  };

  useEffect(() => {
    loadApiTimings(selectedCity, isHanafiAsr);
  }, [selectedCity.latitude, selectedCity.longitude, isHanafiAsr]);

  // Periodic auto-update: refresh from Aladhan API every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadApiTimings(selectedCity, isHanafiAsr);
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedCity, isHanafiAsr]);

  // Automatic User Location Detection (Geolocation)
  const detectUserLocation = () => {
    if (!('geolocation' in navigator)) {
      setGeoNotice("Brauzeringizda joylashuvni aniqlash (Geolocation) funksiyasi mavjud emas.");
      return;
    }

    setIsGeoDetecting(true);
    setGeoNotice(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const closest = findClosestUzbekistanCity(latitude, longitude);

        const detectedCity: CityLocation = {
          nameUz: `${closest.city.nameUz} (GPS aniqlangan)`,
          nameEn: closest.city.nameEn,
          regionUz: closest.city.regionUz,
          latitude: Number(latitude.toFixed(4)),
          longitude: Number(longitude.toFixed(4)),
          timezone: 5,
          isDetectedGps: true,
        };

        onSelectCity(detectedCity);
        setIsGeoDetecting(false);
        setGeoNotice(
          `Joylashuvingiz muvaffaqiyatli aniqlandi: ${closest.city.nameUz} yaqinida (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`
        );
        setTimeout(() => setGeoNotice(null), 5000);
      },
      (error) => {
        setIsGeoDetecting(false);
        let msg = "Joylashuvni aniqlashga ruxsat berilmadi yoki xatolik yuz berdi.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Brauzerda joylashuvga kirish rad etildi. Ro'yxatdan shahringizni tanlashingiz mumkin.";
        } else if (error.code === error.TIMEOUT) {
          msg = "Joylashuvni aniqlash vaqti tugadi.";
        }
        setGeoNotice(msg);
        setTimeout(() => setGeoNotice(null), 6000);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  // Compute live prayer times: Use Aladhan if loaded, otherwise fallback to local math formula
  const times: PrayerTimesResult = aladhanTimings
    ? processPrayerSchedule(
        {
          fajr: aladhanTimings.Fajr,
          sunrise: aladhanTimings.Sunrise,
          dhuhr: aladhanTimings.Dhuhr,
          asr: aladhanTimings.Asr,
          maghrib: aladhanTimings.Maghrib,
          isha: aladhanTimings.Isha,
          tahajjud: aladhanTimings.Lastthird,
        },
        currentDate,
        'aladhan',
        hijriDateStr || undefined
      )
    : calculatePrayerTimes(
        currentDate,
        selectedCity.latitude,
        selectedCity.longitude,
        selectedCity.timezone,
        isHanafiAsr
      );

  const prayers = [
    {
      id: 'fajr',
      nameUz: 'Bomdod (Tong)',
      timeStr: times.fajr,
      desc: 'Subhi sodiqdan to quyosh chiqqunga qadar',
      icon: Moon,
    },
    {
      id: 'sunrise',
      nameUz: 'Quyosh chiqishi',
      timeStr: times.sunrise,
      desc: 'Quyosh ko‘tarilgunga qadar (15-20 daqiqa) namoz makruh',
      icon: Sun,
      isMakruh: true,
    },
    {
      id: 'dhuhr',
      nameUz: 'Peshin (Zuhur)',
      timeStr: times.dhuhr,
      desc: 'Quyosh tikkadan og‘gan paytdan Asrgacha',
      icon: Sun,
    },
    {
      id: 'asr',
      nameUz: 'Asr',
      timeStr: times.asr,
      desc: isHanafiAsr
        ? 'Hanafiy mezoni (soya buyumdan 2 barobar uzayganda)'
        : 'Jumhur mezoni (soya 1 barobar)',
      icon: Sun,
    },
    {
      id: 'maghrib',
      nameUz: 'Shom (Mag‘rib)',
      timeStr: times.maghrib,
      desc: 'Quyosh to‘liq botgan paytdan qorong‘ulikkacha',
      icon: Moon,
    },
    {
      id: 'isha',
      nameUz: 'Xufton (Isho)',
      timeStr: times.isha,
      desc: 'Shafaq botgach, subhi sodiqqa qadar',
      icon: Moon,
    },
  ];

  // Request AI prayer advice
  const requestPrayerAdvice = async (prayerName: string) => {
    setAiAdviceModalOpen(true);
    setIsAiLoading(true);
    setAiAdviceText('');

    const prompt = `${selectedCity.nameUz} shahrida hozirgi ${prayerName} vaqti bo‘yicha Hanafiy mazhabida mustahab vaqt, o‘qiladigan sunnatlar va duo haqida mo‘tabar manbalar asosida qisqa amaliy tavsiya bering.`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();
      if (data.reply) {
        setAiAdviceText(data.reply);
      } else {
        setAiAdviceText("Kechirasiz, maslahatchi bilan bog‘lanishda xatolik yuz berdi.");
      }
    } catch {
      setAiAdviceText(
        "Hanafiy fiqhiga ko‘ra, namozni o‘z vaqtida, jamoat bilan va xushu bilan ado etish eng afzal amaldir."
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const formattedCurrentTime = currentDate.toLocaleTimeString('uz-UZ', {
    hour12: false,
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-16">
      {/* Header with Live indicator */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>Realtime Jonli Vaqt • O‘zbekiston</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Namoz Vaqtlari (Realtime API)
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
            Tashqi Aladhan API va O‘zbekiston koordinatalari bo‘yicha avtomatik joylashuv va soniyalar hisobi bilan yangilanadi.
          </p>
        </div>

        {/* Current Time Display */}
        <div className="text-left sm:text-right bg-stone-100 dark:bg-stone-800/80 px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 shrink-0">
          <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
            Hozirgi vaqt:
          </span>
          <span className="text-2xl font-mono font-extrabold text-stone-900 dark:text-stone-100 tabular-nums">
            {formattedCurrentTime}
          </span>
        </div>
      </div>

      {/* Geolocation Feedback Message if any */}
      {geoNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{geoNotice}</span>
        </div>
      )}

      {/* City & Automatic Location Controls */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* City Selection */}
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                Hudud / Joylashuv:
              </span>
              <select
                value={selectedCity.nameUz}
                onChange={(e) => {
                  const found = UZBEKISTAN_CITIES.find(
                    (c) => c.nameUz === e.target.value
                  );
                  if (found) onSelectCity(found);
                }}
                className="text-xs sm:text-sm font-bold bg-transparent text-stone-900 dark:text-stone-100 outline-none cursor-pointer w-full"
              >
                {selectedCity.isDetectedGps && (
                  <option value={selectedCity.nameUz} className="bg-white dark:bg-stone-900 font-bold">
                    📍 {selectedCity.nameUz}
                  </option>
                )}
                {UZBEKISTAN_CITIES.map((c) => (
                  <option key={c.nameUz} value={c.nameUz} className="bg-white dark:bg-stone-900">
                    {c.nameUz} ({c.regionUz})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action buttons: Auto Geolocation & Refresh */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={detectUserLocation}
              disabled={isGeoDetecting}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
              title="GPS orqali joylashuvingizni avtomatik aniqlash"
            >
              <Navigation className={`w-3.5 h-3.5 ${isGeoDetecting ? 'animate-spin' : ''}`} />
              <span>{isGeoDetecting ? 'Aniqlanmoqda...' : 'Avtomatik joylashuv (GPS)'}</span>
            </button>

            <button
              onClick={() => loadApiTimings(selectedCity, isHanafiAsr)}
              disabled={isApiLoading}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Namoz vaqtlarini yangilash"
            >
              <RefreshCw className={`w-4 h-4 ${isApiLoading ? 'animate-spin text-emerald-600' : ''}`} />
            </button>

            <button
              onClick={onToggleHanafiAsr}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isHanafiAsr
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              {isHanafiAsr ? 'Hanafiy Asr (Soya x2)' : 'Jumhur Asr (Soya x1)'}
            </button>
          </div>
        </div>

        {/* Status Bar: External API indicator & Hijri Date */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {times.source === 'aladhan' ? 'Aladhan API (Jonli)' : 'Mahalliy hisob-kitob'}
            </span>

            {lastUpdatedTime && (
              <span>Oxirgi sinxronizatsiya: {lastUpdatedTime}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hijriDateStr && (
              <span className="font-medium text-stone-700 dark:text-stone-300">
                🌙 {hijriDateStr}
              </span>
            )}
            <span className="text-stone-400">·</span>
            <span>Avtomatik yangilanish: har 30 daqiqada</span>
          </div>
        </div>
      </div>

      {/* Real-time Countdown Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 text-white border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span>{times.currentPrayer.statusText}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {times.nextPrayer.nameUz} Namozi
            </h3>

            <p className="text-xs sm:text-sm text-stone-300">
              Kirishiga qolgan vaqt:{' '}
              <strong className="text-emerald-400 font-bold">
                {times.nextPrayer.remainingFormatted}
              </strong>
            </p>
          </div>

          <div className="text-left md:text-right bg-stone-950/60 p-4 sm:p-5 rounded-2xl border border-stone-800 backdrop-blur-sm">
            <span className="text-[11px] text-stone-400 block mb-1 uppercase tracking-wider">
              {times.nextPrayer.nameUz} kirish vaqti:
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-black text-emerald-400 tabular-nums">
              {times.nextPrayer.timeStr}
            </div>
            <span className="text-[10px] text-stone-400 mt-1 block">
              {selectedCity.nameUz} bo‘yicha
            </span>
          </div>
        </div>
      </div>

      {/* Daily Times Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {prayers.map((p) => {
          const isNext = times.nextPrayer.nameUz.toLowerCase().includes(p.nameUz.toLowerCase().split(' ')[0]);
          const isCurrent = times.currentPrayer.nameUz.toLowerCase().includes(p.nameUz.toLowerCase().split(' ')[0]);
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              className={`rounded-2xl p-5 border transition-all ${
                isNext
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : isCurrent
                  ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-400 dark:border-amber-700'
                  : 'bg-white dark:bg-stone-900 border-stone-200/90 dark:border-stone-800'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isNext
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        isNext
                          ? 'text-emerald-950 dark:text-emerald-200'
                          : 'text-stone-900 dark:text-stone-50'
                      }`}
                    >
                      {p.nameUz}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 block">
                        ● Hozirgi vaqt
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-2xl font-black font-mono tabular-nums text-stone-900 dark:text-stone-50">
                  {p.timeStr}
                </span>
              </div>

              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
                {p.desc}
              </p>

              <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => requestPrayerAdvice(p.nameUz)}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <Bot className="w-3 h-3" />
                  <span>AI tavsiyasi</span>
                </button>
                {isNext && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Keyingi namoz
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tahajjud Info Box */}
      <div className="p-5 rounded-2xl bg-stone-900 text-white border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Tungi Tahajjud (Qiyomul-Layl) Vaqti
            </h4>
            <p className="text-xs text-stone-400">
              Tunning oxirgi uchdan bir qismi eng fazilatli vaqt sanaladi: taxminan{' '}
              <strong className="text-emerald-400">{times.tahajjud}</strong> dan tonggacha.
            </p>
          </div>
        </div>

        <button
          onClick={() => requestPrayerAdvice('Tahajjud namozi')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
        >
          Tahajjud odobi
        </button>
      </div>

      {/* AI Advice Modal */}
      {aiAdviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                  Islomiy Maslahatchi Tavsiyasi
                </h3>
              </div>
              <button
                onClick={() => setAiAdviceModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isAiLoading ? (
              <div className="py-8 text-center space-y-3">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
                <p className="text-xs text-stone-500">
                  Hanafiy fiqhi va sahih hadislar asosida javob tayyorlanmoqda...
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {aiAdviceText}
              </div>
            )}

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-end">
              <button
                onClick={() => setAiAdviceModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
              >
                Tushundim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Notice */}
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 flex items-start gap-3 text-xs text-stone-600 dark:text-stone-400">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Eslatma:</strong> Namoz vaqtlari O‘zbekiston koordinatalari bo‘yicha xalqaro Aladhan API orqali har 30 daqiqada avtomatik yangilanadi. Hanafiy mezoni (asr vaqti soya 2 barobar uzayganda) hisobga olingan. Har bir masjidda azon va jamoat vaqti O‘zbekiston Musulmonlari Idorasi rasmiy taqvimiga asosan belgilanadi.
        </p>
      </div>
    </div>
  );
};
