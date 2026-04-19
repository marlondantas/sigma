# Graph Report - .  (2026-04-19)

## Corpus Check
- Corpus is ~25,173 words - fits in a single context window. You may not need a graph.

## Summary
- 252 nodes · 278 edges · 52 communities detected
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.8)
- Token cost: 4,200 input · 2,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Web Admin Pages|Web Admin Pages]]
- [[_COMMUNITY_Auth & User API Services|Auth & User API Services]]
- [[_COMMUNITY_MVP UI & DOF Compliance|MVP UI & DOF Compliance]]
- [[_COMMUNITY_Project Docs & Design System|Project Docs & Design System]]
- [[_COMMUNITY_Data Model Entities|Data Model Entities]]
- [[_COMMUNITY_Docker Infrastructure|Docker Infrastructure]]
- [[_COMMUNITY_Products API Service|Products API Service]]
- [[_COMMUNITY_Users Controller|Users Controller]]
- [[_COMMUNITY_Auth Controller|Auth Controller]]
- [[_COMMUNITY_Products Controller|Products Controller]]
- [[_COMMUNITY_Profiles Controller|Profiles Controller]]
- [[_COMMUNITY_Profiles Service|Profiles Service]]
- [[_COMMUNITY_Login & Navigation UI|Login & Navigation UI]]
- [[_COMMUNITY_Agent Behavior Rules|Agent Behavior Rules]]
- [[_COMMUNITY_App Root Controller|App Root Controller]]
- [[_COMMUNITY_JWT Strategy|JWT Strategy]]
- [[_COMMUNITY_App Root Service|App Root Service]]
- [[_COMMUNITY_Dashboard Controller|Dashboard Controller]]
- [[_COMMUNITY_Card UI Component|Card UI Component]]
- [[_COMMUNITY_App Module|App Module]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]

