import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../lib/utils";
import { Button } from "../shared/Button";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border bg-card ">
      <div className="container flex items-center justify-between gap-2 px-2 py-4 mx-auto sm:px-4 sm:py-6 max-w-7xl">
        <div className="flex items-center flex-1 min-w-0 gap-1 sm:gap-3">
          <div
            className={cn(
              "py-2 px-2 sm:px-4 rounded-2xl shrink-0 mr-2 sm:mr-0",
              theme === "dark" && "bg-rd-primary"
            )}
          >
            <img
              src="/rd-station-logo.svg"
              alt="RD Station"
              className="w-24 sm:w-44"
            />
          </div>

          <div className="w-1 h-6 mr-2 sm:h-10 bg-rd-primary shrink-0 sm:mr-0"></div>
          <h1 className="text-sm font-bold truncate sm:text-2xl text-balance text-foreground">
            Recomendador de Produtos
          </h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={toggleTheme}
          className="rounded-full cursor-pointer bg-background-secondary hover:bg-foreground hover:text-background shrink-0 h-9 w-9 sm:h-10 sm:w-10"
          aria-label={
            theme === "light"
              ? "Alternar para tema escuro"
              : "Alternar para tema claro"
          }
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </Button>
      </div>
    </header>
  );
};
