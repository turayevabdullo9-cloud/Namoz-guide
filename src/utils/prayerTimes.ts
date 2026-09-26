export interface CityLocation {
  nameUz: string;
  nameEn: string;
  regionUz: string;
  latitude: number;
  longitude: number;
  timezone: number; // UTC offset (Uzbekistan is UTC+5)
  isDetectedGps?: boolean;
}

export const UZBEKISTAN_CITIES: CityLocation[] = [
  { nameUz: 'Toshkent shahri', nameEn: 'Tashkent', regionUz: 'Toshkent', latitude: 41.2995, longitude: 69.2401, timezone: 5 },
  { nameUz: 'Samarqand', nameEn: 'Samarkand', regionUz: 'Samarqand viloyati', latitude: 39.6542, longitude: 66.9597, timezone: 5 },
  { nameUz: 'Buxoro', nameEn: 'Bukhara', regionUz: 'Buxoro viloyati', latitude: 39.7681, longitude: 64.4556, timezone: 5 },
  { nameUz: 'Andijon', nameEn: 'Andijan', regionUz: 'Andijon viloyati', latitude: 40.7821, longitude: 72.3442, timezone: 5 },
  { nameUz: 'Namangan', nameEn: 'Namangan', regionUz: 'Namangan viloyati', latitude: 40.9983, longitude: 71.6726, timezone: 5 },
  { nameUz: 'Farg‘ona', nameEn: 'Fergana', regionUz: 'Farg‘ona viloyati', latitude: 40.3842, longitude: 71.7843, timezone: 5 },
  { nameUz: 'Urganch / Xiva', nameEn: 'Urgench', regionUz: 'Xorazm viloyati', latitude: 41.5562, longitude: 60.6317, timezone: 5 },
  { nameUz: 'Qarshi', nameEn: 'Qarshi', regionUz: 'Qashqadaryo viloyati', latitude: 38.8606, longitude: 65.7891, timezone: 5 },
  { nameUz: 'Termiz', nameEn: 'Termez', regionUz: 'Surxondaryo viloyati', latitude: 37.2242, longitude: 67.2783, timezone: 5 },
  { nameUz: 'Navoiy', nameEn: 'Navoi', regionUz: 'Navoiy viloyati', latitude: 40.1039, longitude: 65.3688, timezone: 5 },
  { nameUz: 'Jizzax', nameEn: 'Jizzakh', regionUz: 'Jizzax viloyati', latitude: 40.1158, longitude: 67.8422, timezone: 5 },
  { nameUz: 'Guliston', nameEn: 'Guliston', regionUz: 'Sirdaryo viloyati', latitude: 40.4939, longitude: 68.7842, timezone: 5 },
  { nameUz: 'Nukus', nameEn: 'Nukus', regionUz: 'Qoraqalpog‘iston Resp.', latitude: 42.4602, longitude: 59.6166, timezone: 5 },
];

export interface AladhanTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak?: string;
  Midnight?: string;
  Lastthird?: string;
}

export interface PrayerTimesResult {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  tahajjud: string;
  source: 'aladhan' | 'local_calculated';
  hijriDateStr?: string;
  currentPrayer: {
    nameUz: string;
    isMakruhTime?: boolean;
    statusText: string;
  };
  nextPrayer: {
    nameUz: string;
    timeStr: string;
    remainingMinutes: number;
    remainingSeconds: number;
    remainingFormatted: string;
  };
}

const degToRad = (deg: number) => (deg * Math.PI) / 180;
const radToDeg = (rad: number) => (rad * 180) / Math.PI;

// Distance calculation to find closest city in Uzbekistan
export function findClosestUzbekistanCity(lat: number, lng: number): {
  city: CityLocation;
  distanceKm: number;
} {
  let closest = UZBEKISTAN_CITIES[0];
  let minDistance = Infinity;

  for (const city of UZBEKISTAN_CITIES) {
    const dLat = degToRad(city.latitude - lat);
    const dLng = degToRad(city.longitude - lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat)) *
        Math.cos(degToRad(city.latitude)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = 6371 * c;
    if (dist < minDistance) {
      minDistance = dist;
      closest = city;
    }
  }

  return {
    city: closest,
    distanceKm: Math.round(minDistance),
  };
}

// Convert "HH:MM" string to decimal hours (e.g. "04:30" -> 4.5)
function parseTimeStringToHours(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.split(' ')[0]; // Strip timezone or suffixes like "(EET)"
  const [h, m] = clean.split(':').map((v) => parseInt(v, 10));
  return (h || 0) + (m || 0) / 60;
}

// Format "HH:MM" cleanly
function cleanTimeStr(timeStr: string): string {
  if (!timeStr) return '00:00';
  const clean = timeStr.split(' ')[0];
  const parts = clean.split(':');
  if (parts.length >= 2) {
    return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
  }
  return clean;
}

