# Design System — Sigma

Paleta de cores e tokens visuais do sistema.

---

## Identidade

Sistema de gestão para madeireiras. A identidade visual remete à natureza, floresta e madeira — verde como cor principal, tons terrosos como acento.

---

## Paleta de Cores

### Verde Principal

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#2D6A4F` | Botões, CTAs, links ativos, sidebar |
| `primary-600` | `#40916C` | Hover de botões, destaque |
| `primary-400` | `#74C69D` | Estados desabilitados, ícones secundários |
| `primary-100` | `#D8F3DC` | Badges, fundo de chips, highlights |
| `primary-50` | `#F0FAF3` | Fundo suave, hover de linhas de tabela |

### Terroso (Madeira)

| Token | Hex | Uso |
|-------|-----|-----|
| `wood` | `#8B5E3C` | Acento, ícones temáticos |
| `wood-light` | `#C8956C` | Decorações, bordas especiais |

### Neutros

| Token | Hex | Uso |
|-------|-----|-----|
| `background` | `#F7FBF8` | Fundo geral da aplicação |
| `surface` | `#FFFFFF` | Cards, modais, dropdowns |
| `border` | `#DCE9E1` | Bordas de inputs, divisores |
| `text-primary` | `#1C3829` | Texto principal |
| `text-muted` | `#5A7A67` | Labels, texto secundário, placeholders |

### Semânticas

| Token | Hex | Uso |
|-------|-----|-----|
| `success` | `#52B788` | Confirmações, status OK |
| `warning` | `#F4A261` | Alertas, estoque baixo |
| `danger` | `#E63946` | Erros, exclusão, status crítico |

---

## Tipografia

- **Família**: **Plus Jakarta Sans** — escolhida por ser limpa, legível e adequada para sistemas de gestão. Testada e aprovada. Não usar Geist.
- **Tamanho base**: `17px` no `html` (Tailwind escala proporcionalmente a partir disso)
- **Escala**: padrão Tailwind (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`)
- **Pesos carregados**: 400, 500, 600, 700
- **Peso**: `font-medium` para labels, `font-semibold` para títulos

---

## Cor de Texto

Texto principal configurado como quase-preto (`oklch(0.13 0.01 150)`) — levíssimo tom esverdeado, muito próximo ao preto puro. Aprovado por legibilidade e coerência com a paleta.

Não usar tons de verde escuro médio (`oklch(0.245...)`) para texto — contraste insuficiente.

---

## Componentes UI

Biblioteca: **shadcn/ui** com preset **Nova** (Radix + Geist como base, substituído por Jakarta no tema).

Instalação: `pnpm dlx shadcn@latest init -d --no-monorepo` dentro de `apps/web`.

Componentes instalados até agora: `button`, `card`, `input`, `label`.

---

## Referências Rápidas

```
Fonte:             Plus Jakarta Sans, 17px base
Verde primário:    #2D6A4F  →  oklch(0.432 0.098 150)
Verde hover:       #40916C  →  oklch(0.567 0.113 150)
Fundo da app:      #F7FBF8  →  oklch(0.983 0.008 152)
Texto principal:   quase-preto  →  oklch(0.13 0.01 150)
```
