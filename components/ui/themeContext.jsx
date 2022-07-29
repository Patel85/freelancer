import React, { useCallback } from "react";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState(getInitialTheme);

  const rawSetTheme = useCallback((theme) => {
    const root = window.document.documentElement;

    root.dataset.theme = theme;

    localStorage.setItem("color-theme", theme);
  }, []);

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      let newTheme = prevTheme === "light" ? "dark" : "light";
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("color-theme", newTheme);
      }
      return newTheme;
    });
  }, []);

  React.useEffect(
    (_) => {
      rawSetTheme(theme);
    },
    [theme, rawSetTheme]
  );

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const getInitialTheme = (_) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }
  return context;
};
