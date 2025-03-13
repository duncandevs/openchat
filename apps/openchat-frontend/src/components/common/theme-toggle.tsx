"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/styles/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="h-6 w-11 transition-colors"
      />
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-purple-500" />
      ) : (
        <Sun className="h-5 w-5 text-orange-500" />
      )}
    </div>
  );
};
