// Clean Clinical Portfolio Script for Dr. Ahmed Abdelrahim

document.addEventListener('DOMContentLoaded', () => {
    renderCases('all');
    setupEventListeners();
});

let currentFilter = 'all';
let searchQuery = '';

// Render Case Cards
function renderCases(filter = 'all', search = '') {
    const grid = document.getElementById('cases-grid');
    const noResults = document.getElementById('no-cases-found');
    if (!grid) return;

    grid.innerHTML = '';

    const filteredCases = clinicalCases.filter(c => {
        const matchesCategory = filter === 'all' || c.category === filter;
        const matchesSearch = search === '' || 
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase()) ||
            c.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
            c.categoryName.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredCases.length === 0) {
        if (noResults) noResults.classList.remove('hidden');
        return;
    } else {
        if (noResults) noResults.classList.add('hidden');
    }

    filteredCases.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'clinical-card rounded-xl overflow-hidden flex flex-col cursor-pointer group';
        card.onclick = () => openCaseModal(item.id);

        card.innerHTML = `
            <div class="case-img-wrapper">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
                <div class="absolute top-3 right-3">
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-md border ${item.badgeColor} backdrop-blur-md shadow-sm">
                        ${item.categoryName}
                    </span>
                </div>
                <div class="absolute bottom-3 left-3">
                    <span class="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-slate-900/85 text-slate-100 border border-slate-700">
                        ${item.tooth}
                    </span>
                </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span>📅 ${item.date}</span>
                        <span class="text-sky-600 font-semibold group-hover:translate-x-1 transition-transform">Inspect Case →</span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
                        ${item.title}
                    </h3>
                    <p class="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                        ${item.description}
                    </p>
                </div>

                <div>
                    <div class="flex flex-wrap gap-1.5 mb-3">
                        ${item.tags.map(tag => `<span class="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded border border-slate-200">#${tag}</span>`).join('')}
                    </div>

                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Diagnosis: <strong class="text-slate-700 font-semibold">${item.diagnosis}</strong></span>
                    </div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Event Listeners
function setupEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-tab');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentFilter = e.currentTarget.getAttribute('data-filter');
            renderCases(currentFilter, searchQuery);
        });
    });

    const searchInput = document.getElementById('search-cases-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderCases(currentFilter, searchQuery);
        });
    }

    const contactForm = document.getElementById('appointment-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `Transmitting Request...`;

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                showNotification('Appointment Request Received! Dr. Ahmed\'s office will contact you shortly.', 'success');
                contactForm.reset();
            }, 1000);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCaseModal();
        }
    });
}

// Modal Lightbox for Clinical Case Inspection
function openCaseModal(caseId) {
    const caseData = clinicalCases.find(c => c.id === caseId);
    if (!caseData) return;

    const modal = document.getElementById('case-modal');
    const modalContent = document.getElementById('case-modal-content');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="relative rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
             style="background:rgba(15,23,42,0.97);border:1px solid rgba(14,165,233,0.2);backdrop-filter:blur(20px);">

            <div style="position:absolute;top:0;left:0;right:0;height:3px;border-radius:1rem 1rem 0 0;background:linear-gradient(90deg,#0ea5e9,#14b8a6,#6366f1);"></div>

            <button onclick="closeCaseModal()" class="modal-close-btn absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center z-10 font-bold text-sm transition-all">
                ✕
            </button>

            <div class="flex flex-wrap items-center gap-2 mb-4 pt-2">
                <span class="px-3 py-1 text-xs font-semibold rounded-lg border ${caseData.badgeColor}">
                    ${caseData.categoryName}
                </span>
                <span class="px-3 py-1 text-xs font-mono font-semibold rounded-lg text-sky-300" style="background:rgba(14,165,233,0.12);border:1px solid rgba(14,165,233,0.25);">
                    📍 ${caseData.tooth}
                </span>
                <span class="text-xs text-slate-400">📅 ${caseData.date}</span>
            </div>

            <h2 class="text-2xl font-bold text-white mb-5">${caseData.title}</h2>

            <div class="mb-6 rounded-xl overflow-hidden text-center" style="background:#020617;border:1px solid rgba(14,165,233,0.15);">
                <img src="${caseData.image}" alt="${caseData.title}" class="max-h-[480px] w-auto mx-auto object-contain" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="p-4 rounded-xl" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);">
                    <div class="text-[10px] font-bold uppercase tracking-widest text-sky-400/70 mb-1">Diagnosis</div>
                    <div class="text-sm font-bold text-white">${caseData.diagnosis}</div>
                </div>
                <div class="p-4 rounded-xl" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);">
                    <div class="text-[10px] font-bold uppercase tracking-widest text-sky-400/70 mb-1">Attending Surgeon</div>
                    <div class="text-sm font-bold text-white">${caseData.author}</div>
                </div>
                <div class="p-4 rounded-xl" style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);">
                    <div class="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70 mb-1">Clinical Standard</div>
                    <div class="text-sm font-bold text-emerald-400">Strict Sterilization Protocol ✓</div>
                </div>
            </div>

            <div class="mb-6">
                <h4 class="text-sm font-bold text-white mb-2">Case Narrative &amp; Objective</h4>
                <p class="text-slate-400 text-sm leading-relaxed">${caseData.description}</p>
            </div>

            <div class="mb-6 p-5 rounded-xl" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);">
                <h4 class="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <span>🩺</span> Clinical Procedure Steps
                </h4>
                <ol class="space-y-3">
                    ${caseData.procedureSteps.map((step, idx) => `
                        <li class="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                            <span class="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                                  style="background:linear-gradient(135deg,#0ea5e9,#14b8a6);color:#fff;">
                                ${idx + 1}
                            </span>
                            <span>${step}</span>
                        </li>
                    `).join('')}
                </ol>
            </div>

            <div class="mb-6">
                <h4 class="text-sm font-bold text-white mb-3">Clinical Highlights</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    ${caseData.highlights.map(item => `
                        <div class="p-3 rounded-lg text-xs font-semibold text-emerald-300 flex items-center gap-2"
                             style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);">
                            <span class="text-emerald-400">✓</span> ${item}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="pt-4 flex items-center justify-between" style="border-top:1px solid rgba(255,255,255,0.08);">
                <div class="flex flex-wrap gap-1.5">
                    ${caseData.tags.map(t => `<span class="px-2 py-0.5 text-xs font-medium rounded" style="background:rgba(14,165,233,0.1);color:#7dd3fc;border:1px solid rgba(14,165,233,0.2);">#${t}</span>`).join('')}
                </div>
                <button onclick="closeCaseModal()" class="px-5 py-2 text-white text-xs font-bold rounded-lg transition-all"
                        style="background:linear-gradient(135deg,#0ea5e9,#14b8a6);box-shadow:0 4px 15px rgba(14,165,233,0.4);">
                    Close Viewer
                </button>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeCaseModal() {
    const modal = document.getElementById('case-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

// Toast Notifications
function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-xl border text-xs font-semibold flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 ${
        type === 'success' 
            ? 'bg-slate-900 text-white border-slate-700' 
            : 'bg-slate-900 text-white border-slate-700'
    }`;
    
    toast.innerHTML = `<span>✅</span> <div>${message}</div>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 50);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
