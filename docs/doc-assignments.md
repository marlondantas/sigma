# Distribuição de Documentação — Sigma

> Cada membro é responsável por criar e manter os tópicos listados abaixo.
> Marlon e Bruna fazem o código — os demais documentam as decisões, regras e fluxos.

---

## Membros

| RA | Nome | Área |
|---|---|---|
| 24215920 | Marlon Dantas de Albuquerque | Código (backend + infra) |
| 24227667 | Bruna Suelen Ribeiro de Brito | Código (backend + frontend) |
| 2228373 | Brunno Marciano de Oliveira Silva | Autenticação & Segurança |
| 24210161 | Bruno de Oliveira Lopes | Endpoints da API |
| 24202758 | Paulo Alberto Bicudo de Souza | Regras de Negócio & Domínio |
| 24218136 | Marcella Sara Santos Silva | Interface & Fluxos de Tela |

---

## Brunno Marciano — Autenticação & Segurança

**Arquivo:** `docs/auth-decisions.md`

- Por que JWT em vez de sessão no servidor
- Estratégia de dois tokens: access token (15 min) vs refresh token (7 dias)
  - Por que 15 min para o access token
  - Por que 7 dias para o refresh token
- Onde os tokens são armazenados: cookies httpOnly (não localStorage) — por quê
- Configuração de `sameSite: lax` e `secure: false` (dev) — o que muda em produção
- Fluxo de reset de senha por e-mail (Resend)
  - Como o token de reset é gerado (crypto)
  - Tempo de validade do token de reset
  - Por que o e-mail é enviado pela API e não pelo frontend
- CORS: o que é `ALLOWED_ORIGIN` e por que precisa estar configurado
- O que o `JwtAuthGuard` protege (quais rotas exigem autenticação)
- O que acontece quando o access token expira (fluxo de refresh)

---

## Bruno de Oliveira Lopes — Endpoints da API

**Arquivo:** `docs/api-endpoints.md`

### Auth (`/auth`)

- `POST /auth/login` — body, resposta, cookies gerados
- `POST /auth/logout` — o que limpa, resposta
- `POST /auth/refresh` — body, resposta com novo access token
- `POST /auth/forgot-password` — body (email), o que dispara
- `POST /auth/reset-password` — body (token + newPassword), resposta

### Usuários (`/users`) — requer JWT

- `GET /users` — lista todos os usuários
- `GET /users/:id` — detalhe de um usuário
- `POST /users` — body (name, email, password, profileId?, active?)
- `PUT /users/:id` — body (name?, email?, profileId?, active?)
- `PUT /users/:id/reset-password` — body (newPassword) — reset pelo admin
- `DELETE /users/:id` — remove usuário

### Perfis (`/profiles`) — requer JWT

- `GET /profiles`
- `GET /profiles/:id`
- `POST /profiles` — body (name)
- `PUT /profiles/:id` — body (name)
- `DELETE /profiles/:id`

### Produtos — Madeiras (`/products`) — requer JWT

- `GET /products`
- `GET /products/:id`
- `POST /products` — body (wood_type, scientific_name?, common_name?, height_cm, width_cm, length_m, active?)
- `PUT /products/:id` — body parcial (qualquer campo acima)
- `DELETE /products/:id`

### Dashboard (`/dashboard`) — requer JWT

- `GET /dashboard` — o que retorna atualmente (stub)

> Para cada endpoint: documentar método, URL, se requer JWT, body esperado, resposta de sucesso e erros possíveis.

---

## Paulo Alberto Bicudo de Souza — Regras de Negócio & Domínio

**Arquivo:** `docs/business-rules.md`

### DOF (Documento de Origem Florestal)

- O que é o DOF e por que é obrigatório (IBAMA)
- A regra dos 10%: `Σ estoque físico (m³) ≤ Total DOF × 1,10`
- Como a divergência é calculada
- Consequências de ultrapassar o limite (multa, fiscalização)
- Por que o DOF é registrado manualmente em paralelo no sistema do IBAMA

### Produto (Madeira/SKU)

- Por que espécie e dimensões estão na mesma tabela (`products`) — decisão de simplicidade para o MVP
- Como `unit_volume_m3` é calculado: `height_cm × width_cm × length_m / 10.000`
- O que `active` significa (soft delete)
- Diferença entre `scientific_name` (ex: *Dipteryx odorata*) e `common_name` (ex: Cumaru)

### Usuários e Perfis

- Por que `Profile` é uma tabela dinâmica e não um enum fixo
- Responsabilidade dos perfis esperados: `administrador` e `vendedor`
- O que cada perfil pode fazer (referência: `docs/users.md`)

### Escopo do MVP

- O que está dentro e fora do escopo (referência: `docs/overview.md`)
- Justificativa para as exclusões (vendas, NF, integração IBAMA)

### Entidades Planejadas (documentar a intenção de design)

- `Lote` — entrada de estoque vinculada a um DOF
- `LoteItem` — itens dentro de um lote
- `Movimentacao` — saídas e ajustes
- `Desmembramento` — transformação de peças (regra: volume m³ deve ser preservado)
- `Fornecedor` — quem vende a madeira para a empresa

---

## Marcella Sara Santos Silva — Interface & Fluxos de Tela

**Arquivo:** `docs/ui-flows.md`

### Telas implementadas

- `/` (login) — campos, validação, o que acontece após login
- `/forgotPass` — fluxo de recuperação de senha
- `/reset-password` — o que o usuário faz com o token recebido por e-mail
- `/dashboard` — o que exibe atualmente
- `/administracao/usuarios` — tabela de usuários, ações disponíveis (criar, editar, deletar, resetar senha)
- `/administracao/perfis` — tabela de perfis, ações disponíveis
- `/madeiras/cadastro` — formulário de cadastro de produto (madeira)
- `/unauthorized` — quando aparece, o que informa ao usuário
- `/not-found` (404) — quando aparece

### Navegação

- Estrutura da sidebar: quais itens aparecem, em que ordem
- Como o menu muda conforme o perfil do usuário (se aplicável)
- Fluxo de logout

### Para cada tela documentar

1. Propósito — o que o usuário faz nessa tela
2. Campos / elementos visíveis
3. Ações disponíveis (botões, links)
4. Redirecionamentos (o que acontece após cada ação)
5. Estados de erro visíveis ao usuário
