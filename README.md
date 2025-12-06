# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Folder Structure:
BulldogBarket-Frontend/
│
├── .env
├── .git/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── eslint.config.js
├── index.html
│
├── public/
│   └── (public assets...)
│
├── node_modules/
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── assets/
    │   └── (images, icons, logos...)
    │
    ├── components/
    │   ├── postproduct/
    │   │   └── (components for posting products...)
    │   │
    │   └── signup/
    │       ├── barkkart_panel.jsx
    │       └── signup_form.jsx   ← updated to call backend
    │
    ├── hooks/
    │   └── (custom hooks...)
    │
    ├── pages/
    │   ├── home.jsx
    │   ├── menu.jsx
    │   ├── about.jsx
    │   └── signup.jsx      ← imports from ../components/signup/*
    │
    └── services/
        └── (API helpers, axios configs, etc.)

