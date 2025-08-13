let currentCard = 1;
let currentPhotoIndex = 0;
let isInPhotoMode = false;
let isInFinalCard = false;
let isTyping = false;
let typewriterTimeouts = [];
let isPlaying = false;
let backgroundMusic = null;

// Configuração das fotos com suas mensagens
const photoMessages = {
    0: {
        image: 'img/IMG_20240621_114803.jpg',
        title: '21/06/2024',
        defaultText: 'Nossa primeira foto juntos, onde tudo começou'
    },
    1: {
        image: 'img/IMG_20240714_110731.jpg',
        title: '14/07/2024',
        defaultText: 'Nosso primeiro domingo'
    },
    2: {
        image: 'img/IMG_20240721_175005.jpg',
        title: '21/07/2025',
        defaultText: 'O dia em que nossos corações se tocaram'
    },
    3: {
        image: 'img/IMG_20240818_183244.jpg',
        title: '21/07/2025',
        defaultText: 'O olhar da paixão e do desejo'
    },
    4: {
        image: 'img/IMG_20240901_194226.jpg',
        title: '01/09/2024',
        defaultText: 'O dia em que o universo sentiu inveja de nós'
    },
    5: {
        image: 'img/IMG_20240922_154947.jpg',
        title: '22/09/2024',
        defaultText: 'Nossa primeira viagens juntos'
    }
};

// Array de fotos (para compatibilidade)
const photos = Object.values(photoMessages).map(photo => photo.image);

// Armazenar textos personalizados para cada foto
let photoTexts = {};

