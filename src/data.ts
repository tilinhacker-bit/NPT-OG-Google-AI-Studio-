export interface Contact {
  name: string;
  phone?: string;
}

export interface WardRound {
  postop: string;
  pn: string;
}

export interface DailyInfo {
  SCS: string;
  JCS: string;
  SAS: string;
  AS_Group: string;
  WR: WardRound | null;
  Med_name?: string;
  Med_phone?: string;
}

export interface RosterDay {
  month: number;
  d: number;
  roles: { [group: string]: string };
  dateStr: string;
}

export interface FactOrQuote {
  en: string;
  mm: string;
}

export const STOIC_QUOTES: FactOrQuote[] = [
  {
    en: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    mm: "သင်သည် မိမိစိတ်ကိုသာ အစိုးရ၏၊ ပြင်ပဖြစ်ရပ်များကို မဟုတ်။ ဤအချက်ကို သဘောပေါက်ပါက ခွန်အားသစ်ကို ရရှိလိမ့်မည်။"
  },
  {
    en: "The best revenge is to be unlike him who performed the injury.",
    mm: "အကောင်းဆုံး လက်စားချေခြင်းသည် သင့်ကို ထိခိုက်စေခဲ့သူနှင့် မတူအောင် နေထိုင်ခြင်းပင် ဖြစ်သည်။"
  },
  {
    en: "We suffer more often in imagination than in reality.",
    mm: "ကျွန်ုပ်တို့သည် လက်တွေ့ထက် စိတ်ကူးထဲတွင် ပိုမို၍ ဆင်းရဲဒုက္ခ ခံစားရတတ်သည်။"
  },
  {
    en: "Waste no more time arguing about what a good man should be. Be one.",
    mm: "လူကောင်းတစ်ယောက် မည်သို့ဖြစ်သင့်သည်ကို ငြင်းခုံနေခြင်းဖြင့် အချိန်မဖြုန်းပါနှင့်။ ကိုယ်တိုင် လူကောင်းတစ်ယောက် ဖြစ်အောင် နေပါ။"
  },
  {
    en: "Difficulties strengthen the mind, as labor does the body.",
    mm: "လုပ်အားသည် ခန္ဓာကိုယ်ကို သန်မာစေသကဲ့သို့၊ အခက်အခဲများသည် စိတ်ဓာတ်ကို ခိုင်မာစေသည်။"
  },
  {
    en: "He who fears death will never do anything worth of a man who is alive.",
    mm: "သေခြင်းတရားကို ကြောက်ရွံ့သောသူသည် အသက်ရှင်လျက် တန်ဖိုးရှိသော အမှုကိစ္စကို ဘယ်သောအခါမျှ လုပ်ဆောင်နိုင်မည်မဟုတ်။"
  },
  {
    en: "It is not that we have a short time to live, but that we waste a lot of it.",
    mm: "ကျွန်ုပ်တို့ အသက်ရှင်ရန် အချိန်တိုတောင်းလှသည် မဟုတ်ဘဲ၊ ထိုအချိန်များကို အလဟသ ဖြုန်းတီးပစ်ကြခြင်းသာ ဖြစ်သည်။"
  }
];

