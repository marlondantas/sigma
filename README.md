# Sigma

Sistema de controle de estoque para madeireiras com monitoramento de conformidade DOF (Documento de Origem Florestal).

> Projeto acadêmico — UNIVESP

---

## O problema

Madeireiras que trabalham com madeiras de lei são obrigadas a rastrear o volume de estoque via **DOF**, documento emitido e controlado pelo IBAMA. Na prática, esse controle ainda é feito manualmente em planilha Excel, o que gera:

- Lançamentos duplicados (planilha interna + sistema IBAMA)
- Dependência de uma única pessoa para manter o controle
- Risco de inconsistência entre estoque físico e DOF
- Baixa rastreabilidade das movimentações

O Sigma centraliza esse controle e alerta quando o estoque físico ultrapassa a **tolerância legal de 10%** em relação ao volume registrado no DOF — evitando fiscalizações, multas e processos.

---

## Funcionalidades (MVP)

- Cadastro de espécies e tipos de madeira
- Controle de estoque em m³
- Registro de entradas com número do DOF
- Registro de saídas (pedidos atendidos)
- Desmembramento de peças (ex: 1 viga → 3 caibros, volume preservado)
- Monitoramento de divergência DOF com alerta ao ultrapassar 10%
- Dashboard com visão geral do estoque
- Exportação de relatório em Excel
- Acesso multi-usuário

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js |
| Backend | NestJS |
| Banco de dados | MySQL 8.4 |
| Monorepo | pnpm workspaces |
| Deploy | Docker Compose |

---

## Como rodar

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado
- [Node.js](https://nodejs.org/) >= 20 e [pnpm](https://pnpm.io/) >= 9 (para desenvolvimento local)

### Com Docker (recomendado)

```bash
# Clonar o repositório
git clone <url-do-repo>
cd sigma

# Subir todos os serviços
docker compose up -d
```

Acesse:
- Frontend: http://localhost:3000
- API: http://localhost:3001

### Variáveis de ambiente

Os defaults já estão configurados no `docker-compose.yml`. Para sobrescrever, crie um `.env` na raiz:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=sigma
MYSQL_USER=sigma
MYSQL_PASSWORD=sigma

NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Desenvolvimento local

```bash
# Instalar dependências
pnpm install

# Rodar frontend e backend em paralelo
pnpm dev

# Ou separadamente
pnpm dev:web   # Next.js em :3000
pnpm dev:api   # NestJS em :3001
```

### Comandos Docker úteis

```bash
docker compose up -d --build   # rebuildar imagens
docker compose logs -f         # ver logs em tempo real
docker compose down            # derrubar (mantém dados)
docker compose down -v         # derrubar e apagar banco
```

---

## Regra de negócio: Tolerância DOF

O IBAMA exige que o estoque físico de madeira não difira mais de **10%** do volume registrado no DOF.

```
Volume DOF Corrigido = Total DOF × 1,10   (limite superior)
Diferença de Saldo   = Total Cubagem − Total DOF
```

Se a diferença ultrapassar 10%, a empresa está sujeita a fiscalização ambiental, multas e processos legais. O sistema exibe alertas visuais antes que esse limite seja atingido.

---

## Estrutura do projeto

```
sigma/
├── apps/
│   ├── web/          # Next.js (frontend)
│   └── api/          # NestJS (backend)
├── docs/             # Documentação do projeto
├── docker-compose.yml
└── package.json
```

---

## Licença

Projeto acadêmico — uso educacional.
