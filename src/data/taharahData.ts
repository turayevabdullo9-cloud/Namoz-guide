import { SourceCitation } from '../types';

export interface TaharahStep {
  stepNumber: number;
  title: string;
  description: string;
  ruling: 'FARD' | 'SUNNAH_MUAKKADA' | 'MUSTAHABB';
  detail: string;
}

export interface TaharahCategory {
  id: string;
  title: string;
  arabicTitle: string;
  summary: string;
  fardCount: number;
  fardList: string[];
  sunnahList: string[];
  mustahabList: string[];
  makruhList: string[];
  invalidators: string[];
  steps: TaharahStep[];
  sources: SourceCitation[];
}

export const TAHARAH_DATA: TaharahCategory[] = [
  {
    id: 'wudu',
    title: 'Tahorat (Tahorat olish tartibi)',
    arabicTitle: 'الوُضُوءُ',
    summary: 'Tahorat namozning eng asosiy sharti bo‘lib, ma\'naviy va jismoniy poklanishdir.',
    fardCount: 4,
    fardList: [
      'Yuzni soch chiqqan joyidan iyak ostigacha, ikki quloq yumshog‘i orasigacha bir marta to‘liq yuvish',
      'Ikki qo‘lni tirsaklari bilan qo‘shib bir marta to‘liq yuvish',
      'Boshning to‘rtdan bir qismiga (kamida) ho‘l qo‘l bilan mash tortish',
      'Ikki oyoqni to‘piqlari (oshig‘i) bilan qo‘shib bir marta to‘liq yuvish',
    ],
    sunnahList: [
      'Tahoratni niyat va "Bismillah" bilan boshlash',
      'Avval ikki qo‘lni bilaklarigacha 3 marta yuvish',
      'Misvoq ishlatish (yoki tishlarni tozalash)',
      'Og‘izni 3 marta suv bilan g‘arg‘ara qilmasdan chayqash (madmada)',
      'Burunga o‘ng qo‘l bilan suv tortib, chap qo‘l bilan 3 marta qoqish (istinshoq)',
      'Har bir a\'zoni 3 martadan yuvish',
      'Qalin soqol va barmoqlar orasiga suv yetkazib xilol qilish',
      'Boshga to‘liq mash tortish va quloqlar hamda bo‘yinga mash qilish',
      'Tartib (tartib bilan a\'zolarni ketma-ket yuvish) va ketma-ketlik (bir a\'zo qurimasdan keyingisiga o‘tish)',
    ],
    mustahabList: [
      'O‘ng tomondagi a\'zolardan boshlash',
      'Balandroq va qiblaga yuzlangan pokiza joyda turib tahorat olish',
      'Tahorat oxirida shahodat kalimasini va maxsus duoni o‘qish',
    ],
    makruhList: [
      'Suvni haddan tashqari isrof qilish yoki me\'yordan oz ishlatib quruq joy qoldirish',
      'Suvni yuzga va a\'zolarga qattiq shapillatib urish',
      'Tahorat asnosida behuda dunyoviy gaplarni gapirish',
      'Nopok joyda tahorat olish',
    ],
    invalidators: [
      'Old yoki orqa chiqarish a\'zolaridan biror narsa (peshob, najas, yel, mazi, vadi) chiqishi',
      'Badanning biror joyidan qon, yiring yoki sariq suv chiqib oqishi',
      'Og‘iz to‘lib qusish (taom, suv yoki safro)',
      'Biror narsaga suyanib yoki yonboshlab uxlab qolish (suyangan narsasi olinsa yiqiladigan darajada)',
      'Hushdan ketish, jinnilik yoki mast bo‘lish',
      'Ruku va sajdasi bo‘lgan namozda balog‘atga yetgan kishining qahqaha otib kulishi (bunda namoz ham, tahorat ham buziladi)',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Niyat va Bismillah',
        description: 'Qalb bilan poklanishni niyat qilib, "Bismillahir-rohmanir-rohiym" deyiladi.',
        ruling: 'SUNNAH_MUAKKADA',
        detail: 'Qo‘llar bilaklarigacha uch marta barmoqlar orasini ochib yuviladi.',
      },
      {
        stepNumber: 2,
        title: 'Og‘izni chayqash (Madmada)',
        description: 'O‘ng qo‘l bilan og‘izga uch marta suv olinib, har gal chayqab tashlanadi.',
        ruling: 'SUNNAH_MUAKKADA',
        detail: 'Misvoq ishlatish juda ta\'kidlangan sunnatdir.',
      },
      {
        stepNumber: 3,
        title: 'Burunni chayqash (Istinshoq)',
        description: 'O‘ng qo‘l bilan uch marta burunga suv tortilib, chap qo‘l bilan qoqiladi.',
        ruling: 'SUNNAH_MUAKKADA',
        detail: 'Ro‘zador bo‘lmagan kishi chuqurroq tortadi.',
      },
      {
        stepNumber: 4,
        title: 'Yuzni yuvish',
        description: 'Soch chiqqan joydan iyak ostigacha va ikki quloq yumshog‘i oralig‘igacha uch marta to‘liq yuviladi.',
        ruling: 'FARD',
        detail: 'Biror qiltiriq joyi quruq qolmasligi shart (farz 1 marta, 3 martasi sunnat).',
      },
      {
        stepNumber: 5,
        title: 'Qo‘llarni tirsaklar bilan yuvish',
        description: 'Avval o‘ng qo‘lni barmoq uchlaridan tirsakni qo‘shib 3 marta, so‘ng chap qo‘lni 3 marta yuviladi.',
        ruling: 'FARD',
        detail: 'Tirsaklar to‘liq qoplanishi va barmoqlar oralab yuvilishi kerak.',
      },
      {
        stepNumber: 6,
        title: 'Boshga mash tortish',
        description: 'Qo‘llarni ho‘llab boshning to‘rtdan biriga (afzali butun boshga) mash tortiladi.',
        ruling: 'FARD',
        detail: 'Ko‘rsatkich barmoq bilan quloq ichi, bosh barmoq bilan quloq orqasi, qo‘l sirti bilan bo‘yinga mash qilinadi.',
      },
      {
        stepNumber: 7,
        title: 'Oyoqlarni to‘piqlar bilan yuvish',
        description: 'Avval o‘ng oyoqni to‘piqlari bilan qo‘shib 3 marta barmoqlar orasini xilol qilib, so‘ng chap oyoqni yuviladi.',
        ruling: 'FARD',
        detail: 'To‘piqlar va tovon orqasiga suv yaxshilab yetkaziladi.',
      },
    ],
    sources: [
      {
        book: 'Qur\'oni Karim',
        author: 'Moida surasi, 6-oyat',
        notes: '"Ey iymon keltirganlar! Namozga turganingizda yuzlaringizni va qo‘llaringizni tirsaklarigacha yuvinglar, boshlaringizga mash tortinglar va oyoqlaringizni to‘piqlarigacha yuvinglar..."',
        authenticity: 'Muttafaqun alayh',
      },
      {
        book: 'Sahihul Buxoriy',
        author: 'Imom Buxoriy',
        hadithNumber: 159,
        chapter: 'Tahorat kitobi',
        authenticity: 'Sahih',
      },
    ],
  },
  {
    id: 'ghusl',
    title: 'G‘usl (To‘liq poklanish cho‘milishi)',
    arabicTitle: 'الغُسْلُ',
    summary: 'Katta bepoklikdan tozalanish uchun butun badanni maxsus niyat va tartib bilan yuvish.',
    fardCount: 3,
    fardList: [
      'Og‘izni tomog‘igacha g‘arg‘ara qilib yaxshilab chayqash (ro‘zador bo‘lsa g‘arg‘ara qilmaydi)',
      'Burunni dimog‘igacha achitib suv bilan chayqash',
      'Butun badanni igna uchidek ham quruq joy qoldirmasdan to‘liq yuvish',
    ],
    sunnahList: [
      'G‘uslni niyat va "Bismillah" bilan boshlash',
      'Avval ikki qo‘lni yuvish, so‘ng avrat a\'zolarni va badandagi nopokliklarni tozalash',
      'Xuddi namozdagidek mukammal tahorat olish (faqat oyoq tagida suv to‘plansa, oyoqni oxirida yuvadi)',
      'Boshdan boshlab badanga 3 marta suv quyish: avval boshga, so‘ng o‘ng yelkaga, so‘ng chap yelkaga',
      'Badanni qo‘l bilan ishqalab yuvish',
    ],
    mustahabList: [
      'Qiblaga orqa yoki yuz qilib ochinmaslik',
      'Hech kim ko‘rmaydigan pana joyda g‘usl qilish',
      'Suvni me\'yorida ishlatish',
    ],
    makruhList: [
      'G‘usl qilayotganda gaplashish yoki duo o‘qish',
      'Haddan tashqari ko‘p suv sarflash',
    ],
    invalidators: [
      'Shahvat bilan maniy (urug‘) chiqishi (uyquda ehtilom bo‘lganda yoki uyg‘oqlikda)',
      'Jinsiy yaqinlik (hatto maniy chiqmasa ham)',
      'Ayollarda hayz (oy ko‘rish) va nifos (tug‘ruqdan keyingi qon)ning to‘xtashi',
      'Vafot etgan musulmonni yuvish (tiriklarga farzi kifoya)',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Niyat va tozalanish',
        description: 'G‘usl qilishni niyat qilib, qo‘llarni va badandagi najosatlarni yuvish.',
        ruling: 'SUNNAH_MUAKKADA',
        detail: 'Iflosliklarni ketkazish poklik kalitidir.',
      },
      {
        stepNumber: 2,
        title: 'Og‘iz va burunni chuqur yuvish',
        description: 'Og‘izni g‘arg‘ara bilan 3 marta, burunni dimog‘gacha 3 marta yuvish.',
        ruling: 'FARD',
        detail: 'Bu amallar g‘uslning asosiy farzidir.',
      },
      {
        stepNumber: 3,
        title: 'To‘liq tahorat olish',
        description: 'Namoz uchun olinadigan tahorat kabi tahorat olinadi.',
        ruling: 'SUNNAH_MUAKKADA',
        detail: 'Bu sunnat amallaridan biridir.',
      },
      {
        stepNumber: 4,
        title: 'Badanga 3 bor suv quyish va ishqalash',
        description: 'Boshga, o‘ng tarafga va chap tarafga 3 martadan suv quyib, kindik, quloq burmalari va sochlarning tubigacha suv yetkaziladi.',
        ruling: 'FARD',
        detail: 'Tirnoq ostidagi bo‘yoq yoki xamir kabi suv o‘tkazmaydigan narsalarni olib tashlash shart.',
      },
    ],
    sources: [
      {
        book: 'Sahihul Buxoriy',
        author: 'Imom Buxoriy (Oysha r.a. rivoyati)',
        hadithNumber: 248,
        chapter: 'G‘usl kitobi',
        authenticity: 'Sahih',
      },
      {
        book: 'Muxtasarul Viqoya',
        author: 'Ubaydulloh ibn Mas\'ud',
        chapter: 'G‘usl fasli',
        authenticity: 'Fiqh matni',
      },
    ],
  },
  {
    id: 'tayammum',
    title: 'Tayammum (Tuproq bilan poklanish)',
    arabicTitle: 'التَّيَمُّمُ',
    summary: 'Suv bo‘lmaganda yoki suvdan foydalanish salomatlikka zarar yetkazadigan holatlarda pok tuproq jinsi bilan poklanish.',
    fardCount: 2,
    fardList: [
      'Tahorat yoki g‘usl o‘rniga namoz o‘qishni niyat qilish',
      'Ikki qo‘lni pok tuproq jinsiga (tuproq, tosh, qum) bir marta urib yuzga to‘liq surtish, ikkinchi bor urib ikki qo‘lni tirsaklarigacha to‘liq surtish (mash tortish)',
    ],
    sunnahList: [
      'Bismillah bilan boshlash',
      'Qo‘llarni tuproqqa urgandan so‘ng ortiqcha changni bir-biriga urib qoqish',
      'Tartib: avval yuz, keyin qo‘llarga surtish',
      'O‘ng qo‘ldan boshlash',
    ],
    mustahabList: [
      'Suv qidirishga umid bo‘lsa, namoz vaqtining oxirigacha biroz kutish',
    ],
    makruhList: [
      'Nopok yoki najas aralashgan chang-tuproqdan foydalanish',
    ],
    invalidators: [
      'Tahoratni buzuvchi barcha amallar tayammumni ham buzadi',
      'Suv topilishi va undan foydalanishga imkoniyat tug‘ilishi',
      'Suvdan foydalanishga to‘sqinlik qilgan kasallik yoki uzrning bartaraf bo‘lishi',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Niyat va Bismillah',
        description: 'Tahoratsizlikni ketkazish va namoz o‘qish uchun tayammum qilishni niyat qilish.',
        ruling: 'FARD',
        detail: 'Faqatgina chang urish bilan kifoyalanib bo‘lmaydi, qalbda niyat shart.',
      },
      {
        stepNumber: 2,
        title: '1-zarb: Yuzga mash tortish',
        description: 'Ikki kaftni pok tuproqqa urib, ortiqcha gardni qoqib, yuzning barcha qismiga surtiladi.',
        ruling: 'FARD',
        detail: 'Yuz to‘liq qamrab olinadi.',
      },
      {
        stepNumber: 3,
        title: '2-zarb: Qo‘llarga mash tortish',
        description: 'Qo‘llarni yana tuproqqa urib, chap qo‘l kafti bilan o‘ng qo‘l tirsagigacha, o‘ng qo‘l kafti bilan chap qo‘l tirsagigacha surtiladi.',
        ruling: 'FARD',
        detail: 'Barmoqlar orasi xilol qilinadi.',
      },
    ],
    sources: [
      {
        book: 'Qur\'oni Karim',
        author: 'Niso surasi, 43-oyat',
        notes: '"...Suv topa olmasangiz, pok tuproqqa tayammum qilinglar: yuzlaringizga va qo‘llaringizga mash tortinglar..."',
        authenticity: 'Muttafaqun alayh',
      },
      {
        book: 'Sahihul Buxoriy',
        author: 'Imom Buxoriy',
        hadithNumber: 335,
        chapter: 'Tayammum kitobi',
        authenticity: 'Sahih',
      },
    ],
  },
];
