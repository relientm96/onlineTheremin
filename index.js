 /* ------------------------------- Slider Stuff --------------------------------------------*/
 // Controls the minimimum score to display keypoints

 // Default Score
 var minThresholdScore = 0.5;
 var slider = document.getElementById("myRange");
 var output = document.getElementById("sliderVal");
 // Display the default slider value
 output.innerHTML = slider.value;
 // Update the current slider value with callback
 slider.oninput = function() {
     output.innerHTML = this.value;
     minThresholdScore = this.value;
 };
 /*---------------------------------Audio Synthesis Program ---------------------------------*/
 // Set Status to let user audio has not started yet
 document.getElementById('status').textContent = "Waiting for User to Play Audio";

 var synth = new Tone.Synth().toMaster()

 //attach a click listener to a play button
 document.getElementById('button').addEventListener('click', async() => {
     await Tone.start();
     console.log('Audio is ready');
     playAudio();
 });

 function playAudio() {
     //play a middle 'C' 
     synth.triggerAttack('C4');
     document.getElementById('status').textContent = "Audio Started";
 }

 function stopMusic() {
     synth.triggerRelease();
     document.getElementById('status').textContent = "Audio Stopped";
 }

 /*---------------------------------Pose Detection Program ---------------------------------*/

 /**
  * CAMERA Functions
  * Referenced from posenet's github camera demo
  */

 // Hardcoded Pixel Values
 var videoWidth = 500;
 var videoHeight = 400;

 // Mobile Support
 const mobile = /Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent);
 // Asynchronous function to set camera configurations
 async function setupCamera() {
     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
         throw new Error(
             'Browser API navigator.mediaDevices.getUserMedia not available');
     }
     const video = document.getElementById('videoElement');
     video.width = videoWidth;
     video.height = videoHeight;
     const stream = await navigator.mediaDevices.getUserMedia({
         'audio': false,
         'video': {
             facingMode: 'user',
             width: mobile ? undefined : videoWidth,
             height: mobile ? undefined : videoHeight,
         },
     });
     video.srcObject = stream;
     return new Promise((resolve) => {
         video.onloadedmetadata = () => {
             resolve(video);
         };
     });
 }

 // Async function to load camera permissions and settings
 // Referenced from posenet's camera.js demo code
 async function loadVideo() {
     const video = await setupCamera();
     video.play();
     return video;
 }

 // Function to map keypoints to a sound parameter (eg: a note change or pitch change)
 function keypointToSound(results) {
     // Only run through Keypoint mapping from Single Person pose
     for (i = 0; i < results.length; i++) {
         // Control sound from right hand and left hand
         if (results[0].keypoints[9]['score'] && results[0].keypoints[10]['score'] > minThresholdScore) {
             if (results[0].keypoints[9].position['y'] > 350) {
                 if (results[0].keypoints[10].position['y'] > 350) {
                     synth.setNote('C2');
                     document.getElementById('status').textContent = "Playing Note C2";
                 } else if (results[0].keypoints[10].position['y'] > 175) {
                     synth.setNote('C3');
                     document.getElementById('status').textContent = "Playing Note C3";
                 } else {
                     synth.setNote('C4');
                     document.getElementById('status').textContent = "Playing Note C4";
                 }
             } else if (results[0].keypoints[9].position['y'] > 300) {
                 if (results[0].keypoints[10].position['y'] > 350) {
                     synth.setNote('D2');
                     document.getElementById('status').textContent = "Playing Note D2";
                 } else if (results[0].keypoints[10].position['y'] > 175) {
                     synth.setNote('D3');
                     document.getElementById('status').textContent = "Playing Note D3";
                 } else {
                     synth.setNote('D4');
                     document.getElementById('status').textContent = "Playing Note D4";
                 }
             } else if (results[0].keypoints[9].position['y'] > 250) {
                 if (results[0].keypoints[10].position['y'] > 350) {
                     synth.setNote('E2');
                     document.getElementById('status').textContent = "Playing Note E2";
                 } else if (results[0].keypoints[10].position['y'] > 175) {
                     synth.setNote('E3');
                     document.getElementById('status').textContent = "Playing Note E3";
                 } else {
                     synth.setNote('E4');
                     document.getElementById('status').textContent = "Playing Note E4";
                 }
             } else if (results[0].keypoints[9].position['y'] > 150) {
                 if (results[0].keypoints[10].position['y'] > 350) {
                     synth.setNote('F2');
                     document.getElementById('status').textContent = "Playing Note F2";

                 } else if (results[0].keypoints[10].position['y'] > 175) {
                     synth.setNote('F3');
                     document.getElementById('status').textContent = "Playing Note F3";

                 } else {
                     synth.setNote('F4');
                     document.getElementById('status').textContent = "Playing Note F4";
                 }
             } else if (results[0].keypoints[9].position['y'] > 80) {
                 if (results[0].keypoints[10].position['y'] > 350) {
                     synth.setNote('G2');
                     document.getElementById('status').textContent = "Playing Note G2";
                 } else if (results[0].keypoints[10].position['y'] > 175) {
                     synth.setNote('G3');
                     document.getElementById('status').textContent = "Playing Note G3";
                 } else {
                     synth.setNote('G4');
                     document.getElementById('status').textContent = "Playing Note G4";
                 }
             } else {
                 if (results[0].keypoints[10].position['y'] > 350) {
                     synth.setNote('A2');
                     document.getElementById('status').textContent = "Playing Note A2";
                 } else if (results[0].keypoints[10].position['y'] > 175) {
                     synth.setNote('A3');
                     document.getElementById('status').textContent = "Playing Note A3";
                 } else {
                     synth.setNote('A4');
                     document.getElementById('status').textContent = "Playing Note A4";
                 }
             }
         } else {
             let status = document.getElementById('status');
             status.textContent = "Please Keep Hands in Frame! or Reduce Threshold Score";
         }
     }
 }

 
