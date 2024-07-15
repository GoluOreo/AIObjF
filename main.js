Status = '';
objects = [];
input = '';

function preload() {
    //Nothing? lol
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    synth = window.speechSynthesis;
}

function draw() {
    image(video, 0, 0, 380, 380);
    objectDetector.detect(video, gotResult);
    if (Status != '') {
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = 'Status: Object(s) Detected';
            document.getElementById('number_of_objects').innerHTML = 'Number of Objects ' + objects.length;
            fill('#FF0000');
            noStroke();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == input) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById('object_status').innerHTML = input + 'Found';
                utterThis = SpeechSynthesisUtterance(input + 'Found');
                synth.speak(utterThis);
            } else {
                document.getElementById('object_status').innerHTML = input + 'Not Found';
            }
        }
    }
}

function modelLoaded() {
    console.log('Model has loaded');
    Status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
    }
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status - Detecting Objects';
    input = document.getElementById('input').value;
    webcam.show();
}