## Revisão do PR: Implementação inicial do backend e estrutura do projeto

### Crítico (deve corrigir antes do merge)
- Nenhuma alteração crítica encontrada. O código do backend utiliza queries parametrizadas, prevenindo injeção SQL.

### Aviso (deve corrigir)
- **backend/index.js:35** — As mensagens de erro do banco de dados (`err.message`) estão sendo expostas diretamente para o cliente em várias rotas. Isso pode revelar detalhes internos da implementação ou da infraestrutura, o que é uma preocupação de segurança (Information Disclosure), mesmo para um aplicativo local. → **Correção concreta:** Capture `err.message` para logs internos e retorne uma mensagem de erro genérica e amigável ao usuário (ex: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.") para o cliente.
- **backend/index.js:128** — O backend e o frontend estão configurados para rodar em portas diferentes (3001 e 3000, respectivamente, conforme `README.md`). Sem uma configuração de CORS (Cross-Origin Resource Sharing), o frontend não conseguirá fazer requisições para o backend, impedindo o funcionamento da aplicação em desenvolvimento. → **Correção concreta:** Adicione um middleware de CORS ao Express no `backend/index.js` para permitir requisições do frontend. Exemplo: `const cors = require('cors'); app.use(cors());` (após `app.use(express.json());`).

### Sugestão (considerar)
- **backend/index.js:32** — Todas as rotas e a lógica de banco de dados estão centralizadas no arquivo `index.js`. Para um projeto pequeno, isso pode ser aceitável, mas para facilitar a manutenção e escalabilidade futura, é uma boa prática separar as rotas, controladores e a lógica de acesso a dados (repositório/serviço) em módulos distintos. → **Melhoria opcional:** Refatore o código para usar uma estrutura de pastas como `routes/`, `controllers/`, `services/` ou `models/` para organizar a lógica.
- **backend/index.js:33** — A consulta `SELECT * FROM tasks` retorna todas as colunas da tabela. Embora para esta aplicação simples não seja um problema, em projetos maiores, é uma boa prática selecionar explicitamente apenas as colunas necessárias para otimizar a performance e evitar o transporte de dados desnecessários. → **Melhoria opcional:** Altere `SELECT *` para `SELECT id, description, completed, createdAt, updatedAt` para listar explicitamente as colunas.
- **backend/index.js:35** — O tratamento de erros (`if (err) { res.status(500).json({ error: err.message }); return; }`) é repetido em cada rota. Isso pode ser refatorado para um middleware de tratamento de erros global no Express, tornando o código mais limpo e consistente. → **Melhoria opcional:** Implemente um middleware de tratamento de erros no Express para centralizar a lógica de resposta a erros, capturando exceções e enviando respostas padronizadas.

### Segurança
- **Information Disclosure** — **backend/index.js:35** — Exposição de mensagens de erro detalhadas do banco de dados ao cliente. → **Correção:** Logar o erro detalhado no servidor e retornar uma mensagem genérica de erro ao cliente.

### Resumo
- Total de problemas: 0 Críticos, 2 Avisos, 3 Sugestões
- Recomendação: SOLICITAR MUDANÇAS
