// Main JavaScript file for handling UI interactions
// Note: This file loads auth functions dynamically since it can't use ES6 imports directly

// Global variables for auth functions
let authModule;

// Load auth module dynamically
async function loadAuthModule() {
    try {
        authModule = await import('./auth.js');
        console.log('Auth module loaded successfully');
    } catch (error) {
        console.error('Failed to load auth module:', error);
        showMessage('error', 'Failed to initialize authentication. Please refresh the page.');
    }
}

// Initialize auth module on page load
window.addEventListener('load', loadAuthModule);

// UI Helper Functions
function showMessage(type, message) {
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    
    // Hide both messages first
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    
    if (type === 'error' && errorDiv) {
        document.getElementById('error-text').textContent = message;
        errorDiv.style.display = 'flex';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    } else if (type === 'success' && successDiv) {
        document.getElementById('success-text').textContent = message;
        successDiv.style.display = 'flex';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
}

function setButtonLoading(button, loading) {
    const btnText = button.querySelector('.btn-text') || button.querySelector('.btn-content');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        if (btnText) btnText.style.opacity = '0';
        if (btnLoader) btnLoader.style.display = 'block';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        if (btnText) btnText.style.opacity = '1';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}

// Password toggle functionality
function initPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input.id, 'This field is required');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.classList.add('error');
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorElement.classList.remove('show');
            inputElement.classList.remove('error');
        }, 5000);
    }
}

function clearFieldErrors() {
    const errorElements = document.querySelectorAll('.error-text');
    const inputElements = document.querySelectorAll('input.error');
    
    errorElements.forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    
    inputElements.forEach(el => {
        el.classList.remove('error');
    });
}

// Real-time validation
function initRealTimeValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                showFieldError(this.id, 'Please enter a valid email address');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
    });
    
    // Password validation
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && this.value.length < 6) {
                showFieldError(this.id, 'Password must be at least 6 characters');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
    });
    
    // Confirm password validation
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const passwordInput = document.getElementById('signup-password');
    
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            if (this.value && this.value !== passwordInput.value) {
                showFieldError(this.id, 'Passwords do not match');
            }
        });
    }
    
    // Name validation
    const nameInputs = document.querySelectorAll('input[name="name"]');
    nameInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && this.value.trim().length < 2) {
                showFieldError(this.id, 'Name must be at least 2 characters');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
    });
}

// Modal handling
function initModal() {
    const signupModal = document.getElementById('signup-modal');
    const signupBtn = document.getElementById('signup-btn');
    const closeSignupModal = document.getElementById('close-signup-modal');
    
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            signupModal.style.display = 'flex';
            clearFieldErrors();
            document.getElementById('signup-form').reset();
        });
    }
    
    if (closeSignupModal) {
        closeSignupModal.addEventListener('click', () => {
            signupModal.style.display = 'none';
            clearFieldErrors();
        });
    }
    
    // Close modal when clicking outside
    if (signupModal) {
        signupModal.addEventListener('click', (e) => {
            if (e.target === signupModal) {
                signupModal.style.display = 'none';
                clearFieldErrors();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && signupModal.style.display === 'flex') {
            signupModal.style.display = 'none';
            clearFieldErrors();
        }
    });
}

// Form submission handlers
function initFormHandlers() {
    // Login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!authModule) {
                showMessage('error', 'Authentication not initialized. Please refresh the page.');
                return;
            }
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('login-btn');
            
            if (!email || !password) {
                showMessage('error', 'Please fill in all fields');
                return;
            }
            
            setButtonLoading(loginBtn, true);
            
            try {
                const success = await authModule.loginWithEmail(email, password);
                if (!success) {
                    setButtonLoading(loginBtn, false);
                }
            } catch (error) {
                console.error('Login error:', error);
                showMessage('error', 'Login failed. Please try again.');
                setButtonLoading(loginBtn, false);
            }
        });
    }
    
    // Google login handler
    const googleLoginBtn = document.getElementById('google-login-btn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            if (!authModule) {
                showMessage('error', 'Authentication not initialized. Please refresh the page.');
                return;
            }
            
            setButtonLoading(googleLoginBtn, true);
            
            try {
                const success = await authModule.loginWithGoogle();
                if (!success) {
                    setButtonLoading(googleLoginBtn, false);
                }
            } catch (error) {
                console.error('Google login error:', error);
                showMessage('error', 'Google login failed. Please try again.');
                setButtonLoading(googleLoginBtn, false);
            }
        });
    }
    
    // Signup form handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!authModule) {
                showMessage('error', 'Authentication not initialized. Please refresh the page.');
                return;
            }
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const signupBtn = document.getElementById('signup-submit-btn');
            
            if (!name || !email || !password || !confirmPassword) {
                showMessage('error', 'Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                showFieldError('signup-confirm-password', 'Passwords do not match');
                return;
            }
            
            setButtonLoading(signupBtn, true);
            
            try {
                const success = await authModule.signUpWithEmail(name, email, password);
                if (!success) {
                    setButtonLoading(signupBtn, false);
                }
            } catch (error) {
                console.error('Signup error:', error);
                showMessage('error', 'Signup failed. Please try again.');
                setButtonLoading(signupBtn, false);
            }
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    
    // Handle role-based login UI
    initializeRoleBasedUI();
    
    initPasswordToggles();
    initRealTimeValidation();
    initModal();
    initFormHandlers();
    
    // Clear any existing messages
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    
    console.log('App initialized successfully');
});

// Handle form input focus effects
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.input-wrapper input');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Initialize focused state for inputs with values
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Initialize role-based UI
function initializeRoleBasedUI() {
    // Get role from URL parameters or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    let selectedRole = urlParams.get('role') || localStorage.getItem('selectedRole') || 'patient';
    
    // Update page title and content based on role
    const titleElement = document.getElementById('login-title');
    const subtitleElement = document.getElementById('login-subtitle');
    
    if (titleElement && subtitleElement) {
        if (selectedRole === 'doctor') {
            titleElement.textContent = 'Doctor Portal';
            subtitleElement.textContent = 'Sign in to your medical practice';
            document.title = 'Sanjeevni - Doctor Login';
        } else {
            titleElement.textContent = 'Patient Portal';
            subtitleElement.textContent = 'Sign in to manage your health';
            document.title = 'Sanjeevni - Patient Login';
        }
    }
    
    // Store the role for later use
    localStorage.setItem('selectedRole', selectedRole);
    
    // Add role indicator to the page
    const roleIndicator = document.createElement('div');
    roleIndicator.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 8px 16px;
        background: rgba(33, 150, 243, 0.1);
        color: #2196f3;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
    `;
    roleIndicator.textContent = `${selectedRole} Login`;
    document.querySelector('.login-card').appendChild(roleIndicator);
    
    console.log(`Initialized ${selectedRole} login interface`);
}

// Export functions for global access if needed
window.loginApp = {
    showMessage,
    setButtonLoading,
    clearFieldErrors,
    initializeRoleBasedUI
};
