export interface AuthoritativeSource {
  id: string;
  name: string;
  author: string;
  years: string;
  category: 'Hadis to‘plami' | 'Hanafiy fiqhiy matni' | 'Zamonaviy tadqiqot';
  description: string;
  importance: string;
}

export const SOURCES_CATALOG: AuthoritativeSource[] = [
  {
    id: 'bukhari',
    name: 'Al-Jome\' as-Sahih (Sahihul Buxoriy)',
    author: 'Imom Abu Abdulloh Muhammad ibn Ismoil al-Buxoriy',
    years: '194 – 256 hijriy (810 – 870 milodiy)',
    category: 'Hadis to‘plami',
    description: 'Islom olamida Qur\'oni Karimdan keyingi eng ishonchli manba hisoblangan sahih hadislar to‘plami. Unda namoz, tahorat, juma va boshqa ibodatlar bo‘yicha Payg‘ambarimiz (s.a.v.)ning eng sahih hadislari keltirilgan.',
    importance: 'Eng yuqori darajadagi hadis asosi.',
  },
  {
    id: 'muslim',
    name: 'Al-Musnad as-Sahih (Sahih Muslim)',
    author: 'Imom Muslim ibn al-Hajjoj an-Naysaburiy',
    years: '204 – 261 hijriy (820 – 875 milodiy)',
    category: 'Hadis to‘plami',
    description: 'Imom Buxoriy bilan bir qatorda eng sahih hadis manbasi. Harakatlar va ibodatlar boblarga nozik va ketma-ketlikda ajratilgan.',
    importance: 'Sahih to‘plam, Muttafaqun alayh rivoyatlari.',
  },
  {
    id: 'tirmidhi',
    name: 'Al-Jome\' al-Muxtasar (Sunani Termiziy)',
    author: 'Imom Abu Iso Muhammad ibn Iso at-Termiziy',
    years: '209 – 279 hijriy (824 – 892 milodiy)',
    category: 'Hadis to‘plami',
    description: 'Hadislarning sihhlik darajasi (Sahih, Hasan, G‘arib) va ulamolar hamda sahobalarning amaliy fiqhiy qarashlari bayon etilgan nodir durdona asar.',
    importance: 'Fiqhiy hadislar va taqrizlar manbai.',
  },
  {
    id: 'abu-dawud',
    name: 'Sunani Abu Dovud',
    author: 'Imom Abu Dovud Sulaymon ibn al-Ash\'as as-Sijistoniy',
    years: '202 – 275 hijriy (817 – 889 milodiy)',
    category: 'Hadis to‘plami',
    description: 'Ahkom (shariat amallari) hadislariga bag‘ishlangan to‘rtta mashhur "Sunan" kitoblarining biri. Hanafiy ulamolari eng ko‘p suyangan hadis to‘plamlaridan.',
    importance: 'Ahkom va amaliyot manbai.',
  },
  {
    id: 'hidaya',
    name: 'Al-Hidoya sharhu Bidoyatil-Mubtadi',
    author: 'Burhoniddin al-Marg‘inoniy',
    years: '511 – 593 hijriy (1117 – 1197 milodiy)',
    category: 'Hanafiy fiqhiy matni',
    description: 'Hanafiy mazhabining butun Islom dunyosida e\'tirof etilgan eng nufuzli ensiklopedik fiqh manbai. Unda Hanafiy mazhabi dalillari va boshqa mazhablar bilan qiyosiy tahlillar mukammal berilgan.',
    importance: 'Hanafiy fiqhining tayanchi.',
  },
  {
    id: 'viqaya',
    name: 'Muxtasarul Viqoya fi Masoilil-Hidoya',
    author: 'Ubaydulloh ibn Mas\'ud al-Mahbubiy (Sadrush-shari\'a as-Soniy)',
    years: 'vafoti 747 hijriy (1346 milodiy)',
    category: 'Hanafiy fiqhiy matni',
    description: 'Movarounnahr va Markaziy Osiyo madrasalarida asrlar davomida darslik sifatida o‘qitilgan, amaliy ibodatlar (Tahorat, Namoz, Ro‘za) qoidalarini aniq va lo‘nda ifodalagan asar.',
    importance: 'O‘zbek xalqi diniy an\'analarining asosiy qo‘llanmasi.',
  },
  {
    id: 'radd-muhtar',
    name: 'Raddu-l-Muhtor \'alad-Durril-Muxtor (Hoshiyatul Ibn Obidin)',
    author: 'Muhammad Amin ibn Umar (Ibn Obidin)',
    years: '1198 – 1252 hijriy (1784 – 1836 milodiy)',
    category: 'Hanafiy fiqhiy matni',
    description: 'Keyingi davr Hanafiy ulamolari fatvo berishda tayangan eng mukammal va nozik fatvolar to‘plami. Mayda fiqhiy juz\'iyotlar shu kitob bilan tekshiriladi.',
    importance: 'Fatvo sohasidagi oliy hakam kitob.',
  },
  {
    id: 'uzbek-fatwa',
    name: 'O‘zbekiston Musulmonlari Idorasi Fatvo Hay\'ati',
    author: 'Rasmiy ulamolar va fatvo hay\'ati',
    years: 'Zamonaviy',
    category: 'Zamonaviy tadqiqot',
    description: 'O‘zbekiston Respublikasi musulmonlari uchun amaldagi Hanafiy fiqhi doirasida chiqarilgan rasmiy fatvolar, namoz vaqtlari mezonlari va shar\'iy tavsiyalar to‘plami.',
    importance: 'Mahalliy amaliyot va zamonaviy masalalar mezonidir.',
  },
  {
    id: 'shayx-msmy',
    name: 'Kifoya, Hadis va Hayot, Mo‘minning qalqoni',
    author: 'Shayx Muhammad Sodiq Muhammad Yusuf (rohimahulloh)',
    years: '1952 – 2015 milodiy',
    category: 'Zamonaviy tadqiqot',
    description: 'O‘zbek tilida sof Islomiy ta\'limotni, mo‘tadil ahli sunna val-jamoa va Hanafiy fiqhini xalqqa tushunarli uslubda yetkazgan yirik islom olimining asarlari.',
    importance: 'O‘zbek tilidagi eng mukammal sharh va qo‘llanmalar.',
  },
];
