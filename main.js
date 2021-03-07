video="";
object=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}



function start(){
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML-"Status: Detecting Objects";
}

function modelLoaded(){
    console.log ("cocossd is Initialized");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function got_result(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        object=result;
    }
}


function draw(){
    image(video,0,0,480,380);
     
    if(status != ""){
        objectdetector.detect(video,got_result);
        for(i=0 ; i<object.length ; i++){
            document.getElementById("status").innerHTML="Object Detected";
            document.getElementById("objects").innerHTML="Number of objects detected are " + object.length;
            percent=floor(object[i].confidence*100);
            fill("#FF0000");
            textsize(20);
            text(object[i].label + " " + percent + "%", object[i].x +15 , object[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x ,object[i].y ,object[i].width ,object[i].height);
        }
    }
}