// ======================
// ===  Window Event  ===
// ======================


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
var camPosX = 0;
var camPosY = 0; 
var canvasIsPressed = false
var xRotation = 0
var yRotation = 0
var lastPressX
var lastPressY
layar.onmousedown = function (e) {
    canvasIsPressed = true
    lastPressX = e.pageX
    lastPressY = e.pageY
}

layar.onmouseup = function () {
    canvasIsPressed = false
}

layar.onmouseout = function () {
    canvasIsPressed = false
}

layar.onmousemove = function (e) {
    if (canvasIsPressed) {
        xRotation += (e.pageY - lastPressY) / 80
        yRotation -= (e.pageX - lastPressX) / 80
        
        xRotation = Math.min(xRotation, 1.5);
        xRotation = Math.max(xRotation, -1.5);

        lastPressX = e.pageX
        lastPressY = e.pageY
    }
}

layar.addEventListener('contextmenu', e => {
    e.preventDefault();
});