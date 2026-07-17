const chatMessages = document.getElementById('chatMessages');

// Inicia as opções automáticas assim que o site carrega
window.onload = function() {
    setTimeout(mostrarBotoesOpcoes, 500);
};

// Gera as mensagens uma atrás da outra com formato de balão redondo azul
function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    
    // Aplica o formato arredondado azul moderno direto no código para não errar o CSS
    msgDiv.style.cssText = 'margin-bottom: 12px; padding: 12px 18px; border-radius: 18px; max-width: 75%; line-height: 1.5; word-wrap: break-word; font-family: sans-serif; display: block;';
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

// Cria os botões rápidos direto dentro do fluxo de mensagens do chat
function mostrarBotoesOpcoes() {
    const antigo = document.getElementById('currentOptions');
    if (antigo) antigo.remove();

    const optionsDiv = document.createElement('div');
    optionsDiv.id = 'currentOptions';
    optionsDiv.style.cssText = 'display: flex; flex-direction: column; gap: 8px; margin: 10px 0; max-width: 80%;';

    optionsDiv.innerHTML = `
        <button class="option-btn" style="background:#fff; border:1px solid #007bff; color:#007bff; padding:10px 14px; border-radius:20px; cursor:pointer; text-align:left; font-weight:600; font-size:13px;" onclick="selectOption('📋 Gerar meu Plano de Estudos')">📋 Gerar meu Plano de Estudos</button>
        <button class="option-btn" style="background:#fff; border:1px solid #007bff; color:#007bff; padding:10px 14px; border-radius:20px; cursor:pointer; text-align:left; font-weight:600; font-size:13px;" onclick="selectOption('📚 Ver Materiais de Apoio disponíveis')">📚 Ver Materiais de Apoio disponíveis</button>
        <button class="option-btn" style="background:#fff; border:1px solid #007bff; color:#007bff; padding:10px 14px; border-radius:20px; cursor:pointer; text-align:left; font-weight:600; font-size:13px;" onclick="selectOption('💡 Como usar o MProva?')">💡 Como usar o MProva?</button>
    `;

    chatMessages.appendChild(optionsDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Faz com que as opções fiquem guardadas no histórico continuamente ao invés de sumirem
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
    setTimeout(() => { processAIResponse(optionText); }, 800);
}

function sendUserMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (text === '') return;

    const antigo = document.getElementById('currentOptions');
    if (antigo) antigo.id = 'archivedOptions';

    appendMessage(text, 'user-message');
    input.value = '';
    setTimeout(() => { processAIResponse(text); }, 800);
}

// Executa as respostas limitadas ao escopo e gera novas opções de cliques em seguida
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
    setTimeout(mostrarBotoesOpcoes, 600);
}
