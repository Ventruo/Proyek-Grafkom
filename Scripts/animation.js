// ======================
// ===    Animate     ===
// ======================
planet = objects.planet;
roket = objects.roket;
rubbles = objects.rubbles;
background = objects.background;
lamp = objects.lamp;

function animate()
{
    // Use Z-Buffer
    gl.enable(gl.DEPTH_TEST);

    // Clear Screen
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    let aspectRatio = window.innerWidth/window.innerHeight;

    let camera = mat4.create();
    mat4.translate(camera, camera, [0,0,10]);
    let xRotMatrix = mat4.create();
    let yRotMatrix = mat4.create();
    mat4.rotateX(xRotMatrix, xRotMatrix, -xRotation);
    mat4.rotateX(yRotMatrix, yRotMatrix, yRotation);
    mat4.multiply(camera, xRotMatrix, camera);
    mat4.multiply(camera, yRotMatrix, camera);

    mat4.lookAt(matrix.lookAt, [camera[12], camera[13], camera[14]], center, [0,1,0]);
    // Projection * Lookat = Camera
    //mat4.lookAt(matrix.lookAt, eyepos, center, [0,1,0]);
    mat4.perspective(matrix.proyeksi, Math.PI*30/180, aspectRatio, 1, 3000);
    mat4.identity(matrix.camera);
    mat4.multiply(matrix.camera, matrix.lookAt, matrix.camera);
    mat4.multiply(matrix.camera, matrix.proyeksi, matrix.camera);
    

    // Send Eye Pos
    gl.uniform3fv(buffer_location.eye.pos, eyepos);

    // Send Lamp Configs
    gl.uniform3fv(buffer_location.light.pos, lamp.attributes.pos);
    gl.uniform3fv(buffer_location.light.color, lamp.attributes.color);
    gl.uniform3fv(buffer_location.light.ambient, lamp.attributes.ambient);
    gl.uniform3fv(buffer_location.light.diffuse, lamp.attributes.diffuse);
    gl.uniform3fv(buffer_location.light.specular, lamp.attributes.specular);
    mat4.identity(lamp.transformation);
    mat4.translate(lamp.transformation, lamp.transformation, [lamp.attributes.pos[0], lamp.attributes.pos[1], lamp.attributes.pos[2]]);
    mat4.scale(lamp.transformation, lamp.transformation, [0.1, 0.1, 0.1]);

    // Material Shininess
    gl.uniform1f(buffer_location.material.shininess, 8.0);

    
    // ====================
    // == Transformation ==
    // ====================
    // Planet
    mat4.identity(planet.transformation);
    mat4.rotateX(planet.transformation, planet.transformation, Math.PI*planet.rotation.x/180.0);
    mat4.rotateY(planet.transformation, planet.transformation, Math.PI*planet.rotation.y/180.0);
    mat4.rotateZ(planet.transformation, planet.transformation, Math.PI*planet.rotation.z/180.0);
    
    // Rocket
    mat4.identity(roket.transformation);
    mat4.rotateX(roket.transformation, roket.transformation, Math.PI*roket.rotation.x/180.0);
    mat4.rotateY(roket.transformation, roket.transformation, Math.PI*roket.rotation.y/180.0);
    mat4.rotateZ(roket.transformation, roket.transformation, Math.PI*roket.rotation.z/180.0);
    mat4.translate(roket.transformation, roket.transformation, [roket.elevation.x, roket.elevation.y, roket.elevation.z])
    
    // Rubbles
    mat4.identity(rubbles.transformation);
    mat4.rotateX(rubbles.transformation, rubbles.transformation, Math.PI*rubbles.revolution.x/180.0);
    mat4.rotateY(rubbles.transformation, rubbles.transformation, Math.PI*rubbles.revolution.y/180.0);
    mat4.rotateZ(rubbles.transformation, rubbles.transformation, Math.PI*rubbles.revolution.z/180.0);

    // Background
    mat4.identity(background.transformation);
    mat4.scale(background.transformation, background.transformation, [2, 2, 2]);
    

    // ====================
    // ==   Rendering    ==
    // ====================
    Object.keys(objects).forEach(function(key) {
        obj = objects[key];

        // Send the matrix before Lighting
        gl.uniformMatrix4fv(buffer_location.matrixTransform, false, obj.transformation);

        // Send Normal Matrix
        // invert matriks benda utk menetralisir efek transasli+scaling pd normal
        // matriks invers ini, matnorm, ikut dikirim ke shader
        mat4.invert(matrix.normal, obj.transformation);
        mat4.transpose(matrix.normal, matrix.normal);
        gl.uniformMatrix4fv(buffer_location.matrixNormal, false, matrix.normal);		


        // Calculate transform matrix with camera, then Send
        mat4.mul(matrix.transformCamera, matrix.camera, obj.transformation);
        gl.uniformMatrix4fv(buffer_location.matrixTransformCamera, false, matrix.transformCamera);
        

        // Load Buffer Data ke Shader
        loadBufferData('obj_vertices', 3, obj.buffer.v);
        loadBufferData('obj_normal', 3, obj.buffer.vn);
        loadBufferData('texture_vertices', 2, obj.buffer.vt);

        // Check Background or not
        if (key == "lamp")
            gl.uniform1f(buffer_location.background.flag, 1.0);
        else if (key == "background")
            gl.uniform1f(buffer_location.background.flag, 0.5);
        else
            gl.uniform1f(buffer_location.background.flag, 0.0);
        

        // Set Active Texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture.color);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture.specular);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, texture.emission);
        gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, texture.background);
        gl.activeTexture(gl.TEXTURE4);
        gl.bindTexture(gl.TEXTURE_2D, texture.lamp);

        // Draw Geometry
        gl.drawArrays(gl.TRIANGLES, 0, 3 * obj.data.n_segitiga);
    });

    

    // ====================
    // == Animation Code ==
    // ====================
    // Lamp Up Down
    if(lamp.attributes.up) lamp.attributes.pos[1] += 0.05;
    else lamp.attributes.pos[1] -= 0.05;

    if (lamp.attributes.pos[1] >= 4.0) lamp.attributes.up = false; 
    else if(lamp.attributes.pos[1] <= -4.0) lamp.attributes.up = true;


    // Rubbles Revolution
    rubbles.revolution.z += 0.5;
    rubbles.revolution.z %= 360;
    

    // Rocket Elevation
    d = roket.elevation.speed
    if (roket.elevation.slowing) d /= 2;

    if (roket.elevation.elevating){
        roket.elevation.x += d;
        roket.elevation.y = 0;
        roket.elevation.z += d;
    }else{
        roket.elevation.x -= d;
        roket.elevation.y = 0;
        roket.elevation.z -= d;
    }

    if (roket.elevation.x >= roket.elevation.max)
        roket.elevation.elevating = false;
    if (roket.elevation.x <= roket.elevation.min)
        roket.elevation.elevating = true;

    if (roket.elevation.x <= roket.elevation.mid)
        roket.elevation.slowing = true;
    else
        roket.elevation.slowing = false;
    
    
    requestAnimationFrame(animate, layar);
}
animate();

// Print the Structure of Objects
// obj_structure = JSON.stringify(objects);
// console.log(obj_structure);