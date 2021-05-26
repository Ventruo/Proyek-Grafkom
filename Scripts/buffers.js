// ======================
// ===   Buffering    ===
// ======================
// Create Buffer
Object.keys(objects).forEach(function(key) {
    obj = objects[key];
    
    obj.buffer = {
        v : createAttributeBuffer(obj.data.v()),
        vn : createAttributeBuffer(obj.data.vn()),
        vt : createAttributeBuffer(obj.data.vt()),
    }
});

// Store Buffer Location at Shaders
let buffer_location = {
    texture_data : gl.getUniformLocation(program, 'texture_data'),
    matrixTransformCamera : gl.getUniformLocation(program, 'matrix_transform_camera'),
    matrixTransform : gl.getUniformLocation(program, 'matrix_transform'),
    matrixNormal : gl.getUniformLocation(program, 'matrix_normal'),
    light : {
        pos : gl.getUniformLocation(program, 'light.position'),
        color : gl.getUniformLocation(program, 'light.color'),
        ambient : gl.getUniformLocation(program, 'light.ambient'),
        diffuse : gl.getUniformLocation(program, 'light.diffuse'),
        specular : gl.getUniformLocation(program, 'light.specular')
    },
    eye : {
        pos : gl.getUniformLocation(program, 'eye_pos')
    },
    material : {
        diffuse : gl.getUniformLocation(program, 'material.diffuse'),
        specular : gl.getUniformLocation(program, 'material.specular'),
        emission : gl.getUniformLocation(program, 'material.emission'),
        shininess : gl.getUniformLocation(program, 'material.shininess'),
    },
    environment : {
        flag : gl.getUniformLocation(program, 'environment.flag'),
        texture : gl.getUniformLocation(program, 'environment.texture')
    }
}

// Load Texture
var texture = {};
objects.planet.textures = {};
objects.roket.textures = {};
objects.rubbles.textures = {};
objects.background.textures = {};
objects.lamp.textures = {};

var img0 = new Image(); 
img0.src = planet_map;
img0.onload = function() { 
    texture.color = loadTexture(img0); 
    objects.planet.textures.color = texture.color;
    objects.roket.textures.color = texture.color;
    objects.rubbles.textures.color = texture.color;
}; 

var img1 = new Image(); 
img1.src = planet_map_specular;
img1.onload = function() { 
    texture.specular = loadTexture(img1); 
    objects.planet.textures.specular = texture.specular;
    objects.roket.textures.specular = texture.specular;
    objects.rubbles.textures.specular = texture.specular;
};

var img2 = new Image(); 
img2.src = planet_map_emission;
img2.onload = function() { 
    texture.emission = loadTexture(img2); 
    objects.planet.textures.emission = texture.emission;
    objects.roket.textures.emission = texture.emission;
    objects.rubbles.textures.emission = texture.emission;
}; 

var img3 = new Image(); 
img3.src = background_space;
img3.onload = function() { 
    texture.background = loadTexture(img3); 
    objects.background.textures.color = texture.background;
}; 

var img4 = new Image(); 
img4.src = lamp_texture;
img4.onload = function() { 
    texture.lamp = loadTexture(img4); 
    objects.lamp.textures.color = texture.lamp;
};

// Send Texture Data
gl.uniform1i(buffer_location.material.diffuse, 0); //tell which index of texture to use
gl.uniform1i(buffer_location.material.specular, 1);
gl.uniform1i(buffer_location.material.emission, 2);
gl.uniform1i(buffer_location.environment.texture, 0);