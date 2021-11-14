import * as faceApi from "face-api.js";
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

  const displaySize = { width: videoWidth, height: videoHeight };
  faceApi.matchDimensions(canvasRef.current, displaySize);

  const result = await faceApi
    .detectSingleFace(video)
    .withFaceLandmarks()
    .withFaceExpressions();
  const ctx = canvasRef.current.getContext("2d");
  console.log(result);
  if (result) {
    const resizedDetection = faceApi.resizeResults(result, displaySize);
    const minProbability = 0.05;
    faceApi.draw.drawFaceExpressions(ctx, resizedDetection, minProbability);
    faceApi.draw.drawDetections(ctx, resizedDetection);
  }
  setTimeout(() => detect(webcamRef, canvasRef), 1000);
};
