# System diagram
![GSxedW.jpg](https://imgpile.com/images/GSxedW.jpg)

# FSM diagram
![GSxyv1.jpg](https://imgpile.com/images/GSxyv1.jpg)

# Circuit diagram
![GSKnUL.jpg](https://imgpile.com/images/GSKnUL.jpg)

![GSKwZ8.jpg](https://imgpile.com/images/GSKwZ8.jpg)

# Description of any external data or library that you are planning to use
I used the Adafruit_APDS9960 library in arduino to get better use of the APDS9960's color recognition and gesture recognition.

# Description of any sensor, output component or mechanism that you are planning on using or building
The APDS9960 needed to be soldered to the row of pins, and I first went to school to solder for the sensor
![GSPo32.png](https://imgpile.com/images/GSPo32.png)
![GSP25G.png](https://imgpile.com/images/GSP25G.png)


Compared to last week, I added a new button to the arduino section. Because the APDS9960 sensor will stay motionless to record the color information, you need to let it determine a value, so pressing the button when you have determined the color information will immediately record the color at that point and turn on the gesture recognition mode.
![GSKUoS.jpg](https://imgpile.com/images/GSKUoS.jpg)

I tested the gesture recognition part of the sensor, the color recognition part, and the gesture recognition immediately after the color recognition respectively, you can see my video demo for more details

The first time I combined the fireworks part of p5js with arduino, I used the same wifi connection. I first created a new background in p5js, and used the colors sensed by the arduino to change the background color. After success I converted the arduino's color recognition to the color of the fireworks, and successfully used gestures to control the direction of the fireworks!

# Plan for user testing
I'm going to get several people to control my fireworks with gestures and colors and see what each one suggests differently

# Short discussion of why your project is relevant:
Fireworks are being banned in more and more places due to air pollution, environmental and safety concerns. But fireworks do have a lot of joy that can't be replaced by other things, and it can express the joy of the festival. I don't want fireworks to disappear, on the contrary, is there a more environmentally friendly and innovative way to replace the traditional fireworks? This is something I've always wanted to explore.

# Final
In terms of visual effects, to enrich the visual elements, I have added a starry sky background, allowing the fireworks to burst against a backdrop filled with stars. This starry sky is simulated by randomly placing white dots of varying sizes across the canvas.

Code Explanation:
Class Definition - Star:

constructor(x, y, size): Creates a new star object, each with its own position (x, y) and size (size).
twinkle(): Makes the star twinkle. It randomly changes the brightness (alpha value) of the star.
display(): Displays the star. Uses the ellipse function to draw a circular shape to represent the star.
Initializing Stars in the setup Function:

In the setup function, an array named stars is created to store all the star objects.
A loop is used to create a specified number of stars, and these are added to the stars array.
The position (x, y) and size (star_size) of each star are generated randomly.
Drawing Stars in the draw Function:

In the draw function, the stars array is iterated through, and the twinkle and display methods are called for each star.
This way, each star twinkles and is displayed on the canvas.

![t4vrpW.jpg](https://imgpile.com/images/t4vrpW.jpg)

## Fireworks
Code Explanation:
Particle Class:

This class represents a generic particle with properties like position (x, y), velocity (vx, vy), color, size, and lifespan.
The draw method renders the particle as a circle with a shadow.
The move method updates the particle's position based on its velocity and gravity (g), and decreases its lifespan.
FireWorkBall Class (extends Particle):

A specialized form of Particle designed to act as the initial firework ball that explodes into many particles.
The constructor initializes it with random velocities.
The move method checks if the firework ball should explode (when its vy is non-negative).
The explode method creates many new particles to simulate the explosion of a firework, distributing them randomly around its position.
Fireworks and Particles Arrays:

particles: Stores all the individual particles created by exploding fireworks.
fireworks: Stores the initial firework balls waiting to explode.
Triggering Fireworks:

The triggerFirework function adds a new FireWorkBall to the fireworks array. The position and velocity of this firework are determined based on the direction parameter.
Rendering Logic in draw Function:

Both particles and fireworks are iteratively drawn and updated within the draw function.
Inactive particles and fireworks are filtered out from their respective arrays.

Pseudocode:
// Particle Class
class Particle {
    // Properties: position, velocity, color, size, life, etc.

    draw() {
        // Draw the particle as a circle with a shadow effect.
    }

    move() {
        // Update particle's position based on velocity and gravity.
        // Decrease life span.
    }
}

// FireWorkBall Class (extends Particle)
class FireWorkBall {
    // Properties: Inherits from Particle

    move() {
        // Update position; check if it should explode.
    }

    explode() {
        // Create many new particles around this firework's position.
    }
}

// Arrays to store particles and fireworks
let particles = [];
let fireworks = [];

// Function to trigger a firework
function triggerFirework(direction) {
    // Determine position and velocity based on direction.
    // Add new FireWorkBall to the fireworks array.
}

// Rendering logic
function draw() {
    // For each particle and firework:
    // - Call draw and move methods.
    // - Remove inactive particles and fireworks.
}

# Future
I will continue to update this project in the future, I would like to add the sound of fireworks rising and exploding, as well as use a larger screen (perhaps with Navy Yard's LED Wall) to invite more users to experience my project!