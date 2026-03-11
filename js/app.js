// ===== OUROBOR SPA Router =====

const PAGES = {
    dashboard: {
        title: 'Dashboard',
        icon: '\u2302',
        render: renderDashboard,
        init: initDashboardCharts
    },
    strategy: {
        title: '\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430\u044F \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F',
        icon: '\u272A',
        render: renderStrategy,
        init: null
    },
    channels: {
        title: 'Telegram-\u043A\u0430\u043D\u0430\u043B\u044B',
        icon: '\u2709',
        render: renderChannels,
        init: initChannelsFilter
    },
    customers: {
        title: '\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432',
        icon: '\u263A',
        render: renderCustomers,
        init: initCustomerCharts
    },
    competitors: {
        title: '\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u043E\u0432',
        icon: '\u2694',
        render: renderCompetitors,
        init: initCompetitorCharts
    }
};

const sidebar = document.getElementById('sidebar');
const sidebarNav = document.getElementById('sidebarNav');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuBtn = document.getElementById('menuBtn');
const content = document.getElementById('content');
const pageTitle = document.getElementById('pageTitle');

// Build sidebar nav
Object.keys(PAGES).forEach(key => {
    const page = PAGES[key];
    const item = document.createElement('div');
    item.className = 'nav-item';
    item.dataset.page = key;
    item.innerHTML = `<span class="nav-icon">${page.icon}</span><span>${page.title}</span>`;
    item.addEventListener('click', () => {
        window.location.hash = key;
        closeSidebar();
    });
    sidebarNav.appendChild(item);
});

// Mobile menu
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('show');
});

sidebarOverlay.addEventListener('click', closeSidebar);

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
}

// Router
function navigate() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const page = PAGES[hash];
    if (!page) {
        window.location.hash = 'dashboard';
        return;
    }

    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === hash);
    });

    // Update title
    pageTitle.textContent = page.title;
    document.title = 'OUROBOR \u2014 ' + page.title;

    // Render content
    content.innerHTML = page.render();

    // Scroll to top
    content.scrollTop = 0;
    window.scrollTo(0, 0);

    // Init page-specific logic (charts, filters)
    if (page.init) {
        requestAnimationFrame(() => page.init());
    }
}

window.addEventListener('hashchange', navigate);
navigate();
