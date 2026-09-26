import { PrayerStepItem } from '../types';

export interface PrayerTrainerSession {
  prayerId: string;
  prayerNameUz: string;
  rakatType: string;
  totalRakats: number;
  steps: PrayerStepItem[];
}

export const BOMDOD_FARZ_TRAINER: PrayerStepItem[] = [
  {
    id: 'b-f-1',
    stepNumber: 1,
    title: 'Niyat qilish',
    position: 'Niyat',
    actionDescription: 'Qiblaga yuzlanib, qalb bilan Bomdod namozining ikki rak\'at farzini o‘qishga qat\'iy qaror qilinadi. Til bilan aytish ham mustahabdir.',
    arabicText: 'نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْفَجْرِ فَرْضًا مُتَوَجِّهًا إِلَى الْقِبْلَةِ',
    transliteration: "Navaytu an usalliya lillahi ta'ala rak'atay salatil-fajri farzan mutavajjihan ilal-qiblati, Allohu Akbar",
    translationUz: "Alloh taolo roziligi uchun qiblaga yuzlanib, bugungi bomdod namozining 2 rak'at farzini o‘qishni niyat qildim.",
    ruling: 'FARD',
    educationalWhy: 'Niyat ibodatning shartidir. Amallar faqat niyatga bog‘liqdir (Buxoriy, 1). Qalb uyg‘oq bo‘lishi zarur.',
    commonMistake: 'Faqat tilda aytib, xayolni boshqa dunyoviy narsalarga chalg‘itish.',
  },
  {
    id: 'b-f-2',
    stepNumber: 2,
    title: 'Takbiri tahrima',
    position: 'Takbir',
    actionDescription: 'Erkaklar ikki qo‘lini bosh barmoqlari quloq solinchagiga yetguncha ko‘taradilar (ayollar yelka barobarida ko‘taradilar) va "Allohu Akbar" deb takbir aytadilar.',
    arabicText: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allohu Akbar',
    translationUz: 'Alloh buyukdir!',
    ruling: 'FARD',
    educationalWhy: 'Bu takbir orqali namozga kiriladi va namozdan tashqari barcha dunyoviy amallar (gapirish, yeb-ichish) harom (tahrima) bo‘ladi.',
    commonMistake: 'Takbir aytishdan oldin qo‘lni bog‘lab olish yoki boshni orqaga tashlash.',
  },
  {
    id: 'b-f-3',
    stepNumber: 3,
    title: 'Qiyom va qo‘l bog‘lash',
    position: 'Qiyom',
    actionDescription: 'Qo‘llar kindik ostiga qo‘yiladi: o‘ng qo‘l kafti chap qo‘l bilagi ustiga qo‘yilib, bosh va kichik barmoqlar bilan chap qo‘l bilagi halqa qilinadi (ayollar ko‘krak ustiga qo‘yadilar). Ko‘z sajda joyiga qaratiladi.',
    ruling: 'FARD',
    educationalWhy: 'Qiyom – Alloh huzurida kamtarlik va ehtirom bilan tik turish demakdir.',
    commonMistake: 'Ko‘zni shiftga yoki atrofga qaratish, og‘irlikni faqat bir oyoqqa tashlab qiyshayish.',
  },
  {
    id: 'b-f-4',
    stepNumber: 4,
    title: 'Sano duosi (Subhanaka)',
    position: 'Qiyom',
    actionDescription: 'Qo‘llar bog‘langan holda ichda muloyim ovoz bilan Sano duosi o‘qiladi.',
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ ، وَتَبَارَكَ اسْمُكَ ، وَتَعَالَى جَدُّكَ ، وَلَا إِلَهَ غَيْرُكَ',
    transliteration: "Subhanakallohumma va bihamdika va tabarokasmuka va ta'ala jadduka va la ilaha g'oyruk.",
    translationUz: "Allohim! Sening sha'ningni poklab maqtov aytaman. Sening isming muborakdir, ulug‘liging yuksakdir va Sendan o‘zga iloh yo‘qdir.",
    ruling: 'SUNNAH_MUAKKADA',
    educationalWhy: 'Bandaning Parvardigori huzurida Unga tasbeh va hamd aytib namozni boshlashi buyuk odobdir.',
    commonMistake: 'Sanoni shoshilib aytish yoki tark qilish.',
  },
  {
    id: 'b-f-5',
    stepNumber: 5,
    title: 'Ta\'avvuz va Tasmiya',
    position: 'Qiyom',
    actionDescription: 'Maxfiy (ichda) shaytondan panoh so‘rab, Allohning nomi bilan boshlanadi.',
    arabicText: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ • بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    transliteration: "A'uzu billahi minash-shaytonir-rojiym. Bismillahir-rohmanir-rohiym.",
    translationUz: "Quvilgan shaytonning yomonligidan Allohdan panoh so‘rayman. Mehribon va rahmli Alloh nomi bilan boshlayman.",
    ruling: 'SUNNAH_MUAKKADA',
    educationalWhy: 'Qur\'on qiroatidan oldin shayton vasvasasidan Allohdan panoh so‘rash Qur\'oniy buyruqdir (Nahl surasi, 98).',
  },
  {
    id: 'b-f-6',
    stepNumber: 6,
    title: 'Fotiha surasi',
    position: 'Qiyom',
    actionDescription: 'Fotiha surasi to‘liq, harflarni dona-dona qilib o‘qiladi. Oxirida ichda "Omiyn" deyiladi.',
    arabicText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَنِ الرَّحِيمِ • مَالِكِ يَوْمِ الدِّينِ • إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ • اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ • صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: "Alhamdulillahi robbil-'alamiyn. Ar-rohmanir-rohiym. Maliki yavmid-diyn. Iyyaka na'budu va iyyaka nasta'iyn. Ihdinas-sirotol-mustaqiym. Sirotol-laziyna an'amta 'alayhim g'oyril-mag'dubi 'alayhim valad-dolliyn.",
    translationUz: "Hamd olamlar rabbi Allohgadir. U Mehribon va Rahmlidir. Qiyomat kunining egasidir. Faqat Sengagina ibodat qilamiz va Sendangina yordam so‘raymiz. Bizni to‘g‘ri yo‘lga hidoyat qilgin. O‘zing ne'mat berganlarning yo‘liga, g‘azabga uchragan va adashganlarning yo‘liga emas.",
    ruling: 'WAJIB',
    educationalWhy: 'Fotiha – Qur\'onning onasi (Ummu-l-Kitob) hisoblanadi. Namozning har bir rak\'atida Fotiha o‘qish Hanafiyda vojibdir.',
    commonMistake: 'Oyati karimalar orasida to‘xtamasdan nafasni yutib tez o‘qib ketish.',
  },
  {
    id: 'b-f-7',
    stepNumber: 7,
    title: 'Zam sura (Ixlos surasi)',
    position: 'Qiyom',
    actionDescription: 'Fotihadan so‘ng kamida 3 qisqa oyat yoki bitta uzun oyat zam qilib o‘qiladi. Masalan, Ixlos surasi.',
    arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ • اللَّهُ الصَّمَدُ • لَمْ يَلِدْ وَلَمْ يُولَدْ • وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    transliteration: "Qul huvallohu ahad. Allohus-somad. Lam yalid va lam yulad. Va lam yakul-lahu kufuvan ahad.",
    translationUz: "Ayt: U Alloh Yagonadir. Alloh Behojatdir (barcha Unga muhtoj). U tug‘magan va tug‘ilmagan. Va hech kim Unga teng bo‘la olmagan.",
    ruling: 'WAJIB',
    educationalWhy: 'Farzning dastlabki ikki rak\'atida va nafl/vitrning barcha rak\'atlarida Fotihaga sura qo‘shib o‘qish vojibdir.',
  },
  {
    id: 'b-f-8',
    stepNumber: 8,
    title: 'Ruku\'ga borish va tasbeh',
    position: 'Ruku',
    actionDescription: '"Allohu Akbar" deb ruku\'ga egilinadi. Bosh va bel bir tekis bo‘ladi, qo‘llar tizzalarni barmoqlarni ochgan holda mahkam changallaydi. Kamida 3 marta ruku tasbehi aytiladi.',
    arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: "Subhana Robbiyal-'Aziym",
    translationUz: "Buyuk Rabbim har qanday nuqsondan pokdir!",
    repeatCount: 3,
    ruling: 'FARD',
    educationalWhy: 'Ruku – Allohning azamati qarshisida bosh egish, takabburlikdan forig‘ bo‘lish ramzidir.',
    commonMistake: 'Belni to‘liq egmaslik yoki tizzalarni qaltiratib shoshilib darhol ko‘tarilish.',
  },
  {
    id: 'b-f-9',
    stepNumber: 9,
    title: 'Qavma (Rukudan ko‘tarilish)',
    position: 'Qawmah',
    actionDescription: 'Rukudan qadni to‘liq tiklab ko‘tarilayotganda "Sami\'allohu liman hamidah" deyiladi. Tik turgach "Robbana lakal hamd" deyiladi va a\'zolar tinchlanadi.',
    arabicText: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ',
    transliteration: "Sami'allohu liman hamidah. Robbana lakal hamd.",
    translationUz: "Alloh Unga hamd aytgan kishini eshitdi. Ey Rabbimiz! Hamd faqat Sengadir.",
    ruling: 'WAJIB',
    educationalWhy: 'Ta\'dili arkon (rukudan so‘ng tananing to‘liq tiklanib, tinch holatga kelishi) vojib hisoblanadi.',
    commonMistake: 'Qadni to‘liq rostlamasdan, hali egilgan holatdayoq sajdaga tushib ketish.',
  },
  {
    id: 'b-f-10',
    stepNumber: 10,
    title: 'Birinchi sajdah',
    position: 'Sajdah',
    actionDescription: '"Allohu Akbar" deb sajdaga tushiladi. Tartib: avval tizzalar, keyin qo‘llar, so‘ng burun va peshana yerga qo‘yiladi. Oyoq barmoqlari qiblaga qaratiladi. Kamida 3 marta tasbeh aytiladi.',
    arabicText: 'سُبْحَانَ رَبِّيَ الأَعْلَى',
    transliteration: "Subhana Robbiyal-A'la",
    translationUz: "Eng Oliy Rabbim barcha nuqsondan pokdir!",
    repeatCount: 3,
    ruling: 'FARD',
    educationalWhy: 'Sajda – bandaning Allohga eng yaqin bo‘lgan onidir (Muslim, 482). Unda inson o‘zining eng aziz a\'zosi bo‘lgan yuzini Yerga qo‘yib tavozu qiladi.',
    commonMistake: 'Oyoq panjalarini yerdan ko‘tarib havoda tutish, burunni yerga tegizmaslik.',
  },
  {
    id: 'b-f-11',
    stepNumber: 11,
    title: 'Jalsa (Ikki sajda orasidagi o‘tirish)',
    position: 'Jalsa',
    actionDescription: '"Allohu Akbar" deb bosh ko‘tariladi va chap oyoq ustiga o‘tirilib, o‘ng oyoq panjalari qiblaga qaratiladi (iftirosh). Qo‘llar sonlar ustiga qo‘yiladi. Bir lahza a\'zolar tinchlanadi.',
    arabicText: 'رَبِّ اغْفِرْ لِي',
    transliteration: "Robbig'fir liy",
    translationUz: "Yo Rabbim, mening gunohlarimni kechirgin!",
    ruling: 'WAJIB',
    educationalWhy: 'Ikki sajda orasida sokin o‘tirish ta\'dili arkonning bir qismi bo‘lib, Hanafiyda vojib amallardandir.',
    commonMistake: 'Birinchi sajdadan bosh ko‘tarar-ko‘tarmas darhol ikkinchi sajdaga urish.',
  },
  {
    id: 'b-f-12',
    stepNumber: 12,
    title: 'Ikkinchi sajdah',
    position: 'Sajdah',
    actionDescription: '"Allohu Akbar" deb ikkinchi bor sajdaga boriladi va 3 marta tasbeh aytiladi.',
    arabicText: 'سُبْحَانَ رَبِّيَ الأَعْلَى',
    transliteration: "Subhana Robbiyal-A'la",
    translationUz: "Eng Oliy Rabbim barcha nuqsondan pokdir!",
    repeatCount: 3,
    ruling: 'FARD',
    educationalWhy: 'Har bir rak\'atda 2 marta sajdah qilish farzdir.',
  },
  {
    id: 'b-f-13',
    stepNumber: 13,
    title: '2-rak\'atga turish va qiroat',
    position: 'Qiyom',
    actionDescription: '"Allohu Akbar" deb qad rostlanadi. Qo‘llar yana bog‘lanadi. Bismillah, Fotiha surasi va boshqa bir zam sura (masalan, Kavsar yoki Falaq) o‘qiladi.',
    arabicText: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ • فَصَلِّ لِرَبِّكَ وَانْحَرْ • إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
    transliteration: "Inna a'toynakal-kavsar. Fa-solli li-robbika vanhar. Inna shani'aka huval-abtar.",
    translationUz: "Albatta, Biz senga Kavsarni berdik. Bas, Robbing uchun namoz o‘qi va qurbonlik qil. Albatta, seni ayblovchining o‘zi naslsizdir.",
    ruling: 'FARD',
    educationalWhy: 'Ikkinchi rak\'atda ham qiyom va qiroat qilinadi. Sano duosi faqat 1-rak\'atda o‘qiladi.',
  },
  {
    id: 'b-f-14',
    stepNumber: 14,
    title: '2-rak\'at Ruku va Sajdalar',
    position: 'Sajdah',
    actionDescription: 'Birinchi rak\'atdagi kabi ruku, qavma va ikki sajdah to‘liq ado etiladi.',
    ruling: 'FARD',
    educationalWhy: 'Harakatlarning takrorlanishi ibodatning mustahkamligi va tartibini ta\'minlaydi.',
  },
  {
    id: 'b-f-15',
    stepNumber: 15,
    title: 'Qa\'dai oxir va Tashahhud (Attahiyyat)',
    position: 'Qada',
    actionDescription: 'Ikkinchi sajdadan so‘ng chap oyoq ustiga o‘tirilib, o‘ng oyoq tik tutiladi. Qo‘llar sonlar ustida. Attahiyyat duosi o‘qiladi. "La ilaha" deyilganda o‘ng qo‘l ko‘rsatkich barmog‘i ko‘tarilib, "illalloh" deyilganda tushiriladi.',
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: "Attahiyyatu lillahi vas-solavatu vat-toyyibat. Assalamu 'alayka ayyuhan-nabiyyu va rohmatullohi va barokatuh. Assalamu 'alayna va 'ala 'ibadillahis-solihiyn. Ashhadu alla ilaha illallohu va ashhadu anna Muhammadan 'abduhu va rosuluh.",
    translationUz: "Barcha salomlar, ibodatlar va pokiza amallar Alloh uchundir. Ey Nabiy! Sizga salom, Allohning rahmati va barakoti bo‘lsin. Bizga va Allohning solih bandalariga salom bo‘lsin. Guvohlik beramanki, Allohdan o‘zga iloh yo‘q va yana guvohlik beramanki, Muhammad Uning bandasi va elchisidir.",
    ruling: 'FARD',
    educationalWhy: 'Oxirgi o‘tirish (qa\'dai oxir) farzdir, unda tashahhud o‘qish esa vojibdir.',
    commonMistake: 'Barmoq ko‘rsatishda qo‘lni butunlay silkitish yoki osmonga qadash.',
  },
  {
    id: 'b-f-16',
    stepNumber: 16,
    title: 'Salovotlar (Allohumma solli va Allohumma barik)',
    position: 'Qada',
    actionDescription: 'Tashahhuddan so‘ng Payg‘ambarimiz Muhammad (s.a.v.) ga salovot aytiladi.',
    arabicText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ ، إِنَّكَ حَمِيدٌ مَجِيدٌ • اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: "Allohumma solli 'ala Muhammadiv-va 'ala ali Muhammad, kama sollayta 'ala Ibrohima va 'ala ali Ibrohim, innaka hamidum-majiyd. Allohumma barik 'ala Muhammadiv-va 'ala ali Muhammad, kama barakta 'ala Ibrohima va 'ala ali Ibrohim, innaka hamidum-majiyd.",
    translationUz: "Allohim! Ibrohimga va uning oilasiga rahmat ko‘rsatganingdek, Muhammadga va u zotning oilasiga ham O‘z rahmatingni yog‘dirgin. Albatta Sen Hamdu maqtovga sazovor, Ulug‘ zotsan. Allohim! Ibrohimga va uning oilasiga baraka berganingdek, Muhammadga va u zotning oilasiga ham O‘z barakangni ato etgin.",
    ruling: 'SUNNAH_MUAKKADA',
    educationalWhy: 'Rasululloh (s.a.v.) ga salovot aytish ulkan fazilatdir va duoning ijobat bo‘lish omilidir.',
  },
  {
    id: 'b-f-17',
    stepNumber: 17,
    title: 'Duo (Robbana atina)',
    position: 'Qada',
    actionDescription: 'Salovotlardan so‘ng dunyo va oxirat yaxshiligini so‘rab duo qilinadi.',
    arabicText: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: "Robbana atina fid-dunya hasanatav-va fil-axiroti hasanatav-va qina 'azaban-nar.",
    translationUz: "Ey Rabbimiz! Bizga dunyoda ham yaxshilik bergin, oxiratda ham yaxshilik bergin va bizni do‘zax olovi azobidan asragin.",
    ruling: 'SUNNAH_MUAKKADA',
    educationalWhy: 'Namoz oxiridagi ushbu Qur\'oniy duo insonning ikki dunyo saodatini qamrab olgan eng go‘zal duodir (Baqara surasi, 201).',
  },
  {
    id: 'b-f-18',
    stepNumber: 18,
    title: 'Salom berish',
    position: 'Salom',
    actionDescription: 'Avval boshni o‘ng yelkaga burib "Assalamu alaykum va rahmatulloh", so‘ng chap yelkaga burib "Assalamu alaykum va rahmatulloh" deyiladi. O‘ngdagi va chapdagi insonlar va farishtalarga salom berish niyat qilinadi.',
    arabicText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: "Assalamu alaykum va rohmatulloh",
    translationUz: "Sizlarga tinchlik va Allohning rahmati bo‘lsin!",
    ruling: 'WAJIB',
    educationalWhy: 'Salom orqali namoz ibodati to‘liq yakunlanadi va inson yana odatiy holatiga qaytadi.',
    commonMistake: 'Salom berayotganda faqat ko‘zni burish yoki gavdani butunlay burib yuborish.',
  },
];

