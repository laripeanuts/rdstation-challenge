import { Loader2, Sparkles } from "lucide-react";
import { Button } from "../../shared/Button";

function SubmitButton({ isLoading = false, disabled = false }) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="w-full h-12 text-base font-semibold"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processando...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Obter Recomendação
        </>
      )}
    </Button>
  );
}

export default SubmitButton;
