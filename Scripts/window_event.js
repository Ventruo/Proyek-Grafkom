// ======================
// ===  Window Event  ===
// ======================

window.addEventListener('keydown', this.keyBoardButton, false);
function keyBoardButton(e) {
    if (e.keyCode == 87){ //w key
        camera[14] +=0.1;

        //eyepos[2] += 1.0;
        //eyepos[0] += 0.1;
    }
    if (e.keyCode == 65){ //a key
        //eyepos[0] += 0.5;
    }
    if (e.keyCode == 83){ //s key
        //eyepos[2] -= 1.0;
        //eyepos[0] -= 0.1;
    }
    if (e.keyCode == 68){ //d key
        //eyepos[0] -= 0.5;
    }
    if(e.keyCode == 81){ //q key
        //eyepos[1] += 0.5;
    }
    if(e.keyCode==69){ // e key
        //eyepos[1] -= 0.5;
    }
}


//Event for Mouse Scroll
var lastScrollTop = 0;
var zoom = 10;
window.addEventListener("wheel", function(event){
   if (event.deltaY > 0){ //scroll down -> zoom out
        zoom += 0.5;
   } else { // 
        zoom -= 0.5;
   }
}, false);


//Event for Mouse Drag
var canvasIsPressed = false
var leftMouseClicked = true;
var rightMouseClicked = false;
var xRotation = 0
var yRotation = 0
var lastPressX
var lastPressY
layar.onmousedown = function (e) {
    
    canvasIsPressed = true
    lastPressX = e.pageX
    lastPressY = e.pageY

    if (e.which == 1){
        leftMouseClicked = true;
        rightMouseClicked = false;
    }
    else if (e.which == 3){
        leftMouseClicked = false;
        rightMouseClicked = true;
    }
}
layar.onmouseup = function () {
    canvasIsPressed = false
}
layar.onmouseout = function () {
    canvasIsPressed = false
}
layar.onmousemove = function (e) {
    if (canvasIsPressed) {
        if (leftMouseClicked){
            xRotation += (e.pageY - lastPressY) / 80
            yRotation -= (e.pageX - lastPressX) / 80
            
            xRotation = Math.min(xRotation, 1.5);
            xRotation = Math.max(xRotation, -1.5);
    
            lastPressX = e.pageX
            lastPressY = e.pageY
        }
        
        if (rightMouseClicked){
            
        }
    }
}

layar.addEventListener('contextmenu', e => {
    e.preventDefault();
});