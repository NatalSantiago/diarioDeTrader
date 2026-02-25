# 📓 Diário de Trader - Sistema Completo de Gerenciamento de Trades

<div align="center">
<span id="diario-de-trader---sistema-completo-de-gerenciamento-de-trades"></span>

# 📊 Diário de Trader - Versão 2.0 - Múltiplas Contas com IndexedDB

**Sistema Web Profissional para Registro, Análise e Gerenciamento de Múltiplas Contas de Trading**

*"Gerencie todas as suas contas em um só lugar, com persistência real e segurança"*

<img src="LogoDiario.png" width="300" height="300" alt="Logo Diário de Trader">

---

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![IndexedDB](https://img.shields.io/badge/IndexedDB-3E4E5C?style=for-the-badge)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF4088?style=for-the-badge)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![CryptoJS](https://img.shields.io/badge/CryptoJS-000000?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Version](https://img.shields.io/badge/Version-2.0-brightgreen)

[![Download Now](https://img.shields.io/badge/Download-Latest_Release-success)](#)
[![WhatsApp Support](https://img.shields.io/badge/WhatsApp-Suporte_24h-25D366)](https://wa.me/5599984447141)
[![Email](https://img.shields.io/badge/Email-Contato%20Rápido-blue)](mailto:natal.santiago.tech@gmail.com)

</div>

---

## 📑 Índice

- [🎯 O Que é o Diário de Trader?](#o-que-e-o-diario-de-trader)
- [✨ Funcionalidades Principais](#funcionalidades-principais)
- [📊 Visão Geral do Sistema](#visao-geral-do-sistema)
- [🚀 Como Começar a Usar](#como-comecar-a-usar)
  - [📋 Pré-requisitos](#pre-requisitos)
  - [📥 Instalação](#instalacao)
  - [⚙️ Configuração Inicial](#configuracao-inicial)
- [📖 Tutorial de Uso](#tutorial-de-uso)
  - [➕ Criando uma Nova Conta](#criando-uma-nova-conta)
  - [🎮 Lançando um Trade](#lancando-um-trade)
  - [📈 Editando ou Fechando um Trade](#editando-ou-fechando-um-trade)
  - [📊 Visualizando o Dashboard](#visualizando-o-dashboard)
  - [📉 Métricas e Drawdown](#metricas-e-drawdown)
  - [📅 Filtros e Impressão](#filtros-e-impressao)
  - [💾 Backup e Restauração](#backup-e-restauracao)
- [⚙️ Explicação dos Cálculos](#explicacao-dos-calculos)
  - [🎯 Meta de Lucro](#meta-de-lucro)
  - [📉 Drawdown Máximo](#drawdown-maximo)
  - [📉 Drawdown Diário](#drawdown-diario)
- [📊 Dashboard e Gráficos](#dashboard-e-graficos)
- [🌗 Tema Claro/Escuro](#tema-claro-escuro)
- [🛠️ Personalização](#personalizacao)
- [🐛 Solução de Problemas](#solucao-de-problemas)
- [❓ Perguntas Frequentes](#perguntas-frequentes)
- [📞 Suporte e Comunidade](#suporte-e-comunidade)
- [🤝 Como Contribuir](#como-contribuir)
- [📄 Licença](#licenca)
- [💖 Apoie o Projeto](#apoie-o-projeto)
- [🔄 Histórico de Versões](#historico-de-versoes)

---

## 🎯 O Que é o Diário de Trader?

<span id="o-que-e-o-diario-de-trader"></span>

O **Diário de Trader** é uma aplicação web profissional para traders registrarem, acompanharem e analisarem todas as suas operações em **múltiplas contas**. Desenvolvido com HTML5, CSS3 e JavaScript puro, ele roda diretamente no navegador e utiliza **IndexedDB** como banco de dados local – uma tecnologia moderna que oferece muito mais capacidade e performance que o antigo `localStorage`. Agora você pode gerenciar quantas contas quiser (ex: conta demo, conta real, diferentes prop firms) com total isolamento de dados.

### Principais Diferenciais:
- **Múltiplas contas** com gerenciamento completo (criar, editar, excluir, selecionar)
- **Banco de dados IndexedDB** – persistente, assíncrono e com alta capacidade
- **Interface moderna** com tema claro/escuro
- **Cálculo automático** de meta, drawdown estático/dinâmico e drawdown diário
- **Gráficos interativos** com Chart.js (evolução do saldo, resultados, drawdown diário)
- **Sistema de filtros** por período e status
- **Backup criptografado** com AES (exporta todas as contas em um único arquivo)
- **Impressão profissional** de listas e relatórios individuais
- **Upload de imagens** via Ctrl+V para documentar entradas e saídas
- **Persistência da última conta acessada** – ao reabrir o navegador, você continua de onde parou

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## ✨ Funcionalidades Principais

<span id="funcionalidades-principais"></span>

### Gerenciamento de Contas

| Funcionalidade | Descrição |
|----------------|-----------|
| **➕ Nova Conta** | Crie contas com nome, saldo inicial, meta, limites de drawdown |
| **📋 Gerenciar Contas** | Modal com lista de todas as contas, mostrando saldo, meta, trades e resultado |
| **✏️ Editar Conta** | Altere qualquer parâmetro da conta |
| **🗑️ Excluir Conta** | Remova a conta e todos os seus trades (com confirmação) |
| **🔍 Selecionar** | Ative a conta desejada e volte ao painel principal |
| **💾 Persistência** | A última conta acessada é lembrada mesmo após fechar o navegador |

### Para o Trader (dentro de cada conta)

| Funcionalidade | Descrição |
|----------------|-----------|
| **Registro Completo** | Moeda, data/hora, tipo (compra/venda), preços de entrada, stop, target, lote |
| **Sentimentos** | Registre seu estado emocional na abertura e no fechamento |
| **Imagens** | Cole prints das operações diretamente (Ctrl+V) |
| **Observações** | Anote detalhes importantes de cada trade |
| **Status** | Aberto / Fechado (com resultado Lucro/Prejuízo) |

### Métricas em Tempo Real

| Card | Descrição |
|------|-----------|
| **💰 Saldo inicial** | Capital da conta (configurado na criação) |
| **🎯 Meta** | Percentual de lucro desejado, com indicador visual de atingimento |
| **📉 Drawdown Máx** | Maior perda percentual (estática ou dinâmica, configurável por conta) |
| **✅ Positivos** | Total de trades com lucro |
| **❌ Negativos** | Total de trades com prejuízo |

### Métricas Diárias

| Badge | Descrição |
|-------|-----------|
| **📅 trades hoje** | Quantidade de operações no dia atual |
| **📉 Drawdown diário** | Maior queda intradiária, com alerta ⚠️ se ultrapassar o limite |
| **📈 Positivos hoje** | Lucros do dia |
| **📉 Negativos hoje** | Prejuízos do dia |
| **💰 Saldo atual** | Saldo após todos os trades |

### Filtros e Impressão

- **Filtro por período:** Hoje, esta semana, este mês, personalizado ou todos
- **Filtro por status:** Abertos, Fechados, Positivos, Negativos
- **Impressão da lista** com resumo e tabela detalhada
- **Impressão individual** de cada trade, incluindo imagens

### Dashboard Gráfico

- **📈 Evolução do Saldo** (linha)
- **🥧 Resultados** (pizza)
- **📉 Drawdown Diário** (linha contínua com todos os dias desde o primeiro trade)

### Segurança e Backup

- **Backup criptografado** com AES – gera um arquivo `.enc` contendo **todas as contas**
- **Restauração segura** com validação – substitui os dados atuais pelo backup
- **Banco de dados IndexedDB** – dados ficam armazenados no perfil do navegador, isolados por origem

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 📊 Visão Geral do Sistema

<span id="visao-geral-do-sistema"></span>

### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Cliente)                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Interface │  │  Lógica de  │  │   Banco de Dados    │ │
│  │    HTML/CSS │  │   Cálculo   │  │     IndexedDB       │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│         │               │                     │            │
│         ▼               ▼                     ▼            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    JavaScript                        │   │
│  │  (SweetAlert2, Chart.js, CryptoJS, módulos próprios)│   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Estrutura do Banco de Dados (IndexedDB)

| Object Store | Descrição |
|--------------|-----------|
| **contas** | Cada conta é um objeto com `id`, `nome`, `saldoInicial`, `metaPercent`, `ddTipo`, `ddMax`, `ddDiarioLimite` e um array `trades` contendo todas as operações daquela conta. |

### Fluxo de Dados

```
1. Usuário seleciona ou cria uma conta
2. Dados da conta são carregados do IndexedDB
3. Usuário lança/edita trade via modal
4. Dados são validados e salvos no IndexedDB
5. Métricas são recalculadas e exibidas
6. Lista de trades é renderizada com filtros
7. Gráficos do dashboard são atualizados
8. Backups podem ser gerados/restaurados (exporta todas as contas)
```

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 🚀 Como Começar a Usar

<span id="como-comecar-a-usar"></span>

### 📋 Pré-requisitos

<span id="pre-requisitos"></span>

- **Navegador moderno** (Chrome, Firefox, Edge, Opera) – todos suportam IndexedDB
- **JavaScript ativado**
- **Conexão com internet** (apenas para carregar as bibliotecas CDN: SweetAlert2, CryptoJS, Chart.js)

### 📥 Instalação

<span id="instalacao"></span>

#### Opção 1: Usar diretamente o arquivo HTML

1. **Baixe** o arquivo `diario-trader.html` (renomeie se necessário)
2. **Salve** em uma pasta de sua preferência
3. **Abra** o arquivo com seu navegador (duplo clique)

### ⚙️ Configuração Inicial

<span id="configuracao-inicial"></span>

Ao abrir o sistema pela primeira vez, uma conta padrão "Conta Demo" será criada automaticamente. Para gerenciar suas contas:

1. Clique no botão **📋 Gerenciar Contas** (topo direito)
2. No modal, clique em **➕ Nova Conta**
3. Preencha:
   - **Nome da Conta** (ex: "ICMarkets 5k", "The Trading Pit 50k")
   - **Saldo Inicial (U$)**
   - **Meta de Lucro (%)**
   - **Tipo de Drawdown Máximo**: Estático (baseado no capital inicial) ou Dinâmico (baseado no pico de equity)
   - **Limite de Drawdown Máx (%)**
   - **Limite de Drawdown Diário (%)**
4. Clique em **Criar**

A nova conta será automaticamente selecionada. Você pode alternar entre contas usando o **seletor** ao lado do botão "Lançar Trade".

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 📖 Tutorial de Uso

<span id="tutorial-de-uso"></span>

### ➕ Criando uma Nova Conta

<span id="criando-uma-nova-conta"></span>

1. Clique em **📋 Gerenciar Contas**
2. Clique em **➕ Nova Conta**
3. Preencha os dados e clique em **Criar**
4. A nova conta será selecionada automaticamente e você já pode lançar trades nela.

### 🎮 Lançando um Trade

<span id="lancando-um-trade"></span>

1. Certifique-se de que a conta desejada está selecionada no dropdown à esquerda.
2. Clique no botão **🚀 Lançar Trade**
3. Preencha os dados da operação:
   - **Moeda**: selecione o par (EURUSD, USDJPY, etc.)
   - **Data/Hora Entrada**: automaticamente preenchida com o momento atual (pode alterar)
   - **Tipo entrada**: Compra (Long) ou Venda (Short)
   - **Preço entrada**, **Stop Loss**, **Take Profit** (valores numéricos)
   - **Lote**: quantidade de lotes
   - **Imagem Entrada**: cole uma print (Ctrl+V) no campo indicado (opcional)
   - **Observações abertura**: anotações (opcional)
   - **Sentimento na abertura**: selecione (opcional)

   **Seção de Fechamento** (preencha apenas se o trade já estiver fechado):
   - **Fechado com**: Lucro ou Prejuízo
   - **Valor (U$)**: valor em dólares do resultado
   - **Data/Hora**: data/hora do fechamento
   - **Imagem Fechamento**: cole print (opcional)
   - **Observações Fechamento**
   - **Sentimento no fechamento**

4. Clique em **💾 Salvar Trade**

O trade aparecerá na lista e as métricas da conta serão atualizadas.

### 📈 Editando ou Fechando um Trade

<span id="editando-ou-fechando-um-trade"></span>

- **Para editar/ver detalhes:** clique em **👁️ Editar/Ver** no trade desejado. O mesmo modal será aberto com os dados atuais.
- **Para fechar um trade aberto:** clique em **🔒 Fechar** (abre o modal com foco na seção de fechamento).
- **Para excluir:** clique em **🗑️ Excluir** (confirme a ação).

### 📊 Visualizando o Dashboard

<span id="visualizando-o-dashboard"></span>

Clique no botão **📊 Dashboard** (topo direito). Será aberto um modal com:

- **Estatísticas rápidas** da conta atual: Total de trades, Win Rate, Lucro Líquido, Profit Factor
- **Gráfico de Evolução do Saldo** (linha)
- **Gráfico de Resultados** (pizza: lucros vs prejuízos)
- **Gráfico de Drawdown Diário** (linha contínua)

Você pode imprimir o dashboard clicando em **🖨️ Imprimir Dashboard**.

### 📉 Métricas e Drawdown

<span id="metricas-e-drawdown"></span>

O sistema calcula automaticamente:

- **Meta**: percentual de lucro desejado. Quando atingido, o card fica verde com um ✅.
- **Drawdown Máximo**:
  - **Estático**: maior perda percentual em relação ao capital inicial.
  - **Dinâmico**: maior queda percentual em relação ao pico de equity (máximo histórico).
- **Drawdown Diário**: maior queda intradiária (menor saldo do dia em relação ao saldo de abertura). Exibido com sinal de menos (ex: `-3,1%`) e ícone ⚠️ se ultrapassar o limite configurado.

### 📅 Filtros e Impressão

<span id="filtros-e-impressao"></span>

- Use os filtros na barra superior para visualizar trades de um período específico ou com determinado status.
- Clique em **🖨️ Imprimir** para gerar um relatório completo da lista filtrada, com resumo e tabela.
- Na visualização individual de um trade, há o botão **🖨️ Imprimir** para gerar um relatório detalhado com todas as informações e imagens.

### 💾 Backup e Restauração

<span id="backup-e-restauracao"></span>

- **💾 Backup**: gera um arquivo com nome `BackupDiarioTrader-DD-MM-AAAA.enc` contendo **todas as contas** e trades, criptografado com AES.
- **📂 Restaurar**: selecione o arquivo de backup. O sistema descriptografa e substitui os dados atuais (todas as contas).

> ⚠️ **Atenção**: a restauração substitui todos os dados existentes. Recomenda-se fazer um backup antes de restaurar.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## ⚙️ Explicação dos Cálculos

<span id="explicacao-dos-calculos"></span>

### 🎯 Meta de Lucro

<span id="meta-de-lucro"></span>

```
Meta em U$ = Saldo Inicial × (Meta % / 100)
Lucro Atual = Saldo Atual - Saldo Inicial
Falta = Máximo(0, Meta em U$ - Lucro Atual)
Percentual de Falta = (Falta / Saldo Inicial) × 100
```

Quando `Lucro Atual >= Meta em U$`, o card muda para verde e exibe "Meta atingida!".

### 📉 Drawdown Máximo

<span id="drawdown-maximo"></span>

#### Estático (baseado no capital inicial)
- Percorre todos os trades em ordem cronológica, simulando o saldo.
- A cada trade, calcula `Perda = (Saldo Inicial - Saldo Corrente) / Saldo Inicial × 100`.
- Armazena o maior valor de perda encontrado.

#### Dinâmico (baseado no pico de equity)
- Simula o saldo e mantém o maior valor já atingido (pico).
- A cada trade, calcula `Queda = (Pico - Saldo Corrente) / Pico × 100`.
- Armazena a maior queda.

### 📉 Drawdown Diário

<span id="drawdown-diario"></span>

Para cada dia:
1. Calcula o saldo de abertura do dia (saldo após o fechamento do dia anterior).
2. Ordena os trades do dia por data/hora.
3. Simula o saldo após cada trade, registrando o **menor valor atingido**.
4. Drawdown diário = `(Saldo Abertura - Menor Saldo) / Saldo Abertura × 100`.

> O gráfico de drawdown diário considera **todos os dias desde o primeiro trade até hoje**, com valor zero nos dias sem perda.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 📊 Dashboard e Gráficos

<span id="dashboard-e-graficos"></span>

### Estatísticas do Dashboard

| Estatística | Cálculo |
|-------------|---------|
| **Total Trades** | Número de trades fechados |
| **Win Rate** | (Lucros / Total Fechados) × 100 |
| **Lucro Líquido** | Soma dos lucros - soma dos prejuízos |
| **Profit Factor** | Soma lucros / Soma prejuízos (∞ se prejuízos = 0) |

### Gráficos

- **📈 Evolução do Saldo**: linha do tempo com o saldo após cada trade fechado.
- **🥧 Resultados**: pizza com a quantidade de trades lucrativos vs. deficitários.
- **📉 Drawdown Diário**: linha contínua com o drawdown percentual de cada dia (desde o primeiro trade). Valores zero nos dias sem perda.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 🌗 Tema Claro/Escuro

<span id="tema-claro-escuro"></span>

O sistema oferece dois temas: **DARK** (padrão) e **LIGHT**. Para alternar:

1. Localize o seletor de tema no topo direito (botões DARK / LIGHT).
2. Clique no tema desejado.
3. A preferência é salva no `localStorage` e mantida nas próximas visitas.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 🛠️ Personalização

<span id="personalizacao"></span>

Você pode personalizar:

- **Lista de pares de moedas**: edite o `<select id="modal-moeda">` no HTML para adicionar ou remover opções.
- **Formatos de preço**: ajuste a função `getFormatConfig()` para incluir novos pares com suas casas decimais.
- **Limites e metas**: altere via interface de gerenciamento de contas.
- **Cores e estilos**: modifique as variáveis CSS em `:root` e `.light-theme`.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 🐛 Solução de Problemas

<span id="solucao-de-problemas"></span>

### Problemas Comuns e Soluções

#### 1. Gráficos não aparecem no dashboard

**Causas possíveis:**
- Biblioteca Chart.js não carregou (problema de CDN)
- Navegador muito antigo

**Solução:**
- Verifique conexão com internet
- Atualize o navegador
- Tente em outro navegador (Chrome, Firefox)

#### 2. Drawdown diário mostra 0% mesmo com perdas

**Causas:**
- Os trades do dia não estão ordenados corretamente
- O menor saldo do dia não foi detectado (pode acontecer se todos os trades forem lucrativos)

**Solução:**
- Verifique se as datas/horas estão corretas
- O cálculo usa a ordem cronológica dos trades; garanta que os horários estejam precisos

#### 3. Backup não restaura

**Causas:**
- Arquivo corrompido
- Chave de criptografia diferente (o sistema usa chave fixa)

**Solução:**
- Certifique-se de que o arquivo foi gerado por este sistema
- Tente gerar um novo backup e restaurar imediatamente

#### 4. Imagens não colam

**Causas:**
- Navegador sem permissão para área de transferência
- Formato de imagem não suportado

**Solução:**
- Use Ctrl+V em um campo de texto para testar
- Prefira imagens PNG ou JPEG

#### 5. A última conta não é lembrada ao reabrir o navegador

**Causas:**
- O `localStorage` foi limpo
- Bug na lógica de persistência

**Solução:**
- Verifique se outros dados (como tema) estão sendo lembrados
- O sistema salva o ID da última conta ao carregá-la; se o problema persistir, abra o console (F12) e veja se há mensagens de erro.

### Logs e Depuração

Abra o console do navegador (F12) para ver mensagens de log e possíveis erros. O sistema exibe logs como "Conta carregada: X" e "ID da última conta no localStorage: Y".

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## ❓ Perguntas Frequentes

<span id="perguntas-frequentes"></span>

#### 1. Onde ficam os dados agora? Ainda no localStorage?
Não. Agora usamos **IndexedDB**, um banco de dados real dentro do navegador. Os dados ficam em uma pasta específica do perfil do usuário, com muito mais capacidade e organização.

#### 2. Posso ter várias contas?
Sim! O grande diferencial da versão 2.0. Você pode criar quantas contas quiser, cada uma com seus próprios trades e configurações. O seletor no topo permite alternar rapidamente.

#### 3. Como faço para alternar entre contas?
Use o **dropdown** ao lado do botão "Lançar Trade". Basta selecionar a conta desejada e todos os dados (trades, métricas) serão atualizados.

#### 4. Posso excluir uma conta?
Sim, no modal "Gerenciar Contas" clique em **🗑️ Excluir**. A conta será removida junto com todos os seus trades. **Não é possível excluir a conta que está ativa**; primeiro selecione outra.

#### 5. O backup agora inclui todas as contas?
Sim. O botão **💾 Backup** exporta **todas as contas** em um único arquivo criptografado. Ao restaurar, todas as contas do backup substituem as atuais.

#### 6. Por que os valores agora aparecem como "U$"?
Porque o sistema foi ajustado para trabalhar com dólar americano, mantendo a formatação brasileira (ponto para milhar, vírgula para decimal). Ex: U$ 10.000,50.

#### 7. O que mudou no nome do backup?
Agora o arquivo tem o nome fixo `BackupDiarioTrader-DD-MM-AAAA.enc` (ex: `BackupDiarioTrader-24-02-2026.enc`), facilitando a organização.

#### 8. Ainda posso configurar metas e drawdown?
Sim, mas agora isso é feito dentro de cada conta. Ao criar ou editar uma conta, você define todos os parâmetros. O botão "Configurar Metas" foi removido.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 📞 Suporte e Comunidade

<span id="suporte-e-comunidade"></span>

### Canais de Ajuda

#### WhatsApp Imediato
**Número:** [(99) 9 8444-7141](https://wa.me/5599984447141)
- Resposta em até 2 horas úteis
- Ajuda com instalação e configuração
- Suporte técnico gratuito

#### Email para Assuntos Formais
**Endereço:** [natal.santiago.tech@gmail.com](mailto:natal.santiago.tech@gmail.com)
- Relatórios de bugs
- Sugestões de features
- Parcerias comerciais
- Consultoria avançada

### Tipos de Suporte

#### Gratuito (Para Todos)
✅ Instalação básica
✅ Configuração inicial
✅ Dúvidas sobre parâmetros
✅ Solução de erros comuns

#### Premium (Consultoria)
🔧 Otimização personalizada para seu perfil
🎯 Desenvolvimento de estratégias customizadas
📊 Análise mensal de performance
🤝 Mentoria individualizada

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 🤝 Como Contribuir

<span id="como-contribuir"></span>

O projeto é open-source e aceita contribuições em:

### Áreas Prioritárias
1. **Novas funcionalidades** (ex: importação de arquivos CSV de corretoras)
2. **Melhorias** nos gráficos e métricas
3. **Testes** em diferentes navegadores
4. **Documentação** e tutoriais
5. **Traduções** para outros idiomas

### Processo de Contribuição
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas alterações
4. Push para a branch
5. Abra um Pull Request

### Diretrizes
- Mantenha código comentado em português
- Siga o estilo existente
- Teste antes de submeter
- Atualize documentação se necessário

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 📄 Licença

<span id="licenca"></span>

### MIT License

```
Copyright (c) 2026 SantiagoTECH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 💖 Apoie o Projeto

<span id="apoie-o-projeto"></span>

### Por Que Apoiar?
Este projeto é desenvolvido gratuitamente para a comunidade. Seu apoio ajuda:

1. **Manter desenvolvimento ativo**
2. **Adicionar novas funcionalidades**
3. **Oferecer suporte gratuito**
4. **Criar conteúdo educativo**
5. **Melhorar estabilidade do sistema**

### Como Apoiar

#### 1. Doação via PIX (Recomendado)

<div align="center">

### 💰 Doação via PIX

**Chave PIX (CPF):** `523.741.143-68`

**Nome:** Natal de Jesus da Silva Santiago

![QR Code PIX](qrcode_pix.png)

**Chave PIX (copia e cola):**  
`523.741.143-68`

*Escaneie o QR Code acima ou use a chave PIX*

</div>

#### 2. Outras Formas de Apoio
- ⭐ **Dê uma estrela no GitHub**
- 📢 **Compartilhe com outros traders**
- 🐛 **Reporte bugs e sugira melhorias**
- 📝 **Contribua com código ou documentação**

### Transparência
Todo valor recebido é reinvestido:
- **50%:** Desenvolvimento de novas features
- **30%:** Infraestrutura (domínios, VPS para testes)
- **20%:** Conteúdo educativo e suporte

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 🔄 Histórico de Versões

<span id="historico-de-versoes"></span>

### v2.0 (Atual) - Múltiplas Contas com IndexedDB
- ✅ **IndexedDB** como banco de dados local (persistente, assíncrono, alta capacidade)
- ✅ **Gerenciamento de múltiplas contas** (criar, editar, excluir, selecionar)
- ✅ Seletor de contas na interface principal
- ✅ Backup único contendo **todas as contas**
- ✅ Moeda padrão **U$** com formatação brasileira
- ✅ Nome do backup fixo com data `BackupDiarioTrader-DD-MM-AAAA.enc`
- ✅ Persistência da última conta acessada
- ✅ Remoção do botão "Configurar Metas" (agora dentro de cada conta)
- ✅ Todas as funcionalidades da v1.0 mantidas

### v1.0 - Primeira Versão Estável (legado, com localStorage)
- ✅ Interface completa com cards e lista de trades
- ✅ Configuração de metas e limites de drawdown
- ✅ Cálculo de drawdown estático/dinâmico e diário
- ✅ Dashboard com 3 gráficos
- ✅ Backup criptografado com AES
- ✅ Impressão de listas e trades individuais
- ✅ Upload de imagens via Ctrl+V
- ✅ Temas claro/escuro
- ✅ Filtros por período e status

### Próximas Versões (planejadas)
- **v2.1** - Exportação para CSV/Excel
- **v2.2** - Estatísticas avançadas (Sharpe, drawdown por período)
- **v2.3** - Sincronização com nuvem (opcional)
- **v3.0** - Versão mobile nativa

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

<div align="center">

## 🚀 Comece Agora!

**[⬇️ BAIXAR VERSÃO 2.0](https://github.com/NatalSantiago/DiarioTrader/releases/latest)**

### Fluxo Recomendado:
1. **Baixe** o arquivo `diario-trader.html`
2. **Abra** no navegador
3. **Crie** suas contas
4. **Registre** seus trades
5. **Acompanhe** suas métricas
6. **Faça backup** regularmente

### 📞 Precisa de Ajuda?
**WhatsApp:** [(99) 9 8444-7141](https://wa.me/5599984447141)  
**Email:** [natal.santiago.tech@gmail.com](mailto:natal.santiago.tech@gmail.com)

---

⭐ **Se este projeto te ajudar, dê uma estrela no GitHub!**  
💖 **Apoie o desenvolvimento via PIX: 523.741.143-68**

**Desenvolvido com ❤️ por SantiagoTECH para a comunidade brasileira**

📈 **Registre, Analise, Evolua!**

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

</div>
