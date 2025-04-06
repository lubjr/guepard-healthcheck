<h1>Guepard Health Check</h1>

<h3>👻 Descrição</h3>

Esse modulo do Guepard é uma API que fornece dados atuais de um endpoint cadastrado, a ideia é poder visualizar o status de conexão e dados a mais sobre ele.
(Em inicio de projeto)

<h3>🪡 Endpoints</h3>

- `/targets/create`
- `/targets/list`
- `/targets/:id/status`
- `/targets/:id/history`
- `/targets/:id/uptime`

<h3>🧻 Visualização</h3>

![Preview](https://github.com/user-attachments/assets/c5a2bd75-c571-4864-96b4-c02ae498ad2d)

<h3>🚶‍♂️ Andamento</h3>

Próximos passos:

- Melhorar o controle e a gestão dos jobs
- Autenticação JWT
- Implementar testes automatizados
- Adicionar alertas e notificações
- Documentar a API
- Git hub actions para deploy

---

## ✅ Checklist de Implementações

### 📦 Estrutura inicial

- [x] Projeto iniciado com `pnpm` e TypeScript
- [x] Organização em módulos com `src/` (routes, services, jobs, etc.)

---

### 🌐 API de Monitoramento de Uptime

- [x] Rota para cadastrar URLs a serem monitoradas (`POST /targets`)
- [x] Monitoramento periódico com `node-cron`
- [x] Registro de histórico de status de cada URL
- [x] Limite de 10 logs por target (últimos 10 registros)

---

### 📊 Histórico e Status

- [x] Rota para listar histórico de um target (`GET /targets/:id/history`)
- [x] Rota para verificar status atual (`GET /status`)
- [x] Rota para ver uptime (`GET /uptime`)
- [x] Todas as rotas usam os dados persistidos no banco de dados

---

### 🛢️ Banco de Dados

- [x] Banco de dados PostgreSQL na AWS (acesso público)
- [x] Prisma como ORM com schema versionado
- [x] Persistência de targets e histórico de monitoramento
- [x] Função de boot para reiniciar monitoramento após restart

---

### 💅 Padrão de Código

- [x] ESLint configurado com regras padrão
- [x] Prettier configurado com integração ao ESLint
- [x] Scripts `lint` e `format` no `package.json`

---

### 🚀 CI com GitHub Actions

- [x] Workflow `CI` com:
  - [x] Checkout de código
  - [x] Instalação de dependências com `pnpm`
  - [x] Lint (`pnpm lint`)
  - [x] Prettier check (`pnpm format --check`)
- [x] Execução em branches `main` e `develop`
- [x] Status check obrigatório no merge para `main`

---

### 🔐 Proteção da branch `main`

- [x] Push direto bloqueado
- [x] Pull Requests obrigatórios
- [x] Status checks obrigatórios
- [x] Sincronização com `main` exigida antes do merge
- [x] Force push desabilitado
- [x] Branches excluídas automaticamente após merge

---

### 🌿 Fluxo de trabalho com Git

- [x] Padrão de nomes de branchs adotado:
  - `feat/nome-da-feature`
  - `fix/correcoes`
  - `refactor/reorganizacao`, etc.

---

## ✨ Próximos Passos Sugeridos

- [ ] Adicionar autenticação (JWT ou API Key)
- [ ] Adicionar testes automatizados (unitários e integração)
- [ ] Criar painel web para visualização dos targets
- [ ] Deploy automático (Vercel, Railway, ou VPS)