export const OBGYN_FACTS: FactOrQuote[] = [
  {
    en: "Postpartum Hemorrhage (PPH) is traditionally defined as blood loss >500 mL after vaginal delivery or >1000 mL after cesarean section.",
    mm: "မွေးဖွားပြီး သွေးသွန်ခြင်း (PPH) ကို သဘာဝအတိုင်း မွေးဖွားပြီးနောက် သွေးဆုံးရှုံးမှု ၅၀၀ စီစီ ထက်ကျော်လွန်ခြင်း သို့မဟုတ် ဗိုက်ခွဲမွေးပြီးနောက် ၁၀၀၀ စီစီ ထက်ကျော်လွန်ခြင်းဟု သတ်မှတ်သည်။"
  },
  {
    en: "Active Management of the Third Stage of Labor (AMTSL) includes administration of a uterotonic agent, controlled cord traction, and uterine massage.",
    mm: "မွေးဖွားခြင်း တတိယအဆင့်ကို တက်ကြွစွာ စီမံခန့်ခွဲခြင်း (AMTSL) တွင် သားအိမ်ညှစ်ဆေးပေးခြင်း၊ ချက်ကြိုးကို ထိန်းညှိဆွဲခြင်းနှင့် သားအိမ်နှိပ်နယ်ခြင်းတို့ ပါဝင်သည်။"
  },
  {
    en: "Magnesium sulfate is the anticonvulsant of choice for both preventing and treating eclamptic seizures.",
    mm: "မဂ္ဂနီစီယမ်ဆာလ်ဖိတ် (Magnesium sulfate) သည် ကိုယ်ဝန်ဆောင်အတက်ရောဂါကို ကာကွယ်ရန်နှင့် ကုသရန်အတွက် အသုံးပြုရမည့် အကောင်းဆုံးဆေးဖြစ်သည်။"
  },
  {
    en: "An APGAR score at 1 and 5 minutes helps evaluate the newborn's physical condition and immediate need for resuscitation.",
    mm: "မွေးကင်းစကလေး၏ ရုပ်ပိုင်းဆိုင်ရာ အခြေအနေနှင့် ချက်ချင်း အသက်ရှူနှုန်း ကူညီရန် လိုမလိုကို ၁ မိနစ်နှင့် ၅ မိနစ်တွင် တိုင်းတာသော APGAR အမှတ်ဖြင့် ဆန်းစစ်သည်။"
  },
  {
    en: "Preeclampsia is characterized by new-onset hypertension (BP ≥ 140/90) and proteinuria or end-organ dysfunction after 20 weeks of gestation.",
    mm: "ကိုယ်ဝန်ဆိပ်တက်ခြင်း (Preeclampsia) သည် ကိုယ်ဝန်သက်တမ်း အပတ် ၂၀ နောက်ပိုင်းတွင် သွေးတိုးခြင်း (၁၄၀/၉၀ ထက်ကျော်ခြင်း) နှင့် ဆီးတွင်းပရိုတင်းပါခြင်း သို့မဟုတ် ကိုယ်တွင်းအင်္ဂါ ချို့ယွင်းခြင်းများဖြင့် ပြသလေ့ရှိသည်။"
  },
  {
    en: "The four 'Ts' of Postpartum Hemorrhage etiology are Tone (atony), Tissue (retained placenta), Trauma (lacerations), and Thrombin (coagulopathy).",
    mm: "မွေးဖွားပြီးနောက် သွေးသွန်ခြင်း၏ အဓိက အကြောင်းရင်း ၄ ရပ် (4 Ts) မှာ Tone (သားအိမ်မညှစ်ခြင်း)၊ Tissue (အချင်းကျန်ခြင်း)၊ Trauma (ပြဲပြဲစုတ်ပြတ်ခြင်း) နှင့် Thrombin (သွေးခဲစနစ်ချို့ယွင်းခြင်း) တို့ဖြစ်သည်။"
  },
  {
    en: "Cervical dilation of 1 cm/hour for primigravida and 1.2 cm/hour for multigravida is the traditional alert line in partograph monitoring.",
    mm: "မွေးဖွားမှုမှတ်တမ်း (Partograph) တွင် ပထမကိုယ်ဝန်အတွက် တစ်နာရီလျှင် ၁ စင်တီမီတာနှင့် နောက်ကိုယ်ဝန်များအတွက် ၁.၂ စင်တီမီတာ သားအိမ်ဝပွင့်ခြင်းသည် သတိပေးလိုင်းဖြစ်သည်။"
  }
];

