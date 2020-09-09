  let capture;
  let w = 1280;
  let h = 720;
  let canvas;
  let particles = [];
  let img;
  let totalFrames = 0;
  let avgFr = 0;
  const NUM_PARTICLES = 1600;
  let paused = false;
  let currFrame = 0;
  let currFrame2 = 0;
  const speed = 7;
  const size = 4;
  let start = false;
  let runSketch = false;

  document.querySelector('.fa-angle-down').addEventListener('click', function(){
    start = !start;
    runSketch = !runSketch;
    $('.instructions').delay(8000).animate({
      opacity: 0
    }, 3000);
  })

  document.querySelector('body').addEventListener('wheel', function(){
    start = !start;
    runSketch = !runSketch;
    $('.instructions').delay(9000).animate({
      opacity: 0
    }, 2000);
  })

  function preload() {
    img = loadImage("images/burial.jpg");
  }

  function setup() {
    canvas = createCanvas(w, h);
    canvas.parent("sketch");
    let constraints = {audio:false,video:{width:{min:320,ideal:w,max:1280},height:{min:240,ideal:h,max:1280},frameRate: {min: 1.0, max: 30.0}}};
    capture = createCapture(constraints);
    capture.hide();
    
    for(let i = 0; i < NUM_PARTICLES; i++){
      particles.push(new Particle());
    }
    let newW = constrain(windowWidth, 1, 1280);
    let newH = constrain(windowHeight, 1, 720);
    resizeCanvas(newW, newH);
    image(img, 0, 0);
  }

  function draw() {
    if(paused){
      reset();
    } else {
      capture.loadPixels();
    }
    
    if(start){
      currFrame = frameCount;
      start=!start
    }

    // only starts running the loop if a camera feed is loaded, and after 300 frames following scrolling down to view the sketch
    if(capture.pixels.length == (w*h*4) && runSketch && frameCount - currFrame > 630) {
    
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        let currX = floor(p.x);
        let currY = floor(p.y);
        let index = (currY * w + currX) * 4;
        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];

        let c = color(r, g, b, 40);
        p.display(c);
        p.move();
      }
      //calcAvgFramerate();
    }
    
  }

  function windowResized() {
    let newW = constrain(windowWidth, 1, 1280);
    let newH = constrain(windowHeight, 1, 720);
    resizeCanvas(newW, newH);
    image(img, 0, 0);
    currFrame2 = frameCount;
    paused = !paused;
    reset();
  }

  function reset() {
    for(p of particles){
      p.x = w/2;
      p.y = h/2;
      p.a = random(TWO_PI);
      p.speed = random(-speed,speed);
      p.vx = cos(p.a)*p.speed;
      p.vy = sin(p.a)*p.speed;
    }

    if(frameCount - currFrame2 > 60) {
      paused = !paused;
    }
  }

  function mousePressed(){
    if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h) {
      image(img, 0, 0);
      currFrame2 = frameCount;
      paused = !paused;
    }
  }

  function calcAvgFramerate(){
    fill(0);
    rect(0, 0, 30, 20);
    fill(255);
    let n = frameRate();
    totalFrames+=n;
    avgFr = totalFrames/frameCount;
    text(floor(avgFr), 10, 15);
    //text(floor(frameRate()), 10, 15);
  }

  class Particle {
    constructor() {
      this.x = w/2;
      this.y = h/2;
      this.a = random(TWO_PI);
      this.speed = random(-speed,speed);
      this.vx = cos(this.a)*this.speed;
      this.vy = sin(this.a)*this.speed;
    }

    display(_color) {
      noStroke();
      fill(_color);
      push();
        translate(w, 0);
        scale(-1, 1);
        ellipse(this.x, this.y, size, size);
      pop();
    }

    move() {
      this.x+=this.vx; //random(-5, 5);
      this.y+=this.vy; //random(-5, 5);
      if (this.y < 0) {
        this.y = h;
      } 

      if (this.y > h) {
        this.y = 0;
      }
      if (this.x < 0) {
        this.x = w;
      } 

      if (this.x > w) {
        this.x = 0;
      }
    }
  }
