// ======================
// ===   Functions    ===
// ======================
function loadVektor(n_segitiga, v_obj, f_obj){
    v_obj_buffer = Array();
    dv = f_obj[0];
    for(i = 0; i < n_segitiga; i++){
        v_obj_buffer[i * 9 + 0] = v_obj[3 * (f_obj[i * 9 + 0] - dv) + 0];
        v_obj_buffer[i * 9 + 1] = v_obj[3 * (f_obj[i * 9 + 0] - dv) + 1];
        v_obj_buffer[i * 9 + 2] = v_obj[3 * (f_obj[i * 9 + 0] - dv) + 2];
        
        v_obj_buffer[i * 9 + 3] = v_obj[3 * (f_obj[i * 9 + 3] - dv) + 0];
        v_obj_buffer[i * 9 + 4] = v_obj[3 * (f_obj[i * 9 + 3] - dv) + 1];
        v_obj_buffer[i * 9 + 5] = v_obj[3 * (f_obj[i * 9 + 3] - dv) + 2];
        
        v_obj_buffer[i * 9 + 6] = v_obj[3 * (f_obj[i * 9 + 6] - dv) + 0];
        v_obj_buffer[i * 9 + 7] = v_obj[3 * (f_obj[i * 9 + 6] - dv) + 1];
        v_obj_buffer[i * 9 + 8] = v_obj[3 * (f_obj[i * 9 + 6] - dv) + 2];
    }
    v_obj_buffer = new Float32Array(v_obj_buffer);
    return v_obj_buffer;
}

function loadVektorTexture(n_segitiga, vt_obj, f_obj){
    vt_obj_buffer = Array();
    dvt = f_obj[1];
    for(i = 0; i < n_segitiga; i++)
    {
        vt_obj_buffer[i * 6 + 0] = vt_obj[2 * (f_obj[i * 9 + 1] - dvt) + 0];
        vt_obj_buffer[i * 6 + 1] = vt_obj[2 * (f_obj[i * 9 + 1] - dvt) + 1];
        
        vt_obj_buffer[i * 6 + 2] = vt_obj[2 * (f_obj[i * 9 + 4] - dvt) + 0];
        vt_obj_buffer[i * 6 + 3] = vt_obj[2 * (f_obj[i * 9 + 4] - dvt) + 1];
        
        vt_obj_buffer[i * 6 + 4] = vt_obj[2 * (f_obj[i * 9 + 7] - dvt) + 0];
        vt_obj_buffer[i * 6 + 5] = vt_obj[2 * (f_obj[i * 9 + 7] - dvt) + 1];
    }
    vt_obj_buffer = new Float32Array(vt_obj_buffer);
    return vt_obj_buffer;
}

function loadVektorNormal(n_segitiga, n_obj, f_obj){
    n_obj_buffer = Array();
    dn = f_obj[2];
    for(i = 0; i < n_segitiga; i++)
    {
        n_obj_buffer[i * 9 + 0] = n_obj[3 * (f_obj[i * 9 + 2] - dn) + 0];
        n_obj_buffer[i * 9 + 1] = n_obj[3 * (f_obj[i * 9 + 2] - dn) + 1];
        n_obj_buffer[i * 9 + 2] = n_obj[3 * (f_obj[i * 9 + 2] - dn) + 2];
        
        n_obj_buffer[i * 9 + 3] = n_obj[3 * (f_obj[i * 9 + 5] - dn) + 0];
        n_obj_buffer[i * 9 + 4] = n_obj[3 * (f_obj[i * 9 + 5] - dn) + 1];
        n_obj_buffer[i * 9 + 5] = n_obj[3 * (f_obj[i * 9 + 5] - dn) + 2];

        n_obj_buffer[i * 9 + 6] = n_obj[3 * (f_obj[i * 9 + 8] - dn) + 0];
        n_obj_buffer[i * 9 + 7] = n_obj[3 * (f_obj[i * 9 + 8] - dn) + 1];
        n_obj_buffer[i * 9 + 8] = n_obj[3 * (f_obj[i * 9 + 8] - dn) + 2];
    }
    n_obj_buffer = new Float32Array(n_obj_buffer);
    return n_obj_buffer;
}

function createShader(gl, type, source){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vs, fs){
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program); 
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
}

function resetCanvas(){
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear Screen
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function createAttributeBuffer(vertices){
    let Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    return Buffer;
}

function loadBufferData(AttribOnShader, nPointer, Buffer){
    gl.bindBuffer(gl.ARRAY_BUFFER, Buffer); // bind buffer to active ARRAY_BUFFER
    loc = gl.getAttribLocation(program, AttribOnShader);
    gl.vertexAttribPointer(loc, nPointer, gl.FLOAT, false, 0, 0); // specify specs to send data
    gl.enableVertexAttribArray(loc); // send the actual data
}

function loadTexture(img){
    gltex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, gltex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    return gltex;
}