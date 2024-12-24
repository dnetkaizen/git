// Configuración del juego
let cubo = {
    x: 100,
    y: 300,
    ancho: 30,
    alto: 30,
    color: '#000000',
    nombre: '',
    velocidadY: 0,
    saltando: false,
    agachado: false
};

let fondoImagen;
const GRAVEDAD = 0.5;
const FUERZA_SALTO = -12;
const VELOCIDAD_MOVIMIENTO = 5;

// Función de precarga para la imagen
function preload() {
    // Usar una imagen de Mario Bros (reemplaza esta URL con una válida)
    fondoImagen = loadImage('https://raw.githubusercontent.com/mario-background-example/mario-bg.png');
}

// Función de inicio
function setup() {
    let canvas = createCanvas(800, 400);
    canvas.parent(document.body);
    
    // Crear formulario para personalización
    let colorInput = createInput('', 'color');
    colorInput.position(20, 20);
    colorInput.input(() => cubo.color = colorInput.value());
    
    let nombreInput = createInput('', 'text');
    nombreInput.position(20, 50);
    nombreInput.attribute('placeholder', 'Nombre del cubo');
    nombreInput.input(() => cubo.nombre = nombreInput.value());
}

// Bucle principal del juego
function draw() {
    // Dibujar fondo
    if (fondoImagen) {
        image(fondoImagen, 0, 0, width, height);
    } else {
        background('#87CEEB'); // Color de cielo si no carga la imagen
        // Dibujar suelo
        fill('#5c4033');
        rect(0, height - 40, width, 40);
    }
    
    // Aplicar gravedad
    cubo.velocidadY += GRAVEDAD;
    cubo.y += cubo.velocidadY;
    
    // Límite del suelo
    if (cubo.y > height - cubo.alto - 40) { // Ajustado para el suelo
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
    
    // Dibujar cubo
    fill(cubo.color);
    rect(cubo.x, cubo.y, cubo.ancho, cubo.alto);
    
    // Mostrar nombre
    if (cubo.nombre) {
        fill(0);
        textAlign(CENTER);
        text(cubo.nombre, cubo.x + cubo.ancho/2, cubo.y - 10);
    }
}
