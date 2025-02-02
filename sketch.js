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
let amp;
let vol;

function setup() {
  createCanvas(400, 400);
  
  amp= new p5.Amplitude()
  
  button=createButton('λ');
  button.style('font-size', '30px');
  button.style('background-color', '#fb7e14');
  button.position(width/2-button.width, height/2-button.height);
  button.mousePressed(PressedTheButton);
  
  slider=createSlider(0, 1, 1, 0.01);
  slider.position(width/2-slider.width, height/2+slider.height*8);
  slider.style('width','300px');
  slider.changed(()=> {
    music.setVolume(slider.value());
  });
  
  dropdown=createSelect();
  dropdown.option('Forget About Freeman');
  dropdown.option("We've Got Hostiles");
  dropdown.option('Surface Tension 1');
  dropdown.option('Hazardous Environments');
  dropdown.option('The Only Thing They Fear Is You')
  dropdown.option('Bfg Division')
  dropdown.option('Who Can It Be Now');
  dropdown.option('I Am Alone');
  dropdown.changed(songChanged)
  
  Songs=[dropdown.selected(), 'mp3']
  var combined=join(Songs,'.')
  music=loadSound(combined);
  //noStroke();
}

function songChanged(){
  Songs=[dropdown.selected(), 'mp3']
  var combined=join(Songs,'.')
  music=loadSound(combined, playSong);
  
}

function playSong() {
  music.stop()
  music.play()

}

function PressedTheButton(){
  if (music.isPlaying()){
  music.stop()
  }
  else{
  music.play()
  }
}

function draw() {
  background('#292929');
  vol=amp.getLevel()
  for(i=0;i<400;i+=25){
    for(j=0;j<400;j+=25){
      fill(vol*1000,vol*200,j/2)
      ellipse(i+random(vol*30),j+random(vol*30),vol*250)
    }
  }
}