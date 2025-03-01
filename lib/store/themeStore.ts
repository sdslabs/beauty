import { create } from "zustand";

interface ThemeState {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkTheme: false, // Default theme
  toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
}));