import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Calendar, 
  User, 
  Layers, 
  Stethoscope, 
  Check, 
  X,
  FileText,
  Activity,
  Heart
} from "lucide-react";

export interface OTCase {
  id: string;
  category: "Gynaecology" | "Obstetrics";
  no: string;
  name: string;
  age: string;
  rn: string;
  bwHeight: string;
  diagnosis: string;
  procedure: string;
  surgeon: string;
  remarks: string;
}

interface OTListWidgetProps {
  lang: string;
}

const LABELS_LANG: Record<string, Record<string, string>> = {
  en: {
    otListTitle: "Operating Theater (OT) List",
    otListDesc: "Official Scheduled Operations and Surgical Teams for July 2, 2026",
    noCases: "No OT cases listed. Add a new surgical case below.",
    addCase: "Add Case",
    editCase: "Edit OT Case",
    patientName: "Name",
    age: "Age",
    rn: "Reg. No (RN)",
    bwHeight: "BW & Height",
    diagnosis: "Diagnosis",
    operation: "Procedure / Operation",
    surgeon: "Surgeon & Assistant",
    remarks: "Remarks",
    saveCase: "Save Case",
    updateCase: "Update Case",
    cancel: "Cancel",
    actions: "Actions",
    category: "Category",
    gynaecology: "Gynaecology (Gyn)",
    obstetrics: "Obstetrics (Obs)",
    patientPlaceholder: "e.g. Daw Tin Tin Win",
    agePlaceholder: "e.g. 52 yr",
    rnPlaceholder: "e.g. 3388",
    bwHeightPlaceholder: "e.g. 70kg, 5'",
    diagnosisPlaceholder: "e.g. Single with Multiple uterine myoma...",
    operationPlaceholder: "e.g. TAH + BSO",
    surgeonPlaceholder: "e.g. SCS Dr MMA + CS Dr AMT",
    remarksPlaceholder: "e.g. Inf: All NR, WB 2 U reserved",
    deleteConfirm: "Are you sure you want to delete this case?",
  },
  zh: {
    otListTitle: "手术安排表 (OT List)",
    otListDesc: "2026年7月2日官方手术安排与医疗团队",
    noCases: "暂无手术安排。可在下方添加。",
    addCase: "添加病例",
    editCase: "编辑手术病例",
    patientName: "姓名",
    age: "年龄",
    rn: "登记号 (RN)",
    bwHeight: "体重与身高",
    diagnosis: "临床诊断",
    operation: "手术步骤 / 术式",
    surgeon: "主刀与助手",
    remarks: "备注/预留血",
    saveCase: "保存病例",
    updateCase: "更新病例",
    cancel: "取消",
    actions: "操作",
    category: "科室分类",
    gynaecology: "妇科 (Gynaecology)",
    obstetrics: "产科 (Obstetrics)",
    patientPlaceholder: "例如：Daw Tin Tin Win",
    agePlaceholder: "例如：52 岁",
    rnPlaceholder: "例如：3388",
    bwHeightPlaceholder: "例如：70kg, 5'",
    diagnosisPlaceholder: "例如：单身，多发性子宫肌瘤...",
    operationPlaceholder: "例如：TAH + BSO",
    surgeonPlaceholder: "例如：SCS Dr MMA + CS Dr AMT",
    remarksPlaceholder: "例如：Inf: All NR, 备血 2 单位",
    deleteConfirm: "确定要删除此手术病例吗？",
  },
  mm: {
    otListTitle: "ခွဲစိတ်ကုသမှုစာရင်း (OT List)",
    otListDesc: "၂၀၂၆ ခုနှစ်၊ ဇူလိုင်လ ၂ ရက်နေ့အတွက် ခွဲစိတ်ကုသမှုအလှည့်နှင့် အဖွဲ့များ",
    noCases: "ခွဲစိတ်မှုဇယား မရှိသေးပါ။ အောက်တွင် အသစ်ထည့်သွင်းပါ။",
    addCase: "အသစ်ထည့်ရန်",
    editCase: "ခွဲစိတ်မှုဇယား ပြင်ဆင်ရန်",
    patientName: "အမည်",
    age: "အသက်",
    rn: "ဆေးရုံအမှတ် (RN)",
    bwHeight: "ကိုယ်အလေးချိန်နှင့် အရပ်",
    diagnosis: "ရောဂါရှာဖွေချက် (Diagnosis)",
    operation: "ခွဲစိတ်မှုနည်းလမ်း (Procedure)",
    surgeon: "ခွဲစိတ်ဆရာဝန်နှင့် အကူ (Surgeon & Asst)",
    remarks: "မှတ်ချက် (Remarks)",
    saveCase: "သိမ်းဆည်းရန်",
    updateCase: "ပြင်ဆင်ချက်သိမ်းရန်",
    cancel: "မလုပ်တော့ပါ",
    actions: "လုပ်ဆောင်ချက်များ",
    category: "အမျိုးအစား",
    gynaecology: "မီးယပ်ဌာန (Gynaecology)",
    obstetrics: "သားဖွားဌာန (Obstetrics)",
    patientPlaceholder: "ဥပမာ - ဒေါ်တင်တင်ဝင်း",
    agePlaceholder: "ဥပမာ - ၅၂ နှစ်",
    rnPlaceholder: "ဥပမာ - 3388",
    bwHeightPlaceholder: "ဥပမာ - 70kg, 5'",
    diagnosisPlaceholder: "ဥပမာ - သားအိမ်အသားလုံး အများအပြား...",
    operationPlaceholder: "ဥပမာ - TAH + BSO",
    surgeonPlaceholder: "ဥပမာ - SCS Dr MMA + CS Dr AMT",
    remarksPlaceholder: "ဥပမာ - သွေး ၂ လုံး အရန်သိမ်းရန်",
    deleteConfirm: "ဤခွဲစိတ်မှုအချက်အလက်ကို ဖျက်ရန် သေချာပါသလား။",
  }
};

