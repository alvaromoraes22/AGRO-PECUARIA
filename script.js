// Gerenciar Modal de Abertura e Quiz Interativo
const quizData = [
    {
        question: 'Qual prática contribui mais para a conservação do solo?',
        answers: [
            { text: 'Plantio direto', correct: true },
            { text: 'Desmatamento', correct: false },
            { text: 'Uso excessivo de fertilizantes', correct: false },
            { text: 'Queimada controlada sem planejamento', correct: false }
        ]
    },
    {
        question: 'Qual ação reduz melhor a pegada de carbono no campo?',
        answers: [
            { text: 'Uso de energia renovável', correct: true },
            { text: 'Expansão de pastagens sem recuperação', correct: false },
            { text: 'Transporte rodoviário pesado', correct: false },
            { text: 'Monocultura sem rotação', correct: false }
        ]
    },
    {
        question: 'O que é melhor para proteger a biodiversidade rural?',
        answers: [
            { text: 'Corredores ecológicos e áreas de preservação', correct: true },
            { text: 'Eliminação de todas as cercas', correct: false },
            { text: 'Uso de agrotóxicos em grandes áreas', correct: false },
            { text: 'Substituir florestas por pastagens', correct: false }
        ]
    },
    {
        question: 'Qual alternativa ajuda mais a economizar água na agricultura?',
        answers: [
            { text: 'Irrigação por gotejamento', correct: true },
            { text: 'Irrigação por inundação', correct: false },
            { text: 'Irrigação contínua sem controle', correct: false },
            { text: 'Irrigação apenas por chuva', correct: false }
        ]
    },
    {
        question: 'Qual é um exemplo de prática sustentável em pecuária?',
        answers: [
            { text: 'Rotação de pastagens', correct: true },
            { text: 'Superlotação animal', correct: false },
            { text: 'Uso de antibióticos preventivos em excesso', correct: false },
            { text: 'Remoção de árvores nativas', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const modal = document.getElementById('welcomeModal');
const closeBtn = document.querySelector('.close');
const questionText = document.getElementById('questionText');
const answerButtons = document.getElementById('answerButtons');
const currentQuestion = document.getElementById('currentQuestion');
const scoreDisplay = document.getElementById('scoreDisplay');
const nextButton = document.getElementById('nextButton');
const restartButton = document.getElementById('restartButton');
const quizResult = document.getElementById('quizResult');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const rewardMessage = document.getElementById('rewardMessage');

function initializeQuiz() {
    modal.style.display = 'flex';
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    nextButton.addEventListener('click', handleNextQuestion);
    restartButton.addEventListener('click', startQuiz);
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    quizResult.classList.add('hidden');
    nextButton.disabled = true;
    restartButton.style.display = 'inline-block';
    updateScoreDisplay();
    showQuestion();
}

function showQuestion() {
    answered = false;
    const currentData = quizData[currentQuestionIndex];
    currentQuestion.textContent = `Pergunta ${currentQuestionIndex + 1} / ${quizData.length}`;
    questionText.textContent = currentData.question;
    answerButtons.innerHTML = '';

    currentData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.className = 'quiz-button';
        button.dataset.correct = answer.correct;
        button.addEventListener('click', () => selectAnswer(button));
        answerButtons.appendChild(button);
    });

    nextButton.textContent = currentQuestionIndex === quizData.length - 1 ? 'Finalizar' : 'Próxima';
    nextButton.disabled = true;
}

function selectAnswer(button) {
    if (answered) {
        return;
    }

    answered = true;
    const isCorrect = button.dataset.correct === 'true';
    if (isCorrect) {
        score += 20;
    }

    Array.from(answerButtons.children).forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        } else if (btn === button) {
            btn.classList.add('incorrect');
        }
    });

    updateScoreDisplay();
    nextButton.disabled = false;
}

function handleNextQuestion() {
    if (!answered) {
        return;
    }

    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex += 1;
        showQuestion();
    } else {
        showResult();
    }
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Pontuação: ${score}`;
}

function showResult() {
    const rank = getRank(score);
    resultTitle.textContent = rank.title;
    resultMessage.textContent = rank.message;
    rewardMessage.textContent = rank.reward;
    quizResult.classList.remove('hidden');
    nextButton.disabled = true;
}

function getRank(score) {
    if (score === 100) {
        return {
            title: 'Campeão Sustentável',
            message: 'Você acertou todas as perguntas! Seu conhecimento em sustentabilidade é excelente.',
            reward: 'Recompensa: 💚 Certificado virtual de defensor ambiental e acesso ao conteúdo avançado de práticas verdes.'
        };
    }

    if (score >= 80) {
        return {
            title: 'Guardião Verde',
            message: 'Ótimo trabalho! Você está próximo de se tornar um líder em práticas sustentáveis.',
            reward: 'Recompensa: 🌿 Badge de simpatizante ambiental e dicas extras de agropecuária responsável.'
        };
    }

    if (score >= 60) {
        return {
            title: 'Aliado Sustentável',
            message: 'Bom desempenho! Continue aprendendo para aumentar sua influência positiva no campo.',
            reward: 'Recompensa: 🌱 Incentivo para aplicar uma prática sustentável em sua rotina.'
        };
    }

    return {
        title: 'Iniciante Consciente',
        message: 'Ótimo começo! Com mais prática você pode melhorar ainda mais seus resultados.',
        reward: 'Recompensa: 🌼 Comece hoje com uma ação simples de redução de desperdício.'
    };
}

function closeModal() {
    modal.style.animation = 'fadeOut 0.5s ease';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500);
}

function initializeCarousel() {
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function updateCarousel(index) {
        if (index < 0 || index >= slides.length) {
            return;
        }

        slides.forEach((slide, slideIndex) => {
            slide.classList.remove('active', 'left', 'right');
            if (slideIndex === index) {
                slide.classList.add('active');
            } else if (slideIndex < index) {
                slide.classList.add('left');
            } else {
                slide.classList.add('right');
            }
        });

        currentIndex = index;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
    }

    prevButton.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });

    updateCarousel(0);
}

// Adicionar animação de saída
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    initializeCarousel();
});
