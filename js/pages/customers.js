// Customers page
function renderCustomers() {
    const c = DATA.customers;

    let html = '<div class="metrics-grid">';
    const metrics = [
        { label: '\u0412\u0441\u0435\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432', value: c.totalCustomers },
        { label: '\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u043E\u0432', value: c.totalOrders },
        { label: '\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0447\u0435\u043A', value: c.avgOrderValue.toLocaleString('ru') + ' \u20BD' },
        { label: '\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043A\u0443\u043F\u043A\u0438', value: c.repeatRate + '%' },
        { label: 'LTV', value: c.ltv.toLocaleString('ru') + ' \u20BD' },
        { label: 'NPS', value: c.nps }
    ];

    metrics.forEach(m => {
        html += `<div class="metric-card">
            <div class="metric-label">${m.label}</div>
            <div class="metric-value">${m.value}</div>
        </div>`;
    });
    html += '</div>';

    // Charts
    html += '<div class="charts-grid">';
    html += '<div class="chart-card"><h3>\u0412\u043E\u0437\u0440\u0430\u0441\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</h3><div class="chart-wrap"><canvas id="ageChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u041F\u043E\u043B</h3><div class="chart-wrap"><canvas id="genderChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</h3><div class="chart-wrap"><canvas id="geoCustChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u0417\u0430\u043A\u0430\u0437\u044B \u043F\u043E \u043C\u0435\u0441\u044F\u0446\u0430\u043C</h3><div class="chart-wrap"><canvas id="ordersChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u0412\u044B\u0440\u0443\u0447\u043A\u0430 \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C</h3><div class="chart-wrap"><canvas id="catRevenueChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u041F\u0440\u043E\u0434\u0430\u043D\u043E \u0435\u0434\u0438\u043D\u0438\u0446 \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C</h3><div class="chart-wrap"><canvas id="catUnitsChart"></canvas></div></div>';
    html += '</div>';

    // City table
    html += '<div class="chart-card" style="margin-top:24px"><h3>\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u2014 \u0422\u043E\u043F-10</h3>';
    html += '<table class="data-table"><tr><th>\u0413\u043E\u0440\u043E\u0434</th><th>\u041A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</th><th>\u0414\u043E\u043B\u044F</th></tr>';
    c.cityDistribution.forEach(row => {
        html += `<tr><td style="color:var(--text)">${row.city}</td><td>${row.customers}</td><td>${row.pct}%</td></tr>`;
    });
    html += '</table></div>';

    return html;
}

function initCustomerCharts() {
    const c = DATA.customers;
    const gridColor = 'rgba(255,255,255,0.06)';
    const tickColor = '#888';

    // Age
    new Chart(document.getElementById('ageChart'), {
        type: 'bar',
        data: {
            labels: c.ageDistribution.labels,
            datasets: [{
                label: '% \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432',
                data: c.ageDistribution.data,
                backgroundColor: 'rgba(137,64,250,0.6)',
                borderColor: '#8940FA',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
                y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, callback: v => v + '%' } }
            }
        }
    });

    // Gender
    new Chart(document.getElementById('genderChart'), {
        type: 'doughnut',
        data: {
            labels: c.genderSplit.labels,
            datasets: [{
                data: c.genderSplit.data,
                backgroundColor: ['#60a5fa', '#f472b6'],
                borderColor: '#141414',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { color: tickColor, padding: 16, font: { size: 12 } } } }
        }
    });

    // Geo
    new Chart(document.getElementById('geoCustChart'), {
        type: 'bar',
        data: {
            labels: c.cityDistribution.map(r => r.city),
            datasets: [{
                label: '\u041A\u043B\u0438\u0435\u043D\u0442\u043E\u0432',
                data: c.cityDistribution.map(r => r.customers),
                backgroundColor: 'rgba(52,211,153,0.6)',
                borderColor: '#34d399',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
                y: { grid: { display: false }, ticks: { color: tickColor, font: { size: 10 } } }
            }
        }
    });

    // Orders
    new Chart(document.getElementById('ordersChart'), {
        type: 'line',
        data: {
            labels: c.orderHistory.labels,
            datasets: [{
                label: '\u0417\u0430\u043A\u0430\u0437\u044B',
                data: c.orderHistory.orders,
                borderColor: '#fbbf24',
                backgroundColor: 'rgba(251,191,36,0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#fbbf24'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
                y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } }
            }
        }
    });

    // Category revenue
    new Chart(document.getElementById('catRevenueChart'), {
        type: 'bar',
        data: {
            labels: c.categoryBreakdown.labels,
            datasets: [{
                label: '\u0412\u044B\u0440\u0443\u0447\u043A\u0430, \u20BD',
                data: c.categoryBreakdown.revenue,
                backgroundColor: ['#8940FA', '#60a5fa', '#34d399', '#fbbf24'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
                y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, callback: v => (v/1000000).toFixed(1) + 'M' } }
            }
        }
    });

    // Category units
    new Chart(document.getElementById('catUnitsChart'), {
        type: 'bar',
        data: {
            labels: c.categoryBreakdown.labels,
            datasets: [{
                label: '\u0415\u0434\u0438\u043D\u0438\u0446',
                data: c.categoryBreakdown.units,
                backgroundColor: ['rgba(137,64,250,0.5)', 'rgba(96,165,250,0.5)', 'rgba(52,211,153,0.5)', 'rgba(251,191,36,0.5)'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
                y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } }
            }
        }
    });
}
