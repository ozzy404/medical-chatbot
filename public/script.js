const API_URL = '/api';

const translations = {
    uk: {
        site_title: 'MediBot - Медичний AI асистент',
        nav_home: 'Головна',
        nav_about: 'Про систему',
        nav_how_it_works: 'Як це працює',
        hero_badge: '🤖 AI-асистент для здоров\'я',
        hero_title: 'Інтелектуальний помічник у виборі ліків',
        hero_desc: 'Опишіть свої симптоми, і наш AI асистент на базі Google Gemini підбере найбільш підходящі медикаменти з нашої бази даних',
        feature_fast: 'Швидкий аналіз',
        feature_db: 'База 30+ препаратів',
        feature_safe: 'Без реєстрації · запит обробляє Gemini',
        preview_status: 'AI асистент онлайн',
        preview_message: 'Привіт! Я MediBot - ваш AI помічник. Опишіть ваші симптоми, і я підберу відповідні ліки.',
        chat_title: 'Медичний асистент',
        chat_status: 'Онлайн',
        clear_chat_title: 'Очистити чат',
        clear_chat_confirm: 'Ви впевнені, що хочете очистити історію чату?',
        welcome_message: 'Вітаю! Я - ваш медичний AI асистент. Опишіть свої симптоми, і я допоможу підібрати відповідні медикаменти з нашої бази даних.<br><br><strong>Приклади запитів:</strong><ul><li>У мене болить голова і підвищена температура</li><li>Маю кашель і нежить</li><li>Відчуваю біль у животі та нудоту</li><li>Алергія та свербіж шкіри</li></ul><div class="warning-box">⚠️ <strong>Увага:</strong> Це інформаційна система. Завжди консультуйтесь з лікарем перед прийомом ліків!</div>',
        typing_text: 'AI аналізує ваші симптоми...',
        input_placeholder: 'Опишіть ваші симптоми...',
        input_hint: 'Натисніть Enter для відправки або Shift+Enter для нового рядка',
        carousel_title: '💊 Рекомендовані препарати',
        drug_fallback_desc: 'Ефективний препарат',
        error_request: '⚠️ Вибачте, виникла помилка при обробці вашого запиту. Будь ласка, спробуйте ще раз або перевірте, чи запущений сервер.',
        error_server_down: '⚠️ Сервер не запущений. Будь ласка, запустіть сервер командою: npm start',
        modal_manufacturer: 'Виробник:',
        modal_description: 'Опис',
        modal_active_substance: 'Діюча речовина',
        modal_indications: 'Показання до застосування',
        modal_dosage: 'Дозування',
        modal_contraindications: 'Протипоказання',
        modal_side_effects: 'Побічні ефекти',
        modal_warning_title: '⚠️ ВАЖЛИВО!',
        modal_warning_body: 'Перед застосуванням препарату обов\'язково проконсультуйтесь з лікарем. Самолікування може бути небезпечним для вашого здоров\'я. Інформація надається виключно в ознайомлювальних цілях.',
        about_title: 'Про MediBot',
        about_subtitle: 'Інтелектуальна система підбору медикаментів на основі штучного інтелекту',
        about_card1_title: 'Розумний підбір ліків',
        about_card1_desc: 'Достатньо описати симптоми своїми словами — AI підбере 3–5 найбільш підходящих безрецептурних препаратів',
        about_card2_title: 'Деталі по кожному препарату',
        about_card2_desc: 'Дозування, протипоказання, побічні ефекти та виробник — вся ключова інформація в одній картці',
        about_card3_title: 'Без реєстрації та оплати',
        about_card3_desc: 'Реєстрація не потрібна. Текст запиту передається Google Gemini API для обробки; локальна історія чату не зберігається сервером.',
        hiw_title: 'Як це працює',
        hiw_step1_title: 'Опишіть симптоми',
        hiw_step1_desc: 'Введіть у чат ваші симптоми природною мовою',
        hiw_step2_title: 'AI аналізує',
        hiw_step2_desc: 'Gemini обробляє запит та підбирає відповідні ліки з бази',
        hiw_step3_title: 'Отримайте результат',
        hiw_step3_desc: 'Перегляньте рекомендації та детальну інформацію про препарати',
        footer_desc: 'Інтелектуальний помічник у виборі ліків',
        footer_info_title: 'Важлива інформація',
        footer_warning: '⚠️ Цей додаток створений виключно в освітніх цілях як кваліфікаційна робота. Інформація не замінює консультацію з лікарем. Завжди консультуйтеся з медичним фахівцем перед прийомом будь-яких ліків.',
        footer_copy: '© 2026 MediBot. Кваліфікаційна робота.'
    },
    en: {
        site_title: 'MediBot - AI Medical Assistant',
        nav_home: 'Home',
        nav_about: 'About',
        nav_how_it_works: 'How It Works',
        hero_badge: '🤖 AI Health Assistant',
        hero_title: 'Intelligent Medication Discovery Assistant',
        hero_desc: 'Describe your symptoms, and our Google Gemini-powered AI assistant will match the most suitable medications from our database',
        feature_fast: 'Fast analysis',
        feature_db: '30+ medication database',
        feature_safe: 'No account · requests processed by Gemini',
        preview_status: 'AI assistant online',
        preview_message: 'Hello! I am MediBot, your AI assistant. Describe your symptoms and I will help select the right medications.',
        chat_title: 'Medical Assistant',
        chat_status: 'Online',
        clear_chat_title: 'Clear chat',
        clear_chat_confirm: 'Are you sure you want to clear the chat history?',
        welcome_message: 'Hello! I am your AI medical assistant. Describe your symptoms, and I will help select appropriate medications from our database.<br><br><strong>Example queries:</strong><ul><li>I have a headache and a high fever</li><li>I have a cough and a runny nose</li><li>I feel stomach pain and nausea</li><li>Allergy symptoms and skin itching</li></ul><div class="warning-box">⚠️ <strong>Warning:</strong> This is an informational system. Always consult a healthcare specialist before taking any medication!</div>',
        typing_text: 'AI is analyzing your symptoms...',
        input_placeholder: 'Describe your symptoms...',
        input_hint: 'Press Enter to send or Shift+Enter for a new line',
        carousel_title: '💊 Recommended Medications',
        drug_fallback_desc: 'Effective medication',
        error_request: '⚠️ Sorry, an error occurred while processing your request. Please try again or check if the server is running.',
        error_server_down: '⚠️ Server is not running. Please start the server with: npm start',
        modal_manufacturer: 'Manufacturer:',
        modal_description: 'Description',
        modal_active_substance: 'Active Substance',
        modal_indications: 'Indications for Use',
        modal_dosage: 'Dosage',
        modal_contraindications: 'Contraindications',
        modal_side_effects: 'Side Effects',
        modal_warning_title: '⚠️ IMPORTANT!',
        modal_warning_body: 'Always consult a doctor before taking any medication. Self-medication can be hazardous to your health. Information is provided solely for educational purposes.',
        about_title: 'About MediBot',
        about_subtitle: 'Intelligent AI-powered medication assistance system',
        about_card1_title: 'Smart Drug Selection',
        about_card1_desc: 'Simply describe your symptoms in your own words — AI selects 3–5 most suitable OTC medications',
        about_card2_title: 'Comprehensive Details',
        about_card2_desc: 'Dosage, contraindications, side effects, and manufacturer — all key information in a single card',
        about_card3_title: 'Free & Anonymous',
        about_card3_desc: 'No account is required. Your message is sent to the Google Gemini API for processing; chat history is not stored by this server.',
        hiw_title: 'How It Works',
        hiw_step1_title: 'Describe Symptoms',
        hiw_step1_desc: 'Type your symptoms in natural everyday language into the chat',
        hiw_step2_title: 'AI Analysis',
        hiw_step2_desc: 'Gemini analyzes your symptoms and matches the best medications from the database',
        hiw_step3_title: 'Get Recommendations',
        hiw_step3_desc: 'Review recommendations and view detailed medical cards for each medication',
        footer_desc: 'Intelligent drug discovery assistant',
        footer_info_title: 'Important Information',
        footer_warning: '⚠️ This application was created for educational purposes as a diploma qualification project. The information provided does not replace professional medical advice. Always consult a healthcare specialist before taking any medication.',
        footer_copy: '© 2026 MediBot. Graduation project.'
    }
};

