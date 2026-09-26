export interface HijriDateInfo {
  day: number;
  monthIndex: number;
  monthNameUz: string;
  monthNameArabic: string;
  year: number;
  formattedUz: string;
}

export interface IslamicEvent {
  titleUz: string;
  hijriDateStr: string;
  descriptionUz: string;
  significance: string;
}

export const HIJRI_MONTHS = [
  { nameUz: 'Muharram', nameArabic: 'المُحَرَّم' },
  { nameUz: 'Safar', nameArabic: 'صَفَر' },
  { nameUz: 'Rabi\'ul avval', nameArabic: 'رَبِيع الأَوَّل' },
  { nameUz: 'Rabi\'us soniy', nameArabic: 'رَبِيع الآخِر' },
  { nameUz: 'Jumadul ula', nameArabic: 'جُمَادَى الأُولَى' },
  { nameUz: 'Jumadus soniy', nameArabic: 'جُمَادَى الآخِرَة' },
  { nameUz: 'Rajab', nameArabic: 'رَجَب' },
  { nameUz: 'Sha\'bon', nameArabic: 'شَعْبَان' },
  { nameUz: 'Ramazon', nameArabic: 'رَمَضَان' },
  { nameUz: 'Shavvol', nameArabic: 'شَوَّال' },
  { nameUz: 'Zulqa\'da', nameArabic: 'ذُو القَعْدَة' },
  { nameUz: 'Zulhijja', nameArabic: 'ذُو الحِجَّة' },
];

export const MAJOR_ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    titleUz: 'Yangi Hijriy yil (1-Muharram)',
    hijriDateStr: '1-Muharram',
    descriptionUz: 'Hijriy qamariy yil hisobining boshlanishi.',
    significance: 'Payg‘ambarimiz (s.a.v.) Makka shahridan Madinaga hijrat qilgan voqeaga asoslangan taqvim.',
  },
  {
    titleUz: 'Oshuro kuni (10-Muharram)',
    hijriDateStr: '10-Muharram',
    descriptionUz: 'Muso alayhissalom va qavmlari Fir\'avndan qutqarilgan buyuk shukrona kuni.',
    significance: 'Ushbu kunda ro‘za tutish o‘tgan bir yillik gunohlarga kafforat bo‘ladi (Muslim). 9 va 10 yoki 10 va 11-kunlari tutiladi.',
  },
  {
    titleUz: 'Mavlidi Nabaviy (12-Rabi\'ul avval)',
    hijriDateStr: '12-Rabi\'ul avval',
    descriptionUz: 'Insoniyat sarvari Payg‘ambarimiz Muhammad sollallohu alayhi vasallam tavallud topgan oy va kun.',
    significance: 'U zotga salovotlar aytish va ibratli siyratlarini o‘rganish mavsumi.',
  },
  {
    titleUz: 'Muborak Ramazon oyi',
    hijriDateStr: '1-Ramazon',
    descriptionUz: 'Qur\'oni Karim nozil qilingan, farz ro‘za tutiladigan va tarovehlar o‘qiladigan rahmat oyi.',
    significance: 'Oylarning sultoni, unda jannat eshiklari ochiladi va do‘zax eshiklari yopiladi.',
  },
  {
    titleUz: 'Qadr kechasi (Laylatul-Qadr)',
    hijriDateStr: 'Ramazonning 27-kechasi (oxirgi 10 kunlikning toq kechalari)',
    descriptionUz: 'Ming oydan yaxshiroq bo‘lgan ulug‘ kecha.',
    significance: 'Farishtalar va Jabroil (a.s.) yerga tushib tonggacha tinchlik-omonlik bo‘ladi.',
  },
  {
    titleUz: 'Ramazon hayiti (Iyd al-Fitr)',
    hijriDateStr: '1-Shavvol',
    descriptionUz: 'Bir oylik ro‘zaning yakuni va bayram kuni.',
    significance: 'Hayit namozi o‘qiladi, fitr sadaqasi beriladi va mehr-oqibat ulashiladi.',
  },
  {
    titleUz: 'Arafa kuni (9-Zulhijja)',
    hijriDateStr: '9-Zulhijja',
    descriptionUz: 'Hojilar Arofat tog‘ida qoim bo‘ladigan, duolar eng ko‘p qabul bo‘ladigan kun.',
    significance: 'Haj qilmaganlar uchun ushbu kuni ro‘za tutish o‘tgan va kelgusi yillik gunohlarga kafforat bo‘ladi.',
  },
  {
    titleUz: 'Qurbon hayiti (Iyd al-Adha)',
    hijriDateStr: '10-Zulhijja',
    descriptionUz: 'Qurbonlik amali bajariladigan, takbiri tashriq aytiladigan ulug‘ bayram (10-13 Zulhijja).',
    significance: 'Ibrohim (a.s.)ning sadoqatlari xotirlanadi va muhtojlarga qurbonlik go‘shti ulashiladi.',
  },
];

// Approximate Julian Day calculation for Gregorian to Hijri
export function getHijriDate(date: Date): HijriDateInfo {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  let jd =
    Math.floor((1461 * (y + 4800 + Math.floor((m - 14) / 12))) / 4) +
    Math.floor((367 * (m - 2 - 12 * Math.floor((m - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 14) / 12)) / 100)) / 4) +
    d -
    32075;

  let l = jd - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  let month = Math.floor((24 * l) / 709);
  let day = l - Math.floor((709 * month) / 24);
  let year = 30 * n + j - 30;

  const monthIdx = Math.max(0, Math.min(11, month - 1));
  const mInfo = HIJRI_MONTHS[monthIdx];

  return {
    day,
    monthIndex: monthIdx,
    monthNameUz: mInfo.nameUz,
    monthNameArabic: mInfo.nameArabic,
    year,
    formattedUz: `${day}-${mInfo.nameUz}, ${year} hijriy`,
  };
}
