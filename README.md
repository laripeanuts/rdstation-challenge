# Teste Técnico - Recomendador de Produtos RD Station

Este projeto é parte do teste técnico para a vaga de desenvolvedor front-end na RD Station. O objetivo principal é implementar a lógica de recomendação de produtos RD Station em uma aplicação web existente.

## Missão

Sua missão é desenvolver a funcionalidade central de recomendação de produtos dentro de uma aplicação React.js pré-existente. Você deverá implementar a lógica que permite aos usuários selecionar suas preferências e funcionalidades desejadas, e então receber recomendações de produtos correspondentes.

## Contexto

Este projeto é parte de uma etapa técnica do processo seletivo para a vaga de desenvolvedor front-end na RD Station. A estrutura básica da aplicação já está construída com React.js para o front-end e utiliza json-server para simular um servidor RESTful com dados de produtos.

Seu foco deve ser na implementação da lógica de recomendação e na integração desta funcionalidade com a interface do usuário existente. A aplicação já possui um layout básico utilizando Tailwind CSS.

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias principais:

- React.js: Para o desenvolvimento do front-end
- json-server: Para simular um servidor RESTful com dados de produtos
- Tailwind CSS: Para estilização e layout responsivo

## 🎬 Demonstração

### Preview da Aplicação

![GIF da aplicação em funcionamento](./.github/demo/screen.gif)

### Screenshot

#### Tema claro

![Screenshot da interface com tema claro](./.github/demo/screen-theme-light.png)

#### Tema escuro

![Screenshot da interface com tema escuro](./.github/demo/screen-theme-dark.png)

## 🚀 Principais Destaques da Solução

### Arquitetura e Design

- **Arquitetura modular**: Serviço de recomendação refatorado com separação de responsabilidades (scoring, selection, validation)
- **Pattern Strategy**: Implementação de estratégias injetáveis para pontuação e seleção de produtos
- **Extensibilidade**: Sistema preparado para adicionar novas estratégias sem modificar código existente
- **Testabilidade**: 50+ testes unitários com cobertura acima de 80%

### Funcionalidades

- **Recomendação inteligente**: Sistema de pontuação baseado em preferências e features do usuário
- **Múltiplos modos**: Suporte a SingleProduct e MultipleProducts com tie-breaking apropriado
- **Validação robusta**: Validação de formulário e dados de entrada
- **Estratégias customizáveis**: Sistema de pesos configuráveis para preferências e features

### Experiência do Usuário

- **Interface moderna**: Design responsivo mobile-first com Tailwind CSS 4
- **Tema claro/escuro**: Toggle de tema com persistência no localStorage via Context API
- **Componentes reutilizáveis**: Biblioteca de componentes com Shadcn/ui
- **Acessibilidade**: Componentes seguindo boas práticas de acessibilidade

### Qualidade de Código

- **Clean Code**: Código limpo, legível e bem documentado (princípio: "fácil de entender, não fácil de escrever")
- **SOLID principles**: Aplicação dos princípios SOLID na arquitetura
- **Hooks customizados**: Separação de lógica em hooks reutilizáveis (useForm, useProducts, useRecommendations)
- **Type safety**: Documentação JSDoc para melhor autocompletar e validação

### Performance e Manutenibilidade

- **Performance otimizada**: Uso de memoização e callbacks otimizados
- **Estrutura organizada**: Separação clara entre serviços, componentes, hooks e estratégias
- **Documentação completa**: README

## Requisitos Técnicos

### Familiaridade com Tailwind CSS

O layout da aplicação foi desenvolvido utilizando Tailwind CSS. Familiaridade básica com este framework de CSS utilitário será útil para entender e potencialmente modificar o layout existente.

### Versão do Node.js

Este projeto requer Node.js versão 18.3 ou superior. Se você não tem essa versão instalada, siga as instruções abaixo para instalá-la usando `n` ou `nvm`.

#### Usando `n` (Node Version Manager):

1. Instale `n` globalmente (caso ainda não tenha): npm install -g n

2. Instale e use a versão 18.3 do Node.js: n 18.3

#### Usando `nvm` (Node Version Manager):

1. Instale `nvm` (caso ainda não tenha) seguindo as instruções em: https://github.com/nvm-sh/nvm

2. Instale e use a versão 18.3 do Node.js: nvm install 18.3 & nvm use 18.3

Após instalar a versão correta do Node.js, você pode prosseguir com a instalação das dependências do projeto e iniciar o desenvolvimento.

## Foco do Desenvolvimento

