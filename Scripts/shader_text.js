// vertex shader
let vs_text = `#version 300 es
    precision mediump float;

    in vec4 obj_vertices;
    in vec4 obj_normal;
    in vec2 texture_vertices;
    
    uniform mat4 matrix_transform; // matrix transformaisi
    uniform mat4 matrix_normal; // matrix benda rotasinya saja utk normal
    uniform mat4 matrix_transform_camera; // matrix transformasi & camera

    out vec4 i_vertex;
    out vec4 i_normal;
    out vec2 i_texture_vertices;
    void main(){
        gl_Position = matrix_transform_camera * obj_vertices;	

        i_vertex = matrix_transform * obj_vertices;
        i_normal = matrix_normal * obj_normal;

        i_texture_vertices = texture_vertices;
    }`;
    
// fragment shader
let fs_text = `#version 300 es
    precision mediump float;

    struct Material {
        sampler2D diffuse;
        sampler2D specular;
        sampler2D emission;
        float shininess;
    };

    struct Light {
        vec3 position;
        vec3 color;

        vec3 ambient;
        vec3 diffuse;
        vec3 specular;
        sampler2D texture;
    };

    struct Background {
        sampler2D texture;
        float flag;
    };

    in vec4 i_vertex;
    in vec4 i_normal;
    in vec2 i_texture_vertices;

    uniform vec3 eye_pos;
    uniform Material material;
    uniform Light light;
    uniform Background background;

    out vec4 warna;
    void main(){
        // ambient
        vec3 ambient = light.ambient * light.color * texture(material.diffuse, i_texture_vertices).rgb;

        // diffuse
        vec3 normal_dir = normalize(i_normal.xyz);
        vec3 light_dir = normalize(light.position - i_vertex.xyz);
        float dif = clamp(dot(normal_dir, light_dir), 0.0, 1.0);

        vec3 diffuse = light.diffuse * light.color * dif * texture(material.diffuse, i_texture_vertices).rgb;

        
        // specular
        vec3 view_dir = normalize(eye_pos - i_vertex.xyz);
        vec3 reflect_dir = reflect(-light_dir, normal_dir);
        float spec = pow(max(dot(view_dir, reflect_dir), 0.0), material.shininess);

        vec3 specular = light.specular * light.color * spec * texture(material.specular, i_texture_vertices).rgb;
        
        // emission
        vec3 emission = texture(material.emission, i_texture_vertices).rgb;

        if (background.flag == 1.0)
            warna = vec4(texture(light.texture, i_texture_vertices).rgb, 1.0);
        else if (background.flag == 0.5)
            warna = vec4(texture(background.texture, i_texture_vertices).rgb, 1.0);
        else
            warna = vec4((ambient + diffuse + specular + emission), 1.0);
    }`;