# SPEC: Teste GitHub Live

## 1. Visão Técnica
O sistema "Teste GitHub Live" é um aplicativo web monolítico de lista de tarefas (to-do list) para uso pessoal. Ele consiste em um frontend React que interage com um backend Node.js/Express, utilizando SQLite para persistência local dos dados das tarefas. A arquitetura foca na simplicidade e na execução local para gerenciar tarefas diárias.

## 2. Stack e Decisões Técnicas
| Camada | Tecnologia | Justificativa |
|---|---|---|
| Frontend | React | Desenvolvimento de interface web moderna e reativa. |
| Backend | Node.js/Express | Simplicidade e agilidade no desenvolvimento de um backend leve. |
| Banco de Dados | SQLite | Persistência local de dados, adequado para volume baixíssimo e uso pessoal/single-user. |
| Infraestrutura | Local (execução pelo usuário) | O aplicativo será executado localmente pelo usuário, sem necessidade de hospedagem em nuvem. |
| Arquitetura | Monolito | Adequado para a simplicidade e escopo do projeto. |
| API | REST | Padrão para comunicação entre frontend e backend. |

## 3. Arquitetura de Componentes
- **Frontend (React Application):**
  - **Responsabilidades:** Renderizar a interface do usuário, capturar interações do usuário, exibir a lista de tarefas, enviar requisições para o backend e atualizar a UI com as respostas.
  - **Componentes Principais:** `TaskList` (exibe as tarefas), `TaskItem` (representa uma única tarefa), `TaskForm` (para adicionar/editar tarefas).
- **Backend (Node.js/Express API):**
  - **Responsabilidades:** Expor endpoints REST para gerenciamento de tarefas, processar requisições do frontend, interagir com o banco de dados para persistir/recuperar/atualizar/excluir tarefas.
  - **Módulos Principais:** `routes` (define os endpoints), `controllers` (lógica de negócio), `services/repository` (interação com o banco de dados).
- **Banco de Dados (SQLite):**
  - **Responsabilidades:** Armazenar os dados das tarefas de forma local e persistente.

## 4. Modelo de Dados
**Entidade Principal: Tarefa (Task)**

| Atributo | Tipo de Dado | Descrição | Restrições |
|---|---|---|---|
| `id` | INTEGER | Identificador único da tarefa. | PK, Auto-incremento |
| `description` | TEXT | Conteúdo/descrição da tarefa. | NOT NULL |
| `completed` | BOOLEAN | Indica se a tarefa está concluída (true) ou não (false). | Default: false |
| `createdAt` | DATETIME | Data e hora de criação da tarefa. | NOT NULL, Default: CURRENT_TIMESTAMP |
| `updatedAt` | DATETIME | Data e hora da última atualização da tarefa. | NOT NULL, Default: CURRENT_TIMESTAMP |

## 5. Contratos de API / Interface
**Base URL:** `/api/tasks`

