import React, { useState, useEffect } from "react";
import {
  Calendar,
  Baby,
  Activity,
  Heart,
  AlertTriangle,
  Info,
  CheckCircle,
  RotateCcw,
  BookOpen,
  CheckSquare,
  Square,
  Thermometer,
  ShieldAlert,
} from "lucide-react";
import { useStore } from "../store/useStore";

// --- Translations ---
const enTranslations = {
  tabTitle: "OBGYN Clinical Calculators",
  tabSubtitle: "Evidence-based tools for obstetric and gynecological practice",
  calculatorSelect: "Select Calculator",
  eddGa: "EDD & Gestational Age",
  bishop: "Bishop Score",
  preeclampsia: "Preeclampsia (MAP)",
  apgar: "APGAR Score",
  pph: "PPH Risk Stratification",
  
  // EDD / GA Calculator
  method: "Calculation Method",
  lmpMode: "LMP (Last Menstrual Period)",
  usMode: "Ultrasound (Scan Date & GA)",
  lmpDate: "Select LMP Date",
  scanDate: "Ultrasound Scan Date",
  gaAtScan: "Gestational Age at Scan",
  weeks: "Weeks",
  days: "Days",
  calcResults: "Calculation Results",
  eddLabel: "Estimated Date of Delivery (EDD)",
  currentGa: "Current Gestational Age Today",
  trimester: "Current Trimester",
  daysRemaining: "Days Remaining Until Due Date",
  notApplicable: "Not Applicable",
  cycleLength: "Average Cycle Length (Days)",
  futureDateError: "Selected date cannot be in the future.",
  invalidInput: "Please select a valid date.",
  termLabel: "Category",
  tri1: "1st Trimester (0 - 13 Weeks 6 Days)",
  tri2: "2nd Trimester (14 - 27 Weeks 6 Days)",
  tri3: "3rd Trimester (28 - 40+ Weeks)",

  // Bishop Score
  dilation: "Cervical Dilation",
  effacement: "Cervical Effacement",
  station: "Fetal Station",
  consistency: "Cervical Consistency",
  position: "Cervical Position",
  points: "points",
  totalBishop: "Total Bishop Score",
  favorable: "Favorable Cervix",
  unfavorable: "Unfavorable Cervix",
  highlyFavorable: "Highly Favorable Cervix",
  bishopRecommendation: "Recommendation",
  bishopRecUnfavorable: "Cervix is unfavorable (Score \u2264 5). Successful vaginal delivery is less likely with immediate oxytocin. Consider cervical ripening methods (e.g., misoprostol, dinoprostone, Foley balloon catheter) prior to induction.",
  bishopRecFavorable: "Cervix is favorable (Score 6 - 8). High likelihood of successful vaginal delivery/induction. Standard induction protocols (e.g., amniotomy, oxytocin infusion) are highly appropriate.",
  bishopRecHighlyFavorable: "Cervix is highly favorable (Score \u2265 9). Spontaneous labor is imminent, or direct induction will be rapid and highly successful.",

  // MAP / Preeclampsia
  systolic: "Systolic Blood Pressure (mmHg)",
  diastolic: "Diastolic Blood Pressure (mmHg)",
  mapResult: "Mean Arterial Pressure (MAP)",
  mapNormal: "Normal MAP (< 85 mmHg)",
  mapElevated: "Elevated MAP (\u2265 85 mmHg)",
  mapInfo: "Mean Arterial Pressure \u2265 85 mmHg in the first or second trimester is associated with an increased risk of preeclampsia.",
  severeFeatures: "Preeclampsia Severe Features Checklist (ACOG)",
  severeDesc: "Select all severe clinical features present in this patient:",
  severeFeature_bp: "Severe Hypertension (SBP \u2265 160 or DBP \u2265 110 mmHg, twice, 4 hrs apart)",
  severeFeature_platelets: "Thrombocytopenia (Platelets < 100,000/\u00B5L)",
  severeFeature_liver: "Impaired Liver Function (Transaminases > 2x normal, or severe persistent right upper quadrant/epigastric pain)",
  severeFeature_renal: "Progressive Renal Insufficiency (Serum creatinine > 1.1 mg/dL or doubling)",
  severeFeature_pulmonary: "Pulmonary Edema",
  severeFeature_cerebral: "Cerebral or Visual Disturbances (New-onset severe headache, scotomata, photopsia)",
  noSevereFeatures: "No severe features checked.",
  severeFeaturesPresent: "Severe Features Present!",
  severeFeaturesAction: "Requires urgent hospitalization, close maternal/fetal monitoring, magnesium sulfate for seizure prophylaxis, and consideration for delivery (especially if gestation \u2265 34 weeks).",

  // APGAR
  apgarTime: "Assessment Time",
  min1: "1-Minute Score",
  min5: "5-Minute Score",
  appearance: "Appearance (Skin Color)",
  pulse: "Pulse (Heart Rate)",
  grimace: "Grimace (Reflex Irritability)",
  muscleTone: "Activity (Muscle Tone)",
  respiration: "Respiration (Breathing Effort)",
  apgarScore: "APGAR Score",
  apgarNormal: "Normal / Reassuring (Score 7 - 10)",
  apgarModerate: "Moderately Abnormal (Score 4 - 6)",
  apgarCritical: "Critically Low (Score 0 - 3)",
  apgarNormalRec: "The newborn is stable. Proceed with routine postpartum skin-to-skin contact, drying, and neonatal care.",
  apgarModerateRec: "Neonatal depression. Provide warm tactile stimulation, clear airway, administer supplemental oxygen, or consider positive pressure ventilation (PPV) if indicated.",
  apgarCriticalRec: "Severe neonatal depression. Initiate immediate resuscitation (NRP protocols) with PPV, chest compressions, or drug therapy as indicated.",

  // PPH Risk Stratification
  pphLow: "Low Risk PPH Profile",
  pphMedium: "Medium Risk PPH Profile",
  pphHigh: "High Risk PPH Profile",
  pphLowDesc: "Single gestation, < 4 prior vaginal births, no prior PPH, unscarred uterus.",
  pphMedChecklist: "Medium Risk Factors (Select all that apply):",
  pphHighChecklist: "High Risk Factors (Select all that apply):",
  pphMed_priorCS: "Prior cesarean section or uterine surgery",
  pphMed_multiples: "Multiple gestation (twins, triplets)",
  pphMed_grandMulti: "Grand multiparity (> 4 prior vaginal births)",
  pphMed_chorio: "Chorioamnionitis / Intrapartum infection",
  pphMed_poly: "Polyhydramnios or Macrosomia (EFW > 4.0 kg)",
  pphMed_fibroids: "Large uterine fibroids",
  pphMed_prolonged: "Prolonged active labor or prolonged oxytocin use",
  pphHigh_previa: "Placenta previa, low-lying placenta, or accreta spectrum",
  pphHigh_hematocrit: "Pre-admission hematocrit < 30% with other risk factors",
  pphHigh_platelets: "Thrombocytopenia (Platelets < 100,000/\u00B5L)",
  pphHigh_coag: "Known coagulopathy or active bleeding on admission",
  pphHigh_priorPPH: "History of severe postpartum hemorrhage",
  pphRiskStatus: "Patient PPH Risk Stratum",
  pphLowStatus: "LOW RISK",
  pphMedStatus: "MEDIUM RISK",
  pphHighStatus: "HIGH RISK",
  pphActionLow: "Prepare routine uterotonics (Oxytocin 10U IM/IV) active management of 3rd stage, massage fundus.",
  pphActionMed: "Routine active management, place wide-bore IV access (18G or larger), type & screen, have PPH cart nearby.",
  pphActionHigh: "Type & crossmatch 2-4 units RBCs, notify OB team/anesthesia, prepare active management tools, ready balloon tamponade or surgical interventions.",
  
  // General
  reset: "Reset Calculator",
  referenceText: "Clinical reference guidelines based on ACOG, RCOG, and WHO obstetric directives.",
};

