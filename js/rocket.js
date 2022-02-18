const max_speed = 4;
const min_speed = 1;

function createVector(x, y) {
  return {
    x: x,
    y: y
  };
}

class Color {
  constructor(r, g, b, alpha = 0.5) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
  }


  toRGBString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
  }
}

const colors = [
  new Color(255, 0, 0),
  new Color(0, 255, 0),
  new Color(0, 0, 255),
  new Color(255, 255, 0),
  new Color(255, 0, 255)
]

function random_speed(max_speed, min_speed) {
  let speed = (Math.random() * max_speed * 2) - max_speed;
  speed = Math.abs(speed) > min_speed ? speed : (min_speed * (Math.random() > 0.5 ? -1 : 1));
  return speed;
}

function random_color() {
  return colors[Math.floor(Math.random() * colors.length)];
}

class Rocket {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random_speed(max_speed, min_speed), random_speed(max_speed, min_speed));
    this.radius = 10;
    this.alive = true;
    this.color = random_color();
  }

  update(canvas) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.alive = !(this.position.x > 0 && this.position.x < canvas.width && this.position.y > 0 && this.position.y < canvas.height);
  }

  draw(canvas) {
    canvas.fillStyle = this.color.toRGBString();
    canvas.beginPath();
    canvas.ellipse(this.position.x, this.position.y, this.radius, this.radius, 0, 0, Math.PI * 2);
    canvas.fill();
    canvas.closePath();
  }
}
