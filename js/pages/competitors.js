// Competitors page
function renderCompetitors() {
    const comps = DATA.competitors;

    let html = '<div class="comp-highlight"><h3>\u041F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 OUROBOR</h3>';
    html += '<p>OUROBOR \u2014 \u043C\u043E\u043B\u043E\u0434\u043E\u0439 \u0431\u0440\u0435\u043D\u0434, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043A\u043E\u043D\u043A\u0443\u0440\u0438\u0440\u0443\u0435\u0442 \u0432 \u043D\u0438\u0448\u0435 \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u0438\u0441\u0442\u0438\u0447\u043D\u043E\u0433\u043E streetwear \u0441 \u0444\u0438\u043B\u043E\u0441\u043E\u0444\u0441\u043A\u0438\u043C \u043F\u043E\u0434\u0445\u043E\u0434\u043E\u043C. ';
    html += '\u041A\u043B\u044E\u0447\u0435\u0432\u043E\u0435 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E \u2014 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0441 \u043F\u043B\u043E\u0442\u043D\u043E\u0441\u0442\u044C\u044E \u0442\u043A\u0430\u043D\u0438 330 \u0433/\u043C\u00B2, \u0441\u0438\u043B\u044C\u043D\u0430\u044F \u0444\u0438\u043B\u043E\u0441\u043E\u0444\u0441\u043A\u0430\u044F \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044F \u0438 \u043F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0441\u043A\u0430\u044F \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u044C. ';
    html += '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0446\u0435\u043D\u0430 6 950 \u20BD \u043F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u0443\u0435\u0442 \u0431\u0440\u0435\u043D\u0434 \u0432 \u0441\u0440\u0435\u0434\u043D\u0435\u043C \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0435, \u043D\u0438\u0436\u0435 KRAKATAU \u0438 SHU, \u043D\u043E \u0432\u044B\u0448\u0435 \u043C\u0430\u0441\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0430.</p></div>';

    // Charts
    html += '<div class="charts-grid">';
    html += '<div class="chart-card"><h3>Instagram-\u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u0438</h3><div class="chart-wrap"><canvas id="compIgChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>Telegram-\u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u0438</h3><div class="chart-wrap"><canvas id="compTgChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0446\u0435\u043D\u0430</h3><div class="chart-wrap"><canvas id="compPriceChart"></canvas></div></div>';
    html += '<div class="chart-card"><h3>\u0426\u0435\u043D\u043E\u0432\u044B\u0435 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u044B</h3><div class="chart-wrap"><canvas id="compRangeChart"></canvas></div></div>';
    html += '</div>';

    // Detailed table
    html += '<div class="comp-table-wrap"><table class="data-table">';
    html += '<tr><th>\u0411\u0440\u0435\u043D\u0434</th><th>Instagram</th><th>Telegram</th><th>\u0426\u0435\u043D\u044B, \u20BD</th><th>\u0421\u0440\u0435\u0434\u043D\u044F\u044F</th><th>\u0421\u0442\u0438\u043B\u044C</th><th>\u0413\u043E\u0440\u043E\u0434</th><th>\u0421\u0438\u043B\u044C\u043D\u044B\u0435 \u0441\u0442\u043E\u0440\u043E\u043D\u044B</th></tr>';
    comps.forEach(comp => {
        const isOurobor = comp.name === 'OUROBOR';
        const style = isOurobor ? ' style="color:var(--accent-light);font-weight:600"' : '';
        html += `<tr>
            <td${style}>${comp.name}</td>
            <td>${comp.instagram >= 1000 ? Math.round(comp.instagram / 1000) + 'K' : comp.instagram}</td>
            <td>${comp.telegram >= 1000 ? (comp.telegram / 1000).toFixed(1) + 'K' : comp.telegram}</td>
            <td>${(comp.priceRange[0]/1000).toFixed(1)}\u2013${(comp.priceRange[1]/1000)}K</td>
            <td>${comp.avgPrice.toLocaleString('ru')} \u20BD</td>
            <td>${comp.style}</td>
            <td>${comp.city}</td>
            <td>${comp.strengths}</td>
        </tr>`;
    });
    html += '</table></div>';

    return html;
}

function initCompetitorCharts() {
    const comps = DATA.competitors;
    const names = comps.map(c => c.name);
    const gridColor = 'rgba(255,255,255,0.06)';
    const tickColor = '#888';

    const colors = comps.map(c => c.name === 'OUROBOR' ? '#8940FA' : 'rgba(96,165,250,0.6)');
    const borderColors = comps.map(c => c.name === 'OUROBOR' ? '#a96bff' : '#60a5fa');

    // Instagram followers
    new Chart(document.getElementById('compIgChart'), {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Instagram',
                data: comps.map(c => c.instagram),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, callback: v => v >= 1000 ? (v/1000) + 'K' : v } },
                y: { grid: { display: false }, ticks: { color: tickColor, font: { size: 11 } } }
            }
        }
    });

    // Telegram followers
    new Chart(document.getElementById('compTgChart'), {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Telegram',
                data: comps.map(c => c.telegram),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, callback: v => v >= 1000 ? (v/1000) + 'K' : v } },
                y: { grid: { display: false }, ticks: { color: tickColor, font: { size: 11 } } }
            }
        }
    });

    // Average price
    new Chart(document.getElementById('compPriceChart'), {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0446\u0435\u043D\u0430, \u20BD',
                data: comps.map(c => c.avgPrice),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, callback: v => (v/1000) + 'K' } },
                y: { grid: { display: false }, ticks: { color: tickColor, font: { size: 11 } } }
            }
        }
    });

    // Price ranges (floating bar)
    new Chart(document.getElementById('compRangeChart'), {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0446\u0435\u043D',
                data: comps.map(c => [c.priceRange[0], c.priceRange[1]]),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, callback: v => (v/1000) + 'K \u20BD' } },
                y: { grid: { display: false }, ticks: { color: tickColor, font: { size: 11 } } }
            }
        }
    });
}
