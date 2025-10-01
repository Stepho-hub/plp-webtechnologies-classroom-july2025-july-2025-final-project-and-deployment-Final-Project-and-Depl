// ===== SOMTECH TECHNOLOGIES WEBSITE JAVASCRIPT =====
// Professional cleaning services and disinfectant products

// ===== UTILITY FUNCTIONS =====

/**
 * Utility function to safely select DOM elements
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (optional)
 * @returns {Element|null} - Selected element or null
 */
function $(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Utility function to select multiple DOM elements
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (optional)
 * @returns {NodeList} - NodeList of selected elements
 */
function $$(selector, context = document) {
    return context.querySelectorAll(selector);
}

/**
 * Debounce function to limit how often a function can fire
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Smooth scroll to element
 * @param {Element} element - Target element
 * @param {number} offset - Offset from top (optional)
 */
function smoothScrollTo(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let slideInterval = null;
const slideDelay = 5000; // 5 seconds

// ===== NAVIGATION FUNCTIONALITY =====

/**
 * Initialize mobile navigation toggle
 */
function initMobileNavigation() {
    const hamburger = $('.hamburger');
    const navMenu = $('.nav-menu');
    const navLinks = $$('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Handle header scroll effects
 */
function initHeaderScrollEffects() {
    const header = $('.header');
    if (!header) return;

    const handleScroll = debounce(() => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = $$('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== IMAGE SLIDER FUNCTIONALITY =====

/**
 * Initialize the hero image slider
 */
function initImageSlider() {
    const slides = $$('.slide');
    const indicators = $$('.indicator');
    const prevBtn = $('.prev-btn');
    const nextBtn = $('.next-btn');

    if (slides.length === 0) return; // No slider on this page

    /**
     * Show specific slide
     * @param {number} index - Slide index
     */
    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (indicators[i]) {
                indicators[i].classList.remove('active');
            }
        });

        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
        }

        currentSlide = index;
    }

    /**
     * Go to next slide
     */
    function nextSlide() {
        const nextIndex = currentSlide >= slides.length - 1 ? 0 : currentSlide + 1;
        showSlide(nextIndex);
    }

    /**
     * Go to previous slide
     */
    function prevSlide() {
        const prevIndex = currentSlide <= 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(prevIndex);
    }

    /**
     * Start automatic slider
     */
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    /**
     * Stop automatic slider
     */
    function stopSlider() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    /**
     * Restart automatic slider
     */
    function restartSlider() {
        stopSlider();
        startSlider();
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            restartSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            restartSlider();
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            restartSlider();
        });
    });

    // Pause slider on hover
    const slider = $('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartSlider();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartSlider();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    /**
     * Handle swipe gestures
     */
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
            restartSlider();
        }
    }

    // Start the slider
    showSlide(0);
    startSlider();
}

// ===== PRODUCT FILTERING FUNCTIONALITY =====

/**
 * Initialize product category filtering
 */
function initProductFiltering() {
    const tabBtns = $$('.tab-btn');
    const productCards = $$('.product-card');

    if (tabBtns.length === 0 || productCards.length === 0) return;

    /**
     * Filter products by category
     * @param {string} category - Category to filter by
     */
    function filterProducts(category) {
        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                // Add entrance animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });

        // Update active tab
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = $(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    // Add event listeners to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterProducts(category);
        });
    });
}

// ===== FORM VALIDATION FUNCTIONALITY =====

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation regex (flexible format)
 */
const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{10,}$/;

/**
 * Validate form field
 * @param {Element} field - Form field element
 * @returns {boolean} - Validation result
 */
