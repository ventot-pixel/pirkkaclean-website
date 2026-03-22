document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Select all elements with animate-up class
    const animatedElements = document.querySelectorAll('.animate-up');
    animatedElements.forEach(el => observer.observe(el));

    // Subtle mouse parallax to the floating blobs
    const blobs = document.querySelectorAll('.blob');
    
    document.addEventListener('mousemove', (e) => {
        // Prevent parallax on small screens for performance
        if (window.innerWidth < 768) return;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 30; // Different speed for each blob
            
            // Calculate distance from center
            const x = (window.innerWidth / 2 - mouseX) / speed;
            const y = (window.innerHeight / 2 - mouseY) / speed;
            
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    /* --- Language Translation Logic --- */
    
    // Default language is Finnish
    let currentLang = 'fi'; 
    
    const translations = {
        fi: {
            nav_home: "Etusivu",
            nav_business: "Yrityksille",
            nav_housing: "Taloyhtiöille",
            nav_special: "Erikoissiivous",
            nav_values: "Arvot",
            nav_rekry: "Rekry",
            nav_contact: "Ota yhteyttä",
            hero_title: "Hyvällä tavalla <br><span class=\"gradient-text\">vanhanaikainen</span> <br>siivousyritys.",
            hero_desc: "Luotettava siivouskumppani vaativiin yritysympäristöihin. PirkkaClean huolehtii tilojenne puhtaudesta laadukkaasti, huolellisesti ja luotettavasti, jotta te voitte keskittyä liiketoimintanne kasvattamiseen.",
            btn_quote: "Pyydä ilmainen tarjous",
            card1_title: "Yrityksille",
            card1_desc: "Puhtaat toimitilat luovat viihtyisyyttä ja kertovat yrityksesi arvoista.",
            card2_title: "Taloyhtiöille",
            card2_desc: "Huolehdimme taloyhtiösi porraskäytävien ja yleisten tilojen siisteydestä.",
            card3_title: "Erikoissiivous",
            card3_desc: "Rakennus-, muutto- ja perussiivoukset vankalla ammattitaidolla.",
            card_link: "Lue lisää →",
            stat_satisfaction: "Asiakastyytyväisyys",
            stat_employees: "Työntekijöitä",
            stat_sites: "Kohteita",
            stat_founded: "Perustamisvuosi",
            section_business_title: "Yrityksille",
            section_business_desc: "Puhtaat toimitilat luovat viihtyisyyttä ja kertovat yrityksesi arvoista. Meiltä saat luotettavan ylläpitosiivouksen kaikenkokoisiin toimistoihin ja liiketiloihin. Räätälöimme siivousohjelman juuri teidän tarpeisiinne sopivaksi.",
            section_business_list1: "✓ Toimistosiivous ja ylläpitosiivous",
            section_business_list2: "✓ Saniteettitilojen huolto ja tarvikepalvelu",
            section_business_list3: "✓ Joustavat siivousajat",
            section_housing_title: "Taloyhtiöille",
            section_housing_desc: "Huolehdimme taloyhtiösi porraskäytävien, saunatilojen ja muiden yleisten tilojen siisteydestä. Säännöllinen ja huolellinen siivous pidentää pintamateriaalien ikää ja lisää asukkaiden asumisviihtyvyyttä merkittävästi.",
            section_housing_list1: "✓ Porrassiivous ja yleisten tilojen puhtaanapito",
            section_housing_list2: "✓ Saunatilojen ja pesutupien tehopesut",
            section_housing_list3: "✓ Ikkunoiden pesut",
            section_special_title: "Erikoissiivous",
            section_special_desc: "Hoidamme vaativammatkin siivoustyöt vankalla ammattitaidolla ja oikeilla välineillä. Olipa kyseessä sitten rakennustyömaan loppusiivous, perusteellinen muuttosiivous tai lattioiden vahoitustyö, meiltä löytyy osaaminen.",
            section_special_list1: "✓ Rakennus- ja loppusiivoukset",
            section_special_list2: "✓ Lattioiden peruspesut ja vahaukset",
            section_special_list3: "✓ Muuttosiivoukset ammattitaidolla",
            section_values_title: "PirkkaCleanin Arvot",
            section_values_desc: "PirkkaClean on arvojohtettu perheyritys. Me uskomme, että kestävä liiketoiminta ja laadukas työnjälki rakentuvat vahvalle arvopohjalle. Välitämme työntekijöistämme, asiakkaistamme ja ympäristöstä.",
            value1_title: "Luotettavuus",
            value1_desc: "Pidämme sen minkä lupaamme. Sovitut työt tehdään ajallaan ja laadukkaasti.",
            value2_title: "Ammattiylpeys",
            value2_desc: "Jokainen työntekijämme on oikeutettu olemaan terveellä tavalla ylpeä omasta työnjäljestään.",
            value3_title: "Välittäminen",
            value3_desc: "Huolehdimme henkilöstömme hyvinvoinnista, jotta he voivat huolehtia teidän tiloistanne.",
            footer_about_title: "Tietoa meistä",
            footer_about_text: "Tamperelainen PirkkaClean on hyvällä tavalla vanhanaikainen siivousyritys, koska näemme vähän enemmän vaivaa parhaan työnjäljen eteen. Meillä on liki 50 osaavaa ja ahkeraa, nuorempaa ja vähän varttuneempaa puhtaanapidon ammattilaista ja jokainen terveellä tavalla ylpeä työstään ja työnjäljestään.",
            footer_values_title: "Arvot",
            footer_values_text: "PirkkaClean on arvojohtu yritys. Arvot auttavat ihmistä valitsemaan oikein vaikeassakin tilanteessa. Arvoista nouseva tekemisen kulttuuri on yrityksemme sydän.",
            footer_contact_title: "Yhteystiedot",
            footer_phone: "puh.",
            footer_read_more: "Lue lisää...",
            page_home_cleaning_title: "Kotisiivous",
            home_cleaning_hero_title: "Kotisiivousta luotettavasti tutulta siivouskumppaniltasi",
            home_cleaning_hero_desc: "Hoidamme jo taloyhtiönne yhteiset tilat. Anna meidän huolehtia myös kotisi puhtaudesta samalla ammattitaidolla ja huolellisuudella.",
            calc_title: "Laske hinta-arvio kotisiivoukselle",
            calc_label_sqm: "Asunnon koko (m²)",
            calc_result_prefix: "Arvioitu hinta alk.",
            calc_result_suffix: "€ / kerta",
            calc_disclaimer: "*Lopullinen hinta vahvistetaan aina puhelimitse tai kartoituskäynnin yhteydessä.",
            btn_request_exact_quote: "Pyydä tarkka tarjous",
            contact_hero_title: "Tutustutaan ensin —<br><span class=\"gradient-text\">maksutta.</span>",
            contact_hero_desc: "Tulemme mielellämme tiloihinne tutustumaan ilman sitoumuksia. Kartoitamme yhdessä todellisen tarpeen ja annamme rehellisen arvion — emme myy mitään mitä ette oikeasti tarvitse. Tavoitteemme on löytää ratkaisu, jolla tilanne pysyy puhtaana ja helppohoitoisena pitkällä tähtäimellä.",
            contact_hero_desc2: "\"Yli 15 vuoden kokemus opettaa, että paras siivousratkaisu on se, jonka asiakas itse haluaa jatkaa.\"",
            contact_cta: "Varaa maksuton käynti →",
            promise1_title: "Maksuton tilakartoitus",
            promise1_desc: "Käymme paikan päällä tutustumassa tiloihinne — ilman kustannuksia tai sitoumuksia.",
            promise2_title: "Vain mitä oikeasti tarvitset",
            promise2_desc: "Suosittelemme ainoastaan sen, mikä on tarpeellista. Ei turhia palveluja — vain aitoa arvoa.",
            promise3_title: "Henkilökohtainen palvelu",
            promise3_desc: "Omat yhteyshenkilöt — tunnet aina kenen kanssa asioit. Ei puhelinjonoja, ei byrokratiaa.",
            team_title: "Ota suoraan yhteyttä",
            team_desc: "Meidät tavoittaa helposti — soita, laita sähköpostia tai pyydä tarjous.",
            kari_title: "Toimitusjohtaja",
            kristiina_title: "Palvelupäällikkö",
            address_title: "Toimistomme"
        },
        en: {
            nav_home: "Home",
            nav_business: "Business",
            nav_housing: "Housing",
            nav_special: "Specialty",
            nav_values: "Values",
            nav_rekry: "Careers",
            nav_contact: "Contact Us",
            hero_title: "A delightfully <br><span class=\"gradient-text\">old-fashioned</span> <br>cleaning company.",
            hero_desc: "A reliable cleaning partner for demanding business environments. PirkkaClean takes care of the cleanliness of your premises with high quality, care, and reliability, so you can focus on growing your business.",
            btn_quote: "Get a free quote",
            card1_title: "For Businesses",
            card1_desc: "Clean offices create comfort and communicate your company's values.",
            card2_title: "For Housing Companies",
            card2_desc: "We take care of the cleanliness of your stairwells and common areas.",
            card3_title: "Specialty Cleaning",
            card3_desc: "Construction, move-in/out, and deep cleaning with solid professional skill.",
            card_link: "Read more →",
            stat_satisfaction: "Satisfaction",
            stat_employees: "Employees",
            stat_sites: "Locations",
            stat_founded: "Founded",
            section_business_title: "Business Services",
            section_business_desc: "Clean offices create comfort and communicate your company's values. We provide reliable maintenance cleaning for offices and commercial spaces of all sizes. We tailor the cleaning program exactly to your needs.",
            section_business_list1: "✓ Office and maintenance cleaning",
            section_business_list2: "✓ Sanitary facility maintenance and supply service",
            section_business_list3: "✓ Flexible cleaning times",
            section_housing_title: "For Housing Companies",
            section_housing_desc: "We take care of the cleanliness of your stairwells, sauna facilities, and other common areas. Regular and meticulous cleaning extends the lifespan of surface materials and significantly increases residents' comfort.",
            section_housing_list1: "✓ Stairwell cleaning and common area maintenance",
            section_housing_list2: "✓ Thorough cleaning of sauna facilities and laundry rooms",
            section_housing_list3: "✓ Window washing",
            section_special_title: "Specialty Cleaning",
            section_special_desc: "We handle even the most demanding cleaning tasks with solid professional skill and the right equipment. Whether it's final cleaning of a construction site, thorough move-in/out cleaning, or floor waxing, we have the expertise.",
            section_special_list1: "✓ Construction and final cleanings",
            section_special_list2: "✓ Basic floor washing and waxing",
            section_special_list3: "✓ Move-in/out cleanings with professional skill",
            section_values_title: "PirkkaClean Values",
            section_values_desc: "PirkkaClean is a value-driven family business. We believe that sustainable business and high-quality work are built on a strong foundation of values. We care about our employees, our customers, and the environment.",
            value1_title: "Reliability",
            value1_desc: "We keep our promises. Agreed work is done on time and with high quality.",
            value2_title: "Professional Pride",
            value2_desc: "Every employee of ours has the right to be healthily proud of their own work.",
            value3_title: "Caring",
            value3_desc: "We take care of the well-being of our personnel so they can take care of your facilities.",
            footer_about_title: "About Us",
            footer_about_text: "PirkkaClean from Tampere is a delightfully old-fashioned cleaning company, because we put a little more effort into delivering the best results. We are nearly 50 skilled and hardworking professionals, both younger and slightly more mature, and everyone is healthily proud of their work.",
            footer_values_title: "Values",
            footer_values_text: "PirkkaClean is a value-driven company. Values help a person choose correctly even in difficult situations. The culture of doing that rises from values is the heart of our company.",
            footer_contact_title: "Contact Info",
            footer_phone: "tel.",
            footer_read_more: "Read more...",
            page_home_cleaning_title: "Home Cleaning",
            home_cleaning_hero_title: "Reliable home cleaning from your trusted partner",
            home_cleaning_hero_desc: "We already maintain your building's common areas. Let us bring the same professional care to your own home.",
            calc_title: "Calculate an estimated price for home cleaning",
            calc_label_sqm: "Apartment size (sqm)",
            calc_result_prefix: "Estimated price starting from",
            calc_result_suffix: "€ / visit",
            calc_disclaimer: "*The final price is always confirmed by phone or during a mapping visit.",
            btn_request_exact_quote: "Request exact quote",
            contact_hero_title: "Let's meet first —<br><span class=\"gradient-text\">for free.</span>",
            contact_hero_desc: "We are happy to visit your premises without any commitment. Together we map out the real need and give you an honest assessment — we don't sell anything you don't actually need. Our goal is to find a solution that keeps your space clean and easy to maintain in the long run.",
            contact_hero_desc2: "\"Over 15 years of experience teaches us that the best cleaning solution is the one the customer wants to continue.\"",
            contact_cta: "Book a free visit →",
            promise1_title: "Free site survey",
            promise1_desc: "We visit your premises in person — at no cost and with no obligations.",
            promise2_title: "Only what you really need",
            promise2_desc: "We recommend only what is necessary. No unnecessary services — just real value.",
            promise3_title: "Personal service",
            promise3_desc: "Dedicated contacts — you always know who you're dealing with. No queues, no bureaucracy.",
            team_title: "Get in touch directly",
            team_desc: "We are easy to reach — call, send an email, or request a quote.",
            kari_title: "CEO",
            kristiina_title: "Service Manager",
            address_title: "Our office"
        }
    };

    const langBtn = document.getElementById('lang-btn');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    langBtn.addEventListener('click', () => {
        // Toggle language
        currentLang = currentLang === 'fi' ? 'en' : 'fi';
        
        // Update button text to show the OTHER language alternative
        langBtn.textContent = currentLang === 'fi' ? 'EN' : 'FI';
        
        // Update all translated elements
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
    });

    // Calculator Logic (kotisiivous.html)
    const sqmInput = document.getElementById('sqm-input');
    const sqmValue = document.getElementById('sqm-value');
    const calcResult = document.getElementById('calc-result');

    if (sqmInput && sqmValue && calcResult) {
        const calculatePrice = () => {
            const sqm = parseInt(sqmInput.value);
            sqmValue.textContent = sqm;
            
            // Tiered pricing based on Finnish market averages (approx 42€ / hour before tax credit)
            let estimatedHours = 2; // Minimum 2 hours
            
            if (sqm <= 40) {
                estimatedHours = 2;
            } else if (sqm <= 50) {
                estimatedHours = 2.5;
            } else if (sqm <= 70) {
                estimatedHours = 3;
            } else if (sqm <= 90) {
                estimatedHours = 3.5;
            } else if (sqm <= 110) {
                estimatedHours = 4.5;
            } else if (sqm <= 150) {
                estimatedHours = 5.5;
            } else {
                estimatedHours = 5.5 + Math.ceil((sqm - 150) / 30); // 1 extra hour per 30sqm over 150
            }

            const hourlyRate = 42; // standard cleaning rate before kotitalousvähennys
            const price = estimatedHours * hourlyRate;
            
            calcResult.textContent = Math.round(price);
            
            // Optional progress bar fill effect for cross-browser styling
            const progress = ((sqm - sqmInput.min) / (sqmInput.max - sqmInput.min)) * 100;
            sqmInput.style.background = `linear-gradient(to right, var(--pirkka-blue) ${progress}%, rgba(255,255,255,0.1) ${progress}%)`;
        };

        sqmInput.addEventListener('input', calculatePrice);
        // Initialize on load
        calculatePrice();
    }
});