### 5.1. Listar Todas as Tarefas
- **Endpoint:** `GET /api/tasks`
- **Descrição:** Retorna todas as tarefas existentes.
- **Resposta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "description": "Comprar pão",
      "completed": false,
      "createdAt": "2023-10-27T10:00:00Z",
      "updatedAt": "2023-10-27T10:00:00Z"
    },
    {
      "id": 2,
      "description": "Estudar React",
      "completed": true,
      "createdAt": "2023-10-26T15:30:00Z",
      "updatedAt": "2023-10-27T09:00:00Z"
    }
  ]
  ```

### 5.2. Criar Nova Tarefa
- **Endpoint:** `POST /api/tasks`
- **Descrição:** Adiciona uma nova tarefa à lista.
- **Payload de Entrada:**
  ```json
  {
    "description": "Texto da nova tarefa"
  }
  ```
- **Resposta (201 Created):**
  ```json
  {
    "id": 3,
    "description": "Texto da nova tarefa",
    "completed": false,
    "createdAt": "2023-10-27T11:00:00Z",
    "updatedAt": "2023-10-27T11:00:00Z"
  }
  ```

### 5.3. Atualizar Tarefa Existente
- **Endpoint:** `PUT /api/tasks/{id}`
- **Descrição:** Modifica o texto ou o status de uma tarefa existente.
- **Payload de Entrada:**
  ```json
  {
    "description": "Novo texto da tarefa (opcional)",
    "completed": true (opcional)
  }
  ```
- **Resposta (200 OK):**
  ```json
  {
    "id": 1,
    "description": "Comprar leite",
    "completed": true,
    "createdAt": "2023-10-27T10:00:00Z",
    "updatedAt": "2023-10-27T11:30:00Z"
  }
  ```
- **Resposta (404 Not Found):** Se a tarefa não existir.

### 5.4. Excluir Tarefa
- **Endpoint:** `DELETE /api/tasks/{id}`
- **Descrição:** Remove uma tarefa da lista.
- **Resposta (204 No Content):** Sucesso na exclusão.
- **Resposta (404 Not Found):** Se a tarefa não existir.

## 6. Fluxos Técnicos

### 6.1. Visualizar Tarefas
1.  **Frontend:** Componente `TaskList` monta e faz uma requisição `GET /api/tasks` ao backend.
2.  **Backend:** Recebe a requisição, consulta o banco de dados SQLite para todas as tarefas.
3.  **Backend:** Retorna a lista de tarefas como JSON.
4.  **Frontend:** Recebe a resposta, atualiza o estado do `TaskList` e renderiza as tarefas na UI.

### 6.2. Adicionar Tarefa
1.  **Frontend:** Usuário digita a descrição e clica em "Adicionar". Componente `TaskForm` envia uma requisição `POST /api/tasks` com o `description` para o backend.
2.  **Backend:** Recebe a requisição, valida o `description` (não vazio).
3.  **Backend:** Insere a nova tarefa no banco de dados SQLite, com `completed` como `false` e `createdAt`/`updatedAt` preenchidos.
4.  **Backend:** Retorna a tarefa recém-criada (incluindo `id`) com status 201 Created.
5.  **Frontend:** Recebe a resposta, adiciona a nova tarefa ao estado da lista e atualiza a UI.

### 6.3. Editar Tarefa
1.  **Frontend:** Usuário seleciona uma tarefa, modifica o texto ou clica no checkbox para alterar o status. Componente `TaskItem` (ou `TaskForm`) envia uma requisição `PUT /api/tasks/{id}` com os campos a serem atualizados (`description`, `completed`) para o backend.
2.  **Backend:** Recebe a requisição, extrai o `id` e os dados de atualização.
3.  **Backend:** Atualiza a tarefa correspondente no banco de dados SQLite, incluindo a atualização do campo `updatedAt`.
4.  **Backend:** Retorna a tarefa atualizada com status 200 OK. Se a tarefa não for encontrada, retorna 404 Not Found.
5.  **Frontend:** Recebe a resposta, atualiza a tarefa no estado da lista e renderiza a UI.

### 6.4. Excluir Tarefa
1.  **Frontend:** Usuário clica no botão "Excluir" de uma tarefa. Componente `TaskItem` envia uma requisição `DELETE /api/tasks/{id}` para o backend.
2.  **Backend:** Recebe a requisição, extrai o `id`.
3.  **Backend:** Remove a tarefa do banco de dados SQLite.
4.  **Backend:** Retorna status 204 No Content. Se a tarefa não for encontrada, retorna 404 Not Found.
5.  **Frontend:** Recebe a resposta, remove a tarefa do estado da lista e atualiza a UI.

## 7. Requisitos Não Funcionais Técnicos
| Requisito | Critério de Aceite | Como Verificar |
|---|---|---|
| **RNF01 (Custo)**: O aplicativo deve ser gratuito para o usuário final. | Não deve haver código ou configuração para monetização ou cobrança. | Revisão de código e configuração do projeto. |
| **RNF02 (Usabilidade)**: A interface do usuário deve ser simples e intuitiva. | As ações de CRUD de tarefas devem ser realizadas com no máximo 2 cliques/interações. | Testes de usabilidade e revisão de design da UI. |
| **RNF03 (Performance)**: O aplicativo deve ter desempenho adequado para uso pessoal. | Tempo de resposta para operações de CRUD (adicionar, editar, marcar, excluir) deve ser inferior a 500ms. | Testes de carga local com 100 tarefas simuladas. |
| **RNF04 (Segurança)**: O aplicativo deve garantir a privacidade dos dados pessoais do usuário. | Os dados das tarefas devem ser armazenados apenas localmente no dispositivo do usuário e não devem ser transmitidos para serviços externos. | Análise de tráfego de rede e revisão de código para chamadas externas. |

## 8. Critérios de Aceite por Feature
| Feature | Critério Técnico | Testável? |
|---|---|---|
| **Adicionar Tarefa** | O endpoint `POST /api/tasks` deve criar um novo registro no banco de dados com `description` fornecida e `completed=false`. | Sim |
| **Editar Tarefa** | O endpoint `PUT /api/tasks/{id}` deve atualizar o `description` e/ou `completed` de uma tarefa existente no banco de dados. | Sim |
| **Marcar/Desmarcar Tarefa** | O endpoint `PUT /api/tasks/{id}` deve permitir a alteração do campo `completed` para `true` ou `false`. | Sim |
| **Excluir Tarefa** | O endpoint `DELETE /api/tasks/{id}` deve remover o registro da tarefa do banco de dados. | Sim |
| **Visualizar Lista de Tarefas** | O endpoint `GET /api/tasks` deve retornar todas as tarefas armazenadas no banco de dados. | Sim |
| **Atualização Visual da Lista** | Após qualquer operação de CRUD, o frontend deve fazer uma nova requisição `GET /api/tasks` ou atualizar seu estado local para refletir a mudança na UI. | Sim |

## 9. Riscos e Dependências Técnicas
| Risco | Impacto | Mitigação |
|---|---|---|
| **Persistência de Dados** | Perda de dados se o arquivo SQLite for corrompido ou excluído acidentalmente pelo usuário. | Informar o usuário sobre a natureza local da persistência e a ausência de backup automático. |
| **Compatibilidade de Ambiente** | Problemas de execução do Node.js/React/SQLite em diferentes sistemas operacionais ou versões. | Fornecer instruções claras de instalação e requisitos de ambiente. |
| **Segurança Local** | Embora os dados sejam locais, vulnerabilidades no sistema operacional do usuário podem expor o arquivo SQLite. | Não há mitigação direta pelo aplicativo, dependendo da segurança do OS do usuário. |

## Encerramento
