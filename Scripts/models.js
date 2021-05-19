// ======================
// ===     Models     ===
// ======================
let objects = {
    planet : {},
    roket : {},
    rubbles : {},
    background : {},
    lamp : {}
}
objects.planet.data = {
    n_segitiga : f_planet.length/(9),
    v : function(){
        return loadVektor(this.n_segitiga, v_planet, f_planet);
    },
    vt : function(){
        return loadVektorTexture(this.n_segitiga, vt_planet, f_planet);
    },
    vn : function(){
        return loadVektorNormal(this.n_segitiga, vn_planet, f_planet);
    }
}
objects.roket.data = {
    n_segitiga : f_roket.length/(9),
    v : function(){
        return loadVektor(this.n_segitiga, v_roket, f_roket);
    },
    vt : function(){
        return loadVektorTexture(this.n_segitiga, vt_roket, f_roket);
    },
    vn : function(){
        return loadVektorNormal(this.n_segitiga, vn_roket, f_roket);
    }
}
objects.rubbles.data = {
    n_segitiga : f_rubble.length/(9),
    v : function(){
        return loadVektor(this.n_segitiga, v_rubble, f_rubble);
    },
    vt : function(){
        return loadVektorTexture(this.n_segitiga, vt_rubble, f_rubble);
    },
    vn : function(){
        return loadVektorNormal(this.n_segitiga, vn_planet, f_rubble);
    }
}
objects.background.data = {
    n_segitiga : f_background_sphere.length/(9),
    v : function(){
        return loadVektor(this.n_segitiga, v_background_sphere, f_background_sphere);
    },
    vt : function(){
        return loadVektorTexture(this.n_segitiga, vt_background_sphere, f_background_sphere);
    },
    vn : function(){
        return loadVektorNormal(this.n_segitiga, vn_background_sphere, f_background_sphere);
    }
}
objects.lamp.data = {
    n_segitiga : f_lamp.length/(9),
    v : function(){
        return loadVektor(this.n_segitiga, v_lamp, f_lamp);
    },
    vt : function(){
        return loadVektorTexture(this.n_segitiga, vt_lamp, f_lamp);
    },
    vn : function(){
        return loadVektorNormal(this.n_segitiga, vn_lamp, f_lamp);
    }
}