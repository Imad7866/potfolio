// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
    // Swiper initialization
    const swiper = new Swiper('.mySwiper', {
        // Basic parameters
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        
        // Auto play
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        
        // Speed and effects
        speed: 800,
        effect: 'slide',
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Responsive breakpoints
        breakpoints: {
            // When window width is >= 480px
            480: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
        
        // Keyboard control
        keyboard: {
            enabled: true,
        },
        
        // Mouse wheel control
        mousewheel: {
            enabled: false,
        },
        
        // Touch and drag settings
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        
        // Grab cursor
        grabCursor: true,
        
        // Lazy loading
        lazy: {
            loadPrevNext: true,
        },
        
        // Events
        on: {
            init: function () {
                console.log('Swiper initialized');
            },
            slideChange: function () {
                // Add animation to active slide
                const activeSlide = this.slides[this.activeIndex];
                activeSlide.querySelector('.slide').style.transform = 'scale(1.02)';
                
                // Reset other slides
                this.slides.forEach((slide, index) => {
                    if (index !== this.activeIndex) {
                        slide.querySelector('.slide').style.transform = 'scale(1)';
                    }
                });
            },
            touchStart: function() {
                // Pause autoplay on touch
                this.autoplay.stop();
            },
            touchEnd: function() {
                // Resume autoplay after touch
                this.autoplay.start();
            }
        }
    });

    // Add custom hover effects
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', function() {
            swiper.autoplay.stop();
            this.querySelector('.slide').style.transform = 'scale(1.02) translateY(-5px)';
        });
        
        slide.addEventListener('mouseleave', function() {
            swiper.autoplay.start();
            this.querySelector('.slide').style.transform = 'scale(1) translateY(0)';
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.bars');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations for advantage cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe advantage cards
    const advantageCards = document.querySelectorAll('.advantage_card');
    advantageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe swiper section
    const recentWorkSection = document.querySelector('.recent_work');
    if (recentWorkSection) {
        recentWorkSection.style.opacity = '0';
        recentWorkSection.style.transform = 'translateY(50px)';
        recentWorkSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(recentWorkSection);
    }

    // Add typing effect to animated text (optional enhancement)
    const animatedText = document.querySelector('.animate-charcter');
    if (animatedText) {
        animatedText.style.animation = 'textclip 3s linear infinite, fadeInUp 1s ease-out';
    }

    // Performance optimization: Pause animations when not in view
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const animatedElement = entry.target.querySelector('.animate-charcter');
            if (animatedElement) {
                if (entry.isIntersecting) {
                    animatedElement.style.animationPlayState = 'running';
                } else {
                    animatedElement.style.animationPlayState = 'paused';
                }
            }
        });
    });

    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Add loading animation for images
    const images = document.querySelectorAll('.slide_img img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });

    // Add custom cursor effect for interactive elements
    const interactiveElements = document.querySelectorAll('button, .bb, .swiper-button-next, .swiper-button-prev, .advantage_card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });
});

// Add fade-in animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .menu {
            position: fixed;
            top: 90px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 90px);
            background-color: var(--body-color);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: left 0.3s ease;
        }
        
        .menu.active {
            left: 0;
        }
        
        .bars {
            display: flex;
        }
        
        .menu li {
            margin: 20px 0;
        }
        
        .menu li a {
            font-size: 1.5rem;
        }
    }
`;
document.head.appendChild(style);

