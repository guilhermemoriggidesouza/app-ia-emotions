import { playlistsContext, selectedPlaylistContext } from '../../context/playlistContext'
import React, { useRef, useEffect, useContext } from 'react';
import useMusic from '../../hooks/useMusic'

const Emotions = (props)=>{
    const [selectedPlaylist, setSelectedPlaylist] = useContext(selectedPlaylistContext)
    const [playlists, setPlaylists] = useContext(playlistsContext)
    const refVideo = useRef(null)
    const canvasRef = useRef(null)
    
    const { handlerSetPlaylistRandom } = useMusic()

    const getUserMediaVideo  = () =>{
        const constraints = {
            video: true,
        };
        
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            refVideo.current.srcObject = stream;
        });
    }

    const handlerOnEnd = ()=>{
        handlerSetPlaylistRandom()
        console.log(canvasRef)
        canvasRef.current.getContext("2d").drawImage(refVideo.current, 0, 0);
        // setNewMusic(false)
    }
    
    useEffect(()=>{
        console.log(props.player)
        setSelectedPlaylist(playlists)
        getUserMediaVideo()
    },[])

    useEffect(()=>{
        if(props.newMusic)
            handlerOnEnd()
    }, [props.newMusic])

    return (
        <div style={{ width: "100%", position: "relative" }}>
            <canvas style={{
                width: '250px',
                height: '250px',
                background: 'azure',
                position: 'absolute',
                bottom: '10px',
                right: '7px'
            }} ref={canvasRef}></canvas> 
            <video style={{
                height: '40vh',
                background: '#121212',
                width: '100%'
            }} autoPlay={true} ref={refVideo}>
            </video>
        </div>
    )
}

export default Emotions;