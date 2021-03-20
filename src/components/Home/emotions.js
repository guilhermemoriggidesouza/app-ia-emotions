import { playlistsContext, selectedPlaylistContext } from '../../context/playlistContext'
import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
import useMusic from '../../hooks/useMusic'
import { endedMusicContext } from '../../context/endedMusicContext'


const Emotions = (props)=>{
    const [selectedPlaylist, setSelectedPlaylist] = useContext(selectedPlaylistContext)
    const [playlists, setPlaylists] = useContext(playlistsContext)
    const [endedMusic, setEndedMusic] = useContext(endedMusicContext)
    const refVideo = useRef(null)
    const canvasRef = useRef(null)
    const [infoCanvas, setInfoCanvas] = useState({
        w: 0, h: 0, r:0
    })
    

    const getUserMediaVideo  =useCallback(() =>{
        const constraints = {
            video: true,
        };
        
        navigator.mediaDevices.getUserMedia(constraints).then(async (stream) => {
            refVideo.current.srcObject = stream;
        });
    }, [])

    const handlerOnEnd = useCallback(() =>{
        canvasRef.current.getContext("2d").fillRect(0, 0, 300, 150);
        canvasRef.current.getContext("2d").drawImage(refVideo.current, 0, 0, 300, 150);
        console.log(canvasRef.current.toDataURL())
    }, [infoCanvas.w, infoCanvas.h, refVideo.current])
    
    useEffect(()=>{
        if(!refVideo.current.srcObject){
            getUserMediaVideo()
        }
        handlerOnEnd()
    },[endedMusic])

    return (
        <div style={{ width: "100%", position: "relative" }}>
            <p>musicas Tocadas: {endedMusic}</p>
            <video style={{
                height: '60vh',
                background: '#121212',
                width: '100%',
                objectFit: 'cover'
            }} autoPlay={true} ref={refVideo}>
            </video>
            <canvas style={{
                background: 'black',
                position: 'absolute',
                bottom: '10px',
                right: '7px',
                objectFit: 'contain'
            }} ref={canvasRef}></canvas>
            
        </div>
    )
}

export default Emotions;