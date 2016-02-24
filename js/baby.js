/**
 * Created by Administrator on 2015/10/19.
 */
var  babyObj = function (){
    this.x = 0;
    this.y = 0;
    this.angle = 0;

    this.babyTailTimer = 0;//С��β�Ͱڶ�Ƶ��
    this.babyTailCount = 0;//С��β�ͼ�����

    this.babyEyeCount = 0;//С���۾�������
    this.babyEyeTimer = 0 ;//С��գ��Ƶ��
    this.babyEyeInterval = 1000;//ͼƬ���ڵ�ʱ��

    this.babyBodyTimer = 0;//С������仯Ƶ��
    this.babyBodyCount = 0;//С������ͼƬ������
};
babyObj.prototype.init = function (){
    this.x = canW * .5 - 50;
    this.y = canH * .5 + 50;
    this.angle = 0;
};
babyObj.prototype.draw = function (){

    this.x = lerpDistance(mom.x,this.x,.99);
    this.y = lerpDistance(mom.y,this.y,.99);

    var deltaY = mom.y - this.y;//y�������
    var deltaX = mom.x - this.x;//x�������

    var beta = Math.atan2(deltaY,deltaX) + Math.PI;
    this.angle = lerpAngle(beta , this.angle, .6);

    //babyTail
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){
        this.babyTailCount = (++this.babyTailCount) % 8;
        this.babyTailTimer %= 50;
    }
//babyEye
    this.babyEyeTimer += deltaTime ;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (++this.babyEyeCount ) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.babyEyeInterval = 150 ;
        }
    }
    //baby body
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount  = ++this.babyBodyCount;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }

    }

    ctx1.save();

    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this. babyTailCount ;
    var babyEyeCount = this.babyEyeCount;
    var babyBodyCount = this.babyBodyCount;

    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width *.5 + 23, -babyTail[babyTailCount].height *.5 +3, babyTail[babyTailCount].width , babyTail[babyTailCount].height - 5);
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width *.5, -babyBody[babyBodyCount].height *.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width *.5, -babyEye[babyEyeCount].height *.5);

    ctx1.restore();
};