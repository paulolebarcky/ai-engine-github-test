# Plano de Sprints: Teste GitHub Live

## Visão Geral
- **Total de sprints:** 5
- **Sprints MVP (P0):** 4
- **Sprints Pós-MVP (P1):** 1

## Sprint 1: Setup de Ambiente e Infraestrutura
**Objetivo:** Ter o ambiente de desenvolvimento configurado e a base de dados pronta para o backend.
**Prioridade:** P0
**Depende de:** nenhum

**Features:**
- Configuração inicial do projeto Node.js/Express.
- Configuração inicial do projeto React.
- Criação do banco de dados SQLite e da tabela `tasks` com o schema definido.

**Critérios de Aceite:**
- [ ] O servidor Node.js/Express inicia sem erros na porta padrão.
- [ ] O aplicativo React é compilado e executado no navegador, exibindo uma tela inicial vazia.
- [ ] A tabela `tasks` é criada no banco de dados SQLite com as colunas `id`, `description`, `completed`, `createdAt`, `updatedAt` e suas respectivas restrições (PK, NOT NULL, DEFAULT).

**Contexto para o Coder:**
Este sprint estabelece a base técnica do projeto. A configuração do backend deve incluir a inicialização do Express e a conexão com o SQLite. O frontend deve ser um projeto React básico, pronto para receber os componentes de UI. O foco é garantir que as duas camadas e o banco de dados estejam operacionais para o desenvolvimento das funcionalidades. Cobre as seções 1, 2, 3 (partes de setup) e 4 (schema do DB) da SPEC.

## Sprint 2: Backend - Gerenciamento de Tarefas (API CRUD)
**Objetivo:** O backend deve expor uma API REST completa para gerenciar tarefas.
**Prioridade:** P0
**Depende de:** Sprint 1

**Features:**
- Implementar endpoint `GET /api/tasks` para listar todas as tarefas.
- Implementar endpoint `POST /api/tasks` para criar uma nova tarefa.
- Implementar endpoint `PUT /api/tasks/{id}` para atualizar uma tarefa existente.
- Implementar endpoint `DELETE /api/tasks/{id}` para excluir uma tarefa.

**Critérios de Aceite:**
- [ ] Requisições `GET /api/tasks` retornam um array JSON de tarefas (pode ser vazio).
- [ ] Requisições `POST /api/tasks` com um `description` válido criam uma tarefa no banco de dados e retornam a tarefa criada com status 201 Created.
- [ ] Requisições `PUT /api/tasks/{id}` com um `id` existente e dados válidos atualizam a tarefa no banco de dados e retornam a tarefa atualizada com status 200 OK.
- [ ] Requisições `DELETE /api/tasks/{id}` com um `id` existente removem a tarefa do banco de dados e retornam status 204 No Content.
- [ ] Requisições `PUT /api/tasks/{id}` ou `DELETE /api/tasks/{id}` com um `id` inexistente retornam status 404 Not Found.

**Contexto para o Coder:**
Este sprint foca exclusivamente na lógica de negócio do backend e na interação com o SQLite. Os endpoints devem seguir os contratos de API definidos na seção 5 da SPEC. A lógica de validação de entrada (ex: `description` não vazio para POST) deve ser implementada nos controllers. O campo `updatedAt` deve ser atualizado automaticamente em operações de `PUT`. Cobre as seções 5 (Contratos de API) e 6 (partes de Backend dos Fluxos Técnicos) da SPEC.

## Sprint 3: Frontend - Visualização e Adição de Tarefas
**Objetivo:** O frontend deve exibir a lista de tarefas e permitir que o usuário adicione novas tarefas.
**Prioridade:** P0
**Depende de:** Sprint 2

**Features:**
- Implementar componente `TaskList` para exibir a lista de tarefas.
- Implementar componente `TaskItem` para exibir uma única tarefa.
- Implementar componente `TaskForm` para entrada de nova tarefa.
- Integrar `TaskList` com `GET /api/tasks` para carregar tarefas ao iniciar.
- Integrar `TaskForm` com `POST /api/tasks` para adicionar novas tarefas.
- Exibir mensagem "Nenhuma tarefa ainda. Adicione a primeira!" quando a lista estiver vazia.

**Critérios de Aceite:**
- [ ] Ao carregar a página, o frontend exibe a lista de tarefas obtida do backend.
- [ ] Se não houver tarefas, a mensagem "Nenhuma tarefa ainda. Adicione a primeira!" é exibida centralizada.
- [ ] O usuário consegue digitar uma descrição no `TaskForm` e clicar em um botão para adicionar uma nova tarefa.
- [ ] Após adicionar uma tarefa, a nova tarefa aparece na lista sem a necessidade de recarregar a página.

