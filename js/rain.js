var canvas = document.querySelector(".raining");//获取class为.raning的控件
var w, h;
~~ function setSize() { //定义canvas的宽高，让他跟浏览器的窗口的宽高相同
    window.onresize = arguments.callee;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
}();

var canCon = canvas.getContext("2d"); //建立2d画板
var arain = []; //新建数组,储存雨滴
//
function random(min, max) { //返回最小值到最大值之间的值
    return Math.random() * (max - min) + min;
}

function rain() {};
rain.prototype = {
    init: function() { //变量初始化
        this.x = random(0, w); //在0-w之间生成雨滴
        this.vx = 0.5;
        this.y = 0;
        this.vy = random(5, 10);
        this.h = random(0.9 * h, h); //地板高度
        this.r = 1; //雨滴绽放的半径
        this.vr = 1;
    },
    draw: function() {
        if(this.y < this.h) {
            canCon.beginPath(); //拿起一支笔
            canCon.fillStyle = "#CCC"; //笔墨的颜色
            canCon.fillRect(this.x, this.y, 1, 10); //想象画一个雨滴
        } else {
            canCon.beginPath(); //拿起一支笔
            canCon.strokeStyle = "#CCC"; //笔墨的颜色
            canCon.arc(this.x, this.y, this.r, 0, Math.PI,1); //想象画一个半圆
            canCon.stroke(); //下笔作画
        }
    },
    move: function() {
        if(this.y < this.h) { //位置判断，让雨滴下落
            this.y += this.vy;
            this.x += this.vx;
        } else {
            if(this.r < 10) { //落下后绽放的大小
                this.r += this.vr;
            } else {
                this.init(); //放完后回归变量原点
            }

        }
        this.draw(); //开始作画

    }
}

function createrain(num) {
    for(var i = 0; i < num; i++) {
        setTimeout(function() {
            var raing = new rain(); //创建一滴雨
            raing.init();
            raing.draw();
            arain.push(raing);
        }, 150 * i) //每隔150ms下落一滴雨
    }
}
createrain(40); //雨滴数量
setInterval(function() {
    canCon.fillStyle = "rgba(0,0,0,0.08)"; //拿起一支透明0.13的笔		
    canCon.fillRect(0, 0, w, h); //添加蒙版 控制雨滴长度
    for(var item of arain) {
        //item of arain指的是数组里的每一个元素
        //item in arain指的是数组里的每一个元素的下标（包括圆形连上的可遍历元素）
        item.move(); //运行整个move事件
    }
}, 500 / 60); //下落时间

