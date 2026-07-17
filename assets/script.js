const chatMessages = document.getElementById('chatMessages');

// 1. Mensagens pulando uma por uma ao carregar a página
window.onload = function() {
    if (chatMessages) {
        chatMessages.innerHTML = ''; // Limpa o chat para iniciar do zero
        
        // Primeiro pula a mensagem de saudação
        setTimeout(() => {
            appendMessage("Olá! Seja bem-vindo(a) ao MPROVA!🚀 Serei seu assistente IA nessa jornada. Como posso te ajudar hoje?", 'bot-message');
            
            // Depois de 1.2 segundos, pulam os botões de opções logo abaixo
            setTimeout(mostrarBotoesOpcoes, 1200);
        }, 500);
    }
};

// Formato de balão redondo azul injetado direto via JavaScript
function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    
    msgDiv.style.cssText = 'margin-bottom: 12px; padding: 12px 18px; border-radius: 18px; max-width: 75%; line-height: 1.5; word-wrap: break-word; font-family: sans-serif; display: block; font-size: 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: all 0.3s ease;';
    
    if (className === 'user-message') {
        msgDiv.style.background = '#007bff';
        msgDiv.style.color = '#ffffff';
        msgDiv.style.marginLeft = 'auto';
        msgDiv.style.borderBottomRightRadius = '4px';
    } else {
        msgDiv.style.background = '#e6f0fa';
        msgDiv.style.color = '#003366';
        msgDiv.style.marginRight = 'auto';
        msgDiv.style.borderBottomLeftRadius = '4px';
    }
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; 
}

function mostrarBotoesOpcoes() {
    const antigo = document.getElementById('currentOptions');
    if (antigo) antigo.remove();

    const optionsDiv = document.createElement('div');
    optionsDiv.id = 'currentOptions';
    optionsDiv.style.cssText = 'display: flex; flex-direction: column; gap: 8px; margin: 10px 0; max-width: 80%; animation: fadeInUp 0.4s ease;';

    optionsDiv.innerHTML = `
        <button class="option-btn" style="background:#fff; border:1px solid #007bff; color:#007bff; padding:10px 14px; border-radius:20px; cursor:pointer; text-align:left; font-weight:600; font-size:13px; transition: 0.2s;" onclick="selectOption('📋 Gerar meu Plano de Estudos')">📋 Gerar meu Plano de Estudos</button>
        <button class="option-btn" style="background:#fff; border:1px solid #007bff; color:#007bff; padding:10px 14px; border-radius:20px; cursor:pointer; text-align:left; font-weight:600; font-size:13px; transition: 0.2s;" onclick="selectOption('📚 Ver Materiais de Apoio disponíveis')">📚 Ver Materiais de Apoio disponíveis</button>
        <button class="option-btn" style="background:#fff; border:1px solid #007bff; color:#007bff; padding:10px 14px; border-radius:20px; cursor:pointer; text-align:left; font-weight:600; font-size:13px; transition: 0.2s;" onclick="selectOption('💡 Como usar o MProva?')">💡 Como usar o MProva?</button>
    `;

    chatMessages.appendChild(optionsDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mensagens enviadas uma atrás da outra continuamente
function selectOption(optionText) {
    const antigo = document.getElementById('currentOptions');
    if (antigo) {
        antigo.id = 'archivedOptions'; 
        const botoes = antigo.querySelectorAll('button');
        botoes.forEach(btn => {
            btn.style.opacity = '0.4';
            btn.style.pointerEvents = 'none';
        });
    }
    
    appendMessage(optionText, 'user-message');
    setTimeout(() => { processAIResponse(optionText); }, 1000);
}

// Consegue enviar o texto digitado na caixa de mensagens livre
function sendUserMessage() {
    const input = document.getElementById('userInput');
    if (!input) return;
    
    const text = input.value.trim();
    if (text === '') return;

    const antigo = document.getElementById('currentOptions');
    if (antigo) antigo.id = 'archivedOptions';

    appendMessage(text, 'user-message');
    input.value = '';
    
    setTimeout(() => { processAIResponse(text); }, 1000);
}

// Responder apenas coisas limitadas ao escopo do site
function processAIResponse(userInputText) {
    const query = userInputText.toLowerCase();
    let responseText = "";

    const keywordsContext = ['plano', 'estudo', 'material', 'mprova', 'olimpiada', 'apoio', 'ajuda', 'site', 'como funciona', 'cronograma'];
    const isInsideScope = keywordsContext.some(keyword => query.includes(keyword));

    if (!isInsideScope) {
        responseText = "Desculpe, mas sou um assistente focado exclusivamente no ecossistema MProva. Não consigo responder sobre outros assuntos. Como posso te ajudar com seus estudos hoje?";
    } else {
        if (query.includes('plano') || query.includes('cronograma')) {
            responseText = "Perfeito! Para gerar seu plano personalizado, recomendo focar nas matérias de maior peso. Você pode montar seu cronograma usando nossos guias na aba 'Materiais'.";
        } else if (query.includes('material') || query.includes('apoio') || query.includes('olimpiada')) {
            responseText = "Você pode acessar todos os nossos materiais de apoio e guias de olimpíadas clicando na opção 'Materiais' no menu superior!";
        } else {
            responseText = "O MProva é um ambiente desenvolvido para simplificar seus roteiros de estudos de alto nível. Deseja ver os materiais de apoio ou criar um plano?";
        }
    }

    appendMessage(responseText, 'bot-message');
    
    // Pula um novo bloco de opções após a resposta
    setTimeout(mostrarBotoesOpcoes, 1000);
}
