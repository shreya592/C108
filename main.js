prediction_1= "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    image_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function (data_uri)
    {
        document.getElementById("result").innerHTML='<img id="capture_image" src=" '+data_uri+'"/>';
        
    });
}

console.log('ml5 version', ml5.version);
classifier= ml5.imageClassifier('https://storage.googleapis.com/tm-model/56UPlMfQz/model.json', modelLoaded);

function modelLoaded()
{
    console.log('modelLoaded');
}

function speak()
{
    var synth= window.speechSynthesis;
    speak_data_1="The prediction is"+prediction_1;

    var utterThis= new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
  img= document.getElementById("capture_image");
  classifier.classify(img, gotResult);  
}

function gotResult(error, results)
{
if(error){
    console.error(error);
}
else(console.log(results))
document.getElementById("result_emotion_name").innerHTML=results[0].label;
prediction_1= results[0].label;
speak();

if(results[0].label=="Wow")
{
    document.getElementById("update_emoji").innerHTML="&#128076;";
}

if(results[0].label=="Good Job")
{
    document.getElementById("update_emoji").innerHTML="&#128077";
}

if(results[0].label=="Rock")
{
    document.getElementById("update_emoji").innerHTML="&#129304;";
}


}
