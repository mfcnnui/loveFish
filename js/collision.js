/**
 * Created by Administrator on 2015/10/19.
 */
/**
 * �жϴ���͹�ʵ�ľ�����--��ײ
 */
function momFruitCollision(){
    if(!data.gameOver){
        for(var i = 0 ; i < fruit.num ; i ++){
            if(fruit.alive[i]){
                var l = calLength2(fruit.x[i] , fruit.y[i] , mom.x ,mom.y);
                if(l < 900){
                    eat[i].play();
                    fruit.dead(i);
                    data.fruitNum ++;
                    mom.momBodyCount ++;
                    if(mom.momBodyCount > 7){
                        mom.momBodyCount = 7;
                    }
                    if(fruit.fruitType[i] = "blue"){
                        data.double = 2;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }else{
            bgAudio.load();
        if(!looseAudio.ended){
            looseAudio.play()
        }
    }
}
//mom baby collision  ��������㱦������ײ�ж�
function momBabyCollision(){
    if(data.fruitNum > 0 && !data.gameOver){
        var l = calLength2(mom.x , mom.y ,baby.x , baby.y);
        if(l < 900){
            //baby recover
            momAudio.play();
            baby.babyBodyCount = 0;
            mom.momBodyCount = 0;
            data.addScore();
            halo.born(baby.x,baby.y);
        }
    }

}