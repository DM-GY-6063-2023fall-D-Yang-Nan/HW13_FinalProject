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
Compared to last week, I added a new button to the arduino section. Because the APDS9960 sensor will stay motionless to record the color information, you need to let it determine a value, so pressing the button when you have determined the color information will immediately record the color at that point and turn on the gesture recognition mode.
![GSKUoS.jpg](https://imgpile.com/images/GSKUoS.jpg)

I tested the gesture recognition part of the sensor, the color recognition part, and the gesture recognition immediately after the color recognition respectively, you can see my video demo for more details

The first time I combined the fireworks part of p5js with arduino, I used the same wifi connection. I first created a new background in p5js, and used the colors sensed by the arduino to change the background color. After success I converted the arduino's color recognition to the color of the fireworks, and successfully used gestures to control the direction of the fireworks!

# Plan for user testing
I'm going to get several people to control my fireworks with gestures and colors and see what each one suggests differently

# Short discussion of why your project is relevant:
Fireworks are being banned in more and more places due to air pollution, environmental and safety concerns. But fireworks do have a lot of joy that can't be replaced by other things, and it can express the joy of the festival. I don't want fireworks to disappear, on the contrary, is there a more environmentally friendly and innovative way to replace the traditional fireworks? This is something I've always wanted to explore.