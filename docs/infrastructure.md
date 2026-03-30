# Infrastructure

Deploy via Docker Compose com três serviços.

---

## Serviços

| Serviço | Imagem / Build | Porta | Descrição |
|---------|---------------|-------|-----------|
| `mysql` | `mysql:8.4` | `3306` | Banco de dados relacional |
| `api` | `apps/api/Dockerfile` | `3001` | Backend NestJS |
| `web` | `apps/web/Dockerfile` | `3000` | Frontend Next.js |

---

## Variáveis de Ambiente

Crie um `.env` na raiz do projeto baseado nos valores abaixo:

```env
# MySQL
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=sigma
MYSQL_USER=sigma
MYSQL_PASSWORD=sigma

# API (usada pelo web)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Os valores acima já são os defaults no `docker-compose.yml` — o `.env` só é necessário para sobrescrever em produção.

---

## Comandos

```bash
# Subir tudo
docker compose up -d

# Subir e rebuildar imagens
docker compose up -d --build

# Ver logs
docker compose logs -f

# Derrubar (mantém volume do MySQL)
docker compose down

# Derrubar e apagar dados do MySQL
docker compose down -v
```

---

## Ordem de inicialização

```
mysql (healthcheck) → api → web
```

O `api` aguarda o MySQL responder antes de iniciar. O `web` aguarda o `api` subir.

---

## Dados persistidos

O volume `mysql_data` persiste os dados do MySQL entre restarts. Para resetar o banco, use `docker compose down -v`.
