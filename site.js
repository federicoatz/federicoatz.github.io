(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    root.classList.add('js');

    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);

    let scrollFrame = 0;
    const updateProgress = () => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const value = available > 0 ? Math.min(window.scrollY / available, 1) : 0;
        progress.style.transform = `scaleX(${value})`;
        scrollFrame = 0;
    };
    window.addEventListener('scroll', () => {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
    }, { passive: true });
    updateProgress();

    const revealSelectors = [
        '.section-heading',
        '.news-item',
        '.profile-copy',
        '.origin-note',
        '.content-box > h2:first-child',
        '.content-box > p:first-of-type',
        '.timeline-item',
        '.publication-group',
        '.project-item',
        '.thesis-item',
        '.lecture-entry',
        '.event-card',
        '.code-card'
    ];
    const revealItems = [...document.querySelectorAll(revealSelectors.join(','))];

    revealItems.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`);
    });

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
        revealItems.forEach(element => element.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
        revealItems.forEach(element => observer.observe(element));
    }

    const parallax = document.querySelector('[data-parallax]');
    const precisePointer = window.matchMedia('(pointer: fine)').matches;
    if (parallax && precisePointer && !reduceMotion.matches) {
        parallax.addEventListener('pointermove', (event) => {
            const rect = parallax.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            parallax.style.setProperty('--rx', `${-y * 5}deg`);
            parallax.style.setProperty('--ry', `${x * 6}deg`);
        });
        parallax.addEventListener('pointerleave', () => {
            parallax.style.setProperty('--rx', '0deg');
            parallax.style.setProperty('--ry', '0deg');
        });
    }

    const originVideo = document.querySelector('.origin-video');
    const replay = document.querySelector('.origin-replay');
    if (originVideo) {
        const playOrigin = () => {
            originVideo.currentTime = 0;
            originVideo.play().catch(() => {});
        };
        replay?.addEventListener('click', playOrigin);

        if (!reduceMotion.matches && 'IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver(([entry]) => {
                if (!entry.isIntersecting) return;
                playOrigin();
                videoObserver.disconnect();
            }, { threshold: 0.35 });
            videoObserver.observe(originVideo);
        }
    }

    const tools = document.querySelector('.nav-tools details');
    if (tools) {
        document.addEventListener('click', (event) => {
            if (!tools.contains(event.target)) tools.removeAttribute('open');
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') tools.removeAttribute('open');
        });
    }
})();
