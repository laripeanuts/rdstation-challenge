import { Header } from "../Header";

export function Layout({ children }) {
  return (
    <div className="min-h-screen transition-colors bg-background text-foreground">
      <Header />
      <div className="container mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
