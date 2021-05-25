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


//Event for scrolling
var lastScrollTop = 0;
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   var st = window.pageYOffset || document.documentElement.scrollTop; 
   if (st > lastScrollTop){
      eyepos[2]+=1.5;
   } else {
    eyepos[2]-=1.5;
   }
   lastScrollTop = st // For Mobile or negative scrolling
}, false);



// var layarIsPressed = false;
// var lastPressX, lastPressY;

// window.onmousedown=function(e){
//     //alert(e.pageX+" , "+e.pageY);
//     layarIsPressed = true;
//     lastPressX = e.pageX;
//     lastPressY =e.pageY;
// }

// window.onmouseup = function(){
//     layarIsPressed = false;
// }

// window.onmouseout = function(){
//     layarIsPressed = false;
// }

// var angle_x = 0;
// window.onmousemove = function(e){
//     if (layarIsPressed) {
//         // 0 - 1000
//         let dx = e.pageX - lastPressX; 
//         let dy = e.pageY - lastPressY;
//         let d_angle_x = Math.PI*(dy/80)/180;
//         angle_x += d_angle_x;
//         console.log(angle_x);

//         eyepos[1] = Math.sin(angle_x) * 7;
//         eyepos[2] = Math.cos(angle_x) * 7;

//         // if(e.pageX >= lastPressX){
//         //     eyepos[0] -= (e.pageX - lastPressX)/100;
//         //     //eyepos[0] -= Math.cos(e.pageX - lastPressX) - Math.sin(lastPressY - e.pageY);
//         // }
//         // else{
//         //     eyepos[0] += (lastPressX - e.pageX)/100;
//         // }

//         // if(e.pageY>= lastPressY){
//         //     eyepos[1] += (lastPressY - e.pageY)/100;
//         // }
//         // else{
//         //     eyepos[1] -= (e.pageY - lastPressY)/100;
//         // }
        
//         //xRotation = Math.min(xRotation, Math.PI / 2.5);
//         //xRotation = Math.max(xRotation, 0.1);
    
//         lastPressX = e.pageX;
//         lastPressY = e.pageY;
//       }
// }

var canvasIsPressed = false
var xRotation = Math.PI / 20
var yRotation = 0
var lastPressX
var lastPressY
layar.onmousedown = function (e) {
    //alert(e.pageX+", "+e.pageY);
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

        xRotation += (e.pageY - lastPressY) / 20
        yRotation += (e.pageX - lastPressX) / 20

        //xRotation = Math.min(xRotation, Math.PI / 2.5)
        //xRotation = Math.max(xRotation, 0.1)

        lastPressX = e.pageX
        lastPressY = e.pageY
    }
}