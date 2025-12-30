document.addEventListener('DOMContentLoaded', () => {
    console.log("Scrollytelling initialized.");

    // 1. Intersection Observer for Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('active');
                        }, index * 100);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Also observe individual stagger items for simplicity
    document.querySelectorAll('.stagger-item').forEach(item => observer.observe(item));

    // 2. 3D Tilt Effect REMOVED based on user feedback
    // The cards will now use simple CSS hover effects defined in styles.css

    // 3. Parallax & Scroll Logic
    const shapes = document.querySelectorAll('.shape');
    const rotateItems = document.querySelectorAll('.rotate-on-scroll');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateScroll() {
        const scrollY = window.scrollY;

        // Parallax for Hero Shapes
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.15;
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
        });

        // Rotate specific elements based on scroll
        rotateItems.forEach(item => {
            // Simple rotation based on scroll position
            item.style.transform = `perspective(1000px) rotateY(${scrollY * 0.1}deg)`;
        });

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });
});
