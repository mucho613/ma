var Mon = function() {
  this.distance = 250;

  this.container = new createjs.Container();

  this.imgMonL = new createjs.Bitmap('image/left.png');
  this.imgMonR = new createjs.Bitmap('image/right.png');

  this.container.addChild(this.imgMonL);
  this.container.addChild(this.imgMonR);

  this.imgMonL.regX = 128;
  this.imgMonL.regY = 128;
  this.imgMonR.regX = 128;
  this.imgMonR.regY = 128;

  this.imgMonL.x = 128;
  this.imgMonL.y = 128;
  this.imgMonR.x = stage.canvas.width - 128;
  this.imgMonR.y = 128;

  this.container.setBounds.x = 1920;
  this.container.setBounds.y = 256;

  this.container.regX = 960;
  this.container.regY = 128;

  this.container.x = stage.canvas.width / 2;
  this.container.y = stage.canvas.height / 2;

  createjs.Sound.registerSound('sound/approach.wav', 'approach');
}

Mon.prototype.update = function() {
  // 門をマウスで操作する
  this.container.rotation = Math.atan2(stage.mouseY - stage.canvas.height / 2, stage.mouseX - stage.canvas.width / 2) * 180 / Math.PI;

  if(keyFlag[83]) {
    this.approach();
  }
  else if(keyFlag[68]) {
    this.deviate();
  }

  // 門と日の距離を補正
  if(this.distance > 500) this.distance = 500;

  else if(this.distance < 50) {
    this.distance = 50;

    if(Math.abs(hi.img.rotation + 360 - (this.container.rotation % 360) % 360 < 15 )) console.log("OK!");
    else hi.hit();
  }

  this.imgMonL.x = stage.canvas.width / 2 - this.distance;
  this.imgMonL.y = 128;
  this.imgMonR.x = stage.canvas.width / 2 + this.distance;
  this.imgMonR.y = 128;
}

Mon.prototype.approach = function() {
  this.distance -= 40;
}

Mon.prototype.deviate = function() {
  this.distance += 10;
}