// Patient Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Patient dashboard initializing...');
    
    // Initialize all functionality
    initializeNavigation();
    initializeMobileMenu();
    initializeUserProfile();
    initializeNotifications();
    initializeQuickActions();
    loadUserData();
    
    console.log('Patient dashboard initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    // Desktop navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            switchSection(targetSection);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Mobile navigation
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            switchSection(targetSection);
            
            // Update active nav item
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Close mobile sidebar
            closeMobileSidebar();
        });
    });
    
    // View all buttons
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.getAttribute('data-section');
            if (targetSection) {
                switchSection(targetSection);
                
                // Update active nav states
                navItems.forEach(nav => nav.classList.remove('active'));
                mobileNavItems.forEach(nav => nav.classList.remove('active'));
                
                const targetNav = document.querySelector(`[data-section="${targetSection}"]`);
                if (targetNav) {
                    targetNav.classList.add('active');
                }
            }
        });
    });
}

// Switch between sections
function switchSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    
    if (mobileMenuBtn && mobileSidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileSidebar.classList.toggle('show');
            document.body.style.overflow = mobileSidebar.classList.contains('show') ? 'hidden' : 'auto';
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileSidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileSidebar();
            }
        });
        
        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileSidebar.classList.contains('show')) {
                closeMobileSidebar();
            }
        });
    }
}

function closeMobileSidebar() {
    const mobileSidebar = document.getElementById('mobile-sidebar');
    if (mobileSidebar) {
        mobileSidebar.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// User profile functionality
function initializeUserProfile() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored user data
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        
        // Show loading state
        showNotification('Logging out...', 'info');
        
        // Simulate logout delay
        setTimeout(() => {
            // Redirect to home page
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Load user data
function loadUserData() {
    // Simulate loading user data
    const userName = localStorage.getItem('userName') || 'Patient User';
    const userNameElements = document.querySelectorAll('.user-name, #user-name');
    
    userNameElements.forEach(element => {
        if (!element.hasAttribute('data-translate')) {
            element.textContent = userName;
        }
    });
    
    // Update user avatar
    const userAvatars = document.querySelectorAll('.user-avatar');
    userAvatars.forEach(avatar => {
        avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2196F3&color=fff`;
    });
}

// Notifications functionality
function initializeNotifications() {
    const notificationBtns = document.querySelectorAll('.notification-btn');
    notificationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Notifications feature coming soon!', 'info');
        });
    });
}

// Quick actions functionality
function initializeQuickActions() {
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch (action) {
        case 'book-appointment':
            showNotification('Appointment booking feature coming soon!', 'info');
            break;
        case 'video-call':
            showNotification('Video consultation feature coming soon!', 'info');
            break;
        case 'upload-report':
            showNotification('Report upload feature coming soon!', 'info');
            break;
        case 'emergency':
            if (confirm('This will contact emergency services. Are you sure?')) {
                showNotification('Emergency services contacted!', 'success');
            }
            break;
        default:
            showNotification('Feature coming soon!', 'info');
    }
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
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-left: 4px solid ${getNotificationColor(type)};
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        padding: var(--spacing-md);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-md);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Handle close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'var(--success-color)';
        case 'error': return 'var(--error-color)';
        case 'warning': return 'var(--warning-color)';
        default: return 'var(--info-color)';
    }
}

// Add notification animations to document
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
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: var(--text-primary);
        font-size: var(--font-size-sm);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-light);
        cursor: pointer;
        padding: var(--spacing-xs);
        border-radius: 50%;
        transition: var(--transition-fast);
    }
    
    .notification-close:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

// Export functions for global use
window.patientDashboard = {
    switchSection,
    showNotification,
    handleLogout
};