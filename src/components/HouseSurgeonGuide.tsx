import React, { useState } from "react";
import { BookOpen, AlertTriangle, Baby, Stethoscope, Activity, ClipboardList, ShieldAlert, ChevronDown } from "lucide-react";
import { useStore } from "../store/useStore";

const GUIDE_DATA = [
  {
    id: "labor",
    icon: Baby,
    title: "1. Labor Ward Essentials",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-500",
    items: [
      {
        title: "Normal Labor & Partograms",
        content: "• Active Labor: Regular painful contractions, cervical dilation ≥ 4 cm (or ≥ 5 cm as per updated WHO).\n• Fetal Heart Rate: Listen every 15-30 mins in first stage, every 5 mins in second stage.\n• Contractions & Vitals: Assess contractions half-hourly. Check maternal BP, pulse, temp every 4 hours.\n• WHO Partograph: Plot dilation. Alert line (1cm/hr). Action line (4 hours to the right of Alert line)."
      },
      {
        title: "Conducting Deliveries",
        content: "• Head Delivery: Control the head to prevent perineal tears. Support the perineum.\n• Restitution & External Rotation: Wait for head to rotate naturally before delivering shoulders.\n• Episiotomy: Indicated for fetal distress, operative vaginal delivery, or rigid perineum. Perform mediolateral episiotomy during a contraction when perineum is thinned out."
      },
      {
        title: "Active Management of Third Stage (AMTSL)",
        content: "• Uterotonic: IM Oxytocin 10 IU within 1 minute of birth.\n• Controlled Cord Traction: Apply counter-traction above pubic bone to prevent uterine inversion.\n• Uterine Massage: Immediately after placental delivery to ensure uterus is contracted."
      },
      {
        title: "Intrapartum Emergencies (First-Responder)",
        content: "• Shoulder Dystocia: HELPERR mnemonic. Call for Help, Episiotomy, Legs (McRoberts), Pressure (Suprapubic), Enter (Internal maneuvers), Remove posterior arm, Roll patient.\n• Cord Prolapse: Call for help. Relieve cord pressure manually or fill bladder with 500ml normal saline. Knee-chest position. Prepare for emergency LSCS."
      }
    ]
  },
  {
    id: "emergencies",
    icon: AlertTriangle,
    title: "2. OBGYN Emergencies (First 15 Mins)",
    color: "bg-red-50 text-red-700 border-red-200",
    iconColor: "text-red-500",
    items: [
      {
        title: "Postpartum Haemorrhage (PPH)",
        content: "• Resuscitation: Shout for help. 2 large-bore IV cannulas. Rapid fluid resuscitation (Crystalloids).\n• Bimanual Compression: Compress uterus between a fist in anterior fornix and hand on abdomen.\n• Uterotonics: Oxytocin 40 IU in 500ml NS at 125ml/hr. IM Ergometrine 0.5mg (Avoid if hypertensive). Misoprostol 800mcg sublingually/rectally."
      },
      {
        title: "Severe Pre-Eclampsia & Eclampsia",
        content: "• Magnesium Sulfate: 4g IV loading dose over 5-15 mins. Maintenance 1-2g/hr IV.\n• Toxicity signs: Loss of reflexes, resp depression. Antidote: Calcium Gluconate 1g IV over 10 mins.\n• Antihypertensives: Target BP < 150/100. IV Labetalol or oral Nifedipine or IV Hydralazine."
      },
      {
        title: "Early Pregnancy Bleeding",
        content: "• Resuscitation: Stabilize hemodynamics (IV fluids) if in hemorrhagic shock. Check Hb & blood group.\n• Medical Management: Misoprostol 600mcg sublingually or 800mcg vaginally.\n• PAC/MVA: Manual Vacuum Aspiration for incomplete abortion if patient unstable or medical fails."
      },
      {
        title: "Ectopic Pregnancy & Acute Abdomen",
        content: "• Classic Triad: Amenorrhea, abdominal pain, vaginal bleeding.\n• Rupture Signs: Hypovolemic shock, shoulder tip pain, rigid abdomen.\n• Action: 2 large-bore IVs, rapid fluids, cross-match blood, urgent laparotomy."
      }
    ]
  },
  {
    id: "anc",
    icon: Stethoscope,
    title: "3. Antenatal Care (ANC)",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconColor: "text-emerald-500",
    items: [
      {
        title: "Routine ANC Protocols",
        content: "• Visits: Booking ideally < 12 weeks. Minimum 4-8 visits.\n• Supplements: Folic acid 400mcg daily (5mg if high risk). Iron & Calcium after 1st trimester. Deworming (Albendazole 400mg) after 1st trimester.\n• Immunization: Tetanus Toxoid (TT) x 2 doses in primigravida (4 wks apart)."
      },
      {
        title: "Screening & Red Flags",
        content: "• GDM (75g OGTT): Fasting ≥ 92 mg/dl, 1-hr ≥ 180, 2-hr ≥ 153.\n• Anaemia: Hb < 11 g/dl. Optimize Hb before delivery.\n• Proteinuria: Dipstick ≥ +1 warrants further preeclampsia evaluation if > 20 weeks."
      },
      {
        title: "Medical Disorders",
        content: "• Hyperemesis: Antiemetics (Promethazine, Metoclopramide, Ondansetron). IV fluids & Thiamine.\n• UTI: Empirical antibiotics (Amoxicillin, Cefalexin, Nitrofurantoin - avoid Nitro near term)."
      }
    ]
  },
  {
    id: "pnc",
    icon: Activity,
    title: "4. Postnatal Care (PNC) & FP",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    iconColor: "text-purple-500",
    items: [
      {
        title: "Routine PNC Checks",
        content: "• Timeline: Immediate (24h), early (7 days), late (6 weeks).\n• Monitoring: Uterine involution (pelvic by day 10-14), lochia (rubra -> serosa -> alba), wound healing."
      },
      {
        title: "Puerperal Pyrexia & Sepsis",
        content: "• Fever: Temp ≥ 38.0°C (100.4°F) after first 24 hrs.\n• Sources: Genital tract, UTI, mastitis, wound, chest.\n• Antibiotics (Severe Sepsis): Broad-spectrum IV (e.g., Ampicillin + Gentamicin + Metronidazole)."
      },
      {
        title: "Postpartum Voiding Dysfunction",
        content: "• Definition: Inability to pass urine within 6 hrs post-delivery/catheter removal.\n• TWOC (Trial Without Catheter): Check post-void residual (PVR). < 150ml is acceptable."
      },
      {
        title: "Contraception Counseling",
        content: "• POPs/DMPA/Implants: Can initiate immediately postpartum.\n• COCs: Avoid in first 21 days (or 6 months if excl. breastfeeding) due to VTE risk.\n• IUCD: Insert within 48 hrs of delivery or after 4 weeks.\n• Emergency: Levonorgestrel 1.5mg stat (within 72h) or Ulipristal 30mg (within 120h)."
      }
    ]
  },
  {
    id: "gyn",
    icon: ClipboardList,
    title: "5. General Gynaecology OPD",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    iconColor: "text-pink-500",
    items: [
      {
        title: "Vaginal Discharge & STIs",
        content: "• Bacterial Vaginosis: Grey, fishy, clue cells. Metronidazole 400mg BD for 5-7 days.\n• Candidiasis: White curdy discharge, pruritus. Clotrimazole 500mg pessary stat or oral Fluconazole 150mg stat.\n• Trichomoniasis: Yellow/green frothy. Metronidazole 2g stat or 400mg BD for 5-7 days.\n• Chlamydia: Azithromycin 1g stat or Doxycycline 100mg BD for 7 days."
      },
      {
        title: "Subfertility Baseline Workup",
        content: "• Primary vs Secondary: Failure to conceive after 12 months regular unprotected sex.\n• Hormones: Day 2-3 FSH/LH/Estradiol. Day 21 Progesterone.\n• Others: Semen analysis, Tubal patency (HSG)."
      },
      {
        title: "Gynaecological Malignancies",
        content: "• Red Flags: Postmenopausal bleeding (Endometrial Ca), Postcoital bleeding (Cervical Ca).\n• Screening: Pap smears, VIA for cervical cancer (usually 25-60 yrs)."
      }
    ]
  },
  {
    id: "ward",
    icon: ShieldAlert,
    title: "6. Ward Procedures & Governance",
    color: "bg-slate-100 text-slate-700 border-slate-300",
    iconColor: "text-slate-600",
    items: [
      {
        title: "Antibiotic Prophylaxis",
        content: "• LSCS: Single dose IV Cephalosporin (e.g., Cefazolin 1g) 15-60 mins before skin incision.\n• Perineal Tear (3rd/4th): Broad-spectrum coverage post-repair.\n• MVA: Single dose Doxycycline or Azithromycin."
      },
      {
        title: "Blood Transfusion Triggers",
        content: "• Triggers: Hb < 7 g/dL in stable patients, or Hb < 8 g/dL if symptomatic/cardiac disease.\n• Massive Haemorrhage Protocol: Aim for 1:1:1 ratio of PRC : FFP : Platelets if blood loss > 1.5L."
      },
      {
        title: "Medico-Legal & Professional",
        content: "• Chaperones: Always have a female chaperone for intimate exams.\n• Consent: Mandatory written consent. In life-threatening emergencies, act in best interest.\n• Documentation: Chronological, legible notes in black ink. Date, time, sign, print name."
      }
    ]
  }
];

