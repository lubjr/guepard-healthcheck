<h2>Guepard Health Check</h2>

### 👻 Descrição

Esse módulo do Guepard é uma API que fornece dados atuais de um endpoint cadastrado, permitindo visualizar o status de conexão e dados adicionais sobre ele.  
Inclui agora uma rota `/health` para monitoramento da saúde da API, que indica se o banco de dados está disponível ou se o sistema está rodando em modo degradado.

---

### 🪡 Endpoints

- `/targets/create`
- `/targets/list`
- `/targets/:id/status`
- `/targets/:id/history`
- `/targets/:id/uptime`
- `/health`

---

### 🛡️ Rate Limiting

A API aplica um middleware de limite de requisições (rate limiting) em rotas críticas (como `/targets`) para evitar abusos e garantir estabilidade.
Atualmente, cada IP pode realizar até **100 requisições a cada 15 minutos**.

---

### 🧻 Visualização

![Preview](https://github.com/user-attachments/assets/c5a2bd75-c571-4864-96b4-c02ae498ad2d)

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
- [x] Rota `/health` para checagem do status da API e do banco (retorna `ok` ou `degraded`)

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
- [x] Modo degradado da API implementado quando banco está indisponível (bloqueio parcial de rotas)

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

### ⚙️ Middleware de Tratamento de Erros

- [x] Middleware centralizado para capturar erros não tratados nas rotas
- [x] Retorna respostas padronizadas com status e mensagens claras para o cliente
- [x] Evita crashes da aplicação e previne múltiplos envios de resposta (`Cannot set headers after they are sent`)
- [x] Loga erros no servidor para facilitar debug

---

## ✨ Próximos Passos Sugeridos

- [ ] Documentar a API
- [ ] Adicionar alertas e notificações
- [ ] Melhorar o controle e a gestão dos jobs
- [ ] Adicionar autenticação (JWT ou API Key)
- [ ] Adicionar testes automatizados (unitários e integração)
- [ ] Criar painel web para visualização dos targets
- [ ] Deploy automático (Vercel, Railway, ou VPS)
