// Dashboard JavaScript for Sanjeevni Telemedicine Platform
import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

// Global variables
let currentUser = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initializing...');
    
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            initializeDashboard(user);
            console.log('User authenticated:', user);
        } else {
            // Redirect to landing page if not authenticated
            window.location.href = 'index.html';
        }
    });
});

// Initialize dashboard with user data
function initializeDashboard(user) {
    // Update user information
    updateUserInfo(user);
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize modals
    initializeModals();
    
    // Initialize quick actions
    initializeQuickActions();
    
    // Initialize logout functionality
    initializeLogout();
    
    // Initialize appointment booking
    initializeAppointmentBooking();
    
    // Initialize search and filters
    initializeSearch();
    
    // Set minimum date for appointment booking
    setMinimumAppointmentDate();
    
    console.log('Dashboard initialized successfully');
}

// Update user information in the UI
function updateUserInfo(user) {
    const userNameElement = document.getElementById('user-name');
    const userAvatarElement = document.getElementById('user-avatar');
    
    if (userNameElement) {
        const displayName = user.displayName || user.email.split('@')[0];
        userNameElement.textContent = displayName;
        
        // Update avatar
        if (userAvatarElement) {
            const encodedName = encodeURIComponent(displayName);
            userAvatarElement.src = `https://ui-avatars.com/api/?name=${encodedName}&background=4285f4&color=fff`;
            userAvatarElement.alt = displayName;
        }
    }
}

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all nav links and sections
            navLinks.forEach(nl => nl.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav link and target section
            this.classList.add('active');
            const targetSectionElement = document.getElementById(targetSection);
            if (targetSectionElement) {
                targetSectionElement.classList.add('active');
            }
            
            // Update URL hash without triggering page reload
            window.history.pushState(null, null, `#${targetSection}`);
        });
    });
    
    // Handle direct navigation via URL hash
    window.addEventListener('hashchange', handleHashNavigation);
    handleHashNavigation(); // Handle initial hash
    
    // Handle "View All" links
    const viewAllLinks = document.querySelectorAll('.view-all');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetSection = href.substring(1);
                navigateToSection(targetSection);
            }
        });
    });
}

// Handle navigation via URL hash
function handleHashNavigation() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateToSection(hash);
    }
}

// Navigate to specific section
function navigateToSection(sectionName) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    const targetNavLink = document.querySelector(`[data-section="${sectionName}"]`);
    const targetSection = document.getElementById(sectionName);
    
    if (targetNavLink && targetSection) {
        targetNavLink.classList.add('active');
        targetSection.classList.add('active');
    }
}

// Initialize modals
function initializeModals() {
    const appointmentModal = document.getElementById('appointment-modal');
    const bookAppointmentBtns = document.querySelectorAll('#book-appointment-btn, [data-action="book-appointment"]');
    const closeModalBtns = document.querySelectorAll('.close-btn, .cancel-btn');
    
    // Open appointment modal
    bookAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (appointmentModal) {
                appointmentModal.classList.add('show');
                appointmentModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                openModal.classList.remove('show');
                openModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Initialize quick actions
function initializeQuickActions() {
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch (action) {
                case 'book-appointment':
                    const appointmentModal = document.getElementById('appointment-modal');
                    if (appointmentModal) {
                        appointmentModal.classList.add('show');
                        appointmentModal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                    break;
                    
                case 'video-call':
                    showNotification('Video call feature coming soon!', 'info');
                    break;
                    
                case 'upload-report':
                    // Simulate file upload
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = '.pdf,.jpg,.jpeg,.png';
                    fileInput.addEventListener('change', function(e) {
                        if (e.target.files.length > 0) {
                            showNotification('Report uploaded successfully!', 'success');
                        }
                    });
                    fileInput.click();
                    break;
                    
                case 'emergency':
                    if (confirm('This will connect you with emergency services. Continue?')) {
                        showNotification('Connecting to emergency services...', 'warning');
                        // In a real app, this would connect to emergency services
                    }
                    break;
            }
        });
    });
}

// Initialize logout functionality
function initializeLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            if (confirm('Are you sure you want to log out?')) {
                try {
                    await signOut(auth);
                    showNotification('Logged out successfully', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } catch (error) {
                    console.error('Logout error:', error);
                    showNotification('Error logging out. Please try again.', 'error');
                }
            }
        });
    }
}

