require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = 'gemini-2.5-flash';

const shortDb = new sqlite3.Database(path.join(__dirname, 'database', 'medicines-short.db'));
const fullDb = new sqlite3.Database(path.join(__dirname, 'database', 'medicines-full.db'));

function getAllMedicinesShort() {
    return new Promise((resolve, reject) => {
        shortDb.all('SELECT * FROM medicines', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getMedicineDetails(medicineNames) {
    return new Promise((resolve, reject) => {
        const placeholders = medicineNames.map(() => '?').join(',');
        const query = `SELECT * FROM medicines_full WHERE name IN (${placeholders}) OR name_en IN (${placeholders})`;
        const params = [...medicineNames, ...medicineNames];

        fullDb.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

app.post('/api/chat', async (req, res) => {
    const isEn = req.body && req.body.language === 'en';
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: isEn ? 'Message cannot be empty' : 'Повідомлення не може бути порожнім'
            });
        }

        const medicines = await getAllMedicinesShort();

        const medicinesContext = isEn
            ? medicines.map(med => `${med.name_en || med.name} (${med.category_en || med.category}): ${med.symptoms_en || med.symptoms}`).join('\n')
            : medicines.map(med => `${med.name} (${med.category}): ${med.symptoms}`).join('\n');

        const systemPrompt = isEn
            ? `You are a qualified medical assistant consultant. Your task is to analyze user symptoms and recommend appropriate medications from the available list below.

IMPORTANT:
- Analyze user symptoms carefully
- Recommend ONLY medicines that appear in the available list below
- Select 3-5 most appropriate medications
- Place the medications that best match the symptoms FIRST in the list
- Explain why each medicine is recommended
- Respond in English

FORMAT RULES:
- Do NOT use markdown formatting: no **bold**, *italics*, _underline_, # headings, or - or * bullet points
- Write in plain clean text without asterisks or special markdown symbols
- Each paragraph in a section should be continuous text without mid-sentence line breaks
- Keep one blank line between paragraphs
- In the EXPLANATION section, describe each drug in a concise paragraph without numbering, starting with the medication name and a colon (for example: "Paracetamol: effectively reduces fever and relieves headache...")
- Be concise, clear, and professional
- Do not add a doctor disclaimer block - the system appends it automatically

AVAILABLE MEDICINES:
${medicinesContext}

Analyze symptoms and respond in this exact format:

SYMPTOM ANALYSIS:
[Brief analysis of potential causes of the symptoms]

RECOMMENDED MEDICATIONS:
[Comma-separated list of medication names, most relevant first, e.g. Paracetamol, Ibuprofen, Nurofen]

EXPLANATION:
[Explanation of why these specific medicines are suitable for the described symptoms]`
            : `Ти - медичний асистент-консультант. Твоя задача - аналізувати симптоми користувача та рекомендувати відповідні ліки з наявного списку.

ВАЖЛИВО:
- Аналізуй симптоми користувача дуже уважно
- Рекомендуй ТІЛЬКИ ті ліки, які є у списку нижче
- Обирай 3-5 найбільш підходящих препаратів
- Препарати, що найточніше відповідають симптомам, став ПЕРШИМИ у списку
- Пояснюй, чому саме ці ліки підходять
- Відповідай українською мовою

ПРАВИЛА ОФОРМЛЕННЯ ВІДПОВІДІ:
- НЕ використовуй markdown-розмітку: ніяких **жирний**, *курсив*, _підкреслення_, # заголовків, - або * у списках
- Пиши звичайним текстом без зірочок та інших символів форматування
- Кожен абзац у секції — суцільний текст без переносів рядка всередину речень
- Між абзацами — один порожній рядок
- У секції ПОЯСНЕННЯ кожен препарат описуй коротким абзацом без нумерації, починаючи з назви препарату й двокрапки (наприклад: "Парацетамол: ефективно знижує температуру і тамує головний біль...")
- Будь лаконічним: відповідь повна, але без зайвих слів
- Блок із застереженням про консультацію з лікарем писати НЕ потрібно — система додає його автоматично

ДОСТУПНІ МЕДИКАМЕНТИ:
${medicinesContext}

Проаналізуй симптоми та надай рекомендації у такому форматі:

АНАЛІЗ СИМПТОМІВ:
[Короткий аналіз того, що може бути причиною симптомів]

РЕКОМЕНДОВАНІ ПРЕПАРАТИ:
[Список назв препаратів через кому, найрелевантніші першими, наприклад: Парацетамол, Ібупрофен, Нурофен]

ПОЯСНЕННЯ:
[Чому саме ці препарати підходять для описаних симптомів]`;

        const result = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: message,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.7,
                maxOutputTokens: 2048,
                thinkingConfig: { thinkingBudget: 0 }
            }
        });

        const aiResponse = result.text;

        const regex = isEn
            ? /(?:RECOMMENDED MEDICATIONS|RECOMMENDED MEDICINES|RECOMMENDED DRUGS):\s*\n?(.*?)(?=\n\n|EXPLANATION:|$)/is
            : /(?:РЕКОМЕНДОВАНІ ПРЕПАРАТИ|РЕКОМЕНДОВАНІ ЛІКИ):\s*\n?(.*?)(?=\n\n|ПОЯСНЕННЯ:|$)/is;

        let medicineNamesMatch = aiResponse.match(regex);
        if (!medicineNamesMatch) {
            medicineNamesMatch = aiResponse.match(/(?:RECOMMENDED MEDICATIONS|RECOMMENDED MEDICINES|РЕКОМЕНДОВАНІ ПРЕПАРАТИ):\s*\n?(.*?)(?=\n\n|EXPLANATION:|ПОЯСНЕННЯ:|$)/is);
        }

        let recommendedMedicines = [];

        if (medicineNamesMatch) {
            const namesText = medicineNamesMatch[1].trim();
            const extractedNames = namesText
                .split(/[,\n]/)
                .map(name => name.replace(/^[-•*]\s*/, '').trim())
                .filter(name => name.length > 0);

            extractedNames.forEach(name => {
                const match = medicines.find(med =>
                    med.name.toLowerCase() === name.toLowerCase() ||
                    (med.name_en && med.name_en.toLowerCase() === name.toLowerCase()) ||
                    med.name.toLowerCase().includes(name.toLowerCase()) ||
                    (med.name_en && med.name_en.toLowerCase().includes(name.toLowerCase())) ||
                    name.toLowerCase().includes(med.name.toLowerCase()) ||
                    (med.name_en && name.toLowerCase().includes(med.name_en.toLowerCase()))
                );
                if (match) {
                    const identifier = isEn ? (match.name_en || match.name) : match.name;
                    if (!recommendedMedicines.some(m => m.id === match.id)) {
                        recommendedMedicines.push(match);
                    }
                }
            });
            recommendedMedicines = recommendedMedicines.slice(0, 5);
        }

        if (recommendedMedicines.length === 0) {
            recommendedMedicines = medicines
                .filter(med =>
                    aiResponse.toLowerCase().includes(med.name.toLowerCase()) ||
                    (med.name_en && aiResponse.toLowerCase().includes(med.name_en.toLowerCase()))
                )
                .slice(0, 5);
        }

        let medicineDetails = [];
        if (recommendedMedicines.length > 0) {
            const lookupNames = recommendedMedicines.map(m => m.name);
            medicineDetails = await getMedicineDetails(lookupNames);
            medicineDetails.sort((a, b) => {
                const aIndex = recommendedMedicines.findIndex(m => m.id === a.id || m.name === a.name);
                const bIndex = recommendedMedicines.findIndex(m => m.id === b.id || m.name === b.name);
                return aIndex - bIndex;
            });
        }

        const localizedDetails = medicineDetails.map(med => {
            if (!isEn) return med;
            return {
                ...med,
                name: med.name_en || med.name,
                category: med.category_en || med.category,
                symptoms: med.symptoms_en || med.symptoms,
                active_substance: med.active_substance_en || med.active_substance,
                description: med.description_en || med.description,
                dosage: med.dosage_en || med.dosage,
                contraindications: med.contraindications_en || med.contraindications,
                side_effects: med.side_effects_en || med.side_effects,
                price_range: med.price_range_en || med.price_range
            };
        });

        const safetyNote = isEn
            ? '\n\nIMPORTANT:\nThis is an informational recommendation only. Always consult a doctor before taking any medication!'
            : '\n\nВАЖЛИВО:\nЦе лише інформаційна рекомендація. Обов\'язково проконсультуйтесь з лікарем перед прийомом будь-яких ліків!';

        const finalResponse = aiResponse.replace(/\n*(?:ВАЖЛИВО|IMPORTANT)\s*:[\s\S]*$/i, '').trimEnd() + safetyNote;

        res.json({
            response: finalResponse,
            medicines: localizedDetails
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: isEn ? 'An error occurred while processing the request' : 'Виникла помилка при обробці запиту',
            details: error.message
        });
    }
});

