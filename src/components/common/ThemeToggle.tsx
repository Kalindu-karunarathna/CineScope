"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="size-10 rounded-full border border-border/40 bg-background/50"
        disabled
      >
        <Sun className="size-4 opacity-50" aria-hidden="true" />
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const currentThemeLabel =
    theme === "system"
      ? `System (${resolvedTheme ?? "default"})`
      : theme === "dark"
        ? "Dark"
        : "Light";

  const getLabel = () => {
    if (theme === "light") return "Switch to dark mode";
    if (theme === "dark") return "Switch to system theme preference";
    return "Switch to light mode";
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={getLabel()}
      title={`Current theme: ${currentThemeLabel}. Click to switch.`}
      className="size-10 rounded-full border border-border/50 bg-background/60 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {theme === "system" ? (
        <Monitor className="size-4 text-foreground/80" aria-hidden="true" />
      ) : resolvedTheme === "dark" ? (
        <Moon className="size-4 text-sky-400" aria-hidden="true" />
      ) : (
        <Sun className="size-4 text-amber-500" aria-hidden="true" />
      )}
    </Button>
  );
}
