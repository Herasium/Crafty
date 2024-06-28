var M = 4294967296,
  A = 1664525,
  C = 1;

function Interpolate(pa, pb, px) {
  var ft = px * Math.PI,
    f = (1 - Math.cos(ft)) * 0.5;
  return pa * (1 - f) + pb * f;
}

function Perlin(amp, wl, width,psng) {
  this.x = 0;
  this.amp = amp;
  this.wl = wl;
  this.fq = 1 / wl;
  this.psng = psng;
  this.a = this.psng.next();
  this.b = 1;
  this.pos = [];
  while (this.x < width) {
    if (this.x % this.wl === 0) {
      this.a = this.b;
      this.b = this.psng.next();
      this.pos.push(this.a * this.amp);
    } else {
      this.pos.push(
        Interpolate(this.a, this.b, (this.x % this.wl) / this.wl) * this.amp
      );
    }
    this.x++;
  }
}

function GenerateNoise(amp, wl, octaves, divisor, width,psng) {
  var result = [];
  for (var i = 0; i < octaves; i++) {
    result.push(new Perlin(amp, wl, width,psng));
    amp /= divisor;
    wl /= divisor;
  }
  return result;
}

function CombineNoise(pl) {
  var result = { pos: [] };
  for (var i = 0, total = 0, j = 0; i < pl[0].pos.length; i++) {
    total = 0;
    for (j = 0; j < pl.length; j++) {
      total += pl[j].pos[i];
    }
    result.pos.push(Math.floor(total)+15);
  }
  return result;
}

