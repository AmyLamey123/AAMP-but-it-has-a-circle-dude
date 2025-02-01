//Choose an option from the dropdown and it will play
//Make sure to stop what you're playing first or else it will overlap
//Press the Lambda sign to pause your music if it's playing
//Or press it again to start your music
//The slider is for volume
//You will have to let go of the slider for the change to go into effect

let button;
let slider;
let dropdown;
let combined
let music;
let Songs;
let fft;

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  colorMode(HSB);
  
  fft= new p5.FFT(0.6,256);
  
  button=createButton('λ');
  button.style('font-size', '30px');
  button.style('background-color', '#fb7e14');
  button.position(width/2-button.width, height/2-button.height);
  button.mousePressed(PressedTheButton);
  
  slider=createSlider(0, 1, 1, 0.01);
  slider.position(width/2-slider.width, height/2+slider.height*10);
  slider.style('width','300px');
  slider.changed(()=> {
    music.setVolume(slider.value());
  });
  
  dropdown=createSelect();
  dropdown.option('Forget About Freeman');
  dropdown.option("We've Got Hostiles");
  dropdown.option('Surface Tension 1');
  dropdown.option('Hazardous Environments');
  dropdown.option('The Only Thing They Fear Is You');
  dropdown.option('Bfg Division');
  dropdown.option('Who Can It Be Now');
  dropdown.option('I Am Alone');
  dropdown.changed(songChanged)
  
  Songs=[dropdown.selected(), 'mp3']
  var combined=join(Songs,'.')
  music=loadSound(combined);
  //noStroke();
  
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
  if (music.isPlaying()){
  music.stop();
  }
  else{
  music.play();
  }
}

function draw() {
  background('#292929');
  var spectrum=fft.analyze();
  console.log(spectrum);
  noStroke(); 
  translate (width/2, height/2)
  beginShape()
  for (var i = 0; i<spectrum.length; i++){
    stroke(i,255,255)
    var angle = map(i,0,spectrum.length,0,360)
    var amp = spectrum[i];
    var r = map(amp,0,256,100,250);
    var x = r*cos(angle);
    var y = r*sin(angle);
    line(0,0,x,y);
  }
  endShape()
}