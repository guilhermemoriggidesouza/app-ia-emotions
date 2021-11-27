import {
    playlistsContext,
    selectedPlaylistContext,
} from "../../context/playlistContext";
import React, {
    useRef,
    useEffect,
    useContext
} from "react";
import useMusic from "../../hooks/useMusic";
import { endedMusicContext } from "../../context/endedMusicContext";
import Webcam from "react-webcam";
import * as AIService from "../../services/AIService";

const Emotions = (props) => {
    const [endedMusic, setEndedMusic] = useContext(endedMusicContext);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const { handlerSetPlaylistByEmotion } = useMusic()
    const [selectedPlaylist, setSelectedPlaylist] = useContext(selectedPlaylistContext)

    useEffect(() => {
        const recoverEmotions = async () => {
            try{
                console.log('vai rodar')
                const emotions = await AIService.detect(webcamRef, canvasRef);
                if(!emotions || emotions.length == 0){
                    setTimeout(()=>recoverEmotions(), 1000)
                    return
                }
                let mapEmotions = {
                    neutral: selectedPlaylist.title?.toLowerCase() || "",
                    happy: 'feliz', 
                    surprised: 'feliz',
                    sad: 'triste',
                    fearful: 'triste',
                    angry: 'raiva',
                    disgusted: 'angustia'
                }
                const [filtredEmotion] = emotions.map(emotion => ({
                    [mapEmotions[emotion.expression]] : emotion.probability
                }))
                if(filtredEmotion){
                    handlerSetPlaylistByEmotion(Object.getOwnPropertyNames(filtredEmotion)[0])
                }
            } catch (error) {
                console.log(error)
            }
        }
        console.log('vai rodar')
        recoverEmotions()
    }, [endedMusic]);

    return (
        <div style={{ width: "100%", position: "relative" }}>
            <p>musicas Tocadas: {endedMusic}</p>
            <Webcam
                ref={webcamRef}
                muted={true}
                style={{
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: "60%",
                    height: "100%",
                }}
            />

            <canvas
                id="canvas"
                ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 8,
                    width: "60%",
                    height: "100%",
                }}
            />
        </div>
    );
};

export default Emotions;
