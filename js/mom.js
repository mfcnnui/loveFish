/**
 * Created by Administrator on 2015/10/19.
 */
var momObj = function (){
    this.x=0 ;
    this.y=0;
    this.angle=0 ;//´óÓãµÄ½Ç¶È

    this.momTailTimer = 0;//ÓãÂèÂèÎ²°Í°Ú¶¯ÆµÂÊ
    this.momTailCount = 0;//ÓãÂèÂèÎ²°ÍÍ¼Æ¬µÄ¼ÆÊýÆ÷

    this.momEyeTimer = 0; //ÓãÂèÂèÕ£ÑÛÆµÂÊ
    this.momEyeCount = 0;//ÓãÂèÂèÑÛ¾¦Í¼Æ¬¼ÆÊýÆ÷
    this.momEyeInterval = 1000;//¹ÄÑÛºÍÕ£ÑÛµÄ´æÔÚÊ±¼ä

    this.momBodyCount = 0;

};
momObj.prototype. init = function (){
    this.x = canW * .5;
    this.y = canH * .5;
    this.angle = 0;
};
momObj.prototype.draw = function (){

    this.x = lerpDistance(mx,this.x,.97);
    this.y = lerpDistance(my,this.y,.97);

    var deltaY = my - this.y;//yÖá×ø±ê²î
    var deltaX = mx - this.x;//x³µ×ø±ê²î

    var beta = Math.atan2(deltaY,deltaX) + Math.PI;

    this.angle = lerpAngle(beta , this.angle, .6);

    //momTail
    this.momTailTimer += deltaTime;
    if(this.momTailTimer > 50){
        this.momTailCount = (++this.momTailCount) % 8;
        this.momTailTimer %= 50 ;
    }
    //momEye
    this.momEyeTimer += deltaTime;
    if(this.momEyeTimer > this.momEyeInterval){
        this.momEyeCount = (++this.momEyeCount ) % 2;
        this.momEyeTimer %= this.momEyeInterval;
        if(this.momEyeCount == 0){
            this.momEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.momEyeInterval = 200;
        }
    }

    ctx1.save();

    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var momTailCount = this.momTailCount;
    var momEyeCount = this.momEyeCount;
    var momBodyCount = this.momBodyCount;
    if(data.double = 1){
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width *.5, - momBodyOra[momBodyCount].height *.5);
    }else{
        ctx1.drawImage(momBodyBlu[momBodyCount], -momBodyBlu[momBodyCount].width *.5, - momBodyBlu[momBodyCount].height *.5);
    }
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width *.5 + 30, - momTail[momTailCount].height *.5);
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width *.5, - momEye[momEyeCount].height *.5);
    ctx1.restore();
};