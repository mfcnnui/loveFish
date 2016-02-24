/**
 * Created by Administrator on 2015/10/20.
 */
var dataObj = function (){
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
};
dataObj.prototype.draw = function (){

    ctx1.save();
    ctx1.fillStyle = "#ffffff";
    ctx1.shadowBlur = 25;
    ctx1.shadowColor = "#ffffff";
    ctx1.fillText("SCORE:"+this.score,canW *.5, 50);
    if(this.gameOver){
        this.alpha += deltaTime * 0.0005;
        if(this.alpha > 1){
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
        ctx1.fillText("+_+ GAME  OVER",canW *.5, canH *.5);
        ctx1.fillText("^_^ 点击再来一次",canW *.5, canH *.5+50);
    }
    ctx1.restore();
};
dataObj.prototype.addScore = function (){
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
};
