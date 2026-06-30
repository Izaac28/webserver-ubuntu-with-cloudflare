document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       THEME TOGGLE (DARK/LIGHT MODE)
       ========================================================================== */
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================================================
       NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       HAMBURGER MENU (MOBILE NAVIGATION)
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ==========================================================================
       TYPING EFFECT
       ========================================================================== */
    const typingTextElement = document.getElementById('typing-text');
    const words = ["Mahasiswa Sistem Komputer", "NOC Engineer", "Tech & Hardware Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Add character
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of the word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next word
            wordIndex = (wordIndex + 1) % words.length;
            // Pause before typing next word
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    if (typingTextElement) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       SCROLL REVEAL ANIMATION (Intersection Observer) - ELABORATE VARIANTS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to trigger animation when scrolling down
                entry.target.classList.add('active');
                
                // For staggered animations, also add active to children
                if (entry.target.classList.contains('reveal-stagger')) {
                    const children = entry.target.children;
                    for (let i = 0; i < children.length; i++) {
                        children[i].classList.add('active');
                    }
                }
            } else {
                // Remove active class when scrolling up (element out of view)
                entry.target.classList.remove('active');
                
                // For staggered animations, also remove active from children
                if (entry.target.classList.contains('reveal-stagger')) {
                    const children = entry.target.children;
                    for (let i = 0; i < children.length; i++) {
                        children[i].classList.remove('active');
                    }
                }
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before entering viewport
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // Add staggered reveal to grid containers
    const staggerContainers = document.querySelectorAll('.skills-grid, .projects-grid, .interests-grid, .about-stats');
    staggerContainers.forEach(container => {
        container.classList.add('reveal-stagger');
        // Make all direct children revealable
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.add('reveal', 'reveal-up');
        }
    });

    /* ==========================================================================
       ACTIVE NAV LINK ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobLinks = document.querySelectorAll('.mobile-link');

    const activeSectionOnScroll = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Adjust offset for sticky navbar
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update desktop links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Update mobile links
        mobLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activeSectionOnScroll);
});