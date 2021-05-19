/** @type {HTMLCanvasElement} */

// ======================
// === Initialization ===
// ======================
// Get WebGL Context
let layar = document.getElementById("layar");
let gl = layar.getContext('webgl2'); 

// Create Vertex & Fragment Shader
var vs = createShader(gl, gl.VERTEX_SHADER, vs_text);
var fs = createShader(gl, gl.FRAGMENT_SHADER, fs_text);

// Create Program
var program = createProgram(gl, vs, fs);

// Clear Canvas
resetCanvas();