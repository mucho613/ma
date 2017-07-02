var Netsu = function(direction, speed) {
  this.img = new createjs.Bitmap('image/netsu.png');
  this.img.regX = 128;
  this.img.regY = 128;

  this.direction = direction;
  this.speed = speed;

  this.img.x = stage.canvas.width / 2;
  this.img.y = stage.canvas.height / 2;
  this.img.scaleX = this.img.scaleY = 0.2;

  stage.addChild(this.img);
}

Netsu.prototype.update = function() {
  this.img.x += this.speed * Math.cos(this.direction / 180 * Math.PI);
  this.img.y += this.speed * Math.sin(this.direction / 180 * Math.PI);
}