let currentLang = localStorage.getItem('medibot_lang') || 'uk';

let chatForm, messageInput, sendButton, chatMessages, typingIndicator;
let clearChatBtn, medicineModal, modalBody, modalClose, modalOverlay;
let currentMedicines = [];
let conversationHistory = [];
let currentOpenMedicine = null;

document.addEventListener('DOMContentLoaded', () => {
    chatForm = document.getElementById('chatForm');
    messageInput = document.getElementById('messageInput');
    sendButton = document.getElementById('sendButton');
    chatMessages = document.getElementById('chatMessages');
    typingIndicator = document.getElementById('typingIndicator');
    clearChatBtn = document.getElementById('clearChat');
    medicineModal = document.getElementById('medicineModal');
    modalBody = document.getElementById('modalBody');
    modalClose = document.getElementById('modalClose');
    modalOverlay = document.getElementById('modalOverlay');

    initializeLanguageSwitcher();
    initializeEventListeners();
    initializeNavigation();
    setLanguage(currentLang);
});

function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang && selectedLang !== currentLang) {
                setLanguage(selectedLang);
            }
        });
    });
}

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('medibot_lang', lang);

    document.documentElement.lang = lang;

    const t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (t[key]) {
            el.title = t[key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (conversationHistory.length === 0) {
        const welcomeTextEl = document.getElementById('welcomeMessageText');
        if (welcomeTextEl) {
            welcomeTextEl.innerHTML = t.welcome_message;
        }
    }

    if (medicineModal && medicineModal.classList.contains('active') && currentOpenMedicine) {
        showMedicineDetails(currentOpenMedicine);
    }
}

function getMedicineField(medicine, field) {
    if (!medicine) return '';
    if (currentLang === 'en') {
        const enVal = medicine[`${field}_en`];
        if (enVal) return enVal;
    }
    return medicine[field] || '';
}

function initializeEventListeners() {
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (chatForm) {
                    chatForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const message = messageInput.value.trim();
            if (!message) return;

            addMessage(message, 'user');

            messageInput.value = '';
            messageInput.style.height = 'auto';

            if (typingIndicator) typingIndicator.style.display = 'flex';
            if (sendButton) sendButton.disabled = true;

            try {
                const response = await fetch(`${API_URL}/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message, language: currentLang })
                });

                if (!response.ok) {
                    throw new Error('Server response error');
                }

                const data = await response.json();

                if (typingIndicator) typingIndicator.style.display = 'none';
                if (sendButton) sendButton.disabled = false;

                addMessage(data.response, 'assistant');

                if (data.medicines && data.medicines.length > 0) {
                    currentMedicines = data.medicines;
                    addMedicinesCarouselToChat(data.medicines);
                }

            } catch (error) {
                console.error(error);
                if (typingIndicator) typingIndicator.style.display = 'none';
                if (sendButton) sendButton.disabled = false;

                addMessage(translations[currentLang].error_request, 'assistant');
            }
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && medicineModal && medicineModal.classList.contains('active')) {
            closeModal();
        }
    });

    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            if (confirm(translations[currentLang].clear_chat_confirm)) {
                chatMessages.innerHTML = '';

                const initialDiv = document.createElement('div');
                initialDiv.className = 'message assistant';
                initialDiv.id = 'initialBotMessage';
                initialDiv.innerHTML = `
                    <div class="message-avatar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                    </div>
                    <div class="message-content">
                        <div class="message-text" id="welcomeMessageText">
                            ${translations[currentLang].welcome_message}
                        </div>
                    </div>
                `;
                chatMessages.appendChild(initialDiv);

                conversationHistory = [];
                currentMedicines = [];
            }
        });
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';

    if (sender === 'assistant') {
        avatarDiv.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
        `;
    } else {
        avatarDiv.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        `;
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';

    textDiv.innerHTML = formatMessage(escapeHTML(String(text ?? '')));

    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    conversationHistory.push({ sender, text, timestamp: new Date() });
}

function formatMessage(text) {
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    text = text.replace(/\n+\s*\*\*/g, ' **').replace(/\*\*\s*\n+/g, '** ');
    text = text.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');

    text = text.replace(/\n*(?:ВАЖЛИВО|IMPORTANT)\s*:\s*([\s\S]*?)\s*$/i, (match, body) => {
        const warnTitle = currentLang === 'en' ? '⚠️ Important' : '⚠️ Важливо';
        return `\n<div class="resp-warn"><span class="resp-warn-title">${warnTitle}</span><span class="resp-warn-body">${body}</span></div>`;
    });

    text = text.replace(/(^|\n)\s*(АНАЛІЗ СИМПТОМІВ|РЕКОМЕНДОВАНІ ПРЕПАРАТИ|ПОЯСНЕННЯ|SYMPTOM ANALYSIS|RECOMMENDED MEDICATIONS|RECOMMENDED MEDICINES|EXPLANATION)\s*:/gi,
        '$1<div class="resp-section">$2</div>');

    text = text.replace(
        /^([А-ЯЁІЇЄҐA-Z][А-ЯЁІЇЄҐа-яёіїєґA-Za-z'ʼ0-9\- ]{1,40}?):/gm,
        '<strong class="resp-drug">$1:</strong>'
    );

    text = text.replace(/(^|\s)[*_]([^\s*_][^*_]*?)[*_](?=\s|[.,;:!?)]|$)/g, '$1<em>$2</em>');
    text = text.replace(/\n{2,}(?=<strong class="resp-drug">)/g, '\n');
    text = text.replace(/\n{3,}/g, '\n\n');
    text = text.replace(/\n/g, '<br>');
    text = text.replace(/(<br>\s*)+(<div class="resp-)/g, '$2');
    text = text.replace(/(<\/div>)(\s*<br>)+/g, '$1');
    text = text.replace(/(<br>\s*)+(<strong class="resp-drug">)/g, '$2');
    text = text.replace(/  +/g, ' ');

    return text;
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

function escapeAttribute(value) {
    return escapeHTML(String(value ?? '')).replace(/`/g, '&#96;');
}

function addMedicinesCarouselToChat(medicines) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant carousel-message';

    const infiniteMedicines = [...medicines, ...medicines, ...medicines];

    messageDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
        </div>
        <div class="message-content carousel-content">
            <div class="carousel-header-inline">
                <h4>${translations[currentLang].carousel_title}</h4>
            </div>
            <div class="inline-carousel">
                <button class="carousel-btn-inline prev" type="button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </button>
                <div class="carousel-track-wrapper">
                    <div class="carousel-track-inline">
                        ${infiniteMedicines.map(med => createMedicineCardHTML(med)).join('')}
                    </div>
                </div>
                <button class="carousel-btn-inline next" type="button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setupInfiniteCarousel(messageDiv, medicines.length);

    const cards = messageDiv.querySelectorAll('.medicine-card-inline');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const medicineIndex = index % medicines.length;
            showMedicineDetails(medicines[medicineIndex]);
        });
    });
}

