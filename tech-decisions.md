# Decisões Técnicas: Teste GitHub Live

## Database
- **Banco principal:** SQLite — Para persistência local de dados, adequado para volume baixíssimo e uso pessoal/single-user.
- **Cache:** N/A
- **Busca:** N/A
- **Migrations:** N/A (não serão usadas migrations formais)

## Backend
- **Linguagem/Framework:** Node.js/Express — Escolha para simplicidade e agilidade no desenvolvimento de um backend leve.
- **API:** REST
- **Autenticação:** N/A (sem autenticação formal para este MVP)
- **Processamento assíncrono:** N/A
- **Arquitetura:** Monolito — Adequado para a simplicidade e escopo do projeto.

## Frontend
- **Plataforma:** Web
- **Framework:** React — Escolha para desenvolvimento de interface web moderna e reativa.
- **Renderização:** SPA (Single Page Application)

## Infra e Deploy
- **Cloud/Hosting:** Local (execução pelo usuário) — O aplicativo será executado localmente pelo usuário, sem necessidade de hospedagem em nuvem.
- **CI/CD:** N/A
- **Ambientes:** N/A (execução local não requer ambientes separados)
- **Monitoramento:** N/A

## Segurança e Compliance
- **Requisitos:** Privacidade dos dados pessoais do usuário (garantida pela persistência local e acesso exclusivo do usuário).

## Restrições e Premissas Técnicas
- O projeto é gratuito e não terá monetização.
- O foco principal é a simplicidade e servir como um teste de integração com o GitHub.
- A persistência dos dados será local e simples, sem requisitos de escalabilidade ou alta disponibilidade.
- Não haverá autenticação formal ou gerenciamento de usuários além do contexto local.
- Não há requisitos para PWA, offline-first ou acesso em baixa conectividade.
- Não há design system ou biblioteca de componentes pré-definida.