const METADATA_LANG = {
  en: {
    date: "Operation Date: 2.7.2026 (Tuesday)",
    surgeon: "Surgeon: Prof Dr Myint Myint Thin & team",
    anes: "Anaesthetist: SC Dr. Nan Ei Ei Hlaing & Team",
    backup: "Back-up Consultant: SCS Dr Wah Wah Win Hlaing",
    sectionGyn: "List of Operations (Gynaecology)",
    sectionObs: "List of Operations (Obstetrics)",
    hospitalName: "Obstetrics & Gynaecology Specialist Hospital, Nay Pyi Taw",
  },
  mm: {
    date: "ခွဲစိတ်သည့်ရက်စွဲ - ၂.၇.၂၀၂၆ (အင်္ဂါနေ့)",
    surgeon: "ခွဲစိတ်ဆရာဝန် - ပါမောက္ခ ဒေါက်တာ မြင့်မြင့်သင်း နှင့် အဖွဲ့",
    anes: "မေ့ဆေးဆရာဝန် - SC ဒေါက်တာ နန်းအိအိလှိုင် နှင့် အဖွဲ့",
    backup: "အရန်အကြံပေးအထူးကုဆရာဝန်ကြီး - SCS ဒေါက်တာ ဝါဝါဝင်းလှိုင်",
    sectionGyn: "မီးယပ်ဌာန ခွဲစိတ်ကုသမှုစာရင်း (Gynaecology)",
    sectionObs: "သားဖွားဌာန ခွဲစိတ်ကုသမှုစာရင်း (Obstetrics)",
    hospitalName: "သားဖွားနှင့် မီးယပ်အထူးကုဆေးရုံကြီး၊ နေပြည်တော်",
  },
  zh: {
    date: "手术日期：2026年7月2日 (星期二)",
    surgeon: "主刀医生：Prof Dr Myint Myint Thin 教授与医疗团队",
    anes: "麻醉医生：SC Dr. Nan Ei Ei Hlaing 团队",
    backup: "后备专家顾问：SCS Dr Wah Wah Win Hlaing",
    sectionGyn: "妇科手术日程表 (Gynaecology)",
    sectionObs: "产科手术日程表 (Obstetrics)",
    hospitalName: "内比都妇产科专科医院 (Obstetrics & Gynaecology Specialist Hospital, Nay Pyi Taw)",
  }
};

