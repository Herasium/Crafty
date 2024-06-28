const seed = Math.floor(Math.random()*1000000);
//const seed = 156384
//const seed = 884321

class Random {
  constructor(seed) {
    this.seed = seed;
    this.seed_count = seed;
  }

  random(min, max) {
    var x = Math.sin(this.seed_count++) * 10000;
    var randomValue = x - Math.floor(x);
    return Math.floor(min + randomValue * (max - min));
  }
  
  next() {
    var x = Math.sin(this.seed_count++) * 10000;
    var randomValue = x - Math.floor(x);
    return 5-randomValue * (10);
  }
}
