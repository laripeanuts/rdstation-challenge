import { CheckCircle2, Trophy } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../shared/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shared/Card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shared/Tooltip";

const categoryColors = {
  Vendas: "bg-category-sales text-white",
  Marketing: "bg-category-marketing text-white",
  Omnichannel: "bg-category-omnichannel text-white",
  "Uso de Inteligência Artificial": "bg-category-ai text-white",
  "Análise e Dados": "bg-category-data text-white",
};

export function RecommendationCard({
  product,
  rank,
  matchedPreferences = [],
  matchedFeatures = [],
}) {
  const isTopRanked = rank === 1;

  const sections = useMemo(
    () => [
      {
        title: "Preferências correspondentes",
        items: matchedPreferences,
      },
      {
        title: "Funcionalidades correspondentes",
        items: matchedFeatures,
      },
    ],
    [matchedPreferences, matchedFeatures]
  );

  return (
    <Card
      className={`transition-all hover:shadow-lg ${
        isTopRanked ? `border-2 border-yellow-500 bg-yellow-500/10` : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isTopRanked && <Trophy className="w-5 h-5 text-yellow-500" />}
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </div>
            <Badge
              className={
                categoryColors[product.category] ||
                "bg-primary-foreground text-white"
              }
            >
              {product.category}
            </Badge>
          </div>
          {product.score !== undefined && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center justify-center w-16 h-16 text-center rounded-full cursor-help">
                  <div className="text-2xl font-bold text-primary-foreground">
                    {product.score}
                  </div>
                  <div className="text-xs text-muted-foreground">pontos</div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Quanto maior o valor, mais próximo este produto está das suas
                  preferências e funcionalidades selecionadas.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-sm">
          {product.description}
        </CardDescription>

        {sections.map((section) => {
          if (section.items.length === 0) {
            return null;
          }

          return (
            <div key={section.title}>
              <p className="flex items-center gap-1 mb-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="w-3 h-3" />
                {section.title}:
              </p>
              <div className="flex flex-wrap gap-1">
                {section.items.map((item) => (
                  <Badge
                    key={item}
                    className="text-xs font-light bg-green-700/10 text-green-700/80 border-green-700/30"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