## God Nodes (most connected - your core abstractions)
1. `GET()` - 18 edges
2. `UsersService` - 14 edges
3. `POST()` - 11 edges
4. `Next.js Web Service` - 10 edges
5. `handleSave()` - 9 edges
6. `ProductsService` - 8 edges
7. `UsersController` - 8 edges
8. `AuthController` - 7 edges
9. `ProductsController` - 7 edges
10. `ProfilesController` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Wordmark Logo SVG` --conceptually_related_to--> `Next.js Web Service`  [INFERRED]
  apps/web/public/next.svg → docs/infrastructure.md
- `Vercel Triangle Logo SVG` --conceptually_related_to--> `Next.js Web Service`  [INFERRED]
  apps/web/public/vercel.svg → docs/infrastructure.md
- `File Icon SVG` --conceptually_related_to--> `Next.js Web Service`  [INFERRED]
  apps/web/public/file.svg → docs/infrastructure.md
- `Globe / Web Icon SVG` --conceptually_related_to--> `Next.js Web Service`  [INFERRED]
  apps/web/public/globe.svg → docs/infrastructure.md
- `Browser Window / App Icon SVG` --conceptually_related_to--> `Next.js Web Service`  [INFERRED]
  apps/web/public/window.svg → docs/infrastructure.md

## Hyperedges (group relationships)
- **DOF Compliance Monitoring Flow** — dof_10pct_rule, datamodel_dof_view, datamodel_estoque_view, dof_sigma_relationship [INFERRED 0.88]
- **Stock Entry Data Model (Lote + LoteItem + Produto + Especie)** — datamodel_lote, datamodel_loteitem, datamodel_produto, datamodel_especie [EXTRACTED 0.95]
- **Sigma Full-Stack Architecture (Next.js + NestJS + MySQL)** — apps_web_readme_nextjs, apps_api_readme_nestjs, readme_sigma_stack [EXTRACTED 0.95]
- **DOF Compliance Core â€” Rule, Document, and Monitoring** — overview_dof_document, overview_dof_tolerance_rule, overview_ibama, mvp_badge_conformidade, users_dof_context [INFERRED 0.90]
- **MVP Frontend Pages with Static Mock Data** — mvp_dashboard_page, mvp_dof_control_page, mvp_estoque_page, mvp_entradas_page, mvp_mock_data_strategy [EXTRACTED 1.00]
- **Three-Tier Docker Compose Infrastructure** — infrastructure_mysql_service, infrastructure_api_service, infrastructure_web_service, infrastructure_docker_compose [EXTRACTED 1.00]

## Communities

### Community 0 - "Web Admin Pages"
Cohesion: 0.14
Nodes (15): closeModal(), confirmDelete(), handleResetPassword(), handleSave(), loadData(), loadProducts(), loadProfiles(), openCreate() (+7 more)

### Community 1 - "Auth & User API Services"
Cohesion: 0.13
Nodes (3): AuthService, bootstrap(), UsersService

### Community 2 - "MVP UI & DOF Compliance"
Cohesion: 0.09
Nodes (23): Sigma Logo â€” Woodgrain Lettering with Pine Tree, DOF Conformity Badge Rule, Dashboard Page (MVP), DOF Control Page (MVP), Entrada de Lote (Batch Entry) Page (MVP), Estoque (Inventory) Page (MVP), Static Mock Data Strategy (No Backend), Rationale: No Backend for Academic Demo (+15 more)

### Community 3 - "Project Docs & Design System"
Cohesion: 0.12
Nodes (17): NestJS API App, Next.js Web App, Sigma Color Palette (Green + Wood), Nature/Forest Visual Identity Rationale, shadcn/ui Component Library, DOF 10% Tolerance Rule, IBAMA CKAN Public API (Historical Data), IBAMA (Sistema DOF) (+9 more)

### Community 4 - "Data Model Entities"
Cohesion: 0.17
Nodes (16): Desmembramento Entity (Product Split), DesmembramentoItem Entity, Controle DOF (Calculated View), Especie Entity (Wood Species), Estoque Atual (Calculated View), Fornecedor Entity (Supplier), Lote Entity (Stock Entry Batch), LoteItem Entity (+8 more)

### Community 5 - "Docker Infrastructure"
Cohesion: 0.26
Nodes (13): NestJS API Service, Docker Compose Deployment, Environment Variables Configuration, MySQL 8.4 Service, MySQL Persistent Volume, Service Startup Order, Next.js Web Service, Technology Stack (+5 more)

### Community 6 - "Products API Service"
Cohesion: 0.33
Nodes (1): ProductsService

### Community 7 - "Users Controller"
Cohesion: 0.22
Nodes (1): UsersController

### Community 8 - "Auth Controller"
Cohesion: 0.25
Nodes (1): AuthController

### Community 9 - "Products Controller"
Cohesion: 0.25
Nodes (1): ProductsController

### Community 10 - "Profiles Controller"
Cohesion: 0.25
Nodes (1): ProfilesController

### Community 11 - "Profiles Service"
Cohesion: 0.36
Nodes (1): ProfilesService

### Community 12 - "Login & Navigation UI"
Cohesion: 0.27
Nodes (2): handleSubmit(), logout()

### Community 13 - "Agent Behavior Rules"
Cohesion: 0.4
Nodes (6): Sigma CLAUDE.md, Agent Behavior Rules, Agent Behavior Constraints, Agent Initialization Sequence, ALuaAzul Meta-Docs Memory Verification, Docs Navigation Map

### Community 14 - "App Root Controller"
Cohesion: 0.5
Nodes (1): AppController

### Community 15 - "JWT Strategy"
Cohesion: 0.5
Nodes (1): JwtStrategy

### Community 16 - "App Root Service"
Cohesion: 0.67
Nodes (1): AppService

### Community 17 - "Dashboard Controller"
Cohesion: 0.67
Nodes (1): DashboardController

### Community 18 - "Card UI Component"
Cohesion: 0.67
Nodes (0): 

### Community 19 - "App Module"
Cohesion: 1.0
Nodes (1): AppModule

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (1): AuthModule

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (1): JwtAuthGuard

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (1): DashboardModule

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (1): Product

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (1): ProductsModule

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (1): Profile

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (1): ProfilesModule

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (1): User

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (1): UsersModule

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (2): Next.js Agent Breaking Changes Rule, Web App CLAUDE.md

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (1): Plus Jakarta Sans Typography

## Knowledge Gaps
- **44 isolated node(s):** `AppModule`, `AuthModule`, `JwtAuthGuard`, `DashboardModule`, `Product` (+39 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `App Module`** (2 nodes): `AppModule`, `app.module.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `auth.module.ts`, `AuthModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `jwt-auth.guard.ts`, `JwtAuthGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `dashboard.module.ts`, `DashboardModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `product.entity.ts`, `Product`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `products.module.ts`, `ProductsModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `profile.entity.ts`, `Profile`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `profiles.module.ts`, `ProfilesModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `create-user.ts`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `user.entity.ts`, `User`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `users.module.ts`, `UsersModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `button.tsx`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (2 nodes): `input.tsx`, `Input()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (2 nodes): `label.tsx`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (2 nodes): `utils.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (2 nodes): `Next.js Agent Breaking Changes Rule`, `Web App CLAUDE.md`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `app.controller.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `auth.controller.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `auth.service.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `users.service.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `app.e2e-spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `not-found.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `DashboardClient.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `api.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `Plus Jakarta Sans Typography`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GET()` connect `Web Admin Pages` to `Auth & User API Services`, `JWT Strategy`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `POST()` connect `Web Admin Pages` to `Login & Navigation UI`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `GET()` (e.g. with `.constructor()` and `.login()`) actually correct?**
  _`GET()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `POST()` (e.g. with `handleSubmit()` and `handleSave()`) actually correct?**
  _`POST()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `Next.js Web Service` (e.g. with `Technology Stack` and `Next.js Wordmark Logo SVG`) actually correct?**
  _`Next.js Web Service` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `handleSave()` (e.g. with `PUT()` and `POST()`) actually correct?**
  _`handleSave()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AppModule`, `AuthModule`, `JwtAuthGuard` to the rest of the system?**
  _44 weakly-connected nodes found - possible documentation gaps or missing edges._