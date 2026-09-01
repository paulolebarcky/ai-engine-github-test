# Plano de Sprints Aprovado: Teste GitHub Live

## Resumo
- Total de sprints: 5
- Esforço estimado: Xh

## Sprints

### Sprint 1: Setup de Ambiente e Infraestrutura
**Objetivo:** Ter o ambiente de desenvolvimento configurado e a base de dados pronta para o backend.
**Esforço estimado:** Xh

**Tarefas:**
- Configuração inicial do projeto Node.js/Express.
- Configuração inicial do projeto React.
- Criação do banco de dados SQLite e da tabela `tasks` com o schema definido.

**Critérios de Aceite:**
- [ ] O servidor Node.js/Express inicia sem erros na porta padrão.
- [ ] O aplicativo React é compilado e executado no navegador, exibindo uma tela inicial vazia.
- [ ] A tabela `tasks` é criada no banco de dados SQLite com as colunas `id`, `description`, `completed`, `createdAt`, `updatedAt` e suas respectivas restrições (PK, NOT NULL, DEFAULT).

### Sprint 2: Backend - Gerenciamento de Tarefas (API CRUD)
**Objetivo:** O backend deve expor uma API REST completa para gerenciar tarefas.
**Esforço estimado:** Xh

**Tarefas:**
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

### Sprint 3: Frontend - Visualização e Adição de Tarefas
**Objetivo:** O frontend deve exibir a lista de tarefas e permitir que o usuário adicione novas tarefas.
**Esforço estimado:** Xh

**Tarefas:**
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

### Sprint 4: Frontend - Edição e Exclusão de Tarefas
**Objetivo:** O frontend deve permitir que o usuário edite a descrição, marque/desmarque e exclua tarefas existentes.
**Esforço estimado:** Xh

**Tarefas:**
- Adicionar funcionalidade de marcar/desmarcar tarefa como concluída no `TaskItem`.
- Adicionar funcionalidade de editar a descrição de uma tarefa no `TaskItem`.
- Adicionar funcionalidade de excluir uma tarefa no `TaskItem`.
- Garantir que a lista de tarefas seja visualmente atualizada após cada operação de edição ou exclusão.

**Critérios de Aceite:**
- [ ] Ao clicar em um checkbox ou similar no `TaskItem`, o status `completed` da tarefa é alterado via `PUT /api/tasks/{id}` e a UI é atualizada.
- [ ] O usuário consegue iniciar a edição da descrição de uma tarefa, modificar o texto e salvar a alteração via `PUT /api/tasks/{id}`, com a UI sendo atualizada.
- [ ] Ao clicar em um botão de "Excluir" no `TaskItem`, a tarefa é removida via `DELETE /api/tasks/{id}` e desaparece da lista na UI.
- [ ] A atualização visual da lista é fluida e não exige recarga manual da página.

### Sprint 5: Tratamento de Erros e Validações no Frontend
**Objetivo:** Melhorar a experiência do usuário com validações de entrada e tratamento de erros do backend no frontend.
**Esforço estimado:** Xh

**Tarefas:**
- Implementar validação no frontend para `description` vazia na criação/edição de tarefas.
- Implementar tratamento de erro para `404 Not Found` do backend (tarefa inexistente).
- Implementar tratamento genérico para `500 Internal Server Error` e outros erros inesperados do backend.

**Critérios de Aceite:**
- [ ] Ao tentar adicionar ou editar uma tarefa com a descrição vazia, o campo de entrada exibe uma borda vermelha, uma mensagem de erro abaixo e o botão de salvar/adicionar é desabilitado.
- [ ] Se o backend retornar `404 Not Found` ao tentar editar ou excluir uma tarefa, o frontend exibe uma mensagem clara ao usuário, como "A tarefa não existe mais".
- [ ] Para qualquer outro erro inesperado do backend (ex: 500), o frontend exibe uma mensagem genérica de erro ao usuário (ex: "Algo deu errado, tente novamente") usando um componente de feedback (toast/banner).

## JSON de Execução

```json
[
  {
    "number": 1,
    "title": "Setup de Ambiente e Infraestrutura",
    "description": "O objetivo é ter o ambiente de desenvolvimento configurado e a base de dados pronta para o backend. As tarefas incluem a configuração inicial do projeto Node.js/Express, a configuração inicial do projeto React e a criação do banco de dados SQLite e da tabela `tasks` com o schema definido."
  },
  {
    "number": 2,
    "title": "Backend - Gerenciamento de Tarefas (API CRUD)",
    "description": "O objetivo é que o backend exponha uma API REST completa para gerenciar tarefas. As tarefas incluem a implementação do endpoint `GET /api/tasks` para listar todas as tarefas, `POST /api/tasks` para criar uma nova tarefa, `PUT /api/tasks/{id}` para atualizar uma tarefa existente e `DELETE /api/tasks/{id}` para excluir uma tarefa."
  },
  {
    "number": 3,
    "title": "Frontend - Visualização e Adição de Tarefas",
    "description": "O objetivo é que o frontend exiba a lista de tarefas e permita que o usuário adicione novas tarefas. As tarefas incluem a implementação do componente `TaskList` para exibir a lista de tarefas, `TaskItem` para exibir uma única tarefa, `TaskForm` para entrada de nova tarefa, a integração do `TaskList` com `GET /api/tasks` para carregar tarefas ao iniciar, a integração do `TaskForm` com `POST /api/tasks` para adicionar novas tarefas e a exibição da mensagem \"Nenhuma tarefa ainda. Adicione a primeira!\" quando a lista estiver vazia."
  },
  {
    "number": 4,
    "title": "Frontend - Edição e Exclusão de Tarefas",
    "description": "O objetivo é que o frontend permita que o usuário edite a descrição, marque/desmarque e exclua tarefas existentes. As tarefas incluem adicionar funcionalidade de marcar/desmarcar tarefa como concluída no `TaskItem`, adicionar funcionalidade de editar a descrição de uma tarefa no `TaskItem`, adicionar funcionalidade de excluir uma tarefa no `TaskItem` e garantir que a lista de tarefas seja visualmente atualizada após cada operação de edição ou exclusão."
  },
  {
    "number": 5,
    "title": "Tratamento de Erros e Validações no Frontend",
    "description": "O objetivo é melhorar a experiência do usuário com validações de entrada e tratamento de erros do backend no frontend. As tarefas incluem a implementação de validação no frontend para `description` vazia na criação/edição de tarefas, a implementação de tratamento de erro para `404 Not Found` do backend (tarefa inexistente) e a implementação de tratamento genérico para `500 Internal Server Error` e outros erros inesperados do backend."
  }
]
```
