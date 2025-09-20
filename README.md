# Firebase Login Page

A responsive login page with Firebase Authentication integration, featuring email/password login, Google authentication, and user registration.

## Features

- 🔐 **Email/Password Authentication** - Secure login with Firebase Auth
- 🌐 **Google Sign-In** - One-click authentication with Google
- 📝 **User Registration** - Create new accounts with email verification
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean, professional interface with smooth animations
- ✅ **Form Validation** - Real-time validation with helpful error messages
- 🔒 **Password Toggle** - Show/hide password functionality
- 🌙 **Dark Mode Support** - Automatic dark mode based on system preference
- ♿ **Accessibility** - WCAG compliant with keyboard navigation support

## Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Modern JavaScript with modules
- **Firebase v10** - Authentication and backend services
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Inter font family

## Project Structure

```
firebase-login-page/
│
├── index.html              # Landing page with role selection
├── login.html              # Role-based login page
├── dashboard.html          # Patient dashboard
├── doctor-dashboard.html   # Doctor dashboard
├── css/
│   ├── landing.css         # Landing page styles
│   ├── styles.css          # Login page styles
│   └── dashboard.css       # Dashboard styles
├── js/
│   ├── firebase-config.js  # Firebase configuration
│   ├── auth.js            # Firebase authentication logic
│   ├── main.js            # Login page interactions
│   ├── landing.js         # Landing page functionality
│   └── dashboard.js       # Dashboard functionality
└── README.md              # This file
```

## Setup Instructions

### 1. Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to **Authentication** > **Sign-in method**
   - Enable **Email/Password** authentication
   - Enable **Google** authentication (add your domain to authorized domains)
4. Get your Firebase configuration:
   - Go to **Project Settings** > **General** > **Your apps**
   - Click "Add app" and select **Web** (if not already added)
   - Copy the Firebase configuration object

### 2. Configure the Project

1. Open `js/firebase-config.js`
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "G-XXXXXXXXXX" // Optional for Analytics
};
```

### 3. Add Authorized Domains (for Google Sign-In)

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. In the **Google** provider settings, add your domain to **Authorized domains**
3. For local development, `localhost` should already be included

### 4. Run the Application

Since this is a client-side application, you need to serve it through a web server:

#### Option 1: Using Python (if installed)
```bash
# Navigate to the project directory
cd firebase-login-page

# Python 3
python -m http.server 8000

# Python 2
python -M SimpleHTTPServer 8000
```

#### Option 2: Using Node.js (if installed)
```bash
# Install a simple HTTP server
npm install -g http-server

# Navigate to project directory and start server
cd firebase-login-page
http-server -p 8000
```

#### Option 3: Using Live Server (VS Code extension)
If using Visual Studio Code, install the "Live Server" extension and right-click on `index.html` > "Open with Live Server"

### 5. Access the Application

Open your browser and navigate to:
- `http://localhost:8000` (or whatever port you're using)

## Usage

### Login
1. Enter your email and password
2. Click "Sign In" to authenticate
3. Or click "Continue with Google" for Google authentication

### Sign Up
1. Click "Sign up" at the bottom of the login form
2. Fill in your name, email, and password
3. Confirm your password
4. Click "Create Account"

### Features
- **Remember Me**: Check to stay logged in longer
- **Password Toggle**: Click the eye icon to show/hide passwords
- **Real-time Validation**: Get immediate feedback on form inputs
- **Error Handling**: Clear error messages for authentication issues

## Customization

### Styling
- Modify `css/styles.css` to change colors, fonts, or layout
- CSS custom properties (variables) are defined in the `:root` selector for easy theming
- Dark mode colors are automatically applied based on system preference

### Authentication Logic
- Customize authentication behavior in `js/auth.js`
- Add additional providers or modify validation rules
- Implement custom success/error handling

### UI Behavior
- Modify form interactions and validations in `js/main.js`
- Add new form fields or change the signup process
- Customize modal behavior and animations

## Security Considerations

1. **Environment Variables**: In production, consider using environment variables for sensitive configuration
2. **HTTPS**: Always use HTTPS in production for secure authentication
3. **Domain Restrictions**: Configure Firebase to only allow requests from your domains
4. **Rate Limiting**: Firebase provides built-in rate limiting for authentication attempts

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Make sure you've replaced the config in `firebase-config.js`
2. **Google Sign-In popup blocked**: Check browser popup settings
3. **CORS errors**: Serve the files through a web server, don't open HTML directly
4. **Authentication domain errors**: Add your domain to Firebase authorized domains

### Console Errors
Check the browser console for detailed error messages. Most authentication errors are handled gracefully with user-friendly messages.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this login page.

---

**Note**: This is a demo/template project. For production use, consider additional security measures, error handling, and testing.