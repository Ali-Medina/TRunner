let yoff = 0.0;
let myData;
let current = 0;

let brandColors = {
  'buzz': '#a2f93d',
  'forest': '#1c260b',
  'rust': '#B22E00',
  'ice': '#f6f9f2',
  'coal': '#010F06'
}

let saveRequested = false

async function setup() {
  createCanvas(300, 400);
  pixelDensity(6);
  myData = await loadJSON('runs.json');
  console.log(myData);

  let saveButton = createButton('Save PNG');
  saveButton.mousePressed(() => {
    saveRequested = true;
  });

  let nextButton = createButton('Next Run');
  nextButton.mousePressed(() => {
    current = (current + 1) % myData.length;
  });
}

function draw() {
 if (saveRequested) {
    clear();
  } else {
    background(110);
  }
  push();
  translate(width / 2, height / 2);
  
  let item = myData[current];

  
  

  drawRings(item.distance);
  drawElevation(item.elevation);
  drawTime(item.time);
  drawPace(item.pace);

  pop();

  if (saveRequested) {
    saveCanvas('myRun', 'png');
    saveRequested = false;
  }
  }



//TIME

function drawTime(m) {

    let x = 40
    let y = -40
    let L = 25        
    let d = L * 0.707 

    push()
    stroke(brandColors.rust)
    strokeWeight(8)
    strokeCap(ROUND)

    if (m < 15) {
      line(x, y, x, y - L)
    } else if (m < 30) {
      line(x, y, x, y - L)
      line(x, y, x - d, y - d)
    } else if (m < 45) {
      line(x, y, x, y - L)
      line(x, y, x - d, y - d)
      line(x, y, x - L, y)
    } else if (m < 60) {
      line(x, y, x, y - L)
      line(x, y, x - d, y - d)
      line(x, y, x - L, y)
      line(x, y, x - d, y + d)
    } else if (m < 90) {
      line(x, y, x, y - L)
      line(x, y, x - d, y - d)
      line(x, y, x - L, y)
      line(x, y, x - d, y + d)
      line(x, y, x, y + L)
    } else if (m < 150) {
      line(x, y, x, y - L)
      line(x, y, x - d, y - d)
      line(x, y, x - L, y)
      line(x, y, x - d, y + d)
      line(x, y, x, y + L)
      line(x, y, x + d, y + d)
    } else if (m < 210) {
      line(x, y, x, y - L)
      line(x, y, x - d, y - d)
      line(x, y, x - L, y)
      line(x, y, x - d, y + d)
      line(x, y, x, y + L)
      line(x, y, x + d, y + d)
      line(x, y, x + L, y)
    } else {
      line(x, y, x, y - L)
      line(x, y, x - d, y - d)
      line(x, y, x - L, y)
      line(x, y, x - d, y + d)
      line(x, y, x, y + L)
      line(x, y, x + d, y + d)
      line(x, y, x + L, y)
      line(x, y, x + d, y - d)
    }
    pop()
  }


//PACE

function drawPace(p) {

  let x = -75
  let y = 15
  noStroke();
  fill(brandColors.buzz);

  if (p <= 7) {
    ellipse(x, y, 15, 12);
    ellipse(x + 20, y, 15, 12);
    ellipse(x + 40, y, 15, 12);
    ellipse(x + 60, y, 15, 12);
    ellipse(x - 20, y, 15, 12);
    
  } else if (p <= 9) {
    ellipse(x, y, 15, 12);
    ellipse(x + 20, y, 15, 12);
    ellipse(x + 40, y, 15, 12);
    ellipse(x + 60, y, 15, 12);
  } else if (p <= 12) {
    ellipse(x, y, 15, 12);
    ellipse(x + 20, y, 15, 12);
    ellipse(x + 40, y, 15, 12);
  } else if (p <= 15) {
    ellipse(x, y, 15, 12);
    ellipse(x + 20, y, 15, 12);
  } else {
  ellipse(x, y, 15, 12);
  }
}



//ELEVATION

// used Claude AI to help make the sin waves, gave it my sketch and asked it to give me verticies based on it

function drawElevation(value) {
noFill();
stroke(brandColors.coal);
strokeWeight(5);
push();
translate(30,40);
let w = 90;

if (value < 100) {
    beginShape();
    for (let x = 0; x <= 1.0001; x += 0.01) {
      vertex(-w / 2 + x * w, 0);
    }
    endShape();

  } else if (value < 400) {
    beginShape();
    for (let x = 0; x <= 1.0001; x += 0.01) {
      let y = -12 * exp(-pow((x - 0.5) / 0.15, 2));
      vertex(-w / 2 + x * w, y);
    }
    endShape();

  } else if (value < 600) {
    beginShape();
    for (let x = 0; x <= 1.0001; x += 0.01) {
      let y = -35 * exp(-pow((x - 0.5) / 0.12, 2));
      vertex(-w / 2 + x * w, y);
    }
    endShape();

  } else if (value < 1000) {
    beginShape();
    for (let x = 0; x <= 1.0001; x += 0.01) {
      let y = 25 * cos(TWO_PI * 1.5 * x);
      vertex(-w / 2 + x * w, y);
    }
    endShape();

  } else if (value < 3000) {
    beginShape();
    for (let x = 0; x <= 1.0001; x += 0.01) {
      let y = 30 * cos(TWO_PI * 2.5 * x);
      vertex(-w / 2 + x * w, y);
    }
    endShape();

  } else {
    beginShape();
    for (let x = 0; x <= 1.0001; x += 0.01) {
      let y = 35 * cos(TWO_PI * 3.5 * x);
      vertex(-w / 2 + x * w, y);
    }
    endShape();
  }
  pop();
}


//DISTANCE

// based off of code by
// Daniel Shiffman
// https://thecodingtrain.com/challenges/36-blobby
// used Claude AI to help perfect the shape, prompt was to create the rings based on the shape


function ringsFor(value) {
  if (value >= 13) return 7;
  if (value >= 10) return 6;
  if (value >= 8) return 5;
  if (value >= 6) return 4;
  if (value >= 4.5) return 3;
  if (value >= 3.5) return 2;
  if (value >= 1.9) return 1;
  return 8;
}

function drawRings(value) {
  noFill();
  stroke(brandColors.forest);

  let startRadius = 20;
  let spacing = 17;
  let rings = ringsFor(value);

  for (let i = 0; i < rings; i++) {
    drawBlob(startRadius + i * spacing, i * 0.15);
  }
}

function drawBlob(radius, zShift) {
  let noiseMax = 1.5;
  let step = 0.05;
  let pts = [];

  for (let a = 0; a < TWO_PI; a += step) {
    let nx = map(cos(a), -1, 1, 0, noiseMax);
    let nz = map(sin(a), -1, 1, 0, noiseMax);
    let t = yoff + zShift;

    let offset = map(noise(nx, nz, t), 0, 1, -15, 15);
    let w = map(noise(nx + 100, nz + 100, t), 0, 1, 1, 8);
    let r = radius + offset;

    pts.push({ x: r * cos(a), y: r * sin(a), w: w });
  }

  for (let i = 0; i < pts.length; i++) {
    let p1 = pts[i];
    let p2 = pts[(i + 1) % pts.length];
    strokeWeight(p1.w);
    line(p1.x, p1.y, p2.x, p2.y);
  }
}