Para completar este teste, você deve concentrar-se principalmente em três arquivos específicos:

1. `App.js`: Neste componente, você encontrará o comentário "Dadas atualizações no formulário, necessário atualizar a lista de recomendações". Implemente a lógica necessária para atualizar a lista de recomendações com base nas entradas do usuário.

2. `Form.js`: Este componente contém o comentário "Defina aqui a lógica para atualizar as recomendações e passar para a lista de recomendações". Desenvolva a lógica para processar as entradas do usuário e gerar as recomendações apropriadas.

3. `recommendation.service.js`: Neste arquivo de serviço, você verá o comentário "Crie aqui a lógica para retornar os produtos recomendados." Implemente a lógica de negócios para determinar quais produtos devem ser recomendados com base nos critérios fornecidos.

## Observações Adicionais

- Sinta-se à vontade para implementar melhorias na cobertura de testes e no layout da aplicação, caso tenha tempo adicional.
- O código existente serve como base para sua implementação. Concentre-se em desenvolver a funcionalidade de recomendação de produtos conforme especificado nos requisitos do projeto e nos arquivos mencionados acima.

## Como Executar

1. Clone o repositório: `git clone <URL_DO_REPOSITORIO>`
2. Instale as dependências: `yarn install`
3. Para instalar o projeto, execute o script `./install.sh`
4. Inicie a aplicação: `yarn start`

### Scripts Disponíveis

- `start`: Inicia a aplicação React em modo de desenvolvimento.
- `start:frontend`: Inicia apenas a parte frontend da aplicação em modo de desenvolvimento.
- `start:backend`: Inicia apenas a parte backend da aplicação em modo de desenvolvimento.
- `dev`: Inicia simultaneamente a parte frontend e backend da aplicação em modo de desenvolvimento.

## Requisitos

- [x] Implementar a lógica de recomendação de produtos com base nas preferências do usuário.
- [x] Utilizar React.js para o desenvolvimento do front-end.
- [x] Consumir a API fornecida pelo json-server para obter os dados dos produtos.
- [x] Seguir as boas práticas de desenvolvimento e organização de código.
- [ ] Implementar testes unitários para as funcionalidades desenvolvidas.

## Critérios de Aceite

1. [x] O serviço de recomendação de produtos deve ser capaz de receber as preferências e funcionalidades desejadas do usuário através de um formulário.
2. [x] O serviço deve retornar recomendações de produtos com base nas preferências e funcionalidades selecionadas pelo usuário.
3. [x] Se o tipo de recomendação selecionado for "SingleProduct", o serviço deve retornar apenas um produto que corresponda melhor às preferências e funcionalidades do usuário.
4. [x] Se o tipo de recomendação selecionado for "MultipleProducts", o serviço deve retornar uma lista de produtos que correspondam às preferências e funcionalidades do usuário.
5. [x] Em caso de empate na seleção de produtos com base nas preferências e funcionalidades do usuário, o serviço deve retornar o último produto que atende aos critérios de seleção.
6. [x] O serviço deve ser capaz de lidar com diferentes tipos de preferências e funcionalidades selecionadas pelo usuário.
7. [x] O serviço deve ser modular e facilmente extensível para futuras atualizações e adições de funcionalidades.

Certifique-se de que todos os critérios de aceite são atendidos durante o desenvolvimento do projeto.

## Critérios extras propostos - Projeto

- [x] Corrige alguns pacotes que estavam faltando nas dependências como `concurrency` e `axios`
- [x] Adicionar estratégias extras para construir recomendações. Ex: Sistema de peso diferentes para funcionalidades e preferências
- [x] Adicionar seleções extras para construir recomendações. Ex: Pegar apenas `N` recomendações
- [x] Adicionar validação para o formulário
- [x] Aumentar a cobertura de testes do projeto para pelo menos 80%
- [x] Analisar e garantir uma boa performance da solução
- [x] Criar um client do AXIOS para centralizar a configuração de requests com variáveis de ambiente
- [x] Melhorar estrutura de pastas e organização

## Critérios extras propostos - UI/UX

- [x] Melhorias de layout e tela no geral
- [x] Mobile first com tailwind
- [x] Migrar para tailwind 4
- [x] Instalar shadcn para componentes
- [x] Aplicar RD Station fontes (DM Sans e RedHatDisplay)
- [x] Criar um switch para escolha de tema, usando contextAPI para distribuir o estado que deve ser mantido no local storage

## Autor

Desenvolvido por Larissa Rabelo

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