// Parse decimal hours to "HH:MM"
function formatHoursToTimeStr(hours: number): string {
  let normalized = (hours + 24) % 24;
  const h = Math.floor(normalized);
  const m = Math.floor((normalized - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

// Construct standard result from Aladhan API response
export function processPrayerSchedule(
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    tahajjud?: string;
  },
  now: Date,
  source: 'aladhan' | 'local_calculated' = 'aladhan',
  hijriDateStr?: string
): PrayerTimesResult {
  const fajrHours = parseTimeStringToHours(times.fajr);
  const sunriseHours = parseTimeStringToHours(times.sunrise);
  const dhuhrHours = parseTimeStringToHours(times.dhuhr);
  const asrHours = parseTimeStringToHours(times.asr);
  const maghribHours = parseTimeStringToHours(times.maghrib);
  const ishaHours = parseTimeStringToHours(times.isha);

  // Tahajjud: Use provided lastthird or compute last 1/3 between Maghrib and Fajr
  let tahajjudHours = times.tahajjud ? parseTimeStringToHours(times.tahajjud) : 0;
  if (!times.tahajjud || tahajjudHours === 0) {
    const nightDurationHours = (fajrHours + 24 - maghribHours) % 24;
    tahajjudHours = (maghribHours + (nightDurationHours * 2) / 3) % 24;
  }

  const currentTotalSeconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const prayerSchedule = [
    { nameUz: 'Bomdod', hours: fajrHours, str: cleanTimeStr(times.fajr) },
    { nameUz: 'Quyosh', hours: sunriseHours, str: cleanTimeStr(times.sunrise) },
    { nameUz: 'Peshin', hours: dhuhrHours, str: cleanTimeStr(times.dhuhr) },
    { nameUz: 'Asr', hours: asrHours, str: cleanTimeStr(times.asr) },
    { nameUz: 'Shom', hours: maghribHours, str: cleanTimeStr(times.maghrib) },
    { nameUz: 'Xufton', hours: ishaHours, str: cleanTimeStr(times.isha) },
  ];

  // Determine Next Prayer and countdown
  let nextP = prayerSchedule[0];
  let minDiffSeconds = 9999999;

  for (const p of prayerSchedule) {
    const pSeconds = Math.floor(p.hours * 3600);
    let diffSec = pSeconds - currentTotalSeconds;
    if (diffSec < 0) {
      diffSec += 24 * 3600; // Passes to next day
    }
    if (diffSec < minDiffSeconds && diffSec > 0) {
      minDiffSeconds = diffSec;
      nextP = p;
    }
  }

  const remHours = Math.floor(minDiffSeconds / 3600);
  const remMinutes = Math.floor((minDiffSeconds % 3600) / 60);
  const remSec = minDiffSeconds % 60;
  const remainingFormatted = `${remHours > 0 ? `${remHours} soat ` : ''}${remMinutes} daqiqa ${remSec} soniya`;

  // Determine Currently Active Prayer Window
  const currentHoursDecimal = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  let currentPrayerName = 'Xufton';
  let isMakruh = false;
  let statusText = 'Hozir Xufton vaqti kirgan';

  if (currentHoursDecimal >= fajrHours && currentHoursDecimal < sunriseHours) {
    currentPrayerName = 'Bomdod';
    statusText = 'Hozir Bomdod vaqti (quyosh chiqqunga qadar)';
  } else if (
    currentHoursDecimal >= sunriseHours &&
    currentHoursDecimal < sunriseHours + 0.35
  ) {
    currentPrayerName = 'Quyosh (Makruh vaqt)';
    isMakruh = true;
    statusText = 'Quyosh chiqayotgan payt: nafl namoz o‘qish makruh';
  } else if (
    currentHoursDecimal >= sunriseHours + 0.35 &&
    currentHoursDecimal < dhuhrHours
  ) {
    currentPrayerName = 'Choshgoh (Zuho vaqti)';
    statusText = 'Zuho (Choshgoh) mustahab namozi vaqti';
  } else if (
    currentHoursDecimal >= dhuhrHours &&
    currentHoursDecimal < asrHours
  ) {
    currentPrayerName = 'Peshin';
    statusText = 'Hozir Peshin vaqti';
  } else if (
    currentHoursDecimal >= asrHours &&
    currentHoursDecimal < maghribHours - 0.35
  ) {
    currentPrayerName = 'Asr';
    statusText = 'Hozir Asr vaqti';
  } else if (
    currentHoursDecimal >= maghribHours - 0.35 &&
    currentHoursDecimal < maghribHours
  ) {
    currentPrayerName = 'Quyosh botishi (Makruh)';
    isMakruh = true;
    statusText = 'Quyosh qizarib botayotgan payt: namoz o‘qish makruh';
  } else if (
    currentHoursDecimal >= maghribHours &&
    currentHoursDecimal < ishaHours
  ) {
    currentPrayerName = 'Shom';
    statusText = 'Hozir Shom vaqti';
  } else {
    currentPrayerName = 'Xufton';
    statusText = 'Hozir Xufton vaqti';
  }

  return {
    fajr: cleanTimeStr(times.fajr),
    sunrise: cleanTimeStr(times.sunrise),
    dhuhr: cleanTimeStr(times.dhuhr),
    asr: cleanTimeStr(times.asr),
    maghrib: cleanTimeStr(times.maghrib),
    isha: cleanTimeStr(times.isha),
    tahajjud: formatHoursToTimeStr(tahajjudHours),
    source,
    hijriDateStr,
    currentPrayer: {
      nameUz: currentPrayerName,
      isMakruhTime: isMakruh,
      statusText,
    },
    nextPrayer: {
      nameUz: nextP.nameUz,
      timeStr: nextP.str,
      remainingMinutes: Math.floor(minDiffSeconds / 60),
      remainingSeconds: minDiffSeconds,
      remainingFormatted,
    },
  };
}

// Local astronomical calculation as reliable zero-latency / offline fallback
export function calculatePrayerTimes(
  date: Date,
  lat: number,
  lng: number,
  timeZone: number = 5,
  isHanafiAsr: boolean = true
): PrayerTimesResult {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const B = (360 / 365) * (dayOfYear - 81);
  const bRad = degToRad(B);
  const eot = 9.87 * Math.sin(2 * bRad) - 7.53 * Math.cos(bRad) - 1.5 * Math.sin(bRad);
  const declination = 23.45 * Math.sin(degToRad((360 / 365) * (dayOfYear - 81)));
  const decRad = degToRad(declination);
  const latRad = degToRad(lat);

  const solarNoonHours = 12 + (timeZone * 15 - lng) / 15 - eot / 60;

  const getHourAngle = (alpha: number) => {
    const alphaRad = degToRad(alpha);
    const cosHA =
      (Math.sin(alphaRad) - Math.sin(latRad) * Math.sin(decRad)) /
      (Math.cos(latRad) * Math.cos(decRad));
    if (cosHA > 1 || cosHA < -1) return null;
    return radToDeg(Math.acos(cosHA));
  };

  const shadowFactor = isHanafiAsr ? 2 : 1;
  const asrAlt = radToDeg(
    Math.atan(1 / (shadowFactor + Math.tan(Math.abs(latRad - decRad))))
  );
  const asrHA = getHourAngle(asrAlt);

  const fajrHA = getHourAngle(-18);
  const sunriseHA = getHourAngle(-0.833);
  const ishaHA = getHourAngle(-17);

  const fajrHours = fajrHA !== null ? solarNoonHours - fajrHA / 15 : 4.7;
  const sunriseHours = sunriseHA !== null ? solarNoonHours - sunriseHA / 15 : 6.2;
  const dhuhrHours = solarNoonHours;
  const asrHours = asrHA !== null ? solarNoonHours + asrHA / 15 : 16.4;
  const maghribHours = sunriseHA !== null ? solarNoonHours + sunriseHA / 15 : 18.2;
  const ishaHours = ishaHA !== null ? solarNoonHours + ishaHA / 15 : 19.7;

  return processPrayerSchedule(
    {
      fajr: formatHoursToTimeStr(fajrHours),
      sunrise: formatHoursToTimeStr(sunriseHours),
      dhuhr: formatHoursToTimeStr(dhuhrHours),
      asr: formatHoursToTimeStr(asrHours),
      maghrib: formatHoursToTimeStr(maghribHours),
      isha: formatHoursToTimeStr(ishaHours),
    },
    date,
    'local_calculated'
  );
}

// Fetch from Aladhan API (via server proxy with client fallback)
export async function fetchAladhanPrayerTimes(
  lat: number,
  lng: number,
  isHanafi: boolean = true
): Promise<{
  timings: AladhanTimings;
  hijriDateStr?: string;
  source: 'aladhan';
}> {
  const school = isHanafi ? 1 : 0;
  const method = 3; // Muslim World League standard for Uzbekistan

  // 1. Try server proxy route first
  try {
    const res = await fetch(
      `/api/prayer-times?latitude=${lat}&longitude=${lng}&school=${school}&method=${method}`
    );
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.timings) {
        const h = json.data.date?.hijri;
        const hijriStr = h ? `${h.day} ${h.month?.en || ''} ${h.year} hijriy` : undefined;
        return {
          timings: json.data.timings,
          hijriDateStr: hijriStr,
          source: 'aladhan',
        };
      }
    }
  } catch (err) {
    console.warn('Server proxy fetch failed, trying direct Aladhan API...', err);
  }

  // 2. Direct client-side fetch to Aladhan API fallback
  const directUrl = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}&school=${school}`;
  const directRes = await fetch(directUrl);
  if (!directRes.ok) {
    throw new Error(`Direct Aladhan API status ${directRes.status}`);
  }
  const directJson = await directRes.json();
  if (directJson.data && directJson.data.timings) {
    const h = directJson.data.date?.hijri;
    const hijriStr = h ? `${h.day} ${h.month?.en || ''} ${h.year} hijriy` : undefined;
    return {
      timings: directJson.data.timings,
      hijriDateStr: hijriStr,
      source: 'aladhan',
    };
  }

  throw new Error('Aladhan API invalid response');
}
