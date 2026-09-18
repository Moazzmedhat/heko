const clinicalCases = [
    {
        id: "case-endo-1",
        title: "Multi-Canal Root Canal Treatment & Obturation",
        category: "endodontics",
        categoryName: "Endodontics (RCT)",
        badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
        description: "Complete endodontic therapy for mandibular molar. Includes access cavity preparation under rubber dam isolation, master cone fit verification, and hermetic obturation to the root apex.",
        tooth: "Mandibular Molar (#36)",
        diagnosis: "Symptomatic Irreversible Pulpitis",
        image: "assets/img/cases/endo_1.jpg",
        procedureSteps: [
            "Clinical & radiographical diagnosis of deep caries with pulpal involvement",
            "Rubber dam isolation to guarantee a 100% sterile endodontic field",
            "Access cavity preparation & location of root canal orifices",
            "NiTi rotary chemo-mechanical preparation with copious NaOCl irrigation",
            "Working length determination & Master Cone radiograph verification",
            "Heremetic obturation using gutta-percha & resin sealer"
        ],
        highlights: [
            "Apical seal verified by X-Ray",
            "Rubber dam isolation",
            "Curved canal patent to apex"
        ],
        tags: ["Endodontics", "RCT", "Obturation", "Radiograph"],
        date: "December 2025",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-endo-2",
        title: "Rotary Instrumentation & Working Length X-Ray",
        category: "endodontics",
        categoryName: "Endodontics (RCT)",
        badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
        description: "Endodontic canal preparation utilizing endodontic handpiece and rotary files. Radiographic verification of initial file length and apex location.",
        tooth: "Maxillary Premolar / Molar",
        diagnosis: "Apical Periodontitis",
        image: "assets/img/cases/endo_2.jpg",
        procedureSteps: [
            "Diagnostic radiograph and coronal access",
            "Glide path establishment & rotary NiTi shaping",
            "Ultrasonic irrigation & EDTA smear layer removal",
            "Trial master cone radiograph",
            "Dense obturation and post-endo composite core"
        ],
        highlights: [
            "Smooth continuous taper",
            "Full working length reached",
            "Periapical healing promoted"
        ],
        tags: ["Rotary Files", "X-Ray", "Glide Path", "Endo"],
        date: "January 2026",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-endo-3",
        title: "Curved Root Canal Obturation X-Ray Analysis",
        category: "endodontics",
        categoryName: "Endodontics (RCT)",
        badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
        description: "Post-operative periapical radiograph confirming dense 3D obturation of severely curved root canals.",
        tooth: "Mandibular Second Molar",
        diagnosis: "Pulpal Necrosis",
        image: "assets/img/cases/endo_3.jpg",
        procedureSteps: [
            "Preoperative assessment of canal curvature",
            "Controlled memory NiTi rotary instrumentation",
            "Copious irrigation protocol",
            "Continuous wave warm gutta-percha obturation",
            "Final radiographic verification"
        ],
        highlights: [
            "Curvature preserved without ledging",
            "Apical delta sealed",
            "No overfilling"
        ],
        tags: ["Obturation", "Curved Root", "Radiograph"],
        date: "February 2026",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-surgery-1",
        title: "Surgical Extraction of Lower Molar Root",
        category: "surgery",
        categoryName: "Oral Surgery",
        badgeColor: "bg-red-100 text-red-800 border-red-200",
        description: "Atraumatic surgical extraction of deeply decayed lower molar. Precision elevator placement and forceps delivery preserving surrounding alveolar bone.",
        tooth: "Mandibular Molar",
        diagnosis: "Non-restorable Gross Caries",
        image: "assets/img/cases/surgery_1.jpg",
        procedureSteps: [
            "Preoperative periapical radiograph evaluation",
            "Local anesthesia (Inferior Alveolar Nerve Block)",
            "Syndesmotomy & mucoperiosteal flap reflection",
            "Atraumatic root sectioning & elevator luxation",
            "Forceps delivery & thorough socket curettage",
            "Saline irrigation and suturing"
        ],
        highlights: [
            "Intact root apex recovery",
            "Minimal alveolar bone loss",
            "Smooth post-operative recovery"
        ],
        tags: ["Surgical Extraction", "Forceps", "Oral Surgery"],
        date: "November 2025",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-surgery-2",
        title: "Surgical Tooth Delivery & Socket Management",
        category: "surgery",
        categoryName: "Oral Surgery",
        badgeColor: "bg-red-100 text-red-800 border-red-200",
        description: "Clinical surgical extractions executed with sterile surgical forceps in the outpatient dental clinic.",
        tooth: "Maxillary / Mandibular Molars",
        diagnosis: "Severely Broken Down Tooth",
        image: "assets/img/cases/surgery_2.jpg",
        procedureSteps: [
            "Aseptic field preparation & local anesthesia",
            "Soft tissue elevation and bone preservation",
            "Surgical elevator and forceps luxation",
            "Socket debridement and pressure hemostasis"
        ],
        highlights: [
            "Clean root separation",
            "Hemostasis achieved",
            "Strict aseptic technique"
        ],
        tags: ["Extractions", "Surgery", "Outpatient Clinic"],
        date: "December 2025",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-resto-1",
        title: "Direct Aesthetic Composite Restoration",
        category: "restorative",
        categoryName: "Aesthetic Dentistry",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "High quality, highly polished composite restoration. Complete pre-op cavity preparation, rubber dam isolation, anatomic fissure carving, and final high-gloss polish.",
        tooth: "Posterior Molar / Premolar",
        diagnosis: "Class I / Class II Carious Lesion",
        image: "assets/img/cases/resto_1.jpg",
        procedureSteps: [
            "Preoperative shade matching and isolation",
            "Caries excavation & bevel preparation",
            "Selective enamel etch & universal bonding agent",
            "Incremental nanocomposite layering & occlusal anatomical carving",
            "Multi-step finishing burs & high-shine polishing paste"
        ],
        highlights: [
            "Seamless aesthetic blend",
            "Natural occlusal anatomy",
            "High micro-gloss polish"
        ],
        tags: ["Composite", "Aesthetic Dentistry", "Polishing", "Rubber Dam"],
        date: "February 2026",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-resto-2",
        title: "Class IV Carious Lesion Composite Build-Up",
        category: "restorative",
        categoryName: "Aesthetic Dentistry",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "Step-by-step Class IV composite reconstruction: Carious lesion diagnosis, rubber dam isolation, incremental buildup, and final aesthetic restoration.",
        tooth: "Anterior / Posterior Tooth",
        diagnosis: "Class IV Carious Lesion",
        image: "assets/img/cases/resto_2.jpg",
        procedureSteps: [
            "Diagnosis of Class IV carious defect",
            "Isolation using dental rubber dam",
            "Etching & adhesive bonding protocol",
            "Anatomic composite restoration buildup",
            "Final occlusion check and finishing"
        ],
        highlights: [
            "Natural tooth contour",
            "Optimal contact point",
            "High wear resistance"
        ],
        tags: ["Class IV", "Composite Restoration", "Esthetics"],
        date: "March 2026",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-fixed-1",
        title: "Fixed Prosthodontics - Stone Model Dies & Crown Prep",
        category: "fixed",
        categoryName: "Fixed Prosthodontics",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        description: "Abutment tooth preparation for full coverage crown. Precision chamfer margins, silicone impressions, and articulated stone master cast dies.",
        tooth: "Molar & Premolar Abutments",
        diagnosis: "Extensively Restored Tooth requiring Crown",
        image: "assets/img/cases/fixed_1.jpg",
        procedureSteps: [
            "Diagnostic wax-up & axial reduction (1.5mm)",
            "Equi-gingival chamfer margin preparation",
            "Gingival retraction cord placement",
            "Precision addition silicone (PVS) impression",
            "Master stone cast die sectioning & crown fitting"
        ],
        highlights: [
            "Smooth chamfer finish line",
            "Accurate marginal fit on cast",
            "Adequate occlusal clearance"
        ],
        tags: ["Fixed Prosthodontics", "Crown Preparation", "Stone Cast"],
        date: "January 2026",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-fixed-2",
        title: "VITA Shade Matching & Anterior Preparation",
        category: "fixed",
        categoryName: "Fixed Prosthodontics",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        description: "Clinical shade selection using VITA tooth guide and preparation for fixed aesthetic crown restoration.",
        tooth: "Anterior Teeth",
        diagnosis: "Aesthetic Restoration & Bridge Need",
        image: "assets/img/cases/fixed_2.jpg",
        procedureSteps: [
            "VITA shade guide comparison under natural light",
            "Tooth preparation with depth orientation grooves",
            "Margin placement and provisional fabrication",
            "Final crown cementation"
        ],
        highlights: [
            "Precise shade match",
            "Gingival health preserved",
            "Natural translucency"
        ],
        tags: ["Shade Guide", "Crowns", "Fixed Cases"],
        date: "February 2026",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-perio-1",
        title: "Periodontal Scaling & Calculus Removal (Pre/Post)",
        category: "perio",
        categoryName: "Periodontics",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        description: "Full mouth ultrasonic periodontal scaling. Pre-treatment heavy calculus deposits completely removed, restoring mucosal health and stippled gingiva.",
        tooth: "Full Mouth Dental Arches",
        diagnosis: "Chronic Plaque-Induced Gingivitis",
        image: "assets/img/cases/perio_1.jpg",
        procedureSteps: [
            "Periodontal probing and plaque index recording",
            "Piezoelectric ultrasonic scaling of supragingival calculus",
            "Subgingival debridement & root planing with Gracey curettes",
            "Subgingival chlorhexidine irrigation & prophylaxis polishing"
        ],
        highlights: [
            "Complete calculus elimination",
            "Gingival bleeding eliminated",
            "Tissue healing & stippling restored"
        ],
        tags: ["Periodontics", "Scaling", "Calculus Removal", "Pre & Post"],
        date: "December 2025",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-perio-2",
        title: "Gingival Health Restoration & Plaque Control",
        category: "perio",
        categoryName: "Periodontics",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        description: "Clinical transformation showing severe subgingival calculus removal and immediate post-operative gingival recovery.",
        tooth: "Mandibular Anterior & Premolar Region",
        diagnosis: "Localized Periodontitis / Heavy Calculus",
        image: "assets/img/cases/perio_2.jpg",
        procedureSteps: [
            "Ultrasonic debridement",
            "Root planing and stain removal",
            "Patient oral hygiene instruction and interdental flossing guidance"
        ],
        highlights: [
            "Clean enamel surfaces",
            "Reduced pocket depth",
            "Patient hygiene educated"
        ],
        tags: ["Periodontitis", "Gingiva", "Prophylaxis"],
        date: "January 2026",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-bleaching-1",
        title: "In-Office Vital Tooth Bleaching Result",
        category: "bleaching",
        categoryName: "Cosmetic & Bleaching",
        badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        description: "In-office vital tooth bleaching procedure. Lightened shade significantly while protecting soft tissues with light-cured gingival resin barrier.",
        tooth: "Anterior Arch (Smile Line)",
        diagnosis: "Intrinsic & Extrinsic Tooth Discoloration",
        image: "assets/img/cases/bleaching_1.jpg",
        procedureSteps: [
            "Pre-treatment shade selection & intraoral photography",
            "Gingival barrier resin application & blue light curing",
            "In-office bleaching gel application (3 cycles of 15 min)",
            "Gel removal, rinsing, and desensitizing agent application"
        ],
        highlights: [
            "Significant shade whitening",
            "Gingival margin protected",
            "Zero post-bleach sensitivity"
        ],
        tags: ["Bleaching", "Whitening", "Cosmetics"],
        date: "February 2026",
        author: "Dr. Ahmed Abdelrahim"
    },
    {
        id: "case-pediatric-1",
        title: "Pediatric Stainless Steel Crown (SSC) Placement",
        category: "pediatric",
        categoryName: "Pediatric Dentistry",
        badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
        description: "Pediatric dental procedure including pulpotomy and Stainless Steel Crown (SSC) restoration to preserve primary molar space.",
        tooth: "Primary Molar",
        diagnosis: "Deep Primary Caries",
        image: "assets/img/cases/pediatric_1.jpg",
        procedureSteps: [
            "Child behavior management and local anesthesia",
            "Rubber dam isolation",
            "Caries removal & pulpotomy treatment",
            "Stainless steel crown fitting, crimping & glass ionomer cementation"
        ],
        highlights: [
            "Primary arch space preserved",
            "Positive pediatric experience",
            "Durable crown seal"
        ],
        tags: ["Pediatric Dentistry", "Stainless Steel Crown", "Pulpotomy"],
        date: "January 2026",
        author: "Dr. Ahmed Abdelrahim"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { clinicalCases };
}