export const MM_NAMES: Record<string, string> = {
  "Myat Myat Aung": "မြတ်မြတ်အောင်",
  "Wah Wah Win Hlaing": "ဝါဝါဝင်းလှိုင်",
  "Win Min Than": "ဝင်းမင်းသန်း",
  "Aye Myint Thet": "အေးမြင့်သက်",
  "Darli Nyein Chan": "ဒါလီငြိမ်းချမ်း",
  "Linn Bo": "လင်းဗိုလ်",
  "Nay Aung Oo": "နေအောင်ဦး",
  "Kay Thi Myo Myint": "ကေသီမျိုးမြင့်",
  "Cho May Mi Htet Naung": "ချိုမေမီထက်နောင်",
  "Yin Mon Aung": "ယဉ်မွန်အောင်",
  "Kay Kay Khine": "ကေကေခိုင်",
  "Nway Nay Chi Hlaing": "နွေးနေခြည်လှိုင်",
  "Phyo Zin Maung": "ဖြိုးဇင်မောင်",
  "Theint Thinzar Kyaw": "သိမ့်သင်ဇာကျော်",
  "Phyu Sin Aye": "ဖြူစင်အေး",
  "Myo Thwin Thein": "မျိုးသွင်သိန်း",
  "Htet Phyo Kyaw": "ထက်ဖြိုးကျော်",
  "Han Myint Mo Mo": "ဟန်မြင့်မိုမို",
  "Nang Sanda Htun": "နန်းစန္ဒာထွန်း",
  "May Thu Khaing": "မေသူခိုင်",
  "Hlaing Myo Oo": "လှိုင်မျိုးဦး",
  "Thukha Wynn": "သုခဝင်း",
  "Nay Linn Oo": "နေလင်းဦး",
  "Myat Min Khant": "မြတ်မင်းခန့်",
  "Phoo Pyae Pyae Hlaing": "ဖူးပြည့်ပြည့်လှိုင်",
  "Phu Myat Thwe": "ဖူးမြတ်သွယ်",
  "Myo Min Kyaw": "မျိုးမင်းကျော်",
  "Myat Mon Mon Kyaw": "မြတ်မွန်မွန်ကျော်",
  "May Thet Paing Kyaw": "မေသက်ပိုင်ကျော်",
  "Aung Kaung Thant Kyaw": "အောင်ကောင်းသန့်ကျော်",
  "Dazen Kyaw": "ဒါဇင်ကျော်",
  "Hsu Mon Kyaw": "ဆုမွန်ကျော်",
  "Kaung Myat Htal": "ကောင်းမြတ်ထယ်",
  "Mon Mon Thant": "မွန်မွန်သန့်",
  "Mon Mon Theint Kyaw": "မွန်မွန်သိမ့်ကျော်"
};

