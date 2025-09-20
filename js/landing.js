// Landing Page JavaScript for Sanjeevni Telemedicine Platform

document.addEventListener('DOMContentLoaded', function() {
    console.log('Landing page initializing...');
    
    // Initialize all functionality
    initializeNavigation();
    initializeRoleSelection();
    initializeContactForm();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeLanguageSelector();
    
    // Initialize translations after everything else
    if (typeof initializeTranslations === 'function') {
        initializeTranslations();
    }
    
    console.log('Landing page initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const roleSection = document.getElementById('role-selection');
            if (roleSection) {
                roleSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Language selector functionality
function initializeLanguageSelector() {
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (languageBtn && languageDropdown) {
        // Toggle dropdown when button is clicked
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });
        
        // Handle language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.getAttribute('data-lang');
                
                if (selectedLang && typeof changeLanguage === 'function') {
                    changeLanguage(selectedLang);
                }
                
                // Close dropdown
                languageDropdown.classList.remove('show');
            });
        });
    }
}

// Role selection functionality
function initializeRoleSelection() {
    // Get Started buttons
    const getStartedButtons = document.querySelectorAll('#get-started-btn, #hero-get-started');
    const roleModal = document.getElementById('role-modal');
    
    getStartedButtons.forEach(button => {
        button.addEventListener('click', () => {
            showRoleModal();
        });
    });
    
    // Role cards on the page
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            const isPatient = card.id === 'patient-role';
            redirectToLogin(isPatient ? 'patient' : 'doctor');
        });
    });
    
    // Role buttons
    const roleBtns = document.querySelectorAll('.role-btn');
    roleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isPatient = btn.classList.contains('patient-btn');
            redirectToLogin(isPatient ? 'patient' : 'doctor');
        });
    });
    
    // Modal role selection
    const modalRoleButtons = document.querySelectorAll('.modal-role-btn');
    modalRoleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isPatient = btn.classList.contains('patient-btn');
            redirectToLogin(isPatient ? 'patient' : 'doctor');
        });
    });
    
    // Close modal functionality
    const closeModalBtn = document.getElementById('close-role-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideRoleModal);
    }
    
    // Close modal when clicking outside
    if (roleModal) {
        roleModal.addEventListener('click', (e) => {
            if (e.target === roleModal) {
                hideRoleModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && roleModal && roleModal.classList.contains('show')) {
            hideRoleModal();
        }
    });
}

function showRoleModal() {
    const roleModal = document.getElementById('role-modal');
    if (roleModal) {
        roleModal.classList.add('show');
        roleModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideRoleModal() {
    const roleModal = document.getElementById('role-modal');
    if (roleModal) {
        roleModal.classList.remove('show');
        roleModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function redirectToLogin(role) {
    // Store the selected role in localStorage
    localStorage.setItem('selectedRole', role);
    
    // Show loading state
    showNotification(`Redirecting to ${role} portal...`, 'info');
    
    // Add small delay for better UX
    setTimeout(() => {
        window.location.href = `login.html?role=${role}`;
    }, 500);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Validate form data
            if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            submitContactForm(contactData);
        });
    }
}

function submitContactForm(contactData) {
    const submitBtn = document.querySelector('.contact-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Show success message
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        
        // In a real app, you would send this data to your backend
        console.log('Contact form submitted:', contactData);
    }, 2000);
}

// Watch Demo functionality
function initializeWatchDemo() {
    const watchDemoBtn = document.getElementById('watch-demo');
    
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', () => {
            showNotification('Demo video feature coming soon!', 'info');
            // In a real app, you would open a video modal or redirect to a demo page
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .role-card, .about-point, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add notification content styles
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    `;
    
    // Add close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 16px;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    closeBtn.addEventListener('click', () => notification.remove());
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Helper functions for notifications
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };
    return colors[type] || '#2196f3';
}

// Add animation keyframes for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
    }
`;
document.head.appendChild(style);

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Preload critical images and resources
function preloadResources() {
    // Preload any critical images here
    const criticalImages = [
        // Add any image URLs that need to be preloaded
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize demo functionality
initializeWatchDemo();

// Preload resources
preloadResources();

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page is visible again, refresh any time-sensitive content
        console.log('Page visible, refreshing content...');
    }
});

// Export functions for global access
window.landingApp = {
    showNotification,
    redirectToLogin,
    showRoleModal,
    hideRoleModal
};

// Analytics and tracking (placeholder)
function trackUserInteraction(action, category = 'engagement') {
    // In a real app, you would send this data to your analytics service
    console.log(`Analytics: ${category} - ${action}`);
}

// Track role selection
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('role-btn')) {
        const role = e.target.classList.contains('patient-btn') ? 'patient' : 'doctor';
        trackUserInteraction(`role_selected_${role}`, 'conversion');
    }
});

console.log('Landing page script loaded successfully');