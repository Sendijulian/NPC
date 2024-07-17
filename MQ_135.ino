//Include the library
#include <MQUnifiedsensor.h>

//Definitions
#define placa "ESP-32"
#define Voltage_Resolution 3.3 
#define pin 4 //Analog input 0 of your arduino
#define type "MQ-2" //MQ135
#define ADC_Bit_Resolution 12 // For arduino UNO/MEGA/NANO
#define RatioMQ135CleanAir 3.6//RS / R0 = 3.6 ppm  
//#define calibration_button 13 //Pin to calibrate your sensor

//Declare Sensor
MQUnifiedsensor MQ135(placa, Voltage_Resolution, ADC_Bit_Resolution, pin, type);

char jenisgas[6][10] = {"CO","Alcohol","CO2","Tolueno","NH4","Aceton"};
float gasA[6] = {605.18, 77.255, 110.47, 44.947, 102.2, 34.668};
float gasB[6] = {-3.937, -3.18, -2.862, -3.445, -2.473};
int itemcheck = 2;
 
void setup() {
  //Init the serial port communication
  Serial.begin(9600); //Init serial port

  //Set math model to calculate the PPM concentration and the value of constants
  MQ135.setRegressionMethod(1); //_PPM =  a*ratio^b
  MQ135.setA(gasA[itemcheck]); MQ135.setB(gasB[itemcheck]); // Configurate the ecuation values to get CO2 concentration
  //MQ135.setA(102.2); MQ135.setB(-2.473); // Configurate the ecuation values to get NH4 concentration

  /*
    Exponential regression:
  GAS      | a      | b
  CO       | 605.18 | -3.937  
  Alcohol  | 77.255 | -3.18 
  CO2      | 110.47 | -2.862
  Tolueno  | 44.947 | -3.445
  NH4      | 102.2  | -2.473
  Acetona  | 34.668 | -3.369
  */
  
  /**********  MQ Init ***************/ 
  //Remarks: Configure the pin of arduino as input.
  // 
  MQ135.init(); 
  /* 
    //If the RL value is different from 10K please assign your RL value with the following method:
    MQ135.setRL(10);
  */
  /**********  MQ CAlibration ***************/ 
  Serial.print("Calibrating please wait.");
  float calcR0 = 0;
  for(int i = 1; i<=10; i ++)
  {
    MQ135.update(); // Update data, the arduino will be read the voltage on the analog pin
    calcR0 += MQ135.calibrate(RatioMQ135CleanAir);
    Serial.print(".");
  }
  MQ135.setR0(calcR0/10);
  Serial.println("  done!.");
  if(isinf(calcR0)) {Serial.println("Warning: Conection issue founded, R0 is infite (Open circuit detected) please check your wiring and supply"); while(1);}
  if(calcR0 == 0){Serial.println("Warning: Conection issue founded, R0 is zero (Analog pin with short circuit to ground) please check your wiring and supply"); while(1);}
  /**********  MQ CAlibration ***************/ 
  
  MQ135.serialDebug(false);
}

void loop() {
  MQ135.update(); // Update data, the arduino will be read the voltage on the analog pin
  float hasil = MQ135.readSensor(); // Sensor will read PPM concentration using the model and a and b values setted before or in the setup
  Serial.print(jenisgas[itemcheck]);Serial.print(" : ");Serial.print(hasil);Serial.println(" PPM");
  //MQ135.serialDebug(); // Will print the table on the serial port
  delay(500); //Sampling frequency
}