var Gpio = require('onoff').Gpio;
var sleep = require('sleep');
const yargs=require('yargs');
const pins = [26, 19,13,6];

const argv=yargs.argv;
pin=[];
for(var i=0;i<pins.length;i++){
  pin[i]=new Gpio(pins[i],'out');
  pin[i].writeSync(0);
}
Seq = [[1,0,0,1],
       [1,0,0,0],
       [1,1,0,0],
       [0,1,0,0],
       [0,1,1,0],
       [0,0,1,0],
       [0,0,1,1],
       [0,0,0,1]]

stepCount = Seq.length;
stepDirection = 1;
waitTime = 1; //milliseconds
stepCounter = 0
k=0
steps=200
if(argv.steps){
  steps=argv.steps
}
if(argv.direction){
  stepDirection=argv.direction
}
if(argv.sleep){
  waitTime=argv.sleep
}
while (k<steps){
  console.log(stepCounter);
  console.log(Seq[stepCounter]);
  for(i=0;i<4;i++){
    xpin = pin[i];
    if(Seq[stepCounter][i]!=0){
      console.log("Enable GPIO "+xpin);
      xpin.writeSync(1);
    }else{
      xpin.writeSync(0);
    }
  }
stepCounter += stepDirection;
 if (stepCounter>=stepCount){
   stepCounter = 0
 }
 if (stepCounter<0){
   stepCounter = stepCount+stepDirection
 }
 sleep.msleep(waitTime);
 k++;
}
