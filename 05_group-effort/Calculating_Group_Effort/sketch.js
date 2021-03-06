let data = [];

function mousePressed() {
  // Generate some data with mouseY position
  let d = mouseY;
  data.push(d/5);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // Plot data evenly across the screen
  let colW = width / data.length;
  fill('red');
  noStroke();
  for (let d in data) {
    let x = (d * colW) + (colW / 2);
    let y = data[d];
    ellipse(x, y, 10, 10);
  }

  // Black text
  fill ('black');
  stroke('black');
  // ADD DATA
  // Who matters?
  // Depending on how you use this data, it can
  // either be easy for 1 person to carry everyone,
  // or everyone has to contribute to meet the goal.
  let sum = 0;
  for (let d of data) {
    sum += d;
  }
  line(0, sum, width, sum);
  text("ADD", 10, sum);

  // MEAN (AVERAGE)
  // Who matters?
  // The majority rather than the minority.
  let mean = sum / data.length;
  line(0, mean, width, mean);
  text("MEAN", 50, mean);

  // Who matters?
  // The middle person. This is the true midpoint.
  // This gives you a clue about the shape of the distribution curve.
  data.sort(function(a, b) {
    return a - b
  });
  let median = data[data.length / 2];
  line(0, median, width, median);
  text("MEDIAN", 200, median);

  // Who matters?
  // The top person.
  let top = data[data.length - 1];
  line(0, top, width, top);
  text("TOP", 300, top);

  // Who matters?
  // The bottom person.
  let bottom = data[0];
  line(0, bottom, width, bottom);
  text("BOTTOM", 400, bottom);

  // FIND MIDPOINT
  // Who matters?
  // Only the highest and lowest values matter.
  let midpoint = (top + bottom) / 2;
  line(0, midpoint, width, midpoint);
  text("MIDPOINT", 100, midpoint);

  // Who matters?
  // If top person is an outlier, everyone else loses.
  // If top person is not much above average, everyone wins.
  let curves = [];
  for (let d of data) {
    curves.push(d / top);
  }
  let curve = 0;
  for (let c of curves) {
    curve += c;
  }
  curve /= curves.length;
  line(0, curve, width, curve);
  text("CURVED MEAN", 500, curve);

  // ADD ABOVE MEAN, SUBTRACT BELOW MEAN
  // Who matters?
  // Values above the mean contribute.
  // Values below the mean take away.
  let addSubtract = 0;
  for (let d of data) {
    if (d >= mean) addSubtract += d;
    else addSubtract -= d;
  }
  line(0, addSubtract, width, addSubtract);
  text("ADD/SUBTRACT", 150, addSubtract);

  // AVG DEVIATION FROM THE MEAN
  // Who  matters?
  // Outliers. It doesn't matter how high or low your value is,
  // what counts is staying in sync with everyone else. Therefore
  // anyone not in sync with the group has a big impact.
  let sumDevs = 0;
  for (let d of data) {
    sumDevs += abs(d - mean);
  }
  line(0, sumDevs, width, sumDevs);
  text("SUM DEVIATIONS", 250, sumDevs);

  // SQUARE IT, MEAN IT
  // Who  matters?
  // Higher values have more weight.
  let meansqs = 0;
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    meansqs += (d * d);
  }
  meansqs /= data.length;
  line(0, meansqs, width, meansqs);
  text("MEAN OF SQUARES", width - 150, meansqs);
}
