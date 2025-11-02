import { Loader2, Sparkles } from "lucide-react";
import { RecommendationCard } from "../RecommendationCard/RecommendationCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shared/Card";

function RecommendationList({
  recommendations = [],
  selectedPreferences = [],
  selectedFeatures = [],
  isLoading = false,
  hasSearched = false,
}) {
  return (
    <div>
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="text-2xl">Lista de Recomendações</CardTitle>
          <CardDescription>
            {recommendations.length > 0
              ? `${recommendations.length} produto${
                  recommendations.length > 1 ? "s" : ""
                } encontrado${recommendations.length > 1 ? "s" : ""}`
              : "Aguardando seleção"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-rd-primary" />
              <p className="text-muted-foreground">
                Analisando suas preferências...
              </p>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((product, index) => {
                const matchedPreferences = selectedPreferences.filter((p) =>
                  product.preferences?.includes(p)
                );
                const matchedFeatures = selectedFeatures.filter((f) =>
                  product.features?.includes(f)
                );

                return (
                  <RecommendationCard
                    key={product.id || product.name}
                    product={product}
                    rank={index + 1}
                    matchedPreferences={matchedPreferences}
                    matchedFeatures={matchedFeatures}
                  />
                );
              })}
            </div>
          ) : hasSearched ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="mb-1 font-medium text-foreground">
                  Nenhuma recomendação encontrada
                </p>
                <p className="text-sm text-muted-foreground text-pretty">
                  Tente selecionar diferentes preferências ou funcionalidades
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="mb-1 font-medium text-foreground">
                  Pronto para começar?
                </p>
                <p className="text-sm text-muted-foreground text-pretty">
                  Selecione suas preferências e clique em "Obter Recomendação"
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default RecommendationList;
