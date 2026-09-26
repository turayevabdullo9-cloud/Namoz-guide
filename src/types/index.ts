export type Madhhab = 'Hanafi' | 'General' | 'Shayx_Farq';

export type RulingType =
  | 'FARD'
  | 'WAJIB'
  | 'SUNNAH_MUAKKADA'
  | 'SUNNAH_GHOYRI_MUAKKADA'
  | 'MUSTAHABB'
  | 'MUBAH'
  | 'MAKRUH_TAHRIMIY'
  | 'MAKRUH_TANZIHIY'
  | 'INVALID'
  | 'SCHOLAR_DIFFERENCE';

export type ReviewStatus = 'DRAFT' | 'REVIEWED' | 'PUBLISHED';

export interface SourceCitation {
  book: string;
  author: string;
  chapter?: string;
  hadithNumber?: string | number;
  authenticity?: 'Sahih' | 'Hasan' | 'Muttafaqun alayh' | 'Mavzu emas' | 'Fiqh matni';
  sourceUrl?: string;
  notes?: string;
}

export interface PrayerStepItem {
  id: string;
  stepNumber: number;
  title: string;
  position: 'Qiyom' | 'Ruku' | 'Qawmah' | 'Sajdah' | 'Jalsa' | 'Qada' | 'Salom' | 'Niyat' | 'Takbir';
  actionDescription: string;
  arabicText?: string;
  transliteration?: string;
  translationUz?: string;
  repeatCount?: number;
  ruling: RulingType;
  educationalWhy: string;
  commonMistake?: string;
}

export interface PrayerDetail {
  id: string;
  name: string;
  arabicName: string;
  slug: string;
  category: '5mahal' | 'special';
  rakatsSummary: string;
  timeDescription: string;
  rakatsBreakdown: {
    sunnahBefore?: number;
    fard: number;
    sunnahAfter?: number;
    wajib?: number;
    nafl?: number;
  };
  preparation: string[];
  niyyah: {
    arabic: string;
    transliteration: string;
    meaningUz: string;
  };
  rulesHanafi: string[];
  commonMistakes: string[];
  sources: SourceCitation[];
  stepsSummary: string[];
}

export interface HadithItem {
  id: string;
  collection: string;
  hadithNumber: string | number;
  chapter: string;
  arabicText: string;
  translationUz: string;
  narratorUz: string;
  authenticity: 'Sahih' | 'Hasan' | 'Muttafaqun alayh';
  category: 'Salah' | 'Taharah' | 'Ramadan' | 'Juma' | 'Akhlaq' | 'Dua' | 'General';
  explanationUz: string;
  source: SourceCitation;
}

export interface DuaItem {
  id: string;
  titleUz: string;
  category:
    | 'Uygonganda'
    | 'UyqudanOldin'
    | 'Taomlanish'
    | 'Masjid'
    | 'Tahorat'
    | 'Safar'
    | 'Istighfor'
    | 'Namozda'
    | 'NamozdanKeyin'
    | 'TonggiKechki';
  arabicText: string;
  transliteration: string;
  meaningUz: string;
  context: string;
  repeatCount?: number;
  source: SourceCitation;
}

export interface SunnahItem {
  id: string;
  titleUz: string;
  category:
    | 'Namoz'
    | 'Tahorat'
    | 'Masjid'
    | 'Juma'
    | 'Ramazon'
    | 'Taomlanish'
    | 'Uyqu'
    | 'Salomlashish'
    | 'BemorZiyorati'
    | 'KundalikZikr';
  descriptionUz: string;
  practicalApplication: string;
  hadithSource: SourceCitation;
  hadithTextUz: string;
}

export interface FiqhArticle {
  id: string;
  titleUz: string;
  category: 'Makruh' | 'NamozniBuzuvchi' | 'TahoratniBuzuvchi' | 'Xatolar' | 'Mustahab' | 'SavolJavob';
  summaryUz: string;
  detailedUz: string;
  hanafiRuling: string;
  madhhabDifferences?: string;
  source: SourceCitation;
  relatedTopicIds?: string[];
}

export interface SurahItem {
  id: number;
  nameUz: string;
  nameArabic: string;
  englishTranslation: string;
  revelationType: 'Makkiy' | 'Madaniy';
  totalAyahs: number;
  juzNumber: number;
  ayahs: {
    number: number;
    arabicText: string;
    transliteration: string;
    translationUz: string;
    audioUrl?: string;
    globalAyahNumber?: number;
  }[];
}

export interface BookmarkItem {
  id: string;
  type: 'hadith' | 'dua' | 'prayer' | 'sunnah' | 'fiqh' | 'quran';
  title: string;
  subtitle: string;
  dateAdded: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  provider: 'google';
  signedInAt: string;
}