app.get('/api/medicine/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const isEn = req.query.lang === 'en';

        fullDb.get('SELECT * FROM medicines_full WHERE id = ?', [id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: isEn ? 'Error retrieving data' : 'Помилка при отриманні даних' });
            }
            if (!row) {
                return res.status(404).json({ error: isEn ? 'Medicine not found' : 'Медикамент не знайдено' });
            }

            if (isEn) {
                row = {
                    ...row,
                    name: row.name_en || row.name,
                    category: row.category_en || row.category,
                    symptoms: row.symptoms_en || row.symptoms,
                    active_substance: row.active_substance_en || row.active_substance,
                    description: row.description_en || row.description,
                    dosage: row.dosage_en || row.dosage,
                    contraindications: row.contraindications_en || row.contraindications,
                    side_effects: row.side_effects_en || row.side_effects,
                    price_range: row.price_range_en || row.price_range
                };
            }

            res.json(row);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/search', async (req, res) => {
    try {
        const { query, lang } = req.query;
        const isEn = lang === 'en';

        if (!query) {
            return res.status(400).json({ error: isEn ? 'Search parameter is missing' : 'Параметр пошуку не вказаний' });
        }

        const searchQuery = `%${query}%`;
        fullDb.all(
            `SELECT * FROM medicines_full 
             WHERE name LIKE ? OR name_en LIKE ? OR category LIKE ? OR category_en LIKE ? OR symptoms LIKE ? OR symptoms_en LIKE ?
             LIMIT 10`,
            [searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery],
            (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: isEn ? 'Search failed' : 'Помилка при пошуку' });
                }
                if (isEn) {
                    rows = rows.map(r => ({
                        ...r,
                        name: r.name_en || r.name,
                        category: r.category_en || r.category,
                        symptoms: r.symptoms_en || r.symptoms,
                        active_substance: r.active_substance_en || r.active_substance,
                        description: r.description_en || r.description,
                        dosage: r.dosage_en || r.dosage,
                        contraindications: r.contraindications_en || r.contraindications,
                        side_effects: r.side_effects_en || r.side_effects,
                        price_range: r.price_range_en || r.price_range
                    }));
                }
                res.json(rows);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    shortDb.close();
    fullDb.close();
    process.exit(0);
});
