var Hi = function() {
  this.img = new createjs.Bitmap('image/hi.png');
  this.img.regX = 128;
  this.img.regY = 128;

  this.img.x = stage.canvas.width / 2;
  this.img.y = stage.canvas.height / 2;

  this.state = "Attack";

  this.direction = Math.random() * 360;
}

Hi.prototype.update = function() {
  if(this.state === "Attack") this.img.rotation++;
  else if(this.state === "Hitten") {
    this.img.x += 30 * Math.cos(this.direction);
    this.img.y += 20 * Math.sin(this.direction);
    this.img.rotation += 20;
  }
}

Hi.prototype.hit = function() {
  this.state = "Hitten";
}

Hi.prototype.fit = function() {
  this.state = "Stop";
}