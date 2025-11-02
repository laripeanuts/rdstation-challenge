import { useState } from "react";
import Form from "../../components/Form/Form";
import RecommendationList from "../../components/RecommendationList/RecommendationList";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState({
    recommendations: [],
    selectedPreferences: [],
    selectedFeatures: [],
  });

  const handleRecommend = (result) => {
    setHasSearched(true);
    setSearchResult({
      recommendations: result.recommendations || result,
      selectedPreferences: result.selectedPreferences || [],
      selectedFeatures: result.selectedFeatures || [],
    });
  };

  return (
    <main className="container px-4 py-8 mx-auto">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="max-w-4xl mx-auto text-lg text-muted-foreground text-pretty">
            De CRM a Marketing, de Conversas a Inteligência Artificial, temos
            uma solução para ajudar você a alcançar seus objetivos. Selecione
            suas preferências e funcionalidades desejadas para receber
            recomendações personalizadas dos produtos RD Station que melhor
            atendem suas necessidades.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Form onRecommend={handleRecommend} onLoadingChange={setIsLoading} />
          <RecommendationList
            recommendations={searchResult.recommendations}
            selectedPreferences={searchResult.selectedPreferences}
            selectedFeatures={searchResult.selectedFeatures}
            isLoading={isLoading}
            hasSearched={hasSearched}
          />
        </div>
      </div>
    </main>
  );
}
