let currentFilter = 'all';
let searchQuery = '';
let activeClinicalCases = (typeof clinicalCases !== 'undefined') ? clinicalCases : [];

document.addEventListener('DOMContentLoaded', async () => {
    // Immediate render with local cases
    renderCases('all');
    setupEventListeners();
    if (typeof patientReviews !== 'undefined') {
        renderReviews('all');
        setupReviewListeners();
    }

    // Asynchronously fetch live cases from Supabase
    if (typeof fetchSupabaseCases === 'function') {
        try {
            const liveCases = await fetchSupabaseCases();
            if (liveCases && liveCases.length > 0) {
                activeClinicalCases = liveCases;
                renderCases(currentFilter, searchQuery);
            }
        } catch (e) {
            console.warn('Using bundled clinical cases:', e);
        }
    }
});

// Render Case Cards
function renderCases(filter = 'all', search = '') {
    const grid = document.getElementById('cases-grid');
    const noResults = document.getElementById('no-cases-found');
    if (!grid) return;

    grid.innerHTML = '';

    const casesToUse = (activeClinicalCases && activeClinicalCases.length > 0) ? activeClinicalCases : clinicalCases;

    const filteredCases = casesToUse.filter(c => {
        const matchesCategory = filter === 'all' || c.category === filter;
        const matchesSearch = search === '' || 
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase()) ||
            (c.tags && c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) ||
            (c.categoryName && c.categoryName.toLowerCase().includes(search.toLowerCase()));
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
                <div class="absolute top-3 right-3 flex items-center gap-1.5">
                    ${(item.images && item.images.length > 1) ? `
                        <span class="px-2 py-1 text-xs font-semibold rounded-md bg-slate-900/85 text-teal-300 border border-teal-400/30 backdrop-blur-md shadow-sm flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            ${item.images.length} Photos
                        </span>
                    ` : ''}
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
                        <span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>${item.date}</span>
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
        } else if (e.key === 'ArrowLeft') {
            changeModalPhoto(-1);
        } else if (e.key === 'ArrowRight') {
            changeModalPhoto(1);
        }
    });
}

// Multi-Photo Gallery State in Modal
let currentModalImages = [];
let currentModalPhotoIndex = 0;

function selectModalPhoto(index) {
    if (!currentModalImages || index < 0 || index >= currentModalImages.length) return;
    currentModalPhotoIndex = index;
    const activeImg = document.getElementById('gallery-active-image');
    const counter = document.getElementById('gallery-counter');
    if (activeImg) {
        activeImg.style.opacity = '0.3';
        setTimeout(() => {
            activeImg.src = currentModalImages[index];
            activeImg.style.opacity = '1';
        }, 120);
    }
    if (counter) {
        counter.textContent = `Photo ${index + 1} of ${currentModalImages.length}`;
    }
    const thumbs = document.querySelectorAll('.gallery-thumb-btn');
    thumbs.forEach((btn, idx) => {
        if (idx === index) {
            btn.className = 'gallery-thumb-btn flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all border-sky-400 ring-2 ring-sky-400/40 scale-105 opacity-100 shadow-md';
        } else {
            btn.className = 'gallery-thumb-btn flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600';
        }
    });
}

function changeModalPhoto(delta) {
    if (!currentModalImages || currentModalImages.length <= 1) return;
    let nextIndex = currentModalPhotoIndex + delta;
    if (nextIndex < 0) nextIndex = currentModalImages.length - 1;
    if (nextIndex >= currentModalImages.length) nextIndex = 0;
    selectModalPhoto(nextIndex);
}

