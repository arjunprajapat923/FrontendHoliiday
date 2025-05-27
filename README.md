# FrontendHoliiday

A React + Vite frontend project with Firebase authentication (Google and Email/Password), Tailwind CSS for styling, and a backend API integration. This project is intended to be used alongside a backend server (see "Backend Setup" below).

---

## Features

- React with Vite for fast development
- Firebase authentication (Google, Email/Password)
- User profile and all users listing
- Tailwind CSS utility-first styling
- ESLint and Prettier integration for code quality
- Requires backend API for full functionality

---

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- **Backend server** (must be started separately; see below)

---

## Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/arjunprajapat923/FrontendHoliiday.git
   cd FrontendHoliiday
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   - Firebase configuration is currently hardcoded in `src/Firebase.jsx`. For production, you should move these to environment variables.

4. **Tailwind CSS**
   - No additional setup needed; Tailwind is preconfigured in `postcss.config.js` and `tailwind.config.js`.

---

## Backend Setup (Required)

> **You must set up and start the backend server before running this frontend project.**

- The frontend expects a backend API running at: `http://localhost:8000`
- The backend should expose endpoints such as `/api/users/firebase-login`
- Make sure CORS is enabled on the backend

> **If you don't have the backend code, contact the maintainer or check your project documentation.**

---

## Running the Frontend

Once the backend is up and running:

```bash
npm run dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## Linting & Formatting

To check linting errors:

```bash
npm run lint
```

---

## Authentication

- Supports Google Sign-In and Email/Password authentication via Firebase.
- Authentication information is sent to the backend for session management.

---

## Folder Structure

```
FrontendHoliiday/
├── src/
│   ├── App.jsx           # Main React app with routing
│   ├── AuthPage.jsx      # Authentication page (login/register)
│   ├── components/
│   │   └── UserProfile.jsx
│   ├── pages/
│   │   └── AllUsers.jsx
│   ├── Firebase.jsx      # Firebase authentication setup
│   ├── index.css         # Tailwind CSS imports
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── README.md             # You are here!
└── ...
```

---

## Notes

- Make sure your backend is running on `localhost:8000` (or change the API URLs in the frontend if different).
- Update Firebase credentials in `src/Firebase.jsx` for your own project.
- For production usage, secure environment variables and ensure proper build steps.

---

## License

MIT

---

> **Start the backend server before running this project!**
