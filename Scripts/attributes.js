// Transformation Matrix
const {mat4} = glMatrix;
let matrix = {
    proyeksi : mat4.create(),
    lookAt : mat4.create(),
    camera : mat4.create(),
    transform : mat4.create(),
    normal : mat4.create(),
    transformCamera : mat4.create()
}

eyepos = [0,0,7];

let center = [0, 0, 0];

let camera_pos = {
    x : 0,
    y : 0,
    z : 0
}


// ==========================
// = INITIAL TRANFORMATIONS =
// ==========================
// Planet
objects.planet.transformation = mat4.create();
objects.planet.rotation = {
    x : -90,
    y : 0,
    z : 0
};

// Roket
objects.roket.transformation = mat4.create();
objects.roket.rotation = {
    x : -90,
    y : 0,
    z : 0
};
objects.roket.elevation = {
    elevating : true,
    slowing : true,
    speed : 0.005,
    min : 0.0,
    mid : 0.3,
    max : 1.5,
    x : 0,
    y : 0,
    z : 0
}

// Rubbles
objects.rubbles.transformation = mat4.create();
objects.rubbles.revolution = {
    x : -90,
    y : 0,
    z : 90
}

// Background
objects.background.transformation = mat4.create();

// Lamp
objects.lamp.transformation = mat4.create();
objects.lamp.attributes = {
    pos : [0, 0, 1.5],
    color : [1.0, 1.0, 1.0],
    ambient : [0.2, 0.2, 0.2],
    diffuse : [0.5, 0.5, 0.5],
    specular : [1.0, 1.0, 1.0],
    up : false
}