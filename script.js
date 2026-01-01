document.addEventListener('DOMContentLoaded', () => {
    console.log("Mission Control: Systems Online.");

    // 0. Space Theme: Celestial Assets
    const hero = document.getElementById('hero');
    if (hero) {
        // Add Nebulas
        ['nebula-1', 'nebula-2', 'nebula-3'].forEach(n => {
            const deb = document.createElement('div');
            deb.className = `nebula ${n}`;
            hero.appendChild(deb);
        });

        // Add Floating Planets
        const planets = ['planet-saturn', 'planet-mars'];
        planets.forEach((p, i) => {
            const planet = document.createElement('div');
            planet.className = `celestial-body ${p}`;
            planet.style.left = (20 + i * 50) + '%';
            planet.style.top = (30 + i * 20) + '%';
            planet.style.animation = `float ${15 + i * 5}s ease-in-out infinite`;
            hero.appendChild(planet);
        });
    }

    // 0. Space Theme: Starfield Generation
    const starfield = document.getElementById('starfield');
    if (starfield) {
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2 + 1 + 'px';
            star.style.width = size;
            star.style.height = size;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
            starfield.appendChild(star);
        }
    }

    // 0. Code Theme: Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const text = typewriter.getAttribute('data-text');
        let i = 0;
        function type() {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        // Start typing after a short delay
        setTimeout(() => {
            typewriter.style.opacity = '1';
            type();
        }, 1200);
    }

    // 4. Hide Science Decorations when in Hero
    const scienceDecor = document.querySelector('.science-decorations');
    const heroSection = document.getElementById('hero');
    if (scienceDecor && heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scienceDecor.style.opacity = '0';
                    scienceDecor.style.visibility = 'hidden';
                } else {
                    scienceDecor.style.opacity = '1';
                    scienceDecor.style.visibility = 'visible';
                }
            });
        }, { threshold: 0.1 });
        heroObserver.observe(heroSection);
    }

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
