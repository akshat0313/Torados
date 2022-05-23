const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
// const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement);


webcam.start()
   .then(result =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });

   var picture = webcam.snap();
   
   webcam.stop();
// const videoGrid = document.getElementById('video-grid')

// let myVideoStream;

// const myVideo = document.createElement('video')


// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
//   })
//   .then(stream => {
//     myVideoStream = stream
//     myVideo.srcObject = stream
//     myVideo.play()
//   })
//   .catch(err => console.log(err))


//   function addVideoStream(video, stream) {
//     video.srcObject = stream
//     video.addEventListener('loadedmetadata', () => {
//       video.play()
//     })
//     videoGrid.append(video)
//   }


//   const playStop = () => {
//     console.log('object')
//     let enabled = myVideoStream.getVideoTracks()[0].enabled;
//     if (enabled) {
//       myVideoStream.getVideoTracks()[0].enabled = false;
//       setPlayVideo()
//     } else {
//       setStopVideo()
//       myVideoStream.getVideoTracks()[0].enabled = true;
//     }
//   }  