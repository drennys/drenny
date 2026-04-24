// ===== FUNCIONALIDAD GENERAL =====

// Variables para el control de páginas
let currentPage = 'page-flower';

// Función para cambiar de página
function showPage(pageId) {
    // Ocultar página actual
    const currentPageElement = document.getElementById(currentPage);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Mostrar nueva página
    const newPageElement = document.getElementById(pageId);
    if (newPageElement) {
        newPageElement.classList.add('active');
        currentPage = pageId;
    }
}

// Función para ir a la página "Te amo"
function showLovePage() {
    showPage('page-love');
    
    // Resetear el contador de typing para "Te amo"
    loveI = 0;
    const loveTypingText = document.getElementById('love-typing-text');
    const loveCursor = document.getElementById('love-cursor');
    const heartPath = document.getElementById('heart-path');
    
    if (loveTypingText) loveTypingText.innerHTML = '';
    if (loveCursor) loveCursor.style.opacity = '1';
    if (heartPath) heartPath.style.animation = 'none';
    
    // Iniciar el typing después de un pequeño delay
    setTimeout(() => {
        loveTypeWriter();
    }, 800);
}

// Función para ir de vuelta a la página principal (no se usa ahora, pero por si acaso)
function goBack() {
    showPage('page-flower');
    
    // Resetear estados de la página principal
    setTimeout(() => {
        const loading = document.getElementById('loading');
        const instruction = document.querySelector('.instruction');
        const flower = document.querySelector('.flower');
        
        if (loading) loading.classList.remove('show');
        if (instruction) instruction.style.opacity = '1';
        if (flower) flower.style.pointerEvents = 'auto';
        
        // Resetear el typing text para la próxima vez
        const typingText = document.getElementById('typing-text');
        const cursor = document.getElementById('cursor');
        if (typingText) typingText.innerHTML = '';
        if (cursor) cursor.style.opacity = '1';
        i = 0; // Reset typing counter
    }, 100);
}

// ===== FUNCIONALIDAD DE LA PÁGINA DE MENSAJE =====

// Variables para el efecto de typing
const message = "Mi lugar favorito en el mundo siempre estará a tu lado.\n\nTu sonrisa ilumina mi existencia y tu amor hace que todo sea perfecto.\n\nGracias por ser tú.";
const loveMessage = "Te amo";
let i = 0;
let loveI = 0;
const typingSpeed = 60;
const loveTypingSpeed = 150;

// Función para crear brillitos profesionales
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    if (!sparklesContainer) return;
    
    // Crear 15 brillitos
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Posición aleatoria
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 4 + 's';
            
            sparklesContainer.appendChild(sparkle);
            
            // Remover el brillito después de la animación
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 4000);
        }, i * 300); // Crear un brillito cada 300ms
    }
}

// Función para el efecto de typing de "Te amo"
function loveTypeWriter() {
    const textElement = document.getElementById("love-typing-text");
    const cursor = document.getElementById("love-cursor");
    
    if (!textElement || !cursor) return;
    
    if (loveI < loveMessage.length) {
        textElement.innerHTML += loveMessage.charAt(loveI);
        loveI++;
        setTimeout(loveTypeWriter, loveTypingSpeed);
    } else {
        // Hide cursor when typing is complete
        setTimeout(() => {
            cursor.style.opacity = "0";
            // Iniciar animación del corazón después del typing
            setTimeout(() => {
                const heartPath = document.getElementById('heart-path');
                if (heartPath) {
                    heartPath.style.animation = 'drawHeart 3s ease-in-out forwards';
                }
            }, 500);
        }, 1000);
    }
}

// Función para el efecto de typing del mensaje principal
function typeWriter() {
    const textElement = document.getElementById("typing-text");
    const cursor = document.getElementById("cursor");
    
    if (!textElement || !cursor) return;
    
    if (i < message.length) {
        if (message.charAt(i) === '\n') {
            textElement.innerHTML += '<br>';
        } else {
            textElement.innerHTML += message.charAt(i);
        }
        i++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Hide cursor when typing is complete
        cursor.style.opacity = "0";
        // Show back button
        setTimeout(() => {
            const backBtn = document.querySelector('.back-btn');
            if (backBtn) {
                backBtn.style.opacity = "1";
                backBtn.style.transform = "translateX(-50%) translateY(0)";
            }
        }, 500);
    }
}

// Función para inicializar los brillitos continuos
function startContinuousSparkles() {
    createSparkles();
    // Crear nuevos brillitos cada 5 segundos
    setInterval(createSparkles, 5000);
}

// ===== INICIALIZACIÓN =====

// Inicialización cuando se carga la página
window.addEventListener('load', () => {
    // Asegurar que la página de la flor esté activa al inicio
    showPage('page-flower');
});

// ===== FUNCIONALIDAD DE LA PÁGINA PRINCIPAL =====

// Función para mostrar loading y navegar
function showMessage() {
    const loading = document.getElementById('loading');
    const flower = document.querySelector('.flower');
    const instruction = document.querySelector('.instruction');
    
    if (loading && flower && instruction) {
        // Hide instruction and show loading
        instruction.style.opacity = '0';
        loading.classList.add('show');
        flower.style.pointerEvents = 'none'; // Disable clicks during loading
        
        // Navigate to message page after 2.5 seconds
        setTimeout(() => {
            showPage('page-message');
            
            // Iniciar brillitos y typing después de cambiar de página
            setTimeout(() => {
                startContinuousSparkles();
                typeWriter();
            }, 500);
        }, 2500);
    }
}