function createMedicineCardHTML(medicine) {
    const name = getMedicineField(medicine, 'name');
    const category = getMedicineField(medicine, 'category');
    const rawDesc = getMedicineField(medicine, 'description') || translations[currentLang].drug_fallback_desc;
    const desc = rawDesc.substring(0, 60);
    const price = getMedicineField(medicine, 'price_range');

    const imageUrl = getSafeImageUrl(medicine.image_url);

    return `
        <div class="medicine-card-inline">
            <img src="${escapeAttribute(imageUrl)}"
                 alt="${escapeAttribute(name)}"
                 class="medicine-image-inline" 
                 onerror="this.src='/img/Paracetamol.webp'">
            <div class="medicine-category-inline">${escapeHTML(category)}</div>
            <h5>${escapeHTML(name)}</h5>
            <p class="medicine-desc-inline">${escapeHTML(desc)}...</p>
            <div class="medicine-price-inline">${escapeHTML(price)}</div>
        </div>
    `;
}

function getSafeImageUrl(value) {
    const imageUrl = String(value || '/img/Paracetamol.webp');
    return imageUrl.startsWith('/img/') ? imageUrl : '/img/Paracetamol.webp';
}

function setupInfiniteCarousel(messageDiv, originalLength) {
    const track = messageDiv.querySelector('.carousel-track-inline');
    const prevBtn = messageDiv.querySelector('.carousel-btn-inline.prev');
    const nextBtn = messageDiv.querySelector('.carousel-btn-inline.next');
    const wrapper = messageDiv.querySelector('.carousel-track-wrapper');

    let currentIndex = originalLength;

    function measureCardWidth() {
        const firstCard = track.querySelector('.medicine-card-inline');
        if (!firstCard) return 280;
        const cardRect = firstCard.getBoundingClientRect();
        const trackStyle = window.getComputedStyle(track);
        const rawGap = trackStyle.columnGap && trackStyle.columnGap !== 'normal'
            ? trackStyle.columnGap
            : trackStyle.gap;
        const gap = parseFloat(rawGap) || 0;
        return cardRect.width + gap;
    }

    let cardWidth = measureCardWidth();

    function applyTransform(animate) {
        if (!animate) {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        if (!animate) {
            void track.offsetWidth;
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }
    }

    applyTransform(false);

    function scrollCarousel(direction) {
        currentIndex += direction;
        applyTransform(true);

        setTimeout(() => {
            if (currentIndex >= originalLength * 2) {
                currentIndex = originalLength;
                applyTransform(false);
            } else if (currentIndex <= 0) {
                currentIndex = originalLength;
                applyTransform(false);
            }
        }, 400);
    }

    prevBtn.addEventListener('click', () => scrollCarousel(-1));
    nextBtn.addEventListener('click', () => scrollCarousel(1));

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let moved = false;

    wrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        moved = false;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        if (Math.abs(currentX - startX) > 10) moved = true;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        if (!moved) return;
        const diff = startX - currentX;
        if (Math.abs(diff) > 40) {
            scrollCarousel(diff > 0 ? 1 : -1);
        }
    });

    function handleResize() {
        const newWidth = measureCardWidth();
        if (Math.abs(newWidth - cardWidth) > 0.5) {
            cardWidth = newWidth;
            applyTransform(false);
        }
    }

    window.addEventListener('resize', handleResize);

    requestAnimationFrame(() => {
        cardWidth = measureCardWidth();
        applyTransform(false);
    });

    const imgs = track.querySelectorAll('img');
    imgs.forEach((img) => {
        if (img.complete) return;
        img.addEventListener('load', handleResize, { once: true });
    });
}

