window.addEventListener('load', initialize);

var keyFlag;

function initialize() {
  stage = new createjs.Stage('canvas');  

  keyFlag = new Array();

  mon = new Mon();
  hi = new Hi();

  stage.addChild(mon.container);
  stage.addChild(hi.img);

  netsu = new Netsu(0, 8);

  document.addEventListener('keydown', function(e) {
    keyFlag[e.keyCode] = true;

    // createjs.Sound.play('approach');
  });
  document.addEventListener('keyup', function(e) {
    keyFlag[e.keyCode] = false;
  });

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", update);
  stage.update();
}

function update() {
  mon.update();
  hi.update();
  netsu.update();

  stage.update();
}