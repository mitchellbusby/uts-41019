#include <ArduinoJson.h>
#include "Ultrasonic.h"

StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

// Port for the sliding potentiometer
int gspPort = A1;
// Port for button pin
int buttonPin = 7;

int ultrasonicPin = A0;

Ultrasonic ultrasonic(ultrasonicPin);

void setup(void) {
    while (!Serial);
    Serial.begin(9600);

    // Initialise pushbutton pin as an input
    pinMode(buttonPin, INPUT);
    
    root["sensor"] = "gps";
    root["time"] = 133333;
}
 
void loop(void) {
  root["slidingPotentiometer"] = readSlidingPotentiometer();
  root["sortingButton"] = readButtonPress();
  
  root["ultrasonicRanger"] = readUltrasonicCentimeters();
  
  //Print JSON
  root.printTo(Serial);
  Serial.println("");
  // Send data updates every micro of a second
  delay(100);
}

int readSlidingPotentiometer() {
    // This is commented out till we have a sliding potentiometer lol
    int adcIn = 0;
    adcIn = analogRead(gspPort);
    return adcIn;
}

long readUltrasonicCentimeters() {
  //return 0;
  return ultrasonic.MeasureInCentimeters();
}

long readEncoder() {
  return 0;
}

long readButtonPress() {
  int buttonState = digitalRead(buttonPin); 
  if (buttonState == HIGH) {
    return 1;
  }
  return 0;
}

