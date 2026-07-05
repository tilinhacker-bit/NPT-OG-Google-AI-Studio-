import React, { useState } from "react";
import {
  BookOpen,
  Search,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { useStore } from "../store/useStore";

export interface FactItem {
  id: string;
  category: "ctg" | "htn" | "pph" | "labor" | "emergencies" | "anc" | "pnc" | "gyn" | "ward";
  titleEn: string;
  titleMm: string;
  subtitle: string;
  bullets: string[];
  warnings?: string[];
  reference: string;
}

export const OBGYN_FACTS_LIST: FactItem[] = [
    {
      id: "ctg-nice-normal",
      category: "ctg",
      titleEn: "NICE CTG Categorisation: Normal",
      titleMm: "NICE CTG သတ်မှတ်ချက် - Normal (ပုံမှန်အခြေအနေ)",
      subtitle: "All four FHR features are reassuring. Strongly predictive of normal fetal acid-base status.",
      bullets: [
        "Baseline FHR: 110 - 160 bpm (Reassuring)",
        "Baseline Variability: 5 - 25 bpm (Reassuring)",
        "Decelerations: None or early decelerations only (Reassuring)",
        "Accelerations: Present (absence of accelerations in an otherwise normal CTG is of uncertain clinical significance)",
        "Clinical Action: Continue standard/routine intrapartum labor care. No active resuscitation or intervention required."
      ],
      reference: "NICE Guideline NG229 (Intrapartum Care)"
    },
    {
      id: "ctg-nice-suspicious",
      category: "ctg",
      titleEn: "NICE CTG Categorisation: Suspicious",
      titleMm: "NICE CTG သတ်မှတ်ချက် - Suspicious (သံသယရှိဖွယ်အခြေအနေ)",
      subtitle: "Exactly 1 non-reassuring feature and 3 reassuring features. Requires close review and optimization.",
      bullets: [
        "Non-reassuring Baseline: 100 - 109 bpm OR 161 - 180 bpm",
        "Non-reassuring Variability: < 5 bpm for 30 - 50 minutes OR > 25 bpm for 15 - 25 minutes",
        "Non-reassuring Decelerations: Variable decelerations for 90 minutes or more without concerning characteristics",
        "Clinical Action: Correct underlying causes (e.g., maternal hypotension, dehydration, pyrexia). Change maternal position, review overall clinical picture, and continue monitoring."
      ],
      reference: "NICE Guideline NG229 (Intrapartum Care)"
    },
    {
      id: "ctg-nice-pathological",
      category: "ctg",
      titleEn: "NICE CTG Categorisation: Pathological",
      titleMm: "NICE CTG သတ်မှတ်ချက် - Pathological (စိုးရိမ်ရသော ပုံမှန်မဟုတ်သည့်အခြေအနေ)",
      subtitle: "2 or more non-reassuring features OR 1 or more abnormal features. Urgent senior obstetric review required.",
      bullets: [
        "Abnormal Baseline: < 100 bpm OR > 180 bpm OR sinusoidal pattern for ≥ 10 minutes",
        "Abnormal Variability: < 5 bpm for > 50 minutes OR > 25 bpm for > 25 minutes",
        "Abnormal Decelerations: Recurrent late decelerations for ≥ 30 minutes, atypical variable decelerations with concerning features, or prolonged deceleration > 3 minutes",
        "Clinical Action: Immediate senior obstetric consult. Exclude cord prolapse. Implement intrauterine resuscitation (reposition, IV fluids, stop Oxytocin/Syntocinon). Prepare for category 1 or 2 Caesarean Section or operative vaginal birth if unresponsive."
      ],
      warnings: [
        "Clinical Alert: A pathological CTG warrants prompt decision for birth (within 30 minutes for Category 1 Caesarean Section) if intrauterine resuscitation is unsuccessful."
      ],
      reference: "NICE Guideline NG229 (Intrapartum Care)"
    },
    {
      id: "htn-nice-diag",
      category: "htn",
      titleEn: "NICE Hypertension Diagnostic & Management Criteria",
      titleMm: "NICE Hypertension (သွေးတိုးရောဂါ ရှာဖွေမှုနှင့် ကုသမှုစံနှုန်းများ)",
      subtitle: "Diagnostic thresholds and initiation of pharmacological treatment in pregnancy.",
      bullets: [
        "Gestational HTN: BP ≥ 140/90 mmHg presenting after 20 weeks gestation, without pre-existing hypertension or proteinuria.",
        "Preeclampsia: BP ≥ 140/90 mmHg after 20 weeks WITH proteinuria (Protein-Creatinine Ratio PCR ≥ 30 mg/mmol, 24-hr protein ≥ 0.3g, or persistent urine dipstick ≥ 1+).",
        "Severe Hypertension: BP ≥ 160/110 mmHg. Requires immediate critical care admission, continuous monitoring, and emergency treatment.",
        "Treatment Threshold: Initiate antihypertensive treatment if BP is persistently ≥ 140/90 mmHg (target to maintain SBP < 135 mmHg and DBP < 85 mmHg).",
        "Antihypertensive Options: Labetalol orally (first-line; avoid in active asthma). Nifedipine modified-release (second-line). Methyldopa (third-line)."
      ],
      reference: "NICE Guideline NG133 (Hypertension in pregnancy)"
    },
    {
      id: "htn-rcog-mag",
      category: "htn",
      titleEn: "Magnesium Sulfate Protocol (UK/RCOG)",
      titleMm: "Magnesium Sulfate (RCOG အတက်သက်သာစေရန် ကုထုံးလမ်းညွှန်ချက်)",
      subtitle: "Standard UK protocol for seizure prophylaxis and treatment in severe preeclampsia.",
      bullets: [
        "Loading Dose: 4g Magnesium Sulfate IV over 5 - 15 minutes.",
        "Maintenance Dose: 1g/hour IV continuous infusion for 24 hours postpartum or 24 hours after the last seizure.",
        "Clinical Monitoring: Check patellar (deep tendon) reflexes, respiratory rate (≥ 12/min), and urine output (≥ 25 mL/hour).",
        "Toxicity Treatment: If toxicity is suspected (e.g., respiratory depression, loss of reflexes), stop the infusion immediately and administer Calcium Gluconate 1g IV (10 mL of 10% solution) over 10 minutes."
      ],
      warnings: [
        "Maternal safety warning: In patients with renal impairment (Creatinine > 1.1 mg/dL or oliguria), reduce maintenance dose to 0.5g/hour or monitor serum magnesium levels closely."
      ],
      reference: "RCOG Green-top Guideline / NICE NG133"
    },
    {
      id: "pph-rcog-minor-major",
      category: "pph",
      titleEn: "RCOG Postpartum Hemorrhage (PPH) Definitions",
      titleMm: "RCOG PPH (မွေးဖွားပြီး သွေးလွန်ခြင်း သတ်မှတ်ချက်များ)",
      subtitle: "Standard UK classification of PPH by volume of blood loss.",
      bullets: [
        "Minor PPH: Estimated blood loss of 500 - 1000 mL, without clinical signs of shock.",
        "Major PPH: Divided into Moderate (1000 - 2000 mL) and Severe (> 2000 mL or signs of clinical shock/hemodynamic instability).",
        "Active Management of 3rd Stage: Routinely administer Oxytocin 5-10 IU IM or slow IV to all low-risk women to prevent PPH. Syntometrine (Oxytocin + Ergometrine) can be used (avoid in HTN)."
      ],
      reference: "RCOG Green-top Guideline No. 52"
    },
    {
      id: "pph-rcog-meds",
      category: "pph",
      titleEn: "Uterotonic Drugs Treatment Sequence (RCOG)",
      titleMm: "Uterotonic Drugs (သွေးလွန်ခြင်း ကုသဆေးများ သုံးစွဲပုံအဆင့်ဆင့်)",
      subtitle: "Sequential drug therapy for refractory postpartum hemorrhage (RCOG standard).",
      bullets: [
        "1st Line: Oxytocin 5 IU by slow IV injection (may repeat once), followed by Oxytocin IV infusion (40 IU in 500 mL normal saline at 10 mL/hour or 125 mL/hour).",
        "2nd Line: Ergometrine 500 mcg IM or slow IV. Absolutely avoid in women with hypertension, preeclampsia, or cardiac disease.",
        "3rd Line: Carboprost (Hemabate) 250 mcg IM every 15 minutes, up to a maximum of 8 doses. Absolutely avoid in women with active asthma.",
        "4th Line: Misoprostol 800 mcg sublingually. Useful adjuvant when other options are exhausted.",
        "Tranexamic Acid (TXA): Routinely give 1g IV over 10 minutes (within 3 hours of delivery) in addition to uterotonics."
      ],
      warnings: [
        "Ergometrine is strictly contraindicated in hypertension. Hemabate (Carboprost) is strictly contraindicated in active asthma. Always verify medical history!"
      ],
      reference: "RCOG Green-top Guideline No. 52"
    },
    {
      id: "iol-nice-bishop",
      category: "labor",
      titleEn: "Induction of Labour & Bishop Score (NICE)",
      titleMm: "Induction of Labour (NICE သားဖွားနှိုးဆွခြင်း လမ်းညွှန်ချက်)",
      subtitle: "Cervical assessment and pharmacological choices for labor induction.",
      bullets: [
        "Unfavourable Cervix: Bishop Score ≤ 6. Indicates cervical ripening is necessary before starting oxytocin/amniotomy.",
        "Favourable Cervix: Bishop Score > 6. Successful induction is highly likely. May proceed directly to amniotomy and oxytocin.",
        "Recommended Ripening Agent: Vaginal prostaglandin E2 (dinoprostone) is the primary recommended agent (Propess slow-release pessary or Prostin gel).",
        "Alternative Ripening: Balloon catheter (mechanical induction) is recommended as a highly effective and safe alternative, especially if PGE2 is contraindicated or in high-risk women."
      ],
      reference: "NICE Guideline NG207 (Induction of labour)"
    },
  {
    id: "labor-partogram",
    category: "labor",
    titleEn: "Normal Labor & Partograms",
    titleMm: "ပုံမှန်မွေးဖွားခြင်းနှင့် မွေးဖွားမှုမှတ်တမ်း (Partograph)",
    subtitle: "Criteria for active labor and monitoring.",
    bullets: [
      "Active Labor: Regular painful contractions, cervical dilation ≥ 4 cm (or ≥ 5 cm as per updated WHO).",
      "Fetal Heart Rate: Listen every 15-30 mins in first stage, every 5 mins in second stage.",
      "Contractions & Vitals: Assess contractions half-hourly. Check maternal BP, pulse, temp every 4 hours.",
      "WHO Partograph: Plot dilation. Alert line (1cm/hr). Action line (4 hours to the right of Alert line)."
    ],
    reference: "Myanmar Official Guidelines / WHO"
  },
  {
    id: "labor-deliveries",
    category: "labor",
    titleEn: "Conducting Deliveries",
    titleMm: "ကလေးမွေးဖွားခြင်း",
    subtitle: "Steps for normal vaginal delivery and episiotomy.",
    bullets: [
      "Head Delivery: Control the head to prevent perineal tears. Support the perineum.",
      "Restitution & External Rotation: Wait for the head to rotate naturally before delivering shoulders.",
      "Episiotomy: Indicated for fetal distress, operative vaginal delivery, or rigid perineum. Perform mediolateral episiotomy during a contraction when the perineum is thinned out."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "labor-amtsl",
    category: "labor",
    titleEn: "AMTSL",
    titleMm: "မွေးဖွားခြင်း တတိယအဆင့်ကို တက်ကြွစွာစီမံခန့်ခွဲခြင်း (AMTSL)",
    subtitle: "Active Management of the Third Stage of Labor.",
    bullets: [
      "Uterotonic: Administer IM Oxytocin 10 IU within 1 minute of birth.",
      "Controlled Cord Traction: Apply counter-traction above the pubic bone to prevent uterine inversion.",
      "Uterine Massage: Immediately after placental delivery to ensure the uterus is contracted."
    ],
    reference: "Myanmar Official Guidelines / WHO"
  },
  {
    id: "emergencies-intrapartum",
    category: "emergencies",
    titleEn: "Intrapartum Emergencies (First-Responder)",
    titleMm: "မွေးဖွားစဉ် အရေးပေါ်အခြေအနေများ",
    subtitle: "First-responder steps for shoulder dystocia and cord prolapse.",
    bullets: [
      "Shoulder Dystocia: HELPERR mnemonic. Call for Help, Episiotomy, Legs (McRoberts' maneuver), Pressure (Suprapubic), Enter (Internal maneuvers), Remove posterior arm, Roll patient.",
      "Cord Prolapse: Call for help. Relieve cord pressure manually or fill bladder with 500ml normal saline. Knee-chest position. Prepare for emergency LSCS."
    ],
    warnings: ["Do not push the cord back in. Do not apply fundal pressure in shoulder dystocia."],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "emergencies-pph",
    category: "emergencies",
    titleEn: "Postpartum Haemorrhage (PPH)",
    titleMm: "မွေးဖွားပြီးနောက် သွေးသွန်ခြင်း (PPH)",
    subtitle: "First 15 minutes response.",
    bullets: [
      "Resuscitation: Shout for help. 2 large-bore IV cannulas. Rapid fluid resuscitation (Crystalloids).",
      "Bimanual Compression: Compress uterus between a fist in the anterior fornix and a hand on the abdomen.",
      "Uterotonics: Oxytocin 40 IU in 500ml normal saline at 125ml/hr. IM Ergometrine 0.5mg (Avoid if hypertensive). Misoprostol 800mcg sublingually/rectally."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "emergencies-eclampsia",
    category: "emergencies",
    titleEn: "Severe Pre-Eclampsia & Eclampsia",
    titleMm: "ကိုယ်ဝန်ဆိပ်တက်ခြင်းနှင့် အတက်ရောဂါ",
    subtitle: "Magnesium Sulfate and antihypertensive protocols.",
    bullets: [
      "Magnesium Sulfate: 4g IV loading dose over 5-15 mins. Maintenance 1-2g/hr IV. (Or IM regimen: 10g deep IM stat, then 5g every 4 hrs).",
      "Antihypertensives: Target BP < 150/100. IV Hydralazine, oral Nifedipine, or IV Labetalol.",
      "Toxicity: Monitor reflexes, respiratory rate, urine output. Antidote: Calcium Gluconate 1g IV over 10 mins."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "emergencies-epb",
    category: "emergencies",
    titleEn: "Early Pregnancy Bleeding",
    titleMm: "ကိုယ်ဝန်အစောပိုင်း သွေးဆင်းခြင်း",
    subtitle: "Initial resuscitation and Post-Abortion Care (PAC).",
    bullets: [
      "Resuscitation: Stabilize hemodynamics (IV fluids) if in hemorrhagic shock. Check Hb and blood group.",
      "Medical Management: Misoprostol 600mcg sublingually or 800mcg vaginally/rectally.",
      "MVA: Manual Vacuum Aspiration for incomplete abortion if patient is unstable or medical management fails."
    ],
    reference: "Myanmar Official Guidelines / PAC Guidelines"
  },
  {
    id: "emergencies-ectopic",
    category: "emergencies",
    titleEn: "Ectopic Pregnancy & Acute Abdomen",
    titleMm: "သားအိမ်ပြင်ပ သန္ဓေတည်ခြင်း",
    subtitle: "Recognizing and stabilizing ruptured ectopic pregnancy.",
    bullets: [
      "Classic Triad: Amenorrhea, abdominal pain, vaginal bleeding.",
      "Rupture Signs: Hypovolemic shock, shoulder tip pain, rigid abdomen.",
      "Action: Secure 2 large-bore IV cannulas, rapid fluid resuscitation, arrange blood cross-match, urgent laparotomy."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "anc-protocols",
    category: "anc",
    titleEn: "Routine ANC Protocols",
    titleMm: "ကိုယ်ဝန်ဆောင် စောင့်ရှောက်မှု (ANC) လမ်းညွှန်",
    subtitle: "Timelines, supplements, and immunization.",
    bullets: [
      "Visits: Minimum 4 visits (WHO focused ANC) or 8 visits (updated WHO). Booking ideally < 12 weeks.",
      "Supplements: Folic acid 400mcg daily (5mg if high risk). Iron and Calcium after first trimester. Deworming (Albendazole 400mg) after 1st trimester in endemic areas.",
      "Immunization: Tetanus Toxoid (TT). 2 doses in primigravida (4 weeks apart), then booster doses in subsequent pregnancies."
    ],
    reference: "Myanmar Official Guidelines / WHO"
  },
  {
    id: "anc-screening",
    category: "anc",
    titleEn: "ANC Screening & Red Flags",
    titleMm: "ကိုယ်ဝန်ဆောင် စစ်ဆေးမှုများနှင့် သတိထားရမည့်အချက်များ",
    subtitle: "GDM, anaemia, and proteinuria thresholds.",
    bullets: [
      "GDM Screening (75g OGTT): Fasting ≥ 92 mg/dl (5.1 mmol/L), 1-hr ≥ 180 mg/dl (10.0 mmol/L), 2-hr ≥ 153 mg/dl (8.5 mmol/L).",
      "Anaemia: Hb < 11 g/dl. Target Hb optimization before delivery.",
      "Proteinuria: Urine dipstick ≥ +1 warrants further evaluation for preeclampsia (if > 20 weeks)."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "anc-medical",
    category: "anc",
    titleEn: "Medical Disorders in Pregnancy",
    titleMm: "ကိုယ်ဝန်ဆောင် ဆေးဘက်ဆိုင်ရာ ရောဂါများ",
    subtitle: "First-line treatments for minor ailments.",
    bullets: [
      "Hyperemesis: Anti-emetics (Promethazine, Metoclopramide, Ondansetron). IV fluids and Thiamine supplementation.",
      "UTI: Empirical antibiotics (e.g., Amoxicillin, Cefalexin, or Nitrofurantoin - avoid Nitrofurantoin near term)."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "pnc-routine",
    category: "pnc",
    titleEn: "Routine PNC Checks",
    titleMm: "မီးဖွားပြီးနောက် စောင့်ရှောက်မှု (PNC)",
    subtitle: "Timeline and monitoring.",
    bullets: [
      "Timeline: Immediate (first 24h), early (up to 7 days), late (up to 6 weeks).",
      "Monitoring: Uterine involution (uterus should be pelvic by day 10-14), lochia characteristics (rubra -> serosa -> alba), perineal wound healing."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "pnc-sepsis",
    category: "pnc",
    titleEn: "Puerperal Pyrexia & Sepsis",
    titleMm: "မီးဖွားပြီး ဖျားနာခြင်းနှင့် ပိုးဝင်ခြင်း",
    subtitle: "Diagnostic criteria and empirical antibiotics.",
    bullets: [
      "Fever: Temp ≥ 38.0°C (100.4°F) after first 24 hrs.",
      "Sources: Genital tract (endometritis), urinary tract, breasts (mastitis), wound (perineum/cesarean), chest.",
      "Antibiotics (Severe Sepsis): Broad-spectrum IV antibiotics (e.g., IV Ampicillin 2g q6h + IV Gentamicin 5mg/kg daily + IV Metronidazole 500mg q8h)."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "pnc-voiding",
    category: "pnc",
    titleEn: "Postpartum Voiding Dysfunction",
    titleMm: "ဆီးသွားရခက်ခဲခြင်း",
    subtitle: "Retention definitions and TWOC.",
    bullets: [
      "Definition: Inability to pass urine within 6 hours post-vaginal delivery or post-catheter removal.",
      "Management: Intermittent catheterization or indwelling Foley catheter for 24-48 hours.",
      "TWOC: Trial Without Catheter. Check post-void residual (PVR) volume. PVR < 150ml is acceptable."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "pnc-contraception",
    category: "pnc",
    titleEn: "Contraception Counseling",
    titleMm: "သားဆက်ခြား စီမံချက်ပညာပေးခြင်း",
    subtitle: "Initiation timing and emergency contraception.",
    bullets: [
      "POPs / DMPA / Implants: Can be initiated immediately postpartum, even if breastfeeding.",
      "COCs: Avoid in first 21 days postpartum (or first 6 months if exclusively breastfeeding) due to VTE risk and effects on milk supply.",
      "IUCD: Can be inserted within 48 hours of delivery or after 4 weeks.",
      "Emergency: Levonorgestrel 1.5mg stat (within 72 hours), Ulipristal acetate 30mg stat (within 120 hours)."
    ],
    reference: "WHO Medical Eligibility Criteria (MEC)"
  },
  {
    id: "gyn-vaginal",
    category: "gyn",
    titleEn: "Vaginal Discharge & STIs",
    titleMm: "မိန်းမကိုယ်အရည်ဆင်းခြင်းနှင့် လိင်မှကူးစက်ရောဂါများ",
    subtitle: "Diagnosis and standard drug dosages.",
    bullets: [
      "Bacterial Vaginosis: Thin, grey, fishy odor, clue cells. Metronidazole 400mg PO BD for 5-7 days (or 2g stat).",
      "Candidiasis: Thick, white, curdy discharge, pruritus. Clotrimazole 500mg pessary stat or oral Fluconazole 150mg stat.",
      "Trichomoniasis: Yellow/green, frothy discharge. Metronidazole 2g PO stat or 400mg BD for 5-7 days.",
      "Chlamydia: Often asymptomatic, mucopurulent cervicitis. Azithromycin 1g PO stat or Doxycycline 100mg PO BD for 7 days."
    ],
    reference: "Myanmar National STI Guidelines"
  },
  {
    id: "gyn-subfertility",
    category: "gyn",
    titleEn: "Subfertility Baseline Workup",
    titleMm: "ကလေးမရနိုင်ခြင်း အခြေခံစစ်ဆေးမှု",
    subtitle: "Definitions and basic investigations.",
    bullets: [
      "Definition: Failure to conceive after 12 months of regular unprotected intercourse.",
      "Hormonal Profile: Day 2-3 FSH, LH, Estradiol (Ovarian reserve). Day 21 Progesterone (Ovulation confirmation).",
      "Semen Analysis: Check concentration, motility, morphology.",
      "Tubal Patency: HSG or Laparoscopy with dye test."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "gyn-malignancy",
    category: "gyn",
    titleEn: "Gynaecological Malignancies",
    titleMm: "သားဖွားမီးယပ် ကင်ဆာရောဂါများ",
    subtitle: "Red flags and screening.",
    bullets: [
      "Red Flags: Postmenopausal bleeding (Endometrial Ca until proven otherwise), Postcoital bleeding (Cervical Ca).",
      "Cervical Screening: Pap smear or VIA (Visual Inspection with Acetic acid). Target age group (usually 25-60 years)."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "ward-abx",
    category: "ward",
    titleEn: "Antibiotic Prophylaxis",
    titleMm: "ပိုးသတ်ဆေး ကြိုတင်ကာကွယ်ခြင်း",
    subtitle: "Regimens for LSCS and procedures.",
    bullets: [
      "LSCS: Single dose of IV Cephalosporin (e.g., Cefazolin 1g or Cefuroxime 1.5g) administered 15-60 mins before skin incision.",
      "Perineal Tear (3rd/4th degree): Broad-spectrum coverage (e.g., Cefuroxime and Metronidazole) post-repair.",
      "MVA / Evacuation: Single dose of Doxycycline or Azithromycin may be used prophylactically."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "ward-blood",
    category: "ward",
    titleEn: "Blood Transfusion Triggers",
    titleMm: "သွေးသွင်းခြင်း အညွှန်းများ",
    subtitle: "Thresholds and massive haemorrhage.",
    bullets: [
      "Trigger: Usually Hb < 7 g/dL in asymptomatic stable patients, or Hb < 8 g/dL if symptomatic or underlying cardiac disease.",
      "Massive Haemorrhage: Activate Massive Transfusion Protocol (MTP) if blood loss > 1.5L or evidence of shock. Aim for 1:1:1 ratio of PRC : FFP : Platelets."
    ],
    reference: "Myanmar Official Guidelines"
  },
  {
    id: "ward-medico",
    category: "ward",
    titleEn: "Medico-Legal & Professional Skills",
    titleMm: "ဥပဒေရေးရာနှင့် ကျင့်ဝတ်များ",
    subtitle: "Chaperones, consent, and documentation.",
    bullets: [
      "Chaperones: Always have a female chaperone present during intimate examinations.",
      "Consent: Written informed consent is mandatory before surgical procedures. In life-threatening emergencies, act in the patient's best interest (doctrine of necessity).",
      "Documentation: Write clearly, legibly, and chronologically. Use black ink. Date, time, sign, and print your name and designation for every entry."
    ],
    reference: "Myanmar Medical Council Guidelines"
  }

  ];

export function OBGYNFacts() {
  const { lang } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "ctg" | "htn" | "pph" | "labor" | "emergencies" | "anc" | "pnc" | "gyn" | "ward">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const facts = OBGYN_FACTS_LIST;

  const filteredFacts = facts.filter((fact) => {
    const matchesSearch =
      fact.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fact.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fact.bullets.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || fact.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyText = (fact: FactItem) => {
    const textToCopy = `[${fact.titleEn}] ${fact.subtitle}\n\n${fact.bullets.join("\n")}\n\nReference: ${fact.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(fact.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={lang === "en" ? "Search guidelines, drugs, criteria..." : "ရှာဖွေရန်..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {(["all", "ctg", "htn", "pph", "labor", "emergencies", "anc", "pnc", "gyn", "ward"] as const).map((cat) => {
            const label =
              cat === "all"
                ? lang === "en" ? "All Facts" : "အားလုံး"
                : cat === "ctg"
                ? "CTG"
                : cat === "htn"
                ? "Hypertension"
                : cat === "pph"
                ? "PPH"
                : cat === "labor"
                ? "Labor"
                : cat === "emergencies"
                ? "Emergencies"
                : cat === "anc"
                ? "ANC"
                : cat === "pnc"
                ? "PNC"
                : cat === "gyn"
                ? "Gynaecology"
                : "Ward";
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-slate-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Facts List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredFacts.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
            <BookOpen className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-black text-slate-500">
              {lang === "en" ? "No matches found" : "ရှာဖွေမှုမတွေ့ရှိပါ"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {lang === "en"
                ? "Try adjusting your search term or category filters."
                : "ရှာဖွေမှုစကားလုံး သို့မဟုတ် အမျိုးအစားစစ်ထုတ်မှုများကို ပြောင်းလဲစမ်းသပ်ကြည့်ပါ။"}
            </p>
          </div>
        ) : (
          filteredFacts.map((fact) => (
            <div
              key={fact.id}
              className="bg-white border border-slate-100 rounded-[2rem] hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-4 relative group overflow-hidden"
            >
              {/* Colored Category Tag in Corner */}
              <div
                className={`absolute top-0 right-0 h-1.5 w-24 ${
                  fact.category === "ctg"
                    ? "bg-emerald-500"
                    : fact.category === "htn"
                    ? "bg-amber-500"
                    : fact.category === "pph"
                    ? "bg-rose-500"
                    : fact.category === "emergencies"
                    ? "bg-red-500"
                    : fact.category === "anc"
                    ? "bg-sky-500"
                    : fact.category === "pnc"
                    ? "bg-teal-500"
                    : fact.category === "gyn"
                    ? "bg-fuchsia-500"
                    : fact.category === "ward"
                    ? "bg-slate-500"
                    : "bg-indigo-500"
                }`}
              />

              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        fact.category === "ctg"
                          ? "bg-emerald-50 text-emerald-700"
                          : fact.category === "htn"
                          ? "bg-amber-50 text-amber-700"
                          : fact.category === "pph"
                          ? "bg-rose-50 text-rose-700"
                          : fact.category === "emergencies"
                          ? "bg-red-50 text-red-700"
                          : fact.category === "anc"
                          ? "bg-sky-50 text-sky-700"
                          : fact.category === "pnc"
                          ? "bg-teal-50 text-teal-700"
                          : fact.category === "gyn"
                          ? "bg-fuchsia-50 text-fuchsia-700"
                          : fact.category === "ward"
                          ? "bg-slate-100 text-slate-700"
                          : "bg-indigo-50 text-indigo-700"
                      }`}
                    >
                      <Zap className="h-3 w-3" />
                      {fact.category.toUpperCase()}
                    </span>
                    <h4 className="text-base font-black text-slate-800 mt-2">
                      {fact.titleEn}
                    </h4>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">
                      {fact.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyText(fact)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-500 rounded-xl transition-all hover:text-slate-800"
                    title="Copy Guide to Clipboard"
                  >
                    {copiedId === fact.id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
                  {fact.bullets.map((bullet, idx) => {
                    const isListItem = bullet.startsWith("•");
                    return (
                      <div
                        key={idx}
                        className={`text-xs text-slate-700 leading-relaxed font-semibold flex items-start gap-2 ${
                          isListItem ? "pl-4" : ""
                        }`}
                      >
                        {!isListItem && (
                          <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                        )}
                        <span>{bullet}</span>
                      </div>
                    );
                  })}
                </div>

                {fact.warnings && fact.warnings.length > 0 && (
                  <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl space-y-2">
                    {fact.warnings.map((warn, wIdx) => (
                      <div key={wIdx} className="text-xs text-rose-800 font-bold flex items-start gap-2">
                        <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
                        <span>{warn}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-black tracking-wider uppercase">
                <span>Ref: {fact.reference}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
