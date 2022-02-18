const canvas_element = document.getElementById("canvas");
const canvas = canvas_element.getContext("2d");

let rockets = [];

canvas_element.addEventListener("click", function (e) {
  let x = e.pageX - this.offsetLeft;
  let y = e.pageY - this.offsetTop;
  let rocket = new Rocket(x, y);
  console.log("x: " + x + " y: " + y);
  rockets.push(rocket);
  console.log(rockets);
});

window.onresize = resize;

function resize() {
  canvas_element.width = window.innerWidth;
  canvas_element.height = window.innerHeight;
}

function draw() {
  canvas.clearRect(0, 0, canvas_element.width, canvas_element.height);
  rockets.forEach(rocket => {
    rocket.update(canvas);
  });
  rockets = rockets.filter(rocket => rocket.alive);
  rockets.forEach(rocket => {
    rocket.draw(canvas);
  });
  requestAnimationFrame(draw);
}

resize();
draw();
