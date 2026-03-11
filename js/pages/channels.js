// Channels page
function renderChannels() {
    const cats = DATA.channels.categories;
    const allTags = new Set();
    cats.forEach(c => c.channels.forEach(ch => ch.tags && ch.tags.forEach(t => allTags.add(t))));

    const tagLabels = {
        fashion: '\u041C\u043E\u0434\u0430', street: 'Streetwear', men: '\u041C\u0443\u0436\u0441\u043A\u043E\u0439', women: '\u0416\u0435\u043D\u0441\u043A\u0438\u0439',
        spb: '\u0421\u041F\u0431', eco: '\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u0438\u0437\u043C', media: '\u041C\u0435\u0434\u0438\u0430', shop: '\u0428\u043E\u043F\u043F\u0438\u043D\u0433',
        design: '\u0412\u0438\u0437\u0443\u0430\u043B', lifestyle: '\u041B\u0430\u0439\u0444\u0441\u0442\u0430\u0439\u043B', collab: '\u041A\u043E\u043B\u043B\u0430\u0431'
    };

    let html = '<div class="channels-filter">';
    html += '<button class="filter-btn active" data-filter="all">\u0412\u0441\u0435</button>';
    cats.forEach(c => {
        html += `<button class="filter-btn" data-filter="${c.id}">${c.name.split(' ')[0]}</button>`;
    });
    html += '</div>';

    cats.forEach(cat => {
        html += `<div class="ch-category" data-cat="${cat.id}">`;
        html += `<div class="ch-cat-header">
            <div class="ch-cat-icon" style="background:${cat.iconBg}">${cat.icon}</div>
            <h2>${cat.name}</h2>
            <span class="ch-cat-count">${cat.count} \u043A\u0430\u043D\u0430\u043B\u043E\u0432</span>
        </div>`;

        if (cat.priority) {
            html += `<div class="ch-priority"><strong>${cat.priority}</strong> \u2014 ${cat.priorityDesc}</div>`;
        }

        html += '<div class="ch-grid">';
        cat.channels.forEach(ch => {
            html += `<div class="ch-card">
                <div class="ch-top">`;
            if (ch.url) {
                html += `<a class="ch-handle" href="${ch.url}" target="_blank">${ch.handle}</a>`;
            } else {
                html += `<span class="ch-handle">${ch.handle}</span>`;
            }
            if (ch.subs) html += `<span class="ch-subs">${ch.subs}</span>`;
            html += '</div>';
            if (ch.name) html += `<div class="ch-name">${ch.name}</div>`;
            if (ch.author) html += `<div class="ch-author">${ch.author}</div>`;
            html += `<div class="ch-desc">${ch.desc}</div>`;
            if (ch.tags && ch.tags.length) {
                html += '<div class="ch-tags">';
                ch.tags.forEach(t => {
                    html += `<span class="ch-tag ch-tag-${t}">${tagLabels[t] || t}</span>`;
                });
                html += '</div>';
            }
            html += '</div>';
        });
        html += '</div></div>';
    });

    // Tools section
    html += `<div class="ch-tools">
        <h3>\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0434\u043B\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u043E\u0438\u0441\u043A\u0430 \u043A\u0430\u043D\u0430\u043B\u043E\u0432</h3>
        <div class="ch-tools-grid">
            <div class="ch-tool-card"><h4><a href="https://tgstat.ru/en/tag/style" target="_blank">TGStat</a></h4><p>\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u043E \u0442\u0435\u0433\u0430\u043C. \u0424\u0438\u043B\u044C\u0442\u0440\u044B \u043F\u043E \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u0430\u043C, \u043E\u0445\u0432\u0430\u0442\u0443, CPM.</p></div>
            <div class="ch-tool-card"><h4><a href="https://telega.io/catalog/fashion" target="_blank">Telega.io</a></h4><p>\u0411\u0438\u0440\u0436\u0430 \u0440\u0435\u043A\u043B\u0430\u043C\u044B \u0432 Telegram. \u041A\u0430\u0442\u0430\u043B\u043E\u0433 Fashion \u0441 \u0446\u0435\u043D\u0430\u043C\u0438.</p></div>
            <div class="ch-tool-card"><h4><a href="https://telegrator.ru/channels/moda/" target="_blank">Telegrator</a></h4><p>\u0420\u0435\u0439\u0442\u0438\u043D\u0433\u0438 \u0438 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0438 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u043F\u0440\u043E \u043C\u043E\u0434\u0443.</p></div>
        </div>
    </div>`;

    return html;
}

function initChannelsFilter() {
    const btns = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.ch-category');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            categories.forEach(cat => {
                cat.style.display = (filter === 'all' || cat.dataset.cat === filter) ? '' : 'none';
            });
        });
    });
}
