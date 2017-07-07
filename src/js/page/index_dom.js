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
            symbolX: null,
            symbolY: null,
            text:null
        };
        this.div = document.createElement('div');
        Object.assign(this.args, op);
        this.init();
    }

    init() {//初始化数据
        this.args.x = Math.round(Math.random() * (this.args.width - this.args.w));
        this.args.y = Math.round(Math.random() * (this.args.height - this.args.h));
        this.args.speedX = Math.random() * (this.args.w / 10) + 1;
        this.args.speedY = Math.random() * (this.args.h / 10) + 1;
        this.args.symbolX = Math.random() >= 0.55;//true为加 false为减
        this.args.symbolY = Math.random() >= 0.55;
    }

    create() {
        let _div = this.div;
        _div.setAttribute('class','ball');
        _div.style.width = this.args.w + 'px';
        _div.style.height = this.args.h + 'px';
        // _div.style.backgroundColor = 'rgb(' + parseInt(Math.random() * 225) + ',' + parseInt(Math.random() * 225) + ',' + parseInt(Math.random() * 225) + ')';
        _div.style.backgroundColor = 'black';
        _div.style.color = '#fff';
        // _div.innerHTML = this.args.text;
        return this.div;
    }
}
//待加效果 重力与弹性效果 需要大改
$(document).ready(function () {
    let _box = $('.content');
    let balls = [], num = 100, frag = document.createDocumentFragment(), width = _box.width(), height = _box.height(),
        ballw = 10,//ball的宽
        ballh = 10,//ball的长
        regionArr = [], //区域x,y区间数值
        rowRegion = 3, //列区域个数
        colRegion = 3, //行区域个数
        regionBalls = [];//regionBalls 储存同一区域的球
    region();
    create();
    loop();
    /**
     * 添加
     */
    function create() {
        let t1, b1, l1, r1, t2, b2, l2, r2;
        for (let i = 0; i < num; i++) {
            function contrast() {
                balls[i] = new ball({
                    width: width,
                    height: height,
                    w: ballw,
                    h: ballh,
                    text:i
                });
                for (let before = i - 1; before >= 0; before--) {
                    //与已经生成的ball 进行位置对比 保证不相交 那就销毁当前 重新生成一个
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
                        contrast();
                    }
                }
            }

            contrast();
            frag.appendChild(balls[i].create());
            $('.content').append(frag);
        }
    }

    /**
     * 给每个区域的x,y区间赋值
     */
    function region() {
        let frag2 = document.createDocumentFragment();
        for (let row = 0; row < rowRegion; row++) {
            for (let col = 0; col < colRegion; col++) {
                let subRegion = {
                    startX: (col / colRegion) * width,
                    endX: ((col + 1) / colRegion) * width,
                    startY: (row / rowRegion) * height,
                    endY: ((row + 1) / rowRegion) * height
                };
                regionArr.push(subRegion);
                regionBalls.push([]);
                //开发调试用的
                let _div = document.createElement('div');
                _div.setAttribute('class','subRegion');
                _div.style.backgroundColor = 'rgb(' + parseInt(Math.random() * 225) + ',' + parseInt(Math.random() * 225) + ',' + parseInt(Math.random() * 225) + ')';
                _div.style.left = subRegion.startX + 'px';
                _div.style.top = subRegion.startY + 'px';
                _div.style.width = subRegion.endX - subRegion.startX + 'px';
                _div.style.height = subRegion.endY - subRegion.startY + 'px';
                frag2.append(_div);
            }
        }
        // console.log(regionArr)
        $('div.content').append(frag2);
    }


    /**
     * 大循环
     */
    function loop() {
        let _loop, _timer, _divs = $('.content>div.ball');
        _loop = function () {
            cancelAnimationFrame(_timer);
            //碰撞检测
            collision();
            //移动
            move(_divs);
            _timer = requestAnimationFrame(_loop);

        };
        _loop();
    }

    /**
     * 移动ball
     */
    function move(_divs) {
        for (let current = 0, _len = _divs.length; current < _len; current++) {
            //超出边界 必须分开判断 否则会在边界反复改变方向 进入一种死循环
            if (balls[current].args.x <= 0) { //超出左边边界
                balls[current].args.speedX = plus(balls[current].args.speedX)
            } else if ((balls[current].args.x + balls[current].args.w) >= width) {//超出右边边界
                balls[current].args.speedX = less(balls[current].args.speedX)
            }
            if (balls[current].args.y <= 0) {//超出上边边界
                balls[current].args.speedY = plus(balls[current].args.speedY)
            } else if (balls[current].args.y + balls[current].args.h >= height) {//超出下边边界
                balls[current].args.speedY = less(balls[current].args.speedY)
            }

            let _left = balls[current].args.x + balls[current].args.speedX;
            let _top = balls[current].args.y + balls[current].args.speedY;
            _divs[current].style.left = _left + "px";
            _divs[current].style.top = _top + "px";
            balls[current].args.x = _left;
            balls[current].args.y = _top;
        }//移动完毕
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
    /**
     * 碰撞检测
     */
    function collision() {
        //这里计算的时候 下一步可能碰上去了，或已相交了 所以需要算next 及时反弹
        let t1, b1, l1, r1, t2, b2, l2, r2;
        //清空regionBalls
        regionBalls = [];
        for (let i = 0; i < regionArr.length; i++){
            regionBalls.push([]) ;
        }
        //遍历所有 将所有ball 分到所在区域
        for (let current = 0, _len = balls.length; current < _len; current++) {
            t1 = balls[current].args.y;
            l1 = balls[current].args.x;
            r1 = balls[current].args.x + balls[current].args.w ;
            b1 = balls[current].args.y + balls[current].args.h ;
            //辨别ball在regionArr里哪个区域
            for (let region = 0; region < regionArr.length; region++) {
                let subregion = regionArr[region];
                t2 = subregion.startY ;
                l2 = subregion.startX;
                r2 = subregion.endX;
                b2 = subregion.endY;
                //((t1 >= subregion.startY && t1 < subregion.endY) || (b1 >= subregion.startY && b1 < subregion.endY)) && ((l1 >= subregion.startX && l1 < subregion.endX) || (r1 >= subregion.startX && r1 < subregion.endX))
                if (!(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2)) {
                    regionBalls[region].push(balls[current]);
                }else{
                    //在当前区域内 储存起来
                    // regionBalls[region].push(balls[current]);
                }
            }


        }
        // console.log(regionBalls)

        //遍历regionBalls 对每个region区域的每个ball作碰撞检测
        for (let region = 0; region < regionBalls.length; region++) {
            let balls = regionBalls[region];
            //在同一个区域里面的ball 做碰撞比较
            for (let current = 0, _len = balls.length; current < _len; current++) {
                t1 = balls[current].args.y + balls[current].args.speedY;
                l1 = balls[current].args.x + balls[current].args.speedX;
                r1 = balls[current].args.x + balls[current].args.w + balls[current].args.speedX;
                b1 = balls[current].args.y + balls[current].args.h + balls[current].args.speedY;
                for (let after = 0; after < _len; after++) {
                    if (after !== current) {
                        t2 = balls[after].args.y + balls[after].args.speedY;
                        l2 = balls[after].args.x + balls[after].args.speedX;
                        r2 = balls[after].args.x + balls[after].args.w + balls[after].args.speedX;
                        b2 = balls[after].args.y + balls[after].args.h + balls[after].args.speedY;
                        if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {//未碰撞

                        } else {
                            //改变速度的方向 需要（优化）大小
                            //碰撞 必须分开判断 否则 两个以上的物体碰撞会出现speed反复改变，进入一种死循环
                            if (t1 >= t2) {
                                balls[current].args.speedY = less(balls[current].args.speedY);
                                balls[after].args.speedY = plus(balls[after].args.speedY);
                            }
                            if (l1 >= l2) {
                                balls[current].args.speedX = less(balls[current].args.speedX);
                                balls[after].args.speedX = plus(balls[after].args.speedX);
                            }
                            if (r1 >= r2) {
                                balls[current].args.speedX = plus(balls[current].args.speedX);
                                balls[after].args.speedX = less(balls[after].args.speedX);
                            }
                            if (b1 >= b2) {
                                balls[current].args.speedY = plus(balls[current].args.speedY);
                                balls[after].args.speedY = less(balls[after].args.speedY);
                            }

                        }
                    }
                }
            }
        }

        /** 最简单算法 遍历balls 每个块与除其外的块进行碰撞测试 **/
        // for (let current = 0, _len = balls.length; current < _len; current++) {
        //     t1 = balls[current].args.y + balls[current].args.speedY;
        //     l1 = balls[current].args.x + balls[current].args.speedX;
        //     r1 = balls[current].args.x + balls[current].args.w + balls[current].args.speedX;
        //     b1 = balls[current].args.y + balls[current].args.h + balls[current].args.speedY;
        //     for (let after = 0; after < _len; after++) {
        //         if (after !== current) {
        //             t2 = balls[after].args.y + balls[current].args.speedY;
        //             l2 = balls[after].args.x + balls[current].args.speedX;
        //             r2 = balls[after].args.x + balls[after].args.w + balls[current].args.speedX;
        //             b2 = balls[after].args.y + balls[after].args.h + balls[current].args.speedY;
        //             if (!(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2)) {//碰撞
        //                 //改变速度的方向 需要（优化）大小
        //                 //碰撞 必须分开判断 否则 两个以上的物体碰撞会出现speed反复改变，进入一种死循环
        //                 if (t1 >= t2) {
        //                     balls[current].args.speedY = less(balls[current].args.speedY);
        //                     balls[after].args.speedY = plus(balls[after].args.speedY);
        //                 }
        //                 if (l1 >= l2) {
        //                     balls[current].args.speedX = less(balls[current].args.speedX);
        //                     balls[after].args.speedX = plus(balls[after].args.speedX);
        //                 }
        //                 if (r1 >= r2) {
        //                     balls[current].args.speedX = plus(balls[current].args.speedX);
        //                     balls[after].args.speedX = less(balls[after].args.speedX);
        //                 }
        //                 if (b1 >= b2) {
        //                     balls[current].args.speedY = plus(balls[current].args.speedY);
        //                     balls[after].args.speedY = less(balls[after].args.speedY);
        //                 }
        //             }
        //         }
        //     }
        // }
    }
});