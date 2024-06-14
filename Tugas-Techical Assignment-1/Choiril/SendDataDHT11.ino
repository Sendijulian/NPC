#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "SUBHANALLAH";
const char* password = "1LAILAHAILLALLAH";
const char* serverUrl = "http://192.168.1.114:5000/receive_data"; 

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to WiFi");

  sendPostRequest();
}

void sendPostRequest() {
  HTTPClient http;

  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  int sensorValue = analogRead(A0); // Baca nilai sensor MQ
  String postData = "{\"sensor_value\": " + String(sensorValue) + "}";
  
  int httpResponseCode = http.POST(postData);

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println(response);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void loop() {
  delay(5000); // Kirim data setiap 5 detik
  sendPostRequest();
}
