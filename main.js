// Configuración del juego
let cubo = {
    x: 100,
    y: 300,
    ancho: 30,
    alto: 30,
    color: '#ff0000',
    nombre: '',
    velocidadY: 0,
    saltando: false,
    agachado: false
};

let fondoImagen;
let juegoIniciado = false;
const GRAVEDAD = 0.5;
const FUERZA_SALTO = -12;
const VELOCIDAD_MOVIMIENTO = 5;

// Función de precarga para la imagen
function preload() {
    // Cargamos una imagen de fondo de Mario Bros
    fondoImagen = loadImage('https://i.imgur.com/ZN4dm0X.png');
}

function iniciarJuego() {
    const nombreInput = document.getElementById('nombreJugador');
    const colorInput = document.getElementById('colorCubo');
    
    cubo.nombre = nombreInput.value || 'Jugador';
    cubo.color = colorInput.value;
    
    document.getElementById('menuInicial').classList.add('oculto');
    document.getElementById('gameCanvas').classList.remove('oculto');
    
    juegoIniciado = true;
}

// Función de inicio
function setup() {
    let canvas = createCanvas(800, 400);
    canvas.parent('gameCanvas');
}

// Bucle principal del juego
function draw() {
    if (!juegoIniciado) return;

    // Dibujar fondo
    if (fondoImagen) {
        image(fondoImagen, 0, 0, width, height);
    } else {
        // Fondo alternativo si no carga la imagen
        background('#63c6ff');
        // Dibujar suelo
        fill('#5a9e00');
        rect(0, height - 40, width, 40);
        // Dibujar nubes
        fill(255);
        for(let i = 0; i < 5; i++) {
            ellipse(i * 200, 50, 60, 40);
        }
    }
    
    // Aplicar gravedad
    cubo.velocidadY += GRAVEDAD;
    cubo.y += cubo.velocidadY;
    
    // Límite del suelo
    if (cubo.y > height - cubo.alto - 40) {
        cubo.y = height - cubo.alto - 40;
        cubo.velocidadY = 0;
        cubo.saltando = false;
    }
    
    // Control de movimiento
    if (keyIsDown(65)) { // A - Izquierda
        cubo.x -= VELOCIDAD_MOVIMIENTO;
    }
    if (keyIsDown(68)) { // D - Derecha
        cubo.x += VELOCIDAD_MOVIMIENTO;
    }
    if (keyIsDown(87) && !cubo.saltando) { // W - Saltar
        cubo.velocidadY = FUERZA_SALTO;
        cubo.saltando = true;
    }
    if (keyIsDown(83)) { // S - Agacharse
        cubo.agachado = true;
        cubo.alto = 15;
    } else {
        cubo.agachado = false;
        cubo.alto = 30;
    }
    
    // Límites de pantalla
    cubo.x = constrain(cubo.x, 0, width - cubo.ancho);
    
    // Dibujar cubo con efecto de sombra
    push();
    fill(0, 0, 0, 50);
    rect(cubo.x + 5, cubo.y + 5, cubo.ancho, cubo.alto);
    fill(cubo.color);
    rect(cubo.x, cubo.y, cubo.ancho, cubo.alto);
    pop();
    
    // Mostrar nombre con mejor estilo
    if (cubo.nombre) {
        push();
        fill(0);
        textSize(14);
        textAlign(CENTER);
        textStyle(BOLD);
        text(cubo.nombre, cubo.x + cubo.ancho/2, cubo.y - 10);
        pop();
    }
}
