let Particle = function(position,color) {
  this.color = color
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(0, 3));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 6;
};

Particle.prototype.display = function() {
  noStroke()
  fill(this.color[0],this.color[1],this.color[2], this.lifespan);
  square(this.position.x, this.position.y, 12);
};

Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position,color) {
  this.color = color
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin,this.color));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
