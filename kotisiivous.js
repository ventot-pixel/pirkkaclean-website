document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('home-calculator');
    if (!form) return;

    const TAX_CREDIT_RATE = 0.4;
    const RECURRING_RATE = 64.8;
    const ONE_TIME_RATE = 70;
    const visitFees = {
        basic: { weekly: 12, biweekly: 15, monthly: 20 },
        vacuum: { weekly: 15, biweekly: 20, monthly: 30 }
    };
    const formulas = {
        home: [[49, 3], [89, 4], [119, 5], [154, 6], [179, 7], [224, 8], [254, 9], [284, 10], [Infinity, 11]],
        once: [[49, 5], [89, 6], [119, 7], [154, 9], [179, 11], [224, 11], [254, 15], [284, 15], [Infinity, 16]],
        move: [[39, 5], [49, 6], [59, 7], [69, 8], [84, 8.5], [99, 9], [114, 9.5], [129, 9.5], [144, 10], [159, 10.5], [174, 11], [189, 11.5], [Infinity, 12]],
        renovation: [[49, 12], [79, 15], [99, 20], [149, 30], [199, 40], [Infinity, 60]],
        allergy: [[49, 18], [79, 21], [99, 25], [149, 30], [199, 40], [Infinity, 60]],
        windows: [[7, 4], [8, 4], [9, 4.5], [10, 5], [11, 5.5], [12, 6], [13, 6.5], [14, 7], [15, 7.5], [16, 8], [17, 8.5], [18, 9], [19, 9.5], [20, 10], [21, 10.5], [22, 11], [23, 11.5], [24, 12], [25, 12.5], [26, 13], [27, 13.5], [28, 14], [29, 14.5], [30, 15], [31, 15.5], [32, 16], [33, 16.5], [34, 17], [35, 17.5], [36, 18], [37, 18.5], [38, 19], [39, 19.5], [Infinity, 20]]
    };
    const calculatorTicket = document.querySelector('.calculator-ticket');
    const sqmInput = document.getElementById('sqm-input');
    const quantityLabel = document.getElementById('quantity-label');
    const quantityUnit = document.getElementById('quantity-unit');
    const quantityHelp = document.getElementById('sqm-help');
    const frequencyControl = document.getElementById('frequency-control');
    const packageControl = document.getElementById('package-control');
    const packageInput = document.getElementById('package-input');
    const result = document.getElementById('calc-result');
    const resultUnit = document.getElementById('result-unit');
    const resultHours = document.getElementById('calc-hours');
    const resultLabor = document.getElementById('result-labor');
    const resultVisit = document.getElementById('result-visit');
    const resultCredit = document.getElementById('result-credit');
    const resultNote = document.getElementById('calc-note');
    const quoteLink = document.getElementById('calculator-quote-link');
    const quoteFields = {
        service: document.getElementById('quote-service'),
        size: document.getElementById('quote-size'),
        frequency: document.getElementById('quote-frequency'),
        extras: document.getElementById('quote-extras'),
        estimate: document.getElementById('quote-estimate')
    };

    const copy = {
        fi: {
            quote: 'Tarjous',
            custom: 'Anna arvo sallitulta väliltä, jotta voimme laskea arvion.',
            hours: (hours, rate) => `${String(hours).replace('.', ',')} h · ${formatMoney(rate, 'fi')}/h`,
            note: 'Vähennysarvio ei huomioi 150 € omavastuuta tai 2 100 € vuotuista enimmäismäärää. Lopullinen työaika vahvistetaan ennen tilausta.',
            subject: 'Kotisiivouksen tarjouspyyntö',
            service: 'Palvelu',
            size: 'Kodin koko',
            frequency: 'Käyntitiheys',
            addons: 'Lisätyöt',
            estimate: 'Laskurin arvio',
            serviceNames: { home: 'Säännöllinen kotisiivous', once: 'Kertasiivous', move: 'Muuttosiivous', windows: 'Ikkunanpesu', renovation: 'Remonttisiivous', allergy: 'Allergiasiivous' },
            frequencyNames: { weekly: 'Viikoittain', biweekly: 'Joka toinen viikko', monthly: 'Neljän viikon välein' },
            packageNames: { basic: 'Peruspaketti', vacuum: 'Puhdaspaketti, sisältää imurin' },
            windowLabel: 'Avattavia ikkunoita',
            windowHelp: '1–40 ikkunaa. Yli 40 ikkunan kohteet arvioidaan erikseen.',
            sizeLabel: 'Kodin koko',
            sizeHelp: '30–300 m². Arvio perustuu keskimääräiseen työaikaan.',
            oneTime: 'Kertakäynti'
        },
        en: {
            quote: 'Quote',
            custom: 'Enter a value within the allowed range to calculate an estimate.',
            hours: (hours, rate) => `${hours} h · ${formatMoney(rate, 'en')}/h`,
            note: 'The deduction estimate excludes the €150 deductible and €2,100 annual maximum. Final duration is confirmed before ordering.',
            subject: 'Home cleaning quote request',
            service: 'Service',
            size: 'Home size',
            frequency: 'Frequency',
            addons: 'Add-ons',
            estimate: 'Calculator estimate',
            serviceNames: { home: 'Recurring home cleaning', once: 'One-time cleaning', move: 'Move-out cleaning', windows: 'Window cleaning', renovation: 'Post-renovation cleaning', allergy: 'Allergy cleaning' },
            frequencyNames: { weekly: 'Weekly', biweekly: 'Every two weeks', monthly: 'Every four weeks' },
            packageNames: { basic: 'Basic equipment package', vacuum: 'Cleaning package with vacuum' },
            windowLabel: 'Opening windows',
            windowHelp: '1–40 windows. Sites with more than 40 windows receive a personal estimate.',
            sizeLabel: 'Home size',
            sizeHelp: '30–300 m². The estimate is based on average working time.',
            oneTime: 'One-time visit'
        }
    };

    function getLanguage() {
        return document.documentElement.lang === 'en' ? 'en' : 'fi';
    }

    function formatMoney(value, lang = getLanguage()) {
        return new Intl.NumberFormat(lang === 'en' ? 'en-FI' : 'fi-FI', {
            style: 'currency', currency: 'EUR', minimumFractionDigits: 2
        }).format(value);
    }

    function getHours(service, quantity) {
        const match = formulas[service].find(([max]) => quantity <= max);
        return match ? match[1] : null;
    }

    function getSelection() {
        const service = form.elements['cleaning-service'].value;
        const quantity = Math.max(0, Number(sqmInput.value) || 0);
        const frequency = document.getElementById('frequency-input').value;
        const packageType = packageInput.value;
        return { service, quantity, frequency, packageType };
    }

    function updateQuoteForm(selection, estimateText) {
        const lang = getLanguage();
        const t = copy[lang];
        if (quoteFields.service) quoteFields.service.value = t.serviceNames[selection.service];
        if (quoteFields.size) quoteFields.size.value = selection.service === 'windows' ? `${selection.quantity} ${t.windowLabel.toLowerCase()}` : `${selection.quantity} m²`;
        if (quoteFields.frequency) quoteFields.frequency.value = selection.service === 'home' ? t.frequencyNames[selection.frequency] : t.oneTime;
        if (quoteFields.extras) quoteFields.extras.value = selection.service === 'home' ? t.packageNames[selection.packageType] : t.oneTime;
        if (quoteFields.estimate) quoteFields.estimate.value = estimateText;
        quoteLink.href = '#tarjouspyynto';
    }

    function updateCalculator() {
        const lang = getLanguage();
        const t = copy[lang];
        const selection = getSelection();
        const isWindows = selection.service === 'windows';
        const minimum = isWindows ? 1 : 30;
        const maximum = isWindows ? 40 : 300;
        const isQuoteOnly = selection.quantity < minimum || selection.quantity > maximum;

        form.querySelectorAll('.service-choice').forEach(label => {
            label.classList.toggle('is-selected', label.querySelector('input').checked);
        });
        frequencyControl.hidden = selection.service !== 'home';
        packageControl.hidden = selection.service !== 'home';
        quantityLabel.textContent = isWindows ? t.windowLabel : t.sizeLabel;
        quantityHelp.textContent = isWindows ? t.windowHelp : t.sizeHelp;
        quantityUnit.textContent = isWindows ? 'kpl' : 'm²';
        sqmInput.min = String(minimum);
        sqmInput.max = String(maximum);
        calculatorTicket.classList.toggle('is-quote-only', isQuoteOnly);

        if (isQuoteOnly) {
            result.textContent = t.quote;
            resultUnit.textContent = '';
            resultHours.textContent = t.custom;
            resultLabor.textContent = '—';
            resultVisit.textContent = '—';
            resultCredit.textContent = '—';
            resultNote.textContent = t.custom;
            updateQuoteForm(selection, t.quote);
            return;
        }

        const hours = getHours(selection.service, selection.quantity);
        const rate = selection.service === 'home' ? RECURRING_RATE : ONE_TIME_RATE;
        const visitFee = selection.service === 'home' ? visitFees[selection.packageType][selection.frequency] : 9;
        const labor = hours * rate;
        const amount = labor + visitFee;
        const afterCredit = labor * (1 - TAX_CREDIT_RATE) + visitFee;

        result.textContent = formatMoney(amount, lang).replace(/\s*€/, '');
        resultUnit.textContent = ' €';
        resultHours.textContent = t.hours(hours, rate);
        resultLabor.textContent = formatMoney(labor, lang);
        resultVisit.textContent = formatMoney(visitFee, lang);
        resultCredit.textContent = formatMoney(afterCredit, lang);
        resultNote.textContent = t.note;
        updateQuoteForm(selection, `${formatMoney(amount, lang)} (${t.hours(hours, rate)}; ${formatMoney(afterCredit, lang)} kotitalousvähennyksen jälkeen)`);
    }

    form.addEventListener('input', updateCalculator);
    form.addEventListener('change', updateCalculator);
    window.addEventListener('languagechange', updateCalculator);
    updateCalculator();
});
