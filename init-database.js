const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const shortDbPath = path.join(dbDir, 'medicines-short.db');
const fullDbPath = path.join(dbDir, 'medicines-full.db');

function initShortDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(shortDbPath, (err) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
        });

        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS medicines');
            db.run(`CREATE TABLE IF NOT EXISTS medicines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                name_en TEXT NOT NULL,
                category TEXT NOT NULL,
                category_en TEXT NOT NULL,
                symptoms TEXT NOT NULL,
                symptoms_en TEXT NOT NULL,
                active_substance TEXT,
                active_substance_en TEXT
            )`);
            db.run('CREATE INDEX IF NOT EXISTS idx_name_short ON medicines(name)');
            db.run('CREATE INDEX IF NOT EXISTS idx_name_en_short ON medicines(name_en)');
            db.run('CREATE INDEX IF NOT EXISTS idx_category_short ON medicines(category)');
            db.run('CREATE INDEX IF NOT EXISTS idx_category_en_short ON medicines(category_en)');

            const medicines = [
                ['Парацетамол', 'Paracetamol', 'Знеболювальне', 'Pain reliever & antipyretic', 'головний біль, температура, лихоманка, біль у тілі', 'headache, fever, body aches, muscle pain', 'парацетамол', 'paracetamol'],
                ['Ібупрофен', 'Ibuprofen', 'Протизапальне', 'Anti-inflammatory', 'головний біль, зубний біль, біль у м\'язах, температура, запалення', 'headache, toothache, muscle aches, fever, inflammation', 'ібупрофен', 'ibuprofen'],
                ['Аспірин', 'Aspirin', 'Знеболювальне', 'Pain reliever', 'головний біль, температура, біль у суглобах, профілактика тромбів', 'headache, fever, joint pain, blood clot prevention', 'ацетилсаліцилова кислота', 'acetylsalicylic acid'],
                ['Нурофен', 'Nurofen', 'Протизапальне', 'Anti-inflammatory', 'головний біль, температура, біль у м\'язах, біль у спині', 'headache, fever, muscle aches, back pain', 'ібупрофен', 'ibuprofen'],
                ['Амброксол', 'Ambroxol', 'Відхаркувальне', 'Expectorant', 'кашель, мокрота, бронхіт, застуда', 'cough, chest congestion, phlegm, bronchitis, cold', 'амброксол', 'ambroxol'],
                ['АЦЦ', 'ACC', 'Муколітик', 'Mucolytic', 'кашель з мокротою, бронхіт, важке дихання', 'productive cough, thick phlegm, bronchitis, chest congestion', 'ацетилцистеїн', 'acetylcysteine'],
                ['Синупрет', 'Sinupret', 'Рослинний препарат', 'Herbal remedy', 'нежить, синусит, закладеність носа, гайморит', 'runny nose, sinusitis, nasal congestion, sinus pressure', 'рослинні екстракти', 'herbal extracts'],
                ['Називін', 'Nazivin', 'Судинозвужувальне', 'Decongestant', 'нежить, закладеність носа, риніт, синусит', 'runny nose, blocked nose, nasal congestion, rhinitis', 'оксиметазолін', 'oxymetazoline'],
                ['Назол', 'Nazol', 'Судинозвужувальне', 'Decongestant', 'нежить, закладеність носа, алергічний риніт', 'nasal congestion, rhinitis, blocked nose, seasonal allergies', 'оксиметазолін', 'oxymetazoline'],
                ['Супрастин', 'Suprastin', 'Антигістамінне', 'Antihistamine', 'алергія, свербіж, кропивниця, набряк', 'allergy, skin itching, hives, urticaria, allergic swelling', 'хлоропірамін', 'chloropyramine'],
                ['Лоратадин', 'Loratadine', 'Антигістамінне', 'Antihistamine', 'алергія, свербіж, нежить, сльозотеча', 'allergies, itching, allergic rhinitis, watery eyes, sneezing', 'лоратадин', 'loratadine'],
                ['Цетрин', 'Cetrine', 'Антигістамінне', 'Antihistamine', 'алергія, свербіж, кропивниця, дерматит', 'allergy, skin itching, hives, allergic dermatitis, eczema', 'цетиризин', 'cetirizine'],
                ['Еден', 'Eden', 'Антигістамінне', 'Antihistamine', 'алергія, сезонний риніт, свербіж, набряк', 'seasonal allergies, allergic rhinitis, itching, swelling, pollinosis', 'дезлоратадин', 'desloratadine'],
                ['Мезим', 'Mezym', 'Ферментний препарат', 'Digestive enzyme', 'важкість у шлунку, переїдання, нудота, здуття', 'stomach heaviness, overeating, indigestion, bloating, nausea', 'панкреатин', 'pancreatin'],
                ['Панкреатин', 'Pancreatin', 'Ферментний препарат', 'Digestive enzyme', 'важкість у шлунку, порушення травлення, здуття', 'stomach fullness, poor digestion, flatulence, gas, bloating', 'панкреатин', 'pancreatin'],
                ['Смекта', 'Smecta', 'Сорбент', 'Sorbent', 'діарея, отруєння, здуття, біль у животі', 'diarrhea, food poisoning, loose stool, abdominal bloating, stomach upset', 'діосмектит', 'diosmectite'],
                ['Ентеросгель', 'Enterosgel', 'Сорбент', 'Sorbent', 'отруєння, інтоксикація, діарея, алергія', 'intoxication, food poisoning, diarrhea, alcohol hangover, systemic allergy', 'поліметилсилоксан', 'polymethylsiloxane'],
                ['Активоване вугілля', 'Activated Charcoal', 'Сорбент', 'Sorbent', 'отруєння, інтоксикація, діарея, здуття', 'food poisoning, drug overdose, diarrhea, gas, bloating, acute toxicity', 'вугілля активоване', 'activated carbon'],
                ['Но-шпа', 'No-Spa', 'Спазмолітик', 'Antispasmodic', 'біль у животі, спазми, колька, головний біль', 'stomach cramps, abdominal pain, renal colic, biliary colic, spasm', 'дротаверин', 'drotaverine'],
                ['Спазмалгон', 'Spasmalgon', 'Спазмолітик', 'Antispasmodic', 'біль у животі, головний біль, спазми, зубний біль', 'cramping pain, tension headache, visceral spasms, toothache, colic', 'метамізол+пітофенон+фенпіверинію бромід', 'metamizole + pitofenone + fenpiverinium'],
                ['Ренні', 'Rennie', 'Від печії', 'Antacid', 'печія, кислотність, біль у шлунку, дискомфорт', 'heartburn, acid reflux, stomach acid burning, sour regurgitation, indigestion', 'кальцію карбонат+магнію карбонат', 'calcium carbonate + magnesium carbonate'],
                ['Гастал', 'Gastal', 'Від печії', 'Antacid', 'печія, кислотність, відрижка, дискомфорт у шлунку', 'heartburn, hyperacidity, acid belching, gastric discomfort, gastritis', 'алюмінію гідроксид+магнію гідроксид', 'aluminum hydroxide + magnesium hydroxide'],
                ['Омепразол', 'Omeprazole', 'Від печії', 'Acid reducer', 'печія, гастрит, кислотність, печіння у шлунку', 'frequent heartburn, gastritis, acid reflux, GERD, stomach burning', 'омепразол', 'omeprazole'],
                ['Стрепсілс', 'Strepsils', 'Антисептик горла', 'Throat antiseptic', 'біль у горлі, першіння, запалення горла, охриплість', 'sore throat, scratchy throat, painful swallowing, throat inflammation, hoarseness', 'амілметакрезол+дихлорбензиловий спирт', 'amylmetacresol + dichlorobenzyl alcohol'],
                ['Септефрил', 'Septefril', 'Антисептик горла', 'Throat antiseptic', 'біль у горлі, запалення горла, тонзиліт, фарингіт', 'sore throat, pharyngitis, tonsillitis, mouth ulcers, oral infections', 'декаметоксин', 'decamethoxine'],
                ['Персен', 'Persen', 'Заспокійливе', 'Sedative', 'стрес, тривога, безсоння, дратівливість', 'stress, anxiety, nervousness, sleeplessness, insomnia, irritability', 'екстракти валеріани, м\'яти, меліси', 'valerian, mint, lemon balm extracts'],
                ['Новопасит', 'Novo-Passit', 'Заспокійливе', 'Sedative', 'стрес, тривога, безсоння, нервове напруження', 'stress, nervous tension, anxiety, mild insomnia, neurasthenia', 'екстракти трав+гвайфенезин', 'herbal extracts + guaifenesin'],
                ['Вітамін С', 'Vitamin C', 'Вітамін', 'Vitamin', 'слабкий імунітет, застуда, втома, профілактика', 'weakened immunity, cold recovery, fatigue, immune support, prevention', 'аскорбінова кислота', 'ascorbic acid'],
                ['Вітамін D', 'Vitamin D', 'Вітамін', 'Vitamin', 'слабкий імунітет, втома, біль у кістках, профілактика', 'low vitamin D, weak immunity, chronic fatigue, bone and muscle weakness', 'холекальциферол', 'cholecalciferol']
            ];

            const stmt = db.prepare('INSERT INTO medicines (name, name_en, category, category_en, symptoms, symptoms_en, active_substance, active_substance_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

            medicines.forEach(medicine => {
                stmt.run(medicine);
            });

            stmt.finalize();
        });

        db.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function initFullDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(fullDbPath, (err) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
        });

        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS medicines_full');
            db.run(`CREATE TABLE IF NOT EXISTS medicines_full (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                name_en TEXT NOT NULL,
                category TEXT NOT NULL,
                category_en TEXT NOT NULL,
                symptoms TEXT NOT NULL,
                symptoms_en TEXT NOT NULL,
                active_substance TEXT,
                active_substance_en TEXT,
                description TEXT,
                description_en TEXT,
                dosage TEXT,
                dosage_en TEXT,
                contraindications TEXT,
                contraindications_en TEXT,
                side_effects TEXT,
                side_effects_en TEXT,
                image_url TEXT,
                price_range TEXT,
                price_range_en TEXT,
                manufacturer TEXT
            )`);
            db.run('CREATE INDEX IF NOT EXISTS idx_name_full ON medicines_full(name)');
            db.run('CREATE INDEX IF NOT EXISTS idx_name_en_full ON medicines_full(name_en)');
            db.run('CREATE INDEX IF NOT EXISTS idx_category_full ON medicines_full(category)');
            db.run('CREATE INDEX IF NOT EXISTS idx_category_en_full ON medicines_full(category_en)');
            db.run('CREATE INDEX IF NOT EXISTS idx_symptoms_full ON medicines_full(symptoms)');
            db.run('CREATE INDEX IF NOT EXISTS idx_symptoms_en_full ON medicines_full(symptoms_en)');

            const medicinesFull = [
                ['Парацетамол', 'Paracetamol', 'Знеболювальне', 'Pain reliever & antipyretic',
                 'головний біль, температура, лихоманка, біль у тілі',
                 'headache, fever, body aches, muscle pain',
                 'парацетамол', 'paracetamol',
                 'Ефективний знеболювальний та жарознижувальний засіб. Діє швидко та безпечно при правильному застосуванні.',
                 'Effective analgesic and antipyretic agent. Fast and well-tolerated when used according to instructions.',
                 'Дорослі: 500-1000 мг 3-4 рази на день. Максимальна доза - 4000 мг/добу. Діти: згідно з інструкцією залежно від віку та ваги.',
                 'Adults: 500-1000 mg 3-4 times daily. Maximum daily dose is 4000 mg. Children: dose adjusted by age and weight.',
                 'Важка печінкова або ниркова недостатність, алкоголізм, підвищена чутливість до компонентів.',
                 'Severe liver or kidney disease, chronic alcoholism, known hypersensitivity to components.',
                 'Рідко: алергічні реакції, нудота, підвищення печінкових ферментів.',
                 'Rare: allergic reactions, nausea, elevated liver enzymes.',
                 '/img/Paracetamol.webp',
                 '30-80 грн', '$1-2 (30-80 UAH)', 'Фармак, Дарниця'],

                ['Ібупрофен', 'Ibuprofen', 'Протизапальне', 'Anti-inflammatory',
                 'головний біль, зубний біль, біль у м\'язах, температура, запалення',
                 'headache, toothache, muscle aches, fever, inflammation',
                 'ібупрофен', 'ibuprofen',
                 'Нестероїдний протизапальний препарат з знеболювальною та жарознижувальною дією. Ефективний при різних видах болю.',
                 'Non-steroidal anti-inflammatory drug (NSAID) with pronounced analgesic and antipyretic effects. Effective for various acute pains.',
                 'Дорослі: 200-400 мг 3-4 рази на день після їди. Максимальна доза - 1200 мг/добу.',
                 'Adults: 200-400 mg 3-4 times daily after meals. Maximum daily dose is 1200 mg.',
                 'Виразкова хвороба в активній фазі, важка серцева недостатність, третій триместр вагітності.',
                 'Active gastrointestinal ulceration, severe heart failure, third trimester of pregnancy.',
                 'Диспепсія, нудота, головний біль, запаморочення, алергічні реакції.',
                 'Dyspepsia, nausea, headache, dizziness, cutaneous allergic reactions.',
                 '/img/Ibuprofen.webp',
                 '40-120 грн', '$1-3 (40-120 UAH)', 'Здоров\'я, Борщагівський ХФЗ'],

                ['Аспірин', 'Aspirin', 'Знеболювальне', 'Pain reliever',
                 'головний біль, температура, біль у суглобах, профілактика тромбів',
                 'headache, fever, joint pain, blood clot prevention',
                 'ацетилсаліцилова кислота', 'acetylsalicylic acid',
                 'Класичний знеболювальний препарат з протизапальною дією. Також використовується для профілактики серцево-судинних захворювань.',
                 'Classic analgesic and antipyretic with antiplatelet properties, also indicated for cardiovascular prophylaxis.',
                 'Дорослі: 500-1000 мг 3-4 рази на день після їди. Для профілактики тромбозу - 75-150 мг 1 раз на день.',
                 'Adults: 500-1000 mg 3-4 times daily after meals. For cardiovascular prevention: 75-150 mg once daily.',
                 'Виразкова хвороба, схильність до кровотеч, бронхіальна астма, вагітність.',
                 'Peptic ulcer disease, hemorrhagic disorders, aspirin-induced asthma, pregnancy.',
                 'Подразнення шлунку, нудота, алергічні реакції, збільшення часу кровотечі.',
                 'Gastric irritation, nausea, hypersensitivity reactions, prolonged bleeding time.',
                 '/img/Aspirin.webp',
                 '20-60 грн', '$1-2 (20-60 UAH)', 'Bayer, Дарниця'],

                ['Нурофен', 'Nurofen', 'Протизапальне', 'Anti-inflammatory',
                 'головний біль, температура, біль у м\'язах, біль у спині',
                 'headache, fever, muscle aches, back pain',
                 'ібупрофен', 'ibuprofen',
                 'Популярний бренд на основі ібупрофену. Швидко діє при болю та запаленні.',
                 'Branded targeted ibuprofen formulation engineered for quick pain and inflammation relief.',
                 'Дорослі та діти старше 12 років: 200-400 мг 3-4 рази на день. Не перевищувати 1200 мг/добу.',
                 'Adults and children over 12 years: 200-400 mg 3-4 times daily. Maximum 1200 mg per day.',
                 'Виразкова хвороба, важка серцева недостатність, третій триместр вагітності.',
                 'Peptic ulcer, severe cardiac insufficiency, third trimester of pregnancy.',
                 'Нудота, біль у животі, головний біль, алергічні реакції.',
                 'Nausea, epigastric discomfort, headache, rash or hives.',
                 '/img/Nurofen.webp',
                 '60-150 грн', '$2-4 (60-150 UAH)', 'Reckitt Benckiser'],

                ['Амброксол', 'Ambroxol', 'Відхаркувальне', 'Expectorant',
                 'кашель, мокрота, бронхіт, застуда',
                 'cough, chest congestion, phlegm, bronchitis, cold',
                 'амброксол', 'ambroxol',
                 'Муколітичний засіб, що розріджує мокроту та полегшує її виведення з дихальних шляхів.',
                 'Secretolytic expectorant that liquefies viscous mucus and promotes clear airways.',
                 'Дорослі: 30 мг 3 рази на день. Діти: згідно з віком та вагою.',
                 'Adults: 30 mg 3 times daily. Children: tailored by pediatrician based on age.',
                 'Перший триместр вагітності, підвищена чутливість до компонентів.',
                 'First trimester of pregnancy, known intolerance to ambroxol hydrochloride.',
                 'Нудота, біль у животі, алергічні реакції, сухість у роті.',
                 'Nausea, abdominal discomfort, allergic skin reactions, dry mouth.',
                 '/img/Ambroxol.webp',
                 '35-90 грн', '$1-2 (35-90 UAH)', 'Фармак, Здоров\'я'],

                ['АЦЦ', 'ACC', 'Муколітик', 'Mucolytic',
                 'кашель з мокротою, бронхіт, важке дихання',
                 'productive cough, thick phlegm, bronchitis, chest congestion',
                 'ацетилцистеїн', 'acetylcysteine',
                 'Ефективний муколітик, що розріджує густу мокроту при бронхітах та інших захворюваннях дихальних шляхів.',
                 'Direct-acting mucolytic agent that breaks disulfide bonds in bronchial mucus, making it easier to cough up.',
                 'Дорослі: 200 мг 2-3 рази на день або 600 мг 1 раз на день. Розчинити у воді.',
                 'Adults: 200 mg 2-3 times daily or 600 mg once daily dissolved in water.',
                 'Виразкова хвороба в стадії загострення, легенева кровотеча.',
                 'Active gastric ulcer, pulmonary hemorrhage, severe hemoptysis.',
                 'Нудота, печія, головний біль, алергічні реакції.',
                 'Mild nausea, pyrosis, headache, cutaneous reactions.',
                 '/img/ACC.webp',
                 '80-200 грн', '$2-5 (80-200 UAH)', 'Sandoz, Hexal'],

                ['Синупрет', 'Sinupret', 'Рослинний препарат', 'Herbal remedy',
                 'нежить, синусит, закладеність носа, гайморит',
                 'runny nose, sinusitis, nasal congestion, sinus pressure',
                 'рослинні екстракти', 'herbal extracts',
                 'Рослинний препарат на основі екстрактів трав. Ефективний при синуситах та закладеності носа.',
                 'Standardized phytoneering formula with 5 botanical extracts for sinusitis and congested nasal passages.',
                 'Дорослі: 2 драже або 50 крапель 3 рази на день. Приймати за 30 хв до їди.',
                 'Adults: 2 coated tablets or 50 drops 3 times daily before meals.',
                 'Підвищена чутливість до компонентів, вік до 2 років.',
                 'Hypersensitivity to any botanical ingredient, children under 2 years.',
                 'Рідко: алергічні реакції, нудота, біль у животі.',
                 'Rare: allergic symptoms, mild gastrointestinal upset.',
                 '/img/Sinupret.webp',
                 '150-350 грн', '$4-9 (150-350 UAH)', 'Bionorica'],

                ['Називін', 'Nazivin', 'Судинозвужувальне', 'Decongestant',
                 'нежить, закладеність носа, риніт, синусит',
                 'runny nose, blocked nose, nasal congestion, rhinitis',
                 'оксиметазолін', 'oxymetazoline',
                 'Ефективний назальний спрей для швидкого усунення закладеності носа.',
                 'Targeted topical vasoconstrictor providing prompt and long-lasting relief from nasal obstruction.',
                 'Дорослі: 1-2 впорскування в кожну ніздрю 2-3 рази на день. Не застосовувати довше 7 днів.',
                 'Adults: 1-2 sprays in each nostril 2-3 times daily. Do not exceed 7 consecutive days.',
                 'Атрофічний риніт, закритокутова глаукома, дитячий вік (залежить від концентрації).',
                 'Atrophic rhinitis, closed-angle glaucoma, children below designated age threshold.',
                 'Сухість слизової, чхання, підвищення артеріального тиску при передозуванні.',
                 'Nasal mucosa dryness, sneezing, rebound congestion upon prolonged use.',
                 '/img/Nazivin.webp',
                 '60-120 грн', '$2-3 (60-120 UAH)', 'Merck'],

                ['Назол', 'Nazol', 'Судинозвужувальне', 'Decongestant',
                 'нежить, закладеність носа, алергічний риніт',
                 'nasal congestion, rhinitis, blocked nose, seasonal allergies',
                 'оксиметазолін', 'oxymetazoline',
                 'Швидкодіючий назальний спрей для полегшення дихання через ніс.',
                 'Fast-acting nasal decongestant spray relieving swelling of the mucous membrane.',
                 'Дорослі та діти старше 6 років: 1-2 впорскування 2-3 рази на день. Курс - не більше 5-7 днів.',
                 'Adults and children over 6: 1-2 sprays into each nostril 2-3 times daily for max 5-7 days.',
                 'Атрофічний риніт, прийом інгібіторів МАО, вік до 6 років.',
                 'Atrophic rhinitis, concurrent MAO inhibitor use, children under 6.',
                 'Відчуття печіння, сухість, головний біль.',
                 'Burning sensation, dryness of nasal tissues, mild headache.',
                 '/img/Nazol.webp',
                 '50-100 грн', '$1-3 (50-100 UAH)', 'Bayer'],

                ['Супрастин', 'Suprastin', 'Антигістамінне', 'Antihistamine',
                 'алергія, свербіж, кропивниця, набряк',
                 'allergy, skin itching, hives, urticaria, allergic swelling',
                 'хлоропірамін', 'chloropyramine',
                 'Класичний антиалергічний препарат швидкої дії. Ефективний при різних алергічних реакціях.',
                 'First-generation antihistamine with fast systemic onset for acute allergic manifestations.',
                 'Дорослі: 1 таблетка (25 мг) 3-4 рази на день під час їди.',
                 'Adults: 1 tablet (25 mg) 3-4 times daily taken with meals.',
                 'Гострий напад бронхіальної астми, новонароджені, вагітність.',
                 'Acute asthma attack, newborn infants, pregnancy and breastfeeding.',
                 'Сонливість, головокружіння, сухість у роті, зниження концентрації уваги.',
                 'Drowsiness, sedation, dizziness, dry mouth, impaired psychomotor skills.',
                 '/img/Suprastin.webp',
                 '40-80 грн', '$1-2 (40-80 UAH)', 'Egis'],

                ['Лоратадин', 'Loratadine', 'Антигістамінне', 'Antihistamine',
                 'алергія, свербіж, нежить, сльозотеча',
                 'allergies, itching, allergic rhinitis, watery eyes, sneezing',
                 'лоратадин', 'loratadine',
                 'Антигістамінний препарат другого покоління без седативного ефекту.',
                 'Second-generation non-sedating H1-blocker providing reliable 24-hour symptom relief.',
                 'Дорослі та діти старше 12 років: 10 мг 1 раз на день.',
                 'Adults and children over 12: 10 mg once daily.',
                 'Вагітність, період лактації, вік до 2 років.',
                 'Pregnancy, breastfeeding, children under 2 years of age.',
                 'Рідко: головний біль, втома, сухість у роті.',
                 'Rare: headache, drowsiness (uncommon), fatigue, dry mouth.',
                 '/img/Loratatid.webp',
                 '30-70 грн', '$1-2 (30-70 UAH)', 'Здоров\'я, Дарниця'],

                ['Цетрин', 'Cetrine', 'Антигістамінне', 'Antihistamine',
                 'алергія, свербіж, кропивниця, дерматит',
                 'allergy, skin itching, hives, allergic dermatitis, eczema',
                 'цетиризин', 'cetirizine',
                 'Ефективний антиалергічний препарат пролонгованої дії без седативного ефекту.',
                 'Selective second-generation peripheral H1 receptor antagonist for allergic dermatosis and rhinitis.',
                 'Дорослі: 10 мг 1 раз на день. Діє протягом 24 годин.',
                 'Adults: 10 mg once daily with water. Provides around-the-clock control.',
                 'Важка ниркова недостатність, вагітність, період лактації.',
                 'Severe renal failure (CrCl < 10 ml/min), pregnancy, lactation.',
                 'Сонливість (рідко), головний біль, сухість у роті.',
                 'Mild drowsiness (in sensitive individuals), headache, dry mouth.',
                 '/img/Cetrin.webp',
                 '60-120 грн', '$2-3 (60-120 UAH)', 'Dr. Reddy\'s'],

                ['Еден', 'Eden', 'Антигістамінне', 'Antihistamine',
                 'алергія, сезонний риніт, свербіж, набряк',
                 'seasonal allergies, allergic rhinitis, itching, swelling, pollinosis',
                 'дезлоратадин', 'desloratadine',
                 'Сучасний антиалергічний препарат третього покоління з тривалою дією.',
                 'Advanced non-drowsy third-generation antihistamine with rapid onset and extended protection.',
                 'Дорослі та діти старше 12 років: 5 мг 1 раз на день незалежно від прийому їжі.',
                 'Adults and children over 12: 5 mg once daily with or without food.',
                 'Вагітність, період лактації, вік до 12 років.',
                 'Pregnancy, lactation, hypersensitivity, children under 12.',
                 'Рідко: головний біль, втома, сухість у роті.',
                 'Rare: fatigue, dry mouth, headache.',
                 '/img/Eden.webp',
                 '80-150 грн', '$2-4 (80-150 UAH)', 'Sandoz'],

                ['Мезим', 'Mezym', 'Ферментний препарат', 'Digestive enzyme',
                 'важкість у шлунку, переїдання, нудота, здуття',
                 'stomach heaviness, overeating, indigestion, bloating, nausea',
                 'панкреатин', 'pancreatin',
                 'Ферментний препарат для покращення травлення. Компенсує недостатність ферментів підшлункової залози.',
                 'Enzyme preparation compensating for insufficient pancreatic exocrine enzyme production.',
                 'Дорослі: 1-2 таблетки під час або після їди 3-4 рази на день.',
                 'Adults: 1-2 tablets during or right after meals with a glass of water.',
                 'Гострий панкреатит або загострення хронічного панкреатиту.',
                 'Acute pancreatitis, acute exacerbation of chronic pancreatitis.',
                 'Рідко: нудота, діарея, алергічні реакції.',
                 'Rare: mild diarrhea, nausea, occasional allergic skin rash.',
                 '/img/Mezim.webp',
                 '80-180 грн', '$2-5 (80-180 UAH)', 'Berlin-Chemie'],

                ['Панкреатин', 'Pancreatin', 'Ферментний препарат', 'Digestive enzyme',
                 'важкість у шлунку, порушення травлення, здуття',
                 'stomach fullness, poor digestion, flatulence, gas, bloating',
                 'панкреатин', 'pancreatin',
                 'Ферментний засіб для поліпшення перетравлювання їжі при недостатності підшлункової залози.',
                 'Standard digestive enzymatic aid assisting the digestion of fats, proteins, and carbohydrates.',
                 'Дорослі: 2-4 таблетки під час кожного прийому їжі.',
                 'Adults: 2-4 tablets swallowed whole with each meal.',
                 'Гострий панкреатит, загострення хронічного панкреатиту.',
                 'Acute pancreatitis or severe exacerbations of chronic pancreatitis.',
                 'Рідко: алергічні реакції, діарея.',
                 'Rare: mild allergic symptoms, altered bowel habit.',
                 '/img/Pankreatin.webp',
                 '30-90 грн', '$1-2 (30-90 UAH)', 'Фармак, Борщагівський ХФЗ'],

                ['Смекта', 'Smecta', 'Сорбент', 'Sorbent',
                 'діарея, отруєння, здуття, біль у животі',
                 'diarrhea, food poisoning, loose stool, abdominal bloating, stomach upset',
                 'діосмектит', 'diosmectite',
                 'Природний сорбент з обвідним та захисним ефектом для слизової шлунково-кишкового тракту.',
                 'Natural aluminosilicate clay sorbent that coats and stabilizes the digestive mucosal barrier.',
                 'Дорослі: 1 пакетик 3 рази на день. Розчинити у 100 мл води.',
                 'Adults: 1 sachet 3 times daily dissolved thoroughly in 100 ml water.',
                 'Кишкова непрохідність, непереносимість фруктози.',
                 'Intestinal obstruction, fructose intolerance, glucose-galactose malabsorption.',
                 'Запор, здуття (рідко).',
                 'Mild constipation, rare abdominal distension.',
                 '/img/Smekta.webp',
                 '120-200 грн', '$3-5 (120-200 UAH)', 'Ipsen'],

                ['Ентеросгель', 'Enterosgel', 'Сорбент', 'Sorbent',
                 'отруєння, інтоксикація, діарея, алергія',
                 'intoxication, food poisoning, diarrhea, alcohol hangover, systemic allergy',
                 'поліметилсилоксан', 'polymethylsiloxane',
                 'Сучасний ентеросорбент для виведення токсинів та алергенів з організму.',
                 'Innovative hydrogel enterosorbent selectively capturing medium-weight toxic substances and pathogens.',
                 'Дорослі: 1 столова ложка (15 г) 3 рази на день за 1-2 години до або після їди.',
                 'Adults: 1 tablespoon (15 g) 3 times daily taken 1-2 hours before or after meals.',
                 'Кишкова непрохідність, атонія кишечника.',
                 'Acute mechanical bowel obstruction, intestinal atony.',
                 'Рідко: нудота, запор.',
                 'Rare: mild nausea, temporary constipation.',
                 '/img/Enterosgel.webp',
                 '150-300 грн', '$4-8 (150-300 UAH)', 'Креома-Фарм'],

                ['Активоване вугілля', 'Activated Charcoal', 'Сорбент', 'Sorbent',
                 'отруєння, інтоксикація, діарея, здуття',
                 'food poisoning, drug overdose, diarrhea, gas, bloating, acute toxicity',
                 'вугілля активоване', 'activated carbon',
                 'Класичний сорбент для виведення токсинів при отруєннях та розладах травлення.',
                 'Universal porous adsorbent for gastrointestinal decontamination in acute intoxications.',
                 'Дорослі: 1-2 г на 1 кг ваги при отруєнні. При метеоризмі - 1-2 г 3-4 рази на день.',
                 'Adults: 1-2 g per 10 kg body weight in acute poisoning. For flatulence: 1-2 g 3-4 times daily.',
                 'Виразкова хвороба, кровотечі з ШКТ.',
                 'Gastrointestinal ulcers, active GI bleeding.',
                 'Запор, почорніння калу.',
                 'Constipation, harmless black stool discoloration.',
                 '/img/Activovane_Vigulya.webp',
                 '10-40 грн', '$0.3-1 (10-40 UAH)', 'Фармак, Здоров\'я'],

                ['Но-шпа', 'No-Spa', 'Спазмолітик', 'Antispasmodic',
                 'біль у животі, спазми, колька, головний біль',
                 'stomach cramps, abdominal pain, renal colic, biliary colic, spasm',
                 'дротаверин', 'drotaverine',
                 'Ефективний спазмолітичний препарат для зняття спазмів гладкої мускулатури.',
                 'Myotropic antispasmodic delivering direct muscle relaxation to internal organs and biliary tract.',
                 'Дорослі: 1-2 таблетки (40-80 мг) 2-3 рази на день.',
                 'Adults: 1-2 tablets (40-80 mg) 2-3 times daily.',
                 'Важка серцева, печінкова або ниркова недостатність.',
                 'Severe cardiac, renal, or hepatic impairment; children under 6.',
                 'Запаморочення, головний біль, нудота (рідко).',
                 'Dizziness, headache, slight palpitations, nausea.',
                 '/img/No-shpa.webp',
                 '80-180 грн', '$2-5 (80-180 UAH)', 'Sanofi'],

                ['Спазмалгон', 'Spasmalgon', 'Спазмолітик', 'Antispasmodic',
                 'біль у животі, головний біль, спазми, зубний біль',
                 'cramping pain, tension headache, visceral spasms, toothache, colic',
                 'метамізол+пітофенон+фенпіверинію бромід', 'metamizole + pitofenone + fenpiverinium',
                 'Комбінований препарат з знеболювальною та спазмолітичною дією.',
                 'Combination medication blending analgesic, spasmolytic, and parasympatholytic agents.',
                 'Дорослі: 1-2 таблетки 2-3 рази на день після їди.',
                 'Adults: 1-2 tablets 2-3 times daily after meals.',
                 'Порушення кровотворення, важка печінкова недостатність, закритокутова глаукома.',
                 'Hematological disorders, severe hepatic impairment, angle-closure glaucoma.',
                 'Сухість у роті, запаморочення, алергічні реакції.',
                 'Dry mouth, dizziness, transient allergic reactions.',
                 '/img/Spazmalgon.webp',
                 '40-100 грн', '$1-3 (40-100 UAH)', 'Actavis'],

                ['Ренні', 'Rennie', 'Від печії', 'Antacid',
                 'печія, кислотність, біль у шлунку, дискомфорт',
                 'heartburn, acid reflux, stomach acid burning, sour regurgitation, indigestion',
                 'кальцію карбонат+магнію карбонат', 'calcium carbonate + magnesium carbonate',
                 'Швидкодіючий антацидний препарат для нейтралізації соляної кислоти в шлунку.',
                 'Fast chewable antacid chemically neutralizing hydrochloric acid into natural soluble salts.',
                 'Дорослі: 1-2 таблетки розжовувати при появі симптомів. Максимально 11 таблеток на день.',
                 'Adults: 1-2 tablets chewed as symptoms arise. Maximum 11 tablets per 24 hours.',
                 'Важка ниркова недостатність, гіперкальціємія.',
                 'Severe renal failure, hypercalcemia, nephrolithiasis.',
                 'Діарея при передозуванні.',
                 'Loose stools or abdominal discomfort only in extreme overdose.',
                 '/img/Renni.webp',
                 '80-150 грн', '$2-4 (80-150 UAH)', 'Bayer'],

                ['Гастал', 'Gastal', 'Від печії', 'Antacid',
                 'печія, кислотність, відрижка, дискомфорт у шлунку',
                 'heartburn, hyperacidity, acid belching, gastric discomfort, gastritis',
                 'алюмінію гідроксид+магнію гідроксид', 'aluminum hydroxide + magnesium hydroxide',
                 'Антацидний препарат для швидкого усунення печії та зниження підвищеної кислотності шлункового соку.',
                 'Balanced antacid providing lasting neutralization of stomach acidity without rebound effect.',
                 'Дорослі: 1-2 таблетки розсмоктувати через годину після їди та перед сном, до 4-6 разів на день.',
                 'Adults: 1-2 tablets dissolved slowly in mouth 1 hr after meals and at bedtime (max 4-6 times/day).',
                 'Важка ниркова недостатність, хвороба Альцгеймера, гіпофосфатемія.',
                 'Severe renal failure, Alzheimer\'s disease, hypophosphatemia.',
                 'Рідко: зміна випорожнень, нудота, алергічні реакції.',
                 'Rare: altered stool consistency, nausea, mild hypersensitivity.',
                 '/img/Gastal.webp',
                 '60-130 грн', '$2-3 (60-130 UAH)', 'Teva'],

                ['Омепразол', 'Omeprazole', 'Від печії', 'Acid reducer',
                 'печія, гастрит, кислотність, печіння у шлунку',
                 'frequent heartburn, gastritis, acid reflux, GERD, stomach burning',
                 'омепразол', 'omeprazole',
                 'Препарат для зниження кислотності шлункового соку при печії, гастриті та підвищеній кислотності.',
                 'Proton pump inhibitor effectively halting acid hypersecretion at the cellular proton pump level.',
                 'Дорослі: 20 мг 1 раз на день вранці натщесерце.',
                 'Adults: 20 mg once daily in the morning with liquid before breakfast.',
                 'Підвищена чутливість до компонентів.',
                 'Hypersensitivity to omeprazole or substituted benzimidazoles.',
                 'Головний біль, нудота, діарея, біль у животі.',
                 'Headache, transient diarrhea, abdominal pain, flatulence.',
                 '/img/Omeprazol.webp',
                 '50-150 грн', '$1-4 (50-150 UAH)', 'Здоров\'я, Дарниця'],

                ['Стрепсілс', 'Strepsils', 'Антисептик горла', 'Throat antiseptic',
                 'біль у горлі, першіння, запалення горла, охриплість',
                 'sore throat, scratchy throat, painful swallowing, throat inflammation, hoarseness',
                 'амілметакрезол+дихлорбензиловий спирт', 'amylmetacresol + dichlorobenzyl alcohol',
                 'Антисептичні льодяники для місцевого лікування болю та запалення в горлі.',
                 'Antiseptic soothing lozenges providing local antibacterial and soothing action for inflamed throats.',
                 'Дорослі: розсмоктувати 1 льодяник кожні 2-3 години, не більше 8 льодяників на добу.',
                 'Adults: dissolve 1 lozenge slowly in mouth every 2-3 hours; max 8 lozenges per day.',
                 'Підвищена чутливість до компонентів, вік до 6 років.',
                 'Hypersensitivity to ingredients, children under 6 years.',
                 'Рідко: алергічні реакції, подразнення слизової рота.',
                 'Rare: mild hypersensitivity reactions, transient oral soreness.',
                 '/img/Strepsils.webp',
                 '80-180 грн', '$2-5 (80-180 UAH)', 'Reckitt Benckiser'],

                ['Септефрил', 'Septefril', 'Антисептик горла', 'Throat antiseptic',
                 'біль у горлі, запалення горла, тонзиліт, фарингіт',
                 'sore throat, pharyngitis, tonsillitis, mouth ulcers, oral infections',
                 'декаметоксин', 'decamethoxine',
                 'Антисептичний засіб для розсмоктування при запальних захворюваннях горла та порожнини рота.',
                 'Broad-spectrum cationic antiseptic tablet suppressing microbial pathogens in the oral cavity.',
                 'Дорослі: розсмоктувати по 1 таблетці 4-6 разів на день після їди.',
                 'Adults: dissolve 1 tablet slowly in the mouth 4-6 times daily after eating.',
                 'Підвищена чутливість до декаметоксину.',
                 'Known hypersensitivity to decamethoxine.',
                 'Рідко: алергічні реакції.',
                 'Rare: slight hyper-salivation or allergic skin reaction.',
                 '/img/Septefril.webp',
                 '20-60 грн', '$0.5-2 (20-60 UAH)', 'Київський вітамінний завод'],

                ['Персен', 'Persen', 'Заспокійливе', 'Sedative',
                 'стрес, тривога, безсоння, дратівливість',
                 'stress, anxiety, nervousness, sleeplessness, insomnia, irritability',
                 'екстракти валеріани, м\'яти, меліси', 'valerian, mint, lemon balm extracts',
                 'Рослинний заспокійливий засіб на основі екстрактів валеріани, м\'яти та меліси при нервовому напруженні.',
                 'Herbal sedative combining valerian, peppermint, and lemon balm extracts to soothe tension and facilitate sleep.',
                 'Дорослі: 2-3 таблетки 2-3 рази на день. При безсонні - за годину до сну.',
                 'Adults: 2-3 tablets 2-3 times daily. For insomnia: 2-3 tablets 1 hour before sleep.',
                 'Підвищена чутливість до компонентів, гіпотензія, вік до 12 років.',
                 'Hypersensitivity, arterial hypotension, children under 12.',
                 'Рідко: алергічні реакції, при тривалому застосуванні - запор.',
                 'Rare: allergic reactions; prolonged excessive intake may cause mild constipation.',
                 '/img/Persen.webp',
                 '120-280 грн', '$3-7 (120-280 UAH)', 'Sandoz'],

                ['Новопасит', 'Novo-Passit', 'Заспокійливе', 'Sedative',
                 'стрес, тривога, безсоння, нервове напруження',
                 'stress, nervous tension, anxiety, mild insomnia, neurasthenia',
                 'екстракти трав+гвайфенезин', 'herbal extracts + guaifenesin',
                 'Комбінований рослинний заспокійливий препарат при стресі, тривозі та порушеннях сну.',
                 'Herbal and anxiolytic complex reducing psychological anxiety, fatigue, and nervous restlessness.',
                 'Дорослі: 1 таблетка або 5 мл розчину 3 рази на день перед їдою.',
                 'Adults: 1 tablet or 5 ml solution 3 times daily before meals.',
                 'Міастенія, вік до 12 років, підвищена чутливість до компонентів.',
                 'Myasthenia gravis, hypersensitivity to components, children under 12.',
                 'Втома, сонливість, запаморочення, нудота (рідко).',
                 'Rare: mild daytime drowsiness, dizziness, nausea.',
                 '/img/Novopasit.webp',
                 '100-250 грн', '$3-6 (100-250 UAH)', 'Teva'],

                ['Вітамін С', 'Vitamin C', 'Вітамін', 'Vitamin',
                 'слабкий імунітет, застуда, втома, профілактика',
                 'weakened immunity, cold recovery, fatigue, immune support, prevention',
                 'аскорбінова кислота', 'ascorbic acid',
                 'Потужний антиоксидант для підтримки імунної системи та загального здоров\'я.',
                 'Vital antioxidant vitamin stimulating immune defenses, collagen synthesis, and cell protection.',
                 'Дорослі: 50-100 мг на день для профілактики, 500-1000 мг при застуді.',
                 'Adults: 50-100 mg daily for general health; 500-1000 mg daily during active respiratory infections.',
                 'Схильність до утворення каменів у нирках, важкі захворювання нирок.',
                 'Nephrolithiasis (oxalate kidney stones), severe renal insufficiency.',
                 'При передозуванні: діарея, нудота.',
                 'High excess doses can cause transient diarrhea, nausea, or stomach cramps.',
                 '/img/Vitamin_C.webp',
                 '30-100 грн', '$1-3 (30-100 UAH)', 'Фармак, Здоров\'я'],

                ['Вітамін D', 'Vitamin D', 'Вітамін', 'Vitamin',
                 'слабкий імунітет, втома, біль у кістках, профілактика',
                 'low vitamin D, weak immunity, chronic fatigue, bone and muscle weakness',
                 'холекальциферол', 'cholecalciferol',
                 'Важливий вітамін для здоров\'я кісток, імунної системи та загального самопочуття.',
                 'Crucial regulator of calcium-phosphorus homeostasis, bone health, and optimal immune function.',
                 'Дорослі: 1000-2000 МО на день для профілактики.',
                 'Adults: 1000-2000 IU daily as a nutritional supplement or as prescribed by a physician.',
                 'Гіперкальціємія, важкі захворювання нирок.',
                 'Hypercalcemia, hypervitaminosis D, severe nephropathy.',
                 'При передозуванні: нудота, слабкість, порушення ритму серця.',
                 'In substantial chronic overdose: hypercalcemia, nausea, weakness.',
                 '/img/Vitamin_D.webp',
                 '50-200 грн', '$1-5 (50-200 UAH)', 'Фармак, Здоров\'я']
            ];

            const stmt = db.prepare(`INSERT INTO medicines_full
                (name, name_en, category, category_en, symptoms, symptoms_en, active_substance, active_substance_en,
                 description, description_en, dosage, dosage_en, contraindications, contraindications_en,
                 side_effects, side_effects_en, image_url, price_range, price_range_en, manufacturer)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

            medicinesFull.forEach(medicine => {
                stmt.run(medicine);
            });

            stmt.finalize();
        });

        db.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function initAllDatabases() {
    try {
        await initShortDatabase();
        await initFullDatabase();
        console.log('Databases initialized successfully.');
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}

initAllDatabases();
