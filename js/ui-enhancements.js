// ================================================================
//  UI Enhancements — Dr. Ahmed Abdelrahim Portfolio
//  Handles: Particles, Scroll Reveal, Navbar, Hamburger, Accordion
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    initSplashScreen();
    initParticles();
    initNavbarScroll();
    initHamburger();
    initScrollReveal();
    initCounters();
    initMobileMenuClose();
    initAccordionAutoOpen();
});

// ─── Splash Screen Intro ──────────────────────────────────────────
function initSplashScreen() {
    const splash = document.getElementById('splash-screen');
    const progress = document.getElementById('splash-progress');
    if (!splash) return;

    // Fill progress bar
    setTimeout(() => {
        if (progress) progress.style.width = '100%';
    }, 100);

    let isDismissed = false;

    const dismissSplash = () => {
        if (isDismissed) return;
        isDismissed = true;

        splash.classList.add('fade-out');
        document.body.classList.remove('overflow-hidden');

        setTimeout(() => {
            splash.style.display = 'none';
        }, 850);
    };

    // Auto dismiss after 1.8s
    const timer = setTimeout(dismissSplash, 1800);

    // Dismiss immediately on user interaction (scroll, click, touch, key)
    const handleUserInteraction = () => {
        clearTimeout(timer);
        dismissSplash();
        window.removeEventListener('wheel', handleUserInteraction);
        window.removeEventListener('touchmove', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
        window.removeEventListener('click', handleUserInteraction);
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });
}

