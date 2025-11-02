import { Layout } from "./components/Layout/Layout";
import { TooltipProvider } from "./components/shared/Tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HomePage } from "./pages/home/Home.page";

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Layout>
          <HomePage />
        </Layout>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
