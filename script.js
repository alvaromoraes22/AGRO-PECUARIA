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

function initializeCarousel() {
    const container = document.getElementById('carouselCanvas');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 3.5, 13);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x0b2a20, 1);
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    const imagePaths = [
        'TRIGO.PNG',
        'carousel2.svg',
        'carousel3.svg',
        'carousel4.svg',
        'carousel5.svg'
    ];

    const loader = new THREE.TextureLoader();
    const radius = 7.5;
    const cardWidth = 5.2;
    const cardHeight = 3.5;
    const planes = [];

    imagePaths.forEach((path, index) => {
        const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
        // Usar MeshBasicMaterial para não depender da iluminação (evita área preta)
        const material = new THREE.MeshBasicMaterial({
            map: loader.load(path),
            side: THREE.DoubleSide,
            transparent: true
        });
        const plane = new THREE.Mesh(geometry, material);
        const angle = index * ((Math.PI * 2) / imagePaths.length);
        plane.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
        plane.lookAt(new THREE.Vector3(0, 0, 0));
        carouselGroup.add(plane);
        planes.push(plane);
    });

    carouselGroup.rotation.x = 0;
    carouselGroup.rotation.y = 0;

    let targetRotation = 0;
    const rotationStep = (Math.PI * 2) / imagePaths.length;

    prevButton.addEventListener('click', () => {
        targetRotation += rotationStep;
    });

    nextButton.addEventListener('click', () => {
        targetRotation -= rotationStep;
    });

    // vetores temporários para cálculo de visibilidade
    const tmpVec = new THREE.Vector3();
    const tmpDir = new THREE.Vector3();

    function animate() {
        requestAnimationFrame(animate);

        // rotação suave do grupo
        carouselGroup.rotation.y += (targetRotation - carouselGroup.rotation.y) * 0.08;

        // Para cada card, mostrar somente quando estiver de frente para a câmera
        planes.forEach((plane) => {
            // direção do plano (eixo -Z do objeto) em mundo
            plane.getWorldDirection(tmpDir).normalize();
            // vetor da posição do plano até a câmera
            tmpVec.copy(camera.position).sub(plane.getWorldPosition(new THREE.Vector3())).normalize();
            const dot = tmpVec.dot(tmpDir);

            // Opacidade mapeada a partir do dot, com um mínimo para evitar desaparecer completamente
            const opacity = Math.max(0.15, dot);
            plane.material.transparent = true;
            plane.material.opacity = opacity;
            plane.material.needsUpdate = true;

            // Visível se estiver apontando ao menos parcialmente para a câmera
            plane.visible = dot > -0.2;

            // Fazer o card sempre olhar para a câmera (billboard)
            plane.lookAt(camera.position);

            // Aproximar e aumentar os cards que estão mais frontais para ficarem em primeiro plano
            // calcular direção local no plano XZ (posições locais do filho no grupo)
            const dir = tmpDir.set(plane.position.x, 0, plane.position.z).normalize();
            const bringForward = 2.5 * opacity; // quanto aproximar
            const desiredRadius = radius - bringForward;
            plane.position.x = dir.x * desiredRadius;
            plane.position.z = dir.z * desiredRadius;

            // Escala para destacar o card frontal
            const scale = 0.9 + (0.9 * opacity);
            plane.scale.set(scale, scale, 1);
        });

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}