function showMedicineDetails(medicine) {
    currentOpenMedicine = medicine;
    const t = translations[currentLang];
    const name = getMedicineField(medicine, 'name');
    const category = getMedicineField(medicine, 'category');
    const manufacturer = medicine.manufacturer || '';
    const price = getMedicineField(medicine, 'price_range');
    const desc = getMedicineField(medicine, 'description');
    const active = getMedicineField(medicine, 'active_substance');
    const symptoms = getMedicineField(medicine, 'symptoms');
    const dosage = getMedicineField(medicine, 'dosage');
    const contra = getMedicineField(medicine, 'contraindications');
    const side = getMedicineField(medicine, 'side_effects');

    modalBody.innerHTML = `
        <img src="${escapeAttribute(getSafeImageUrl(medicine.image_url))}" alt="${escapeAttribute(name)}" class="modal-medicine-image"
             onerror="this.src='/img/Paracetamol.webp'">
        
        <div class="modal-medicine-header">
            <h2>${escapeHTML(name)}</h2>
            <div class="modal-medicine-meta">
                <span class="meta-badge category">${escapeHTML(category)}</span>
                <span class="meta-badge">${escapeHTML(t.modal_manufacturer)} ${escapeHTML(manufacturer)}</span>
                <span class="meta-badge price">${escapeHTML(price)}</span>
            </div>
        </div>

        <div class="modal-section">
            <h3>${t.modal_description}</h3>
            <p>${escapeHTML(desc)}</p>
        </div>

        <div class="modal-section">
            <h3>${t.modal_active_substance}</h3>
            <p>${escapeHTML(active)}</p>
        </div>

        <div class="modal-section">
            <h3>${t.modal_indications}</h3>
            <p>${escapeHTML(symptoms)}</p>
        </div>

        <div class="modal-section">
            <h3>${t.modal_dosage}</h3>
            <p>${escapeHTML(dosage)}</p>
        </div>

        <div class="modal-section">
            <h3>${t.modal_contraindications}</h3>
            <p>${escapeHTML(contra)}</p>
        </div>

        <div class="modal-section">
            <h3>${t.modal_side_effects}</h3>
            <p>${escapeHTML(side)}</p>
        </div>

        <div class="warning-box-modal">
            <strong>${escapeHTML(t.modal_warning_title)}</strong>
            <p>${escapeHTML(t.modal_warning_body)}</p>
        </div>
    `;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-compensation', scrollbarWidth + 'px');
    document.body.classList.add('modal-open');

    medicineModal.classList.add('active');
}

