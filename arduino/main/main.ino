#include <ArduinoJson.h>

StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

// Port for the sliding potentiometer
int gspPort = A0;

void setup(void) {
    while (!Serial);
    Serial.begin(9600);
    
    root["sensor"] = "gps";
    root["time"] = 133333;
}
 
void loop(void) {
  root["slidingPotentiometer"] = readSlidingPotentiometer();
  //Print JSON
  root.prettyPrintTo(Serial);
  Serial.println("");
  // Send data updates every quarter of a second
  delay(250);
}

int readSlidingPotentiometer() {
    int adcIn = 0;
    adcIn = analogRead(gspPort);
    return adcIn;
}

long readUltrasonicCentimeters() {
  
}


