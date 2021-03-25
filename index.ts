console.log('hi')

interface CanvasRenderingContext2D {
  draw(arc: DrawableArc): void
}

interface Vector2 {
  x: number
  y: number
}

class Vector2 implements Vector2 {
  constructor(public x: number, public y: number) {}

  static Zero = function(): Vector2 {
    return new Vector2(0, 0)
  }

  static MoonGravity = function(): Vector2 {
    return new Vector2(0, 1.62 * 39.39 * 220.29)
  }

  static EarthGravity = function(): Vector2 {
    return new Vector2(0, 9.8 * 39.39 * 220.29)
  }
}

interface Motion {
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
}

interface DrawableArc {
  color: string
  position: Vector2
  readonly radius: number
  readonly startAngle: number
  readonly endAngle: number
}

class Ball implements Motion, DrawableArc {
  constructor(
    public color: string,
    public position: Vector2,
    public radius: number,
    public startAngle: number = 0,
    public endAngle: number = Math.PI * 2,
    public velocity: Vector2 = Vector2.Zero(),
    public acceleration: Vector2 = Vector2.MoonGravity(),
  ) {}
}

CanvasRenderingContext2D.prototype.draw = function (arc: DrawableArc) {
  this.save()
  this.beginPath()
  this.arc(arc.position.x, arc.position.y, arc.radius, arc.startAngle, arc.endAngle)
  this.closePath()
  this.fillStyle = arc.color
  this.fill()
  this.restore()
}

const canvas = <HTMLCanvasElement> document.getElementById('canvas')
const c = canvas.getContext('2d')

const position = new Vector2(canvas.width / 2, 0)
const ball = new Ball('yellow', position, 30)

function draw() {
  c.fillStyle = 'green'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.draw(ball)
}


var time = Date.now()
const orig = time

canvas.onclick = function() {
  const dv = 2500
  ball.velocity.y = Math.max(-2 * dv, ball.velocity.y - dv)
}

function update() {
  const now = Date.now()
  const dt = (now - time) / 1000
  time = now

  ball.velocity = new Vector2(
    ball.velocity.x + ball.acceleration.x * dt,
    ball.velocity.y + ball.acceleration.y * dt,
  )

  ball.position = new Vector2(
    Math.min(canvas.width, ball.position.x + ball.velocity.x * dt),
    Math.min(canvas.height, ball.position.y + ball.velocity.y * dt),
  )

  if (ball.position.y == canvas.height) {
    console.log(now - orig)
    console.log(ball)
    if (ball.velocity.y > 800)
      ball.velocity.y = -ball.velocity.y * 0.6
    else 
      ball.velocity.y = 0
  }
  window.requestAnimationFrame(launch)
}

function launch() {
  update()
  draw()
}

window.requestAnimationFrame(launch)
