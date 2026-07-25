# Uber Clone Frontend - Web Application Documentation

This directory contains the user interface and client-side logic for the Uber Clone application. It is built as a single-page application (SPA) using React 19, Vite, and Tailwind CSS.

---

## Directory Overview

```text
frontend/
├── src/
│   ├── api/            # Axios API config with baseURL
│   ├── assets/         # Images, SVG icons, and logos
│   ├── context/        # React Context API states (User and Captain states)
│   ├── pages/          # Pages (Signup, Login, Dashboard, Logout, Route protection)
│   ├── App.jsx         # App routes definition using react-router-dom
│   ├── main.jsx        # App entry point
│   └── index.css       # Tailwind utility classes and styling
├── index.html
├── vite.config.js
└── package.json
```

---

## Pages & Routing Structure

All routes are declared in [App.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/App.jsx). Below is the overview of pages and protected routes:

### 1. Public Routes
* **`/` ([Start.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/Start.jsx))**: Landing page with a welcome screen and redirection links to start.
* **`/login` ([UserLogin.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/UserLogin.jsx))**: Passenger login form. Uses `UserDataContext` to store user state and saves the session token as `token` in `localStorage`.
* **`/signup` ([UserSignup.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/UserSignup.jsx))**: Passenger registration form.
* **`/captain-login` ([CaptainLogin.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/CaptainLogin.jsx))**: Driver (Captain) login form. Saves session token as `captainToken` in `localStorage`.
* **`/captain-signup` ([CaptainSignup.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/CaptainSignup.jsx))**: Driver (Captain) registration form including vehicle detail selection (Color, Plate, Capacity, and Type: Car/Bike/Auto).

### 2. Protected Routes
These routes are protected using client-side wrapper components that query the presence of authentication tokens:

* **`/home` ([Home.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/Home.jsx))**: Protected by `UserProtectorWrapper`. Serves as the landing dashboard for users once successfully logged in.
* **`/captain-home` ([CaptainHome.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/CaptainHome.jsx))**: Protected by `CaptainProtectorWrapper`. Serves as the dashboard for captains.
* **`/user/logout` ([UserLogout.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/UserLogout.jsx))**: Protected by `UserProtectorWrapper`. Hits the backend logout API, destroys the token cookie, removes `token` from `localStorage`, and redirects to login.
* **`/captain/logout` ([CaptainLogout.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/pages/CaptainLogout.jsx))**: Protected by `CaptainProtectorWrapper`. Blacklists the Captain's token and routes them back to the login screen.

---

## State Management (Context API)

We utilize the React Context API to propagate auth profiles globally:

1. **`UserDataContext`** ([Usercont.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/context/Usercont.jsx)): Provides passenger profile details and the updater function (`[user, setuser]`).
2. **`CaptainDataContext`** ([CaptainContext.jsx](file:///Users/suryapratap/Desktop/WEB-DEV/uber-clone/frontend/src/context/CaptainContext.jsx)): Provides driver profile details and the updater function (`[captain, setcaptain]`).

---

## Configuration & Scripts

### Environment Variables
Configure a `.env` in the root of the `frontend` folder with the target backend address:
```env
VITE_BASE_URL=http://localhost:4000/
```

### Commands
In the `frontend` directory, run:
* **Start local dev server**: `npm run dev`
* **Production Build**: `npm run build`
* **Preview production build locally**: `npm run preview`
