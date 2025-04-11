# OpenGL

### Installation
```bash
sudo apt-get install libglfw3-dev
```
Glad: https://glad.dav1d.de/#language=c&specification=gl&api=gl%3D4.6&api=gles1%3Dnone&api=gles2%3Dnone&api=glsc2%3Dnone&profile=compatibility&loader=on

Take the src/glad.c and include/glad/glad.h and copy them into your project.
Create a CMakeLists.txt file and add the folowing Code:

```cmake
cmake_minimum_required(VERSION 3.27.9) 
project(opengl_test VERSION 0.1.0) 
add_executable(opengl_test main.cpp glad/glad.c) 
target_include_directories(opengl_test PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}) 
target_link_libraries(opengl_test glfw)  
```

### Create a Window
```cpp
            #include <iostream> 
#include <glad/glad.h> 
#include <GLFW/glfw3.h> 

int main() { 
    if (!glfwInit()) { // ERROR Handeling
        std::cerr << "Failed to initialize GLFW\n"; 
        return -1; 
    } 

    // Create a GLFW window 
    GLFWwindow* window = glfwCreateWindow(800, 600, "OpenGL Window", nullptr, nullptr); 
    if (!window) { // ERROR Handeling
        std::cerr << "Failed to create GLFW window\n"; 
        glfwTerminate(); 
    }
    glfwMakeContextCurrent(window); 

    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) { 
        std::cerr << "Failed to initialize GLAD\n"; 
    }

    glViewport(0, 0, 800, 600); 

    // Render loop 
    while (!glfwWindowShouldClose(window)) { 
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f); 
        glClear(GL_COLOR_BUFFER_BIT); 



        glfwPollEvents(); 
        glfwSwapBuffers(window); 
    }

    // Clean up and exit 
    glfwTerminate(); 
    return 0; 
}
```

### Explenation
- `glfwInit()` initializes the GLFW library.
- `glfwCreateWindow()` creates a window with the specified width, height, and title.
- `glfwMakeContextCurrent()` sets the current context to the specified window.
- `gladLoadGLLoader()` initializes the GLAD library to load OpenGL function pointers.
- `glViewport()` sets the viewport size to match the window size.
- The render loop clears the screen, polls for events, and swaps the buffers to display the rendered image.
- `glfwWindowShouldClose()` checks if the window should close.
- `glfwPollEvents()` processes events like keyboard input and mouse movement.
- `glfwSwapBuffers()` swaps the front and back buffers to display the rendered image.
- `glfwTerminate()` cleans up and terminates the GLFW library.
- The program returns 0 to indicate successful execution.

### Shader
```cpp
// Vertex Shader source code 
const char* vertexShaderSource = "#version 330 core\n" 
"layout (location = 0) in vec3 aPos;\n" 
"void main()\n" 
"{\n" 
" gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n" 
"}\0"; 
//Fragment Shader source code 
const char* fragmentShaderSource = "#version 330 core\n" 
"out vec4 FragColor;\n" 
" FragColor = vec4(0.8f, 0.3f, 0.02f, 1.0f);\n" 
"}\n\0"; 
 
// Already known
GLFWwindow* window = glfwCreateWindow(800, 800, "OpenGL Window", nullptr, nullptr); 
glfwMakeContextCurrent(window); 
glViewport(0, 0, 800, 800); 

GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER); 
glShaderSource(vertexShader, 1, &vertexShaderSource, NULL); 
glCompileShader(vertexShader); 
GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER); 
glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL); 
glCompileShader(fragmentShader); 
GLuint shaderProgram = glCreateProgram(); 
glAttachShader(shaderProgram, vertexShader); 
glAttachShader(shaderProgram, fragmentShader); 
glLinkProgram(shaderProgram); 
glDeleteShader(vertexShader); 
glDeleteShader(fragmentShader); 
```

### Draw a Triangle
```cpp
float vertices[] = {
    -0.5f, -0.5f, 0.0f,
    0.5f, -0.5f, 0.0f,
    0.0f,  0.5f, 0.0f
};  

// Create reference containers for the Vartex Array Object and the Vertex Buffer Object
GLuint VAO, VBO;
glGenVertexArrays(1, &VAO);
glGenBuffers(1, &VBO);

glBindVertexArray(VAO);
glBindBuffer(GL_ARRAY_BUFFER, VBO);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);

// Bind both the VBO and VAO to 0 so that we don't accidentally modify the VAO and VBO we created
glBindBuffer(GL_ARRAY_BUFFER, 0);
glBindVertexArray(0);


// Main while loop
while (!glfwWindowShouldClose(window))
{
    glClearColor(0.07f, 0.13f, 0.17f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    glUseProgram(shaderProgram);


    // Bind the VAO so OpenGL knows to use it
    glBindVertexArray(VAO);
    // Draw the triangle using the GL_TRIANGLES primitive
    glDrawArrays(GL_TRIANGLES, 0, 3);


    glfwSwapBuffers(window);
    glfwPollEvents();
}
```

### Shader
```cpp
            # default.frag
#version 330 core

out vec4 FragColor;

in vec3 color;
in vec2 texCoord;

uniform sampler2D tex0;

void main()
{
    FragColor = texture(tex0, texCoord);
}
```

```cpp
            # default.vert
#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aColor;
layout (location = 2) in vec2 aTex;

out vec3 color;
out vec2 texCoord;

uniform mat4 camMatrix;

void main()
{
   gl_Position = camMatrix * vec4(aPos, 1.0);
   color = aColor;
   texCoord = aTex;
}
```