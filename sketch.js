//Choose an option from the dropdown and it will play
//Make sure to stop what you're playing first or else it will overlap
//Press the Lambda sign to pause your music if it's playing
//Or press it again to start your music
//The slider is for volume
//You will have to let go of the slider for the change to go into effect

let button;
let sliderVolume, sliderPan, sliderRate;
let dropdown;
let combined
let music;
let Songs;
let fft;
let duration;
let current;
let playButton, stopButton, restartButton; 

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  colorMode(HSB);
  
  fft= new p5.FFT(0.8,256);
  
  button=createButton('λ');
  button.style('font-size', '30px');
  button.style('background-color', '#fb7e14');
  button.position(width/2-button.width+5, height/2-button.height);
  button.mousePressed(PressedTheButton);
  
  
  sliderVolume=createSlider(0, 1, 1, 0.01);
  sliderVolume.position(width/2-sliderVolume.width, height/2+sliderVolume.height*10);
  sliderVolume.style('width','300px');
  sliderVolume.changed(()=> {
    music.setVolume(sliderVolume.value());
  });
  
  sliderRate = createSlider(-3,3,1,0.5);
  sliderPan = createSlider(-1,1,0,0.1 );
  
  dropdown=createSelect();
   dropdown.option('Forget About Freeman');
  dropdown.option("We've Got Hostiles");
  dropdown.option('Surface Tension 1');
  dropdown.option('Hazardous Environments');
  dropdown.option('The Only Thing They Fear Is You');
  dropdown.option('Bfg Division');
  dropdown.option('Who Can It Be Now');
  dropdown.option('I Am Alone');
  dropdown.option('Phobos Anomaly');
  dropdown.option('I Sawed The Demons');
  dropdown.option('The Imps Song');
  dropdown.option('Hiding The Secrets');
  dropdown.changed(songChanged)
  
  Songs=[dropdown.selected(), 'mp3']
  var combined=join(Songs,'.');
  music=loadSound(combined);
  //noStroke();
  
  stopButton = createButton('Stop');
  stopButton.mousePressed(stopMusic); 
  stopButton.style('font-size', '20px');
  stopButton.style('background-color', '#fb7e14');
  stopButton.position(10,50);
  
  restartButton = createButton('Restart')
  restartButton.mousePressed(restartMusic);
  restartButton.style('font-size', '20px');
  restartButton.style('background-color', '#fb7e14');
  restartButton.position(10,100);
  
  w=width/64;
}

function songChanged(){
  Songs=[dropdown.selected(), 'mp3']
  var combined=join(Songs,'.');
  music=loadSound(combined, playSong);
  
}

function playSong() {
  music.stop();
  music.play();

}

function PressedTheButton(){
  //if (music.isPlaying()){
  //music.stop();
  //}
  if (music.isPlaying()){
  music.pause()
  }
  else{
  music.play();
  }
}

function draw() {
  background('#292929');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text('Volume',width/2, 500);
  strokeWeight(3);
  var spectrum=fft.analyze();
  duration = music.duration();
  current = music.currentTime();
  console.log(spectrum);
  
  music.pan(sliderPan.value());
  sliderPan.position(96,400);
  sliderPan.style('width','300px');
  text('Left and Right Balance',width/2, 450);
  
  music.rate(sliderRate.value());
  sliderRate.position(250,250);
  sliderRate.style('width','480px');
  sliderRate.style('transform', 'rotate(270deg)');
  text('S',470, 50);
  text('p',470, 70);
  text('e',470, 90);
  text('e',470, 110);
  text('d',470, 130);
  
  translate (width/2, height/2);
  beginShape();
  for (var i = 0; i<spectrum.length; i++){
    stroke(i*1.5,255,255)
    var angle = map(i,0,spectrum.length,0,360)
    var amp = spectrum[i];
    var r = map(amp,0,256,100,200);
    var x = r*cos(angle);
    var y = r*sin(angle);
    line(0,0,x,y);
  }
  endShape();
  noStroke();
  fill('#fb7e14');
  let rectWidth = map(current, 0, duration, 0, width);
  rect(-256, -256, rectWidth, 20);
}


function stopMusic() {
  music.stop();
}

function restartMusic(){
  music.stop();
  music.play();
}
