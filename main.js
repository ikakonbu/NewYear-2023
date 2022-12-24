const container = document.querySelector(".gift_wrapper");
const card = document.querySelector(".card");
const number = document.querySelector("#Number");
var time = document.querySelector("#lefttime");
var nowtime = new Date();
var newyeartime = new Date('2023-01-01 00:00:00');
var timer = null;

window.addEventListener("load",function(){
  container.addEventListener("mousemove", (rotate) => {
    //カードを立体っぽくする演出
    var clientRect = container.getBoundingClientRect() ;

    let x = getTransformValue(event.clientX,window.innerWidth,40); 
    let y = getTransformValue(event.clientY,window.innerHeight,40);

    let xx = -(rotate.pageX / (clientRect.left - clientRect.right)) * 100;
    let yy = (rotate.pageY-clientRect.bottom - clientRect.top/2) / (clientRect.bottom - clientRect.top) * 100;

    let text_shadow_x =  getTransformValue(event.clientX,window.innerWidth,10);
    let text_shadow_y = getTransformValue(event.clientY,window.innerHeight,10);

    card.style.transform = "rotateY(" + x + "deg) rotateX(" + (y) + "deg)" + " translate(" + (y) +"px ," + (x) + "px)";
    number.style.textShadow = (-text_shadow_x+2) + "px " + ((text_shadow_y/1)+2) + "px 4px rgba(0, 0, 0, .2), " + (-text_shadow_x-1) + "px " + ((text_shadow_y/1)-3) + "px 4px rgba(255, 255, 255, .4)";
    card.style.backgroundImage = "radial-gradient(at " + (100-xx) + "% "+ (2*yy) + "%, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 40% , rgba(10,10,0,0.25) 70%), linear-gradient(130deg, rgba(214,214,214,0.2) 36%, rgba(229,229,229,0) 36%),linear-gradient(60deg, rgba(214,214,214,0.2) 26%, rgba(229,229,229,0) 26%),linear-gradient(59deg, rgba(250,250,240,1) 0%, rgba(220,220,220,1) 100%)";
  });

  window.addEventListener('scroll',function(){
  //タイトル文字をスクロールに合わせて動かす
    const titlet = document.querySelector(".title_wrapper h1");
    const titlet2 = document.querySelector(".title_wrapper h2");
    const nycard = document.querySelector(".aisatu");
    
    titlet.style.transform = "translateY( min(max(24vw, 42vh)," + (window.pageYOffset / 2) + "px))";
    titlet2.style.transform = "translateY( min(max(24vw, 42vh)," + (window.pageYOffset / 2) + "px))";
    nycard.style.transform = "translateY( min(12vh," + ((window.pageYOffset / 8)-(0.2 * window.innerHeight)) + "px))";
    nycard.style.transform =  "scale(min(" + Math.sqrt(Math.sqrt((window.pageYOffset / 2) / (0.42 * window.innerHeight))) + ",1))";
  });

  showNowDate();
});


function getTransformValue(v1,v2,value){
return ((v1/v2*value-value/2)*1).toFixed(1);   
}

function showNowDate(){
        var nowtime = new Date();
        var diff = newyeartime.getTime() - nowtime.getTime();
        time.textContent= "";
        if(Math.floor((diff/1000/86400)) > 0){
        time.textContent += Math.floor((diff/1000/86400)) + "日" ;
        }

        if(Math.floor((diff/1000%86400/3600)) > 0){
        time.textContent += Math.floor((diff/1000%86400/3600)) + "時間";
        }

        if(Math.floor((diff/1000%86400%3600/60)) > 0){
            time.textContent += Math.floor((diff/1000%86400%3600/60)) + "分";
        } else if(Math.floor((diff/1000%86400/3600)) > 0 || Math.floor((diff/1000/86400)) > 0){
            time.textContent += "0分";
        }

        if(Math.floor((diff/1000%86400%3600%60)) > 0){
            time.textContent += Math.floor((diff/1000%86400%3600%60)) + "秒";
        } else if(diff >= 0){
            time.textContent += "0秒"
        } else {
            time.textContent = "0秒"
        }
        setTimeout(showNowDate, 1000);
}