export function getDefaultCases(lang: string): OTCase[] {
  return [
    // Gynaecology Cases (Image 1)
    {
      id: "gyn-1",
      category: "Gynaecology",
      no: "1",
      name: lang === "mm" ? "ဒေါ်တင်တင်ဝင်း" : lang === "zh" ? "Daw Tin Tin Win" : "Daw Tin Tin Win",
      age: lang === "mm" ? "၅၂ နှစ်" : lang === "zh" ? "52岁" : "52yr",
      rn: "3388",
      bwHeight: lang === "mm" ? "၇၀ ကီလို၊ ၅ ပေ" : "70kg, 5'",
      diagnosis: lang === "mm" 
        ? "အသက် ၅၂ နှစ်၊ အပျို၊ သားအိမ်အသားလုံး အများအပြားနှင့် သွေးတိုးရောဂါအခံရှိသူ" 
        : lang === "zh" 
          ? "52岁，未婚，多发性子宫肌瘤合并高血压" 
          : "52 yr, Single with Multiple uterine myoma underlying hypertension",
      procedure: "TAH + BSO",
      surgeon: "SCS Dr MMA + CS Dr AMT + PP II Dr PSH",
      remarks: lang === "mm" 
        ? "Inf: All NR, သွေး ၂ လုံး အရန်သိမ်းရန် (WB 2 U reserved)" 
        : lang === "zh" 
          ? "Inf: All NR, 预留全血 2 单位 (WB 2 U reserved)" 
          : "Inf: All NR, WB 2 U reserved",
    },
    {
      id: "gyn-2",
      category: "Gynaecology",
      no: "2",
      name: lang === "mm" ? "ဒေါ်ခင်မာဌေး" : lang === "zh" ? "Daw Khin Mar Htay" : "Daw Khin Mar Htay",
      age: lang === "mm" ? "၃၂ နှစ်" : lang === "zh" ? "32岁" : "32yr",
      rn: "3386",
      bwHeight: lang === "mm" ? "၆၇ ကီလို၊ ၄ ပေ ၉ လက်မ" : "67kg, 4'9\"",
      diagnosis: lang === "mm" 
        ? "အသက် ၃၂ နှစ်၊ ကလေးမရနိုင်သေးသူ (P0+0) နှင့် ဘယ်ဘက်သားဥအိမ် ရေအိတ်တည်သူ" 
        : lang === "zh" 
          ? "32岁，原发不孕，左侧卵巢囊肿" 
          : "32 yr P0+0 with subfertility and left ovarian cyst",
      procedure: "Laparoscopic cystectomy and Dye test",
      surgeon: "SCS Dr WMT + FA Dr NAO",
      remarks: lang === "mm" 
        ? "Inf: All NR, သွေး ၁ လုံး အရန်သိမ်းရန် (WB 1 U reserved)" 
        : lang === "zh" 
          ? "Inf: All NR, 预留全血 1 单位 (WB 1 U reserved)" 
          : "Inf: All NR, WB 1 U reserved",
    },
    {
      id: "gyn-3",
      category: "Gynaecology",
      no: "3",
      name: lang === "mm" ? "ဇင်မာဝင်း" : lang === "zh" ? "Zin Mar Win" : "Zin Mar Win",
      age: lang === "mm" ? "၂၀ နှစ်" : lang === "zh" ? "20岁" : "20 yr",
      rn: "3344",
      bwHeight: lang === "mm" ? "၄၉ ကီလို၊ ၅ ပေ ၃ လက်မ" : "49kg, 5'3\"",
      diagnosis: lang === "mm" 
        ? "အသက် ၂၀ နှစ်၊ (P2+0)၊ အရေးပေါ် LSCS ခွဲစိတ်ပြီးနောက် ၁၂ ရက်မြောက်တွင် ဒဏ်ရာပွင့်ထွက်ခြင်း" 
        : lang === "zh" 
          ? "20岁，经产妇，紧急剖宫产术后第12天切口开裂" 
          : "20 yr, P2+0, with wound gaping on 12th post-operative day of urgent LSCS",
      procedure: "Secondary suture",
      surgeon: "FA + HS",
      remarks: lang === "mm" 
        ? "Infection: All NR, သွေး ၁ လုံး အရန်သိမ်းရန် (WB 1 U reserved)" 
        : lang === "zh" 
          ? "Infection: All NR, 预留全血 1 单位 (WB 1 U reserved)" 
          : "Infection: All NR, WB 1 U reserved",
    },

    // Obstetrics Cases (Image 2)
    {
      id: "obs-1",
      category: "Obstetrics",
      no: "1",
      name: lang === "mm" ? "ဒေါ်အိဇင်ဖြိုး" : lang === "zh" ? "Daw Ei Zin Phyo" : "Daw Ei Zin Phyo",
      age: lang === "mm" ? "၂၀ နှစ်" : lang === "zh" ? "20岁" : "20yr",
      rn: "3362",
      bwHeight: lang === "mm" ? "၅၅ ကီလို၊ ၅ ပေ" : "55kg, 5'",
      diagnosis: lang === "mm" 
        ? "ကိုယ်ဝန်ဆောင်ဆီးချိုရောဂါ၊ ကလေးတင်ပါးဆုံမျက်နှာမူခြင်း၊ ကိုယ်ဝန်ပတ် ၃၉+၁ ပတ်တွင် ကလေးလှုပ်ရှားမှုနည်းခြင်း" 
        : lang === "zh" 
          ? "孕1胎0，孕39+1周，胎动减少，妊娠期糖尿病合并臀位" 
          : "20yr G1 P0 with reduced fetal movement with GDM with breech presentation at 39+1",
      procedure: "El LSCS",
      surgeon: "SCS Dr WWWH + FA / AS",
      remarks: lang === "mm" 
        ? "Inf: All NR, သွေး ၁ လုံး အရန်သိမ်းရန် (WB 1 U reserved)" 
        : lang === "zh" 
          ? "Inf: All NR, 预留全血 1 单位 (WB 1 U reserved)" 
          : "Inf: All NR, WB 1 U reserved",
    },
    {
      id: "obs-2",
      category: "Obstetrics",
      no: "2",
      name: lang === "mm" ? "ဒေါ်စန္ဒာဝင်း" : lang === "zh" ? "Daw Sandar Win" : "Daw Sandar Win",
      age: lang === "mm" ? "၃၈ နှစ်" : lang === "zh" ? "38岁" : "38yr",
      rn: "3387",
      bwHeight: lang === "mm" ? "၇၅ ကီလို၊ ၅ ပေ ၁ လက်မ" : "75kg, 5'1\"",
      diagnosis: lang === "mm" 
        ? "ကိုယ်ဝန်ဆောင်ဆီးချိုရောဂါ၊ ပန်းနာရင်ကြပ်ရောဂါအခံ၊ ကိုယ်ဝန်ပတ် ၃၇+၆ ပတ်တွင် ယခင် LSCS ၂ ကြိမ် ခွဲစိတ်ဖူးသူ" 
        : lang === "zh" 
          ? "孕5胎4，孕37+6周，既往2次剖腹产史，妊娠期糖尿病合并支气管哮喘" 
          : "38yr G5 P4-0 with prev 2 LSCS scar with GDM underlying bronchial asthma at 37+6 wk",
      procedure: "ERCS + Authorized sterilization",
      surgeon: "SCS Dr WWWH + FA Dr CMMHN",
      remarks: lang === "mm" 
        ? "Inf: All NR, သွေး ၁ လုံး အရန်သိမ်းရန် (WB 1 U reserved)" 
        : lang === "zh" 
          ? "Inf: All NR, 预留全血 1 单位 (WB 1 U reserved)" 
          : "Inf: All NR, WB 1 U reserved",
    },
    {
      id: "obs-3",
      category: "Obstetrics",
      no: "3",
      name: lang === "mm" ? "ဒေါ်ယဉ်ယဉ်စိုး" : lang === "zh" ? "Daw Yin Yin Soe" : "Daw Yin Yin Soe",
      age: lang === "mm" ? "၂၅ နှစ်" : lang === "zh" ? "25岁" : "25yr",
      rn: "3422",
      bwHeight: lang === "mm" ? "၅၀ ကီလို၊ ၅ ပေ ၄ လက်မ" : "50kg, 5'4\"",
      diagnosis: lang === "mm" 
        ? "ကိုယ်ဝန်ပတ် ၃၉ ပတ်တွင် ယခင် LSCS ၁ ကြိမ် ခွဲစိတ်ဖူးသူ" 
        : lang === "zh" 
          ? "孕2胎1，孕39周，既往1次剖腹产史" 
          : "25yr G2 P1-0 with prev 1 LSCS scar at 39 wk",
      procedure: "ERCS",
      surgeon: "SCS Dr MMA / FA + AS + HS",
      remarks: lang === "mm" 
        ? "Inf: All NR, သွေး ၁ လုံး အရန်သိမ်းရန် (WB 1 U reserved)" 
        : lang === "zh" 
          ? "Inf: All NR, 预留全血 1 单位 (WB 1 U reserved)" 
          : "Inf: All NR, WB 1 U reserved",
    },
    {
      id: "obs-4",
      category: "Obstetrics",
      no: "4",
      name: lang === "mm" ? "ဒေါ်ထက်ထက်" : lang === "zh" ? "Daw Htet Htet" : "Daw Htet Htet",
      age: lang === "mm" ? "၂၅ နှစ်" : lang === "zh" ? "25岁" : "25yr",
      rn: "3407",
      bwHeight: lang === "mm" ? "၅၅ ကီလို၊ ၅ ပေ ၁ လက်မ" : "55kg, 5'1\"",
      diagnosis: lang === "mm" 
        ? "ကိုယ်ဝန်ပတ် ၃၈+၂ ပတ်တွင် ယခင် LSCS ၁ ကြိမ် ခွဲစိတ်ဖူးသူ" 
        : lang === "zh" 
          ? "孕2胎1，孕38+2周，既往1次剖腹产史" 
          : "25yr G2 P1-0 with prev 1 LSCS scar at 38+2 wk",
      procedure: "ERCS",
      surgeon: "FA Dr NAO + PP II + HS",
      remarks: lang === "mm" 
        ? "Inf: All NR, သွေး ၁ လုံး အရန်သိမ်းရန် (WB 1 U reserved)" 
        : lang === "zh" 
          ? "Inf: All NR, 预留全血 1 单位 (WB 1 U reserved)" 
          : "Inf: All NR, WB 1 U reserved",
    },
    {
      id: "obs-5",
      category: "Obstetrics",
      no: "5",
      name: lang === "mm" ? "ဒေါ်ခင်ဌေး" : lang === "zh" ? "Daw Khin Htay" : "Daw Khin Htay",
      age: lang === "mm" ? "၃၈ နှစ်" : lang === "zh" ? "38岁" : "38yr",
      rn: "3409",
      bwHeight: lang === "mm" ? "၅၀ ကီလို၊ ၄ ပေ ၁၁ လက်မ" : "50kg, 4'11\"",
      diagnosis: lang === "mm" 
        ? "ကိုယ်ဝန်ပတ် ၃၈+၅ ပတ်တွင် ယခင် LSCS ၁ ကြိမ် ခွဲစိတ်ဖူးသူ" 
        : lang === "zh" 
          ? "孕3胎1，孕38+5周，既往1次剖腹产史" 
          : "38yr G3 P1+1 with prev 1 LSCS scar at 38+5 wk",
      procedure: "ERCS + AS",
      surgeon: "FA + AS",
      remarks: lang === "mm" 
        ? "Inf: All NR, သွေး ၁ လုံး အရန်သိမ်းရန် (WB 1 U reserved)" 
        : lang === "zh" 
          ? "Inf: All NR, 预留全血 1 单位 (WB 1 U reserved)" 
          : "Inf: All NR, WB 1 U reserved",
    },
    {
      id: "obs-6",
      category: "Obstetrics",
      no: "6",
      name: lang === "mm" ? "ဒေါ်ဝင်းသန္တာထွန်း" : lang === "zh" ? "Daw Win Thandar Tun" : "Daw Win Thandar Tun",
      age: lang === "mm" ? "၃၄ နှစ်" : lang === "zh" ? "34岁" : "34yr",
      rn: "3406",
      bwHeight: lang === "mm" ? "၆၂ ကီလို၊ ၄ ပေ ၁၀ လက်မ" : "62kg, 4'10\"",
      diagnosis: lang === "mm" 
        ? "RVI ရောဂါရှိသူ၊ ကိုယ်ဝန်ပတ် ၃၈+၅ ပတ်" 
        : lang === "zh" 
          ? "孕1胎0，孕38+5周合并RVI" 
          : "34yr G1 P0 with RVI at 38+5 wk",
      procedure: "ERCS + AS",
      surgeon: "SCS Dr WWWH + FA",
      remarks: lang === "mm" 
        ? "Inf: HIV Ab (+), သွေး ၁ လုံး အရန်သိမ်းရန် (WB 1 U reserved)" 
        : lang === "zh" 
          ? "Inf: HIV抗体阳性 (+), 预留全血 1 单位 (WB 1 U reserved)" 
          : "Inf: HIV Ab (+), WB 1 U reserved",
    }
  ];
}