export const BOMDOD_SUNNAT_TRAINER: PrayerStepItem[] = [
  {
    id: 'b-s-1',
    stepNumber: 1,
    title: 'Niyat qilish (Sunnat)',
    position: 'Niyat',
    actionDescription: 'Qiblaga yuzlanib, qalb bilan bugungi Bomdod namozining 2 rak\'at sunnatini o‘qishga qat\'iy niyat qilinadi.',
    arabicText: 'نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ سُنَّةِ صَلَاةِ الْفَجْرِ مُتَوَجِّهًا إِلَى الْقِبْلَةِ',
    transliteration: "Navaytu an usalliya lillahi ta'ala rak'atay sunnati salatil-fajri mutavajjihan ilal-qiblati, Allohu Akbar",
    translationUz: "Alloh taolo roziligi uchun qiblaga yuzlanib, bugungi bomdod namozining 2 rak'at sunnatini o‘qishni niyat qildim.",
    ruling: 'SUNNAH_MUAKKADA',
    educationalWhy: 'Bomdodning 2 rak\'at sunnati eng ta\'kidlangan sunnatdir. Rasululloh (s.a.v.): "Bomdodning ikki rak\'at sunnati dunyo va undagi barcha narsalardan yaxshiroqdir" deganlar (Muslim, 725).',
  },
  ...BOMDOD_FARZ_TRAINER.slice(1).map((s, idx) => ({
    ...s,
    id: `b-s-${idx + 2}`,
    stepNumber: idx + 2,
  })),
];

