let mainStem = [];
let branches = [];

let dia = 15;
let opacity = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (let i = 10; i < height; i += 300) {
    //drawBackGround(i);
  }

  //explanation text
  displayText();
}

function displayText() {
  fill(255, 180);
  //draw lines
  textStyle(BOLDITALIC);
  text("Click", 10, 20);
  textStyle(NORMAL);
  text(" on anywhere of the screen to DRAW lines.", 40, 20);
  //generate branches
  text("Press the", 10, 40);
  textStyle(BOLDITALIC);
  text("SPACE BAR", 65, 40);
  textStyle(NORMAL);
  text("to GENERATE the branches of the timeline.", 140, 40);
  //stop generation
  text("Press", 10, 60);
  textStyle(BOLDITALIC);
  text("Esc", 45, 60);
  textStyle(NORMAL);
  text("to STOP the generation and start drawing a new time line.", 70, 60);
  //change mainstem stroke
  text("Press", 10, 80);
  textStyle(BOLDITALIC);
  text("UP/DOWN ARROW", 45, 80);
  textStyle(NORMAL);
  text("to INCREASE OR DECREASE the stroke of the main stem.", 170, 80);
  text("Press", 10, 100);
  textStyle(BOLDITALIC);
  text("ENTER", 45, 100);
  textStyle(NORMAL);
  text("to RETURN to the original stroke of the main stem.", 90, 100);
  //darken the screen
  text("Press", 10, 120);
  textStyle(BOLDITALIC);
  text("BACKSPACE", 45, 120);
  textStyle(NORMAL);
  text("to DARKEN the screen.", 125, 120);
}

function draw() {
  // Main Stem: update & display
  for (let i = 0; i < mainStem.length; i++) {
    this.Mcolor = 255;
    let m = mainStem[i];
    if (i != 0) {
      let pm = mainStem[i - 1];
      m.displayLine(pm);
    }
    m.display();
  }

  //Branches: update & display
  for (let i = 0; i < branches.length; i++) {
    let b = branches[i];
    b.move();
    b.display();
  }

  //Branches: limit & remove
  while (branches.length > 10) {
    branches.splice(0, 1);
  }

  for (let i = branches.length - 1; i >= 0; i--) {
    let b = branches[i];
    if (b.isDone == true) {
      branches.splice(i);
    }
  }
}

function mousePressed() {
  //Main Stem: generate
  mainStem.push(new MainStem(mouseX, mouseY, dia, opacity));
}

function keyPressed() {
  //Branches: Generate
  if (key == " ") {
    for (let i = 0; i < mainStem.length; i++) {
      if (i != 0) {
        let p1 = createVector(mainStem[i - 1].x, mainStem[i - 1].y);
        let p2 = createVector(mainStem[i].x, mainStem[i].y);
        let vector = p5.Vector.sub(p2, p1);
        let v1 = vector.copy();
        let v2 = vector.copy();
        let angle = radians(30); // *****
        branches.push(new Branch(p2.x, p2.y, v1.rotate(angle)));
        branches.push(new Branch(p2.x, p2.y, v2.rotate(-angle)));
      }
    }
  }

  //darker screen
  if (keyCode == BACKSPACE) {
    background(0, 30);
    //displayText();
    mainStem = [];
    branches = [];
  }

  //draw new line
  if (keyCode == ESCAPE) {
    mainStem = [];
    branches = [];
  }

  //change MainStem Stroke
  if (keyCode == UP_ARROW) {
    dia += 5;
  }
  if (keyCode == DOWN_ARROW) {
    if (dia >= 10) {
      dia -= 5;
    }
  }
  if (keyCode == ENTER) {
    dia = 20;
  }
}

class MainStem {
  constructor(x, y, dia, opacity) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.opacity = opacity;
    this.Mcolor = 255;
  }
  display() {
    push();
    blendMode(ADD);
    noFill();
    stroke(112, 39, 160, this.opacity);
    circle(this.x, this.y, this.dia + 10);
    pop();
  }
  displayLine(prev) {
    push();
    blendMode(ADD);
    noFill();
    stroke(29, 185, 195, this.opacity);
    strokeWeight(this.dia / 2);
    line(this.x, this.y, prev.x, prev.y);
    pop();
  }
}

class Branch {
  constructor(x, y, vector) {
    this.x = x;
    this.y = y;

    this.rad = random(2, 3);

    //move
    this.direction = vector.copy();
    this.direction.setMag(1);

    //limit & remove
    this.isDone = false;
  }

  checkRemove() {
    if (
      this.x < 0 ||
      this.x > windowWidth ||
      this.y < 0 ||
      this.y > windowHeight
    ) {
      this.isDone = true;
    }
  }

  move() {
    this.x += this.direction.x;
    this.y += this.direction.y;
    if (random() < 0.02) {
      this.direction.rotate(radians(60));
    }
  }

  display() {
    push();
    blendMode(ADD);
    noStroke();
    fill(29, 185, 255, 15);
    circle(this.x, this.y, this.rad * 2);
    pop();
  }
}

function drawBackGround(h) {
  let freq = frameCount;
  let amp = random(70, 100);
  let y;

  for (let i = 5; i < width; i += 5) {
    y = sin(i / 50) * amp;

    //color
    let r = map(cos(i / 100), -1, 1, 140, 164);
    let g = map(sin(i / 100), -1, 1, 33, 180);
    let b = map(sin(i / 100), 0, 1, 4, 116);
    stroke(r, g, b, 50);

    //variation
    let m1 = random(50);
    let m2 = random(100);

    strokeWeight(3);
    line(i + m1, y + h + m2, i + m1, y + h + 150 + m2);
  }
}
