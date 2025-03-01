import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeState {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkTheme: false, // Default to light mode
      toggleTheme: () => {
        set((state) => {
          const newTheme = !state.isDarkTheme;
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", newTheme);
          }
          return { isDarkTheme: newTheme };
        });
      },
    }),
    {
      name: "theme-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // ✅ FIXED: Wrap localStorage correctly
    }
  )
);

// Ensure theme is applied on mount
if (typeof window !== "undefined") {
  const storedTheme = localStorage.getItem("theme-storage");
  if (storedTheme) {
    const parsedState = JSON.parse(storedTheme).state;
    document.documentElement.classList.toggle("dark", parsedState.isDarkTheme);
  }
}
