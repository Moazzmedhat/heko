// SVG Visual Generators for Dental Clinical Cases and Radiographs

function getCaseSVG(type) {
    switch (type) {
        case 'endo':
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- X-ray background texture -->
                <rect width="400" height="240" fill="#0B1329" rx="8"/>
                <circle cx="200" cy="120" r="100" fill="#1E293B" opacity="0.3"/>
                
                <!-- Bone pattern radiograph -->
                <path d="M40 200 C100 180, 180 210, 360 190 L360 240 L40 240 Z" fill="#1E294B" opacity="0.6"/>
                
                <!-- Tooth outline (radiographs style) -->
                <path d="M140 50 C140 30, 260 30, 260 50 L250 120 C250 160, 270 190, 260 210 C250 220, 230 210, 220 180 C210 160, 200 160, 190 180 C180 210, 160 220, 150 210 C140 190, 160 160, 160 120 Z" fill="#E2E8F0" opacity="0.85" stroke="#CBD5E1" stroke-width="3"/>
                
                <!-- Pulp chamber -->
                <path d="M175 70 C175 60, 225 60, 225 70 L220 110 C215 130, 235 170, 230 195 C228 200, 225 200, 222 185 C215 150, 185 150, 178 185 C175 200, 172 200, 170 195 C165 170, 185 130, 180 110 Z" fill="#090D16"/>
                
                <!-- Obturated Canals (Bright Gutta Percha Radiopaque lines) -->
                <path d="M185 90 L175 190" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
                <path d="M215 90 L225 190" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
                <path d="M200 90 L200 180" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
                
                <!-- Apex Glow indication -->
                <circle cx="175" cy="190" r="6" fill="#38BDF8" class="animate-pulse"/>
                <circle cx="225" cy="190" r="6" fill="#38BDF8" class="animate-pulse"/>
                
                <!-- Labels overlay -->
                <rect x="15" y="15" width="130" height="30" rx="6" fill="#0F172A" opacity="0.8"/>
                <text x="25" y="35" fill="#38BDF8" font-size="12" font-weight="600" font-family="sans-serif">PERIAPICAL X-RAY</text>
                
                <text x="250" y="220" fill="#94A3B8" font-size="10" font-family="monospace">DR. AHMED RCT PORTFOLIO</text>
            </svg>`;

        case 'endo2':
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="240" fill="#0B1329" rx="8"/>
                <!-- Endodontic Rotary handpiece & File diagram -->
                <path d="M120 40 Q 200 40 280 40 L270 100 Q 200 110 130 100 Z" fill="#334155" stroke="#94A3B8" stroke-width="2"/>
                <path d="M200 100 L200 190" stroke="#F59E0B" stroke-width="5" stroke-dasharray="2,3"/>
                <!-- Curved Canal -->
                <path d="M190 110 Q 180 150 140 200" stroke="#0EA5E9" stroke-width="6" fill="none" stroke-linecap="round"/>
                <path d="M210 110 Q 220 150 250 200" stroke="#0EA5E9" stroke-width="6" fill="none" stroke-linecap="round"/>
                <text x="20" y="35" fill="#F59E0B" font-size="12" font-weight="700" font-family="sans-serif">ROTARY PREPARATION</text>
            </svg>`;

        case 'surgery':
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="240" fill="#180C13" rx="8"/>
                <!-- Surgical Extraction Forceps & Tooth artwork -->
                <g transform="translate(130, 40)">
                    <!-- Forceps Handles -->
                    <path d="M40 10 C30 60 10 100 20 160" stroke="#94A3B8" stroke-width="10" stroke-linecap="round"/>
                    <path d="M100 10 C110 60 130 100 120 160" stroke="#94A3B8" stroke-width="10" stroke-linecap="round"/>
                    <circle cx="70" cy="50" r="12" fill="#475569" stroke="#E2E8F0" stroke-width="2"/>
                    <!-- Forceps Beaks -->
                    <path d="M55 50 L62 90 L78 90 L85 50 Z" fill="#64748B"/>
                    
                    <!-- Extracted Molar Tooth -->
                    <path d="M55 100 C50 90, 90 90, 85 100 L88 125 C92 140 95 155 85 165 C78 150 72 135 70 125 C68 135 62 150 55 165 C45 155 48 140 52 125 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
                    <path d="M55 130 C58 140, 62 155, 55 165" stroke="#E11D48" stroke-width="3"/>
                    <path d="M85 130 C82 140, 78 155, 85 165" stroke="#E11D48" stroke-width="3"/>
                </g>
                <rect x="15" y="15" width="150" height="30" rx="6" fill="#881337" opacity="0.8"/>
                <text x="25" y="35" fill="#FDA4AF" font-size="12" font-weight="700" font-family="sans-serif">SURGICAL EXTRACTION</text>
            </svg>`;

        case 'resto':
        case 'resto2':
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="240" fill="#0A1913" rx="8"/>
                <!-- Tooth Before / After Split View -->
                <rect x="20" y="50" width="170" height="150" rx="10" fill="#132E23" stroke="#10B981" stroke-width="1.5"/>
                <rect x="210" y="50" width="170" height="150" rx="10" fill="#132E23" stroke="#10B981" stroke-width="1.5"/>
                
                <!-- Pre-op tooth (broken/decayed) -->
                <path d="M60 90 C60 70, 150 70, 150 90 L140 170 C130 180, 80 180, 70 170 Z" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
                <path d="M85 90 C95 105, 125 105, 135 95 L125 125 Z" fill="#451A03"/>
                <text x="75" y="185" fill="#F59E0B" font-size="12" font-weight="700">PRE-OP (LESION)</text>
                
                <!-- Post-op tooth (restored composite) -->
                <path d="M250 90 C250 70, 340 70, 340 90 L330 170 C320 180, 270 180, 260 170 Z" fill="#F8FAFC" stroke="#10B981" stroke-width="2"/>
                <path d="M275 90 C285 105, 315 105, 325 95 L315 125 Z" fill="#6EE7B7" opacity="0.9"/>
                <text x="250" y="185" fill="#34D399" font-size="12" font-weight="700">POST-OP (COMPOSITE)</text>
                
                <rect x="15" y="12" width="160" height="28" rx="6" fill="#064E3B" opacity="0.9"/>
                <text x="25" y="31" fill="#A7F3D0" font-size="11" font-weight="700" font-family="sans-serif">AESTHETIC RESTORATION</text>
            </svg>`;

        case 'fixed':
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="240" fill="#1E1B18" rx="8"/>
                <!-- Stone Cast Die & Crown Prep -->
                <path d="M80 180 L320 180 L300 220 L100 220 Z" fill="#78350F" opacity="0.7"/>
                <path d="M120 180 L120 120 C120 100, 160 100, 160 120 L160 180 Z" fill="#D97706" stroke="#F59E0B" stroke-width="2"/>
                <path d="M240 180 L240 120 C240 100, 280 100, 280 120 L280 180 Z" fill="#D97706" stroke="#F59E0B" stroke-width="2"/>
                <!-- Zirconia Crown Bridge floating above prep -->
                <path d="M110 80 C110 50, 290 50, 290 80 L280 105 C270 115, 130 115, 120 105 Z" fill="#F8FAFC" stroke="#F59E0B" stroke-width="3"/>
                <!-- Margins arrow -->
                <path d="M200 40 L200 65" stroke="#F59E0B" stroke-width="3" marker-end="url(#arrow)"/>
                <text x="20" y="30" fill="#FBBF24" font-size="12" font-weight="700">FIXED PROSTHODONTICS (PREP & CROWN)</text>
            </svg>`;

        case 'perio':
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="240" fill="#130E26" rx="8"/>
                <!-- Gingiva & Teeth with Ultrasonic Scaler Tip -->
                <path d="M30 140 Q 200 180 370 140 L370 230 L30 230 Z" fill="#BE185D" opacity="0.8"/>
                <path d="M80 80 C80 60, 140 60, 140 80 L135 150 C120 160, 95 160, 85 150 Z" fill="#F8FAFC"/>
                <path d="M170 80 C170 60, 230 60, 230 80 L225 150 C210 160, 185 160, 175 150 Z" fill="#F8FAFC"/>
                <path d="M260 80 C260 60, 320 60, 320 80 L315 150 C300 160, 275 160, 265 150 Z" fill="#F8FAFC"/>
                <!-- Ultrasonic Tip -->
                <path d="M360 40 L220 120" stroke="#C084FC" stroke-width="6" stroke-linecap="round"/>
                <circle cx="220" cy="120" r="10" fill="#A855F7" class="animate-ping"/>
                <text x="20" y="35" fill="#E9D5FF" font-size="12" font-weight="700">PERIODONTAL SCALING & HYGIENE</text>
            </svg>`;

        case 'bleaching':
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="240" fill="#0F172A" rx="8"/>
                <!-- Sparkle Teeth Whitening -->
                <g transform="translate(100, 50)">
                    <path d="M20 70 C20 30, 180 30, 180 70 L170 130 C150 150, 50 150, 30 130 Z" fill="#FFFFFF" stroke="#38BDF8" stroke-width="4"/>
                    <!-- Sparkles -->
                    <path d="M140 30 L145 45 L160 50 L145 55 L140 70 L135 55 L120 50 L135 45 Z" fill="#38BDF8"/>
                    <path d="M50 20 L53 30 L63 33 L53 36 L50 46 L47 36 L37 33 L47 30 Z" fill="#F43F5E"/>
                </g>
                <text x="20" y="35" fill="#38BDF8" font-size="12" font-weight="700">VITAL TEETH BLEACHING</text>
            </svg>`;

        case 'pediatric':
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="240" fill="#042F2E" rx="8"/>
                <!-- Primary Tooth & Stainless Steel Crown -->
                <path d="M150 70 C150 40, 250 40, 250 70 L240 160 C230 175, 170 175, 160 160 Z" fill="#94A3B8" stroke="#F1F5F9" stroke-width="4"/>
                <path d="M165 85 L235 85 M165 110 L235 110" stroke="#CBD5E1" stroke-width="2"/>
                <text x="20" y="35" fill="#2DD4BF" font-size="12" font-weight="700">PEDIATRIC STAINLESS STEEL CROWN</text>
            </svg>`;

        default:
            return `
            <svg class="w-full h-56 object-cover rounded-xl bg-slate-900 p-4 border border-slate-800" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="240" fill="#1E293B"/>
                <text x="120" y="125" fill="#94A3B8" font-size="16">Clinical Photo Preview</text>
            </svg>`;
    }
}
