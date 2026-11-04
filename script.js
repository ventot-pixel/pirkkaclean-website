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
            nav_home_cleaning: "Kotisiivous",
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
            home_cleaning_hero_title: "Kotisiivous Tampereella",
            home_cleaning_hero_desc: "Sama tuttu ja huolellinen siivoustiimi auttaa nyt myös kotona. Valitse palvelu ja saat heti suuntaa-antavan arvion.",
            home_hero_fact: "Paikallinen perheyritys vuodesta 2009",
            home_hero_cta: "Laske hinta",
            calc_title: "Hinta-arvio kotiin",
            calc_intro: "Valitse pääpalvelu, kodin koko ja mahdolliset lisätyöt. Näet arvion yhdelle käynnille heti.",
            calc_service_label: "Valitse palvelu",
            calc_service_home: "Kotisiivous",
            calc_service_home_desc: "Säännöllinen tai kertaluonteinen ylläpitosiivous",
            calc_service_deep: "Suursiivous",
            calc_service_deep_desc: "Perusteellinen siivous kodin pinnoille",
            calc_service_move: "Muuttosiivous",
            calc_service_move_desc: "Tyhjän kodin loppusiivous",
            calc_service_windows: "Ikkunanpesu",
            calc_service_windows_desc: "Lasit, puitteet ja ikkunalaudat",
            calc_service_reno: "Remonttisiivous",
            calc_service_reno_desc: "Rakennuspöly ja viimeistelevä puhdistus",
            calc_service_special: "Muu erikoissiivous",
            calc_service_special_desc: "Lattiat, tekstiilit tai yksilöllinen tarve",
            calc_label_sqm: "Kodin koko",
            calc_size_help: "20–300 m². Yli 180 m² kohteet arvioidaan erikseen.",
            calc_frequency_label: "Käyntitiheys",
            calc_frequency_weekly: "Viikoittain",
            calc_frequency_biweekly: "Joka toinen viikko",
            calc_frequency_monthly: "Neljän viikon välein",
            calc_frequency_once: "Kertaluonteinen",
            calc_addons_label: "Lisää samaan käyntiin",
            calc_addon_oven: "Uunin puhdistus",
            calc_addon_fridge: "Jääkaapin sisäpuoli",
            calc_addon_sauna: "Saunan pesu",
            calc_addon_balcony: "Parveke tai terassi",
            calc_result_prefix: "Arvio yhdelle käynnille",
            calc_result_suffix: "€ / kerta",
            calc_includes_title: "Arvio sisältää",
            calc_includes_products: "Ammattivälineet ja puhdistusaineet",
            calc_includes_vat: "ALV:n",
            calc_includes_plan: "Valitsemasi lisätyöt",
            // PRICE: Kari to confirm
            calc_disclaimer: "Arvio perustuu 42 €:n tuntihintaan. Lopullinen työaika ja hinta vahvistetaan ennen tilausta.",
            btn_request_exact_quote: "Pyydä tarkka tarjous",
            home_services_title: "Mihin apua tarvitaan?",
            home_services_intro: "Sama yhteyshenkilö auttaa valitsemaan sopivan työn laajuuden. Käynti voi olla säännöllinen, kertaluonteinen tai osa muuttoa.",
            home_service_regular_title: "Arjen kotisiivous",
            home_service_regular_desc: "Pölyt, tasot, lattiat, keittiö ja saniteettitilat sovitussa laajuudessa. Säännöllinen rytmi pitää kodin helpommin hallittavana.",
            home_service_regular_item1: "Viikoittain, joka toinen viikko tai neljän viikon välein",
            home_service_regular_item2: "Omat toiveet kirjataan työohjeeseen",
            home_service_deep_title: "Suursiivous ja muutto",
            home_service_deep_desc: "Kun koti tarvitsee tavallista perusteellisemman käsittelyn, sovimme tilat, pinnat ja tavoitetason ennen työn alkua.",
            home_service_deep_item1: "Suursiivous kalustetussa kodissa",
            home_service_deep_item2: "Muuttosiivous tyhjässä asunnossa",
            home_service_extra_title: "Ikkunat ja lisätyöt",
            home_service_extra_desc: "Ikkunanpesu, sauna, kodinkoneet, parveke ja muut sovitut lisätyöt voidaan yhdistää samaan käyntiin.",
            home_service_extra_item1: "Ikkunoiden määrä ja avautuvat pinnat kartoitetaan",
            home_service_extra_item2: "Lisätyö sovitaan aina etukäteen",
            home_process_title: "Näin se alkaa",
            home_process_intro: "Laskuri antaa lähtökohdan. Vahvistamme vielä tarpeen, laajuuden ja ajankohdan kanssasi ennen ensimmäistä käyntiä.",
            home_process_request: "Tarjouspyyntö",
            home_process_request_time: "2 min",
            home_process_request_desc: "Lähetä laskurin valinnat ja yhteystietosi.",
            home_process_confirm: "Vahvistus",
            home_process_confirm_time: "Henkilökohtainen",
            home_process_confirm_desc: "Käymme läpi kodin, toiveet ja kulun kohteeseen.",
            home_process_visit: "Siivouskäynti",
            home_process_visit_time: "Sovittuna aikana",
            home_process_visit_desc: "Ammattilainen tekee sovitut työt ja kertoo, jos tarve muuttuu.",
            home_process_result: "Lopputulos",
            home_process_result_desc: "Puhdas koti, selkeästi sovittuna",
            home_faq_title: "Usein kysyttyä",
            home_faq_facts: "Palvelemme Tampereella ja lähialueilla. Työn laajuus ja kulku kotiin sovitaan aina etukäteen.",
            home_faq_q1: "Mitä tavallinen kotisiivous sisältää?",
            home_faq_a1: "Sovittu ylläpitosiivous kattaa tavallisesti vapaat tasot, pölyt, lattiat, keittiön pinnat sekä wc- ja pesutilat. Kirjaamme kodin omat painotukset työohjeeseen.",
            home_faq_q2: "Pitääkö minun olla kotona?",
            home_faq_a2: "Ei tarvitse. Avaimesta, ovikoodista tai muusta turvallisesta sisäänpääsystä voidaan sopia etukäteen.",
            home_faq_q3: "Voinko valita vain tietyt huoneet?",
            home_faq_a3: "Kyllä. Voimme rajata käynnin esimerkiksi keittiöön, pesutiloihin tai muuhun sovittuun kokonaisuuteen.",
            home_faq_q4: "Onko laskurin hinta sitova?",
            home_faq_a4: "Ei. Se on suuntaa-antava arvio tavallisen kunnon perusteella. Vahvistamme lopullisen työajan ja hinnan ennen tilausta.",
            home_faq_cta: "Kysy omasta kodistasi",
            home_cta_side: "Kerro kodin koko, toivottu palvelu ja sopiva ajankohta. Me tarkistamme, että arvio vastaa todellista tarvetta.",
            home_cta_title: "Sovitaan siivous",
            home_cta_desc: "Saat henkilökohtaisen vahvistuksen ennen kuin mitään varataan.",
            home_cta_button: "Lähetä tarjouspyyntö",
            home_footer_message: "Hyvällä tavalla vanhanaikainen siivousyritys. Näemme vähän enemmän vaivaa parhaan työnjäljen eteen.",
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
            address_title: "Toimistomme",
            form_title: "Lähetä viesti",
            form_desc: "Täytä lomake ja palaamme asiaan mahdollisimman pian.",
            form_name: "Nimi",
            form_company: "Yritys",
            form_email: "Sähköposti",
            form_phone: "Puhelinnumero",
            form_message: "Viesti",
            form_submit: "Lähetä viesti →",
            form_success_msg: "Kiitos! Otamme yhteyttä pian.",
            about_label: "Tietoa meistä",
            about_title: "Hyvällä tavalla <span class=\"gradient-text\">vanhanaikainen</span> siivousyritys.",
            about_desc: "Tamperelainen PirkkaClean on hyvällä tavalla vanhanaikainen siivousyritys, koska näemme vähän enemmän vaivaa parhaan työnjäljen eteen. Meillä on liki 50 osaavaa ja ahkeraa, nuorempaa ja vähän varttuneempaa puhtaanapidon ammattilaista ja jokainen terveellä tavalla ylpeä työstään ja työnjäljestään.",
            about_stat_founded: "Perustettu",
            about_stat_staff: "Ammattilaista",
            about_stat_satisfaction: "Tyytyväisyys",
            about_stat_sites: "Kohdetta",
            values_label: "Arvomme",
            rekry_label: "Rekrytointi",
            rekry_title: "Tule töihin <span class=\"gradient-text\">PirkkaCleanille.</span>",
            rekry_desc: "Etsimme jatkuvasti uusia puhtaanapidon ammattilaisia joukkoomme. Jos hyvällä tavalla vanhanaikainen siivousyritys tuntuu sinun paikaltasi — kuulemme mielellämme sinusta.",
            rekry_benefit1_title: "Vakaa työnantaja",
            rekry_benefit1_desc: "Olemme toimineet vuodesta 2009. Tarjoamme pitkäaikaisia ja vakaita työsuhteita Tampereella.",
            rekry_benefit2_title: "Hyvä työporukka",
            rekry_benefit2_desc: "Meillä on lähes 60 ammattilaista. Välitämme henkilöstömme hyvinvoinnista — se näkyy arjessa.",
            rekry_benefit3_title: "Ammatillinen kasvu",
            rekry_benefit3_desc: "Tuemme osaamistasi ja tarjoamme mahdollisuuden kehittyä alan ammattilaisena.",
            rekry_form_title: "Lähetä avoin hakemus",
            rekry_form_desc: "Täytä tiedot ja liitä CV. Palaamme sinulle mahdollisimman pian.",
            rekry_field_name: "Nimi",
            rekry_field_phone: "Puhelinnumero",
            rekry_field_email: "Sähköposti",
            rekry_field_position: "Haettava tehtävä",
            rekry_position_placeholder: "Valitse tehtävä...",
            rekry_pos1: "Siivoustyöntekijä",
            rekry_pos2: "Erikoissiivooja",
            rekry_pos3: "Tiiminvetäjä",
            rekry_pos4: "Muu / Avoin hakemus",
            rekry_field_message: "Kerro lyhyesti itsestäsi",
            rekry_optional: "(valinnainen)",
            rekry_field_cv: "Liitä CV",
            rekry_cv_drag: "Vedä CV tähän tai klikkaa valitaksesi",
            rekry_cv_hint: "PDF, DOC tai DOCX — max 5 MB",
            rekry_submit: "Lähetä hakemus →",
            rekry_success_msg: "Kiitos hakemuksesta! Olemme yhteydessä pian."
        },
        en: {
            nav_home: "Home",
            nav_home_cleaning: "Home Cleaning",
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
            home_cleaning_hero_title: "Home cleaning in Tampere",
            home_cleaning_hero_desc: "The same familiar and careful cleaning team now helps at home. Choose a service and see an instant estimate.",
            home_hero_fact: "A local family business since 2009",
            home_hero_cta: "Calculate price",
            calc_title: "Your price estimate",
            calc_intro: "Choose the main service, home size and any add-ons. You will see an estimate for one visit instantly.",
            calc_service_label: "Choose a service",
            calc_service_home: "Home cleaning",
            calc_service_home_desc: "Recurring or one-time maintenance cleaning",
            calc_service_deep: "Deep cleaning",
            calc_service_deep_desc: "A thorough clean for the home's surfaces",
            calc_service_move: "Move-out cleaning",
            calc_service_move_desc: "Final cleaning of an empty home",
            calc_service_windows: "Window cleaning",
            calc_service_windows_desc: "Glass, frames and window sills",
            calc_service_reno: "Post-renovation cleaning",
            calc_service_reno_desc: "Construction dust and final cleaning",
            calc_service_special: "Other specialty cleaning",
            calc_service_special_desc: "Floors, textiles or an individual need",
            calc_label_sqm: "Home size",
            calc_size_help: "20–300 m². Homes over 180 m² are estimated separately.",
            calc_frequency_label: "Frequency",
            calc_frequency_weekly: "Weekly",
            calc_frequency_biweekly: "Every two weeks",
            calc_frequency_monthly: "Every four weeks",
            calc_frequency_once: "One-time",
            calc_addons_label: "Add to the same visit",
            calc_addon_oven: "Oven cleaning",
            calc_addon_fridge: "Refrigerator interior",
            calc_addon_sauna: "Sauna cleaning",
            calc_addon_balcony: "Balcony or terrace",
            calc_result_prefix: "Estimate for one visit",
            calc_result_suffix: "€ / visit",
            calc_includes_title: "Estimate includes",
            calc_includes_products: "Professional equipment and cleaning products",
            calc_includes_vat: "VAT",
            calc_includes_plan: "Your selected add-ons",
            // PRICE: Kari to confirm
            calc_disclaimer: "The estimate uses an hourly rate of €42. Final duration and price are confirmed before ordering.",
            btn_request_exact_quote: "Request exact quote",
            home_services_title: "Where do you need help?",
            home_services_intro: "One contact helps you choose the right scope. The visit can be recurring, one-time or part of a move.",
            home_service_regular_title: "Everyday home cleaning",
            home_service_regular_desc: "Dust, surfaces, floors, kitchen and washrooms to the agreed scope. A recurring rhythm keeps the home easier to manage.",
            home_service_regular_item1: "Weekly, every two weeks or every four weeks",
            home_service_regular_item2: "Your preferences are recorded in the work instructions",
            home_service_deep_title: "Deep clean and move",
            home_service_deep_desc: "When the home needs a more thorough treatment, we agree the rooms, surfaces and target level before work begins.",
            home_service_deep_item1: "Deep cleaning in a furnished home",
            home_service_deep_item2: "Move-out cleaning in an empty home",
            home_service_extra_title: "Windows and add-ons",
            home_service_extra_desc: "Window cleaning, sauna, appliances, balcony and other agreed tasks can be combined into the same visit.",
            home_service_extra_item1: "We assess window count and opening glass surfaces",
            home_service_extra_item2: "Extra work is always agreed in advance",
            home_process_title: "How it starts",
            home_process_intro: "The calculator gives a starting point. We confirm the need, scope and timing with you before the first visit.",
            home_process_request: "Quote request",
            home_process_request_time: "2 min",
            home_process_request_desc: "Send your calculator choices and contact details.",
            home_process_confirm: "Confirmation",
            home_process_confirm_time: "Personal",
            home_process_confirm_desc: "We review the home, wishes and access arrangements.",
            home_process_visit: "Cleaning visit",
            home_process_visit_time: "At the agreed time",
            home_process_visit_desc: "A professional completes the agreed work and tells you if the need changes.",
            home_process_result: "Result",
            home_process_result_desc: "A clean home, clearly agreed",
            home_faq_title: "Frequently asked",
            home_faq_facts: "We serve Tampere and nearby areas. The scope and access to the home are always agreed in advance.",
            home_faq_q1: "What does regular home cleaning include?",
            home_faq_a1: "The agreed maintenance clean usually covers clear surfaces, dust, floors, kitchen surfaces, toilets and washrooms. We record your home's priorities in the work instructions.",
            home_faq_q2: "Do I need to be at home?",
            home_faq_a2: "No. A key, door code or another secure way to enter can be agreed beforehand.",
            home_faq_q3: "Can I choose only certain rooms?",
            home_faq_a3: "Yes. We can limit the visit to the kitchen, washrooms or another agreed area.",
            home_faq_q4: "Is the calculator price binding?",
            home_faq_a4: "No. It is a directional estimate based on normal conditions. We confirm the final duration and price before ordering.",
            home_faq_cta: "Ask about your home",
            home_cta_side: "Tell us the home size, desired service and suitable timing. We check that the estimate matches the real need.",
            home_cta_title: "Book your cleaning",
            home_cta_desc: "You receive a personal confirmation before anything is booked.",
            home_cta_button: "Send quote request",
            home_footer_message: "A delightfully old-fashioned cleaning company. We put in a little more effort to deliver the best result.",
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
            address_title: "Our office",
            form_title: "Send a message",
            form_desc: "Fill in the form and we'll get back to you as soon as possible.",
            form_name: "Name",
            form_company: "Company",
            form_email: "Email",
            form_phone: "Phone",
            form_message: "Message",
            form_submit: "Send message →",
            form_success_msg: "Thank you! We'll be in touch soon.",
            about_label: "About Us",
            about_title: "A delightfully <span class=\"gradient-text\">old-fashioned</span> cleaning company.",
            about_desc: "PirkkaClean from Tampere is a delightfully old-fashioned cleaning company, because we put a little more effort into delivering the best results. We have nearly 50 skilled and hardworking professionals — both younger and slightly more experienced — and every one of them is healthily proud of their work.",
            about_stat_founded: "Founded",
            about_stat_staff: "Professionals",
            about_stat_satisfaction: "Satisfaction",
            about_stat_sites: "Locations",
            values_label: "Our Values",
            rekry_label: "Careers",
            rekry_title: "Join the <span class=\"gradient-text\">PirkkaClean</span> team.",
            rekry_desc: "We are always looking for new cleaning professionals to join us. If a delightfully old-fashioned cleaning company sounds like the right fit for you — we'd love to hear from you.",
            rekry_benefit1_title: "Stable employer",
            rekry_benefit1_desc: "We have been operating since 2009. We offer long-term and stable employment in Tampere.",
            rekry_benefit2_title: "Great team",
            rekry_benefit2_desc: "We have nearly 60 professionals. We care about the well-being of our staff — and it shows.",
            rekry_benefit3_title: "Professional growth",
            rekry_benefit3_desc: "We support your skills and offer opportunities to grow as a cleaning professional.",
            rekry_form_title: "Send an open application",
            rekry_form_desc: "Fill in your details and attach your CV. We'll get back to you as soon as possible.",
            rekry_field_name: "Name",
            rekry_field_phone: "Phone number",
            rekry_field_email: "Email",
            rekry_field_position: "Position",
            rekry_position_placeholder: "Select a position...",
            rekry_pos1: "Cleaning worker",
            rekry_pos2: "Specialist cleaner",
            rekry_pos3: "Team leader",
            rekry_pos4: "Other / Open application",
            rekry_field_message: "Tell us a bit about yourself",
            rekry_optional: "(optional)",
            rekry_field_cv: "Attach CV",
            rekry_cv_drag: "Drag your CV here or click to select",
            rekry_cv_hint: "PDF, DOC or DOCX — max 5 MB",
            rekry_submit: "Send application →",
            rekry_success_msg: "Thank you for applying! We'll be in touch soon."
        }
    };

    const langBtn = document.getElementById('lang-btn');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    if (langBtn) langBtn.addEventListener('click', () => {
        // Toggle language
        currentLang = currentLang === 'fi' ? 'en' : 'fi';
        
        // Update button text to show the OTHER language alternative
        langBtn.textContent = currentLang === 'fi' ? 'EN' : 'FI';
        document.documentElement.lang = currentLang;
        
        // Update all translated elements
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: currentLang } }));
    });

    // Rekry form handlers
    window.handleRekrySubmit = (e) => {
        e.preventDefault();
        const success = document.getElementById('rekry-success');
        if (success) {
            success.style.display = 'block';
            e.target.reset();
            document.getElementById('cv-file-name').style.display = 'none';
            document.getElementById('cv-upload-area').classList.remove('cv-has-file');
        }
    };

    window.handleFileSelect = (input) => {
        const fileNameEl = document.getElementById('cv-file-name');
        const uploadArea = document.getElementById('cv-upload-area');
        if (input.files && input.files[0]) {
            fileNameEl.textContent = '✓ ' + input.files[0].name;
            fileNameEl.style.display = 'block';
            uploadArea.classList.add('cv-has-file');
        }
    };

    // CV drag-and-drop highlight
    const uploadArea = document.getElementById('cv-upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('cv-drag-over'); });
        uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('cv-drag-over'));
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('cv-drag-over');
            const fileInput = document.getElementById('cv-file');
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileSelect(fileInput);
            }
        });
    }

    // Contact form submit handler
    window.handleFormSubmit = (e) => {
        e.preventDefault();
        const success = document.getElementById('form-success');
        if (success) {
            success.style.display = 'block';
            e.target.reset();
        }
    };

    // Animate homepage proof points once, while keeping their final values in HTML.
    const statCounters = document.querySelectorAll('.stat-item h2[data-count]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateCounter = (element) => {
        const target = Number.parseInt(element.dataset.count, 10);
        const suffix = element.dataset.suffix || '';

        if (!Number.isFinite(target) || prefersReducedMotion) {
            return;
        }

        const duration = 1400;
        const startedAt = performance.now();
        element.textContent = `0${suffix}`;

        const update = (now) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            element.textContent = `${Math.round(target * easedProgress)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    if ('IntersectionObserver' in window && statCounters.length > 0 && !prefersReducedMotion) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        statCounters.forEach((counter) => counterObserver.observe(counter));
    }

    /* Theme Override Toggle */
    /* Press 'T' to toggle manually between dark and light modes */
    document.addEventListener('keydown', (e) => {
        // Prevent triggering while typing in inputs
        if (e.key.toLowerCase() === 't' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
            const isCurrentlyDark = document.body.classList.contains('dark-theme');
            
            if (isCurrentlyDark) {
                // Switch to light
                document.body.classList.add('light-theme');
                document.body.classList.remove('dark-theme');
            } else {
                // Switch to dark
                document.body.classList.add('dark-theme');
                document.body.classList.remove('light-theme');
            }
        }
    });
});