export function OTListWidget({ lang }: OTListWidgetProps) {
  const l = LABELS_LANG[lang] || LABELS_LANG.en;
  const meta = METADATA_LANG[lang] || METADATA_LANG.en;

  const [cases, setCases] = useState<OTCase[]>(() => {
    const saved = localStorage.getItem("nptgh_ot_cases_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fall back to default cases localized
      }
    }
    return getDefaultCases(lang);
  });

  // Re-generate default cases when language changes if no custom edits were saved, or merge
  useEffect(() => {
    const saved = localStorage.getItem("nptgh_ot_cases_v2");
    if (!saved) {
      setCases(getDefaultCases(lang));
    }
  }, [lang]);

  const [activeTab, setActiveTab] = useState<"Gynaecology" | "Obstetrics">("Gynaecology");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [category, setCategory] = useState<"Gynaecology" | "Obstetrics">("Gynaecology");
  const [no, setNo] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [rn, setRn] = useState("");
  const [bwHeight, setBwHeight] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [procedure, setProcedure] = useState("");
  const [surgeon, setSurgeon] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    localStorage.setItem("nptgh_ot_cases_v2", JSON.stringify(cases));
  }, [cases]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !procedure) return;

    if (editingId) {
      setCases(prev => prev.map(c => c.id === editingId ? {
        ...c, category, no, name, age, rn, bwHeight, diagnosis, procedure, surgeon, remarks
      } : c));
      setEditingId(null);
    } else {
      const nextNo = no || (cases.filter(c => c.category === category).length + 1).toString();
      const newCase: OTCase = {
        id: Date.now().toString(),
        category,
        no: nextNo,
        name,
        age,
        rn,
        bwHeight,
        diagnosis,
        procedure,
        surgeon,
        remarks,
      };
      setCases(prev => [...prev, newCase]);
      setActiveTab(category); // switch tab to where it was added
    }

    // Reset Form
    setCategory("Gynaecology");
    setNo("");
    setName("");
    setAge("");
    setRn("");
    setBwHeight("");
    setDiagnosis("");
    setProcedure("");
    setSurgeon("");
    setRemarks("");
    setIsFormOpen(false);
  };

  const handleEdit = (c: OTCase) => {
    setEditingId(c.id);
    setCategory(c.category);
    setNo(c.no);
    setName(c.name);
    setAge(c.age);
    setRn(c.rn);
    setBwHeight(c.bwHeight);
    setDiagnosis(c.diagnosis);
    setProcedure(c.procedure);
    setSurgeon(c.surgeon);
    setRemarks(c.remarks);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(l.deleteConfirm)) {
      setCases(prev => prev.filter(c => c.id !== id));
    }
  };

  const filteredCases = cases
    .filter(c => c.category === activeTab)
    .sort((a, b) => {
      const valA = parseInt(a.no) || 0;
      const valB = parseInt(b.no) || 0;
      return valA - valB;
    });

  return (
    <div className="bg-white p-5 sm:p-6 rounded-[2.2rem] shadow-sm border border-slate-100 mt-6 space-y-6">
      
      {/* 1. Header & Quick Switch Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2.5">
            <Activity className="h-5.5 w-5.5 text-indigo-500 shrink-0" />
            {l.otListTitle}
          </h3>
          <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider">
            {meta.hospitalName}
          </p>
        </div>
        
        {!isFormOpen && (
          <button
            onClick={() => {
              setEditingId(null);
              setCategory(activeTab);
              setNo((cases.filter(c => c.category === activeTab).length + 1).toString());
              setName("");
              setAge("");
              setRn("");
              setBwHeight("");
              setDiagnosis("");
              setProcedure("");
              setSurgeon("");
              setRemarks("");
              setIsFormOpen(true);
            }}
            className="self-start sm:self-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 transition shadow-sm active:scale-95"
          >
            <Plus className="h-4 w-4" />
            {l.addCase}
          </button>
        )}
      </div>

      {/* 2. Department Category Selector Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveTab("Gynaecology")}
          className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === "Gynaecology"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
          }`}
        >
          <Heart className={`h-4 w-4 ${activeTab === "Gynaecology" ? "fill-indigo-600/10 text-indigo-600" : "text-slate-400"}`} />
          {l.gynaecology}
        </button>
        <button
          onClick={() => setActiveTab("Obstetrics")}
          className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === "Obstetrics"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
          }`}
        >
          <Layers className={`h-4 w-4 ${activeTab === "Obstetrics" ? "text-indigo-600" : "text-slate-400"}`} />
          {l.obstetrics}
        </button>
      </div>

      {/* 3. Hospital Official Metadata Display */}
      <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 space-y-3 font-semibold text-xs text-slate-700">
        <div className="flex items-center gap-2 font-black text-indigo-600 border-b border-slate-200/40 pb-2 text-[10px] uppercase tracking-wider">
          <FileText className="h-4 w-4" />
          {activeTab === "Gynaecology" ? meta.sectionGyn : meta.sectionObs}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px] leading-relaxed">
          <div className="space-y-1">
            <p>🗓️ <span className="text-slate-400 font-extrabold uppercase text-[9px] mr-1">Date:</span> {meta.date}</p>
            <p>👨‍⚕️ <span className="text-slate-400 font-extrabold uppercase text-[9px] mr-1">Surgeon:</span> {meta.surgeon}</p>
          </div>
          <div className="space-y-1">
            <p>💉 <span className="text-slate-400 font-extrabold uppercase text-[9px] mr-1">Anaesthesia:</span> {meta.anes}</p>
            <p>🛡️ <span className="text-slate-400 font-extrabold uppercase text-[9px] mr-1">Backup:</span> {meta.backup}</p>
          </div>
        </div>
      </div>

      {/* 4. Form Section */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-slate-50 p-5 rounded-[1.8rem] border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
            <h4 className="font-black text-xs text-indigo-600 uppercase tracking-widest">
              {editingId ? l.editCase : l.addCase}
            </h4>
            <button 
              type="button" 
              onClick={() => setIsFormOpen(false)}
              className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category selection */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.category} <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option value="Gynaecology">{l.gynaecology}</option>
                <option value="Obstetrics">{l.obstetrics}</option>
              </select>
            </div>

            {/* Case slot / order */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                Case No. <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. 1"
                value={no}
                onChange={e => setNo(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Patient Name */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.patientName} <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder={l.patientPlaceholder}
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Age */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.age}
              </label>
              <input
                type="text"
                placeholder={l.agePlaceholder}
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Reg No */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.rn}
              </label>
              <input
                type="text"
                placeholder={l.rnPlaceholder}
                value={rn}
                onChange={e => setRn(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Weight / Height */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.bwHeight}
              </label>
              <input
                type="text"
                placeholder={l.bwHeightPlaceholder}
                value={bwHeight}
                onChange={e => setBwHeight(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Diagnosis */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-3">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.diagnosis}
              </label>
              <input
                type="text"
                placeholder={l.diagnosisPlaceholder}
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Procedure */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-2">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.operation} <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder={l.operationPlaceholder}
                value={procedure}
                onChange={e => setProcedure(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Surgeons */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.surgeon}
              </label>
              <input
                type="text"
                placeholder={l.surgeonPlaceholder}
                value={surgeon}
                onChange={e => setSurgeon(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Remarks */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-3">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                {l.remarks}
              </label>
              <input
                type="text"
                placeholder={l.remarksPlaceholder}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-3 border-t border-slate-200/50">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs transition active:scale-95"
            >
              {l.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Check className="h-4 w-4" />
              {editingId ? l.updateCase : l.saveCase}
            </button>
          </div>
        </form>
      )}

      {/* 5. Cases List / Responsive Views */}
      <div className="space-y-3">
        {filteredCases.length === 0 ? (
          <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl text-center space-y-2 bg-slate-50/20">
            <Stethoscope className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-400 font-bold leading-normal">
              {l.noCases}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
              <table className="w-full border-collapse text-left text-[11px] text-slate-600 min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <th className="p-3 pl-4 w-12 text-center">No.</th>
                    <th className="p-3 min-w-[120px]">{l.patientName}</th>
                    <th className="p-3 w-14 text-center">{l.age}</th>
                    <th className="p-3 w-16 text-center">{l.rn}</th>
                    <th className="p-3 w-20 text-center">{l.bwHeight}</th>
                    <th className="p-3 min-w-[180px]">{l.diagnosis}</th>
                    <th className="p-3 min-w-[150px]">{l.operation}</th>
                    <th className="p-3 min-w-[150px]">{l.surgeon}</th>
                    <th className="p-3 min-w-[130px]">{l.remarks}</th>
                    <th className="p-3 text-right pr-4 w-16">{l.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 font-semibold transition-colors">
                      <td className="p-3 pl-4 text-center">
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-lg">
                          {c.no}
                        </span>
                      </td>
                      <td className="p-3 text-slate-800 font-black">{c.name}</td>
                      <td className="p-3 text-center text-slate-500 font-bold">{c.age || "-"}</td>
                      <td className="p-3 text-center text-slate-500 font-mono font-bold">{c.rn || "-"}</td>
                      <td className="p-3 text-center text-slate-500 font-bold">{c.bwHeight || "-"}</td>
                      <td className="p-3 text-slate-600 leading-normal max-w-xs">{c.diagnosis || "-"}</td>
                      <td className="p-3 text-slate-700 font-bold leading-normal">{c.procedure}</td>
                      <td className="p-3 text-slate-800 font-bold leading-normal">{c.surgeon || "-"}</td>
                      <td className="p-3 text-emerald-700 font-bold leading-normal">{c.remarks || "-"}</td>
                      <td className="p-3 text-right pr-4">
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => handleEdit(c)}
                            className="p-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition active:scale-90"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition active:scale-90"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card View */}
            <div className="block md:hidden space-y-3">
              {filteredCases.map((c) => (
                <div key={c.id} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3 font-semibold text-xs relative">
                  <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full">
                        #{c.no}
                      </span>
                      <span className="text-slate-800 font-black text-sm">{c.name}</span>
                    </div>
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => handleEdit(c)}
                        className="p-1.5 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 rounded-lg transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <p className="text-slate-400 font-extrabold uppercase text-[8px] tracking-wider mb-0.5">{l.age}</p>
                      <p className="text-slate-700 font-bold">{c.age || "-"}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-extrabold uppercase text-[8px] tracking-wider mb-0.5">{l.rn}</p>
                      <p className="text-slate-700 font-bold font-mono">{c.rn || "-"}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-extrabold uppercase text-[8px] tracking-wider mb-0.5">{l.bwHeight}</p>
                      <p className="text-slate-700 font-bold">{c.bwHeight || "-"}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1 text-[11px] border-t border-slate-100/60 leading-relaxed">
                    <div>
                      <p className="text-slate-400 font-extrabold uppercase text-[8px] tracking-wider mb-0.5">{l.diagnosis}</p>
                      <p className="text-slate-600">{c.diagnosis || "-"}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-extrabold uppercase text-[8px] tracking-wider mb-0.5">{l.operation}</p>
                      <p className="text-slate-800 font-black">{c.procedure}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-extrabold uppercase text-[8px] tracking-wider mb-0.5">{l.surgeon}</p>
                      <p className="text-slate-800 font-bold">{c.surgeon || "-"}</p>
                    </div>
                    {c.remarks && (
                      <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100/40 text-[10px]">
                        <p className="text-slate-400 font-extrabold uppercase text-[7px] tracking-wider mb-0.5">{l.remarks}</p>
                        <p className="font-extrabold">{c.remarks}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
