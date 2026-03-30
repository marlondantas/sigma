# DOF — Documento de Origem Florestal

> Referência sobre o sistema DOF do IBAMA e como o sigma se relaciona com ele.

---

## O que é

O **DOF (Documento de Origem Florestal)** é uma licença eletrônica obrigatória (Portaria MMA nº 253/2006) que controla o transporte e armazenamento de produtos florestais nativos no Brasil. Toda movimentação de madeira de lei — compra, venda, transporte — precisa de um DOF associado.

---

## Versões do sistema

| Versão | Status | Observação |
|---|---|---|
| DOF Legado | Ativo (saldos antigos) | Sistema original desde 2006 |
| DOF+ Rastreabilidade | Atual (desde dez/2022) | Migração total dos saldos foi em jun/2025 |

Acesso: `https://servicos.ibama.gov.br/`

---

## Como funciona o fluxo

### Compra (entrada de estoque)

```
Vendedor lança oferta no DOF (espécie, volume m³, pátio de origem)
  → Comprador aceita oferta
    → DOF é emitido (número único gerado pelo IBAMA)
      → Madeira é transportada com DOF físico ou eletrônico
        → Comprador confirma recebimento no sistema
          → Volume entra no saldo do comprador
```

### Venda (saída de estoque)

```
Empresa lança oferta (volume do seu saldo)
  → Cliente aceita
    → DOF emitido para transporte
      → Cliente confirma recebimento
        → Volume sai do saldo da empresa
```

---

## Estrutura de dados de um DOF

| Campo | Descrição |
|---|---|
| Número de série | Gerado automaticamente pelo IBAMA |
| Número da NF-e | Nota fiscal associada |
| AUTEX | Autorização de Exploração Florestal de origem |
| Espécie | Nome científico (ex: *Dipteryx odorata*) |
| Tipo de produto | Madeira serrada (viga), tábua, caibro, etc. |
| Volume (m³) | Quantidade em metros cúbicos |
| Pátio de origem | Local de saída |
| Pátio de destino | Local de chegada |
| Transportador | Empresa + placa do veículo |
| Data de emissão | |

---

## Saldos no sistema DOF

```
Saldo Total = Saldo Livre + Saldo Bloqueado + Recebimento Pendente

Saldo Livre        → disponível para nova venda/oferta
Saldo Bloqueado    → volume em oferta ativa ou em transporte
Recebimento Pend.  → DOF emitido, aguardando confirmação no destino
```

---

## Regra dos 10% — Tolerância DOF

O estoque físico da empresa deve ter **no máximo 10% de variação** em relação ao saldo registrado no DOF.

```
Volume DOF Corrigido = Total DOF × 1,10   (limite superior tolerado)
Diferença de Saldo   = Total Cubagem (físico) − Total DOF
Divergência %        = (Diferença de Saldo / Total DOF) × 100

Conforme se: |Divergência %| ≤ 10%
```

**Exemplo:**
```
Total DOF:      84,08 m³
Limite (+10%):  92,49 m³
Total físico:   95,88 m³    ← acima do limite
Diferença:     +11,80 m³    ← precisa ajustar 3,39 m³ para entrar na margem
```

### Penalidades por não conformidade

- Fiscalização ambiental
- Apreensão da madeira
- Multas de R$ 50 a R$ 50.000.000
- Bloqueio de operações (sem poder emitir DOF)
- Crime ambiental (Lei 9.605/1998): detenção de 6 meses a 1 ano

---

## Como o sigma se relaciona com o DOF

O sigma **não se integra diretamente** ao sistema do IBAMA. A sincronização é manual:

| Ação | Quem faz | Onde |
|---|---|---|
| Registra entrada com número do DOF | Administrador | No sigma |
| Atualiza saldo no sistema IBAMA | Pessoa responsável pelo DOF | No portal IBAMA |
| Compara Total Cubagem vs. Total DOF | Automático | No sigma (dashboard) |
| Decide ajuste necessário | Administrador | No sigma (cálculo) |
| Executa ajuste no IBAMA | Pessoa responsável | No portal IBAMA |

O sigma calcula a diferença e alerta, mas **a atualização no IBAMA é sempre manual**.

---

## Campos que o sigma armazena por DOF

Ao registrar uma entrada, o Administrador informa:

| Campo | Obrigatório |
|---|---|
| Número do DOF | Sim |
| Espécie (nome científico + popular) | Sim |
| Tipo de produto | Sim |
| Volume m³ | Sim |
| Fornecedor | Sim |
| Data de entrada | Sim |

---

## Integração via API — Viabilidade

### Veredicto: integração em tempo real não é possível

O sistema DOF+ Rastreabilidade é **completamente fechado** para integração programática. Não existe API REST oficial, SDK, nem webservice documentado para terceiros. Nenhum projeto open source foi encontrado que faça essa integração.

| O que você quer | Possível? |
|---|---|
| Consultar saldo em tempo real via API | Não |
| Sincronizar transações automaticamente | Não |
| Emitir ou modificar DOFs via API | Não |
| Consultar dados históricos/agregados | Sim (API CKAN pública) |

### O que existe: API CKAN de dados abertos

O IBAMA disponibiliza dados históricos em `dadosabertos.ibama.gov.br` no formato CKAN (padrão federal). Contém autorizações e transportes passados, mas **não saldos em tempo real**.

```http
GET https://dadosabertos.ibama.gov.br/api/3/action/datastore_search
    ?resource_id={id}
    &limit=100
```

Útil para auditoria e histórico, não para sincronização operacional.

### Abordagem adotada no sigma: integração híbrida manual

Como a API em tempo real não existe, o sigma resolve o problema de outra forma:

1. Administrador acessa o portal IBAMA e consulta os saldos
2. Registra entradas/saídas no sigma com o número do DOF
3. O sigma calcula a divergência automaticamente
4. O administrador usa esse cálculo para fazer o ajuste manual no IBAMA

Essa é exatamente a forma como a madeireira já opera hoje — o sigma só elimina a planilha Excel do meio.

---

## Referências

- [DOF — Portal IBAMA](https://www.gov.br/ibama/pt-br/assuntos/biodiversidade/flora-e-madeira/documento-de-origem-florestal-dof)
- [DOF+ Rastreabilidade](https://www.gov.br/ibama/pt-br/assuntos/biodiversidade/flora-e-madeira/documento-de-origem-florestal-dof/dof-rastreabilidade)
- Portaria MMA nº 253/2006
- Instrução Normativa IBAMA nº 21/2014
- Instrução Normativa IBAMA nº 16/2022
