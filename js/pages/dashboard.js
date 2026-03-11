// Dashboard page
function renderDashboard() {
    const k = DATA.kpi;
    const kpis = [
        { label: 'Telegram', value: k.telegramSubs.value, change: k.telegramSubs.change, up: k.telegramSubs.up },
        { label: 'Instagram', value: k.instagramSubs.value, change: k.instagramSubs.change, up: k.instagramSubs.up },
        { label: '\u0412\u044B\u0440\u0443\u0447\u043A\u0430/\u043C\u0435\u0441', value: k.revenue.value, change: k.revenue.change, up: k.revenue.up },
        { label: '\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0447\u0435\u043A', value: k.avgCheck.value, change: k.avgCheck.change, up: k.avgCheck.up },
        { label: '\u041A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F', value: k.conversion.value, change: k.conversion.change, up: k.conversion.up },
        { label: '\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043A\u0443\u043F\u043A\u0438', value: k.repeatPurchase.value, change: k.repeatPurchase.change, up: k.repeatPurchase.up }
    ];

    let html = '<div class="kpi-grid">';
    kpis.forEach(kpi => {
        html += `
        <div class="kpi-card">
            <div class="kpi-label">${kpi.label}</div>
            <div class="kpi-value">${kpi.value}</div>
            <div class="kpi-change ${kpi.up ? 'up' : 'down'}">${kpi.up ? '\u2191' : '\u2193'} ${kpi.change}</div>
        </div>`;
    });
    html += '</div>';

    html += '<div class="charts-grid">';
    html += '<div class="chart-card"><h3>\u0412\u044B\u0440\u0443\u0447\u043A\u0430 \u043F\u043E \u043C\u0435\u0441\u044F\u0446\u0430\u043C</h3><div class="chart-wrap"><canvas id="revenueChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u0420\u043E\u0441\u0442 \u043A\u0430\u043D\u0430\u043B\u043E\u0432</h3><div class="chart-wrap"><canvas id="growthChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u041F\u0440\u043E\u0434\u0430\u0436\u0438 \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C</h3><div class="chart-wrap"><canvas id="categoryChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u0422\u043E\u043F \u0433\u043E\u0440\u043E\u0434\u043E\u0432</h3><div class="chart-wrap"><canvas id="citiesChart"></canvas></div></div>';
    html += '</div>';

    return html;
}

function initDashboardCharts() {
    const gridColor = 'rgba(255,255,255,0.06)';
    const tickColor = '#888';

    // Revenue chart
    new Chart(document.getElementById('revenueChart'), {
        type: 'line',
        data: {
            labels: DATA.revenueMonthly.labels,
            datasets: [{
                label: '\u0412\u044B\u0440\u0443\u0447\u043A\u0430, \u20BD',
                data: DATA.revenueMonthly.data,
                borderColor: '#8940FA',
                backgroundColor: 'rgba(137,64,250,0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#8940FA'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
                y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, callback: v => (v/1000) + 'K' } }
            }
        }
    });

    // Growth chart
    new Chart(document.getElementById('growthChart'), {
        type: 'line',
        data: {
            labels: DATA.channelGrowth.labels,
            datasets: [
                {
                    label: 'Telegram',
                    data: DATA.channelGrowth.telegram,
                    borderColor: '#60a5fa',
                    backgroundColor: 'rgba(96,165,250,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3
                },
                {
                    label: 'Instagram',
                    data: DATA.channelGrowth.instagram,
                    borderColor: '#f472b6',
                    backgroundColor: 'rgba(244,114,182,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: tickColor, font: { size: 11 } } } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
                y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } }
            }
        }
    });

    // Category chart
    new Chart(document.getElementById('categoryChart'), {
        type: 'doughnut',
        data: {
            labels: DATA.salesByCategory.labels,
            datasets: [{
                data: DATA.salesByCategory.data,
                backgroundColor: ['#8940FA', '#60a5fa', '#34d399', '#fbbf24'],
                borderColor: '#141414',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: tickColor, padding: 16, font: { size: 12 } } }
            }
        }
    });

    // Cities chart
    new Chart(document.getElementById('citiesChart'), {
        type: 'bar',
        data: {
            labels: DATA.topCities.labels,
            datasets: [{
                label: '% \u0437\u0430\u043A\u0430\u0437\u043E\u0432',
                data: DATA.topCities.data,
                backgroundColor: 'rgba(137,64,250,0.6)',
                borderColor: '#8940FA',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, callback: v => v + '%' } },
                y: { grid: { display: false }, ticks: { color: tickColor, font: { size: 11 } } }
            }
        }
    });
}
