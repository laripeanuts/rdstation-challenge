import { useState } from 'react';
import Form from '../../components/Form/Form';
import RecommendationList from '../../components/RecommendationList/RecommendationList';

export function HomePage() {
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommend = (items) => {
    setRecommendations(items);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-8">
      <div className="grid w-full grid-cols-1 gap-8 p-8 rounded-lg shadow-md bg-card md:w-3/4 lg:w-1/2 md:grid-cols-2">
        <div className="col-span-2 mb-4">
          <p className="text-lg text-foreground">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode
            encontrar uma variedade de produtos da RD Station, cada um projetado
            para atender às necessidades específicas do seu negócio. De CRM a
            Marketing, de Conversas a Inteligência Artificial, temos uma solução
            para ajudar você a alcançar seus objetivos. Use o formulário abaixo
            para selecionar suas preferências e funcionalidades desejadas e
            receba recomendações personalizadas de produtos que melhor atendam
            às suas necessidades.
          </p>
        </div>
        <div>
          <Form onRecommend={handleRecommend} />
        </div>
        <div>
          <RecommendationList recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}