const t = {
  en: enTranslations,
  mm: {
    tabTitle: "OBGYN တွက်ချက်မှုများ",
    tabSubtitle: "သားဖွားမီးယပ် အထောက်အကူပြု တွက်ချက်စနစ်များ",
    calculatorSelect: "တွက်ချက်မှု အမျိုးအစား ရွေးချယ်ရန်",
    eddGa: "EDD & Gestational Age",
    bishop: "Bishop Score",
    preeclampsia: "Preeclampsia (MAP)",
    apgar: "APGAR Score",
    pph: "PPH Risk Stratification",
    
    // EDD / GA Calculator
    method: "တွက်ချက်သည့် နည်းလမ်း",
    lmpMode: "LMP (Last Menstrual Period)",
    usMode: "Ultrasound (Scan Date & GA)",
    lmpDate: "LMP ရက်စွဲ ရွေးချယ်ရန်",
    scanDate: "Ultrasound ရိုက်ကူးခဲ့သည့် ရက်စွဲ",
    gaAtScan: "Gestational Age at Scan",
    weeks: "Weeks",
    days: "Days",
    calcResults: "တွက်ချက်မှုရလဒ်များ",
    eddLabel: "Estimated Date of Delivery (EDD)",
    currentGa: "Current Gestational Age Today",
    trimester: "Current Trimester",
    daysRemaining: "မွေးဖွားရန် ကျန်ရှိသော ရက်ပေါင်း",
    notApplicable: "Not Applicable",
    cycleLength: "Average Cycle Length (Days)",
    futureDateError: "ရွေးချယ်ထားသော ရက်စွဲသည် နောင်လာမည့်ရက် မဖြစ်နိုင်ပါ။",
    invalidInput: "ရက်စွဲမှန်ကန်စွာ ရွေးချယ်ပေးပါ။",
    termLabel: "Category",
    tri1: "1st Trimester (0 - 13 Weeks 6 Days)",
    tri2: "2nd Trimester (14 - 27 Weeks 6 Days)",
    tri3: "3rd Trimester (28 - 40+ Weeks)",

    // Bishop Score
    dilation: "Cervical Dilation",
    effacement: "Cervical Effacement",
    station: "Fetal Station",
    consistency: "Cervical Consistency",
    position: "Cervical Position",
    points: "points",
    totalBishop: "Total Bishop Score",
    favorable: "Favorable Cervix",
    unfavorable: "Unfavorable Cervix",
    highlyFavorable: "Highly Favorable Cervix",
    bishopRecommendation: "Recommendation",
    bishopRecUnfavorable: "Cervix is unfavorable (Score \u2264 5). Successful vaginal delivery is less likely with immediate oxytocin. Consider cervical ripening methods (e.g., misoprostol, dinoprostone, Foley balloon catheter) prior to induction.",
    bishopRecFavorable: "Cervix is favorable (Score 6 - 8). High likelihood of successful vaginal delivery/induction. Standard induction protocols (e.g., amniotomy, oxytocin infusion) are highly appropriate.",
    bishopRecHighlyFavorable: "Cervix is highly favorable (Score \u2265 9). Spontaneous labor is imminent, or direct induction will be rapid and highly successful.",

    // MAP / Preeclampsia
    systolic: "Systolic Blood Pressure (mmHg)",
    diastolic: "Diastolic Blood Pressure (mmHg)",
    mapResult: "Mean Arterial Pressure (MAP)",
    mapNormal: "Normal MAP (< 85 mmHg)",
    mapElevated: "Elevated MAP (\u2265 85 mmHg)",
    mapInfo: "Mean Arterial Pressure \u2265 85 mmHg in the first or second trimester is associated with an increased risk of preeclampsia.",
    severeFeatures: "Preeclampsia Severe Features Checklist (ACOG)",
    severeDesc: "Select all severe clinical features present in this patient:",
    severeFeature_bp: "Severe Hypertension (SBP \u2265 160 or DBP \u2265 110 mmHg, twice, 4 hrs apart)",
    severeFeature_platelets: "Thrombocytopenia (Platelets < 100,000/\u00B5L)",
    severeFeature_liver: "Impaired Liver Function (Transaminases > 2x normal, or severe persistent right upper quadrant/epigastric pain)",
    severeFeature_renal: "Progressive Renal Insufficiency (Serum creatinine > 1.1 mg/dL or doubling)",
    severeFeature_pulmonary: "Pulmonary Edema",
    severeFeature_cerebral: "Cerebral or Visual Disturbances (New-onset severe headache, scotomata, photopsia)",
    noSevereFeatures: "No severe features checked.",
    severeFeaturesPresent: "Severe Features Present!",
    severeFeaturesAction: "Requires urgent hospitalization, close maternal/fetal monitoring, magnesium sulfate for seizure prophylaxis, and consideration for delivery (especially if gestation \u2265 34 weeks).",

    // APGAR
    apgarTime: "စစ်ဆေးသည့်အချိန်",
    min1: "1-Minute Score",
    min5: "5-Minute Score",
    appearance: "Appearance (Skin Color)",
    pulse: "Pulse (Heart Rate)",
    grimace: "Grimace (Reflex Irritability)",
    muscleTone: "Activity (Muscle Tone)",
    respiration: "Respiration (Breathing Effort)",
    apgarScore: "APGAR Score",
    apgarNormal: "Normal / Reassuring (Score 7 - 10)",
    apgarModerate: "Moderately Abnormal (Score 4 - 6)",
    apgarCritical: "Critically Low (Score 0 - 3)",
    apgarNormalRec: "The newborn is stable. Proceed with routine postpartum skin-to-skin contact, drying, and neonatal care.",
    apgarModerateRec: "Neonatal depression. Provide warm tactile stimulation, clear airway, administer supplemental oxygen, or consider positive pressure ventilation (PPV) if indicated.",
    apgarCriticalRec: "Severe neonatal depression. Initiate immediate resuscitation (NRP protocols) with PPV, chest compressions, or drug therapy as indicated.",

    // PPH Risk Stratification
    pphLow: "Low Risk PPH Profile",
    pphMedium: "Medium Risk PPH Profile",
    pphHigh: "High Risk PPH Profile",
    pphLowDesc: "Single gestation, < 4 prior vaginal births, no prior PPH, unscarred uterus.",
    pphMedChecklist: "Medium Risk Factors (Select all that apply):",
    pphHighChecklist: "High Risk Factors (Select all that apply):",
    pphMed_priorCS: "Prior cesarean section or uterine surgery",
    pphMed_multiples: "Multiple gestation (twins, triplets)",
    pphMed_grandMulti: "Grand multiparity (> 4 prior vaginal births)",
    pphMed_chorio: "Chorioamnionitis / Intrapartum infection",
    pphMed_poly: "Polyhydramnios or Macrosomia (EFW > 4.0 kg)",
    pphMed_fibroids: "Large uterine fibroids",
    pphMed_prolonged: "Prolonged active labor or prolonged oxytocin use",
    pphHigh_previa: "Placenta previa, low-lying placenta, or accreta spectrum",
    pphHigh_hematocrit: "Pre-admission hematocrit < 30% with other risk factors",
    pphHigh_platelets: "Thrombocytopenia (Platelets < 100,000/\u00B5L)",
    pphHigh_coag: "Known coagulopathy or active bleeding on admission",
    pphHigh_priorPPH: "History of severe postpartum hemorrhage",
    pphRiskStatus: "Patient PPH Risk Stratum",
    pphLowStatus: "LOW RISK",
    pphMedStatus: "MEDIUM RISK",
    pphHighStatus: "HIGH RISK",
    pphActionLow: "Prepare routine uterotonics (Oxytocin 10U IM/IV) active management of 3rd stage, massage fundus.",
    pphActionMed: "Routine active management, place wide-bore IV access (18G or larger), type & screen, have PPH cart nearby.",
    pphActionHigh: "Type & crossmatch 2-4 units RBCs, notify OB team/anesthesia, prepare active management tools, ready balloon tamponade or surgical interventions.",
    
    // General
    reset: "ပြန်လည်စတင်ရန် (Reset)",
    referenceText: "Clinical reference guidelines based on ACOG, RCOG, and WHO obstetric directives.",
  }
};

