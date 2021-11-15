import * as faceApi from "@vladmandic/face-api";
let modelLoaded = false;
// Function that loads tensorflowjs model from src folder
const MODEL_URL = "/models/";
export const loadModel = async () => {
  console.log("run started");
  try {
    await faceApi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceApi.loadFaceLandmarkModel(MODEL_URL);
    await faceApi.loadFaceRecognitionModel(MODEL_URL);
    await faceApi.loadFaceExpressionModel(MODEL_URL);
    await faceApi.loadTinyFaceDetectorModel(MODEL_URL);
    modelLoaded = true;
  } catch (e) {
    console.log(e.name, e.message, e.stack);
  }
};

export const detect = async (webcamRef, canvasRef) => {
  if (!modelLoaded) {
    await loadModel();
  }
  if (webcamRef.current.paused || webcamRef.current.ended) {
    setTimeout(() => detect(webcamRef, canvasRef));
    return;
  }
  console.log("started");
  // Check data is available

  // Get Video Properties
  const video = webcamRef.current.video;
  const videoWidth = webcamRef.current.video.videoWidth;
  const videoHeight = webcamRef.current.video.videoHeight;

  // Set video width
  webcamRef.current.video.width = videoWidth;
  webcamRef.current.video.height = videoHeight;

  // Set canvas height and width
  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;

  const dimensions = { width: videoWidth, height: videoHeight };
  faceApi.matchDimensions(canvasRef.current, dimensions);

  /* Display face expression results */
  const detectionsWithExpressions = await faceApi
    .detectSingleFace(video)
    .withFaceLandmarks()
    .withFaceExpressions();
  // resize the detected boxes and landmarks in case your displayed image has a different size than the original
  const resizedResults = faceApi.resizeResults(
    detectionsWithExpressions,
    dimensions
  );

  // draw detections into the canvas
  faceApi.draw.drawDetections("canvas", resizedResults);
  // draw a textbox displaying the face expressions with minimum probability into the canvas
  faceApi.draw.drawFaceExpressions("canvas", resizedResults);
  setTimeout(() => detect(webcamRef, canvasRef), 1000);
};
