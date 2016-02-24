/**
 * Created by Administrator on 2015/10/14.
 */
var can1;
var can2;
var ctx1;
var ctx2;

var lastTime;//��һ֡��ʱ��
var deltaTime; //��֮֡ǰʱ���

var bgPic = new Image();
var playPic = new Image();
var play = new Image();
var push = new Image();

var canW ;
var canH;

var ane;

var fruit ;

var mom;

var baby;

var mx ;

var my;

var dust;//Ʈ����
var dustPic = [];

var babyTail = [];//С��β��ÿ֡ͼƬ��
var babyEye = [];//С���۾�ͼƬ����գ�ۺ͹�������״̬
var babyBody = [];//С������ͼƬ��

var momTail = [];//������β��ÿ֡ͼƬ��
var momEye= [];//��������۾�ͼƬ��
var momBodyOra = [];//������Ļ�ɫ����ͼƬ��
var momBodyBlu = [];//���������ɫ����ͼƬ��

var data;

var wave;

var halo;

var isPlay = false;//�ж���Ϸ�Ƿ��Ѿ���ʼ

var intervalId;

var  eat = [];//����Թ�ʵ��������


var momAudio;

var bgAudio = new Audio();
bgAudio.src = "audio/bg.mp3";

var looseAudio;

document.body.onload = gameStart;


function gameStart(){
    init();
    bgAudio.loop = true;
    playPic.onload = function(){
        var playW = play.width;
        var playH  = play.height;
        ctx2.save();
        ctx2.drawImage(playPic,0,0,canW,canH);
        ctx2.drawImage(play,canW *.5 - playW *.5,canH *.5 - playH *.5,playW,playH);
        ctx2.fillStyle = "#ffffff";
        ctx2.font = "20px Verdana";
        ctx2.textAlign = "center";
        ctx2.fillText("1、用鼠标控制鱼妈妈吃海葵喂鱼宝宝",canW *.5, canH - 200);
        ctx2.fillText("2、在鱼宝宝身体变之前喂食鱼宝宝，否则游戏结束",canW *.5, canH - 170);
        ctx2.fillText("3、尽量保证鱼妈妈每次都能吃到一颗蓝色海葵来得到更高的分数！",canW *.5, canH - 140);
        ctx2.fillText("4、你可以在游戏过程中随时点击游戏界面来暂停/开始/或者重新游戏！",canW *.5, canH - 110);
        ctx2.fillText("5、好了，点击界面来开始游戏吧^_^！",canW *.5, canH - 80);
        ctx2.restore();
    };
    lastTime = Date.now();
    deltaTime = 0;
    var $can1 = $("#canvas1");
    $can1.click(function(){
        if(!isPlay){
            bgAudio.play();
            cancelAFrame(intervalId);
            gameLoop();
            isPlay = true;
        }else if(isPlay && !data.gameOver){
            bgAudio.pause();
            cancelAFrame(intervalId);
            isPlay = false;
            ctx2.drawImage(push,canW *.5 - push.width *.5,canH *.5 - push.height *.5,push.width,push.height);
        }else{
            init();
            cancelAFrame(intervalId);
            gameLoop();
            bgAudio.play();
            isPlay = true;
        }
    });
}
function init(){
    //���canvas����
    can1 = $("#canvas1").get(0);
    ctx1 = can1.getContext("2d");
    can2 = $("#canvas2").get(0);
    ctx2 = can2.getContext("2d");

    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";

    can1.addEventListener("mousemove",onMouseMove,false);

    bgPic.src = "images/background.jpg";
    playPic.src = "images/cover.png";
    play.src = "images/play.png";
    push.src = "images/push.png";

    canW = can1.width;
    canH = can1.height;


    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    data = new dataObj();
    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    mx = canW * .5;
    my = canH *.5;

    dust = new dustObj();
    dust.init();

    momAudio = new Audio();
    momAudio.src = "audio/success.wav";

    looseAudio = new Audio();
    looseAudio.src = "audio/loose.mp3";

    for(var i = 0 ; i < 7 ; i++){
        dustPic[i] = new Image();
        dustPic[i].src = "images/dust" + i + ".png";
    }

    for(var i = 0 ; i < 8 ; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "images/bigTail" + i + ".png";
    }

    for(var i = 0 ; i < 2 ; i ++){
        babyEye[i] = new Image();
        babyEye[i].src = "images/babyEye"+ i + ".png"
    }

    for(var i = 0 ; i < 20 ; i ++){
        babyBody[i] = new Image();
        babyBody[i].src = "images/babyFade"+ i + ".png"
    }

    for(var i = 0; i < 8 ; i ++){
        momTail[i] = new Image();
        momTail[i].src = "images/bigTail" + i + ".png";
    }

    for(var i = 0 ; i < 2 ; i ++){
        momEye[i] = new Image();
        momEye[i].src = "images/bigEye"+ i + ".png"
    }

    for(var i = 0 ; i < 8 ; i ++){
        momBodyOra[i] = new Image();
        momBodyBlu[i] = new Image();
        momBodyOra[i].src =  "images/bigSwim" + i + ".png";
        momBodyBlu[i].src =  "images/bigSwimBlue" + i + ".png";
    }

    for(var i=0 ; i < fruit.num ; i ++){
        eat[i] = new Audio();
        eat[i].src = "audio/eatFruit.mp3";
    }
}
function gameLoop(){
    intervalId  = requestAnimFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40) deltaTime = 40;

    fruitMonitor();
    drawBackground();
    ane.draw();
    fruit.draw();
    ctx1.clearRect(0,0,canW,canH);
    mom.draw();
    baby.draw();
    momFruitCollision();
    momBabyCollision();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX || e.layerX){

            mx  = e.offsetX == undefined ? e.layerX : e.offsetX;
            my  = e.offsetY == undefined ? e.layerY : e.offsetY;
        }
    }
}