function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const errorElement = $(`#${fieldName}Error`);
    let isValid = true;
    let errorMessage = '';

    // Clear previous styles
    field.parentElement.classList.remove('error');
    if (errorElement) errorElement.textContent = '';

    // Validation rules
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (!fieldValue) {
                errorMessage = `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`;
                isValid = false;
            } else if (fieldValue.length < 2) {
                errorMessage = `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
                isValid = false;
            }
            break;

        case 'email':
            if (!fieldValue) {
                errorMessage = 'Email address is required';
                isValid = false;
            } else if (!emailRegex.test(fieldValue)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;

        case 'phone':
            if (!fieldValue) {
                errorMessage = 'Phone number is required';
                isValid = false;
            } else if (!phoneRegex.test(fieldValue.replace(/\s/g, ''))) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
            break;

        case 'message':
            if (!fieldValue) {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (fieldValue.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            }
            break;
    }

    // Show error if validation failed
    if (!isValid) {
        field.parentElement.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }

    return isValid;
}

/**
 * Initialize contact form validation
 */
function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    const requiredFields = $$('input[required], textarea[required]', form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMessage = $('#formSuccess');

    /**
     * Validate entire form
     * @returns {boolean} - Form validity
     */
    function validateForm() {
        let isFormValid = true;

        requiredFields.forEach(field => {
            const fieldValid = validateField(field);
            if (!fieldValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    function handleSubmit(e) {
        e.preventDefault();

        // Validate form
        const isValid = validateForm();

        if (isValid) {
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Hide form and show success message
                form.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                    smoothScrollTo(successMessage, 100);
                }

                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Log form data (for development)
                const formData = new FormData(form);
                console.log('Form submitted with data:', Object.fromEntries(formData));
            }, 2000);
        } else {
            // Focus on first error field
            const firstError = $('.form-group.error input, .form-group.error textarea');
            if (firstError) {
                firstError.focus();
                smoothScrollTo(firstError.parentElement, 120);
            }
        }
    }

    // Add real-time validation
    requiredFields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', () => validateField(field));
        
        // Clear errors on input
        field.addEventListener('input', () => {
            if (field.parentElement.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', handleSubmit);

    // Format phone number as user types
    const phoneField = $('#phone');
    if (phoneField) {
        phoneField.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';

            if (value.length > 0) {
                if (value.length <= 3) {
                    formattedValue = `(${value}`;
                } else if (value.length <= 6) {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }

            e.target.value = formattedValue;
        });
    }
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====

/**
 * Initialize smooth scrolling for internal links
 */
function initSmoothScrolling() {
    const links = $$('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = $(`#${targetId}`);
            
            if (targetElement) {
                e.preventDefault();
                smoothScrollTo(targetElement, 100);
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = $$('.service-card, .benefit-card, .product-card, .faq-item, .contact-item, .stat');
    
    if (!animatedElements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set initial styles and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== LOADING ANIMATIONS =====

/**
 * Show loading spinner
 * @param {Element} container - Container element
 */
function showLoading(container) {
    if (!container) return;
    
    container.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 200px;">
            <div style="border: 4px solid #f3f3f3; border-top: 4px solid var(--primary-color); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
}

// ===== PERFORMANCE OPTIMIZATION =====

/**
 * Lazy load images
 */
function initLazyLoading() {
    const images = $$('img[data-src]');
    
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// ===== ERROR HANDLING =====

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics service here
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        transition: top 0.3s;
        z-index: 1001;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark if it doesn't exist
    if (!$('main')) {
        const mainContent = $('.hero') || $('section');
        if (mainContent) {
            mainContent.id = 'main';
        }
    }

    // Improve focus visibility
    const style = document.createElement('style');
    style.textContent = `
        .skip-link:focus {
            top: 6px !important;
        }
        
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZATION =====

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    try {
        // Core functionality
        setActiveNavLink();
        initMobileNavigation();
        initHeaderScrollEffects();
        initSmoothScrolling();
        initAccessibility();

        // Page-specific functionality
        initImageSlider();
        initProductFiltering();
        initContactForm();

        // Enhanced features
        initScrollAnimations();
        initLazyLoading();

        console.log('Somtech Technologies website initialized successfully!');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

// ===== DOM READY & LOAD EVENTS =====

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    } else if (!document.hidden && currentSlide !== undefined && $$('.slide').length > 0) {
        slideInterval = setInterval(() => {
            const slides = $$('.slide');
            currentSlide = currentSlide >= slides.length - 1 ? 0 : currentSlide + 1;
            
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
            
            const indicators = $$('.indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentSlide);
            });
        }, slideDelay);
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        debounce,
        smoothScrollTo
    };
}