export function HouseSurgeonGuide() {
  const { lang } = useStore();
  const [expandedSection, setExpandedSection] = useState<string | null>("labor");

  return (
    <div className="space-y-4 pb-6">
      <div className="bg-white p-5 sm:p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex flex-col border-b border-slate-100 pb-4 mb-4">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-indigo-500" />
            {lang === "en" ? "House Surgeon Guide" : "အလုပ်သင်ဆရာဝန် လမ်းညွှန်"}
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-1.5 leading-relaxed">
            {lang === "en"
              ? "Essential rapid-response protocols, practical dosages, and standard workups tailored for House Surgeons in Myanmar."
              : "အလုပ်သင်ဆရာဝန်များအတွက် အရေးပေါ်ကုသမှုလုပ်ငန်းစဉ်များ၊ ဆေးပမာဏများနှင့် အခြေခံစစ်ဆေးမှုများ"}
          </p>
        </div>

        <div className="space-y-3">
          {GUIDE_DATA.map((section) => {
            const isExpanded = expandedSection === section.id;
            const Icon = section.icon;

            return (
              <div 
                key={section.id} 
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isExpanded ? 'border-slate-200 shadow-md bg-white' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${section.color.split(' ')[0]} bg-opacity-50`}>
                      <Icon className={`h-5 w-5 ${section.iconColor}`} />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-slate-800">
                      {section.title}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-slate-50 bg-white">
                    <div className="space-y-4 mt-3">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <h4 className="font-bold text-sm text-slate-800 flex items-start gap-2">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            {item.title}
                          </h4>
                          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap pl-4 font-medium">
                            {item.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
