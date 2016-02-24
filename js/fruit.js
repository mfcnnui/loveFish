/**
 * Created by Administrator on 2015/10/14.
 */
var  fruitObj = function (){
    this.alive = [];//布尔值数组;是否活着
    this.orange = new Image();
    this.blue = new Image();
    this.aneNO = [];
    this.x = [];
    this.y = [];
    this.spd = [];
    this.fruitType = [];
    this.l = [];//图片的长度
};
fruitObj.prototype.num = 20;
fruitObj.prototype.init = function () {
    for(var i = 0; i < this.num ; i++){
        this.alive[i] = false;
        this.aneNO[i] = 0;
        this.x[i] = 10;
        this.y[i] = 10;
        this.l[i] = 0;
        this.fruitType[i] = "";
        this.spd[i]= Math.random()*0.017 + 0.003;//[0.003~0.02]
    }
    this.orange.src = "images/fruit.png";
    this.blue.src = "images/blue.png";
};
fruitObj.prototype.draw = function (){

    ctx2.shadowBlur = 2;
    ctx2.shadowColor = "white";
    ctx2.save();
    for(var i = 0 ; i< this.num ; i ++){
        if(this.alive[i]){
            if(this.fruitType[i] == "blue"){
                var pic = this.blue;
            }else{
                var pic = this.orange;
            }
            if(this.l[i] <= 15){//grow
                var NO = this.aneNO[i];
                this.x[i] = ane.headX[NO];
                this.y[i] = ane.headY[NO];
                this.l[i] += this.spd[i] * deltaTime;
                //console.log(this.x[i])
            }else{
                this.y[i]  -= this.spd[i] * 3 * deltaTime;
            }
            ctx2.drawImage(pic , this.x[i] - this.l[i] * .5,this.y[i] - this.l[i] * .5 , this.l[i] , this.l[i]);
            if(this.y[i] < 10){
                this.alive[i]= false;
            }
        }
    }
    ctx2.restore();
};
fruitObj.prototype.born = function (i) {

    this.aneNO[i] = Math.floor(Math.random() * ane.num);
    this.l[i] = 0 ;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.2){
        this.fruitType[i]= "blue";
    }else{
        this.fruitType[i]= "orange";
    }

};
var fruitMonitor = function (){
    var num = 0 ;
    for(var i = 0 ; i < fruit.num; i ++){
        if(fruit.alive[i]){
            num ++;
        }
        if(num < 15){
            sendFruit();
            return;
        }
    }
};
var sendFruit = function (){
    for(var i = 0 ; i < fruit.num ; i ++){
        if(! fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
};

fruitObj.prototype.dead = function  (i){
    this.alive[i] = false;
};