// Initialize appointment booking form
function initializeAppointmentBooking() {
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const appointmentData = {
                specialty: document.getElementById('specialty').value,
                date: document.getElementById('appointment-date').value,
                time: document.getElementById('appointment-time').value,
                type: document.getElementById('consultation-type').value,
                symptoms: document.getElementById('symptoms').value
            };
            
            // Validate form data
            if (!appointmentData.specialty || !appointmentData.date || !appointmentData.time || !appointmentData.type) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate appointment booking
            bookAppointment(appointmentData);
        });
    }
}

// Book appointment function
function bookAppointment(appointmentData) {
    // Simulate API call
    showNotification('Booking appointment...', 'info');
    
    setTimeout(() => {
        // Close modal
        const modal = document.getElementById('appointment-modal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Reset form
        const form = document.getElementById('appointment-form');
        if (form) form.reset();
        
        // Show success message
        showNotification('Appointment booked successfully!', 'success');
        
        // In a real app, you would:
        // 1. Send data to backend API
        // 2. Update the appointments list
        // 3. Send confirmation email/SMS
        
        console.log('Appointment booked:', appointmentData);
    }, 2000);
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterDoctors(searchTerm, filterSelect?.value || '');
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const specialty = this.value;
            filterDoctors(searchInput?.value.toLowerCase() || '', specialty);
        });
    }
}

// Filter doctors based on search term and specialty
function filterDoctors(searchTerm, specialty) {
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    doctorCards.forEach(card => {
        const doctorName = card.querySelector('h3').textContent.toLowerCase();
        const doctorSpecialty = card.querySelector('p').textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || doctorName.includes(searchTerm);
        const matchesSpecialty = !specialty || doctorSpecialty.includes(specialty);
        
        if (matchesSearch && matchesSpecialty) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Set minimum date for appointment booking
function setMinimumAppointmentDate() {
    const appointmentDateInput = document.getElementById('appointment-date');
    if (appointmentDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        appointmentDateInput.setAttribute('min', minDate);
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
        z-index: 10000;
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
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color based on type
function getNotificationColor(type) {
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };
    return colors[type] || '#2196f3';
}

// Add animation keyframes
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
    
    .notification {
        font-family: 'Inter', sans-serif;
    }
`;
document.head.appendChild(style);

// Handle appointment actions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary') && e.target.textContent.includes('Join Call')) {
        e.preventDefault();
        showNotification('Starting video call...', 'info');
        // In a real app, this would initiate a video call
    }
    
    if (e.target.matches('.btn-secondary') && e.target.textContent.includes('Reschedule')) {
        e.preventDefault();
        showNotification('Reschedule feature coming soon!', 'info');
    }
    
    if (e.target.matches('.btn-secondary') && e.target.textContent.includes('Cancel')) {
        e.preventDefault();
        if (confirm('Are you sure you want to cancel this appointment?')) {
            showNotification('Appointment cancelled successfully', 'success');
            // In a real app, this would update the backend
        }
    }
    
    if (e.target.matches('.btn-outline') && e.target.textContent.includes('View Profile')) {
        e.preventDefault();
        showNotification('Doctor profile feature coming soon!', 'info');
    }
    
    if (e.target.matches('.btn-primary') && e.target.textContent.includes('Book Appointment')) {
        e.preventDefault();
        const appointmentModal = document.getElementById('appointment-modal');
        if (appointmentModal) {
            appointmentModal.classList.add('show');
            appointmentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
});

// Handle download actions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-outline') && e.target.textContent.includes('Download')) {
        e.preventDefault();
        showNotification('Download started...', 'success');
        // In a real app, this would download the actual file
    }
    
    if (e.target.matches('.btn-primary') && e.target.textContent.includes('Download All')) {
        e.preventDefault();
        showNotification('Downloading all prescriptions...', 'success');
    }
    
    if (e.target.matches('.btn-secondary') && e.target.textContent.includes('Download')) {
        e.preventDefault();
        showNotification('Report downloaded successfully', 'success');
    }
});

// Handle view actions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-outline') && e.target.textContent.includes('View')) {
        e.preventDefault();
        showNotification('Opening report viewer...', 'info');
        // In a real app, this would open a report viewer
    }
    
    if (e.target.matches('.btn-outline') && e.target.textContent.includes('View Details')) {
        e.preventDefault();
        showNotification('Appointment details feature coming soon!', 'info');
    }
});

// Export functions for potential use by other modules
window.dashboardApp = {
    showNotification,
    navigateToSection,
    bookAppointment
};

// Handle page visibility changes (for real-time updates)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && currentUser) {
        // Page is now visible, refresh data if needed
        console.log('Page visible, refreshing data...');
        // In a real app, you might refresh appointments, notifications, etc.
    }
});

console.log('Dashboard script loaded successfully');