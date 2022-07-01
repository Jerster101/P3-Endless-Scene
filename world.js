"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 16;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();

  // Converting noise to color
  let num = noise(i, j) * 255;
  // fill(num);
  push();
  stroke(0);
  if (num < 40) {
    // --one star--

    // background
    fill(0);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);

    // star
    fill(255);
    beginShape();
    vertex(9, 9);
    vertex(9, tw-5);
    vertex(th-5, tw-5);
    vertex(th-5, 9);
    endShape(CLOSE);

  } else if (num < 85) {
    // --two stars--

    //background
    fill(0);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);

    // star one
    fill(255);
    beginShape();
    vertex(6, 9);
    vertex(6, tw-5);
    vertex(th-8, tw-5);
    vertex(th-8, 9);
    endShape(CLOSE);

    // star two
    beginShape();
    vertex(1, 1);
    vertex(1, tw-13);
    vertex(th-13, tw-13);
    vertex(th-13, 1);
    endShape(CLOSE);

  } else if (num < 120) {
    // --three stars--

    //background
    fill(0);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);

    // star one
    fill(255);
    beginShape();
    vertex(4, 6);
    vertex(4, tw-8);
    vertex(th-10, tw-8);
    vertex(th-10, 6);
    endShape(CLOSE);

    // star two
    beginShape();
    vertex(1, 1);
    vertex(1, tw-13);
    vertex(th-13, tw-13);
    vertex(th-13, 1);
    endShape(CLOSE);

    // star three
    beginShape();
    vertex(10, 1);
    vertex(10, tw-13);
    vertex(th-4, tw-13);
    vertex(th-4, 1);
    endShape(CLOSE);

  } else if (num < 210) {
    // --four stars--

    //background
    fill(0);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);

    // star one
    fill(255);
    beginShape();
    vertex(6, 6);
    vertex(6, tw-8);
    vertex(th-8, tw-8);
    vertex(th-8, 6);
    endShape(CLOSE);

    // star two
    beginShape();
    vertex(2, 13);
    vertex(2, tw-1);
    vertex(th-12, tw-1);
    vertex(th-12, 13);
    endShape(CLOSE);

    // star three
    beginShape();
    vertex(10, 1);
    vertex(10, tw-13);
    vertex(th-4, tw-13);
    vertex(th-4, 1);
    endShape(CLOSE);

    // star four
    beginShape();
    vertex(10, 10);
    vertex(10, tw-4);
    vertex(th-4, tw-4);
    vertex(th-4, 10);
    endShape(CLOSE);


  } else if (num < 220) {
    // --red planet--

    //background
    fill(0);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);

    //planet
    fill(191, 133, 133);
    beginShape();
    ellipse(th/2, tw/2, 16, 16);
    endShape(CLOSE);

    //texture
    fill(172, 113, 113);
    stroke(172, 113, 113);
    beginShape();
    ellipse(th/2+4, tw/2+4, 3, 3);
    endShape(CLOSE);
    beginShape();
    ellipse(th/2+2, tw/2+4, 2, 2);
    endShape(CLOSE);
    beginShape();
    ellipse(4, 4, 3, 3);
    endShape(CLOSE);
    beginShape();
    ellipse(5, 7, 2, 3);
    endShape(CLOSE);

  }else if (num < 240) {
    // --green planet--
  
    //background
    fill(0);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);

    //planet
    fill(113, 172, 135);
    beginShape();
    ellipse(th/6, tw/6, 28, 28);
    endShape(CLOSE);

    //texture
    fill(85, 145, 107);
    stroke(85, 145, 107);
    beginShape();
    ellipse(th/2+3, tw/2+3, 3, 3);
    endShape(CLOSE);
    beginShape();
    ellipse(th/2+2, tw/2+4, 2, 2);
    endShape(CLOSE);
    beginShape();
    ellipse(4, 4, 3, 3);
    endShape(CLOSE);
    beginShape();
    ellipse(5, 7, 2, 3);
    endShape(CLOSE);
    beginShape();
    ellipse(10, 7, 2, 3);
    endShape(CLOSE);
  }else {
    // --void--  If this shows up there is an errror or unexpected input
    fill(128);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);
  }

  //Mouse Interaction
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(0);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() {}