// Configuração das mensagens
const messages = {
    1: {
        heart: '💖',
        title: 'Para Minha Princesa',
        text: 'Cada momento ao seu lado é um presente que guardo no coração...',
        mood: 'feliz',
        hasTypewriter: false
    },
    2: {
        heart: '💕',
        title: 'Meus Sentimentos',
        text: 'Desde o primeiro dia que te vi, meu coração soube que você era especial. Cada sorriso seu ilumina meu mundo e cada palavra sua aquece minha alma. Você não é apenas minha namorada, você é minha melhor amiga, minha companheira de vida, minha inspiração diária.',
        mood: 'feliz',
        hasTypewriter: true
    },
    3: {
        heart: '🌹',
        title: 'Tristeza',
        text: 'Mas infelizmente, nem tudo são flores...',
        mood: 'feliz',
        hasTypewriter: true
    },
    4: {
        heart: '💫',
        title: 'Meus erros',
        text: 'Eu sei o quanto eu errei, eu sei que deixei de ser tudo aquilo que você gostava e amava em mim. Eu olho para o passado e sinto falta dos dias em que éramos felizes, em que você era feliz comigo e me dói saber que a culpa de não ser como era antes é toda minha. Você nunca errou comigo. Eu quem me perdi e me tornei a pessoa que hoje você não ama e não confia. Mas eu vou te conquistar novamente e você vai ter orgulho de dizer que é a minha namorada, da mesma forma que você tinha antes.',
        mood: 'triste',
        hasTypewriter: true
    },
    5: {
        heart: '💝',
        title: 'Perca de confiança',
        text: 'Eu fui um otário com você, quebrei a sua confiança, fiz você se sentir triste e se culpar por algo que a culpa não era sua, a culpa sempre foi minnha, eu não sabia quem eu estava me tornando, eu errei em escutar as vozes negativas da minha cabeça, ao invés de escutar o meu coração e ainda mais de não ter escutado o que você falava, não há palavras no mundo que eu possa usar para me desculpar, mas eu posso buscar a redenção e o seu perdão, através de atitudes e mudando para alguém melhor.',
        mood: 'triste',
        hasTypewriter: false
    },
    6: {
        heart: '💝',
        title: 'Mudança gradual',
        hasTypewriter: false,
        text: "Aos pouquinhos eu percebo que estou mudando para melhor, estou começando a ter mais calma e paciência para esperar. Confeço que as vez vezes um sentimento queima dentro de mim, mas eu luto com todas as minhas forças para me acalmar, e espero pacientemente, estou ignorando as vozes negativas da minha cabeça e é você que me motiva a ignorar elas, eu olho para a nossa aliança, vejo fotos antigas e isso me motiva e me da energia para travessar essa escuridão da minha mente, mesmo sem saber você tem sido a luz para isso.",
        mood: "triste"
    },
    7: {
        heart: '💝',
        title: 'Fim da parte triste',
        hasTypewriter: false,
        text: "Enfim, chega de tristeza, hora de ir para o objetivo de tudo isso, bom proveito!",
        mood: "feliz"
    },
    8: {
        heart: '💝',
        title: 'Descoberta do amor',
        hasTypewriter: false,
        text: "O momento em que eu descobri que era você a mulher certa, foi quando me chamou para dançar e me ensinou alguns passos, você não se importou com as pessoas ao redor, com o local, você fez de uma simples praia, o nosso salão, colocamos uma música e dançamos por um bom tempo, rimos com os passos errados, com os pisões um no pé do outro, mas também pelo sentimento que nos cercava. Sempre fizemos de qualquer lugar o nosso lugar, independente da hora ou do lugar.",
        mood: "feliz"
    },
    9: {
        heart: '💝',
        title: 'Brilho em companhia',
        hasTypewriter: false,
        text: "O quão tola uma pessoa tem que ser por tentar ofuscar o brilho de outra pessoa? Eu respondo tola para um *******, mas que sorte eu tenho por ter uma segunda chance, agora eu não vou tentar segurar a estrela que você é nas minhas mãos mundanas, deixarei você livre para brilhar e assim como você me tornarei novamente uma estrela e poderemos brilhar juntos. Mas nunca um ofuscando o brilho do outro, com proximidade o suficiente para nos amarmos e vivermos juntos, mas com distância o suficiente para brilharmos sozinhos.",
        mood: "feliz"
    },
    10:{
        heart: '💝',
        title: 'Mulher extraordinária',
        hasTypewriter: false,
        text:"Ana Júlia, talvez você não saiba, mas você é incrível e tem um potencial absurdo, eu admiro a sua persistência, mesmo você estando triste e desesperada, você consegue seguir em frente, você não desiste, não se deixa por vencida, você começou, você termina. A maior prova disso, foi aquele dia que você esqueceu de fazer o chantily e eu fui até você no mercado, enquanto eu falava para você assumir a derrota e se livrar desse peso, você não desistiu, você persistiu e no final conseguiu fazer e entregar com maestria, felizmente você não me deu ouvidos e seguiu os seus instintos, eu pensava que eu era persistente, mas você, você é a persistência, você faz acontecer as coisas, independente do que os outros digam. Ana Júlia, você é extraordinária.",
        mood:"feliz"
    },
    11: {
        heart: '💝',
        title: 'O sonhar',
        hasTypewriter: false,
        text: "Sonho com todos os momentos que ainda vamos viver juntos. Quero estar ao seu lado em cada conquista, em cada desafio, em cada sorriso e em cada lágrima. Quero construir uma vida linda com você, cheia de amor, cumplicidade, confiança e muitas aventuras. Você é meu presente e meu futuro.",
        mood: "feliz"
    },
    12:{
        heart: '💝',
        title: 'Confiança não é dada, mas conquistada',
        hasTypewriter: false,
        text:"Eu sei que no momento você não me ama, mas eu vou conquistar o seu amor, aos poucos, primeiro a sua confiança e depois o seu amor. Sei que pode ser um pouco difícil, mas eu vou ser justamente aquilo que preciso ser, paciente. Aos poucos vou te conquistando, como foi no início.",
        mood:"triste"
    },
    13: {
        heart: '💝',
        title: 'Eu te amo',
        hasTypewriter: false,
        text:"Eu te amo, meu amor. Eu te amei no passado, te amo no presente e vou te amar no futuro.",
        mood:"feliz"
    },
    14:{
        heart: '💝',
        title: 'Obrigado por ter chegado até aqui',
        hasTypewriter: false,
        text:"Obrigado por ter chegado até aqui, significa muito pra mim, agora só tem mais uma coisa(é a última, eu juro)... espero que goste.",
        mood:"feliz"
    }
};

const totalTextCards = Object.keys(messages).length;

