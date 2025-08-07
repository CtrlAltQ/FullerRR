// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initHeroSlider();
    initGallerySlider();
    initSmoothScrolling();
    initFormHandling();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Auto-play settings
    const autoPlayInterval = 5000; // 5 seconds
    let autoPlayTimer;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });

    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        sliderContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const difference = startX - endX;

            if (Math.abs(difference) > swipeThreshold) {
                stopAutoPlay();
                if (difference > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
                startAutoPlay();
            }
        }
    }

    // Start auto-play
    startAutoPlay();

    // Initialize first slide
    showSlide(0);
}

// Gallery 3D Carousel
function initGallerySlider() {
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.gallery-prev-btn');
    const nextBtn = document.querySelector('.gallery-next-btn');
    const dotsContainer = document.querySelector('.gallery-slider-dots');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Auto-play settings
    const autoPlayInterval = 5000; // 5 seconds
    let autoPlayTimer;

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'gallery-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        slides.forEach((slide, index) => {
            // Remove all position classes
            slide.classList.remove('center', 'left', 'right', 'hidden');
            
            // Calculate position relative to current slide
            let position = index - currentSlide;
            
            // Handle wraparound
            if (position > totalSlides / 2) {
                position -= totalSlides;
            } else if (position < -totalSlides / 2) {
                position += totalSlides;
            }
            
            // Apply position classes
            if (position === 0) {
                slide.classList.add('center');
            } else if (position === -1) {
                slide.classList.add('left');
            } else if (position === 1) {
                slide.classList.add('right');
            } else {
                slide.classList.add('hidden');
            }
        });

        // Update dots
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    // Click on slides to navigate
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function(e) {
            // If it's the center slide, open lightbox
            if (slide.classList.contains('center')) {
                const img = slide.querySelector('img');
                if (img && e.target === img) {
                    openLightbox(img);
                }
            } else {
                // Navigate to clicked slide
                stopAutoPlay();
                goToSlide(index);
                startAutoPlay();
            }
        });
    });

    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.gallery-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        sliderContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const difference = startX - endX;

            if (Math.abs(difference) > swipeThreshold) {
                stopAutoPlay();
                if (difference > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
                startAutoPlay();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });

    // Initialize
    createDots();
    updateCarousel();
    startAutoPlay();
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const form = document.getElementById('estimate-form');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        const requiredFields = ['fullName', 'email', 'phone', 'project'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailPattern.test(data.email)) {
            showFieldError(form.querySelector('[name="email"]'), 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation (basic)
        const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
        if (data.phone && !phonePattern.test(data.phone.replace(/[\s\-\(\)\.]/g, ''))) {
            showFieldError(form.querySelector('[name="phone"]'), 'Please enter a valid phone number');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            showSuccessMessage('Thank you! We\'ll contact you soon with your free estimate.');
            
            // Reset form
            form.reset();
            
            // In a real application, you would send the data to your server
            console.log('Form data:', data);
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Form validation helpers
function validateField(field) {
    const value = field.value.trim();
    const name = field.name;

    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    if (name === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    if (name === 'phone' && value) {
        const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phonePattern.test(value.replace(/[\s\-\(\)\.]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }

    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccessMessage(message) {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create and show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    const form = document.getElementById('estimate-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .advantage-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Lightbox functionality
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt;
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Prevent lightbox from closing when clicking on image
document.getElementById('lightbox-img').addEventListener('click', function(e) {
    e.stopPropagation();
});