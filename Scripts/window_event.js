// ======================
// ===  Window Event  ===
// ======================

window.addEventListener('keydown', this.keyBoardButton, false);
function keyBoardButton(e) {
    if (e.keyCode == 87){ //w key
        camera_pos.z += 0.1;
        camera_pos.x += 0.1;
    }
    if (e.keyCode == 65){ //a key
        camera_pos.x += 0.5;
    }
    if (e.keyCode == 83){ //s key
        camera_pos.z -= 0.1;
        camera_pos.x -= 0.1;
    }
    if (e.keyCode == 68){ //d key
        camera_pos.x -= 0.5;
    }
    if(e.keyCode == 81){ //q key
        camera_pos.y += 0.5;
    }
    if(e.keyCode==69){ // e key
        camera_pos.y -= 0.5;
    }
}