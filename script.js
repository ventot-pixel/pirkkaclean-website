document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-up');
    if (animatedElements.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('visible'));
    }

    // Subtle mouse parallax to the floating blobs
    const blobs = document.querySelectorAll('.blob');
    
    const canUseParallax = blobs.length
        && window.matchMedia('(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches
        && Array.from(blobs).some(blob => getComputedStyle(blob).display !== 'none');

    if (canUseParallax) {
        let pointerX = window.innerWidth / 2;
        let pointerY = window.innerHeight / 2;
        let parallaxFrame = 0;

        const updateParallax = () => {
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 30;
                const x = (window.innerWidth / 2 - pointerX) / speed;
                const y = (window.innerHeight / 2 - pointerY) / speed;
                blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
            parallaxFrame = 0;
        };

        document.addEventListener('pointermove', (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;
            if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateParallax);
        }, { passive: true });
    }

    /* --- Language Translation Logic --- */
    
    // Keep the selected language while navigating, but reset to Finnish on refresh.
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const isPageRefresh = navigationEntry
        ? navigationEntry.type === 'reload'
        : performance.navigation && performance.navigation.type === 1;
    let currentLang = 'fi';
    try {
        if (isPageRefresh) {
            sessionStorage.removeItem('pirkkaclean-language');
        } else {
            currentLang = sessionStorage.getItem('pirkkaclean-language') === 'en' ? 'en' : 'fi';
        }
    } catch (error) {
        currentLang = 'fi';
    }
    
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
            section_business_list1: "Toimistosiivous ja ylläpitosiivous",
            section_business_list2: "Saniteettitilojen huolto ja tarvikepalvelu",
            section_business_list3: "Joustavat siivousajat",
            section_housing_title: "Taloyhtiöille",
            section_housing_desc: "Huolehdimme taloyhtiösi porraskäytävien, saunatilojen ja muiden yleisten tilojen siisteydestä. Säännöllinen ja huolellinen siivous pidentää pintamateriaalien ikää ja lisää asukkaiden asumisviihtyvyyttä merkittävästi.",
            section_housing_list1: "Porrassiivous ja yleisten tilojen puhtaanapito",
            section_housing_list2: "Saunatilojen ja pesutupien tehopesut",
            section_housing_list3: "Ikkunoiden pesut",
            section_special_title: "Erikoissiivous",
            section_special_desc: "Hoidamme vaativammatkin siivoustyöt vankalla ammattitaidolla ja oikeilla välineillä. Olipa kyseessä sitten rakennustyömaan loppusiivous, perusteellinen muuttosiivous tai lattioiden vahoitustyö, meiltä löytyy osaaminen.",
            section_special_list1: "Rakennus- ja loppusiivoukset",
            section_special_list2: "Lattioiden peruspesut ja vahaukset",
            section_special_list3: "Muuttosiivoukset ammattitaidolla",
            landing_tab_services: "Palvelut",
            landing_tab_process: "Yhteistyö",
            landing_tab_contact: "Tarjous",
            landing_scope_agreed: "Sovitusti",
            landing_scope_need: "Tarpeen mukaan",
            landing_scope_schedule: "Aikataulun mukaan",
            landing_scope_plan: "Suunnitelman mukaan",
            landing_process_title: "Näin se toimii",
            business_hero_cta: "Pyydä siivoussuunnitelma",
            business_scope_title: "Sovittu puhtaustaso",
            business_scope_intro: "Käymme tilat ja tarpeet yhdessä läpi. Saat selkeän suunnitelman siitä, mitä tehdään, milloin ja millä rytmillä.",
            business_scope_group1: "Ylläpitosiivous",
            business_scope_item1: "Toimistot ja työtilat",
            business_scope_item2: "Yhteiset tilat",
            business_scope_item3: "Saniteettitilat",
            business_scope_group2: "Huolto ja rytmi",
            business_scope_item4: "Tarvikepalvelu",
            business_scope_item5: "Joustavat siivousajat",
            business_process1_title: "Kartoitamme tilat",
            business_process1_text: "Käymme läpi tilojen käytön, puhtaustavoitteen ja työn kannalta tärkeät yksityiskohdat.",
            business_process2_title: "Kirjaamme suunnitelman",
            business_process2_text: "Työn sisältö, käyntirytmi ja sopivat kellonajat kirjataan selkeäksi siivousohjelmaksi.",
            business_process3_title: "Teemme sovitun työn",
            business_process3_text: "Ammattilainen huolehtii kohteesta sovittuna aikana ja sovitulla työohjeella.",
            business_process4_title: "Pidämme yhteyttä",
            business_process4_text: "Jos tilojen käyttö tai tarve muuttuu, päivitämme suunnitelman yhdessä.",
            business_proof_title: "Vähän enemmän vaivaa",
            business_proof_text: "PirkkaClean on tamperelainen siivousyritys, jossa sovitusta työstä ja työnjäljestä pidetään kiinni. Saat yhteyden ihmiseen, joka tuntee kohteenne.",
            business_fact1_value: "Tampere",
            business_fact1_text: "ja ympäristökunnat",
            business_fact2_value: "Liki 50",
            business_fact2_text: "puhtaanapidon ammattilaista",
            business_contact_note: "Kerro tiloista, käyttäjämäärästä ja toivotusta siivousrytmistä. Palaamme sopivan kokonaisuuden kanssa.",
            business_contact_title: "Selkeä siivousohjelma",
            business_contact_text: "Suunnitellaan toimitiloillenne palvelu, jonka sisältö ja aikataulu ovat kaikille selvät.",
            business_contact_cta: "Pyydä tarjous",
            housing_hero_cta: "Pyydä siivoussuunnitelma",
            housing_scope_title: "Yhteiset tilat kunnossa",
            housing_scope_intro: "Sovimme taloyhtiön kanssa tilat, käyntirytmin ja erityistä huomiota vaativat kohdat. Työohje pysyy selkeänä myös tarpeiden muuttuessa.",
            housing_scope_group1: "Säännöllinen puhtaanapito",
            housing_scope_item1: "Porraskäytävät",
            housing_scope_item2: "Yleiset tilat",
            housing_scope_item3: "Sauna- ja pesutilat",
            housing_scope_group2: "Erikseen sovittavat työt",
            housing_scope_item4: "Pesutupien tehopesu",
            housing_scope_item5: "Ikkunoiden pesu",
            housing_process1_title: "Kierros kohteessa",
            housing_process1_text: "Käymme läpi porraskäytävät, yhteiset tilat ja taloyhtiön omat painotukset.",
            housing_process2_title: "Sopiva käyntirytmi",
            housing_process2_text: "Määritämme tilojen käyttöön ja vuodenaikoihin sopivan säännöllisen rytmin.",
            housing_process3_title: "Huolellinen toteutus",
            housing_process3_text: "Kohde hoidetaan sovitun työohjeen mukaan ja poikkeamista ilmoitetaan.",
            housing_process4_title: "Yhteys säilyy",
            housing_process4_text: "Palautteet ja kausittaiset lisätarpeet päivitetään suoraan yhteyshenkilön kanssa.",
            housing_proof_title: "Siisteys näkyy arjessa",
            housing_proof_text: "Säännöllinen työ pitää yhteiset tilat viihtyisinä ja auttaa pintamateriaaleja kestämään käytössä pidempään.",
            housing_fact1_value: "Tampere",
            housing_fact1_text: "ja ympäristökunnat",
            housing_fact2_value: "Sovittu",
            housing_fact2_text: "työohje ja yhteyshenkilö",
            housing_contact_note: "Kerro taloyhtiön koosta ja yhteisistä tiloista. Teemme ehdotuksen selkeästä siivousrytmistä.",
            housing_contact_title: "Suunnitelma taloyhtiölle",
            housing_contact_text: "Sovitaan puhtaustaso, käyntirytmi ja kausittaiset työt yhdessä.",
            housing_contact_cta: "Pyydä tarjous",
            special_hero_cta: "Pyydä työstä arvio",
            special_scope_title: "Vaativa työ hallintaan",
            special_scope_intro: "Erikoissiivous alkaa aina työn, pintojen ja tavoitteen kartoituksella. Näin valitsemme oikeat menetelmät, välineet ja työajan.",
            special_scope_group1: "Kohteen viimeistely",
            special_scope_item1: "Rakennussiivous",
            special_scope_item2: "Loppusiivous",
            special_scope_item3: "Muuttosiivous",
            special_scope_group2: "Pintojen käsittely",
            special_scope_item4: "Lattioiden peruspesu",
            special_scope_item5: "Lattioiden vahaus",
            special_process1_title: "Rajaamme työn",
            special_process1_text: "Selvitämme kohteen, pinnat, aikataulun ja valmiin työn tavoitetason.",
            special_process2_title: "Valitsemme menetelmän",
            special_process2_text: "Työtapa ja välineet valitaan pinnan ja lian mukaan ennen työn aloittamista.",
            special_process3_title: "Toteutamme turvallisesti",
            special_process3_text: "Ammattilaiset tekevät sovitun työn huolellisesti ja kohteen muut työt huomioiden.",
            special_process4_title: "Luovutamme valmiina",
            special_process4_text: "Käymme lopputuloksen läpi ja varmistamme, että sovittu tavoite täyttyy.",
            special_proof_title: "Oikea tapa jokaiselle pinnalle",
            special_proof_text: "Vaativa siivous ei ole yksi valmis paketti. Työ mitoitetaan kohteen, materiaalien ja tavoitellun lopputuloksen mukaan.",
            special_fact1_value: "Kartoitus",
            special_fact1_text: "ennen työn aloittamista",
            special_fact2_value: "Sovittu",
            special_fact2_text: "menetelmä ja lopputulos",
            special_contact_note: "Kerro kohteesta, pinnoista ja aikataulusta. Selvitämme oikean työtavan ja työmäärän.",
            special_contact_title: "Arvio vaativasta työstä",
            special_contact_text: "Saat selkeän ehdotuksen työn sisällöstä, menetelmästä ja aikataulusta.",
            special_contact_cta: "Pyydä arvio",
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
            footer_home_cleaning_text: "Huolellinen kotisiivous helpottaa arkea. Saat säännöllisen tai kertaluonteisen siivouksen kotiisi selkeällä hinta-arviolla.",
            footer_values_title: "Arvot",
            footer_values_text: "PirkkaClean on arvojohtu yritys. Arvot auttavat ihmistä valitsemaan oikein vaikeassakin tilanteessa. Arvoista nouseva tekemisen kulttuuri on yrityksemme sydän.",
            footer_contact_title: "Yhteystiedot",
            footer_phone: "puh.",
            footer_read_more: "Lue lisää...",
            page_home_cleaning_title: "Kotisiivous",
            home_cleaning_hero_title: "Kotisiivous",
            home_cleaning_hero_desc: "Huolellinen kotisiivous helpottaa arkea ja pitää kodin viihtyisänä. Sovimme työn laajuuden, käyntirytmin ja kodin omat toiveet aina kanssasi etukäteen.",
            home_hero_list1: "Säännöllinen tai kertaluonteinen kotisiivous",
            home_hero_list2: "Keittiön, pesutilojen, tasojen ja lattioiden puhdistus",
            home_hero_list3: "Kodin omat toiveet kirjataan työohjeeseen",
            home_hero_cta: "Laske hinta-arvio",
            calc_title: "Hinta-arvio kotiin",
            calc_intro: "Valitse palvelu, kodin koko ja käyntirytmi. Näet työn, käyntimaksun ja kotitalousvähennyksen vaikutuksen heti.",
            calc_service_label: "Valitse palvelu",
            calc_service_home: "Säännöllinen kotisiivous",
            calc_service_home_desc: "Viikoittain, kahden tai neljän viikon välein",
            calc_service_deep: "Kertasiivous",
            calc_service_deep_desc: "Yksittäinen perusteellinen siivouskäynti",
            calc_service_move: "Muuttosiivous",
            calc_service_move_desc: "Tyhjän kodin loppusiivous",
            calc_service_windows: "Ikkunanpesu",
            calc_service_windows_desc: "Arvio avattavien ikkunoiden määrän mukaan",
            calc_service_reno: "Remonttisiivous",
            calc_service_reno_desc: "Rakennuspöly ja viimeistelevä puhdistus",
            calc_service_special: "Allergiasiivous",
            calc_service_special_desc: "Tavallista tarkempi pölyn ja allergeenien poisto",
            calc_label_sqm: "Kodin koko",
            calc_size_help: "30–300 m². Arvio perustuu keskimääräiseen työaikaan.",
            calc_frequency_label: "Käyntitiheys",
            calc_frequency_weekly: "Viikoittain",
            calc_frequency_biweekly: "Joka toinen viikko",
            calc_frequency_monthly: "Neljän viikon välein",
            calc_frequency_once: "Kertaluonteinen",
            calc_package_label: "Välinepaketti",
            calc_package_basic: "Peruspaketti",
            calc_package_vacuum: "Puhdaspaketti, sisältää imurin",
            calc_package_help: "Paketti vaikuttaa käynti- ja välinemaksuun.",
            calc_addons_label: "Lisää samaan käyntiin",
            calc_addon_oven: "Uunin puhdistus",
            calc_addon_fridge: "Jääkaapin sisäpuoli",
            calc_addon_sauna: "Saunan pesu",
            calc_addon_balcony: "Parveke tai terassi",
            calc_result_prefix: "Arvio yhdelle käynnille",
            calc_result_suffix: "€ / kerta",
            calc_total_label: "Arvio yhdelle käynnille",
            calc_labor_label: "Siivoustyö",
            calc_visit_label: "Käynti- ja välinemaksu",
            calc_credit_label: "Kotitalousvähennyksen jälkeen",
            calc_includes_title: "Hinnoittelun perusteet",
            calc_includes_products: "Käyntimaksu kattaa matkat ja valitun välinepaketin",
            calc_includes_vat: "Hinnat sisältävät ALV 25,5 %",
            calc_includes_plan: "Kotitalousvähennys lasketaan vain työn osuudesta",
            calc_disclaimer: "Vähennysarvio ei huomioi 150 € omavastuuta tai 2 100 € vuotuista enimmäismäärää. Lopullinen työaika vahvistetaan ennen tilausta.",
            calc_other_prices_title: "Muut hinnat ja poikkeukset",
            calc_season_price: "Joulusesongin 7.–27.12.2026 kertapalvelut 75 €/h. Muulloin kertapalvelut 70 €/h.",
            calc_fee_key: "Avaimen nouto tai palautus",
            calc_fee_equipment: "Siivousvälineiden toimitus tai haku",
            calc_fee_ladder: "Tikkaiden vuokra / käynti",
            calc_fee_invoice: "Paperilaskun laskutuslisä",
            calc_fee_reminder: "Maksumuistutus",
            calc_fee_cloths: "Siivousliinojen pesu",
            calc_fee_vacuum: "Imurin lunastus",
            calc_fee_basic_package: "Peruspaketin lunastus",
            calc_fee_clean_package: "Puhdaspaketin lunastus",
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
            rekry_title: "Tule töihin <span class=\"pirkka-text\">Pirkka</span><span class=\"clean-text\">Cleanille.</span>",
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
            section_business_list1: "Office and maintenance cleaning",
            section_business_list2: "Sanitary facility maintenance and supply service",
            section_business_list3: "Flexible cleaning times",
            section_housing_title: "For Housing Companies",
            section_housing_desc: "We take care of the cleanliness of your stairwells, sauna facilities, and other common areas. Regular and meticulous cleaning extends the lifespan of surface materials and significantly increases residents' comfort.",
            section_housing_list1: "Stairwell cleaning and common area maintenance",
            section_housing_list2: "Thorough cleaning of sauna facilities and laundry rooms",
            section_housing_list3: "Window washing",
            section_special_title: "Specialty Cleaning",
            section_special_desc: "We handle even the most demanding cleaning tasks with solid professional skill and the right equipment. Whether it's final cleaning of a construction site, thorough move-in/out cleaning, or floor waxing, we have the expertise.",
            section_special_list1: "Construction and final cleanings",
            section_special_list2: "Basic floor washing and waxing",
            section_special_list3: "Move-in/out cleanings with professional skill",
            landing_tab_services: "Services",
            landing_tab_process: "How we work",
            landing_tab_contact: "Quote",
            landing_scope_agreed: "As agreed",
            landing_scope_need: "As needed",
            landing_scope_schedule: "By schedule",
            landing_scope_plan: "By plan",
            landing_process_title: "How it works",
            business_hero_cta: "Request a cleaning plan",
            business_scope_title: "An agreed cleaning standard",
            business_scope_intro: "We review the premises and needs together. You receive a clear plan for what is done, when and how often.",
            business_scope_group1: "Maintenance cleaning",
            business_scope_item1: "Offices and workspaces",
            business_scope_item2: "Shared areas",
            business_scope_item3: "Washrooms",
            business_scope_group2: "Supplies and schedule",
            business_scope_item4: "Supply service",
            business_scope_item5: "Flexible cleaning times",
            business_process1_title: "We survey the premises",
            business_process1_text: "We review how the premises are used, the cleanliness target and the details that matter for the work.",
            business_process2_title: "We write the plan",
            business_process2_text: "The scope, visit frequency and suitable times are recorded in a clear cleaning programme.",
            business_process3_title: "We do the agreed work",
            business_process3_text: "A professional takes care of the premises at the agreed time and according to the work instructions.",
            business_process4_title: "We stay in touch",
            business_process4_text: "When the use of the premises or the need changes, we update the plan together.",
            business_proof_title: "A little more effort",
            business_proof_text: "PirkkaClean is a Tampere cleaning company that keeps to the agreed work and standard. You can reach a person who knows your premises.",
            business_fact1_value: "Tampere",
            business_fact1_text: "and surrounding municipalities",
            business_fact2_value: "Nearly 50",
            business_fact2_text: "cleaning professionals",
            business_contact_note: "Tell us about the premises, number of users and preferred cleaning frequency. We will return with a suitable package.",
            business_contact_title: "A clear cleaning plan",
            business_contact_text: "Let us plan a service whose scope and schedule are clear to everyone.",
            business_contact_cta: "Request a quote",
            housing_hero_cta: "Request a cleaning plan",
            housing_scope_title: "Shared areas kept in order",
            housing_scope_intro: "Together with the housing company, we agree the areas, visit frequency and points needing special attention. The work instructions stay clear as needs change.",
            housing_scope_group1: "Regular upkeep",
            housing_scope_item1: "Stairwells",
            housing_scope_item2: "Shared areas",
            housing_scope_item3: "Sauna and washrooms",
            housing_scope_group2: "Separately agreed work",
            housing_scope_item4: "Deep cleaning of laundry rooms",
            housing_scope_item5: "Window cleaning",
            housing_process1_title: "Walk-through on site",
            housing_process1_text: "We review the stairwells, shared areas and the housing company's own priorities.",
            housing_process2_title: "The right visit frequency",
            housing_process2_text: "We define a regular rhythm suited to how the premises are used and the changing seasons.",
            housing_process3_title: "Careful delivery",
            housing_process3_text: "The property is cleaned according to the agreed work instructions and exceptions are reported.",
            housing_process4_title: "The contact remains",
            housing_process4_text: "Feedback and seasonal additional needs are updated directly with your contact person.",
            housing_proof_title: "Cleanliness shows every day",
            housing_proof_text: "Regular work keeps shared areas pleasant and helps surface materials last longer in use.",
            housing_fact1_value: "Tampere",
            housing_fact1_text: "and surrounding municipalities",
            housing_fact2_value: "Agreed",
            housing_fact2_text: "work instructions and contact person",
            housing_contact_note: "Tell us the property's size and shared areas. We will suggest a clear cleaning schedule.",
            housing_contact_title: "A plan for your property",
            housing_contact_text: "Let us agree the cleaning standard, visit frequency and seasonal work together.",
            housing_contact_cta: "Request a quote",
            special_hero_cta: "Request an assessment",
            special_scope_title: "A demanding job under control",
            special_scope_intro: "Specialty cleaning always starts by surveying the job, surfaces and target. This lets us choose the right methods, equipment and working time.",
            special_scope_group1: "Finishing the property",
            special_scope_item1: "Construction cleaning",
            special_scope_item2: "Final cleaning",
            special_scope_item3: "Move-out cleaning",
            special_scope_group2: "Surface treatment",
            special_scope_item4: "Basic floor cleaning",
            special_scope_item5: "Floor waxing",
            special_process1_title: "We define the job",
            special_process1_text: "We establish the property, surfaces, schedule and target standard for the completed work.",
            special_process2_title: "We choose the method",
            special_process2_text: "The working method and equipment are selected for the surface and type of dirt before work begins.",
            special_process3_title: "We work safely",
            special_process3_text: "Professionals complete the agreed work carefully while considering other work at the property.",
            special_process4_title: "We hand over the result",
            special_process4_text: "We review the result and make sure the agreed target has been met.",
            special_proof_title: "The right method for every surface",
            special_proof_text: "Demanding cleaning is not one fixed package. The work is sized for the property, materials and desired result.",
            special_fact1_value: "Survey",
            special_fact1_text: "before the work begins",
            special_fact2_value: "Agreed",
            special_fact2_text: "method and result",
            special_contact_note: "Tell us about the property, surfaces and schedule. We will determine the right method and workload.",
            special_contact_title: "Assessment for demanding work",
            special_contact_text: "You receive a clear proposal for the scope, method and schedule.",
            special_contact_cta: "Request an assessment",
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
            footer_home_cleaning_text: "Careful home cleaning makes everyday life easier. Choose regular or one-time cleaning for your home with a clear price estimate.",
            footer_values_title: "Values",
            footer_values_text: "PirkkaClean is a value-driven company. Values help a person choose correctly even in difficult situations. The culture of doing that rises from values is the heart of our company.",
            footer_contact_title: "Contact Info",
            footer_phone: "tel.",
            footer_read_more: "Read more...",
            page_home_cleaning_title: "Home Cleaning",
            home_cleaning_hero_title: "Home cleaning",
            home_cleaning_hero_desc: "Careful home cleaning makes everyday life easier and keeps your home welcoming. We always agree the scope, frequency and your home's individual wishes with you in advance.",
            home_hero_list1: "Recurring or one-time home cleaning",
            home_hero_list2: "Cleaning for kitchens, washrooms, surfaces and floors",
            home_hero_list3: "Your home's preferences are recorded in the work instructions",
            home_hero_cta: "Calculate price estimate",
            calc_title: "Your price estimate",
            calc_intro: "Choose a service, home size and visit frequency. See the labor, visit fee and household-deduction effect instantly.",
            calc_service_label: "Choose a service",
            calc_service_home: "Recurring home cleaning",
            calc_service_home_desc: "Weekly, every two weeks or every four weeks",
            calc_service_deep: "One-time cleaning",
            calc_service_deep_desc: "A single, thorough cleaning visit",
            calc_service_move: "Move-out cleaning",
            calc_service_move_desc: "Final cleaning of an empty home",
            calc_service_windows: "Window cleaning",
            calc_service_windows_desc: "Estimate based on the number of opening windows",
            calc_service_reno: "Post-renovation cleaning",
            calc_service_reno_desc: "Construction dust and final cleaning",
            calc_service_special: "Allergy cleaning",
            calc_service_special_desc: "Extra-thorough removal of dust and allergens",
            calc_label_sqm: "Home size",
            calc_size_help: "30–300 m². The estimate is based on average working time.",
            calc_frequency_label: "Frequency",
            calc_frequency_weekly: "Weekly",
            calc_frequency_biweekly: "Every two weeks",
            calc_frequency_monthly: "Every four weeks",
            calc_frequency_once: "One-time",
            calc_package_label: "Equipment package",
            calc_package_basic: "Basic package",
            calc_package_vacuum: "Cleaning package with vacuum",
            calc_package_help: "The package affects the visit and equipment fee.",
            calc_addons_label: "Add to the same visit",
            calc_addon_oven: "Oven cleaning",
            calc_addon_fridge: "Refrigerator interior",
            calc_addon_sauna: "Sauna cleaning",
            calc_addon_balcony: "Balcony or terrace",
            calc_result_prefix: "Estimate for one visit",
            calc_result_suffix: "€ / visit",
            calc_total_label: "Estimate for one visit",
            calc_labor_label: "Cleaning work",
            calc_visit_label: "Visit and equipment fee",
            calc_credit_label: "After household deduction",
            calc_includes_title: "Pricing basis",
            calc_includes_products: "The visit fee covers travel and the selected equipment package",
            calc_includes_vat: "Prices include 25.5% VAT",
            calc_includes_plan: "The household deduction applies to labor only",
            calc_disclaimer: "The deduction estimate excludes the €150 deductible and €2,100 annual maximum. Final duration is confirmed before ordering.",
            calc_other_prices_title: "Other prices and exceptions",
            calc_season_price: "One-time services cost €75/h during 7–27 December 2026 and €70/h at other times.",
            calc_fee_key: "Key collection or return",
            calc_fee_equipment: "Cleaning-equipment delivery or collection",
            calc_fee_ladder: "Ladder rental / visit",
            calc_fee_invoice: "Paper invoice fee",
            calc_fee_reminder: "Payment reminder",
            calc_fee_cloths: "Cleaning-cloth laundry",
            calc_fee_vacuum: "Vacuum purchase",
            calc_fee_basic_package: "Basic-package purchase",
            calc_fee_clean_package: "Cleaning-package purchase",
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
            rekry_title: "Join the <span class=\"pirkka-text\">Pirkka</span><span class=\"clean-text\">Clean</span> team.",
            rekry_desc: "We are always looking for new cleaning professionals to join us. If a delightfully old-fashioned cleaning company sounds like the right fit for you, we'd love to hear from you.",
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

    const nav = document.querySelector('.glass-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const langBtn = document.getElementById('lang-btn');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    function updateMenuLabel() {
        if (!menuToggle) return;
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        const label = currentLang === 'fi'
            ? (isOpen ? 'Sulje valikko' : 'Avaa valikko')
            : (isOpen ? 'Close menu' : 'Open menu');
        menuToggle.setAttribute('aria-label', label);
    }

    function setMenuOpen(open) {
        if (!nav || !menuToggle) return;
        nav.classList.toggle('is-menu-open', open);
        document.body.classList.toggle('mobile-menu-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        updateMenuLabel();
    }

    if (nav && menuToggle) {
        menuToggle.addEventListener('click', () => {
            setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
        });

        nav.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') setMenuOpen(false);
        });

        const mobileMenuQuery = window.matchMedia('(max-width: 992px)');
        mobileMenuQuery.addEventListener('change', event => {
            if (!event.matches) setMenuOpen(false);
        });
    }

    function applyLanguage(language, persist = false) {
        currentLang = language === 'en' ? 'en' : 'fi';
        langBtn.textContent = currentLang === 'fi' ? 'EN' : 'FI';
        langBtn.setAttribute('aria-label', currentLang === 'fi' ? 'Vaihda englanniksi' : 'Switch to Finnish');
        document.documentElement.lang = currentLang;
        updateMenuLabel();

        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });

        if (persist) {
            try {
                sessionStorage.setItem('pirkkaclean-language', currentLang);
            } catch (error) {
                // The page still translates when storage is unavailable.
            }
        }
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: currentLang } }));
    }

    if (langBtn) {
        applyLanguage(currentLang);
        langBtn.addEventListener('click', () => {
            applyLanguage(currentLang === 'fi' ? 'en' : 'fi', true);
        });
    }

    /* --- Consistent custom dropdowns for fixed-choice fields --- */
    const customSelects = [];

    function enhanceSelect(select, index) {
        const wrapper = document.createElement('div');
        const trigger = document.createElement('button');
        const value = document.createElement('span');
        const chevron = document.createElement('span');
        const list = document.createElement('div');
        const listId = `custom-select-list-${index + 1}`;
        const valueId = `custom-select-value-${index + 1}`;
        let optionButtons = [];

        wrapper.className = 'custom-select';
        trigger.className = 'custom-select-trigger';
        trigger.type = 'button';
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', listId);
        if (select.required) trigger.setAttribute('aria-required', 'true');

        value.className = 'custom-select-value';
        value.id = valueId;
        chevron.className = 'custom-select-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        trigger.append(value, chevron);

        list.className = 'custom-select-popover';
        list.id = listId;
        list.setAttribute('role', 'listbox');
        list.hidden = true;
        wrapper.append(trigger, list);

        select.classList.add('custom-select-native');
        select.tabIndex = -1;
        select.insertAdjacentElement('afterend', wrapper);

        const label = select.id
            ? document.querySelector(`label[for="${CSS.escape(select.id)}"]`)
            : select.closest('.form-group, .calculator-control')?.querySelector('label');
        if (label) {
            if (!label.id) label.id = `custom-select-label-${index + 1}`;
            trigger.setAttribute('aria-labelledby', `${label.id} ${valueId}`);
        } else {
            trigger.setAttribute('aria-label', select.getAttribute('aria-label') || 'Select option');
        }

        function syncSelection() {
            const selected = select.options[select.selectedIndex];
            value.textContent = selected?.textContent.trim() || '';
            trigger.classList.toggle('is-placeholder', !selected?.value);
            optionButtons.forEach((button, buttonIndex) => {
                const isSelected = buttonIndex === select.selectedIndex;
                button.classList.toggle('is-selected', isSelected);
                button.setAttribute('aria-selected', String(isSelected));
            });
        }

        function close({ restoreFocus = false } = {}) {
            wrapper.classList.remove('is-open', 'opens-up');
            trigger.setAttribute('aria-expanded', 'false');
            list.hidden = true;
            if (restoreFocus) trigger.focus();
        }

        function focusOption(direction = 1) {
            const enabled = optionButtons.filter(button => !button.disabled);
            if (!enabled.length) return;
            const selected = enabled.find(button => button.classList.contains('is-selected'));
            const target = selected || (direction < 0 ? enabled.at(-1) : enabled[0]);
            target.focus();
        }

        function open(direction = 1) {
            customSelects.forEach(control => {
                if (control.wrapper !== wrapper) control.close();
            });
            list.hidden = false;
            wrapper.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');

            const triggerRect = trigger.getBoundingClientRect();
            const menuHeight = Math.min(list.scrollHeight, 280);
            const opensUp = window.innerHeight - triggerRect.bottom < menuHeight + 16
                && triggerRect.top > menuHeight + 16;
            wrapper.classList.toggle('opens-up', opensUp);
            requestAnimationFrame(() => focusOption(direction));
        }

        function choose(button) {
            if (button.disabled) return;
            const optionIndex = Number(button.dataset.optionIndex);
            select.selectedIndex = optionIndex;
            syncSelection();
            select.dispatchEvent(new Event('input', { bubbles: true }));
            select.dispatchEvent(new Event('change', { bubbles: true }));
            close({ restoreFocus: true });
        }

        function rebuild() {
            close();
            list.replaceChildren();
            optionButtons = Array.from(select.options).map((option, optionIndex) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'custom-select-option';
                button.dataset.optionIndex = String(optionIndex);
                button.setAttribute('role', 'option');
                button.tabIndex = -1;
                button.disabled = option.disabled;
                button.textContent = option.textContent.trim();
                button.addEventListener('click', () => choose(button));
                list.append(button);
                return button;
            });
            syncSelection();
        }

        trigger.addEventListener('click', () => {
            if (wrapper.classList.contains('is-open')) close();
            else open();
        });

        trigger.addEventListener('keydown', event => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                open(event.key === 'ArrowUp' ? -1 : 1);
            }
        });

        list.addEventListener('keydown', event => {
            const enabled = optionButtons.filter(button => !button.disabled);
            const currentIndex = enabled.indexOf(document.activeElement);
            let nextIndex = currentIndex;

            if (event.key === 'Escape') {
                event.preventDefault();
                close({ restoreFocus: true });
                return;
            }
            if (event.key === 'Home') nextIndex = 0;
            else if (event.key === 'End') nextIndex = enabled.length - 1;
            else if (event.key === 'ArrowDown') nextIndex = Math.min(currentIndex + 1, enabled.length - 1);
            else if (event.key === 'ArrowUp') nextIndex = Math.max(currentIndex - 1, 0);
            else return;

            event.preventDefault();
            enabled[nextIndex]?.focus();
        });

        wrapper.addEventListener('focusout', () => {
            requestAnimationFrame(() => {
                if (!wrapper.contains(document.activeElement)) close();
            });
        });

        select.addEventListener('change', syncSelection);
        select.addEventListener('invalid', event => {
            event.preventDefault();
            trigger.focus();
            open();
        });
        label?.addEventListener('click', event => {
            event.preventDefault();
            trigger.focus();
        });

        const control = { wrapper, close, rebuild };
        customSelects.push(control);
        rebuild();
    }

    document.querySelectorAll('select').forEach(enhanceSelect);
    document.addEventListener('pointerdown', event => {
        customSelects.forEach(control => {
            if (!control.wrapper.contains(event.target)) control.close();
        });
    });
    window.addEventListener('languagechange', () => {
        customSelects.forEach(control => control.rebuild());
    });

    document.querySelectorAll('.service-process').forEach((section) => {
        const track = section.querySelector('.service-process-track');
        if (!track) return;

        section.querySelectorAll('[data-service-scroll]').forEach((button) => {
            button.addEventListener('click', () => {
                const card = track.querySelector('.service-moment');
                const gap = 28;
                const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.75;
                track.scrollBy({
                    left: button.dataset.serviceScroll === 'next' ? distance : -distance,
                    behavior: 'smooth'
                });
            });
        });
    });

    const serviceRevealElements = document.querySelectorAll([
        '.service-hero-copy > *',
        '.service-hero-media',
        '.service-scope h2',
        '.service-scope-intro',
        '.service-scope-sheet',
        '.service-process h2',
        '.service-moment',
        '.service-proof-image',
        '.service-proof-copy',
        '.service-contact-note',
        '.service-reply-card'
    ].join(','));

    if (serviceRevealElements.length > 0) {
        const serviceReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.documentElement.classList.add('service-motion-ready');
        serviceRevealElements.forEach((element) => element.classList.add('service-reveal'));

        if (serviceReducedMotion || !('IntersectionObserver' in window)) {
            serviceRevealElements.forEach((element) => element.classList.add('is-visible'));
        } else {
            const serviceRevealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            serviceRevealElements.forEach((element) => serviceRevealObserver.observe(element));
        }
    }

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
