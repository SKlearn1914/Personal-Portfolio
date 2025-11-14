 // ------------------ Utilities ------------------
        const qs = (s, root = document) => root.querySelector(s);
        const qsa = (s, root = document) => Array.from(root.querySelectorAll(s));

        // ------------------ NAV/HAMBURGER ------------------
        (function navScript() {
            const hamb = qs('#hamburger');
            const nav = qs('#nav-links');
            const links = qsa('#nav-links a');
            function toggleNav(open) {
                const will = typeof open === 'boolean' ? open : !nav.classList.contains('show');
                nav.classList.toggle('show', will);
                hamb.setAttribute('aria-expanded', String(will));
            }
            hamb.addEventListener('click', () => toggleNav());
            hamb.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNav(); } });
            links.forEach(a => a.addEventListener('click', () => { if (window.innerWidth < 980) toggleNav(false); }));
            // close on outside click
            document.addEventListener('click', (e) => { if (!nav.contains(e.target) && !hamb.contains(e.target)) nav.classList.remove('show'); });
        })();

        // ------------------ SKILLS -- animate meters when visible ------------------
        (function skillsScript() {
            const spans = qsa('.meter-3d span');
            function reveal() {
                spans.forEach(s => {
                    const val = Number(s.dataset.value || 0);
                    s.style.width = val + '%';
                });
            }
            // simple intersection observer
            const obs = new IntersectionObserver((entries, o) => {
                entries.forEach(entry => { if (entry.isIntersecting) { reveal(); o.disconnect(); } });
            }, { threshold: 0.25 });
            const container = qs('#skills'); if (container) obs.observe(container);
        })();

        // ------------------ PROJECTS SLIDER ------------------
        (function projectsSlider() {
            const cards = qsa('.project-card');
            if (!cards.length) return;
            let current = 0;
            const nav = qs('#projects-nav');
            const prev = document.createElement('button'); prev.textContent = 'Previous';
            const next = document.createElement('button'); next.textContent = 'Next';
            nav.appendChild(prev); nav.appendChild(next);

            function update() {
                cards.forEach((card, i) => {
                    card.classList.remove('active', 'prev', 'next');
                    card.style.zIndex = 0;
                    if (i === current) card.classList.add('active');
                    else if (i === (current - 1 + cards.length) % cards.length) card.classList.add('prev');
                    else if (i === (current + 1) % cards.length) card.classList.add('next');
                });
            }
            prev.addEventListener('click', () => { current = (current - 1 + cards.length) % cards.length; update(); });
            next.addEventListener('click', () => { current = (current + 1) % cards.length; update(); });
            // keyboard
            document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') prev.click(); if (e.key === 'ArrowRight') next.click(); });
            update();
        })();

        // ------------------ CONTACT FORM (demo) ------------------
        (function contactForm() {
            const form = qs('#contact-form');
            if (!form) return;
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = new FormData(form);
                const payload = Object.fromEntries(data.entries());
                // Demo behaviour: show success then reset
                alert('Thank you, ' + (payload.user_name || 'visitor') + '! Message sent (demo).');
                form.reset();
            });
        })();

        // ------------------ small tweaks: add fade delays ------------------
        (function stagger() {
            ['.fade-in', '.fade-in-left', '.fade-in-right'].forEach(sel => {
                qsa(sel).forEach((el, i) => el.style.animationDelay = (i * 80) + 'ms');
            });
        })();