// ─── Floating Particles ──────────────────────────────────────────
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const count = 28;
    const colors = ['rgba(14,165,233,0.7)', 'rgba(20,184,166,0.6)', 'rgba(99,102,241,0.5)', 'rgba(255,255,255,0.4)'];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';

        const size = Math.random() * 3 + 1.5;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 15;
        const color = colors[Math.floor(Math.random() * colors.length)];

        p.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
        `;
        container.appendChild(p);
    }
}

// ─── Navbar Scroll Effect ─────────────────────────────────────────
function initNavbarScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const handleScroll = () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load
}

// ─── Hamburger Menu ───────────────────────────────────────────────
function initHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
}

function initMobileMenuClose() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    });
}

// ─── Scroll Reveal ────────────────────────────────────────────────
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px'
    });

    elements.forEach(el => observer.observe(el));

    // Safety fallback: ensure all elements become visible after 1.5s
    setTimeout(() => {
        elements.forEach(el => el.classList.add('visible'));
    }, 1500);
}

// ─── Animated Counters ────────────────────────────────────────────
function initCounters() {
    const statCards = document.querySelectorAll('.hero-stat-card');
    statCards.forEach((card, i) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + i * 120);
    });
}

// ─── Active Nav Link Highlight on Scroll ─────────────────────────
(function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.style.color = '#38bdf8';
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
})();

// ─── Skill Accordion & Spotlight Logic ──────────────────────────────
const skillDetails = {
    endodontics: {
        icon: '<svg class="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
        title: 'Endodontic Treatment (RCT)',
        desc: 'Advanced root canal therapy utilizing chemo-mechanical rotary instrumentation, electronic apex locators, and warm gutta-percha obturation under strict rubber dam isolation.',
        highlights: ['Rubber Dam Field Isolation', 'NiTi Rotary Files System', 'Digital Apex Determination', 'Hermetic Root Canal Fill'],
        filter: 'endodontics'
    },
    surgery: {
        icon: '<svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/></svg>',
        title: 'Simple & Surgical Extractions',
        desc: 'Atraumatic surgical tooth removals, impacted root retrieval, soft tissue flap elevation, alveolar ridge preservation, and meticulous suture techniques.',
        highlights: ['Atraumatic Surgical Technique', 'Flap Elevation & Bone Grafts', 'Interrupted & Mattress Suturing', 'Post-Op Healing Protocol'],
        filter: 'surgery'
    },
    restorative: {
        icon: '<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
        title: 'Aesthetic Composite Restorations',
        desc: 'High-end cosmetic composite restorations with natural optical translucency, precise shade matching, micro-anatomical carving, and multi-step polishing.',
        highlights: ['Nanocomposite Layering', 'Class I–V Cavity Prep', 'Natural Tooth Shade Match', 'High-Gloss Polishing Finish'],
        filter: 'restorative'
    },
    fixed: {
        icon: '<svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.594 15.12a2 2 0 00-1.022.547l-1.42 1.42a2 2 0 00.586 3.414A19.855 19.855 0 0012 21c3.842 0 7.39-1.085 10.412-2.966a2 2 0 00.586-3.414l-1.42-1.42zM12 3a3 3 0 100 6 3 3 0 000-6z"/></svg>',
        title: 'Fixed Prosthodontics',
        desc: 'Precision tooth preparation for porcelain-fused-to-metal (PFM) and full zirconia crowns & bridges, ensuring clear chamfer finish lines and accurate elastomer impressions.',
        highlights: ['Chamfer Finish Line Margin', 'Elastomer Impression Accuracy', 'Occlusal Anatomy Clearance', 'Durable Crown Cementation'],
        filter: 'fixed'
    },
    perio: {
        icon: '<svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
        title: 'Periodontal Scaling & Hygiene',
        desc: 'Comprehensive non-surgical periodontal therapy including ultrasonic subgingival calculus removal, root planing, stain elimination, and patient hygiene education.',
        highlights: ['Ultrasonic Scaler Precision', 'Subgingival Root Planing', 'Gingival Health Restoration', 'Periodontal Maintenance Plan'],
        filter: 'perio'
    },
    bleaching: {
        icon: '<svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m9-9H3m15.364 6.364l-12.728-12.728m12.728 0L6.636 18.364"/></svg>',
        title: 'In-Office Vital Tooth Bleaching',
        desc: 'Professional teeth whitening using high-concentration hydrogen peroxide gel, LED activation, and custom gingival isolation barriers for maximum shade improvement.',
        highlights: ['Gingival Barrier Shield', 'VITA Shade Guide Calibration', 'Painless & Fast Results', 'Post-Bleach Sensitivity Control'],
        filter: 'bleaching'
    },
    pediatric: {
        icon: '<svg class="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        title: 'Pediatric Dental Care',
        desc: 'Specialized dental care for children, focusing on compassionate behavior guidance, preventive fluoride therapy, primary molar pulpotomies, and stainless steel crowns.',
        highlights: ['Child Psychology Guidance', 'Vital Pulpotomy Therapy', 'Stainless Steel Crown Fitting', 'Space Maintenance Solutions'],
        filter: 'pediatric'
    },
    radiology: {
        icon: '<svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"/></svg>',
        title: 'Radiographic Diagnosis',
        desc: 'Expert interpretation of digital intraoral periapical X-rays and panoramic OPGs to accurately identify periapical lesions, bone resorption, caries depth, and root anatomy.',
        highlights: ['Digital RVG & OPG Analysis', 'Early Caries Detection', 'Periapical Lesion Diagnosis', 'Precise Anatomical Mapping'],
        filter: null
    }
};

function toggleAccordion(btn) {
    const item = btn.closest('.accordion-item');
    if (!item) return;

    const skillKey = item.dataset.skill;
    const body = item.querySelector('.accordion-body');
    const isAlreadyActive = item.classList.contains('active');

    // Close all items
    document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
        const b = el.querySelector('.accordion-body');
        if (b) b.classList.remove('open');
    });

    if (!isAlreadyActive) {
        item.classList.add('active');
        if (body) body.classList.add('open');
        updateSpotlight(skillKey);
    } else {
        resetSpotlight();
    }
}

function updateSpotlight(key) {
    const emptyState = document.getElementById('spotlight-empty');
    const content = document.getElementById('spotlight-content');
    const data = skillDetails[key];

    if (!data || !content) return;

    if (emptyState) emptyState.classList.add('hidden');
    content.classList.remove('hidden');

    const iconEl = document.getElementById('spotlight-icon');
    const titleEl = document.getElementById('spotlight-title');
    const descEl = document.getElementById('spotlight-desc');
    
    if (iconEl) iconEl.innerHTML = data.icon;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;

    const highlightsContainer = document.getElementById('spotlight-highlights');
    if (highlightsContainer) {
        highlightsContainer.innerHTML = data.highlights
            .map(h => `<div class="spotlight-highlight">${h}</div>`)
            .join('');
    }

    const casesBtn = document.getElementById('spotlight-cases-btn');
    if (casesBtn) {
        if (data.filter) {
            casesBtn.style.display = 'inline-flex';
            casesBtn.onclick = (e) => {
                if (e) e.preventDefault();
                jumpToCasesFilter(data.filter);
            };
        } else {
            casesBtn.style.display = 'none';
        }
    }
}

function resetSpotlight() {
    const emptyState = document.getElementById('spotlight-empty');
    const content = document.getElementById('spotlight-content');
    if (emptyState) emptyState.classList.remove('hidden');
    if (content) content.classList.add('hidden');
}

function jumpToCasesFilter(filterName) {
    const casesSection = document.getElementById('cases');
    if (casesSection) {
        casesSection.scrollIntoView({ behavior: 'smooth' });
    }

    const filterBtn = document.querySelector(`.filter-tab[data-filter="${filterName}"]`);
    if (filterBtn) {
        filterBtn.click();
    }
}

function initAccordionAutoOpen() {
    setTimeout(() => {
        const firstItem = document.querySelector('.accordion-item');
        if (firstItem) {
            const btn = firstItem.querySelector('.accordion-trigger');
            if (btn) toggleAccordion(btn);
        }
    }, 200);
}
