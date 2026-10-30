document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('home-calculator');
    if (!form) return;

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

    function updateMailto(selection, estimateText) {
        const lang = getLanguage();
        const t = copy[lang];
        const addons = selection.addons.length ? selection.addons.map(key => t.addonNames[key]).join(', ') : t.none;
        const lines = [
            `${t.service}: ${t.serviceNames[selection.service]}`,
            `${t.size}: ${selection.squareMetres} m²`,
            `${t.frequency}: ${t.frequencyNames[selection.frequency]}`,
            `${t.addons}: ${addons}`,
            `${t.estimate}: ${estimateText}`,
            '',
            lang === 'fi' ? 'Toivottu ajankohta:' : 'Preferred timing:',
            lang === 'fi' ? 'Nimi ja puhelinnumero:' : 'Name and phone number:'
        ];
        quoteLink.href = `mailto:asiakaspalvelu@pirkkaclean.fi?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
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
            updateMailto(selection, t.quote);
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
        updateMailto(selection, `${amount} € (${t.hours(hours)})`);
    }

    form.addEventListener('input', updateCalculator);
    form.addEventListener('change', updateCalculator);
    window.addEventListener('languagechange', updateCalculator);
    updateCalculator();
});
