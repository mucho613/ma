var Bullet = function(direction, speed) {
  this.img = new createjs.Bitmap('image/netsu.png');
  this.img.regX = 128;
  this.img.regY = 128;
  this.lifeTime = 0;

  this.direction = direction;
  this.speed = speed;

  this.img.x = stage.canvas.width / 2;
  this.img.y = stage.canvas.height / 2;
  this.img.scaleX = this.img.scaleY = 0.2;

  stage.addChild(this.img);

  this.collider = new createjs.Shape();
  this.collider.graphics.beginFill("Blue");
  this.collider.graphics.drawRect(-20, -20, 40, 40);
  this.collider.alpha = 0;

  stage.addChild(this.collider);
}

Bullet.prototype.update = function() {
  this.lifeTime++;

  this.img.x += this.speed * Math.cos(this.direction / 180 * Math.PI);
  this.img.y += this.speed * Math.sin(this.direction / 180 * Math.PI);

  this.collider.x = this.img.x;
  this.collider.y = this.img.y;

  this.collider.rotation = this.img.rotation;
}
