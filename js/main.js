// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.getElementById('menuOverlay');
    const contactToggle = document.getElementById('contactToggle');
    const contactOptions = document.getElementById('contactOptions');
    
    // Mobile menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle overlay
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
            });
        });

        // Close menu when clicking on overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        }

        // Close menu when clicking outside (backup)
        document.addEventListener('click', function(e) {
            // Check if click is outside nav menu and hamburger
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
            }
        });

        // Prevent clicks inside the menu from closing it
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close menu when scrolling
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            if (navMenu.classList.contains('active')) {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Close menu if scrolled more than 50px
                if (Math.abs(scrollTop - lastScrollTop) > 50) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    if (menuOverlay) {
                        menuOverlay.classList.remove('active');
                    }
                }
                
                lastScrollTop = scrollTop;
            }
        });
    }

    // Contact tab functionality
    if (contactToggle && contactOptions) {
        contactToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            contactOptions.classList.toggle('active');
        });

        // Close contact options when clicking outside
        document.addEventListener('click', function(e) {
            if (!contactOptions.contains(e.target) && e.target !== contactToggle) {
                contactOptions.classList.remove('active');
            }
        });
    }

    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactTab = document.getElementById('contactTab');
            if (contactTab) {
                contactOptions.classList.add('active');
                // Smooth scroll to bottom
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.content-card, .testimonial-card, .text-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add active class to hamburger for animation
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('is-active');
        });
    }
});

// Add navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});