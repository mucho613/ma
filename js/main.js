window.addEventListener('load', initialize);

var keyFlag;

function initialize() {
  stage = new createjs.Stage('canvas');  
  titleFlag = true;
  keyFlag = new Array();

  mon = new Mon();
  hi = new Hi();

  stage.addChild(mon.container);
  stage.addChild(hi.img);

  bg = document.getElementById('background');
  var bg_video = new createjs.DOMElement(bg);
  stage.addChild(bg_video);

  document.addEventListener('keydown', function(e) {
    keyFlag[e.keyCode] = true;

  });
  document.addEventListener('keyup', function(e) {
    keyFlag[e.keyCode] = false;
  });

  document.addEventListener('mousedown', function(e) {
    if(titleFlag === true) start();
    titleFlag = false;
    createjs.Sound.play('start');
  })

  titleScreen = new createjs.Bitmap('image/title.png');
  dictionary_ma = new createjs.Bitmap("image/dictionary_ma.png");
  dictionary_mon = new createjs.Bitmap("image/dictionary_mon.png");
  dictionary_hi = new createjs.Bitmap("image/dictionary_hi.png");

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", update);

  createjs.Sound.registerSound('sound/approach.wav', 'approach');
  createjs.Sound.registerSound('sound/charge.mp3', 'charge');
  createjs.Sound.registerSound('sound/damage.mp3', 'damage');
  createjs.Sound.registerSound('sound/dictionary.mp3', 'dictionary');
  createjs.Sound.registerSound('sound/fit.mp3', 'fit');
  createjs.Sound.registerSound('sound/hit.mp3', 'hit');
  createjs.Sound.registerSound('sound/shot.mp3', 'shot');
  createjs.Sound.registerSound('sound/start.mp3', 'start');
  
  title();

  stage.update();
}

function title() {
  mon.title();
  hi.title();
  
  stage.addChild(titleScreen);
}

function start() {
  stage.removeChild(titleScreen);

  mon.start();
  hi.start();
}

function reset() {
  mon.reset();
  hi.reset();
}

function update() {
  mon.update();
  hi.update();

  stage.update();
}

function showDictionary(text) {
  if(text === "ma") {
    setTimeout(function() {
      stage.addChild(dictionary_ma);
      createjs.Sound.play('dictionary');
    }, 1500);
    setTimeout(function() {
      stage.removeChild(dictionary_ma);
      reset();
    }, 2500);
  }
  else if(text === "mon") {
    setTimeout(function() {
      stage.addChild(dictionary_mon);
      createjs.Sound.play('dictionary');
    }, 1000);
    setTimeout(function() {
      stage.removeChild(dictionary_mon);
      reset();
    }, 2000);
  }
  else if(text === "hi") {
    setTimeout(function() {
      stage.addChild(dictionary_hi);
      createjs.Sound.play('dictionary');
    }, 1500);
    setTimeout(function() {
      stage.removeChild(dictionary_hi);
      reset();
    }, 2500);
  }
}
