# Modelo de Dados

> Entidades do sistema derivadas da planilha real de controle da madeireira.

---

## Entidades

### Especie (Espécie de Madeira)

Representa um tipo de madeira registrada no DOF e no estoque.

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| tipo_madeira | string | Tipo do produto (ex: Madeira serrada (viga), Decking, Alisar) |
| nome_cientifico | string | Nome científico (ex: Dipteryx odorata) |
| nome_popular | string | Nome popular (ex: Cumaru, Cambará) |

---

### Produto

Combinação de espécie + dimensões fixas. Define uma "SKU" de madeira.

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| especie_id | int | FK → Especie |
| altura_cm | decimal | Altura da seção transversal (cm) |
| largura_cm | decimal | Largura da seção transversal (cm) |
| comprimento_m | decimal | Comprimento padrão (m) |
| volume_unitario_m3 | decimal | alt × larg × comp / 1.000.000 (m³) — calculado |

---

### Lote (Entrada de Estoque)

Registro de uma compra de madeira associada a um DOF.

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| numero_dof | string | Número do DOF emitido pelo IBAMA |
| fornecedor_id | int | FK → Fornecedor |
| data_entrada | date | Data da entrada |
| criado_por | int | FK → Usuario |

---

### LoteItem

Itens dentro de um lote de entrada.

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| lote_id | int | FK → Lote |
| produto_id | int | FK → Produto |
| quantidade | int | Número de peças |
| volume_m3 | decimal | quantidade × volume_unitario — calculado |

---

### Movimentacao

Registro de saída ou ajuste de estoque.

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| tipo | enum | `saida`, `ajuste`, `desmembramento` |
| produto_id | int | FK → Produto |
| quantidade | int | Número de peças |
| volume_m3 | decimal | volume movimentado |
| data | datetime | Data/hora |
| usuario_id | int | FK → Usuario |
| observacao | string | Opcional |

---

### Desmembramento

Transformação de um produto em múltiplos produtos menores, mantendo o volume m³.

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| produto_origem_id | int | FK → Produto (ex: viga 15x15) |
| qtde_origem | int | Peças consumidas |
| data | datetime | Data/hora |
| usuario_id | int | FK → Usuario |

### DesmembramentoItem

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| desmembramento_id | int | FK → Desmembramento |
| produto_destino_id | int | FK → Produto (ex: caibro 5x5) |
| quantidade | int | Peças geradas |
| volume_m3 | decimal | Calculado |

> **Regra:** Σ volume_m3 dos itens destino = volume_m3 do item origem (tolerância de arredondamento)

---

### Fornecedor

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| nome | string | |
| cnpj | string | |
| contato | string | Opcional |

---

### Usuario

| Campo | Tipo | Descrição |
|---|---|---|
| id | int | PK |
| nome | string | |
| email | string | |
| senha_hash | string | |
| perfil | enum | `administrador`, `vendedor` |

---

## Estoque Atual (View)

Não é uma tabela — é calculado:

```
estoque_atual(produto_id) =
    Σ LoteItem.volume_m3 (entradas)
  − Σ Movimentacao.volume_m3 WHERE tipo = 'saida' OR tipo = 'ajuste'
```

---

## Controle DOF (View)

```
total_dof(especie_id)     = Σ volumes registrados nos DOFs ativos
total_cubagem(especie_id) = estoque_atual agregado por espécie
diferenca_saldo           = total_cubagem − total_dof
divergencia_pct           = (diferenca_saldo / total_dof) × 100
em_conformidade           = ABS(divergencia_pct) <= 10%
```
