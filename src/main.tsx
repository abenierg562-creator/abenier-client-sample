import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Always force dark mode
document.documentElement.classList.add('dark');
localStorage.setItem('theme', 'dark');

createRoot(document.getElementById("root")!).render(<App />);