function showPhotoGallery() {
    isInPhotoMode = true;
    currentPhotoIndex = 0;
    
    // Esconder todos os cards de texto
    for (let i = 1; i <= totalTextCards; i++) {
        const card = document.getElementById(`card${i}`);
        if (card) card.classList.remove('active');
    }
    
    // Mostrar galeria de fotos
    showPhoto(currentPhotoIndex);
}

function showPhoto(index) {
    const photoGallery = document.getElementById('photo-gallery');
    if (!photoGallery) {
        createPhotoGallery();
    }
    
    const photoCard = document.getElementById('photo-card');
    const photoImg = document.getElementById('photo-img');
    const photoText = document.getElementById('photo-text');
    const photoCounter = document.getElementById('photo-counter');
    const photoTitle = document.getElementById('photo-title');
    const prevBtn = document.getElementById('photo-prev-btn');
    const nextBtn = document.getElementById('photo-next-btn');
    
    // Obter dados da foto atual
    const currentPhoto = photoMessages[index];
    if (!currentPhoto) return;
    
    // Atualizar imagem
    photoImg.src = currentPhoto.image;
    
    // Atualizar título
    if (photoTitle) {
        photoTitle.textContent = currentPhoto.title;
    }
    
    // Atualizar texto (carregar texto salvo ou usar texto padrão)
    const savedText = photoTexts[index] || currentPhoto.defaultText;
    photoText.value = savedText;
    
    // Atualizar contador
    photoCounter.textContent = `${index + 1} de ${Object.keys(photoMessages).length}`;
    
    // Atualizar botões
    prevBtn.disabled = index === 0;
    if (index === Object.keys(photoMessages).length - 1) {
        nextBtn.textContent = 'Finalizar →';
        nextBtn.disabled = false;
    } else {
        nextBtn.textContent = 'Próxima →';
        nextBtn.disabled = false;
    }
    
    // Mostrar card da foto
    photoCard.classList.add('active');
    
    // Aplicar tema baseado no último card visitado
    const lastMessage = messages[totalTextCards];
    if (lastMessage) {
        applyTheme(lastMessage.mood);
    } else {
        applyTheme('feliz');
    }
}

function createPhotoGallery() {
    const container = document.querySelector('.container');
    
    const photoGallery = document.createElement('div');
    photoGallery.id = 'photo-gallery';
    photoGallery.innerHTML = `
        <div class="card" id="photo-card">
            <div class="heart">📸</div>
            <h1 id="photo-title">Nossas Memórias</h1>
            <div class="photo-container">
                <img id="photo-img" src="" alt="Nossa foto" />
            </div>
            <div class="photo-text-container">
                <textarea id="photo-text" placeholder="Escreva uma legenda para esta foto..." maxlength="200"></textarea>
            </div>
            <div class="photo-counter" id="photo-counter"></div>
            <div class="buttons">
                <button class="btn-prev" id="photo-prev-btn" onclick="prevPhoto()">← Anterior</button>
                <button class="btn-next" id="photo-next-btn" onclick="nextPhoto()">Próxima →</button>
            </div>
            <div class="buttons" style="margin-top: 10px;">
                <button class="btn-prev" onclick="backToTextCards()">← Voltar aos Cards</button>
                <button class="btn-next" onclick="savePhotoText()">💾 Salvar Texto</button>
            </div>
        </div>
    `;
    
    container.appendChild(photoGallery);
}

function nextPhoto() {
    if (currentPhotoIndex < Object.keys(photoMessages).length - 1) {
        saveCurrentPhotoText();
        currentPhotoIndex++;
        showPhoto(currentPhotoIndex);
    } else {
        // Ir para o card final após a última foto
        saveCurrentPhotoText();
        showFinalCard();
    }
}

function prevPhoto() {
    if (currentPhotoIndex > 0) {
        saveCurrentPhotoText();
        currentPhotoIndex--;
        showPhoto(currentPhotoIndex);
    }
}

function saveCurrentPhotoText() {
    const photoText = document.getElementById('photo-text');
    if (photoText) {
        photoTexts[currentPhotoIndex] = photoText.value;
    }
}

function savePhotoText() {
    saveCurrentPhotoText();
    // Feedback visual
    const saveBtn = event.target;
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✅ Salvo!';
    saveBtn.style.background = 'linear-gradient(45deg, #4caf50, #66bb6a)';
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
    }, 1500);
}

