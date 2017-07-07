//引入html
require("../../html/index.html");
//引入sass
require("../../sass/common/com.scss");
require("../../sass/page/index.scss");
import $ from 'jquery';

class ball {
    constructor(op = {}) {
        this.args = {
            width: null,
            height: null,
            w: 10,
            h: 10,
            x: null,
            y: null,
            speedX: null,
            speedY: null,
            // symbolX: null,
            // symbolY: null,
            text: null,
            cxt: null
        };
        this.op = op;
        Object.assign(this.args, this.op);
        this.init();
    }

    init() {//初始化数据
        this.args.x = Math.round(Math.random() * (this.args.width - this.args.w));
        this.args.y = Math.round(Math.random() * (this.args.height - this.args.h));
        this.args.speedX = Math.random() * (this.args.w / 10) + 1;
        this.args.speedY = Math.random() * (this.args.h / 10) + 1;
        this.args.fillStyle = 'rgba(' + parseInt(Math.random() * 225) + ',' + parseInt(Math.random() * 225) + ',' + parseInt(Math.random() * 225) + ',1)';
        // this.args.symbolX = Math.random() >= 0.55;//true为加 false为减
        // this.args.symbolY = Math.random() >= 0.55;
    }

    draw() {
        this.args.x += this.args.speedX;
        this.args.y += this.args.speedY;
        this.args.cxt.fillStyle = this.args.fillStyle;
        this.args.cxt.fillRect(this.args.x, this.args.y, this.args.w, this.args.h);
    }

}
$(document).ready(function () {
    let canvas = $('#canvas')[0];
    let context = canvas.getContext('2d'), width = parseFloat(getComputedStyle(canvas).width),
        height = parseFloat(getComputedStyle(canvas).height);
    let balls = [], num = 1200, timer;
    //生成
    (function () {
        let t1, l1, r1, b1, t2, l2, r2, b2;
        for (let i = 0; i < num; i++) {
            function create() {
                balls[i] = new ball({
                    width: width,
                    height: height,
                    cxt: context
                });
                for (let before = i - 1; before >= 0; before--) {
                    t1 = balls[before].args.x;
                    l1 = balls[before].args.y;
                    r1 = balls[before].args.y + balls[before].args.w;
                    b1 = balls[before].args.x + balls[before].args.h;
                    t2 = balls[i].args.x;
                    l2 = balls[i].args.y;
                    r2 = balls[i].args.y + balls[i].args.w;
                    b2 = balls[i].args.x + balls[i].args.h;
                    if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {

                    } else { // 相交 撤销 balls[i]
                        balls.splice(i, 1);
                        create();
                    }
                }
            }
            create();
        }
        loop();
    })();
    //loop 大循环
    function loop() {
        //清空画布
        cancelAnimationFrame(timer);
        context.clearRect(0, 0, width, height);

        let t1, l1, r1, b1, t2, l2, r2, b2;
        for (let i = 0; i < num; i++) {
            //超出边界 必须分开判断 否则会在边界反复改变方向 进入一种死循环
            if (balls[i].args.x <= 0) { //超出左边边界
                balls[i].args.speedX = plus(balls[i].args.speedX)
            } else if ((balls[i].args.x + balls[i].args.w) >= width) {//超出右边边界
                balls[i].args.speedX = less(balls[i].args.speedX)
            }
            if (balls[i].args.y <= 0) {//超出上边边界
                balls[i].args.speedY = plus(balls[i].args.speedY)
            } else if (balls[i].args.y + balls[i].args.h >= height) {//超出下边边界
                balls[i].args.speedY = less(balls[i].args.speedY)
            }
            //测试碰撞
            t1 = balls[i].args.y + balls[i].args.speedY;
            l1 = balls[i].args.x + balls[i].args.speedX;
            r1 = balls[i].args.x + balls[i].args.w + balls[i].args.speedX;
            b1 = balls[i].args.y + balls[i].args.h + balls[i].args.speedY;
            for (let j = 0; j < num; j++) {
                if (i !== j) {
                    t2 = balls[j].args.y + balls[j].args.speedY;
                    l2 = balls[j].args.x + balls[j].args.speedX;
                    r2 = balls[j].args.x + balls[j].args.w + balls[j].args.speedX;
                    b2 = balls[j].args.y + balls[j].args.h + balls[j].args.speedY;
                    if (!(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2)) {
                        if (t1 >= t2) {
                            balls[i].args.speedY = less(balls[i].args.speedY);
                            balls[j].args.speedY = plus(balls[j].args.speedY);
                        }
                        if (l1 >= l2) {
                            balls[i].args.speedX = less(balls[i].args.speedX);
                            balls[j].args.speedX = plus(balls[j].args.speedX);
                        }
                        if (r1 >= r2) {
                            balls[i].args.speedX = plus(balls[i].args.speedX);
                            balls[j].args.speedX = less(balls[j].args.speedX);
                        }
                        if (b1 >= b2) {
                            balls[i].args.speedY = plus(balls[i].args.speedY);
                            balls[j].args.speedY = less(balls[j].args.speedY);
                        }
                    }
                }
            }
            //移动 绘制
            balls[i].draw();

        }
        timer = requestAnimationFrame(loop);
    }

    //返回正数
    function plus(num) {
        //判断为数字
        if (!isNaN(parseFloat(num))) {
            return Number(num.toString().replace('-', ''))
        }
    }

    //返回负数
    function less(num) {
        //判断为数字
        if (!isNaN(parseFloat(num))) {
            return Number('-' + num.toString().replace('-', ''))
        }
    }


});