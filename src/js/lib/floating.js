let width, height, largeHeader, canvas, hearts, flowers, target, context, animateHeader = true;
let _HW = 34, _HH = 30, _FW = 18, _FH = 38,defaultTime = 200, time, active = true ,src;

// Main
function start(obj) {
  if (active) {
    // create particles
    hearts = [];
    flowers = [];
    src = obj.imgSrc;
    for (let x = 0; x < width * 0.06; x++) {
      let c;
      if (obj.type == 'flowers') {
        c = new Flowers();
      } else if (obj.type == 'heart') {
        c = new Heart();
      } else {
        console.error('请传入type');
        return;
      }
      hearts.push(c);
    }
    time = obj.time?obj.time:defaultTime;
    active = false;
    animate();
  }
}

// init();
// addListeners();
// Event handling
//   function addListeners() {
//     window.addEventListener('scroll', scrollCheck);
//     window.addEventListener('resize', resize);
//   }
//   function scrollCheck() {
//     if (document.body.scrollTop > height) animateHeader = false;
//     else animateHeader = true;
//   }
//   function resize() {
//     width = window.innerWidth;
//     height = window.innerHeight;
//     largeHeader.style.height = height + 'px';
//     canvas.width = width;
//     canvas.height = height;
//   }
function init() {
    largeHeader = document.getElementById('test-content');
    width = largeHeader.offsetWidth;
    // height = largeHeader.offsetWidth;
    height = window.innerHeight;
    // console.log(document.getElementById('test-content').offsetWidth);
    target = {x: 0, y: height};
    // largeHeader.style.height = height + 'px';
    canvas = document.getElementById('demo-canvas');
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
}
function animate() {
  if (animateHeader) {
    context.clearRect(0, 0, width, height);
    for (let i in hearts) {
      hearts[i].draw();
    }
  }
  time--;
  if (time == 0) {
    active = true;
    window.cancelAnimationFrame(animate);
    return;
  }
  requestAnimationFrame(animate);
}
// Canvas manipulation
function Heart() {
  let _this = this;
  // constructor
  (function () {
    _this.pos = {};
    init();
  })();

  function init() {
    let _x = Math.random() * width;
    _this.pos.x = (width - _x)<_HW?_x-_HW:_x;
    // _this.pos.x = Math.random() * width;
    _this.pos.y = height + parseInt(Math.random() * 10,10);
    _this.alpha = 0.1 + Math.random() * 0.3;
    _this.scale = 0.1 + Math.random() * 0.3;
    _this.velocity = parseInt(Math.random() * 10 + 5, 10);
    // _this.velocity = parseInt(Math.random() * 10 + 5, 10);
    _this.img = new Image();
    _this.img.src = src;
  }

  this.draw = function () {
    if (_this.pos.y <= -100) {
      // init();
    }
    _this.pos.y -= _this.velocity;
    // _this.alpha -= 0.0005;
    context.drawImage(_this.img, _this.pos.x, _this.pos.y, _HW, _HH);
  }
}
function Flowers() {
  let _this = this;
  (function () {
    _this.pos = {};
    init();
  })();
  function init() {
    //rect(x,y,width,height)
    // _this.pos.x = Math.random() * width;
    let _x = Math.random() * width;
    _this.pos.x = (width - _x)<_FW?_x-_FW:_x;
    _this.pos.y = height + parseInt(Math.random() * 10,10);
    _this.width = 0.1 + Math.random() * 10;
    _this.height = 0.1 + Math.random() * 10;
    _this.alpha = 0.1 + Math.random() * 0.3;
    _this.velocity = parseInt(Math.random() * 10 + 5, 10);
    _this.img = new Image();
    _this.img.src = src;
  }

  _this.draw = function () {
    if (_this.alpha <= 0) {
      // init();
    }
    _this.pos.y -= _this.velocity;
    // _this.alpha -= 0.0005;
    context.drawImage(_this.img, _this.pos.x, _this.pos.y, _FW, _FH);
  }

}
export {start,init}
