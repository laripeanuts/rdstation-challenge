import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../lib/utils";
import { Button } from "../shared/Button";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border bg-card ">
      <div className="container flex items-center justify-between px-4 py-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "py-2 px-4 rounded-2xl",
              theme === "dark" && "bg-rd-primary"
            )}
          >
            <img src="/rd-station-logo.svg" alt="RD Station" className="w-44" />
          </div>

          <div className="w-1 h-10 bg-rd-primary"></div>
          <h1 className="text-2xl font-bold text-balance text-foreground">
            Recomendador de Produtos RD Station
          </h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={toggleTheme}
          className="rounded-full cursor-pointer bg-background-secondary hover:bg-foreground hover:text-background"
          aria-label={
            theme === "light"
              ? "Alternar para tema escuro"
              : "Alternar para tema claro"
          }
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
};
