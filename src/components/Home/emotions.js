import {
  playlistsContext,
  selectedPlaylistContext,
} from "../../context/playlistContext";
import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import useMusic from "../../hooks/useMusic";
import { endedMusicContext } from "../../context/endedMusicContext";
import Webcam from "react-webcam";
import * as AIService from "../../services/AIService";

const Emotions = (props) => {
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    selectedPlaylistContext
  );
  const [playlists, setPlaylists] = useContext(playlistsContext);
  const [endedMusic, setEndedMusic] = useContext(endedMusicContext);
  const [infoCanvas, setInfoCanvas] = useState({
    w: 0,
    h: 0,
    r: 0,
  });
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //   useEffect(() => {
  //     if (!refVideo.current.srcObject) {
  //       getUserMediaVideo();
  //     }
  //     handlerOnEnd();
  //   }, [endedMusic]);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <p>musicas Tocadas: {endedMusic}</p>
      <Webcam
        ref={webcamRef}
        muted={true}
        onPlay={() => {
          AIService.detect(webcamRef, canvasRef);
        }}
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
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
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default Emotions;
