import { useEffect, useState } from "react";

export default function ThemeToggle() {

  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if(saved === "light"){
      document.documentElement.classList.add("light");
      setLight(true);
    }
  }, []);

  const toggleTheme = () => {

    document.documentElement.classList.toggle("light");

    const isLight =
      document.documentElement.classList.contains("light");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    setLight(isLight);
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-6 right-6
        w-12 h-12
        rounded-full
        bg-[var(--card)]
        border border-[var(--glass-border)]
        shadow-lg
        hover:scale-110
        transition
      "
    >
      {light ? "🌙" : "☀️"}
    </button>
  );
}