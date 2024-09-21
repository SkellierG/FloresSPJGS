const $ = selector => document.querySelector(selector);

// Canvas y contexto
const $canvas = $("#main-canvas");
const $ctx = $canvas.getContext('2d');

// Configurar tamaño del canvas
$canvas.width = CANVAS_WIDTH = window.innerWidth;
$canvas.height = CANVAS_HEIGHT = window.innerHeight;

// Constantes
const MAX_ITERATIONS = 3;
const MAX_ANGLE = 10;
const DEFAULT_NO_VALUE = 250;
const COLOR = 40; // Color fijo para el trazo

// Variables de estado
let numberOfPoints = DEFAULT_NO_VALUE; // Controla la cantidad de puntos
let angle = 0; // Ángulo de rotación
let iterations = 0; // Cuenta las iteraciones
let color_variation = 0

function animate() {
  angle += 0.01; // Incrementar el ángulo
  color_variation = (0 - (Math.random()*100)/10);

  // Comenzar a dibujar
  $ctx.beginPath();

  // Cálculo de coordenadas X e Y
  const x = CANVAS_WIDTH / 2 + CANVAS_WIDTH / 2 * Math.cos(numberOfPoints * angle) * Math.cos(angle);
  const y = CANVAS_HEIGHT / 2 + CANVAS_WIDTH / 2 * Math.cos(numberOfPoints * angle) * Math.sin(angle);

  // Dibujar un punto en las coordenadas calculadas
  $ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
  $ctx.strokeStyle = `hsl(${COLOR + color_variation}, 100%, 50%)`;
  $ctx.stroke();

  // Reiniciar la animación después de MAX_ANGLE y limitar las iteraciones
  if (angle > MAX_ANGLE && iterations <= MAX_ITERATIONS) {
    angle = 0.01; // Reiniciar el ángulo
    numberOfPoints = Math.floor(Math.random() * 9) + 2; // Nuevo valor aleatorio para numberOfPoints
    $ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Limpiar el canvas
    iterations++; // Incrementar las iteraciones
  }

  // Reiniciar completamente después de completar las iteraciones
  if (iterations > MAX_ITERATIONS) {
    angle = 0.01; // Reiniciar el ángulo
    numberOfPoints = DEFAULT_NO_VALUE; // Restaurar valor por defecto
    $ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Limpiar el canvas
    iterations = 0; // Reiniciar las iteraciones
  }

  // Dibujar una línea desde el centro si el valor de numberOfPoints es mayor o igual a 80
  if (numberOfPoints >= 80) {
    $ctx.moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    $ctx.lineTo(x, y);
    $ctx.stroke();
  }

  // Continuar la animación en el siguiente frame
  requestAnimationFrame(animate);
}

// Iniciar la animación
animate();