function showFinalCard() {
    // Esconder galeria de fotos
    const photoCard = document.getElementById('photo-card');
    if (photoCard) {
        photoCard.classList.remove('active');
    }
    
    // Esconder card dinâmico
    const dynamicCard = document.getElementById('dynamic-card');
    if (dynamicCard) {
        dynamicCard.style.display = 'none';
    }
    
    // Esconder galeria de fotos
    const photoGallery = document.getElementById('photo-gallery');
    if (photoGallery) {
        photoGallery.style.display = 'none';
    }
    
    // Criar ou mostrar card final
    let finalCard = document.getElementById('final-card');
    if (!finalCard) {
        createFinalCard();
        finalCard = document.getElementById('final-card');
    }
    
    // Aplicar tema feliz
    applyTheme('feliz');
    
    // Mostrar card final
    finalCard.classList.add('active');
    isInPhotoMode = false;
    isInFinalCard = true;
}

function createFinalCard() {
    const container = document.querySelector('.container');
    
    const finalCardDiv = document.createElement('div');
    finalCardDiv.id = 'final-card';
    finalCardDiv.innerHTML = `
        <div class="card" style="display:block">
            <div class="heart">💖</div>
            <h1>Fim da Jornada</h1>
            <p class="message">Então, agora acabou, obrigado por ter chegado até aqui, essa é só uma demonstração de amor por você. Espero que tenha gostado, desculpa pela surpresa. Eu te amo e bom trabalho 💕</p>
            <div class="buttons">
                <button class="btn-prev" onclick="backToPhotos()">← Voltar às Fotos</button>
                <button class="btn-next" onclick="restartJourney()">🔄 Recomeçar</button>
            </div>
        </div>
    `;
    
    container.appendChild(finalCardDiv);
}

function backToPhotos() {
    const finalCard = document.getElementById('final-card');
    if (finalCard) {
        finalCard.classList.remove('active');
    }
    
    // Restaurar visibilidade da galeria de fotos
    const photoGallery = document.getElementById('photo-gallery');
    if (photoGallery) {
        photoGallery.style.display = 'block';
    }
    
    // Voltar para a última foto
    isInPhotoMode = true;
    isInFinalCard = false;
    currentPhotoIndex = Object.keys(photoMessages).length - 1;
    showPhoto(currentPhotoIndex);
}

function restartJourney() {
    const finalCard = document.getElementById('final-card');
    if (finalCard) {
        finalCard.classList.remove('active');
    }
    
    // Restaurar visibilidade do card dinâmico
    const dynamicCard = document.getElementById('dynamic-card');
    if (dynamicCard) {
        dynamicCard.style.display = 'block';
    }
    
    // Voltar para o primeiro card
    isInPhotoMode = false;
    isInFinalCard = false;
    currentCard = 1;
    showCard(currentCard);
}

function backToTextCards() {
    isInPhotoMode = false;
    const photoCard = document.getElementById('photo-card');
    if (photoCard) {
        photoCard.classList.remove('active');
    }
    
    // Voltar para o último card de texto
    currentCard = totalTextCards;
    showCard(currentCard);
}


function applyTheme(mood) {
    const body = document.body;
    const container = document.querySelector('.container');
    
    // Remove existing theme classes
    body.classList.remove('theme-feliz', 'theme-triste');
    container.classList.remove('theme-feliz', 'theme-triste');
    
    // Add new theme class with delay for smooth transition
    setTimeout(() => {
        body.classList.add(`theme-${mood}`);
        container.classList.add(`theme-${mood}`);
    }, 100);
}

function typeWriter(text, element, callback) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            const timeout = setTimeout(type, 50);
            typewriterTimeouts.push(timeout);
        } else {
            element.classList.remove('typewriter');
            isTyping = false;
            if (callback) callback();
        }
    }
    
    element.classList.add('typewriter');
    type();
}