// Modal Lightbox for Clinical Case Inspection
function openCaseModal(caseId) {
    const caseData = (activeClinicalCases && activeClinicalCases.find(c => c.id === caseId)) || 
                     (typeof clinicalCases !== 'undefined' && clinicalCases.find(c => c.id === caseId));
    if (!caseData) return;

    const modal = document.getElementById('case-modal');
    const modalContent = document.getElementById('case-modal-content');
    if (!modal || !modalContent) return;

    // Resolve images
    let images = [];
    if (Array.isArray(caseData.images) && caseData.images.length > 0) {
        images = caseData.images;
    } else if (caseData.image) {
        if (typeof caseData.image === 'string' && caseData.image.trim().startsWith('[') && caseData.image.trim().endsWith(']')) {
            try {
                images = JSON.parse(caseData.image);
            } catch(e) {
                images = [caseData.image];
            }
        } else {
            images = [caseData.image];
        }
    }
    if (images.length === 0) {
        images = ['assets/img/cases/default.jpg'];
    }

    currentModalImages = images;
    currentModalPhotoIndex = 0;
    const isGallery = images.length > 1;

    const galleryHtml = isGallery ? `
        <!-- Multi-Photo Interactive Gallery -->
        <div class="mb-6 rounded-2xl overflow-hidden border border-sky-500/20 bg-slate-950/80 p-3 sm:p-4">
            <div class="relative rounded-xl overflow-hidden bg-black/60 flex items-center justify-center min-h-[300px] max-h-[500px]">
                <img id="gallery-active-image" src="${images[0]}" alt="${caseData.title}" class="max-h-[500px] w-auto max-w-full object-contain mx-auto transition-opacity duration-200" />
                
                <!-- Prev Button -->
                <button type="button" onclick="changeModalPhoto(-1)" aria-label="Previous Photo"
                        class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-sky-500 text-white flex items-center justify-center border border-white/10 hover:border-sky-400 transition-all shadow-lg backdrop-blur">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>

                <!-- Next Button -->
                <button type="button" onclick="changeModalPhoto(1)" aria-label="Next Photo"
                        class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-sky-500 text-white flex items-center justify-center border border-white/10 hover:border-sky-400 transition-all shadow-lg backdrop-blur">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </button>

                <!-- Photo Counter Badge -->
                <div class="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-slate-950/90 backdrop-blur border border-white/10 text-xs font-mono font-semibold text-sky-300 shadow-md">
                    <span id="gallery-counter">Photo 1 of ${images.length}</span>
                </div>
            </div>

            <!-- Thumbnail Selector Strip -->
            <div class="mt-3 flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                ${images.map((img, idx) => `
                    <button type="button" onclick="selectModalPhoto(${idx})" data-idx="${idx}"
                            class="gallery-thumb-btn flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === 0 ? 'border-sky-400 ring-2 ring-sky-400/40 scale-105 opacity-100 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'}">
                        <img src="${img}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover" />
                    </button>
                `).join('')}
            </div>
        </div>
    ` : `
        <!-- Single Photo Display -->
        <div class="mb-6 rounded-xl overflow-hidden text-center" style="background:#020617;border:1px solid rgba(14,165,233,0.15);">
            <img src="${images[0]}" alt="${caseData.title}" class="max-h-[480px] w-auto mx-auto object-contain" />
        </div>
    `;

    modalContent.innerHTML = `
        <div class="relative rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-7"
             style="background:rgba(15,23,42,0.97);border:1px solid rgba(14,165,233,0.2);backdrop-filter:blur(20px);">

            <div style="position:absolute;top:0;left:0;right:0;height:3px;border-radius:1rem 1rem 0 0;background:linear-gradient(90deg,#0ea5e9,#14b8a6,#6366f1);"></div>

            <button onclick="closeCaseModal()" class="modal-close-btn absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center z-10 font-bold text-sm transition-all">
                ✕
            </button>

            <div class="flex flex-wrap items-center gap-2 mb-4 pt-2">
                <span class="px-3 py-1 text-xs font-semibold rounded-lg border ${caseData.badgeColor}">
                    ${caseData.categoryName}
                </span>
                <span class="px-3 py-1 text-xs font-mono font-semibold rounded-lg text-sky-300 flex items-center gap-1.5" style="background:rgba(14,165,233,0.12);border:1px solid rgba(14,165,233,0.25);">
                    <svg class="w-3 h-3 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    ${caseData.tooth}
                </span>
                <span class="text-xs text-slate-400 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    ${caseData.date}
                </span>
            </div>

            <h2 class="text-2xl font-bold text-white mb-5">${caseData.title}</h2>

            ${galleryHtml}

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
                    <div class="text-sm font-bold text-emerald-400">Strict Sterilization Protocol</div>
                </div>
            </div>

            <div class="mb-5">
                <h4 class="text-sm font-bold text-white mb-1.5">Case Narrative &amp; Objective</h4>
                <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">${caseData.description}</p>
            </div>

            <div class="mb-5">
                <h4 class="text-sm font-bold text-white mb-2.5">Clinical Highlights</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    ${caseData.highlights.map(item => `
                        <div class="p-2.5 rounded-lg text-xs font-semibold text-emerald-300 flex items-center gap-2"
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
    
    toast.innerHTML = `<svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> <div>${message}</div>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 50);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ════════════════════════════════════════════════════════════
//  PATIENT REVIEWS FUNCTIONALITY
// ════════════════════════════════════════════════════════════

let currentReviewFilter = 'all';

function renderReviews(filter = 'all') {
    const grid = document.getElementById('reviews-grid');
    if (!grid || typeof patientReviews === 'undefined') return;

    grid.innerHTML = '';

    const filtered = patientReviews.filter(r => filter === 'all' || r.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-slate-400">
                <p class="text-sm font-semibold">No reviews found in this category yet.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(rev => {
        const card = document.createElement('div');
        card.className = 'review-card reveal';

        const starSVG = `<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
        const stars = Array(rev.rating).fill(starSVG).join('');

        card.innerHTML = `
            <div class="review-card-top">
                <!-- Header: Avatar + Name + Verification -->
                <div class="flex items-center gap-3 mb-3">
                    <div class="review-avatar-circle overflow-hidden">
                        ${rev.avatar ? `
                            <img src="${rev.avatar}" alt="${rev.name}" class="w-full h-full object-cover" onerror="this.outerHTML='${rev.avatarInitial || rev.name.charAt(0)}'"/>
                        ` : (rev.avatarInitial || rev.name.charAt(0))}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <h4 class="text-sm font-bold text-white truncate">${rev.name}</h4>
                            ${rev.verified ? `<span class="review-badge-verified">Verified</span>` : ''}
                        </div>
                        <div class="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <svg class="w-3 h-3 text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            <span class="truncate">${rev.city}</span>
                        </div>
                    </div>
                </div>

                <!-- Treatment Badge & Rating Row -->
                <div class="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800/60">
                    <span class="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 truncate">
                        ${rev.treatment}
                    </span>
                    <div class="review-stars flex-shrink-0">
                        ${stars}
                    </div>
                </div>

                <!-- Comment Content -->
                <div class="relative">
                    <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal dir-rtl text-right" style="line-height: 1.8;">
                        "${rev.comment}"
                    </p>
                </div>
            </div>

            <!-- Card Footer -->
            <div class="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span class="flex items-center gap-1 font-mono text-[10px]">
                    <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    ${rev.date}
                </span>
                <span class="text-teal-400 font-semibold text-[10px] uppercase tracking-wider">Dr. Ahmed Abdelrahim</span>
            </div>
        `;

        grid.appendChild(card);
    });
}

