const video = document.getElementById("videoInput");
const formLabel = document.getElementById("formLabel");
const registerUser = document.querySelectorAll("#registerUser");
var allUser = [];
// getting all the registered users from hidden html element
registerUser.forEach((user) => {
  allUser.push(user.outerText);
});

// Using faceapi.js to recognice the face in the video
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"), //heavier/accurate version of tiny face detector
]).then(start);

function start() {
  // to start the user video
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
  console.log("video added");
  //calling the recognise face function after user video is started
  recognizeFaces();
}

async function recognizeFaces() {
  // getting all the labels i.e. users from the database
  const labeledDescriptors = await loadLabeledImages();
  console.log(labeledDescriptors);
  // creating a face matcher
  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);
  // calling after the video is started
  video.addEventListener("play", async () => {
    console.log("Playing");
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      const results = resizedDetections.map((d) => {
        // finding the best match for the user's face if the user is registered already
        return faceMatcher.findBestMatch(d.descriptor);
      });
      results.forEach((result, i) => {
        // drawing the rectangle around the face and the name of the user
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
        drawBox.draw(canvas);
        const wordArray = result.toString().split("(");
        const word = wordArray[0].substring(0, wordArray[0].length - 1);
        console.log(word);
        // redirecting to the otp page if the user is recognised otherwise automatically to the error page
        formLabel.action = `/send/${word}/`;
      });
    }, 100);
  });
}

// loading the labels from the database
function loadLabeledImages() {
  const labels = allUser; // for WebCam
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      // loading the images using faceapi.js
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(
          `uploads/images/${label}/${i}.jpg`
        );
        // getting the descriptors for the images
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      // returning the descriptors and the label
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}