function showCard(cardNumber) {
    // Esconder galeria de fotos se estiver ativa
    const photoCard = document.getElementById('photo-card');
    if (photoCard) {
        photoCard.classList.remove('active');
    }
    
    // Esconder card final se estiver ativo
    const finalCard = document.getElementById('final-card');
    if (finalCard) {
        finalCard.classList.remove('active');
    }
    
    isInPhotoMode = false;
    isInFinalCard = false;
    
    // Limpar timeouts anteriores
    typewriterTimeouts.forEach(timeout => clearTimeout(timeout));
    typewriterTimeouts = [];
    isTyping = false;
    
    // Obter elementos do card dinâmico
    const dynamicCard = document.getElementById('dynamic-card');
    const cardHeart = document.getElementById('card-heart');
    const cardTitle = document.getElementById('card-title');
    const cardMessage = document.getElementById('card-message');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!dynamicCard || !messages[cardNumber]) return;
    
    // Atualizar conteúdo do card
    const message = messages[cardNumber];
    cardHeart.textContent = message.heart;
    cardTitle.textContent = message.title;
    
    // Aplicar tema
    applyTheme(message.mood);
    
    // Atualizar botões
    prevBtn.disabled = cardNumber === 1;
    if (cardNumber === totalTextCards) {
        nextBtn.textContent = 'Ver Fotos →';
        nextBtn.disabled = false;
    } else {
        nextBtn.textContent = 'Próximo →';
        nextBtn.disabled = false;
    }
    
    // Configurar clique no card para pular digitação
    dynamicCard.onclick = () => {
        if (isTyping) {
            skipTypewriter();
        }
    };
    
    // Verificar se precisa do efeito de digitação
    if (message.hasTypewriter) {
        cardMessage.innerHTML = '';
        cardMessage.classList.add('typewriter');
        dynamicCard.classList.add('typing');
        nextBtn.disabled = true;
        isTyping = true;
        
        typeWriter(message.text, cardMessage, () => {
            nextBtn.disabled = false;
            isTyping = false;
            dynamicCard.classList.remove('typing');
        });
    } else {
        cardMessage.innerHTML = message.text;
        cardMessage.classList.remove('typewriter');
        dynamicCard.classList.remove('typing');
    }
    
    // Garantir que o card está visível
    dynamicCard.classList.add('active');
}

function skipTypewriter() {
    // Limpar todos os timeouts da digitação
    typewriterTimeouts.forEach(timeout => clearTimeout(timeout));
    typewriterTimeouts = [];
    
    // Obter elementos
    const dynamicCard = document.getElementById('dynamic-card');
    const cardMessage = document.getElementById('card-message');
    const nextBtn = document.getElementById('next-btn');
    
    if (cardMessage && nextBtn && messages[currentCard]) {
        // Mostrar texto completo imediatamente
        cardMessage.innerHTML = messages[currentCard].text;
        cardMessage.classList.remove('typewriter');
        nextBtn.disabled = false;
        isTyping = false;
        
        // Remover classe typing do card
        if (dynamicCard) {
            dynamicCard.classList.remove('typing');
        }
    }
}

function nextCard() {
    // Se estamos no card final, não fazer nada
    if (isInFinalCard) {
        return;
    }
    
    if (isInPhotoMode) {
        nextPhoto();
        return;
    }
    
    if (currentCard < totalTextCards) {
        currentCard++;
        showCard(currentCard);
    } else if (currentCard === totalTextCards) {
        // Ir para a galeria de fotos
        showPhotoGallery();
    }
}

function prevCard() {
    if (isInPhotoMode) {
        prevPhoto();
        return;
    }
    
    if (currentCard > 1) {
        currentCard--;
        showCard(currentCard);
    }
}

// Create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);

// Função para controlar a música
function toggleMusic() {
    const musicBtn = document.getElementById('music-btn');
    
    if (!backgroundMusic) {
        backgroundMusic = document.getElementById('background-music');
    }
    
    if (isPlaying) {
        backgroundMusic.pause();
        musicBtn.textContent = '🎵 Tocar Música';
        musicBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            musicBtn.textContent = '⏸️ Pausar Música';
            musicBtn.classList.add('playing');
            isPlaying = true;
        }).catch(error => {
            console.log('Erro ao reproduzir música:', error);
        });
    }
}

// Função para parar a música
function stopMusic() {
    if (backgroundMusic && isPlaying) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        const musicBtn = document.getElementById('music-btn');
        musicBtn.textContent = '🎵 Tocar Música';
        musicBtn.classList.remove('playing');
        isPlaying = false;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    showCard(1);
    backgroundMusic = document.getElementById('background-music');
});