function setupReviewListeners() {
    const filterBtns = document.querySelectorAll('.review-filter-tab');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-sky-500', 'text-white'));
            filterBtns.forEach(b => b.classList.add('bg-slate-800/60', 'text-slate-300'));
            
            e.currentTarget.classList.remove('bg-slate-800/60', 'text-slate-300');
            e.currentTarget.classList.add('active', 'bg-sky-500', 'text-white');

            const category = e.currentTarget.getAttribute('data-review-filter');
            currentReviewFilter = category;
            renderReviews(category);
        });
    });

    // Star Rating click handling inside modal
    let selectedRating = 5;
    const starBtns = document.querySelectorAll('.star-select-btn');
    starBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectedRating = parseInt(btn.getAttribute('data-rating'));
            starBtns.forEach((b, idx) => {
                if (idx < selectedRating) {
                    b.classList.add('text-amber-400');
                    b.classList.remove('text-slate-600');
                } else {
                    b.classList.remove('text-amber-400');
                    b.classList.add('text-slate-600');
                }
            });
        });
    });

    // Handle Review Form Submission
    const reviewForm = document.getElementById('add-review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('rev-name')?.value || 'مريض عزيز';
            const city = document.getElementById('rev-city')?.value || 'القاهرة';
            const treatment = document.getElementById('rev-treatment')?.value || 'علاج أسنان عام';
            const comment = document.getElementById('rev-comment')?.value || '';

            if (!comment.trim()) return;

            const newReview = {
                id: Date.now(),
                name: name,
                nameEn: name,
                avatarInitial: name.trim().charAt(0) || 'م',
                city: city,
                cityEn: city,
                rating: selectedRating,
                date: 'الآن (اليوم)',
                category: 'all',
                treatment: treatment,
                verified: true,
                comment: comment
            };

            patientReviews.unshift(newReview);
            renderReviews(currentReviewFilter);
            closeReviewModal();
            reviewForm.reset();
            showNotification('شكرًا جزيلاً، تم تسجيل تقييمك بنجاح.', 'success');
        });
    }
}

function openReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

