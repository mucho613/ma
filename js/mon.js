var Mon = function() {
  this.state = "Appear";
  this.invisibleFlag = false;
  this.rotation = 0;
  this.distance = 1000;

  this.distanceFarLimit = 500;
  this.distanceNearLimit = 50;

  this.invisibleTimer;
  this.displayFlag;

  this.imgMonL = new createjs.Bitmap('image/left.png');
  this.imgMonR = new createjs.Bitmap('image/right.png');

  stage.addChild(this.imgMonL);
  stage.addChild(this.imgMonR);

  this.imgMonL.regX = 128;
  this.imgMonL.regY = 128;
  this.imgMonR.regX = 128;
  this.imgMonR.regY = 128;

  this.imgMonL.x = 128;
  this.imgMonL.y = 128;
  this.imgMonR.x = stage.canvas.width - 128;
  this.imgMonR.y = 128;

  this.colliderL = new createjs.Shape();
  this.colliderL.graphics.beginFill("DarkRed");
  this.colliderL.graphics.moveTo(-35, -110);
  this.colliderL.graphics.lineTo(35, -110);
  this.colliderL.graphics.lineTo(35, 60);
  this.colliderL.graphics.lineTo(-35, 60);
  this.colliderL.graphics.lineTo(-35, -110);
  this.colliderL.alpha = 0;

  this.colliderR = new createjs.Shape();
  this.colliderR.graphics.beginFill("DarkRed");
  this.colliderR.graphics.moveTo(-35, -110);
  this.colliderR.graphics.lineTo(35, -110);
  this.colliderR.graphics.lineTo(35, 60);
  this.colliderR.graphics.lineTo(-35, 60);
  this.colliderR.graphics.lineTo(-35, -110);
  this.colliderR.alpha = 0;

  stage.addChild(this.colliderL);
  stage.addChild(this.colliderR);

  this.indicator = new createjs.Text("", "60px DIN", "Grey");
  stage.addChild(this.indicator);

}

Mon.prototype.title = function() {
  this.state = "Title";
  this.rotation = 0;
  this.imgMonL.rotation = 0;
  this.imgMonR.rotation = 0;
  this.distance = 50;
}

Mon.prototype.start = function() {
  this.state = "Start";
  this.rotation = 0;
}

Mon.prototype.reset = function() {
  this.state = "Appear";
  this.invisibleFlag = true;
  this.rotation = 0;
  this.imgMonL.rotation = 0;
  this.imgMonR.rotation = 0;
  this.distance = 1000;
}

Mon.prototype.update = function() {
  // 角度差の計算
  var diff;
  if((Math.abs(hi.img.rotation - this.rotation) % 360) < 180) {
    diff = Math.abs(hi.img.rotation - this.rotation) % 360;
  }
  else {
    diff = 360 - Math.abs(hi.img.rotation - this.rotation) % 360; 
  }
  
  if(this.state === "Title") {
    
  }
  else if(this.state === "Start") {
    this.distance += 20;
    if(this.distance > 1500) {
      hi.reset();
      this,reset();
    }
  }
  else if(this.state === "Normal") {
    // 門をマウスで操作する
    this.rotation = Math.atan2(stage.mouseY - stage.canvas.height / 2, stage.mouseX - stage.canvas.width / 2) * 180 / Math.PI;
    this.imgMonL.rotation = this.imgMonR.rotation = this.rotation;

    if(keyFlag[83]) {
      this.approach();
    }
    else if(keyFlag[68]) {
      this.deviate();
    }

    this.indicator.text = Math.floor(diff);

    // 門と日の距離を補正
    if(this.distance > this.distanceFarLimit) this.distance = this.distanceFarLimit;
    else if(this.distance < this.distanceNearLimit) {
      this.distance = this.distanceNearLimit;

      if(diff < 15) this.fit();
      else this.hit();
    }
  }
  else if(this.state === "Appear") {
    this.rotation = 0;
    this.distance -= 10;
    if(this.distance < this.distanceFarLimit) {
      this.distance = this.distanceFarLimit;
      this.invisibleTimer = 80;
      this.state = "Normal";
    };
  }
  else if(this.state === "Freeze") {
    
  }
  else if(this.state === "Hit") {
    this.distance += 20;
    this.imgMonL.rotation += 30;
    this.imgMonR.rotation += 30;
  }

  // 無敵
  if(this.invisibleFlag) {
    if(this.displayFlag) {
      this.displayFlag = false;
      this.imgMonL.alpha = this.imgMonR.alpha = 0.6;
    }
    else {
      this.displayFlag = true;
      this.imgMonL.alpha = this.imgMonR.alpha = 0.2;
    }

    this.invisibleTimer--;
    if(this.invisibleTimer < 0) {
      this.imgMonL.alpha = this.imgMonR.alpha = 1;
      this.invisibleFlag = false;
    }
  }

  let radian = this.rotation / 180 * Math.PI;

  this.imgMonL.x = -this.distance * Math.cos(radian) + stage.canvas.width / 2;
  this.imgMonL.y = -this.distance * Math.sin(radian) + stage.canvas.height / 2;
  this.imgMonR.x = this.distance * Math.cos(radian) + stage.canvas.width / 2;
  this.imgMonR.y = this.distance * Math.sin(radian) + stage.canvas.height / 2;

  this.colliderL.x = this.imgMonL.x;
  this.colliderL.y = this.imgMonL.y;
  this.colliderR.x = this.imgMonR.x;
  this.colliderR.y = this.imgMonR.y;

  this.colliderL.rotation = this.imgMonL.rotation;
  this.colliderR.rotation = this.imgMonR.rotation;
}

Mon.prototype.approach = function() {
  this.distance -= 40;
}

Mon.prototype.deviate = function() {
  this.distance += 10;
}

Mon.prototype.fit = function() {
  this.state = "Freeze";
  hi.fit();
  createjs.Sound.play('fit');
  showDictionary("ma");
}

Mon.prototype.hit = function() {
  this.state = "Freeze";
  hi.hit();
  createjs.Sound.play('hit');
  showDictionary("mon");
}

Mon.prototype.damage = function() {
  this.state = "Hit";
  createjs.Sound.play('damage');
  showDictionary("hi");
}
