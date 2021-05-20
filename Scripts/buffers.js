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
        specular : gl.getUniformLocation(program, 'light.specular'),
        texture : gl.getUniformLocation(program, 'light.texture')
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
    background : {
        flag : gl.getUniformLocation(program, 'background.flag'),
        texture : gl.getUniformLocation(program, 'background.texture')
    }
}

// Load Texture
var texture = {};
var img0 = new Image(); img0.onload=function() { texture.color=loadTexture(img0); }; img0.src=planet_map;
var img1 = new Image(); img1.onload=function() { texture.specular=loadTexture(img1); }; img1.src=planet_map_specular;
var img2 = new Image(); img2.onload=function() { texture.emission=loadTexture(img2); }; img2.src=planet_map_emission;
var img3 = new Image(); img3.onload=function() { texture.background=loadTexture(img3); }; img3.src=background_space;
var img4 = new Image(); img4.onload=function() { texture.lamp=loadTexture(img4); }; img4.src=lamp_texture;

// Send Texture Data
gl.uniform1i(buffer_location.material.diffuse, 0); //tell which index of texture to use
gl.uniform1i(buffer_location.material.specular, 1);
gl.uniform1i(buffer_location.material.emission, 2);
gl.uniform1i(buffer_location.background.texture, 3);
gl.uniform1i(buffer_location.light.texture, 4);