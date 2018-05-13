function nToString(n) {
  return Math.round(n * 10000000) / 10000000;
}

class Scene {
  constructor(context) {
    this.ctx = context;

    this.width = 800;
    this.height = 800;
    this.inputs = {};
    this.out = {};
    this.time = 0;
    this.state = 1;
  }

  start() {
    this.state = 0;
    this.inputs.start.html('Пауза');
  }

  pause() {
    this.state = 1;
    this.inputs.start.html('Старт');
  }

  reset() {
    this.lastStart.time = 0; 
  }

  drawFloor() {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(0, 760);
        ctx.lineTo(800, 760);
        ctx.stroke();

        for (let i = 0; i < 20; ++i) {
            ctx.beginPath();
            ctx.moveTo(i * 40, 800);
            ctx.lineTo(40 + i * 40, 760);
            ctx.stroke();
        }
  }

  drawRuler() {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(0, 760);
        ctx.lineTo(0, 0);
        ctx.stroke();

        for (let i = 0; i < 19; ++i) {
            ctx.beginPath();
            ctx.moveTo(0, 760 - i * 40);
            ctx.lineTo(0, 760 - i * 40);
            ctx.stroke();

            if (i != 19) {
                ctx.lineWidth = 1;
                for (let j = 1; j < 10; ++j) {
                    ctx.beginPath();
                    ctx.moveTo(0, 760 - i * 40 - j * 4);
                    ctx.lineTo(10, 760 - i * 40 - j * 4);
                    ctx.stroke();
                }
                ctx.lineWidth = 2;
            }
            ctx.fillText(nToString(i * 0.1) + 'м', 20, 765 - i * 40);
        }
  }

  drawCross() {
    let ctx = this.ctx;
    ctx.beginPath();
    let xc = 500, yc = 400, delta = 200;
    ctx.moveTo(xc, yc);
    ctx.lineTo(xc - delta, yc - delta);
    ctx.moveTo(xc, yc);
    ctx.lineTo(xc + delta, yc - delta);
    ctx.moveTo(xc, yc);
    ctx.lineTo(xc - delta, yc + delta);
    ctx.moveTo(xc, yc);
    ctx.lineTo(xc + delta, yc + delta);
    ctx.moveTo(xc, yc);
    ctx.lineTo(xc, 760);
    ctx.moveTo(xc + 284, yc);
    ctx.arc(xc, yc, 284, 0, 2 * Math.PI);
    ctx.stroke();
  }

  initInput() {
    let inputs = this.inputs;
    inputs.h = $('#inputH');
    inputs.m1 = $('#inputM1');
    inputs.m2 = $('#inputM2');
    inputs.start = $('#inputStart');
    inputs.reset = $('#inputReset');
    inputs.r1 = $('#inputR1');
    inputs.r2 = $('#inputR2');
    inputs.r3 = $('#inputR3');
    inputs.r4 = $('#inputR4');

    this.updateInput();

    inputs.start.click((e) => {
      e.preventDefault();
      this.state == 0 ? this.pause() : this.start();
    });

    inputs.reset.click((e) => {
      e.preventDefault();
      this.reset();
    });
  }

  updateInput() {
    let inputs = this.inputs;
  }

  initOutput() {
    let out = this.out;
  }

  updateOutput() {
    let out = this.out;
  }

  updateLastOutput() {
    let out = this.out;
  }

  update() {
  }

  render() {
  }

  startLoop() {
    this.prevTime = performance.now();

    let loop = (time) => {
      if (this.state == 0) {
        this.delta = time - this.prevTime;
        this.delta *= this.timeScale;
        this.time += this.delta;
        this.update();
      }

      this.render();

      this.prevTime = time;
      this.frame = requestAnimationFrame(loop);
    };

    this.frame = requestAnimationFrame(loop);
  }
}

$(document).ready(() => {
  let canvas = $('#canvas');
  let height = canvas.height();
  let width = canvas.width();
  let size = height < width ? height : width;

  canvas.width(size);
  canvas.height(size);
  canvas.css('flex-grow', 0);

  canvas.attr('width', 800);
  canvas.attr('height', 800);

  let ctx = canvas[0].getContext('2d');

  ctx.lineWidth = 2;
  ctx.font = '500 15px Segoe UI';;

  let scene = new Scene(ctx);

  scene.initInput();
  scene.initOutput();
  scene.startLoop();
  scene.drawFloor();
  scene.drawRuler();
  scene.drawCross();
});