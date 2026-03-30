# MVP Mockado — Sigma

> Plano de implementação do front-end com dados estáticos para apresentação acadêmica.
> Objetivo: demonstrar o valor do sistema para o professor sem back-end funcional.

---

## Estado Atual do Projeto

- Layout base existe: sidebar + header em `apps/web/src/app/dashboard/page.tsx`
- Sidebar lista rotas que não existem ainda (`/estoque`, `/vendas`, etc.)
- Cards do dashboard estão vazios (`"—"`)
- Componentes disponíveis: `Card`, `Button`, `Input`, `Label` (shadcn/ui)
- **Não há** rotas além de `/dashboard`

---

## O Que Construir

### Tela 1 — Dashboard (atualizar)

**Arquivo:** `apps/web/src/app/dashboard/page.tsx`

Substituir os cards genéricos por métricas reais do domínio:

| Card | Valor mockado | Detalhe |
|------|--------------|---------|
| Estoque Total | `347,82 m³` | volume total em estoque |
| DOFs Ativos | `12` | documentos registrados |
| Espécies | `8` | tipos de madeira |
| Alertas DOF | `2` | espécies fora da margem de 10% |

Adicionar abaixo: tabela "Últimas Movimentações" com 4–5 linhas mockadas (entrada/saída, espécie, volume, data).

Atualizar o `navItems` para refletir as rotas reais do MVP:
```
Dashboard → /dashboard
Controle DOF → /dashboard/dof
Estoque → /dashboard/estoque
Entradas → /dashboard/entradas
```

---

### Tela 2 — Controle DOF (criar)

**Arquivo:** `apps/web/src/app/dashboard/dof/page.tsx`

Tabela com uma linha por espécie. Essa é a tela principal do sistema.

Colunas:
- Espécie (nome popular)
- Total Cubagem (m³) — estoque físico
- Total DOF (m³) — volume registrado no documento
- Diferença (m³)
- Divergência (%)
- Status — badge colorido

Regra do badge:
```
divergência <= 10%  → badge verde   "Conforme"
divergência <= 15%  → badge amarelo "Atenção"
divergência > 15%   → badge vermelho "Irregular"
```

Dados mockados (8 espécies):

```ts
const especies = [
  { nome: "Cumaru",    cubagem: 48.20, dof: 46.00 },
  { nome: "Ipê",      cubagem: 32.50, dof: 30.00 },
  { nome: "Cambará",  cubagem: 18.90, dof: 18.50 },
  { nome: "Jatobá",   cubagem: 27.40, dof: 22.00 }, // irregular
  { nome: "Cedro",    cubagem: 15.60, dof: 15.00 },
  { nome: "Tauari",   cubagem: 41.80, dof: 40.00 },
  { nome: "Angelim",  cubagem: 88.12, dof: 87.50 },
  { nome: "Maçaranduba", cubagem: 75.30, dof: 62.00 }, // irregular
];
```

Incluir no topo da página: resumo em cards pequenos — "X espécies conformes", "Y em atenção", "Z irregulares".

---

### Tela 3 — Estoque (criar)

**Arquivo:** `apps/web/src/app/dashboard/estoque/page.tsx`

Tabela de produtos em estoque. Colunas:
- Espécie
- Tipo (viga, caibro, decking…)
- Dimensões (alt × larg × comp cm)
- Qtde (peças)
- Volume (m³)

Dados mockados — ~10 linhas cobrindo pelo menos 3 espécies.

Incluir filtro visual por espécie (dropdown `<select>` ou botões de chip) — pode ser estático, sem lógica de filtro real.

---

### Tela 4 — Entrada de Lote (criar)

**Arquivo:** `apps/web/src/app/dashboard/entradas/page.tsx`

Formulário de registro de entrada. Campos:
- Número do DOF (input texto)
- Fornecedor (select com 3 opções mockadas)
- Data de entrada (input date)
- Tabela de itens: produto + quantidade + volume calculado

Botão "Registrar Entrada" — apenas visual, sem `action`.

Abaixo do formulário: lista das últimas 5 entradas mockadas em formato de tabela simples.

---

## Como o Agente Deve Implementar

### Regras gerais

1. **Não criar back-end.** Todos os dados são `const` estáticas dentro do arquivo de cada página.
2. **Não usar `useState` ou `useEffect`** a não ser que seja estritamente necessário para interação visual.
3. **Não instalar dependências novas.** Usar apenas o que já existe: shadcn/ui (`Card`, `Button`, `Input`, `Label`), Tailwind CSS, e os tokens de cor do design system.
4. **Não criar componentes separados** para estruturas usadas uma única vez. Reutilizar o layout de sidebar/header copiando o padrão de `dashboard/page.tsx`.
5. Cada página é um arquivo `.tsx` autocontido: dados mockados + UI na mesma página.

### Tokens de cor disponíveis

```
bg-background       → fundo geral
bg-card             → cards e superfícies
text-foreground     → texto principal
text-muted-foreground → texto secundário
border-border       → bordas
```

Para os badges DOF:
```
Conforme:   bg-green-100  text-green-800
Atenção:    bg-yellow-100 text-yellow-800
Irregular:  bg-red-100    text-red-800
```

### Ordem de execução

```
1. Atualizar dashboard/page.tsx
   - Substituir stats mockados
   - Atualizar navItems
   - Adicionar tabela de movimentações

2. Criar dashboard/dof/page.tsx
   - Cards de resumo
   - Tabela com badge de conformidade

3. Criar dashboard/estoque/page.tsx
   - Tabela de produtos
   - Filtro visual por espécie

4. Criar dashboard/entradas/page.tsx
   - Formulário de entrada
   - Lista de entradas recentes
```

### Verificação antes de criar cada arquivo

- Confirmar que o componente `Card` aceita `className` para customização.
- Não assumir que `<Table>` do shadcn está instalado — usar `<table>` HTML nativo com classes Tailwind.

---

## O Que Não Fazer

- Não criar página de login (fora do escopo desta entrega)
- Não implementar rota `/clientes` ou `/fornecedores`
- Não criar `/vendas` — substituído por "Entradas" no MVP
- Não adicionar animações ou bibliotecas de gráficos
- Não conectar nenhum campo a estado global