export const DATA = {
  duties: {
    A: {
      7: [1, 5, 9, 13, 16, 19, 22, 25, 29],
      8: [1, 4, 7, 11, 14, 17, 20, 23, 25],
      9: [11, 15, 19, 23, 27]
    } as { [month: number]: number[] },
    B: {
      7: [2, 6, 10, 14, 17, 20, 23, 27, 30],
      8: [2, 5, 8, 10, 27, 30],
      9: [2, 5, 8, 12, 16, 20, 24, 28]
    } as { [month: number]: number[] },
    C: {
      7: [3, 7, 12, 15, 18, 21, 24, 26],
      8: [12, 15, 18, 21, 24, 28, 31],
      9: [3, 6, 9, 13, 17, 21, 25, 29]
    } as { [month: number]: number[] },
    D: {
      7: [4, 8, 11, 28, 31],
      8: [3, 6, 9, 13, 16, 19, 22, 26, 29],
      9: [1, 4, 7, 10, 14, 18, 22, 26, 30]
    } as { [month: number]: number[] }
  } as { [group: string]: { [month: number]: number[] } },

  nightOffs: {
    A: {
      7: [2, 6, 10, 14, 17, 20, 23, 26, 30],
      8: [2, 5, 8, 12, 15, 18, 21, 24, 26],
      9: [12, 16, 20, 24, 28]
    } as { [month: number]: number[] },
    B: {
      7: [3, 7, 11, 15, 18, 21, 24, 28, 31],
      8: [3, 6, 9, 11, 28, 31],
      9: [3, 6, 9, 13, 17, 21, 25, 29]
    } as { [month: number]: number[] },
    C: {
      7: [4, 8, 13, 16, 19, 22, 25, 27],
      8: [13, 16, 19, 22, 25, 29],
      9: [1, 4, 7, 10, 14, 18, 22, 26, 30]
    } as { [month: number]: number[] },
    D: {
      7: [1, 5, 9, 12, 29],
      8: [1, 4, 7, 10, 14, 17, 20, 23, 27, 30],
      9: [2, 5, 8, 11, 15, 19, 23, 27]
    } as { [month: number]: number[] }
  } as { [group: string]: { [month: number]: number[] } },

  anesBlocks: {
    A: { startM: 8, startD: 27, endM: 9, endD: 10 },
    B: { startM: 8, startD: 12, endM: 8, endD: 26 },
    C: { startM: 7, startD: 28, endM: 8, endD: 11 },
    D: { startM: 7, startD: 13, endM: 7, endD: 27 }
  } as { [group: string]: { startM: number; startD: number; endM: number; endD: number } },

  dailyInfo: {
    "2026-07-01": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Kay Thi Myo Myint", "AS_Group": "Group 1", "WR": null, "Med_name": "SAS Dr. Yin Mon Aung", "Med_phone": "09 799 969 997" },
    "2026-07-02": { "SCS": "Dr. Win Min Than", "JCS": "Dr. Darli Nyein Chan", "SAS": "Dr. Linn Bo", "AS_Group": "Group 2", "WR": null, "Med_name": "SAS Dr. Yin Mon Aung", "Med_phone": "09 799 969 997" },
    "2026-07-03": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "-", "SAS": "Dr. Cho May Mi Htet Naung", "AS_Group": "Group 3", "WR": null, "Med_name": "SAS Dr. Yin Mon Aung", "Med_phone": "09 799 969 997" },
    "2026-07-04": { "SCS": "Dr. Myat Myat Aung", "JCS": "Dr. Aye Myint Thet", "SAS": "Dr. Nay Aung Oo", "AS_Group": "Group 1", "WR": null, "Med_name": "SAS Dr. Yin Mon Aung", "Med_phone": "09 799 969 997" },
    "2026-07-05": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Kay Thi Myo Myint", "AS_Group": "Group 2", "WR": null, "Med_name": "SAS Dr. Kay Kay Khine", "Med_phone": "09 765 005 367" },
    "2026-07-06": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "-", "SAS": "Dr. Linn Bo", "AS_Group": "Group 3", "WR": { "postop": "Dr TKW", "pn": "Dr NLO" }, "Med_name": "SAS Dr. Kay Kay Khine", "Med_phone": "09 765 005 367" },
    "2026-07-07": { "SCS": "Dr. Myat Myat Aung", "JCS": "Dr. Darli Nyein Chan", "SAS": "Dr. Cho May Mi Htet Naung", "AS_Group": "Group 1", "WR": { "postop": "Dr MTK", "pn": "Dr HMO" }, "Med_name": "SAS Dr. Kay Kay Khine", "Med_phone": "09 765 005 367" },
    "2026-07-08": { "SCS": "Dr. Win Min Than", "JCS": "-", "SAS": "Dr. Nay Aung Oo", "AS_Group": "Group 2", "WR": { "postop": "Dr HMMM", "pn": "Dr NSDT" }, "Med_name": "SAS Dr. Kay Kay Khine", "Med_phone": "09 765 005 367" },
    "2026-07-09": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "Dr. Aye Myint Thet", "SAS": "Dr. Kay Thi Myo Myint", "AS_Group": "Group 3", "WR": { "postop": "Dr NLO", "pn": "Dr TKW" }, "Med_name": "SAS Dr. Nway Nay Chi Hlaing", "Med_phone": "09 518 6364" },
    "2026-07-10": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Linn Bo", "AS_Group": "Group 1", "WR": { "postop": "Dr HMO", "pn": "Dr MTK" }, "Med_name": "SAS Dr. Nway Nay Chi Hlaing", "Med_phone": "09 518 6364" },
    "2026-07-11": { "SCS": "Dr. Win Min Than", "JCS": "-", "SAS": "Dr. Cho May Mi Htet Naung", "AS_Group": "Group 2", "WR": null, "Med_name": "SAS Dr. Nway Nay Chi Hlaing", "Med_phone": "09 518 6364" },
    "2026-07-12": { "SCS": "Dr. Win Min Than", "JCS": "Dr. Darli Nyein Chan", "SAS": "Dr. Nay Aung Oo", "AS_Group": "Group 3", "WR": null, "Med_name": "SAS Dr. Nway Nay Chi Hlaing", "Med_phone": "09 518 6364" },
    "2026-07-13": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Kay Thi Myo Myint", "AS_Group": "Group 1", "WR": { "postop": "Dr MTK", "pn": "Dr HMO" }, "Med_name": "SAS Dr. Phyo Zin Maung", "Med_phone": "09 456 155 485" },
    "2026-07-14": { "SCS": "Dr. Win Min Than", "JCS": "Dr. Aye Myint Thet", "SAS": "Dr. Linn Bo", "AS_Group": "Group 2", "WR": { "postop": "Dr NSDT", "pn": "Dr HMMM" }, "Med_name": "SAS Dr. Phyo Zin Maung", "Med_phone": "09 456 155 485" },
    "2026-07-15": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "-", "SAS": "Dr. Cho May Mi Htet Naung", "AS_Group": "Group 3", "WR": { "postop": "Dr TKW", "pn": "Dr NLO" }, "Med_name": "SAS Dr. Phyo Zin Maung", "Med_phone": "09 456 155 485" },
    "2026-07-16": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Nay Aung Oo", "AS_Group": "Group 1", "WR": { "postop": "Dr HMO", "pn": "Dr MTK" }, "Med_name": "SAS Dr. Phyo Zin Maung", "Med_phone": "09 456 155 485" },
    "2026-07-17": { "SCS": "Dr. Win Min Than", "JCS": "Dr. Darli Nyein Chan", "SAS": "Dr. Kay Thi Myo Myint", "AS_Group": "Group 2", "WR": { "postop": "Dr HMMM", "pn": "Dr NSDT" }, "Med_name": "SAS Dr. Theint Thinzar Kyaw", "Med_phone": "09 443 153 586" },
    "2026-07-18": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "-", "SAS": "Dr. Linn Bo", "AS_Group": "Group 3", "WR": null, "Med_name": "SAS Dr. Theint Thinzar Kyaw", "Med_phone": "09 443 153 586" },
    "2026-07-19": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "Dr. Aye Myint Thet", "SAS": "Dr. Cho May Mi Htet Naung", "AS_Group": "Group 1", "WR": null, "Med_name": "SAS Dr. Theint Thinzar Kyaw", "Med_phone": "09 443 153 586" },
    "2026-07-20": { "SCS": "Dr. Win Min Than", "JCS": "-", "SAS": "Dr. Nay Aung Oo", "AS_Group": "Group 2", "WR": { "postop": "Dr NSDT", "pn": "Dr HMMM" }, "Med_name": "SAS Dr. Theint Thinzar Kyaw", "Med_phone": "09 443 153 586" },
    "2026-07-21": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "-", "SAS": "Dr. Kay Thi Myo Myint", "AS_Group": "Group 3", "WR": { "postop": "Dr NLO", "pn": "Dr TKW" }, "Med_name": "SAS Dr. Phyu Sin Aye", "Med_phone": "09 254 565 451" },
    "2026-07-22": { "SCS": "Dr. Myat Myat Aung", "JCS": "Dr. Darli Nyein Chan", "SAS": "Dr. Linn Bo", "AS_Group": "Group 1", "WR": { "postop": "Dr MTK", "pn": "Dr HMO" }, "Med_name": "SAS Dr. Phyu Sin Aye", "Med_phone": "09 254 565 451" },
    "2026-07-23": { "SCS": "Dr. Win Min Than", "JCS": "-", "SAS": "Dr. Cho May Mi Htet Naung", "AS_Group": "Group 2", "WR": { "postop": "Dr HMMM", "pn": "Dr NSDT" }, "Med_name": "SAS Dr. Phyu Sin Aye", "Med_phone": "09 254 565 451" },
    "2026-07-24": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "Dr. Aye Myint Thet", "SAS": "Dr. Nay Aung Oo", "AS_Group": "Group 3", "WR": { "postop": "Dr TKW", "pn": "Dr NLO" }, "Med_name": "SAS Dr. Phyu Sin Aye", "Med_phone": "09 254 565 451" },
    "2026-07-25": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Kay Thi Myo Myint", "AS_Group": "Group 1", "WR": null, "Med_name": "SAS Dr. Myo Thwin Thein", "Med_phone": "09 264 643 399" },
    "2026-07-26": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Linn Bo", "AS_Group": "Group 2", "WR": null, "Med_name": "SAS Dr. Myo Thwin Thein", "Med_phone": "09 264 643 399" },
    "2026-07-27": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "Dr. Darli Nyein Chan", "SAS": "Dr. Cho May Mi Htet Naung", "AS_Group": "Group 3", "WR": { "postop": "Dr NLO", "pn": "Dr TKW" }, "Med_name": "SAS Dr. Myo Thwin Thein", "Med_phone": "09 264 643 399" },
    "2026-07-28": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Nay Aung Oo", "AS_Group": "Group 1", "WR": { "postop": "Dr HMO", "pn": "Dr MTK" }, "Med_name": "SAS Dr. Myo Thwin Thein", "Med_phone": "09 264 643 399" },
    "2026-07-29": { "SCS": "Dr. Win Min Than", "JCS": "Dr. Aye Myint Thet", "SAS": "Dr. Kay Thi Myo Myint", "AS_Group": "Group 2", "WR": null, "Med_name": "SAS Dr. Htet Phyo Kyaw", "Med_phone": "09 974 302 664 / 09 681 364 292" },
    "2026-07-30": { "SCS": "Dr. Wah Wah Win Hlaing", "JCS": "-", "SAS": "Dr. Linn Bo", "AS_Group": "Group 3", "WR": { "postop": "Dr TKW", "pn": "Dr NLO" }, "Med_name": "SAS Dr. Htet Phyo Kyaw", "Med_phone": "09 974 302 664 / 09 681 364 292" },
    "2026-07-31": { "SCS": "Dr. Myat Myat Aung", "JCS": "-", "SAS": "Dr. Cho May Mi Htet Naung", "AS_Group": "Group 1", "WR": { "postop": "Dr MTK", "pn": "Dr HMO" }, "Med_name": "SAS Dr. Htet Phyo Kyaw", "Med_phone": "09 974 302 664 / 09 681 364 292" }
  } as { [dateStr: string]: DailyInfo },

  ho_directory: {
    "A": [
      { name: "Dr. Myat Min Khant", phone: "09440076868" },
      { name: "Dr. Phoo Pyae Pyae Hlaing", phone: "09978144352" },
      { name: "Dr. Phu Myat Thwe", phone: "09970743532" }
    ],
    "B": [
      { name: "Dr. Myo Min Kyaw", phone: "09261463976" },
      { name: "Dr. Myat Mon Mon Kyaw", phone: "092130724" },
      { name: "Dr. May Thet Paing Kyaw", phone: "09424943829" }
    ],
    "C": [
      { name: "Dr. Aung Kaung Thant Kyaw", phone: "09660160164" },
      { name: "Dr. Dazen Kyaw", phone: "09780920988" },
      { name: "Dr. Hsu Mon Kyaw", phone: "09445144704" }
    ],
    "D": [
      { name: "Dr. Kaung Myat Htal", phone: "09420707474" },
      { name: "Dr. Mon Mon Thant", phone: "09789686980" },
      { name: "Dr. Mon Mon Theint Kyaw", phone: "09452887045" }
    ]
  } as { [group: string]: Contact[] },

  as_directory: {
    "1": [
      { name: "Dr. Han Myint Mo Mo", phone: "09261618203" },
      { name: "Dr. Nang Sanda Htun", phone: "09262779715" }
    ],
    "2": [
      { name: "Dr. May Thu Khaing", phone: "09971170360" },
      { name: "Dr. Hlaing Myo Oo", phone: "09894702485" }
    ],
    "3": [
      { name: "Dr. Thukha Wynn", phone: "09424752640" },
      { name: "Dr. Nay Linn Oo", phone: "09793519374" }
    ]
  } as { [group: string]: Contact[] },

  directory_layout: [
    {
      header: "Senior Consultants (SCS)",
      contacts: [
        { name: "Dr. Myat Myat Aung" },
        { name: "Dr. Wah Wah Win Hlaing" },
        { name: "Dr. Win Min Than" }
      ] as Contact[]
    },
    {
      header: "Junior Consultants (JCS)",
      contacts: [
        { name: "Dr. Aye Myint Thet" },
        { name: "Dr. Darli Nyein Chan" }
      ] as Contact[]
    },
    {
      header: "Senior Assistant Surgeons (SAS)",
      contacts: [
        { name: "Dr. Linn Bo" },
        { name: "Dr. Nay Aung Oo" },
        { name: "Dr. Kay Thi Myo Myint" },
        { name: "Dr. Cho May Mi Htet Naung" }
      ] as Contact[]
    }
  ] as { header: string; contacts: Contact[] }[]
};