function closeModal() {
    if (medicineModal) {
        medicineModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.style.removeProperty('--scrollbar-compensation');
        currentOpenMedicine = null;
    }
}

function initializeNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!nav || navLinks.length === 0) return;

    function updateNavIndicator() {
        const activeLink = document.querySelector('.nav-link.active');
        if (!activeLink) return;

        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;

        nav.style.setProperty('--nav-left', `${left}px`);
        nav.style.setProperty('--nav-width', `${width}px`);

        nav.style.cssText += `
            --indicator-left: ${left}px;
            --indicator-width: ${width}px;
        `;

        const style = document.createElement('style');
        style.textContent = `
            .nav::after {
                left: ${left}px !important;
                width: ${width}px !important;
            }
        `;

        const oldStyle = document.getElementById('nav-indicator-style');
        if (oldStyle) oldStyle.remove();

        style.id = 'nav-indicator-style';
        document.head.appendChild(style);

        nav.classList.add('initialized');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateNavIndicator();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
                updateNavIndicator();
            }
        });
    });

    window.addEventListener('resize', updateNavIndicator);
    setTimeout(updateNavIndicator, 100);
}

fetch(`${API_URL}/health`)
    .then(response => response.json())
    .catch(() => {
        addMessage(translations[currentLang].error_server_down, 'assistant');
    });
