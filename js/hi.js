var Hi = function() {
  this.img = new createjs.Bitmap('image/hi.png');
  this.img.regX = 128;
  this.img.regY = 128;

  this.img.x = stage.canvas.width / 2;
  this.img.y = stage.canvas.height / 2;

  this.state = "Attack";

  this.direction = Math.random() * 360;

  this.timer = 0;

  this.bullet = new Array();
}

Hi.prototype.title = function() {
  this.img.x = stage.canvas.width / 2;
  this.img.y = stage.canvas.height / 2;
  this.img.rotation = 0;
  this.state = "Title";
  this.timer = 0;
}

Hi.prototype.reset = function() {
  this.img.x = stage.canvas.width / 2;
  this.img.y = stage.canvas.height / 2;
  this.state = "Attack";
  this.direction = Math.random() * 360;
  this.timer = 0;
}

Hi.prototype.update = function() {
  this.timer++;
  
  if(this.state === "Title") {
    
  }
  else if(this.state === "Start") {

  }

  else if(this.state === "Attack") {
    this.img.rotation++;

    if(this.timer % 15 == 0) {
      this.bullet[this.timer / 15] = new Bullet(this.img.rotation + 90, 10);
    }
  }
  else if(this.state === "Hit") {
    this.img.x += 30 * Math.cos(this.direction);
    this.img.y += 20 * Math.sin(this.direction);
    this.img.rotation += 20;

    this.bullet = [];
  }
  else if(this.state === "Fitten") {
    this.bullet = [];
  }

  for(var i = 0; i < this.bullet.length; i++) {
    if(this.bullet[i]) this.bullet[i].update();
  }

  this.collisionCheck();

}

Hi.prototype.hit = function() {
  this.state = "Hit";
}

Hi.prototype.fit = function() {
  this.state = "Stop";
}

Hi.prototype.fire = function(direction, speed) {
  this.bullet[0] = new Bullet(direction, speed);
  createjs.Sound.play('shot');
}

Hi.prototype.collisionCheck = function() {
  for(var i = 0; i < this.bullet.length; i++) {
    var bullet = this.bullet[i];

    if(bullet) {
      var lPoint = bullet.collider.localToLocal(0, 0, mon.colliderL);
      var rPoint = bullet.collider.localToLocal(0, 0, mon.colliderR);

      var lIsHit = mon.colliderL.hitTest(lPoint.x, lPoint.y)
      var rIsHit = mon.colliderR.hitTest(rPoint.x, rPoint.y)

      if(lIsHit === true && !mon.invisibleFlag) {
        console.log("Hit!!!");
        mon.damage();
      }
      if(rIsHit === true && !mon.invisibleFlag) {
        console.log("Hit!!!");
        mon.damage();
      }

      if(bullet.lifeTime > 180) {
        stage.removeChild(this.bullet[i].img);
        stage.removeChild(this.bullet[i].collider);
        this.bullet[i] = null;
      }
    }
  }
}
