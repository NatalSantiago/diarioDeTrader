# 📓 Diário de Trader - Sistema Completo de Gerenciamento de Trades

<div align="center">
<span id="diario-de-trader---sistema-completo-de-gerenciamento-de-trades"></span>

# 📊 Diário de Trader - Versão 1.0 - Dashboard Inteligente

**Sistema Web Completo para Registro e Análise de Performance de Trading**

*"Registre, analise e evolua com seu diário de trading profissional"*

<img src="LogoDiario.png" width="300" height="300" alt="Logo Diário de Trader">

---

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF4088?style=for-the-badge)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![CryptoJS](https://img.shields.io/badge/CryptoJS-000000?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Version](https://img.shields.io/badge/Version-1.0-brightgreen)

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

O **Diário de Trader** é uma aplicação web completa e intuitiva para traders registrarem, acompanharem e analisarem todas as suas operações. Desenvolvido com HTML5, CSS3 e JavaScript puro, ele roda diretamente no navegador, sem necessidade de servidor ou banco de dados. Todos os dados são armazenados localmente no seu computador (via `localStorage`) e podem ser criptografados para backup.

### Principais Diferenciais:
- **Interface moderna** com tema claro/escuro
- **Cálculo automático** de meta, drawdown estático/dinâmico e drawdown diário
- **Gráficos interativos** com Chart.js (evolução do saldo, resultados, drawdown diário)
- **Sistema de filtros** por período e status
- **Backup criptografado** com AES
- **Impressão profissional** de listas e relatórios individuais
- **Upload de imagens** via Ctrl+V para documentar entradas e saídas

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## ✨ Funcionalidades Principais

<span id="funcionalidades-principais"></span>

### Para o Trader

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
| **💰 Saldo Inicial** | Capital definido nas configurações |
| **🎯 Meta** | Percentual de lucro desejado, com indicador visual de atingimento |
| **📉 Drawdown Máx** | Maior perda percentual (estática ou dinâmica, configurável) |
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

- **Filtro por período:** Todos, esta semana, este mês ou personalizado
- **Filtro por status:** Abertos, Fechados, Positivos, Negativos
- **Impressão da lista** com resumo e tabela detalhada
- **Impressão individual** de cada trade, incluindo imagens

### Dashboard Gráfico

- **📈 Evolução do Saldo** (linha)
- **🥧 Resultados** (pizza)
- **📉 Drawdown Diário** (linha contínua com todos os dias desde o primeiro trade)

### Segurança e Backup

- **Backup criptografado** com AES (extensão `.enc`)
- **Restauração segura** com validação
- **Persistência local** via `localStorage`

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
│  │   Interface │  │  Lógica de  │  │  Armazenamento      │ │
│  │    HTML/CSS │  │   Cálculo   │  │   localStorage      │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│         │               │                     │            │
│         ▼               ▼                     ▼            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    JavaScript                        │   │
│  │  (SweetAlert2, Chart.js, CryptoJS, módulos próprios)│   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

```
1. Usuário lança/edita trade via modal
2. Dados são validados e armazenados no localStorage
3. Métricas são recalculadas e exibidas
4. Lista de trades é renderizada com filtros
5. Gráficos do dashboard são atualizados
6. Backups podem ser gerados/restaurados
```

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 🚀 Como Começar a Usar

<span id="como-comecar-a-usar"></span>

### 📋 Pré-requisitos

<span id="pre-requisitos"></span>

- **Navegador moderno** (Chrome, Firefox, Edge, Opera)
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

Ao abrir o sistema pela primeira vez, você verá valores padrão. Para configurar sua conta:

1. Clique no botão **⚙️ Configurar Metas** (topo direito)
2. Preencha:
   - **Saldo Inicial** (ex: 5000)
   - **Meta de Lucro (%)** (ex: 10)
   - **Tipo de Drawdown Máximo**: Estático (baseado no capital inicial) ou Dinâmico (baseado no pico de equity)
   - **Drawdown Máximo (%)**: limite de perda (ex: 7)
   - **Limite de Drawdown Diário (%)**: ex: 2
3. Clique em **Salvar**

Pronto! O sistema está configurado para sua conta.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## 📖 Tutorial de Uso

<span id="tutorial-de-uso"></span>

### 🎮 Lançando um Trade

<span id="lancando-um-trade"></span>

1. Clique no botão **🚀 Lançar Trade**
2. Preencha os dados da operação:
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
   - **Valor (R$)**: valor em reais do resultado
   - **Data/Hora**: data/hora do fechamento
   - **Imagem Fechamento**: cole print (opcional)
   - **Observações Fechamento**
   - **Sentimento no fechamento**

3. Clique em **💾 Salvar Trade**

O trade aparecerá na lista e as métricas serão atualizadas.

### 📈 Editando ou Fechando um Trade

<span id="editando-ou-fechando-um-trade"></span>

- **Para editar/ver detalhes:** clique em **👁️ Editar/Ver** no trade desejado. O mesmo modal será aberto com os dados atuais.
- **Para fechar um trade aberto:** clique em **🔒 Fechar** (abre o modal com foco na seção de fechamento).
- **Para excluir:** clique em **🗑️ Excluir** (confirme a ação).

### 📊 Visualizando o Dashboard

<span id="visualizando-o-dashboard"></span>

Clique no botão **📊 Dashboard** (topo direito). Será aberto um modal com:

- **Estatísticas rápidas**: Total de trades, Win Rate, Lucro Líquido, Profit Factor
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
- **Drawdown Diário**: maior queda intradiária (menor saldo do dia em relação ao saldo de abertura). Exibido com sinal de menos (ex: `-3.1%`) e ícone ⚠️ se ultrapassar o limite configurado.

### 📅 Filtros e Impressão

<span id="filtros-e-impressao"></span>

- Use os filtros na barra superior para visualizar trades de um período específico ou com determinado status.
- Clique em **🖨️ Imprimir** para gerar um relatório completo da lista filtrada, com resumo e tabela.
- Na visualização individual de um trade, há o botão **🖨️ Imprimir** para gerar um relatório detalhado com todas as informações e imagens.

### 💾 Backup e Restauração

<span id="backup-e-restauracao"></span>

- **💾 Backup**: gera um arquivo `.enc` com todos os trades e configurações, criptografado com AES.
- **📂 Restaurar**: selecione o arquivo de backup. O sistema descriptografa e substitui os dados atuais.

> ⚠️ **Atenção**: a restauração substitui todos os dados existentes.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## ⚙️ Explicação dos Cálculos

<span id="explicacao-dos-calculos"></span>

### 🎯 Meta de Lucro

<span id="meta-de-lucro"></span>

```
Meta em R$ = Saldo Inicial × (Meta % / 100)
Lucro Atual = Saldo Atual - Saldo Inicial
Falta = Máximo(0, Meta em R$ - Lucro Atual)
Percentual de Falta = (Falta / Saldo Inicial) × 100
```

Quando `Lucro Atual >= Meta em R$`, o card muda para verde e exibe "Meta atingida!".

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
- **Limites e metas**: altere via interface de configuração.
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

### Logs e Depuração

O sistema não possui logs visíveis, mas você pode abrir o console do navegador (F12) para ver possíveis erros.

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

## ❓ Perguntas Frequentes

<span id="perguntas-frequentes"></span>

#### 1. Os dados ficam salvos onde?
Todos os dados ficam no `localStorage` do seu navegador. Eles persistem mesmo após fechar a aba, mas **não são transferidos para outro computador** a menos que você use o backup.

#### 2. Posso usar em vários dispositivos?
Sim, desde que você transfira o arquivo de backup e restaure no outro dispositivo.

#### 3. O que acontece se eu limpar os dados do navegador?
Os dados do `localStorage` serão apagados. Faça backup regularmente.

#### 4. É possível exportar para Excel?
Atualmente não, mas você pode imprimir a lista e copiar os dados da tabela.

#### 5. O sistema funciona offline?
Sim, após o primeiro carregamento (quando as bibliotecas CDN são baixadas), você pode usar offline, desde que o navegador mantenha o cache.

#### 6. Posso alterar a chave de criptografia do backup?
A chave está fixa no código (`ENCRYPTION_KEY`). Se desejar, pode alterar no arquivo HTML, mas todos os backups antigos se tornarão inválidos.

#### 7. O drawdown diário considera o menor saldo do dia?
Sim! O sistema simula o saldo após cada trade e registra o menor valor atingido durante o dia.

#### 8. Qual a diferença entre drawdown estático e dinâmico?
- **Estático**: mede a perda em relação ao capital inicial (nunca se recupera, mesmo que o saldo suba).
- **Dinâmico**: mede a queda em relação ao maior valor já atingido (pico).

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

### v1.0 (Atual) - Primeira Versão Estável
- ✅ Interface completa com cards e lista de trades
- ✅ Configuração de metas e limites de drawdown
- ✅ Cálculo de drawdown estático/dinâmico e diário
- ✅ Dashboard com 3 gráficos
- ✅ Backup criptografado com AES
- ✅ Impressão de listas e trades individuais
- ✅ Upload de imagens via Ctrl+V
- ✅ Temas claro/escuro
- ✅ Filtros por período e status

### Próximas Versões
- **v1.1** - Exportação para CSV/Excel
- **v1.2** - Múltiplas contas
- **v1.3** - Estatísticas avançadas (Sharpe, drawdown por período)
- **v2.0** - Versão mobile nativa

[⬆ Voltar ao Topo](#diario-de-trader---sistema-completo-de-gerenciamento-de-trades)

---

<div align="center">

## 🚀 Comece Agora!

**[⬇️ BAIXAR VERSÃO 1.0](https://github.com/NatalSantiago/DiarioTrader/releases/latest)**

### Fluxo Recomendado:
1. **Baixe** o arquivo `diario-trader.html`
2. **Abra** no navegador
3. **Configure** sua conta
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
