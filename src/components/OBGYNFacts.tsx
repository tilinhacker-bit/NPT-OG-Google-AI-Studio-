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
  category: "ctg" | "htn" | "pph" | "labor";
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
    }
  ];

export function OBGYNFacts() {
  const { lang } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "ctg" | "htn" | "pph" | "labor">("all");
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
          {(["all", "ctg", "htn", "pph", "labor"] as const).map((cat) => {
            const label =
              cat === "all"
                ? lang === "en" ? "All Facts" : "အားလုံး"
                : cat === "ctg"
                ? "CTG"
                : cat === "htn"
                ? "Hypertension"
                : cat === "pph"
                ? "PPH"
                : "Labor & GA";
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
