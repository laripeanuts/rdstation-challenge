import { Github, Linkedin } from "lucide-react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../shared/Button";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container flex items-center justify-between px-4 py-6 mx-auto max-w-7xl">
        <p className="text-sm text-muted-foreground">
          Desenvolvido por{" "}
          <span className="font-medium text-foreground">Larissa Rabelo</span>
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/laripeanuts"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir GitHub de Larissa Rabelo"
            title="GitHub"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-full bg-background-secondary hover:bg-foreground hover:text-background"
            )}
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/larissarabelolf"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir LinkedIn de Larissa Rabelo"
            title="LinkedIn"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-full bg-background-secondary hover:bg-foreground hover:text-background"
            )}
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