export const SHOM_FARZ_TRAINER: PrayerStepItem[] = [
  {
    id: 'sh-f-1',
    stepNumber: 1,
    title: 'Niyat qilish (Shom farzi)',
    position: 'Niyat',
    actionDescription: 'Qiblaga yuzlanib, qalb bilan Shom namozining 3 rak\'at farzini o‘qishga niyat qilinadi.',
    arabicText: 'نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى ثَلَاثَ رَكَعَاتِ صَلَاةِ الْمَغْرِبِ فَرْضًا مُتَوَجِّهًا إِلَى الْقِبْلَةِ',
    transliteration: "Navaytu an usalliya lillahi ta'ala salasa raka'ati salatil-mag'ribi farzan mutavajjihan ilal-qiblati, Allohu Akbar",
    translationUz: "Alloh taolo roziligi uchun qiblaga yuzlanib, bugungi shom namozining 3 rak'at farzini o‘qishni niyat qildim.",
    ruling: 'FARD',
    educationalWhy: 'Shom namozi kunduzgi namozlarning vitridir (toq sonli) bo‘lib, 3 rak\'at farz qilib belgilangan.',
  },
  // 1st rakat: Takbir through 2nd sajda (steps 2 to 12)
  ...BOMDOD_FARZ_TRAINER.slice(1, 12).map((s, idx) => ({
    ...s,
    id: `sh-f-${idx + 2}`,
    stepNumber: idx + 2,
  })),
  // 2nd rakat: Qiyom with Fotiha & Zam sura, ruku, 2 sajdah (steps 13, 14 from bomdod)
  {
    ...BOMDOD_FARZ_TRAINER[12],
    id: 'sh-f-13',
    stepNumber: 13,
    title: '2-rak\'at: Qiyom, Fotiha va Zam sura',
  },
  {
    ...BOMDOD_FARZ_TRAINER[13],
    id: 'sh-f-14',
    stepNumber: 14,
    title: '2-rak\'at: Ruku va Sajdalar',
  },
  // Qa'dai avval (first sitting) with Attahiyyat
  {
    id: 'sh-f-15',
    stepNumber: 15,
    title: 'Birinchi o‘tirish (Qa\'dai avval) — Faqat Attahiyyat',
    position: 'Qada',
    actionDescription: '2-rak\'at sajdalaridan so‘ng o‘tiriladi va FAQAT Attahiyyat duosi o‘qiladi. Salovot va duo o‘qilmaydi.',
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ، السَّلَامُ عَلَيْنا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: "Attahiyyatu lillahi vas-solavatu vat-toyyibat...",
    translationUz: "Barcha salomlar, ibodatlar Allohgadir...",
    ruling: 'WAJIB',
    educationalWhy: 'Farz namozlarining birinchi o‘tirishida faqat Attahiyyat o‘qish vojibdir. Salovot qo‘shib yuborilsa, sajdai sahv vojib bo‘ladi.',
  },
  // 3rd rakat: Qiyom (ONLY FOTIHA in 3rd rakat of Farz!)
  {
    id: 'sh-f-16',
    stepNumber: 16,
    title: '3-rak\'atga turish: Faqat Fotiha surasi',
    position: 'Qiyom',
    actionDescription: '"Allohu Akbar" deb 3-rak\'atga turiladi. Qo‘llar kindik ostiga bog‘lanadi. Bismillah aytilib, FAQAT Fotiha surasi o‘qiladi (Zam sura qo‘shilmaydi).',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ...',
    transliteration: "Bismillahir-rohmanir-rohiym. Alhamdulillahi robbil-'alamiyn...",
    translationUz: "Farz namozlarining 3- va 4-rak\'atlarida faqat Fotiha surasi o‘qiladi, zam sura qo‘shilmaydi.",
    ruling: 'FARD',
    educationalWhy: 'Hanafiy fiqhiga binoan, farz namozlarining oxirgi rak\'atlarida faqat Fotiha o‘qish sunnat/farz mezonidir.',
    commonMistake: '3-rak\'at farzda yanglishib zam sura qo‘shib o‘qish.',
  },
  {
    id: 'sh-f-17',
    stepNumber: 17,
    title: '3-rak\'at: Ruku va Sajdalar',
    position: 'Sajdah',
    actionDescription: '"Allohu Akbar" deb ruku qilinadi (3 marta tasbeh), qavma va so‘ngra 2 marta sajdah to‘liq ado etiladi.',
    ruling: 'FARD',
    educationalWhy: 'Uchinchi rak\'at rukusi va ikki sajdasi farz amaldir.',
  },
  // Qa'dai oxir (Attahiyyat + Salovot + Duo + Salom)
  {
    ...BOMDOD_FARZ_TRAINER[14],
    id: 'sh-f-18',
    stepNumber: 18,
    title: 'Oxirgi o‘tirish (Qa\'dai oxir) va Attahiyyat',
  },
  {
    ...BOMDOD_FARZ_TRAINER[15],
    id: 'sh-f-19',
    stepNumber: 19,
  },
  {
    ...BOMDOD_FARZ_TRAINER[16],
    id: 'sh-f-20',
    stepNumber: 20,
  },
  {
    ...BOMDOD_FARZ_TRAINER[17],
    id: 'sh-f-21',
    stepNumber: 21,
  },
];

