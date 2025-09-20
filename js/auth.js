// Import Firebase Auth functions
import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// UI Helper Functions
function showMessage(type, message) {
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    
    // Hide both messages first
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    if (type === 'error') {
        document.getElementById('error-text').textContent = message;
        errorDiv.style.display = 'flex';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    } else if (type === 'success') {
        document.getElementById('success-text').textContent = message;
        successDiv.style.display = 'flex';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
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

// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 6 characters
    return password.length >= 6;
}

function validateName(name) {
    return name.trim().length >= 2;
}

// Firebase Auth Error Handler
function handleAuthError(error) {
    console.error('Auth Error:', error);
    
    let message = 'An error occurred. Please try again.';
    
    switch (error.code) {
        case 'auth/user-not-found':
            message = 'No account found with this email address.';
            break;
        case 'auth/wrong-password':
            message = 'Incorrect password. Please try again.';
            break;
        case 'auth/email-already-in-use':
            message = 'An account with this email already exists.';
            break;
        case 'auth/weak-password':
            message = 'Password should be at least 6 characters long.';
            break;
        case 'auth/invalid-email':
            message = 'Please enter a valid email address.';
            break;
        case 'auth/user-disabled':
            message = 'This account has been disabled.';
            break;
        case 'auth/too-many-requests':
            message = 'Too many failed attempts. Please try again later.';
            break;
        case 'auth/network-request-failed':
            message = 'Network error. Please check your connection.';
            break;
        case 'auth/popup-closed-by-user':
            message = 'Sign-in popup was closed. Please try again.';
            break;
        case 'auth/popup-blocked':
            message = 'Popup blocked by browser. Please allow popups and try again.';
            break;
        default:
            message = error.message || 'An unexpected error occurred.';
    }
    
    showMessage('error', message);
}

// Authentication Functions
export async function loginWithEmail(email, password) {
    try {
        clearFieldErrors();
        
        // Validate inputs
        if (!validateEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            return false;
        }
        
        if (!validatePassword(password)) {
            showFieldError('password', 'Password must be at least 6 characters');
            return false;
        }
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        showMessage('success', `Welcome back, ${user.displayName || user.email}!`);
        
        // Redirect or handle successful login
        setTimeout(() => {
            console.log('User logged in successfully:', user);
            const selectedRole = localStorage.getItem('selectedRole') || 'patient';
            window.location.href = selectedRole === 'doctor' ? 'doctor-dashboard.html' : 'patient-dashboard.html';
        }, 1500);
        
        return true;
    } catch (error) {
        handleAuthError(error);
        return false;
    }
}

export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        showMessage('success', `Welcome, ${user.displayName || user.email}!`);
        
        // Redirect or handle successful login
        setTimeout(() => {
            console.log('User logged in with Google:', user);
            const selectedRole = localStorage.getItem('selectedRole') || 'patient';
            window.location.href = selectedRole === 'doctor' ? 'doctor-dashboard.html' : 'patient-dashboard.html';
        }, 1500);
        
        return true;
    } catch (error) {
        handleAuthError(error);
        return false;
    }
}

export async function signUpWithEmail(name, email, password) {
    try {
        clearFieldErrors();
        
        // Validate inputs
        if (!validateName(name)) {
            showFieldError('signup-name', 'Please enter a valid name (at least 2 characters)');
            return false;
        }
        
        if (!validateEmail(email)) {
            showFieldError('signup-email', 'Please enter a valid email address');
            return false;
        }
        
        if (!validatePassword(password)) {
            showFieldError('signup-password', 'Password must be at least 6 characters');
            return false;
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update user profile with name
        await updateProfile(user, {
            displayName: name
        });
        
        showMessage('success', `Account created successfully! Welcome, ${name}!`);
        
        // Close signup modal and redirect
        setTimeout(() => {
            document.getElementById('signup-modal').style.display = 'none';
            console.log('User signed up successfully:', user);
            const selectedRole = localStorage.getItem('selectedRole') || 'patient';
            window.location.href = selectedRole === 'doctor' ? 'doctor-dashboard.html' : 'patient-dashboard.html';
        }, 1500);
        
        return true;
    } catch (error) {
        handleAuthError(error);
        return false;
    }
}

export async function logout() {
    try {
        await signOut(auth);
        showMessage('success', 'Signed out successfully');
        
        // Redirect to login page or refresh
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
        return true;
    } catch (error) {
        handleAuthError(error);
        return false;
    }
}

// Auth State Observer
export function initAuthObserver() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            console.log('User is authenticated:', user);
            
            // You can update UI for authenticated state here
            // For example, show user info or redirect to dashboard
            
        } else {
            // User is signed out
            console.log('User is not authenticated');
            
            // You can update UI for non-authenticated state here
        }
    });
}

// Initialize auth observer when module loads
initAuthObserver();