**Contexto para o Coder:**
Este sprint é o primeiro contato do usuário com a aplicação. O foco é na construção dos componentes React e na integração com os endpoints `GET` e `POST` do backend. A atualização da lista após a adição de uma tarefa pode ser feita refazendo a requisição `GET` ou atualizando o estado local do React. Cobre as seções 3 (Componentes Frontend), 5.1, 5.2 (Uso da API), 6.1, 6.2 (partes Frontend dos Fluxos Técnicos) da SPEC e o enriquecimento "Lista de Tarefas Vazia".

## Sprint 4: Frontend - Edição e Exclusão de Tarefas
**Objetivo:** O frontend deve permitir que o usuário edite a descrição, marque/desmarque e exclua tarefas existentes.
**Prioridade:** P0
**Depende de:** Sprint 2

**Features:**
- Adicionar funcionalidade de marcar/desmarcar tarefa como concluída no `TaskItem`.
- Adicionar funcionalidade de editar a descrição de uma tarefa no `TaskItem`.
- Adicionar funcionalidade de excluir uma tarefa no `TaskItem`.
- Garantir que a lista de tarefas seja visualmente atualizada após cada operação de edição ou exclusão.

**Critérios de Aceite:**
- [ ] Ao clicar em um checkbox ou similar no `TaskItem`, o status `completed` da tarefa é alterado via `PUT /api/tasks/{id}` e a UI é atualizada.
- [ ] O usuário consegue iniciar a edição da descrição de uma tarefa, modificar o texto e salvar a alteração via `PUT /api/tasks/{id}`, com a UI sendo atualizada.
- [ ] Ao clicar em um botão de "Excluir" no `TaskItem`, a tarefa é removida via `DELETE /api/tasks/{id}` e desaparece da lista na UI.
- [ ] A atualização visual da lista é fluida e não exige recarga manual da página.

**Contexto para o Coder:**
Este sprint completa as funcionalidades CRUD no frontend. Os componentes `TaskItem` e `TaskList` precisarão ser aprimorados para lidar com os estados de edição, os eventos de clique para marcar/desmarcar e a chamada aos endpoints `PUT` e `DELETE`. A atualização visual deve ser eficiente, seja por re-fetch da lista ou por manipulação do estado local. Cobre as seções 3 (Componentes Frontend), 5.3, 5.4 (Uso da API), 6.3, 6.4 (partes Frontend dos Fluxos Técnicos) e os Critérios de Aceite por Feature da seção 8 da SPEC.

## Sprint 5: Tratamento de Erros e Validações no Frontend
**Objetivo:** Melhorar a experiência do usuário com validações de entrada e tratamento de erros do backend no frontend.
**Prioridade:** P1
**Depende de:** Sprint 3, Sprint 4

**Features:**
- Implementar validação no frontend para `description` vazia na criação/edição de tarefas.
- Implementar tratamento de erro para `404 Not Found` do backend (tarefa inexistente).
- Implementar tratamento genérico para `500 Internal Server Error` e outros erros inesperados do backend.

**Critérios de Aceite:**
- [ ] Ao tentar adicionar ou editar uma tarefa com a descrição vazia, o campo de entrada exibe uma borda vermelha, uma mensagem de erro abaixo e o botão de salvar/adicionar é desabilitado.
- [ ] Se o backend retornar `404 Not Found` ao tentar editar ou excluir uma tarefa, o frontend exibe uma mensagem clara ao usuário, como "A tarefa não existe mais".
- [ ] Para qualquer outro erro inesperado do backend (ex: 500), o frontend exibe uma mensagem genérica de erro ao usuário (ex: "Algo deu errado, tente novamente") usando um componente de feedback (toast/banner).

**Contexto para o Coder:**
Este sprint foca na resiliência e usabilidade da aplicação. A validação de `description` vazia deve ser implementada no lado do cliente (React) para feedback instantâneo. O tratamento de erros do backend deve ser robusto, interceptando diferentes códigos de status HTTP e apresentando mensagens amigáveis ao usuário. Cobre os "Enriquecimentos da SPEC" (Edge Cases e Tratamento de Erros, Estados de UI - Feedback Visual para Validação de Campo).

## Rastreabilidade
| Sprint | Stories do PRD (Assumidas) | Seções da SPEC |
|--------|----------------------------|----------------|
| Sprint 1 | N/A (Infra) | 1, 2, 3 (setup), 4 |
| Sprint 2 | US01 (parcial), US02, US03 (parcial), US04 (parcial), US05 | 5, 6 (backend) |
| Sprint 3 | US01, US02 | 3 (frontend), 5.1, 5.2, 6.1, 6.2, Enriquecimentos (Lista Vazia) |
| Sprint 4 | US03, US04, US05 | 3 (frontend), 5.3, 5.4, 6.3, 6.4, 8 |
| Sprint 5 | US06, US07 | Enriquecimentos (Edge Cases, Estados de UI) |
