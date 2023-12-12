#include <WebServer.h>
#include <WiFi.h>
#include "esp_wpa2.h"
#include <ArduinoJson.h>
#include "Adafruit_APDS9960.h"

Adafruit_APDS9960 apds;

const char* SSID = "Verizon_R3S4K9";
const char* SSID_PASSWORD = "churn6-boa-hale";
const int buttonPinD3 = 3;
const int debounceDelay = 50; // 按钮去抖动延时（毫秒）

uint16_t storedRed = 0, storedGreen = 0, storedBlue = 0, storedClear = 0;
bool gestureMode = false;
unsigned long lastDebounceTimeD3 = 0; // 记录D3最后一次反跳的时间

WebServer server(80);

void handleData() {
  StaticJsonDocument<200> resJson;
  JsonObject data = resJson.createNestedObject("data");
  data["red"] = storedRed;
  data["green"] = storedGreen;
  data["blue"] = storedBlue;

  // 添加手势数据
  if (gestureMode && apds.gestureValid()) {
    uint8_t gesture = apds.readGesture();
    data["gesture"] = gesture; // 将手势作为数据发送
  }

  String resTxt = "";
  serializeJson(resJson, resTxt);
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", resTxt);
}


void setup() {
  Serial.begin(115200);
  while (!Serial) {}

  WiFi.disconnect(true);
  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, SSID_PASSWORD);

  int tryConnectCount = 0;
  while (WiFi.status() != WL_CONNECTED && tryConnectCount < 60) {
    delay(500);
    Serial.print(".");
    tryConnectCount++;
  }
  Serial.println("");

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected to WiFi. IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("WiFi connection failed.");
  }

  server.on("/data", handleData);
  server.begin();

  pinMode(buttonPinD3, INPUT_PULLUP);

  if (!apds.begin()) {
    Serial.println("Failed to initialize APDS9960.");
  } else {
    Serial.println("APDS9960 initialized.");
  }

  apds.enableColor(true);
  apds.enableProximity(true);
}

void loop() {
  int readingD3 = digitalRead(buttonPinD3);

  // Handling button press
  if (readingD3 == LOW && (millis() - lastDebounceTimeD3) > debounceDelay) {
    lastDebounceTimeD3 = millis();
    apds.getColorData(&storedRed, &storedGreen, &storedBlue, &storedClear);
    
    // 找出RGB值中的最大值，并增加100，同时确保不超过255
    uint16_t maxColor = max(max(storedRed, storedGreen), storedBlue);
    if (maxColor == storedRed && storedRed <= 155) {
      storedRed += 100;
    } else if (maxColor == storedGreen && storedGreen <= 155) {
      storedGreen += 100;
    } else if (maxColor == storedBlue && storedBlue <= 155) {
      storedBlue += 100;
    }

    Serial.print("Adjusted Color - R: "); Serial.print(storedRed);
    Serial.print(" G: "); Serial.print(storedGreen);
    Serial.print(" B: "); Serial.println(storedBlue);
    gestureMode = true;
    apds.enableGesture(true);
    Serial.println("Switched to Gesture Mode");
  }

  // Gesture detection
  if (gestureMode && apds.gestureValid()) {
    uint8_t gesture = apds.readGesture();
    switch (gesture) {
      case APDS9960_UP:
        Serial.println("Up");
        break;
      case APDS9960_DOWN:
        Serial.println("Down");
        break;
      case APDS9960_LEFT:
        Serial.println("Left");
        break;
      case APDS9960_RIGHT:
        Serial.println("Right");
        break;
    }
  }

  server.handleClient();
}