# Agni 🔥

Agni is a modern React + TypeScript web application, bootstrapped with **Vite**. It is structured for scalability with clear separation of concerns using components, hooks, services, and types.

---

## 🧱 Project Structure

```
agni/
├── src/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions / libraries
│   ├── services/      # API services or business logic
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Root component
│   ├── App.css        # App-level styles
│   ├── index.css      # Global styles
│   ├── main.tsx       # App entry point
│   └── vite-env.d.ts  # Vite environment types
├── index.html         # HTML entry point
├── eslint.config.js   # Linting configuration
├── components.json    # Component metadata (possibly for auto-registration)
├── package.json       # Project metadata and dependencies
├── package-lock.json  # Lock file (npm)
├── pnpm-lock.yaml     # Lock file (pnpm)
└── README.md          # You're reading it!
```

---

## 🚀 Getting Started

### 1. Install dependencies

Choose your preferred package manager:

```bash
# npm
npm install

# or pnpm
pnpm install
```

### 2. Start the dev server

```bash
npm run dev
```

This will start the Vite development server on [http://localhost:5173](http://localhost:5173) (default port).

---

## ⚙️ Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 📦 Dependencies

- **React**
- **TypeScript**
- **Vite**
- **ESLint**

_(Check `package.json` for full list)_

---

## 🧪 Testing

_Add your testing strategy here (e.g., Vitest, Jest, React Testing Library) if applicable._

---

## 📁 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📝 License

Add your license info here (e.g., MIT, Apache-2.0, etc.)

---

## ✨ Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
