import { playlistsContext, SelectedPlaylistContext } from '../../context/playlistContext'
import { filePlayingContext } from '../../context/filePlaying'
import React, { useRef, useEffect, useContext } from 'react';
import { PlayerVideoStyle } from './style'
import useMusic from '../../hooks/useMusic'
import usePlayer from '../../hooks/usePlayer'
import { animationTittleContext } from '../../context/animationTittleContext'

const Emotions = (props)=>{
    const [title, setTitle] = useContext(animationTittleContext)
    const [selectedPlaylist, setSelectedPlaylist] = useContext(SelectedPlaylistContext)
    const [playlists, setPlaylists] = useContext(playlistsContext)
    const [videoFile, setVideoFile] = useContext(filePlayingContext)
    const refVideo = useRef(null)
    const canvas = useRef(null)
    
    const { handlerSetPlaylistRandom } = useMusic(
        [videoFile, setVideoFile],
        [playlists, setPlaylists],
        [selectedPlaylist, setSelectedPlaylist],
        [title, setTitle]
    )

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
        canvas.getContext("2d").drawImage(refVideo.current, 0, 0);
        setNewMusic(false)
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
            }} ref={canvas}></canvas> 
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