function drawLine(sourceX, sourceY, destX, destY){
    const canvas = document.getElementById('output')
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(destX, destY);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
}

// Function to draw a line between two points
function drawAllSkeleton(array){
    const pairs = {
        0 : 1,
        1 : 3,
        2 : 0,
        4 : 2,
        5 : 7,
        6 : 8,
        7 : 9,
        8 : 10,
        12: 6,
        11: 5
    }
    for (i = 0; i < array.length; i++) {
        // Only redraw them if score higher than threshold score
        // threshold score here is set by slider by user
        x = array[i].position['x'];
        y = array[i].position['y'];
        if (pairs[i]) {
            drawLine(x, y, array[pairs[i]].position['x'], array[pairs[i]].position['y'])
        }
    }
    // Complete the skeleton
    drawLine(array[11].position['x'], array[11].position['y'], array[12].position['x'], array[12].position['y'])
    drawLine(array[5].position['x'], array[5].position['y'], array[6].position['x'], array[6].position['y'])
}

 // Detects poses in real time with a WebCam Stream
 // Referenced from posenet's camera.js demo code
 function detectPoseInRealTime(video, net) {
     const canvas = document.getElementById('output');
     const ctx = canvas.getContext('2d');
     canvas.width = videoWidth;
     canvas.height = videoHeight;
     async function getPose() {
         const pose = net.estimatePoses(video, {
                 flipHorizontal: false,
                 maxDetections: 2,
                 scoreThreshold: minThresholdScore,
                 nmsRadius: 20
             }).then(function(results) {
                 // Map keypoint results to sound with Tone.js
                 keypointToSound(results);
                 // Redraw Key Points for each new rendered frame
                 ctx.clearRect(0, 0, canvas.width, canvas.height);
                 ctx.save();
                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                 ctx.restore();
                 for (i = 0; i < results[0].keypoints.length; i++) {
                    if (results[0].keypoints[i]['score'] > minThresholdScore) {
                        // Only redraw them if score higher than threshold score
                        // threshold score here is set by slider by user
                        x = results[0].keypoints[i].position['x'];
                        y = results[0].keypoints[i].position['y'];
                        if (i == 9) {
                            // Green for Left Hand
                            ctx.fillStyle = "#00cc00";
                        } else if (i == 10) {
                            // Blue for Right Hand
                            ctx.fillStyle = "#4da6ff";
                        } else {
                            // Red for other keypoints
                            ctx.fillStyle = "#FF0000";
                        }
                        ctx.fillRect(x, y, 10, 10);
                    }
                }
                drawAllSkeleton(results[0].keypoints)
             })
             // Looping frame rendering continuosly
         window.requestAnimationFrame(getPose);
     }
     getPose();
 }

 //  Function to run entire thing
 async function run() {
     const net = await posenet.load();
     let video;
     try {
         video = await loadVideo();
         document.getElementById('camSetup').textContent = "";
         document.getElementById('loaderID').remove();
     } catch (e) {
         document.getElementById('camSetup').textContent =
             'this browser does not support video capture,' +
             'or this device does not have a camera';
         throw e;
     }
     detectPoseInRealTime(video, net);
 }

 navigator.getUserMedia = navigator.getUserMedia ||
     navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 // Start program
 run();