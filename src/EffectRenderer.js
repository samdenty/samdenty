import * as Comlink from "comlink";

export class EffectRenderer {
  stopTime = null;
  pauseAdjustment = 0;
  currentFrame = null;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
  }

  calculate(width, height, devicePixelRatio = 1) {
    const prevWidth = this.width;
    const prevHeight = this.height;

    this.width = width;
    this.height = height;

    this.canvas.width = width * devicePixelRatio;
    this.canvas.height = height * devicePixelRatio;

    this.ctx.scale(devicePixelRatio, devicePixelRatio);

    if (prevWidth >= width && prevHeight >= height) return;

    this.elements = [];
    const randomness = 40000 / devicePixelRatio;

    for (var x = 0; x < this.canvas.width; x++) {
      for (var y = 0; y < this.canvas.height; y++) {
        if (Math.round(Math.random() * randomness) === 1) {
          var s = (Math.random() * 5 + 1) / 10;
          if (Math.round(Math.random()) === 1)
            this.elements.push(this.presets.o(x, y, s, 0, 0));
          else
            this.elements.push(
              this.presets.x(
                x,
                y,
                s,
                0,
                0,
                (Math.random() * 3 - 1) / 10,
                Math.random() * 360
              )
            );
        }
      }
    }
  }

  presets = {
    o: (x, y, s, dx, dy) => ({
      x: x,
      y: y,
      r: 12 * s,
      w: 5 * s,
      dx: dx,
      dy: dy,
      draw: function (ctx, t) {
        this.x += this.dx;
        this.y += this.dy;

        ctx.beginPath();
        ctx.arc(
          this.x + +Math.sin((50 + x + t / 10) / 100) * 3,
          this.y + +Math.sin((45 + x + t / 10) / 100) * 4,
          this.r,
          0,
          2 * Math.PI,
          false
        );
        ctx.lineWidth = this.w;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.stroke();
      },
    }),
    x(x, y, s, dx, dy, dr, r) {
      r = r || 0;
      return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function (ctx, t) {
          this.x += this.dx;
          this.y += this.dy;
          this.r += this.dr;

          var _this = this;
          var line = function (x, y, tx, ty, c, o) {
            o = o || 0;
            ctx.beginPath();
            ctx.moveTo(-o + (_this.s / 2) * x, o + (_this.s / 2) * y);
            ctx.lineTo(-o + (_this.s / 2) * tx, o + (_this.s / 2) * ty);
            ctx.lineWidth = _this.w;
            ctx.strokeStyle = c;
            ctx.stroke();
          };

          ctx.save();

          ctx.translate(
            this.x + Math.sin((x + t / 10) / 100) * 5,
            this.y + Math.sin((10 + x + t / 10) / 100) * 2
          );
          ctx.rotate((this.r * Math.PI) / 180);

          line(-1, -1, 1, 1, "rgba(255, 255, 255, 0.3)");
          line(1, -1, -1, 1, "rgba(255, 255, 255, 0.3)");

          ctx.restore();
        },
      };
    },
  };

  draw(again = false) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var time = Date.now() - this.pauseAdjustment;

    for (var e in this.elements) this.elements[e].draw(this.ctx, time);

    if (again)
      this.currentFrame = requestAnimationFrame(() => this.draw(again));
  }

  start() {
    if (this.stopTime) {
      this.pauseAdjustment += Date.now() - this.stopTime;
      this.stopTime = null;
    }

    this.draw(true);
  }

  stop() {
    cancelAnimationFrame(this.currentFrame);

    if (!this.stopTime) this.stopTime = Date.now();
  }
}

Comlink.expose(EffectRenderer);
