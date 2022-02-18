const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let rockets = [];

canvas.addEventListener("click", function (e) {
    let x = e.pageX - this.offsetLeft;
    let y = e.pageY - this.offsetTop;
    let rocket = new Rocket(x, y, context);
    rockets.push(rocket);
});

window.onresize = resize;

function resize() {
    if (context.width === window.innerWidth && context.height === window.innerHeight) {
        return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let last_frame = Date.now();

function draw() {
    let now = Date.now();
    let delta = now - last_frame;
    last_frame = now;
    context.clearRect(0, 0, canvas.width, canvas.height);
    rockets.forEach(rocket => {
        rocket.update(context, delta);
    });
    rockets = rockets.filter(rocket => rocket.alive);
    rockets.forEach(rocket => {
        rocket.draw(context);
    });
    requestAnimationFrame(draw);
}

resize();
draw();
