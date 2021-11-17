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
    /* Display face expression results */
    const detectionsWithExpressions = await faceApi
        .detectSingleFace(video)
        .withFaceLandmarks()
        .withFaceExpressions()
        
    if (detectionsWithExpressions) {
        faceApi.draw.drawDetections("canvas", detectionsWithExpressions);
        faceApi.draw.drawFaceExpressions("canvas", detectionsWithExpressions);
        return detectionsWithExpressions.expressions.asSortedArray()
    }
};
