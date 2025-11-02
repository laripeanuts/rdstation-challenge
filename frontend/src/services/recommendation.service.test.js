import mockProducts from '../mocks/mockProducts';
import { recommendationService } from './recommendation.service';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    // With 24 products, the last match with score 2 is RD Chat Integrator (id: 7)
    expect(recommendations[0].name).toBe('RD Chat Integrator');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    // With 24 products, there are more matches now
    expect(recommendations.length).toBeGreaterThan(0);
    // The first one should be the one with the highest score (RD Station CRM with score 3)
    expect(recommendations[0].name).toBe('RD Station CRM');
    // Should include RD Station Marketing (score 2)
    expect(recommendations.map((p) => p.name)).toContain(
      'RD Station Marketing'
    );
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    // With 24 products, the last product with score 1 and both preferences is RD Omni AI (id: 21)
    expect(recommendations[0].name).toBe('RD Omni AI');
  });

  test('Retorna array vazio quando não há matches', () => {
    const formData = {
      selectedPreferences: ['Preferência inexistente'],
      selectedFeatures: ['Funcionalidade inexistente'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna array vazio quando preferências e funcionalidades estão vazias', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna array vazio para SingleProduct quando não há seleções', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Permite usar estratégia de scoring customizada', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    // Custom scoring strategy that always returns score of 10
    const customScoring = () => 10;

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts,
      { scoringStrategy: customScoring }
    );

    expect(recommendations.length).toBeGreaterThan(0);
    recommendations.forEach((product) => {
      expect(product.score).toBe(10);
    });
  });

  test('Permite usar estratégias de seleção customizadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'CustomStrategy',
    };

    // Custom selection strategy that returns only first 2 products
    const customSelectionStrategies = {
      CustomStrategy: (products) => products.slice(0, 2),
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts,
      { selectionStrategies: customSelectionStrategies }
    );

    expect(recommendations).toHaveLength(2);
  });

  test('Retorna warning e todos os produtos para tipo de recomendação desconhecido', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'UnknownType',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unknown recommendation type: UnknownType')
    );
    expect(recommendations.length).toBeGreaterThan(0);

    consoleWarnSpy.mockRestore();
  });

  test('Usa valores default quando formData não tem propriedades', () => {
    const recommendations = recommendationService.getRecommendations(
      {},
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test('Usa valores default quando products está vazio', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      []
    );

    expect(recommendations).toEqual([]);
  });

  test('Usa estratégias default quando options não é fornecido', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    // With 24 products, the last product with "Marketing Automation" is RD Engage (id: 20)
    expect(recommendations[0].name).toBe('RD Engage');
  });
});
