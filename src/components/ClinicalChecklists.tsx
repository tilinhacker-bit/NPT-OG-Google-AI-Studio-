import React, { useState } from "react";
import { CheckSquare, Copy, Check, ClipboardList } from "lucide-react";

const OB_HISTORY_TEMPLATE = `OBSTETRICS HISTORY TAKING FORMAT

1. Patient Profile:
Name, Age, G_ P_ A_ L_, LMP, EDD (by dates/scan), Gestational Age (wks/days), Blood Group & Rh, Occupation, Address.

2. Chief Complaint:
- Labor pains x __ hrs
- Leaking/Bleeding per vagina x __ hrs
- Decreased fetal movements

3. History of Present Illness (HPI):
- Contractions: Onset, frequency, duration, intensity.
- Bleeding/Leaking: Amount, color (clear/meconium), odor.
- PIH Symptoms: Headache, blurring of vision, epigastric pain, reduced urine output.
- Fetal movements: Normal/reduced.

4. History of Present Pregnancy:
- 1st Trimester: Booking status, Spontaneous/Assisted, Hyperemesis, Fever with rash, Folic acid.
- 2nd Trimester: Quickening (at __ wks), Anomaly scan result, TT injections, Iron/Calcium.
- 3rd Trimester: Growth scan, Complications (GDM, PIH, Bleeding).

5. Past Obstetric History:
(Chronological order) Year | Sex | Wt | Term/Preterm | Mode of Delivery (Indication if CS) | Alive/Dead | Puerperium

6. Menstrual & Contraceptive History:
- Menarche, Cycle (Regular/Irregular), Flow (days), Dysmenorrhea.
- Contraceptive methods used.

7. Past Medical/Surgical History:
- HTN, DM, Asthma, Thyroid, Heart Disease, Epilepsy.
- Previous surgeries, Blood transfusions, Allergies.

8. Family & Personal History:
- Twins, Congenital anomalies, familial diseases.
- Diet, Bowel/Bladder, Addictions (Alcohol/Smoking/Betel nut).`;

const OB_PE_TEMPLATE = `OBSTETRICS PHYSICAL EXAMINATION FORMAT

1. General Examination:
- Build, nourishment, consciousness.
- Pallor, Icterus, Cyanosis, Clubbing, Lymphadenopathy, Edema (pedal/facial).
- Vitals: Pulse Rate (PR), Blood Pressure (BP), Respiratory Rate (RR), Temperature.
- Thyroid, Breasts, Spine.

2. Systemic Examination:
- CVS: S1S2 heard, no murmurs.
- RS: Bilateral vesicular breath sounds, no added sounds.

3. Obstetric Examination (Abdominal):
- Inspection: Shape (longitudinal/transverse/globular), Linea nigra, Striae gravidarum/albicans, previous scars.
- Palpation:
  - Symphysio-fundal height (SFH in cm).
  - Fundal grip: Broad/soft (Breech) or Hard/globular (Head).
  - Lateral grips: Back (smooth/continuous) and Limbs (knobby).
  - Pelvic grip: Presenting part (Head/Breech) and engagement.
- Auscultation: Fetal Heart Rate (FHR in bpm) and location.

4. Vaginal Examination (if indicated, e.g., in labor):
- External genitalia: Normal/Varicosities/Discharge.
- Speculum exam: Leaking fluid (clear/meconium), bleeding, cervical lesions.
- Digital exam: Cervical position, consistency, effacement (%), dilation (cm), presenting part, station, membranes (intact/ruptured).`;

const GYN_HISTORY_TEMPLATE = `GYNECOLOGY HISTORY TAKING FORMAT

1. Patient Profile:
Name, Age, Parity, LMP, Occupation, Address.

2. Chief Complaint:
- Heavy/Irregular vaginal bleeding x __ days/months.
- Lower abdominal pain x __ days.
- Vaginal discharge, itching.
- Mass descending per vagina.

3. History of Present Illness (HPI):
- Bleeding: Onset, amount (pads/day), passage of clots, intermenstrual/postcoital bleeding.
- Pain: Site, onset, character, radiation, relation to menses (dysmenorrhea).
- Prolapse: Sensation of mass, aggravates on straining, reduces on lying down.
- Discharge: Amount, color, odor, itching.
- Urinary/Bowel symptoms: Urgency, frequency, incontinence, constipation.

4. Menstrual History:
- Menarche, Cycle length/Duration, Amount of flow, Dysmenorrhea.
- LMP (Certain/Uncertain).

5. Obstetric History:
- G_ P_ A_ L_, Details of previous deliveries and complications.

6. Past Medical/Surgical History:
- HTN, DM, Asthma, Thyroid disorders.
- Previous pelvic surgeries, Tubal ligation, CS, Appendectomy.

7. Family & Personal History:
- Family history of breast, ovarian, or endometrial cancer.
- Contraception history, Pap smear history.`;

const GYN_PE_TEMPLATE = `GYNECOLOGY PHYSICAL EXAMINATION FORMAT

1. General Examination:
- Pallor, Icterus, Cyanosis, Clubbing, Lymphadenopathy, Edema.
- Vitals: PR, BP, RR, Temperature.
- Thyroid and Breast examination (very important in gynae).

2. Systemic Examination:
- CVS & RS.

3. Abdominal Examination:
- Inspection: Scars, distension, visible mass.
- Palpation: Tenderness, guarding, rigidity. Any palpable mass (size, site, shape, surface, margins, consistency, mobility).
- Percussion: Shifting dullness, fluid thrill (if ascites suspected).
- Auscultation: Bowel sounds.

4. Pelvic Examination:
- Inspection of external genitalia.
- Speculum examination: Vagina walls, Cervix (hypertrophy, erosions, bleeding, polyps, discharge).
- Bimanual examination:
  - Uterus: Size (bulky/normal/weeks size), position (AVAF/RV), consistency, mobility, tenderness.
  - Fornices: Free, tender, fullness, palpable adnexal mass.
- Per-rectal examination (if indicated: staging of malignancy, rectocele).`;

export function ClinicalChecklists() {
  const [activeTab, setActiveTab] = useState<"ob_history" | "ob_pe" | "gyn_history" | "gyn_pe">("ob_history");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const tabs = [
    { id: "ob_history", label: "OB History", template: OB_HISTORY_TEMPLATE },
    { id: "ob_pe", label: "OB Examination", template: OB_PE_TEMPLATE },
    { id: "gyn_history", label: "GYN History", template: GYN_HISTORY_TEMPLATE },
    { id: "gyn_pe", label: "GYN Examination", template: GYN_PE_TEMPLATE }
  ];

  const currentTemplate = tabs.find(t => t.id === activeTab)?.template || "";

  return (
    <div className="space-y-6">
      <div className="border border-slate-100 bg-slate-50 rounded-[2rem] p-5 shadow-sm">
        <h4 className="font-black text-slate-800 text-lg flex items-center gap-2 mb-4">
          <ClipboardList className="h-5 w-5 text-indigo-500" />
          History & Examination Formats
        </h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 bg-white p-1.5 rounded-2xl border border-slate-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-2">
          <button
            onClick={() => handleCopy(currentTemplate, activeTab)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600 transition shadow-sm"
          >
            {copiedStates[activeTab] ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copiedStates[activeTab] ? "Copied" : "Copy Template"}
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 overflow-y-auto max-h-[60vh]">
          <pre className="text-xs sm:text-sm text-slate-700 font-mono leading-relaxed whitespace-pre-wrap">
            {currentTemplate}
          </pre>
        </div>
      </div>
    </div>
  );
}
