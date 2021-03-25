console.log('hi');
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.Zero = function () {
        return new Vector2(0, 0);
    };
    Vector2.MoonGravity = function () {
        return new Vector2(0, 1.62 * 39.39 * 220.29);
    };
    Vector2.EarthGravity = function () {
        return new Vector2(0, 9.8 * 39.39 * 220.29);
    };
    return Vector2;
}());
var Ball = /** @class */ (function () {
    function Ball(color, position, radius, startAngle, endAngle, velocity, acceleration) {
        if (startAngle === void 0) { startAngle = 0; }
        if (endAngle === void 0) { endAngle = Math.PI * 2; }
        if (velocity === void 0) { velocity = Vector2.Zero(); }
        if (acceleration === void 0) { acceleration = Vector2.MoonGravity(); }
        this.color = color;
        this.position = position;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
    return Ball;
}());
CanvasRenderingContext2D.prototype.draw = function (arc) {
    this.save();
    this.beginPath();
    this.arc(arc.position.x, arc.position.y, arc.radius, arc.startAngle, arc.endAngle);
    this.closePath();
    this.fillStyle = arc.color;
    this.fill();
    this.restore();
};
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var position = new Vector2(canvas.width / 2, 0);
var ball = new Ball('yellow', position, 30);
function draw() {
    c.fillStyle = 'green';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.draw(ball);
}
var time = Date.now();
var orig = time;
canvas.onclick = function () {
    var dv = 2500;
    ball.velocity.y = Math.max(-2 * dv, ball.velocity.y - dv);
};
function update() {
    var now = Date.now();
    var dt = (now - time) / 1000;
    time = now;
    ball.velocity = new Vector2(ball.velocity.x + ball.acceleration.x * dt, ball.velocity.y + ball.acceleration.y * dt);
    ball.position = new Vector2(Math.min(canvas.width, ball.position.x + ball.velocity.x * dt), Math.min(canvas.height, ball.position.y + ball.velocity.y * dt));
    if (ball.position.y == canvas.height) {
        console.log(now - orig);
        console.log(ball);
        if (ball.velocity.y > 800)
            ball.velocity.y = -ball.velocity.y * 0.6;
        else
            ball.velocity.y = 0;
    }
    window.requestAnimationFrame(launch);
}
function launch() {
    update();
    draw();
}
window.requestAnimationFrame(launch);
