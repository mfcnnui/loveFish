/**
 * Created by Administrator on 2015/10/14.
 */
var aneObj = function(){
    //start point,control point,end point(sin)
    this.rootX = [];
    this.headX = [];
    this.headY = [];
    this.alpha = 0; //海葵的正弦值角度
    this.amp  = [];//海葵的振幅
};
aneObj.prototype .num = 50;
/**
 * 初始化
 */
aneObj.prototype.init = function (){

    for(var i = 0 ; i < this.num ; i++){
        this.rootX[i] = i * 24 +Math.random() * 30;
        this.headX[i] = this.rootX[i];
        this.headY[i] = canH - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 +50;
    }
};
/**
 * 画海葵
 */
aneObj.prototype.draw = function(){
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);

    ctx2.save();
    ctx2.globalAlpha = .6;
    ctx2.strokeStyle = "#3b154e";
    ctx2.lineWidth = 20;
    ctx2.lineCap =  "round";
    ctx2.shadowBlur = 1;
    ctx2.shadowColor = "#9b154e";
    for(var i = 0 ; i<this.num ; i ++){
        //beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootX[i],canH);
        this.headX[i] = this.rootX[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootX[i] , canH - 100 , this.headX[i],this.headY[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};