document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('home-calculator');
    if (!form) return;

    // PRICE: Kari to confirm
    const HOURLY_RATE = 42;
    const quoteOnlyServices = new Set(['windows', 'renovation', 'special']);
    const serviceFactors = { home: 1, deep: 1.65, move: 1.5 };
    const addonHours = { oven: 1, fridge: 1, sauna: 1, balcony: 1 };
    const calculatorTicket = document.querySelector('.calculator-ticket');
    const sqmInput = document.getElementById('sqm-input');
    const frequencyControl = document.getElementById('frequency-control');
    const extrasFieldset = document.getElementById('extras-fieldset');
    const result = document.getElementById('calc-result');
    const resultUnit = document.getElementById('result-unit');
    const resultHours = document.getElementById('calc-hours');
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
            custom: 'Tämä palvelu arvioidaan kohteen tietojen ja työn laajuuden perusteella.',
            large: 'Yli 180 m² koti arvioidaan henkilökohtaisesti.',
            hours: (hours) => `noin ${String(hours).replace('.', ',')} h · ${HOURLY_RATE} €/h`,
            note: `Arvio perustuu ${HOURLY_RATE} €:n tuntihintaan. Lopullinen työaika ja hinta vahvistetaan ennen tilausta.`,
            subject: 'Kotisiivouksen tarjouspyyntö',
            service: 'Palvelu',
            size: 'Kodin koko',
            frequency: 'Käyntitiheys',
            addons: 'Lisätyöt',
            estimate: 'Laskurin arvio',
            none: 'ei lisätöitä',
            serviceNames: { home: 'Kotisiivous', deep: 'Suursiivous', move: 'Muuttosiivous', windows: 'Ikkunanpesu', renovation: 'Remonttisiivous', special: 'Muu erikoissiivous' },
            frequencyNames: { weekly: 'Viikoittain', biweekly: 'Joka toinen viikko', monthly: 'Neljän viikon välein', once: 'Kertaluonteinen' },
            addonNames: { oven: 'Uunin puhdistus', fridge: 'Jääkaapin sisäpuoli', sauna: 'Saunan pesu', balcony: 'Parveke tai terassi' }
        },
        en: {
            quote: 'Quote',
            custom: 'This service is estimated from the property details and agreed scope.',
            large: 'Homes over 180 m² receive a personal estimate.',
            hours: (hours) => `about ${hours} h · €${HOURLY_RATE}/h`,
            note: `The estimate uses an hourly rate of €${HOURLY_RATE}. Final duration and price are confirmed before ordering.`,
            subject: 'Home cleaning quote request',
            service: 'Service',
            size: 'Home size',
            frequency: 'Frequency',
            addons: 'Add-ons',
            estimate: 'Calculator estimate',
            none: 'no add-ons',
            serviceNames: { home: 'Home cleaning', deep: 'Deep cleaning', move: 'Move-out cleaning', windows: 'Window cleaning', renovation: 'Post-renovation cleaning', special: 'Other specialty cleaning' },
            frequencyNames: { weekly: 'Weekly', biweekly: 'Every two weeks', monthly: 'Every four weeks', once: 'One-time' },
            addonNames: { oven: 'Oven cleaning', fridge: 'Refrigerator interior', sauna: 'Sauna cleaning', balcony: 'Balcony or terrace' }
        }
    };

    function getLanguage() {
        return document.documentElement.lang === 'en' ? 'en' : 'fi';
    }

    function getBaseHours(squareMetres) {
        if (squareMetres <= 40) return 2;
        if (squareMetres <= 50) return 2.5;
        if (squareMetres <= 70) return 3;
        if (squareMetres <= 90) return 3.5;
        if (squareMetres <= 110) return 4.5;
        if (squareMetres <= 150) return 5.5;
        return 7;
    }

    function roundToHalf(value) {
        return Math.ceil(value * 2) / 2;
    }

    function getSelection() {
        const service = form.elements['cleaning-service'].value;
        const squareMetres = Math.max(0, Number(sqmInput.value) || 0);
        const frequency = document.getElementById('frequency-input').value;
        const addons = [...form.querySelectorAll('input[name="addon"]:checked')].map(input => input.value);
        return { service, squareMetres, frequency, addons };
    }

    function updateQuoteForm(selection, estimateText) {
        const lang = getLanguage();
        const t = copy[lang];
        const addons = selection.addons.length ? selection.addons.map(key => t.addonNames[key]).join(', ') : t.none;
        if (quoteFields.service) quoteFields.service.value = t.serviceNames[selection.service];
        if (quoteFields.size) quoteFields.size.value = `${selection.squareMetres} m²`;
        if (quoteFields.frequency) quoteFields.frequency.value = t.frequencyNames[selection.frequency];
        if (quoteFields.extras) quoteFields.extras.value = addons;
        if (quoteFields.estimate) quoteFields.estimate.value = estimateText;
        quoteLink.href = '#tarjouspyynto';
    }

    function updateCalculator() {
        const lang = getLanguage();
        const t = copy[lang];
        const selection = getSelection();
        const isQuoteOnly = quoteOnlyServices.has(selection.service) || selection.squareMetres > 180 || selection.squareMetres < 20;

        form.querySelectorAll('.service-choice').forEach(label => {
            label.classList.toggle('is-selected', label.querySelector('input').checked);
        });
        frequencyControl.hidden = selection.service !== 'home';
        extrasFieldset.hidden = quoteOnlyServices.has(selection.service);
        calculatorTicket.classList.toggle('is-quote-only', isQuoteOnly);

        if (isQuoteOnly) {
            result.textContent = t.quote;
            resultUnit.textContent = '';
            resultHours.textContent = selection.squareMetres > 180 ? t.large : t.custom;
            resultNote.textContent = t.custom;
            updateQuoteForm(selection, t.quote);
            return;
        }

        const extraHours = selection.addons.reduce((total, key) => total + addonHours[key], 0);
        const factor = serviceFactors[selection.service] || 1;
        const hours = roundToHalf(getBaseHours(selection.squareMetres) * factor + extraHours);
        const amount = Math.round(hours * HOURLY_RATE);

        result.textContent = String(amount);
        resultUnit.textContent = ' €';
        resultHours.textContent = t.hours(hours);
        resultNote.textContent = t.note;
        // PRICE: Kari to confirm
        updateQuoteForm(selection, `${amount} € (${t.hours(hours)})`);
    }

    form.addEventListener('input', updateCalculator);
    form.addEventListener('change', updateCalculator);
    window.addEventListener('languagechange', updateCalculator);
    updateCalculator();
});
