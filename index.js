// index.js - Main JavaScript for Shivrati Vilas

document.addEventListener("DOMContentLoaded", function () {
    // ============ GALLERY CAROUSEL ============
    initializeGalleryCarousel();
    
    // ============ MOBILE SIDEBAR ============
    initializeMobileSidebar();
    
    // ============ EXPERIENCE CAROUSEL ============
    initializeExperienceCarousel();
    
    // ============ CONTACT FORM ============
    initializeContactForm();
});

// ============ GALLERY CAROUSEL FUNCTIONS ============
function initializeGalleryCarousel() {
    const carouselInner = document.getElementById("galleryInner");
    const prevBtnG = document.getElementById("prevBtnGallery");
    const nextBtnG = document.getElementById("nextBtnGallery");
    
    if (!carouselInner || !prevBtnG || !nextBtnG) return;
    
    let scrollAmountG = 0;
    let autoScroll = true;
    const speed = 2; // Reduced speed for smoother scrolling
    let animationFrameId = null;
    let isAnimating = false;
    
    // Duplicate slides for infinite scroll
    const originalContent = carouselInner.innerHTML;
    carouselInner.innerHTML += originalContent;
    
    const maxScroll = carouselInner.scrollWidth / 2;
    const cardWidth = carouselInner.children[0].offsetWidth;
    
    function getCardWidth() {
        return carouselInner.children[0].offsetWidth;
    }
    
    // Smooth auto-scroll function
    function autoPlay() {
        if (autoScroll && !isAnimating) {
            scrollAmountG += speed;
            
            // Reset to start for infinite loop
            if (scrollAmountG >= maxScroll) {
                scrollAmountG = 0;
                carouselInner.style.transition = 'none';
                carouselInner.style.transform = `translateX(-${scrollAmountG}px)`;
            }
            
            carouselInner.style.transform = `translateX(-${scrollAmountG}px)`;
            
            // Re-enable transition after reset
            if (scrollAmountG === 0) {
                setTimeout(() => {
                    carouselInner.style.transition = 'transform 0.5s ease';
                }, 50);
            }
        }
        
        animationFrameId = requestAnimationFrame(autoPlay);
    }
    
    // Start auto-scroll
    autoPlay();
    
    // Next button click
    nextBtnG.addEventListener("click", () => {
        if (isAnimating) return;
        isAnimating = true;
        autoScroll = false;
        
        carouselInner.style.transition = "transform 0.5s ease";
        scrollAmountG += getCardWidth();
        
        if (scrollAmountG >= maxScroll) {
            setTimeout(() => {
                carouselInner.style.transition = 'none';
                scrollAmountG -= maxScroll;
                carouselInner.style.transform = `translateX(-${scrollAmountG}px)`;
                setTimeout(() => {
                    carouselInner.style.transition = 'transform 0.5s ease';
                    isAnimating = false;
                }, 50);
            }, 500);
        }
        
        carouselInner.style.transform = `translateX(-${scrollAmountG}px)`;
        
        // Resume auto-scroll after delay
        setTimeout(() => {
            autoScroll = true;
            isAnimating = false;
        }, 1000);
    });
    
    // Previous button click
    prevBtnG.addEventListener("click", () => {
        if (isAnimating) return;
        isAnimating = true;
        autoScroll = false;
        
        carouselInner.style.transition = "transform 0.5s ease";
        scrollAmountG -= getCardWidth();
        
        if (scrollAmountG < 0) {
            scrollAmountG += maxScroll;
            carouselInner.style.transition = 'none';
            carouselInner.style.transform = `translateX(-${scrollAmountG}px)`;
            setTimeout(() => {
                carouselInner.style.transition = 'transform 0.5s ease';
                scrollAmountG -= getCardWidth();
                carouselInner.style.transform = `translateX(-${scrollAmountG}px)`;
            }, 50);
        } else {
            carouselInner.style.transform = `translateX(-${scrollAmountG}px)`;
        }
        
        // Resume auto-scroll after delay
        setTimeout(() => {
            autoScroll = true;
            isAnimating = false;
        }, 1000);
    });
    
    // Pause on hover
    carouselInner.addEventListener("mouseenter", () => autoScroll = false);
    carouselInner.addEventListener("mouseleave", () => autoScroll = true);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselInner.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        autoScroll = false;
    });
    
    carouselInner.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left = next
            nextBtnG.click();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right = previous
            prevBtnG.click();
        }
        
        setTimeout(() => {
            autoScroll = true;
        }, 2000);
    });
    
    // Cleanup animation frame on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
}

// ============ MOBILE SIDEBAR FUNCTIONS ============
function initializeMobileSidebar() {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const closeBtn = document.getElementById("closeSidebar");
    
    if (!menuToggle || !sidebar || !overlay || !closeBtn) return;
    
    function openSidebar() {
        sidebar.style.right = "0px";
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
    }
    
    function closeSidebar() {
        sidebar.style.right = "-260px";
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
    }
    
    menuToggle.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
    
    // Close sidebar when clicking on nav links
    const sidebarLinks = sidebar.querySelectorAll("a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", closeSidebar);
    });
    
    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeSidebar();
        }
    });
}

// ============ EXPERIENCE CAROUSEL FUNCTIONS ============
function initializeExperienceCarousel() {
    const carousel = document.getElementById("experienceCarousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    function getCardWidth() {
        const card = carousel.querySelector('[role="group"]');
        return card ? card.getBoundingClientRect().width : 0;
    }
    
    function smoothScrollBy(element, distance, duration = 400) {
        const start = element.scrollLeft;
        const startTime = performance.now();
        
        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            element.scrollLeft = start + distance * ease;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    const scrollAmount = getCardWidth();
    
    if (scrollAmount > 0) {
        prevBtn.addEventListener("click", () => {
            smoothScrollBy(carousel, -scrollAmount, 750);
        });
        
        nextBtn.addEventListener("click", () => {
            smoothScrollBy(carousel, scrollAmount, 750);
        });
    }
    
    // Touch/swipe support for experience carousel
    let expTouchStartX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        expTouchStartX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        const expTouchEndX = e.changedTouches[0].clientX;
        const expSwipeThreshold = 50;
        
        if (expTouchStartX - expTouchEndX > expSwipeThreshold) {
            // Swipe left = next
            smoothScrollBy(carousel, scrollAmount, 750);
        } else if (expTouchEndX - expTouchStartX > expSwipeThreshold) {
            // Swipe right = previous
            smoothScrollBy(carousel, -scrollAmount, 750);
        }
    });
}

// ============ CONTACT FORM FUNCTIONS ============
function initializeContactForm() {
    const contactForm = document.getElementById("contactForm");
    
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get form values
        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const phone = this.phone.value.trim();
        const message = this.message.value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            alert("Please fill in all required fields (Name, Email, and Message).");
            return;
        }
        
        // WhatsApp number and message
        const whatsappNumber = "919660401592";
        const whatsappMessage = `Hello, I would like to enquire about Shivrati Vilas.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
        
        // Create WhatsApp link
        const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp in new tab
        window.open(waLink, "_blank");
        
        // Optional: Reset form
        this.reset();
    });
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// ============ NAVBAR SCROLL EFFECT ============
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});