export const VITR_TRAINER: PrayerStepItem[] = [
  {
    id: 'v-1',
    stepNumber: 1,
    title: 'Niyat qilish (3 rak\'at Vitr vojib)',
    position: 'Niyat',
    actionDescription: 'Qiblaga yuzlanib, qalb bilan 3 rak\'at Vitr vojib namozini o‘qishga niyat qilinadi.',
    arabicText: 'نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى ثَلَاثَ رَكَعَاتِ صَلَاةِ الْوِتْرِ وَاجِبًا مُتَوَجِّهًا إِلَى الْقِبْلَةِ',
    transliteration: "Navaytu an usalliya lillahi ta'ala salasa raka'ati salatil-vitri vajiban mutavajjihan ilal-qiblati, Allohu Akbar",
    translationUz: "Alloh taolo roziligi uchun qiblaga yuzlanib, bugungi 3 rak'at vitr vojib namozini o‘qishni niyat qildim.",
    ruling: 'WAJIB',
    educationalWhy: 'Hanafiy mazhabida Vitr namozi vojib hisoblanadi. Uni tark etish joiz emas, qazo bo‘lsa qazosi o‘qiladi.',
  },
  // 1st rakat: Takbir to 2nd sajda (steps 2 to 12)
  ...BOMDOD_FARZ_TRAINER.slice(1, 12).map((s, idx) => ({
    ...s,
    id: `v-${idx + 2}`,
    stepNumber: idx + 2,
  })),
  // 2nd rakat
  {
    ...BOMDOD_FARZ_TRAINER[12],
    id: 'v-13',
    stepNumber: 13,
    title: '2-rak\'at: Qiyom, Fotiha va Zam sura',
  },
  {
    ...BOMDOD_FARZ_TRAINER[13],
    id: 'v-14',
    stepNumber: 14,
    title: '2-rak\'at: Ruku va Sajdalar',
  },
  // Qa'dai avval (first sitting)
  {
    id: 'v-15',
    stepNumber: 15,
    title: 'Birinchi o‘tirish (Qa\'dai avval) — Attahiyyat',
    position: 'Qada',
    actionDescription: '2-rak\'at sajdalaridan so‘ng o‘tirilib, faqat Attahiyyat duosi o‘qiladi.',
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ...',
    transliteration: "Attahiyyatu lillahi vas-solavatu vat-toyyibat...",
    translationUz: "Barcha ibodatlar va salomlar Allohgadir...",
    ruling: 'WAJIB',
    educationalWhy: 'Vitr namozi o‘rtasidagi birinchi o‘tirish vojibdir.',
  },
  // 3rd rakat: Fotiha + Zam sura
  {
    id: 'v-16',
    stepNumber: 16,
    title: '3-rak\'at: Fotiha va Zam sura',
    position: 'Qiyom',
    actionDescription: '"Allohu Akbar" deb 3-rak\'atga turiladi. Qo‘llar bog‘lanadi. Bismillah, Fotiha surasi va biror zam sura (masalan, Ixlos yoki Falaq) o‘qiladi.',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ... • قُلْ هُوَ اللَّهُ أَحَدٌ ...',
    transliteration: "Fotiha surasi va zam sura to‘liq o‘qiladi.",
    translationUz: "Vitrning barcha 3 ta rak\'atida ham Fotihaga sura qo‘shib o‘qish vojibdir.",
    ruling: 'WAJIB',
    educationalWhy: 'Farzdan farqli o‘laroq, Vitr namozining 3-rak\'atida ham zam sura o‘qish vojibdir.',
  },
  // 3rd rakat: QUNUT TAKBIRI (Unique Hanafiy practice!)
  {
    id: 'v-17',
    stepNumber: 17,
    title: 'Qunut takbiri (Qo‘llarni quloqqa ko‘tarish)',
    position: 'Takbir',
    actionDescription: '3-rak\'at zam surasidan so‘ng ruku\'ga ketilmaydi! Tik turgan holda qo‘llar quloq barobariga ko‘tarilib "Allohu Akbar" deb takbir aytiladi va qo‘llar qayta kindik ostiga bog‘lanadi.',
    arabicText: 'اللَّهُ أَكْبَرُ',
    transliteration: "Allohu Akbar",
    translationUz: "Alloh buyukdir!",
    ruling: 'WAJIB',
    educationalWhy: 'Vitr namozida Qunut duosidan oldin takbir aytib qo‘llarni ko‘tarish Hanafiy mazhabida vojibdir.',
    commonMistake: 'Takbir aytmasdan to‘g‘ridan-to‘g‘ri ruku\'ga ketib qolish yoki Qunutni unutish.',
  },
  // 3rd rakat: QUNUT DUOSI
  {
    id: 'v-18',
    stepNumber: 18,
    title: 'Qunut duosi',
    position: 'Qiyom',
    actionDescription: 'Qo‘llar bog‘langan holda maxfiy (ichda) Qunut duosi o‘qiladi.',
    arabicText: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ ، وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ ، وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ ، نَشْكُرُكَ وَلَا نَكْفُرُكَ ، وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ • اللَّهُمَّ إِيَّاكَ نَعْبُدُ ، وَلَكَ نُصَلِّي وَنَسْجُدُ ، وَإِلَيْكَ نَسْعَى وَنَحْفِدُ ، نَرْجُو رَحْمَتَكَ وَنَخْشَى عَذَابَكَ ، إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحَقٌ',
    transliteration: "Allohumma inna nasta'iynuka va nastag'firuka va nastahdiyka, va nu'minu bika va natubu ilayk, va natavakkalu 'alayka va nusniy 'alaykal-xoyro kullah, nashkuruka va la nakfuruk, va naxla'u va natruku may-yafjuruk. Allohumma iyyaka na'bud, va laka nusolliy va nasjud, va ilayka nas'a va nahfid, narju rohmataka va naxsha 'azabak, inna 'azabaka bil-kuffari mulhaq.",
    translationUz: "Allohim! Albatta biz Sendan yordam, mag‘firat va hidoyat so‘raymiz. Senga iymon keltiramiz va Senga tavba qilamiz. Senga tavakkul qilamiz va barcha yaxshiliklar ila Senga maqtov aytamiz. Senga shukr qilamiz, noshukrlik qilmaymiz. Senga fojirlik (isyon) qiluvchilarni tark etamiz. Allohim! Faqat Sengagina ibodat qilamiz, Sen uchungina namoz o‘qiymiz va sajdah qilamiz. Sening dargohingga shoshilamiz. Rahmatingdan umidvormiz va azobingdan qo‘rqamiz. Albatta, Sening haqliq azobing kofirlarga yetguvchidir.",
    ruling: 'WAJIB',
    educationalWhy: 'Vitr namozida Qunut duosini o‘qish Hanafiy mazhabida vojibdir. Agar unutilsa, sajdai sahv qilinadi.',
  },
  // 3rd rakat: Ruku & Sajdah
  {
    id: 'v-19',
    stepNumber: 19,
    title: '3-rak\'at: Ruku va Sajdalar',
    position: 'Sajdah',
    actionDescription: 'Qunut duosidan so‘ng "Allohu Akbar" deb ruku qilinadi, so‘ngra 2 marta sajdah to‘liq ado etiladi.',
    ruling: 'FARD',
    educationalWhy: 'Ruku va sajdalar farz amallardir.',
  },
  // Qa'dai oxir
  {
    ...BOMDOD_FARZ_TRAINER[14],
    id: 'v-20',
    stepNumber: 20,
    title: 'Oxirgi o‘tirish va Attahiyyat',
  },
  {
    ...BOMDOD_FARZ_TRAINER[15],
    id: 'v-21',
    stepNumber: 21,
  },
  {
    ...BOMDOD_FARZ_TRAINER[16],
    id: 'v-22',
    stepNumber: 22,
  },
  {
    ...BOMDOD_FARZ_TRAINER[17],
    id: 'v-23',
    stepNumber: 23,
  },
];

export function getPrayerTrainerSession(presetId: string): {
  id: string;
  nameUz: string;
  totalRakats: number;
  steps: PrayerStepItem[];
} {
  switch (presetId) {
    case 'bomdod-sunnat':
      return {
        id: 'bomdod-sunnat',
        nameUz: 'Bomdod namozi (2 rak\'at sunnat)',
        totalRakats: 2,
        steps: BOMDOD_SUNNAT_TRAINER,
      };
    case 'shom-farz':
      return {
        id: 'shom-farz',
        nameUz: 'Shom namozi (3 rak\'at farz)',
        totalRakats: 3,
        steps: SHOM_FARZ_TRAINER,
      };
    case 'vitr':
      return {
        id: 'vitr',
        nameUz: 'Vitr namozi (3 rak\'at vojib — Qunut bilan)',
        totalRakats: 3,
        steps: VITR_TRAINER,
      };
    case 'bomdod-farz':
    default:
      return {
        id: 'bomdod-farz',
        nameUz: 'Bomdod namozi (2 rak\'at farz)',
        totalRakats: 2,
        steps: BOMDOD_FARZ_TRAINER,
      };
  }
}
