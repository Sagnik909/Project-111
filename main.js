
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="captured_image">';
    });
}

console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/itLlyhfy-/model.json',modelReady);
function modelReady(){
    console.log("model is ready");
}
function speak(){
    synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is- " + prediction_1;
    utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996";
        }
        if(results[0].label == "best"){
            document.getElementById("update_emoji").innerHTML = "&#128077";
        }
        if(results[0].label == "awesome"){
            document.getElementById("update_emoji").innerHTML = "&#128076";
        }
    
    }
}
 