export function OBGYNCalculators() {
  const { lang } = useStore();
  const [activeCalc, setActiveCalc] = useState<"edd" | "bishop" | "map" | "apgar" | "pph">("edd");
  const tr = t[lang === "mm" ? "mm" : "en"];

  // 1. EDD & GA States
  const [eddMethod, setEddMethod] = useState<"lmp" | "us">("lmp");
  const [lmpDate, setLmpDate] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [scanDate, setScanDate] = useState<string>("");
  const [scanWeeks, setScanWeeks] = useState<number>(12);
  const [scanDays, setScanDays] = useState<number>(0);
  const [eddResult, setEddResult] = useState<string>("");
  const [gaWeeks, setGaWeeks] = useState<number | null>(null);
  const [gaDays, setGaDays] = useState<number | null>(null);
  const [trimesterText, setTrimesterText] = useState<string>("");
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  // 2. Bishop Score States
  const [bishopDilation, setBishopDilation] = useState<number>(0);
  const [bishopEffacement, setBishopEffacement] = useState<number>(0);
  const [bishopStation, setBishopStation] = useState<number>(0);
  const [bishopConsistency, setBishopConsistency] = useState<number>(0);
  const [bishopPosition, setBishopPosition] = useState<number>(0);

  // 3. MAP States
  const [systolic, setSystolic] = useState<number>(110);
  const [diastolic, setDiastolic] = useState<number>(70);
  const [severeFeatures, setSevereFeatures] = useState<Record<string, boolean>>({
    bp: false,
    platelets: false,
    liver: false,
    renal: false,
    pulmonary: false,
    cerebral: false,
  });

  // 4. APGAR States
  const [apgarAppearance, setApgarAppearance] = useState<number>(2);
  const [apgarPulse, setApgarPulse] = useState<number>(2);
  const [apgarGrimace, setApgarGrimace] = useState<number>(2);
  const [apgarActivity, setApgarActivity] = useState<number>(2);
  const [apgarRespiration, setApgarRespiration] = useState<number>(2);

  // 5. PPH States
  const [pphMedFactors, setPphMedFactors] = useState<Record<string, boolean>>({
    priorCS: false,
    multiples: false,
    grandMulti: false,
    chorio: false,
    poly: false,
    fibroids: false,
    prolonged: false,
  });
  const [pphHighFactors, setPphHighFactors] = useState<Record<string, boolean>>({
    previa: false,
    hematocrit: false,
    platelets: false,
    coag: false,
    priorPPH: false,
  });

  // Reset helpers
  const handleResetEdd = () => {
    setLmpDate("");
    setCycleLength(28);
    setScanDate("");
    setScanWeeks(12);
    setScanDays(0);
    setEddResult("");
    setGaWeeks(null);
    setGaDays(null);
    setTrimesterText("");
    setDaysRemaining(null);
  };

  const handleResetBishop = () => {
    setBishopDilation(0);
    setBishopEffacement(0);
    setBishopStation(0);
    setBishopConsistency(0);
    setBishopPosition(0);
  };

  const handleResetMap = () => {
    setSystolic(110);
    setDiastolic(70);
    setSevereFeatures({
      bp: false,
      platelets: false,
      liver: false,
      renal: false,
      pulmonary: false,
      cerebral: false,
    });
  };

  const handleResetApgar = () => {
    setApgarAppearance(2);
    setApgarPulse(2);
    setApgarGrimace(2);
    setApgarActivity(2);
    setApgarRespiration(2);
  };

  const handleResetPph = () => {
    setPphMedFactors({
      priorCS: false,
      multiples: false,
      grandMulti: false,
      chorio: false,
      poly: false,
      fibroids: false,
      prolonged: false,
    });
    setPphHighFactors({
      previa: false,
      hematocrit: false,
      platelets: false,
      coag: false,
      priorPPH: false,
    });
  };

  // --- Real-time calculators ---

  // 1. Calculate EDD / GA
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eddMethod === "lmp") {
      if (!lmpDate) {
        setEddResult("");
        setGaWeeks(null);
        setGaDays(null);
        setTrimesterText("");
        setDaysRemaining(null);
        return;
      }

      const lmp = new Date(lmpDate);
      lmp.setHours(0, 0, 0, 0);

      if (lmp > today) {
        setEddResult(tr.futureDateError);
        setGaWeeks(null);
        return;
      }

      // Adjustment for cycle length (standard is 28 days)
      const adjustmentDays = cycleLength - 28;

      // EDD = LMP + 280 days + adjustment
      const edd = new Date(lmp.getTime() + (280 + adjustmentDays) * 24 * 60 * 60 * 1000);
      setEddResult(edd.toLocaleDateString(lang === "mm" ? "my-MM" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }));

      // Current GA
      const timeDiff = today.getTime() - lmp.getTime();
      const diffDays = Math.floor(timeDiff / (24 * 60 * 60 * 1000)) - adjustmentDays;

      if (diffDays < 0) {
        setGaWeeks(0);
        setGaDays(0);
        setTrimesterText(tr.tri1);
      } else {
        const w = Math.floor(diffDays / 7);
        const d = diffDays % 7;
        setGaWeeks(w);
        setGaDays(d);

        // Trimester calculation
        if (w < 14) {
          setTrimesterText(tr.tri1);
        } else if (w < 28) {
          setTrimesterText(tr.tri2);
        } else {
          setTrimesterText(tr.tri3);
        }
      }

      // Days remaining
      const remainDiff = edd.getTime() - today.getTime();
      const remainDays = Math.ceil(remainDiff / (24 * 60 * 60 * 1000));
      setDaysRemaining(remainDays > 0 ? remainDays : 0);

    } else {
      // Ultrasound method
      if (!scanDate) {
        setEddResult("");
        setGaWeeks(null);
        setGaDays(null);
        setTrimesterText("");
        setDaysRemaining(null);
        return;
      }

      const scan = new Date(scanDate);
      scan.setHours(0, 0, 0, 0);

      if (scan > today) {
        setEddResult(tr.futureDateError);
        setGaWeeks(null);
        return;
      }

      const scanGaDays = (scanWeeks * 7) + scanDays;
      const elapsedMs = today.getTime() - scan.getTime();
      const elapsedDays = Math.floor(elapsedMs / (24 * 60 * 60 * 1000));

      const totalGaDays = scanGaDays + elapsedDays;
      const w = Math.floor(totalGaDays / 7);
      const d = totalGaDays % 7;

      setGaWeeks(w);
      setGaDays(d);

      if (w < 14) {
        setTrimesterText(tr.tri1);
      } else if (w < 28) {
        setTrimesterText(tr.tri2);
      } else {
        setTrimesterText(tr.tri3);
      }

      // EDD based on scan: ScanDate + (280 - scanGaDays) days
      const daysToDue = 280 - scanGaDays;
      const edd = new Date(scan.getTime() + daysToDue * 24 * 60 * 60 * 1000);
      setEddResult(edd.toLocaleDateString(lang === "mm" ? "my-MM" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }));

      const remainDiff = edd.getTime() - today.getTime();
      const remainDays = Math.ceil(remainDiff / (24 * 60 * 60 * 1000));
      setDaysRemaining(remainDays > 0 ? remainDays : 0);
    }
  }, [eddMethod, lmpDate, cycleLength, scanDate, scanWeeks, scanDays, lang, tr]);

  // 2. Calculate Bishop Score
  const totalBishopScore =
    bishopDilation +
    bishopEffacement +
    bishopStation +
    bishopConsistency +
    bishopPosition;

  // 3. Calculate MAP
  const calculatedMap = Math.round((systolic + 2 * diastolic) / 3);
  const mapSeverity = calculatedMap >= 85 ? "high" : "normal";
  const activeSevereFeaturesCount = Object.values(severeFeatures).filter(Boolean).length;

  // 4. APGAR Score
  const apgarScore =
    apgarAppearance +
    apgarPulse +
    apgarGrimace +
    apgarActivity +
    apgarRespiration;

  // 5. PPH Risk
  const activePphMedCount = Object.values(pphMedFactors).filter(Boolean).length;
  const activePphHighCount = Object.values(pphHighFactors).filter(Boolean).length;
  let pphRiskLevel: "low" | "medium" | "high" = "low";
  if (activePphHighCount > 0) {
    pphRiskLevel = "high";
  } else if (activePphMedCount > 0) {
    pphRiskLevel = "medium";
  }

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100 overflow-x-auto">
        <button
          onClick={() => setActiveCalc("edd")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
            activeCalc === "edd"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
              : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>{tr.eddGa}</span>
        </button>

        <button
          onClick={() => setActiveCalc("bishop")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
            activeCalc === "bishop"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
              : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Activity className="h-4 w-4" />
          <span>{tr.bishop}</span>
        </button>

        <button
          onClick={() => setActiveCalc("map")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
            activeCalc === "map"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
              : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Thermometer className="h-4 w-4" />
          <span>{tr.preeclampsia}</span>
        </button>

        <button
          onClick={() => setActiveCalc("apgar")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
            activeCalc === "apgar"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
              : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Baby className="h-4 w-4" />
          <span>{tr.apgar}</span>
        </button>

        <button
          onClick={() => setActiveCalc("pph")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
            activeCalc === "pph"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
              : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <ShieldAlert className="h-4 w-4" />
          <span>{tr.pph}</span>
        </button>
      </div>

      {/* --- 1. EDD & Gestational Age Calculator --- */}
      {activeCalc === "edd" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
          <div className="md:col-span-6 space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
              <label className="text-xs font-black text-slate-700 block uppercase tracking-wider">
                {tr.method}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEddMethod("lmp")}
                  className={`py-2 px-3 rounded-xl font-bold text-xs border transition ${
                    eddMethod === "lmp"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {tr.lmpMode}
                </button>
                <button
                  onClick={() => setEddMethod("us")}
                  className={`py-2 px-3 rounded-xl font-bold text-xs border transition ${
                    eddMethod === "us"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {tr.usMode}
                </button>
              </div>
            </div>

            {eddMethod === "lmp" ? (
              <div className="p-5 border border-slate-100 bg-white rounded-3xl shadow-sm space-y-4">
                <div>
                  <label className="text-xs font-black text-slate-700 block uppercase tracking-wider mb-2">
                    {tr.lmpDate}
                  </label>
                  <input
                    type="date"
                    value={lmpDate}
                    onChange={(e) => setLmpDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-black text-slate-700 block uppercase tracking-wider">
                      {tr.cycleLength}
                    </label>
                    <span className="text-xs font-bold font-mono text-indigo-600">{cycleLength}</span>
                  </div>
                  <input
                    type="range"
                    min="21"
                    max="45"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>21 d</span>
                    <span>28 d (Normal)</span>
                    <span>45 d</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 border border-slate-100 bg-white rounded-3xl shadow-sm space-y-4">
                <div>
                  <label className="text-xs font-black text-slate-700 block uppercase tracking-wider mb-2">
                    {tr.scanDate}
                  </label>
                  <input
                    type="date"
                    value={scanDate}
                    onChange={(e) => setScanDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block uppercase tracking-wider mb-2">
                    {tr.gaAtScan}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                        {tr.weeks}
                      </span>
                      <select
                        value={scanWeeks}
                        onChange={(e) => setScanWeeks(parseInt(e.target.value))}
                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-bold font-mono"
                      >
                        {Array.from({ length: 41 }, (_, i) => i).map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                        {tr.days}
                      </span>
                      <select
                        value={scanDays}
                        onChange={(e) => setScanDays(parseInt(e.target.value))}
                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-bold font-mono"
                      >
                        {Array.from({ length: 7 }, (_, i) => i).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleResetEdd}
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition mx-auto"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{tr.reset}</span>
            </button>
          </div>

          <div className="md:col-span-6">
            <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] h-full flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  {tr.calcResults}
                </h4>

                <div className="space-y-4">
                  {/* Current GA Display */}
                  <div className="p-4 bg-white rounded-2xl border border-indigo-100">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-0.5">
                      {tr.currentGa}
                    </span>
                    {gaWeeks !== null ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-indigo-600 font-mono">
                          {gaWeeks}
                        </span>
                        <span className="text-xs font-bold text-slate-600 mr-2">
                          {lang === "mm" ? "ပတ်" : "Weeks"}
                        </span>
                        <span className="text-2xl font-black text-indigo-600 font-mono">
                          {gaDays}
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          {lang === "mm" ? "ရက်" : "Days"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-black text-slate-400 italic">
                        {tr.invalidInput}
                      </span>
                    )}
                  </div>

                  {/* EDD Display */}
                  <div className="p-4 bg-white rounded-2xl border border-indigo-100">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">
                      {tr.eddLabel}
                    </span>
                    {eddResult ? (
                      <span className="text-sm font-black text-indigo-950 block">
                        {eddResult}
                      </span>
                    ) : (
                      <span className="text-sm font-black text-slate-400 italic">
                        {tr.invalidInput}
                      </span>
                    )}
                  </div>

                  {/* Trimester & Days Remaining row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-white rounded-2xl border border-indigo-100">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">
                        {tr.trimester}
                      </span>
                      <span className="text-xs font-black text-slate-700 block">
                        {trimesterText || tr.notApplicable}
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-indigo-100">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">
                        {tr.daysRemaining}
                      </span>
                      {daysRemaining !== null ? (
                        <span className="text-base font-black text-indigo-600 font-mono">
                          {daysRemaining}
                        </span>
                      ) : (
                        <span className="text-xs font-black text-slate-400 italic">
                          {tr.notApplicable}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 italic flex items-center gap-1">
                <Info className="h-3 w-3 shrink-0" />
                <span>{tr.referenceText}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. Bishop Score Calculator --- */}
      {activeCalc === "bishop" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-5">
              {/* Dilation */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr.dilation}
                  </span>
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    +{bishopDilation} {tr.points}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Closed", val: 0 },
                    { label: "1-2 cm", val: 1 },
                    { label: "3-4 cm", val: 2 },
                    { label: "≥ 5 cm", val: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setBishopDilation(opt.val)}
                      className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                        bishopDilation === opt.val
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Effacement */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr.effacement}
                  </span>
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    +{bishopEffacement} {tr.points}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "0-30%", val: 0 },
                    { label: "40-50%", val: 1 },
                    { label: "60-70%", val: 2 },
                    { label: "≥ 80%", val: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setBishopEffacement(opt.val)}
                      className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                        bishopEffacement === opt.val
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Station */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr.station}
                  </span>
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    +{bishopStation} {tr.points}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "-3", val: 0 },
                    { label: "-2", val: 1 },
                    { label: "-1 / 0", val: 2 },
                    { label: "+1 / +2", val: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setBishopStation(opt.val)}
                      className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                        bishopStation === opt.val
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consistency & Position (Grid of 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Consistency */}
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {tr.consistency}
                    </span>
                    <span className="text-xs font-black text-indigo-600 font-mono">
                      +{bishopConsistency} {tr.points}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: "Firm", val: 0 },
                      { label: "Medium", val: 1 },
                      { label: "Soft", val: 2 },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setBishopConsistency(opt.val)}
                        className={`p-2 rounded-xl text-[11px] font-bold border transition text-center ${
                          bishopConsistency === opt.val
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Position */}
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {tr.position}
                    </span>
                    <span className="text-xs font-black text-indigo-600 font-mono">
                      +{bishopPosition} {tr.points}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: "Post.", val: 0 },
                      { label: "Mid.", val: 1 },
                      { label: "Ant.", val: 2 },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setBishopPosition(opt.val)}
                        className={`p-2 rounded-xl text-[11px] font-bold border transition text-center ${
                          bishopPosition === opt.val
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleResetBishop}
                className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition mx-auto"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{tr.reset}</span>
              </button>
            </div>

            <div className="md:col-span-4">
              <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    {tr.totalBishop}
                  </h4>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-3xl font-black text-white font-mono shadow-md">
                      {totalBishopScore}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-indigo-600 block">
                        Interpretation
                      </span>
                      <span className="text-sm font-black text-indigo-950">
                        {totalBishopScore >= 9
                          ? tr.highlyFavorable
                          : totalBishopScore >= 6
                          ? tr.favorable
                          : tr.unfavorable}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-indigo-100 space-y-2">
                    <h5 className="text-[11px] font-black uppercase text-indigo-600 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-indigo-500" />
                      {tr.bishopRecommendation}
                    </h5>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      {totalBishopScore >= 9
                        ? tr.bishopRecHighlyFavorable
                        : totalBishopScore >= 6
                        ? tr.bishopRecFavorable
                        : tr.bishopRecUnfavorable}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 italic flex items-center gap-1">
                  <Info className="h-3 w-3 shrink-0" />
                  <span>{tr.referenceText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. MAP & Preeclampsia --- */}
      {activeCalc === "map" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
          <div className="md:col-span-6 space-y-5">
            <div className="p-5 border border-slate-100 bg-white rounded-3xl shadow-sm space-y-4">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest border-b border-slate-50 pb-2">
                Blood Pressure Input
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black text-slate-500 block uppercase mb-1">
                    {tr.systolic}
                  </label>
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-base font-black font-mono text-indigo-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-500 block uppercase mb-1">
                    {tr.diastolic}
                  </label>
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-base font-black font-mono text-indigo-900"
                  />
                </div>
              </div>

              {/* MAP Display Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                    {tr.mapResult}
                  </span>
                  <span className="text-xl font-black text-indigo-900 font-mono">
                    {calculatedMap} mmHg
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    mapSeverity === "high"
                      ? "bg-rose-50 text-rose-600 border border-rose-100"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}
                >
                  {mapSeverity === "high" ? tr.mapElevated : tr.mapNormal}
                </div>
              </div>

              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                {tr.mapInfo}
              </p>
            </div>

            <button
              onClick={handleResetMap}
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition mx-auto"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{tr.reset}</span>
            </button>
          </div>

          <div className="md:col-span-6 space-y-4">
            <div className="p-5 border border-slate-100 bg-white rounded-3xl shadow-sm space-y-4">
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-rose-500" />
                  {tr.severeFeatures}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">
                  {tr.severeDesc}
                </p>
              </div>

              <div className="space-y-2.5">
                {Object.keys(severeFeatures).map((key) => {
                  const labelKey = `severeFeature_${key}` as keyof typeof tr;
                  const isChecked = severeFeatures[key];
                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setSevereFeatures((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }))
                      }
                      className={`w-full p-3 rounded-xl border text-left flex gap-3 items-start transition ${
                        isChecked
                          ? "bg-rose-50/50 border-rose-200 text-slate-800 font-black shadow-sm"
                          : "bg-slate-50/40 border-slate-100 hover:bg-slate-50 text-slate-600 font-bold"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="h-4 w-4 text-rose-600" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-300" />
                        )}
                      </div>
                      <span className="text-[11px] leading-relaxed">
                        {tr[labelKey]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {activeSevereFeaturesCount > 0 ? (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 space-y-1">
                  <h5 className="text-[11px] font-black uppercase text-rose-600 flex items-center gap-1.5 animate-pulse">
                    <ShieldAlert className="h-4.5 w-4.5" />
                    {tr.severeFeaturesPresent}
                  </h5>
                  <p className="text-xs text-rose-950 font-bold leading-relaxed">
                    {tr.severeFeaturesAction}
                  </p>
                </div>
              ) : (
                <div className="p-3 text-center text-[10px] text-slate-400 font-black uppercase bg-slate-50 border border-slate-100 rounded-xl">
                  {tr.noSevereFeatures}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- 4. APGAR Score Calculator --- */}
      {activeCalc === "apgar" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-4">
              {/* Appearance */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr.appearance}
                  </span>
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    +{apgarAppearance} pts
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { label: "0: Pale / Blue all over", val: 0 },
                    { label: "1: Pink body, blue extremities", val: 1 },
                    { label: "2: Completely pink", val: 2 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarAppearance(opt.val)}
                      className={`p-2.5 rounded-xl text-left sm:text-center text-[11px] font-bold border transition ${
                        apgarAppearance === opt.val
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pulse */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr.pulse}
                  </span>
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    +{apgarPulse} pts
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { label: "0: Absent", val: 0 },
                    { label: "1: < 100 bpm", val: 1 },
                    { label: "2: ≥ 100 bpm", val: 2 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarPulse(opt.val)}
                      className={`p-2.5 rounded-xl text-left sm:text-center text-[11px] font-bold border transition ${
                        apgarPulse === opt.val
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grimace */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr.grimace}
                  </span>
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    +{apgarGrimace} pts
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { label: "0: No response", val: 0 },
                    { label: "1: Grimace / feeble cry", val: 1 },
                    { label: "2: Cry, sneeze, cough, withdraw", val: 2 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarGrimace(opt.val)}
                      className={`p-2.5 rounded-xl text-left sm:text-center text-[11px] font-bold border transition ${
                        apgarGrimace === opt.val
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Muscle Tone */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr.muscleTone}
                  </span>
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    +{apgarActivity} pts
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { label: "0: Loose / floppy", val: 0 },
                    { label: "1: Some flexion of extremities", val: 1 },
                    { label: "2: Active motion", val: 2 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarActivity(opt.val)}
                      className={`p-2.5 rounded-xl text-left sm:text-center text-[11px] font-bold border transition ${
                        apgarActivity === opt.val
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Respiration */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr.respiration}
                  </span>
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    +{apgarRespiration} pts
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { label: "0: Absent", val: 0 },
                    { label: "1: Slow, irregular, weak cry", val: 1 },
                    { label: "2: Vigorous cry, good breathing", val: 2 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarRespiration(opt.val)}
                      className={`p-2.5 rounded-xl text-left sm:text-center text-[11px] font-bold border transition ${
                        apgarRespiration === opt.val
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleResetApgar}
                className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition mx-auto"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{tr.reset}</span>
              </button>
            </div>

            <div className="md:col-span-4">
              <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    {tr.apgarScore}
                  </h4>

                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white font-mono shadow-md ${
                        apgarScore >= 7
                          ? "bg-emerald-600"
                          : apgarScore >= 4
                          ? "bg-amber-500"
                          : "bg-rose-600"
                      }`}
                    >
                      {apgarScore}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-indigo-600 block">
                        Status
                      </span>
                      <span className="text-xs font-black text-indigo-950">
                        {apgarScore >= 7
                          ? tr.apgarNormal
                          : apgarScore >= 4
                          ? tr.apgarModerate
                          : tr.apgarCritical}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-indigo-100 space-y-2">
                    <h5 className="text-[11px] font-black uppercase text-indigo-600 flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-indigo-500" />
                      {tr.bishopRecommendation}
                    </h5>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      {apgarScore >= 7
                        ? tr.apgarNormalRec
                        : apgarScore >= 4
                        ? tr.apgarModerateRec
                        : tr.apgarCriticalRec}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 italic flex items-center gap-1">
                  <Info className="h-3 w-3 shrink-0" />
                  <span>{tr.referenceText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 5. PPH Risk Stratification --- */}
      {activeCalc === "pph" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
          <div className="md:col-span-8 space-y-5">
            {/* Low Risk Profile */}
            <div className="p-4 border border-emerald-100 bg-emerald-50/20 rounded-3xl space-y-1">
              <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                {tr.pphLow}
              </h4>
              <p className="text-xs text-emerald-900/80 font-bold leading-relaxed">
                {tr.pphLowDesc}
              </p>
            </div>

            {/* Medium Risk Checklist */}
            <div className="p-5 border border-slate-100 bg-white rounded-3xl shadow-sm space-y-3">
              <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest border-b border-slate-50 pb-2">
                {tr.pphMedChecklist}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.keys(pphMedFactors).map((key) => {
                  const labelKey = `pphMed_${key}` as keyof typeof tr;
                  const isChecked = pphMedFactors[key];
                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setPphMedFactors((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }))
                      }
                      className={`p-3 rounded-xl border text-left flex gap-3 items-start transition ${
                        isChecked
                          ? "bg-amber-50/40 border-amber-200 text-slate-800 font-black shadow-sm"
                          : "bg-slate-50/40 border-slate-100 hover:bg-slate-50 text-slate-600 font-bold"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="h-4 w-4 text-amber-600" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-300" />
                        )}
                      </div>
                      <span className="text-[10px] leading-relaxed">
                        {tr[labelKey]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* High Risk Checklist */}
            <div className="p-5 border border-slate-100 bg-white rounded-3xl shadow-sm space-y-3">
              <h4 className="text-xs font-black text-rose-700 uppercase tracking-widest border-b border-slate-50 pb-2">
                {tr.pphHighChecklist}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.keys(pphHighFactors).map((key) => {
                  const labelKey = `pphHigh_${key}` as keyof typeof tr;
                  const isChecked = pphHighFactors[key];
                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setPphHighFactors((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }))
                      }
                      className={`p-3 rounded-xl border text-left flex gap-3 items-start transition ${
                        isChecked
                          ? "bg-rose-50/40 border-rose-200 text-slate-800 font-black shadow-sm"
                          : "bg-slate-50/40 border-slate-100 hover:bg-slate-50 text-slate-600 font-bold"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="h-4 w-4 text-rose-600" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-300" />
                        )}
                      </div>
                      <span className="text-[10px] leading-relaxed">
                        {tr[labelKey]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleResetPph}
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition mx-auto"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{tr.reset}</span>
            </button>
          </div>

          <div className="md:col-span-4">
            <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  {tr.pphRiskStatus}
                </h4>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-center p-1 font-black text-white text-xs leading-none uppercase shadow-md ${
                      pphRiskLevel === "high"
                        ? "bg-rose-600"
                        : pphRiskLevel === "medium"
                        ? "bg-amber-500"
                        : "bg-emerald-600"
                    }`}
                  >
                    {pphRiskLevel === "high"
                      ? tr.pphHighStatus
                      : pphRiskLevel === "medium"
                      ? tr.pphMedStatus
                      : tr.pphLowStatus}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-600 block">
                      Active Factors
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Med: {activePphMedCount} | High: {activePphHighCount}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-indigo-100 space-y-2">
                  <h5 className="text-[11px] font-black uppercase text-indigo-600 flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500" />
                    Preparedness Plan
                  </h5>
                  <p className="text-xs text-slate-700 font-bold leading-relaxed">
                    {pphRiskLevel === "high"
                      ? tr.pphActionHigh
                      : pphRiskLevel === "medium"
                      ? tr.pphActionMed
                      : tr.pphActionLow}
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 italic flex items-center gap-1">
                <Info className="h-3 w-3 shrink-0" />
                <span>{tr.referenceText}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
