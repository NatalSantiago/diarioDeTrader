(function() {
    // ========== TEMA ==========
    const themeBtns = document.querySelectorAll('.theme-btn');
    const body = document.body;
    const savedTheme = localStorage.getItem('traderTheme') || 'dark';
    body.classList.toggle('light-theme', savedTheme === 'light');
    themeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === savedTheme);
    });
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            body.classList.toggle('light-theme', theme === 'light');
            localStorage.setItem('traderTheme', theme);
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ========== CONFIGURAÇÕES INICIAIS ==========
    const CONFIG_KEY = 'traderConfig';
    let config = {
        saldoInicial: 10000,
        metaPercent: 10,
        ddTipo: 'estatico',
        ddMax: 7,
        ddDiarioLimite: 2
    };

    function carregarConfig() {
        const saved = localStorage.getItem(CONFIG_KEY);
        if (saved) {
            try {
                config = JSON.parse(saved);
            } catch (e) {}
        }
        atualizarLabelsConfig();
    }

    function salvarConfig() {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
        atualizarLabelsConfig();
        atualizarMetricas();
    }

    function atualizarLabelsConfig() {
        document.getElementById('metaPercentLabel').innerText = config.metaPercent + '%';
        document.getElementById('ddMaxLabel').innerText = config.ddMax + '%';
        document.getElementById('ddDiarioLimite').innerText = config.ddDiarioLimite + '%';
    }

    // ========== FUNÇÃO PARA OBTER DATA LOCAL NO FORMATO YYYY-MM-DD ==========
    function getLocalDateString() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // ========== CONFIG MODAL (compacto) ==========
    document.getElementById('configButton').addEventListener('click', () => {
        Swal.fire({
            title: 'Configurações da Conta',
            customClass: { popup: 'config-swal' },
            html: `
                <div class="config-grid">
                    <div class="config-row">
                        <div class="field-group">
                            <label>Saldo Inicial (US$)</label>
                            <input id="swal-input1" class="swal2-input" placeholder="Ex: 10000" value="${config.saldoInicial}">
                        </div>
                        <div class="field-group">
                            <label>Meta de Lucro (%)</label>
                            <input id="swal-input2" class="swal2-input" placeholder="Ex: 10" value="${config.metaPercent}">
                        </div>
                    </div>
                    <div class="config-row">
                        <div class="field-group">
                            <label>Tipo de Drawdown Máximo</label>
                            <select id="swal-input3" class="swal2-select">
                                <option value="estatico" ${config.ddTipo === 'estatico' ? 'selected' : ''}>Estático (baseado no capital inicial)</option>
                                <option value="dinamico" ${config.ddTipo === 'dinamico' ? 'selected' : ''}>Dinâmico (baseado no pico de equity)</option>
                            </select>
                        </div>
                        <div class="field-group">
                            <label>Limite de Drawdown Máx (%)</label>
                            <input id="swal-input4" class="swal2-input" placeholder="Ex: 7" value="${config.ddMax}">
                        </div>
                    </div>
                    <div class="config-row config-full">
                        <div class="field-group">
                            <label>Limite de Drawdown Diário (%)</label>
                            <input id="swal-input5" class="swal2-input" placeholder="Ex: 2" value="${config.ddDiarioLimite}">
                        </div>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            width: '500px',
            preConfirm: () => {
                const novoSaldo = parseFloat(document.getElementById('swal-input1').value);
                const novaMeta = parseFloat(document.getElementById('swal-input2').value);
                const novoTipo = document.getElementById('swal-input3').value;
                const novoDdMax = parseFloat(document.getElementById('swal-input4').value);
                const novoDdDiario = parseFloat(document.getElementById('swal-input5').value);
                if (isNaN(novoSaldo) || isNaN(novaMeta) || isNaN(novoDdMax) || isNaN(novoDdDiario)) {
                    Swal.showValidationMessage('Os campos numéricos devem ser preenchidos corretamente');
                    return false;
                }
                return { saldo: novoSaldo, meta: novaMeta, tipo: novoTipo, ddMax: novoDdMax, ddDiario: novoDdDiario };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                config.saldoInicial = result.value.saldo;
                config.metaPercent = result.value.meta;
                config.ddTipo = result.value.tipo;
                config.ddMax = result.value.ddMax;
                config.ddDiarioLimite = result.value.ddDiario;
                salvarConfig();
                Swal.fire('Configurações salvas!', '', 'success');
            }
        });
    });

    // ========== DASHBOARD MODAL ==========
    let chartEvolucao, chartPizza, chartDrawdown; // referências para os gráficos

    document.getElementById('dashboardButton').addEventListener('click', () => {
        abrirDashboard();
    });

    function abrirDashboard() {
        // Filtrar apenas trades fechados para os gráficos
        const tradesFechados = trades.filter(t => t.fechadoCom);
        
        // Calcular estatísticas
        const totalTrades = tradesFechados.length;
        const lucros = tradesFechados.filter(t => t.fechadoCom === 'Lucro');
        const prejuizos = tradesFechados.filter(t => t.fechadoCom === 'Prejuizo');
        const totalLucro = lucros.reduce((acc, t) => acc + (t.valor || 0), 0);
        const totalPrejuizo = prejuizos.reduce((acc, t) => acc + (t.valor || 0), 0);
        const lucroLiquido = totalLucro - totalPrejuizo;
        const winRate = totalTrades ? (lucros.length / totalTrades * 100).toFixed(1) : 0;
        const profitFactor = totalPrejuizo > 0 ? (totalLucro / totalPrejuizo).toFixed(2) : totalLucro > 0 ? '∞' : '0';

        // Dados para gráfico de pizza
        const pizzaData = {
            labels: ['Lucros', 'Prejuízos'],
            datasets: [{
                data: [lucros.length, prejuizos.length],
                backgroundColor: ['#10b981', '#ef4444'],
                borderColor: ['#059669', '#b91c1c'],
                borderWidth: 1
            }]
        };

        // ========== CORREÇÃO: GRÁFICO DE EVOLUÇÃO DO SALDO COM PONTO INICIAL ==========
        const tradesOrdenados = [...tradesFechados].sort((a, b) => new Date(a.dataEntrada) - new Date(b.dataEntrada));
        let saldoCorrente = config.saldoInicial;
        const evolucao = [];
        
        // Adiciona o ponto inicial (saldo inicial) com a data do primeiro trade ou data atual
        if (tradesOrdenados.length > 0) {
            evolucao.push({ data: tradesOrdenados[0].dataEntrada.slice(0,10), saldo: config.saldoInicial });
        } else {
            evolucao.push({ data: getLocalDateString(), saldo: config.saldoInicial });
        }
        
        tradesOrdenados.forEach(t => {
            if (t.fechadoCom === 'Lucro') saldoCorrente += t.valor;
            else saldoCorrente -= t.valor;
            evolucao.push({ data: t.dataEntrada ? t.dataEntrada.slice(0,10) : '', saldo: saldoCorrente });
        });
        
        const datasEvolucao = evolucao.map(e => e.data);
        const saldosEvolucao = evolucao.map(e => e.saldo);

        // ========== CÁLCULO DO DRAWDOWN DIÁRIO (LINHA CONTÍNUA) ==========
        // Obter todas as datas desde o primeiro trade até hoje
        const diasComTrades = tradesFechados.map(t => t.dataEntrada.slice(0,10)).filter((v, i, a) => a.indexOf(v) === i).sort();
        let datasDrawdown = [];
        let valoresDrawdown = [];

        if (diasComTrades.length > 0) {
            // Encontrar primeira e última data
            const primeiraData = new Date(diasComTrades[0]);
            const ultimaData = new Date(); // hoje
            primeiraData.setHours(0,0,0,0);
            ultimaData.setHours(0,0,0,0);
            
            // Gerar todas as datas no intervalo
            const todasDatas = [];
            const currentDate = new Date(primeiraData);
            while (currentDate <= ultimaData) {
                todasDatas.push(currentDate.toISOString().slice(0,10));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            // Mapear trades por dia para acesso rápido
            const tradesPorDia = {};
            tradesFechados.forEach(t => {
                const dia = t.dataEntrada.slice(0,10);
                if (!tradesPorDia[dia]) tradesPorDia[dia] = [];
                tradesPorDia[dia].push(t);
            });

            // Calcular saldo acumulado dia a dia
            let saldoAcumulado = config.saldoInicial;
            
            todasDatas.forEach(dia => {
                const tradesDia = tradesPorDia[dia] || [];
                // Ordenar trades do dia por data/hora
                tradesDia.sort((a, b) => new Date(a.dataEntrada) - new Date(b.dataEntrada));
                
                // Simular saldo ao longo do dia para achar o menor valor
                let saldoCorrenteDia = saldoAcumulado;
                let menorSaldoDia = saldoAcumulado;
                
                tradesDia.forEach(t => {
                    if (t.fechadoCom === 'Lucro') saldoCorrenteDia += t.valor;
                    else if (t.fechadoCom === 'Prejuizo') saldoCorrenteDia -= t.valor;
                    if (saldoCorrenteDia < menorSaldoDia) menorSaldoDia = saldoCorrenteDia;
                });
                
                // Drawdown diário: perda percentual máxima do dia
                let ddDia = 0;
                if (menorSaldoDia < saldoAcumulado) {
                    ddDia = ((saldoAcumulado - menorSaldoDia) / saldoAcumulado) * 100;
                }
                
                datasDrawdown.push(dia);
                valoresDrawdown.push(ddDia);
                
                // Atualizar saldo acumulado para o próximo dia
                saldoAcumulado = saldoCorrenteDia;
            });
        }

        // Montar HTML do modal com novo layout
        const modalHtml = `
            <div style="max-height: 80vh; overflow-y: auto; padding: 0.5rem;">
                <div class="dashboard-print-btn">
                    <button class="modal-btn-print" id="dashboard-imprimir">🖨️ Imprimir Dashboard</button>
                </div>
                <div class="dashboard-stats">
                    <div class="stat-item">
                        <div class="stat-value">${totalTrades}</div>
                        <div class="stat-label">Total Trades</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${winRate}%</div>
                        <div class="stat-label">Win Rate</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">R$ ${lucroLiquido.toFixed(2)}</div>
                        <div class="stat-label">Lucro Líquido</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${profitFactor}</div>
                        <div class="stat-label">Profit Factor</div>
                    </div>
                </div>
                <div class="dashboard-grid" style="grid-template-columns: 1fr;">
                    <!-- Primeira linha: Evolução do Saldo ocupa toda a largura -->
                    <div class="dashboard-card">
                        <h3>📈 Evolução do Saldo</h3>
                        <div class="dashboard-chart-container">
                            <canvas id="chart-evolucao"></canvas>
                        </div>
                    </div>
                    <!-- Segunda linha: Resultados e Drawdown Diário lado a lado, dentro do mesmo card -->
                    <div class="dashboard-card">
                        <div class="dashboard-row-split">
                            <div>
                                <h3>🥧 Resultados</h3>
                                <div class="dashboard-chart-container">
                                    <canvas id="chart-pizza"></canvas>
                                </div>
                            </div>
                            <div>
                                <h3>📉 Drawdown Diário</h3>
                                <div class="dashboard-chart-container">
                                    <canvas id="chart-drawdown"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        Swal.fire({
            title: '📊 Dashboard de Performance',
            html: modalHtml,
            showConfirmButton: true,
            confirmButtonText: 'Fechar',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            customClass: { popup: 'dashboard-modal' },
            didOpen: () => {
                // Criar gráficos
                const ctxEvolucao = document.getElementById('chart-evolucao').getContext('2d');
                chartEvolucao = new Chart(ctxEvolucao, {
                    type: 'line',
                    data: {
                        labels: datasEvolucao,
                        datasets: [{
                            label: 'Saldo (R$)',
                            data: saldosEvolucao,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.1,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: { beginAtZero: false, grid: { color: 'rgba(255,255,255,0.1)' } },
                            x: { grid: { display: false } }
                        }
                    }
                });

                const ctxPizza = document.getElementById('chart-pizza').getContext('2d');
                chartPizza = new Chart(ctxPizza, {
                    type: 'doughnut',
                    data: pizzaData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: false,
                        plugins: {
                            legend: { position: 'bottom', labels: { color: 'var(--text-primary)' } }
                        }
                    }
                });

                const ctxDrawdown = document.getElementById('chart-drawdown').getContext('2d');
                chartDrawdown = new Chart(ctxDrawdown, {
                    type: 'line',
                    data: {
                        labels: datasDrawdown,
                        datasets: [{
                            label: 'Drawdown Diário (%)',
                            data: valoresDrawdown,
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            tension: 0.1,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
                            x: { grid: { display: false } }
                        }
                    }
                });

                // Forçar renderização
                chartEvolucao.update();
                chartPizza.update();
                chartDrawdown.update();

                // Botão de impressão dentro do modal
                document.getElementById('dashboard-imprimir').addEventListener('click', () => {
                    // Pequeno delay para garantir que os gráficos estejam renderizados
                    setTimeout(() => {
                        imprimirDashboard(
                            totalTrades, winRate, lucroLiquido, profitFactor,
                            datasEvolucao, saldosEvolucao,
                            lucros.length, prejuizos.length,
                            datasDrawdown, valoresDrawdown
                        );
                    }, 300);
                });
            }
        });
    }

    function imprimirDashboard(totalTrades, winRate, lucroLiquido, profitFactor, datasEvolucao, saldosEvolucao, totalLucro, totalPrejuizo, datasDrawdown, valoresDrawdown) {
        // Gerar imagens dos gráficos via toDataURL
        const evolucaoURL = chartEvolucao.toBase64Image();
        const pizzaURL = chartPizza.toBase64Image();
        const drawdownURL = chartDrawdown.toBase64Image();

        const estilo = `
            <style>
                @page { size: landscape; margin: 0.8cm; }
                body { font-family: 'Inter', sans-serif; padding: 0; color: #000; background: #fff; margin: 0; font-size: 12px; }
                h1 { color: #2563eb; margin-bottom: 0.3rem; font-size: 1.5rem; text-align: center; }
                .stats-grid { display: flex; gap: 1rem; justify-content: center; margin-bottom: 0.5rem; flex-wrap: wrap; }
                .stat-item { text-align: center; min-width: 100px; }
                .stat-value { font-size: 1.2rem; font-weight: 600; color: #2563eb; }
                .stat-label { font-size: 0.6rem; text-transform: uppercase; color: #4b5563; }
                .chart-row { display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-bottom: 0.5rem; }
                .chart-box { flex: 1 1 300px; text-align: center; }
                .chart-box img { max-width: 100%; height: auto; max-height: 150px; object-fit: contain; }
                .footer { margin-top: 0.5rem; text-align: right; color: #6b7280; font-size: 0.6rem; }
            </style>
        `;

        // Novo layout para impressão: primeiro gráfico de evolução em linha única, depois resultados e drawdown lado a lado
        const html = `
            <!DOCTYPE html>
            <html>
            <head><title>Dashboard de Performance</title>${estilo}</head>
            <body>
                <h1>📊 Dashboard de Performance</h1>
                <div class="stats-grid">
                    <div class="stat-item"><div class="stat-value">${totalTrades}</div><div class="stat-label">Total Trades</div></div>
                    <div class="stat-item"><div class="stat-value">${winRate}%</div><div class="stat-label">Win Rate</div></div>
                    <div class="stat-item"><div class="stat-value">R$ ${lucroLiquido.toFixed(2)}</div><div class="stat-label">Lucro Líquido</div></div>
                    <div class="stat-item"><div class="stat-value">${profitFactor}</div><div class="stat-label">Profit Factor</div></div>
                </div>

                <!-- Primeira linha: Evolução do Saldo ocupando toda largura -->
                <div class="chart-row">
                    <div class="chart-box" style="flex: 1 1 100%;">
                        <h3>📈 Evolução do Saldo</h3>
                        <img src="${evolucaoURL}" alt="Evolução do Saldo" style="max-height: 160px;">
                    </div>
                </div>

                <!-- Segunda linha: Resultados e Drawdown lado a lado -->
                <div class="chart-row">
                    <div class="chart-box">
                        <h3>🥧 Resultados</h3>
                        <img src="${pizzaURL}" alt="Resultados">
                    </div>
                    <div class="chart-box">
                        <h3>📉 Drawdown Diário</h3>
                        <img src="${drawdownURL}" alt="Drawdown Diário">
                    </div>
                </div>

                <div class="footer">
                    Gerado em ${new Date().toLocaleString('pt-BR')}
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(html);
        printWindow.document.close();
        
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
        };
    }

    // ========== ESTADO GLOBAL ==========
    const STORAGE_KEY = 'traderDiarioTrades';
    let trades = [];
    let filtroPeriodo = 'hoje'; // padrão alterado para 'hoje'
    let filtroStatus = 'todos';
    let dataInicioFiltro = '';
    let dataFimFiltro = '';

    const ENCRYPTION_KEY = 'trader-diary-secret-key-2026';

    // Elementos DOM
    const saldoInicialEl = document.getElementById('saldoInicial');
    const metaFaltaEl = document.getElementById('metaFalta');
    const progressMetaEl = document.getElementById('progressMeta');
    const ddMaxEl = document.getElementById('ddMax');
    const ddMaxStatus = document.getElementById('ddMaxStatus');
    const totalPosEl = document.getElementById('totalPos');
    const totalNegEl = document.getElementById('totalNeg');
    const tradesHojeEl = document.getElementById('tradesHoje');
    const ddDiarioEl = document.getElementById('ddDiario');
    const posHojeEl = document.getElementById('posHoje');
    const negHojeEl = document.getElementById('negHoje');
    const saldoAtualEl = document.getElementById('saldoAtual');
    const filtroPeriodoSelect = document.getElementById('filtroPeriodo');
    const filtroStatusSelect = document.getElementById('filtroStatus');
    const dataInicioGroup = document.getElementById('dataInicioGroup');
    const dataFimGroup = document.getElementById('dataFimGroup');
    const dataInicio = document.getElementById('dataInicio');
    const dataFim = document.getElementById('dataFim');
    const filtroDescricao = document.getElementById('filtroDescricao');

    // Elementos do card de meta
    const metaCard = document.getElementById('metaCard');
    const metaStatusText = document.getElementById('metaStatusText');
    const metaPercentLabel = document.getElementById('metaPercentLabel');

    // Elemento do badge de drawdown diário
    const dailyDrawdownBadge = document.getElementById('dailyDrawdownBadge');

    // ========== FUNÇÕES AUXILIARES ==========
    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // ========== FORMATAÇÃO POR PAR DE MOEDAS ==========
    function getFormatConfig(par) {
        const formatos = {
            'EURUSD': { decimals: 5, step: 0.00001 },
            'USDCHF': { decimals: 5, step: 0.00001 },
            'GBPUSD': { decimals: 5, step: 0.00001 },
            'NZDUSD': { decimals: 5, step: 0.00001 },
            'AUDUSD': { decimals: 5, step: 0.00001 },
            'USDCAD': { decimals: 5, step: 0.00001 },
            'CADUSD': { decimals: 5, step: 0.00001 },
            'USDJPY': { decimals: 3, step: 0.001 },
            'XAUUSD': { decimals: 2, step: 0.01 },
            'XAGUSD': { decimals: 3, step: 0.001 },
            'BTCUSD': { decimals: 2, step: 0.01 },
            'ETHUSD': { decimals: 2, step: 0.01 }
        };
        return formatos[par] || { decimals: 5, step: 0.00001 };
    }

    function formatPriceValue(value, par) {
        if (value === '' || value === null || isNaN(value)) return '';
        const config = getFormatConfig(par);
        return Number(value).toFixed(config.decimals);
    }

    // ========== FUNÇÃO DE IMPRESSÃO DA LISTA (iframe) ==========
    function imprimirLista() {
        const listaFiltrada = filtrarTrades();
        
        const estilo = `
            <style>
                body { font-family: 'Inter', sans-serif; padding: 2rem; color: #000; background: #fff; }
                h1 { color: #2563eb; margin-bottom: 1rem; font-size: 2rem; }
                h2 { color: #1e293b; margin-top: 2rem; }
                table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                th { background: #2563eb; color: white; padding: 0.75rem; text-align: left; }
                td { padding: 0.75rem; border-bottom: 1px solid #e2e8f0; }
                .lucro { color: #10b981; font-weight: 600; }
                .prejuizo { color: #ef4444; font-weight: 600; }
                .aberto { color: #f59e0b; }
                .fechado { color: #10b981; }
                .resumo { background: #f8fafc; padding: 1rem; border-radius: 0.5rem; margin-bottom: 2rem; }
                .resumo-item { display: inline-block; margin-right: 2rem; }
                .print-header { display: flex; justify-content: space-between; align-items: center; }
            </style>
        `;

        // Calcular resumo
        const totalLucro = listaFiltrada.filter(t => t.fechadoCom === 'Lucro').length;
        const totalPrejuizo = listaFiltrada.filter(t => t.fechadoCom === 'Prejuizo').length;
        const totalAbertos = listaFiltrada.filter(t => !t.fechadoCom).length;
        const somaValores = listaFiltrada.reduce((acc, t) => {
            if (t.fechadoCom === 'Lucro') return acc + (t.valor || 0);
            if (t.fechadoCom === 'Prejuizo') return acc - (t.valor || 0);
            return acc;
        }, 0);

        // Gerar HTML da tabela (incluindo coluna Lote)
        let tabelaHtml = '';
        listaFiltrada.forEach(t => {
            const status = !t.fechadoCom ? '<span class="aberto">⏳ Aberto</span>' : 
                          (t.fechadoCom === 'Lucro' ? '<span class="lucro">✅ Lucro</span>' : '<span class="prejuizo">❌ Prejuízo</span>');
            const valor = t.fechadoCom ? `R$ ${t.valor?.toFixed(2) || '0,00'}` : '-';
            
            tabelaHtml += `
                <tr>
                    <td>${t.moeda || '-'}</td>
                    <td>${t.dataEntrada ? t.dataEntrada.replace('T', ' ') : '-'}</td>
                    <td>${t.tipoEntrada || '-'}</td>
                    <td>${t.precoEntrada || '-'}</td>
                    <td>${t.stopLoss || '-'}</td>
                    <td>${t.takeProfit || '-'}</td>
                    <td>${t.lote || '-'}</td>
                    <td>${status}</td>
                    <td>${valor}</td>
                    <td>${t.sentimentoAbertura || '-'} → ${t.sentimentoFechamento || '-'}</td>
                </tr>
            `;
        });

        const html = `
            <!DOCTYPE html>
            <html>
            <head><title>Relatório de Trades</title>${estilo}</head>
            <body>
                <div class="print-header">
                    <h1>📊 Relatório de Trades</h1>
                    <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
                </div>
                
                <div class="resumo">
                    <h3>Resumo do Período</h3>
                    <div class="resumo-item"><strong>Total de trades:</strong> ${listaFiltrada.length}</div>
                    <div class="resumo-item"><strong>Lucros:</strong> ${totalLucro}</div>
                    <div class="resumo-item"><strong>Prejuízos:</strong> ${totalPrejuizo}</div>
                    <div class="resumo-item"><strong>Abertos:</strong> ${totalAbertos}</div>
                    <div class="resumo-item"><strong>Resultado líquido:</strong> R$ ${somaValores.toFixed(2)}</div>
                </div>

                <h2>Detalhamento</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Moeda</th>
                            <th>Entrada</th>
                            <th>Tipo</th>
                            <th>Preço</th>
                            <th>Stop</th>
                            <th>Target</th>
                            <th>Lote</th>
                            <th>Status</th>
                            <th>Resultado</th>
                            <th>Sentimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tabelaHtml}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        // Criar iframe temporário
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();

        iframe.onload = function() {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        };
    }

    // ========== FUNÇÃO DE IMPRESSÃO DO TRADE (nova janela) ==========
    function imprimirTrade(dados) {
        // Formatar data e hora para o título
        const agora = new Date();
        const dia = String(agora.getDate()).padStart(2, '0');
        const mes = String(agora.getMonth() + 1).padStart(2, '0');
        const ano = agora.getFullYear();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        const dataHoraStr = `${dia}/${mes}/${ano}-${horas}:${minutos}hs`;
        
        const resultado = dados.fechadoCom || 'Aberto';
        const tituloRelatorio = `${dados.moeda}-${dados.tipoEntrada}-${resultado}-${dataHoraStr}`;

        const estilo = `
            <style>
                body { font-family: 'Inter', sans-serif; padding: 0.8rem; color: #000; background: #fff; font-size: 12px; }
                h1 { color: #2563eb; margin-bottom: 0.5rem; font-size: 1.5rem; }
                h2 { color: #1e293b; margin-top: 0.8rem; margin-bottom: 0.3rem; border-bottom: 1px solid #2563eb; padding-bottom: 0.2rem; font-size: 1.2rem; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem 1rem; margin-top: 0.3rem; }
                .info-label { font-weight: 600; color: #4b5563; text-transform: uppercase; font-size: 0.7rem; }
                .info-value { font-size: 0.9rem; }
                .image-box { margin-top: 0.5rem; margin-bottom: 0.5rem; }
                .image-box img { max-width: 100%; max-height: 200px; height: auto; border: 1px solid #d1d5db; border-radius: 0.3rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .observacao { background: #f3f4f6; padding: 0.4rem; border-radius: 0.3rem; margin-top: 0.3rem; margin-bottom: 0.5rem; font-size: 0.9rem; }
                .footer { margin-top: 0.8rem; text-align: right; color: #6b7280; font-size: 0.7rem; }
            </style>
        `;

        const status = !dados.fechadoCom ? 'Aberto' : (dados.fechadoCom === 'Lucro' ? '✅ Lucro' : '❌ Prejuízo');
        const valorFormatado = dados.valor ? `R$ ${parseFloat(dados.valor).toFixed(2)}` : '-';
        const dataEntradaFormatada = dados.dataEntrada ? dados.dataEntrada.replace('T', ' ') : '-';
        const dataFechamentoFormatada = dados.dataFechamento ? dados.dataFechamento.replace('T', ' ') : '-';

        const html = `
            <!DOCTYPE html>
            <html>
            <head><title>${tituloRelatorio}</title>${estilo}</head>
            <body>
                <h1>📊 Detalhe do Trade</h1>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
                    <p><strong>Par:</strong> ${dados.moeda || '-'}</p>
                    <p><strong>Status:</strong> ${status}</p>
                </div>

                <!-- Seção Entrada -->
                <h2>Entrada</h2>
                <div class="info-grid">
                    <div><span class="info-label">Data/Hora:</span> <span class="info-value">${dataEntradaFormatada}</span></div>
                    <div><span class="info-label">Tipo:</span> <span class="info-value">${dados.tipoEntrada || '-'}</span></div>
                    <div><span class="info-label">Preço:</span> <span class="info-value">${dados.precoEntrada || '-'}</span></div>
                    <div><span class="info-label">Stop Loss:</span> <span class="info-value">${dados.stopLoss || '-'}</span></div>
                    <div><span class="info-label">Take Profit:</span> <span class="info-value">${dados.takeProfit || '-'}</span></div>
                    <div><span class="info-label">Lote:</span> <span class="info-value">${dados.lote || '-'}</span></div>
                    <div><span class="info-label">Sentimento:</span> <span class="info-value">${dados.sentimentoAbertura || '-'}</span></div>
                </div>
                
                ${dados.imgEntradaBase64 ? `
                <div class="image-box">
                    <h3 style="font-size: 1rem; margin-bottom: 0.2rem;">Imagem da Entrada</h3>
                    <img src="${dados.imgEntradaBase64}" alt="Imagem Entrada">
                </div>` : ''}
                
                <!-- Observação de abertura abaixo da imagem de entrada -->
                <div class="observacao">
                    <strong>Observação Abertura:</strong> ${dados.obsAbertura || '-'}
                </div>

                <!-- Seção Fechamento -->
                <h2>Fechamento</h2>
                <div class="info-grid">
                    <div><span class="info-label">Fechado com:</span> <span class="info-value">${dados.fechadoCom || '-'}</span></div>
                    <div><span class="info-label">Valor:</span> <span class="info-value">${valorFormatado}</span></div>
                    <div><span class="info-label">Data/Hora:</span> <span class="info-value">${dataFechamentoFormatada}</span></div>
                    <div><span class="info-label">Sentimento:</span> <span class="info-value">${dados.sentimentoFechamento || '-'}</span></div>
                </div>
                
                ${dados.imgFechamentoBase64 ? `
                <div class="image-box">
                    <h3 style="font-size: 1rem; margin-bottom: 0.2rem;">Imagem do Fechamento</h3>
                    <img src="${dados.imgFechamentoBase64}" alt="Imagem Fechamento">
                </div>` : ''}
                
                <!-- Observação de fechamento abaixo da imagem de fechamento -->
                <div class="observacao">
                    <strong>Observação Fechamento:</strong> ${dados.obsFechamento || '-'}
                </div>

                <div class="footer">
                    Documento gerado em ${new Date().toLocaleString('pt-BR')}
                </div>
            </body>
            </html>
        `;

        // Abrir uma nova janela para impressão
        const printWindow = window.open('', '_blank');
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        // A janela permanecerá aberta após a impressão; o usuário pode fechá-la
    }

    // ========== MODAL DE LANÇAMENTO/EDIÇÃO ==========
    document.getElementById('lancarTradeBtn').addEventListener('click', () => {
        abrirModalLancamento();
    });

    function abrirModalLancamento(tradeParaEditar = null, indexParaEditar = -1) {
        const isEdicao = tradeParaEditar !== null;
        const now = getCurrentDateTime();
        
        const modalHtml = `
            <div style="max-height: 70vh; overflow-y: auto; padding: 0.5rem;">
                <div class="modal-field">
                    <label>Moeda</label>
                    <select id="modal-moeda">
                        <option value="EURUSD">EURUSD</option>
                        <option value="USDJPY">USDJPY</option>
                        <option value="GBPUSD">GBPUSD</option>
                        <option value="AUDUSD">AUDUSD</option>
                        <option value="USDCAD">USDCAD</option>
                        <option value="NZDUSD">NZDUSD</option>
                        <option value="USDCHF">USDCHF</option>
                        <option value="CADUSD">CADUSD</option>
                        <option value="XAUUSD">XAUUSD (ouro)</option>
                        <option value="XAGUSD">XAGUSD (prata)</option>
                        <option value="BTCUSD">BTCUSD</option>
                        <option value="ETHUSD">ETHUSD</option>
                    </select>
                </div>
                <div class="modal-field">
                    <label>Data/Hora Entrada</label>
                    <input type="datetime-local" id="modal-dataEntrada" value="${isEdicao ? tradeParaEditar.dataEntrada || now : now}">
                </div>
                <div class="modal-field">
                    <label>Tipo entrada</label>
                    <select id="modal-tipoEntrada">
                        <option value="Compra" ${isEdicao && tradeParaEditar.tipoEntrada === 'Compra' ? 'selected' : ''}>Compra (Long)</option>
                        <option value="Venda" ${isEdicao && tradeParaEditar.tipoEntrada === 'Venda' ? 'selected' : ''}>Venda (Short)</option>
                    </select>
                </div>
                <div class="modal-row">
                    <div class="modal-field">
                        <label>Preço entrada</label>
                        <input type="number" step="any" id="modal-precoEntrada" placeholder="1.10520" value="${isEdicao ? tradeParaEditar.precoEntrada || '' : ''}">
                    </div>
                    <div class="modal-field">
                        <label>Stop Loss</label>
                        <input type="number" step="any" id="modal-stopLoss" placeholder="1.10000" value="${isEdicao ? tradeParaEditar.stopLoss || '' : ''}">
                    </div>
                </div>
                <div class="modal-row">
                    <div class="modal-field">
                        <label>Take Profit</label>
                        <input type="number" step="any" id="modal-takeProfit" placeholder="1.11000" value="${isEdicao ? tradeParaEditar.takeProfit || '' : ''}">
                    </div>
                    <div class="modal-field">
                        <label>Lote</label>
                        <input type="number" step="0.01" id="modal-lote" placeholder="Ex: 0.10" value="${isEdicao ? tradeParaEditar.lote || '' : ''}">
                    </div>
                </div>
                
                <!-- Imagem Entrada com botões limpar e ampliar -->
                <div class="modal-field">
                    <label>📸 Imagem Entrada</label>
                    <div class="modal-image-area">
                        <input type="text" id="modal-imgEntradaNome" readonly placeholder="Cole a imagem (Ctrl+V)" style="flex: 1; background: transparent; border: none;" value="${isEdicao && tradeParaEditar.imgEntradaNome ? tradeParaEditar.imgEntradaNome : ''}">
                        <img class="modal-image-preview" id="modal-previewEntrada" src="${isEdicao && tradeParaEditar.imgEntradaBase64 ? tradeParaEditar.imgEntradaBase64 : 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'%233b82f6\'%3E%3Crect width=\'24\' height=\'24\' fill=\'%232a313e\'/%3E%3Ctext x=\'4\' y=\'17\' fill=\'%23fff\' font-size=\'10\'%3E📸%3C/text%3E%3C/svg%3E'}" alt="preview">
                        <button class="clear-image-btn" id="modal-limparImgEntrada" type="button">🗑️</button>
                        <button class="zoom-image-btn" id="modal-zoomImgEntrada" type="button">🔍</button>
                    </div>
                </div>

                <div class="modal-field">
                    <label>Observações abertura</label>
                    <textarea id="modal-obsAbertura" rows="2" placeholder="notas da entrada...">${isEdicao ? tradeParaEditar.obsAbertura || '' : ''}</textarea>
                </div>

                <div class="modal-field">
                    <label>😊 Sentimento na abertura</label>
                    <select id="modal-sentimentoAbertura">
                        <option value="">-- Selecione --</option>
                        <option value="Confiança" ${isEdicao && tradeParaEditar.sentimentoAbertura === 'Confiança' ? 'selected' : ''}>Confiança</option>
                        <option value="Ansiedade" ${isEdicao && tradeParaEditar.sentimentoAbertura === 'Ansiedade' ? 'selected' : ''}>Ansiedade</option>
                        <option value="Neutro" ${isEdicao && tradeParaEditar.sentimentoAbertura === 'Neutro' ? 'selected' : ''}>Neutro</option>
                        <option value="Euforia" ${isEdicao && tradeParaEditar.sentimentoAbertura === 'Euforia' ? 'selected' : ''}>Euforia</option>
                        <option value="Medo" ${isEdicao && tradeParaEditar.sentimentoAbertura === 'Medo' ? 'selected' : ''}>Medo</option>
                        <option value="Dúvida" ${isEdicao && tradeParaEditar.sentimentoAbertura === 'Dúvida' ? 'selected' : ''}>Dúvida</option>
                    </select>
                </div>

                <div style="border-left: 3px solid var(--accent); padding-left: 1rem; margin: 1rem 0;">
                    <span style="font-weight: 600;">🔒 Fechamento</span>
                </div>

                <!-- Campos de fechamento em linha tripla -->
                <div class="modal-row-3">
                    <div class="modal-field">
                        <label>Fechado com</label>
                        <select id="modal-fechadoCom">
                            <option value="">-- Selecione --</option>
                            <option value="Lucro" ${isEdicao && tradeParaEditar.fechadoCom === 'Lucro' ? 'selected' : ''}>Lucro</option>
                            <option value="Prejuizo" ${isEdicao && tradeParaEditar.fechadoCom === 'Prejuizo' ? 'selected' : ''}>Prejuízo</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Valor (R$)</label>
                        <input type="number" step="0.01" id="modal-valorFechamento" placeholder="0.00" value="${isEdicao ? tradeParaEditar.valor || '' : ''}">
                    </div>
                    <div class="modal-field">
                        <label>Data/Hora</label>
                        <input type="datetime-local" id="modal-dataFechamento" value="${isEdicao ? tradeParaEditar.dataFechamento || '' : ''}">
                    </div>
                </div>

                <!-- Imagem Fechamento com botões limpar e ampliar -->
                <div class="modal-field">
                    <label>📸 Imagem Fechamento</label>
                    <div class="modal-image-area">
                        <input type="text" id="modal-imgFechamentoNome" readonly placeholder="Cole a imagem (Ctrl+V)" style="flex: 1; background: transparent; border: none;" value="${isEdicao && tradeParaEditar.imgFechamentoNome ? tradeParaEditar.imgFechamentoNome : ''}">
                        <img class="modal-image-preview" id="modal-previewFechamento" src="${isEdicao && tradeParaEditar.imgFechamentoBase64 ? tradeParaEditar.imgFechamentoBase64 : 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'%23ef4444\'%3E%3Crect width=\'24\' height=\'24\' fill=\'%232a313e\'/%3E%3Ctext x=\'4\' y=\'17\' fill=\'%23fff\' font-size=\'10\'%3E📸%3C/text%3E%3C/svg%3E'}" alt="preview">
                        <button class="clear-image-btn" id="modal-limparImgFechamento" type="button">🗑️</button>
                        <button class="zoom-image-btn" id="modal-zoomImgFechamento" type="button">🔍</button>
                    </div>
                </div>

                <div class="modal-field">
                    <label>Observações Fechamento</label>
                    <textarea id="modal-obsFechamento" rows="2">${isEdicao ? tradeParaEditar.obsFechamento || '' : ''}</textarea>
                </div>

                <div class="modal-field">
                    <label>😊 Sentimento no fechamento</label>
                    <select id="modal-sentimentoFechamento">
                        <option value="">-- Selecione --</option>
                        <option value="Realizado" ${isEdicao && tradeParaEditar.sentimentoFechamento === 'Realizado' ? 'selected' : ''}>Realizado</option>
                        <option value="Alívio" ${isEdicao && tradeParaEditar.sentimentoFechamento === 'Alívio' ? 'selected' : ''}>Alívio</option>
                        <option value="Frustração" ${isEdicao && tradeParaEditar.sentimentoFechamento === 'Frustração' ? 'selected' : ''}>Frustração</option>
                        <option value="Orgulho" ${isEdicao && tradeParaEditar.sentimentoFechamento === 'Orgulho' ? 'selected' : ''}>Orgulho</option>
                        <option value="Arrependimento" ${isEdicao && tradeParaEditar.sentimentoFechamento === 'Arrependimento' ? 'selected' : ''}>Arrependimento</option>
                        <option value="Neutro" ${isEdicao && tradeParaEditar.sentimentoFechamento === 'Neutro' ? 'selected' : ''}>Neutro</option>
                    </select>
                </div>

                <div class="modal-actions">
                    <button class="modal-btn-outline" id="modal-cancelar">Cancelar</button>
                    <button class="modal-btn-print" id="modal-imprimir">🖨️ Imprimir</button>
                    <button class="modal-btn-primary" id="modal-salvar">💾 ${isEdicao ? 'Atualizar Trade' : 'Salvar Trade'}</button>
                </div>
            </div>
        `;

        Swal.fire({
            title: isEdicao ? '✏️ Editar Trade' : '🚀 Lançar Novo Trade',
            html: modalHtml,
            showConfirmButton: false,
            showCancelButton: false,
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            width: '85%',
            didOpen: () => {
                // Configurar formatação por par
                const modalMoeda = document.getElementById('modal-moeda');
                const modalPreco = document.getElementById('modal-precoEntrada');
                const modalStop = document.getElementById('modal-stopLoss');
                const modalTarget = document.getElementById('modal-takeProfit');
                const modalLote = document.getElementById('modal-lote'); // novo campo
                const modalPreviewEntrada = document.getElementById('modal-previewEntrada');
                const modalPreviewFechamento = document.getElementById('modal-previewFechamento');
                const modalImgEntradaNome = document.getElementById('modal-imgEntradaNome');
                const modalImgFechamentoNome = document.getElementById('modal-imgFechamentoNome');
                const zoomEntradaBtn = document.getElementById('modal-zoomImgEntrada');
                const zoomFechamentoBtn = document.getElementById('modal-zoomImgFechamento');
                const imprimirBtn = document.getElementById('modal-imprimir');

                // IMPORTANTE: Restaurar dados das imagens se estiver editando
                if (isEdicao) {
                    if (tradeParaEditar.imgEntradaBase64) {
                        modalPreviewEntrada.src = tradeParaEditar.imgEntradaBase64;
                        modalImgEntradaNome.value = tradeParaEditar.imgEntradaNome || 'print_entrada.png';
                        modalImgEntradaNome.dataset.base64 = tradeParaEditar.imgEntradaBase64;
                    }
                    if (tradeParaEditar.imgFechamentoBase64) {
                        modalPreviewFechamento.src = tradeParaEditar.imgFechamentoBase64;
                        modalImgFechamentoNome.value = tradeParaEditar.imgFechamentoNome || 'print_fechamento.png';
                        modalImgFechamentoNome.dataset.base64 = tradeParaEditar.imgFechamentoBase64;
                    }
                }

                // Garantir que a moeda seja a correta ao editar
                if (isEdicao && tradeParaEditar.moeda) {
                    modalMoeda.value = tradeParaEditar.moeda;
                    // Disparar change para aplicar formatação
                    modalMoeda.dispatchEvent(new Event('change'));
                }

                // Guardar referência do modal atual
                const currentModal = Swal.getPopup();

                // Eventos de zoom
                zoomEntradaBtn.addEventListener('click', () => {
                    if (modalPreviewEntrada.src && !modalPreviewEntrada.src.startsWith('data:image/svg')) {
                        Swal.fire({
                            imageUrl: modalPreviewEntrada.src,
                            imageAlt: 'Imagem ampliada',
                            width: '90%',
                            padding: '1rem',
                            background: 'var(--bg-card)',
                            showConfirmButton: true,
                            confirmButtonText: 'Fechar',
                            willClose: () => {
                                currentModal.style.display = 'flex';
                            }
                        });
                    } else {
                        Swal.fire('Sem imagem', 'Não há imagem para ampliar.', 'info');
                    }
                });

                zoomFechamentoBtn.addEventListener('click', () => {
                    if (modalPreviewFechamento.src && !modalPreviewFechamento.src.startsWith('data:image/svg')) {
                        Swal.fire({
                            imageUrl: modalPreviewFechamento.src,
                            imageAlt: 'Imagem ampliada',
                            width: '90%',
                            padding: '1rem',
                            background: 'var(--bg-card)',
                            showConfirmButton: true,
                            confirmButtonText: 'Fechar',
                            willClose: () => {
                                currentModal.style.display = 'flex';
                            }
                        });
                    } else {
                        Swal.fire('Sem imagem', 'Não há imagem para ampliar.', 'info');
                    }
                });

                // Botão Imprimir
                imprimirBtn.addEventListener('click', () => {
                    const dados = {
                        moeda: modalMoeda.value,
                        dataEntrada: document.getElementById('modal-dataEntrada').value,
                        tipoEntrada: document.getElementById('modal-tipoEntrada').value,
                        precoEntrada: parseFloat(modalPreco.value) || null,
                        stopLoss: parseFloat(modalStop.value) || null,
                        takeProfit: parseFloat(modalTarget.value) || null,
                        lote: parseFloat(modalLote.value) || null, // novo campo
                        obsAbertura: document.getElementById('modal-obsAbertura').value,
                        sentimentoAbertura: document.getElementById('modal-sentimentoAbertura').value || null,
                        fechadoCom: document.getElementById('modal-fechadoCom').value || null,
                        valor: parseFloat(document.getElementById('modal-valorFechamento').value) || 0,
                        dataFechamento: document.getElementById('modal-dataFechamento').value || null,
                        obsFechamento: document.getElementById('modal-obsFechamento').value,
                        sentimentoFechamento: document.getElementById('modal-sentimentoFechamento').value || null,
                        imgEntradaBase64: modalImgEntradaNome.dataset.base64 || null,
                        imgEntradaNome: modalImgEntradaNome.value || null,
                        imgFechamentoBase64: modalImgFechamentoNome.dataset.base64 || null,
                        imgFechamentoNome: modalImgFechamentoNome.value || null
                    };
                    imprimirTrade(dados);
                });

                function aplicarFormatacaoModal() {
                    const par = modalMoeda.value;
                    const config = getFormatConfig(par);
                    
                    [modalPreco, modalStop, modalTarget].forEach(input => {
                        if (input) input.step = config.step;
                    });
                }

                modalMoeda.addEventListener('change', aplicarFormatacaoModal);
                
                [modalPreco, modalStop, modalTarget].forEach(input => {
                    if (input) {
                        input.addEventListener('blur', () => {
                            if (input.value) {
                                input.value = formatPriceValue(input.value, modalMoeda.value);
                            }
                        });
                    }
                });

                // Configurar colagem de imagens no modal
                function setupModalPaste(inputElement, previewElement) {
                    inputElement.addEventListener('paste', (e) => {
                        e.preventDefault();
                        const items = e.clipboardData.items;
                        for (let item of items) {
                            if (item.type.indexOf('image') !== -1) {
                                const blob = item.getAsFile();
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    previewElement.src = event.target.result;
                                    inputElement.value = `print_${Date.now()}.png`;
                                    inputElement.dataset.base64 = event.target.result;
                                };
                                reader.readAsDataURL(blob);
                                break;
                            }
                        }
                    });
                    inputElement.focus();
                }

                setupModalPaste(modalImgEntradaNome, modalPreviewEntrada);
                setupModalPaste(modalImgFechamentoNome, modalPreviewFechamento);

                // Limpar imagens no modal
                document.getElementById('modal-limparImgEntrada').addEventListener('click', () => {
                    modalPreviewEntrada.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'%233b82f6\'%3E%3Crect width=\'24\' height=\'24\' fill=\'%232a313e\'/%3E%3Ctext x=\'4\' y=\'17\' fill=\'%23fff\' font-size=\'10\'%3E📸%3C/text%3E%3C/svg%3E';
                    modalImgEntradaNome.value = '';
                    delete modalImgEntradaNome.dataset.base64;
                });

                document.getElementById('modal-limparImgFechamento').addEventListener('click', () => {
                    modalPreviewFechamento.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'%23ef4444\'%3E%3Crect width=\'24\' height=\'24\' fill=\'%232a313e\'/%3E%3Ctext x=\'4\' y=\'17\' fill=\'%23fff\' font-size=\'10\'%3E📸%3C/text%3E%3C/svg%3E';
                    modalImgFechamentoNome.value = '';
                    delete modalImgFechamentoNome.dataset.base64;
                });

                // Botão Cancelar
                document.getElementById('modal-cancelar').addEventListener('click', () => {
                    Swal.close();
                });

                // Botão Salvar - usa o src como fallback caso dataset.base64 não exista
                document.getElementById('modal-salvar').addEventListener('click', () => {
                    const moeda = modalMoeda.value;
                    const dataEntrada = document.getElementById('modal-dataEntrada').value;
                    const tipoEntrada = document.getElementById('modal-tipoEntrada').value;
                    const precoEntrada = parseFloat(modalPreco.value) || null;
                    const stopLoss = parseFloat(modalStop.value) || null;
                    const takeProfit = parseFloat(modalTarget.value) || null;
                    const lote = parseFloat(modalLote.value) || null; // novo campo
                    const obsAbertura = document.getElementById('modal-obsAbertura').value;
                    const sentimentoAbertura = document.getElementById('modal-sentimentoAbertura').value || null;
                    const fechadoCom = document.getElementById('modal-fechadoCom').value || null;
                    const valor = parseFloat(document.getElementById('modal-valorFechamento').value) || 0;
                    const dataFechamento = document.getElementById('modal-dataFechamento').value || null;
                    const obsFechamento = document.getElementById('modal-obsFechamento').value;
                    const sentimentoFechamento = document.getElementById('modal-sentimentoFechamento').value || null;
                    
                    // Usar dataset.base64 se existir, senão usar o src do preview (desde que não seja o placeholder)
                    let imgEntradaBase64 = modalImgEntradaNome.dataset.base64;
                    if (!imgEntradaBase64 && modalPreviewEntrada.src && !modalPreviewEntrada.src.startsWith('data:image/svg')) {
                        imgEntradaBase64 = modalPreviewEntrada.src;
                    }
                    let imgFechamentoBase64 = modalImgFechamentoNome.dataset.base64;
                    if (!imgFechamentoBase64 && modalPreviewFechamento.src && !modalPreviewFechamento.src.startsWith('data:image/svg')) {
                        imgFechamentoBase64 = modalPreviewFechamento.src;
                    }

                    const imgEntradaNome = modalImgEntradaNome.value || null;
                    const imgFechamentoNome = modalImgFechamentoNome.value || null;

                    if (!moeda || !dataEntrada || !tipoEntrada) {
                        Swal.fire('Campos obrigatórios', 'Moeda, Data/Hora e Tipo são obrigatórios.', 'warning');
                        return;
                    }

                    const trade = {
                        moeda, dataEntrada, tipoEntrada, precoEntrada, stopLoss, takeProfit, lote, // lote incluso
                        obsAbertura, sentimentoAbertura, fechadoCom, valor, dataFechamento,
                        obsFechamento, sentimentoFechamento,
                        imgEntradaBase64, imgEntradaNome,
                        imgFechamentoBase64, imgFechamentoNome
                    };

                    if (isEdicao) {
                        trades[indexParaEditar] = trade;
                        Swal.fire('Sucesso!', 'Trade atualizado com sucesso.', 'success');
                    } else {
                        trades.push(trade);
                        Swal.fire('Sucesso!', 'Novo trade lançado com sucesso.', 'success');
                    }

                    salvarTrades();
                    renderTrades();
                    atualizarMetricas();
                    Swal.close();
                });

                // Aplicar formatação inicial
                aplicarFormatacaoModal();
                if (isEdicao && tradeParaEditar.precoEntrada) {
                    modalPreco.value = formatPriceValue(tradeParaEditar.precoEntrada, tradeParaEditar.moeda);
                }
                if (isEdicao && tradeParaEditar.stopLoss) {
                    modalStop.value = formatPriceValue(tradeParaEditar.stopLoss, tradeParaEditar.moeda);
                }
                if (isEdicao && tradeParaEditar.takeProfit) {
                    modalTarget.value = formatPriceValue(tradeParaEditar.takeProfit, tradeParaEditar.moeda);
                }
            }
        });
    }

    // ========== PERSISTÊNCIA TRADES ==========
    function carregarTrades() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                trades = JSON.parse(saved);
            } catch (e) {
                trades = [];
            }
        } else {
            trades = [];
        }
    }

    function salvarTrades() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
    }

    // ========== BACKUP CRIPTOGRAFADO ==========
    document.getElementById('fazerBackup').addEventListener('click', () => {
        const backupObj = { trades, config };
        const jsonString = JSON.stringify(backupObj);
        
        const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
        
        const blob = new Blob([encrypted], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().toISOString().slice(0,10)}.enc`;
        a.click();
        URL.revokeObjectURL(url);
        Swal.fire('Backup criptografado!', 'Arquivo salvo com extensão .enc', 'success');
    });

    const fileInput = document.getElementById('arquivoBackup');
    document.getElementById('restaurarBackup').addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Swal.fire({
            title: 'Restaurar backup?',
            text: 'Todos os dados atuais serão substituídos.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, restaurar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const encryptedData = event.target.result;
                        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
                        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
                        
                        if (!decryptedString) {
                            throw new Error('Falha na descriptografia');
                        }
                        
                        const backup = JSON.parse(decryptedString);
                        if (backup.trades && Array.isArray(backup.trades)) {
                            trades = backup.trades;
                            if (backup.config) {
                                config = backup.config;
                                salvarConfig();
                            }
                            salvarTrades();
                            renderTrades();
                            atualizarMetricas();
                            Swal.fire('Restaurado!', 'Backup carregado com sucesso.', 'success');
                        } else {
                            Swal.fire('Erro', 'Arquivo de backup inválido.', 'error');
                        }
                    } catch (err) {
                        Swal.fire('Erro', 'Arquivo corrompido ou não autorizado.', 'error');
                    }
                };
                reader.readAsText(file);
            }
        });
        fileInput.value = '';
    });

    // ========== FILTROS ==========
    filtroPeriodoSelect.addEventListener('change', () => {
        const val = filtroPeriodoSelect.value;
        if (val === 'periodo') {
            dataInicioGroup.style.display = 'flex';
            dataFimGroup.style.display = 'flex';
        } else {
            dataInicioGroup.style.display = 'none';
            dataFimGroup.style.display = 'none';
        }
    });

    document.getElementById('aplicarFiltro').addEventListener('click', () => {
        filtroPeriodo = filtroPeriodoSelect.value;
        filtroStatus = filtroStatusSelect.value;
        if (filtroPeriodo === 'periodo') {
            dataInicioFiltro = dataInicio.value;
            dataFimFiltro = dataFim.value;
        }
        renderTrades();
        Swal.fire({
            icon: 'info',
            title: 'Filtro aplicado',
            timer: 1000,
            showConfirmButton: false
        });
    });

    function filtrarTrades() {
        let lista = trades;

        if (filtroPeriodo !== 'todos') {
            const hoje = new Date();
            let inicio, fim;

            if (filtroPeriodo === 'hoje') {
                inicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
                fim = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59);
            } else if (filtroPeriodo === 'semana') {
                const diaSemana = hoje.getDay();
                inicio = new Date(hoje);
                inicio.setDate(hoje.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1));
                fim = new Date(inicio);
                fim.setDate(inicio.getDate() + 6);
            } else if (filtroPeriodo === 'mes') {
                inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
                fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
            } else if (filtroPeriodo === 'periodo') {
                if (!dataInicioFiltro || !dataFimFiltro) return lista;
                inicio = new Date(dataInicioFiltro + 'T00:00:00');
                fim = new Date(dataFimFiltro + 'T23:59:59');
            }

            if (inicio && fim) {
                lista = lista.filter(t => {
                    if (!t.dataEntrada) return false;
                    const dataTrade = new Date(t.dataEntrada);
                    return dataTrade >= inicio && dataTrade <= fim;
                });
            }
        }

        if (filtroStatus !== 'todos') {
            lista = lista.filter(t => {
                if (filtroStatus === 'abertos') return !t.fechadoCom;
                if (filtroStatus === 'fechados') return t.fechadoCom;
                if (filtroStatus === 'positivos') return t.fechadoCom === 'Lucro';
                if (filtroStatus === 'negativos') return t.fechadoCom === 'Prejuizo';
                return true;
            });
        }

        let descricao = [];
        if (filtroPeriodo === 'hoje') descricao.push('hoje');
        else if (filtroPeriodo === 'semana') descricao.push('esta semana');
        else if (filtroPeriodo === 'mes') descricao.push('este mês');
        else if (filtroPeriodo === 'periodo') descricao.push('período');
        
        if (filtroStatus !== 'todos') {
            descricao.push(filtroStatus);
        }
        
        filtroDescricao.innerText = descricao.length ? '(' + descricao.join(', ') + ')' : '(todos)';

        return lista;
    }

    // ========== IMPRESSÃO DA LISTA ==========
    document.getElementById('imprimirLista').addEventListener('click', imprimirLista);

    // ========== ATUALIZAR MÉTRICAS ==========
    function atualizarMetricas() {
        let totalPos = 0, totalNeg = 0, tradesHoje = 0, posHoje = 0, negHoje = 0;
        const hojeStr = getLocalDateString(); // usa data local

        trades.forEach(t => {
            if (t.fechadoCom === 'Lucro') totalPos++;
            else if (t.fechadoCom === 'Prejuizo') totalNeg++;

            if (t.dataEntrada && t.dataEntrada.slice(0,10) === hojeStr) {
                tradesHoje++;
                if (t.fechadoCom === 'Lucro') posHoje++;
                else if (t.fechadoCom === 'Prejuizo') negHoje++;
            }
        });

        let somaValores = 0;
        trades.forEach(t => {
            if (t.fechadoCom === 'Lucro') somaValores += t.valor || 0;
            else if (t.fechadoCom === 'Prejuizo') somaValores -= t.valor || 0;
        });
        const saldoAtual = config.saldoInicial + somaValores;

        const metaValor = config.saldoInicial * (config.metaPercent / 100);
        const lucroAtual = saldoAtual - config.saldoInicial;
        const faltaMeta = Math.max(0, metaValor - lucroAtual);
        const percentFalta = (faltaMeta / config.saldoInicial) * 100;

        // Verificar se a meta foi atingida
        const metaAtingida = lucroAtual >= metaValor;
        if (metaAtingida) {
            metaStatusText.innerText = '✅';
            metaStatusText.style.color = 'var(--success)';
            metaFaltaEl.innerText = '✅ R$ 0,00';
            metaFaltaEl.style.color = 'var(--success)';
            progressMetaEl.innerText = '🎉 Meta atingida!';
            progressMetaEl.style.color = 'var(--success)';
            metaCard.classList.add('meta-atingida');
        } else {
            metaStatusText.innerText = '(falta)';
            metaStatusText.style.color = '';
            metaFaltaEl.innerText = `R$ ${faltaMeta.toFixed(2)}`;
            metaFaltaEl.style.color = '';
            progressMetaEl.innerText = `⬆️ Faltam ${percentFalta.toFixed(1)}% para ${config.metaPercent}%`;
            progressMetaEl.style.color = '';
            metaCard.classList.remove('meta-atingida');
        }

        // ========== DRAWNDOWN MÁXIMO CONFORME TIPO SELECIONADO ==========
        let ddExibido = 0;
        if (config.ddTipo === 'estatico') {
            // Drawdown estático: perda atual em relação ao capital inicial (se houver)
            const perdaAtual = config.saldoInicial - saldoAtual;
            ddExibido = perdaAtual > 0 ? (perdaAtual / config.saldoInicial) * 100 : 0;
        } else {
            // Drawdown dinâmico: maior queda percentual em relação ao pico de equity
            let pico = config.saldoInicial;
            let saldoCorrente = config.saldoInicial;
            let maxQueda = 0;
            trades.forEach(t => {
                if (t.fechadoCom === 'Lucro') saldoCorrente += t.valor;
                else if (t.fechadoCom === 'Prejuizo') saldoCorrente -= t.valor;
                if (saldoCorrente > pico) pico = saldoCorrente;
                const queda = (pico - saldoCorrente) / pico * 100;
                if (queda > maxQueda) maxQueda = queda;
            });
            ddExibido = maxQueda;
        }

        const ddExibidoFixed = ddExibido.toFixed(1);
        const ddMaxAtingido = parseFloat(ddExibidoFixed) >= config.ddMax;
        ddMaxStatus.innerText = ddMaxAtingido ? '⚠️ ATENÇÃO' : 'seguro';
        ddMaxStatus.style.color = ddMaxAtingido ? 'var(--danger)' : 'var(--success)';

        // Drawdown máximo: exibir sem sinal de menos (apenas o valor)
        ddMaxEl.innerText = ddExibido > 0 ? `${ddExibidoFixed}%` : '0%';

        // ========== DRAWDOWN DIÁRIO = maior queda intradiária ==========
        const saldoAberturaHoje = config.saldoInicial + trades.filter(t => t.dataEntrada && t.dataEntrada.slice(0,10) < hojeStr).reduce((acc, t) => {
            return acc + (t.fechadoCom === 'Lucro' ? t.valor : (t.fechadoCom === 'Prejuizo' ? -t.valor : 0));
        }, 0);

        // Obter trades de hoje ordenados por data
        const tradesHojeOrdenados = trades
            .filter(t => t.dataEntrada && t.dataEntrada.slice(0,10) === hojeStr)
            .sort((a, b) => new Date(a.dataEntrada) - new Date(b.dataEntrada));

        // Simular saldo ao longo do dia para achar o menor valor
        let saldoCorrenteDia = saldoAberturaHoje;
        let menorSaldoDia = saldoAberturaHoje;
        tradesHojeOrdenados.forEach(t => {
            if (t.fechadoCom === 'Lucro') saldoCorrenteDia += t.valor;
            else if (t.fechadoCom === 'Prejuizo') saldoCorrenteDia -= t.valor;
            if (saldoCorrenteDia < menorSaldoDia) menorSaldoDia = saldoCorrenteDia;
        });

        // Drawdown diário é a maior queda percentual em relação ao saldo inicial do dia
        const ddDiarioPercent = menorSaldoDia < saldoAberturaHoje ? ((saldoAberturaHoje - menorSaldoDia) / saldoAberturaHoje) * 100 : 0;

        saldoInicialEl.innerText = `R$ ${config.saldoInicial.toFixed(2)}`;
        totalPosEl.innerText = totalPos;
        totalNegEl.innerText = totalNeg;
        tradesHojeEl.innerText = tradesHoje;
        
        // Atualizar drawdown diário com sinal de menos
        const limiteAtingido = ddDiarioPercent >= config.ddDiarioLimite;
        if (limiteAtingido) {
            ddDiarioEl.innerHTML = `⚠️ -${ddDiarioPercent.toFixed(1)}%`;
            dailyDrawdownBadge.classList.add('danger-atingido');
        } else {
            ddDiarioEl.innerText = ddDiarioPercent > 0 ? `-${ddDiarioPercent.toFixed(1)}%` : '0%';
            dailyDrawdownBadge.classList.remove('danger-atingido');
        }
        ddDiarioEl.style.color = limiteAtingido ? 'var(--danger)' : 'inherit';
        
        posHojeEl.innerText = posHoje;
        negHojeEl.innerText = negHoje;
        saldoAtualEl.innerText = `R$ ${saldoAtual.toFixed(2)}`;
    }

    // ========== RENDERIZAR TRADES ==========
    function renderTrades() {
        const listaFiltrada = filtrarTrades();
        const container = document.getElementById('tradesList');
        container.innerHTML = '';

        listaFiltrada.forEach((t, idx) => {
            const indexOriginal = trades.findIndex(tr => tr === t);
            const isAberto = !t.fechadoCom || t.fechadoCom === '';
            const item = document.createElement('div');
            item.className = 'trade-item';
            
            let sentimentosHtml = '';
            if (t.sentimentoAbertura || t.sentimentoFechamento) {
                sentimentosHtml = `<small style="color: var(--text-secondary);">😊 ${t.sentimentoAbertura || ''} ${t.sentimentoFechamento ? '→ '+t.sentimentoFechamento : ''}</small>`;
            }

            item.innerHTML = `
                <div class="trade-info">
                    <span>🔹 ${t.moeda || '---'}</span>
                    <span>${t.dataEntrada ? t.dataEntrada.replace('T',' ') : '--'}</span>
                    <span class="badge" style="background:${t.tipoEntrada==='Compra'?'var(--success-bg)':'var(--danger-bg)'};color:${t.tipoEntrada==='Compra'?'var(--success)':'var(--danger)'}">${t.tipoEntrada || ''}</span>
                    <span style="margin-left: 0.5rem; font-size:0.8rem;">📊 Lote: ${t.lote || '0'}</span>
                    <span class="status-badge ${isAberto ? 'status-aberto' : 'status-fechado'}">${isAberto ? '⏳ Aberto' : '✅ Fechado'}</span>
                    ${sentimentosHtml}
                </div>
                <div class="trade-status">
                    ${!isAberto ? `<span>${t.fechadoCom === 'Lucro' ? '✅' : '❌'} R$ ${t.valor?.toFixed(2) || '0'}</span>` : ''}
                    <button class="btn-info" data-index="${indexOriginal}" data-action="editar">👁️ Editar/Ver</button>
                    ${isAberto ? `<button class="btn-success" data-index="${indexOriginal}" data-action="fechar">🔒 Fechar</button>` : ''}
                    <button class="btn-danger" data-index="${indexOriginal}" data-action="excluir">🗑️ Excluir</button>
                </div>
            `;
            container.appendChild(item);
        });

        document.querySelectorAll('[data-action="excluir"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                Swal.fire({
                    title: 'Excluir trade?',
                    text: 'Esta ação não poderá ser desfeita.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, excluir',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        trades.splice(index, 1);
                        salvarTrades();
                        renderTrades();
                        atualizarMetricas();
                        Swal.fire('Excluído!', 'Trade removido.', 'success');
                    }
                });
            });
        });

        document.querySelectorAll('[data-action="editar"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                abrirModalLancamento(trades[index], index);
            });
        });

        document.querySelectorAll('[data-action="fechar"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                abrirModalLancamento(trades[index], index);
            });
        });
    }

    // Inicialização
    carregarConfig();
    carregarTrades();
    // Aplicar filtro padrão (hoje) e renderizar
    filtroPeriodoSelect.value = 'hoje'; // seleciona a opção Hoje
    filtroPeriodo = 'hoje'; // atualiza variável global
    // Forçar ocultação dos campos de data personalizada (já que não é período)
    dataInicioGroup.style.display = 'none';
    dataFimGroup.style.display = 'none';
    renderTrades();
    atualizarMetricas();

    const hojeStr = getLocalDateString();
    dataInicio.value = hojeStr;
    dataFim.value = hojeStr;
})();