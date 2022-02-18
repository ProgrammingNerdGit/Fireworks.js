const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const minimal_spawn_delay = 100;

let rockets = [];

function spawn_rocket(x, y) {
    rockets.push(new Rocket(x, y, context));
}

let last_spawn = Date.now();

canvas.addEventListener("click", function (e) {
    let x = e.pageX - this.offsetLeft;
    let y = e.pageY - this.offsetTop;
    spawn_rocket(x, y);
    last_spawn = Date.now();
});

let mouse_down = false;

window.addEventListener("mousedown", function () {
    mouse_down = true;
});

window.addEventListener("mouseup", function () {
    mouse_down = false;
});

canvas.addEventListener("mousemove", function (e) {
    if (mouse_down) {
        let now = Date.now();
        let delta = now - last_spawn;
        if (delta > minimal_spawn_delay) {
            let x = e.pageX - this.offsetLeft;
            let y = e.pageY - this.offsetTop;
            spawn_rocket(x, y);
            last_spawn = now;
        }
    }
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
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
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
