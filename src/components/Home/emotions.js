import { playlistsContext, SelectedPlaylistContext } from '../../context/playlistContext'
import { filePlayingContext } from '../../context/filePlaying'
import React, { useRef, useEffect, useContext } from 'react';
import { PlayerVideoStyle } from './style'
import useMusic from '../../hooks/useMusic'
import usePlayer from '../../hooks/usePlayer'


const Emotions = (props)=>{
    const [selectedPlaylist, setSelectedPlaylist] = useContext(SelectedPlaylistContext)
    const [playlists, setPlaylists] = useContext(playlistsContext)
    const [videoFile, setVideoFile] = useContext(filePlayingContext)
    const refVideo = useRef(null)
    const { PlayPause } = usePlayer([videoFile, setVideoFile], [playlists, setPlaylists]);
    const { handlerSetPlaylistRandom } = useMusic(
        [videoFile, setVideoFile],
        [playlists, setPlaylists],
        [selectedPlaylist, setSelectedPlaylist]
    )

    const getUserMediaVideo  = () =>{
        const constraints = {
            video: true,
        };
        
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            refVideo.current.srcObject = stream;
        });
    }

    const handleProgress = (state) => {
        if (!videoFile.seeking) {
            const newVideoFile = {...videoFile} 
            newVideoFile.played = state.played
            setVideoFile(newVideoFile)
        }
    }

    useEffect(()=>{
        setSelectedPlaylist(playlists)
        getUserMediaVideo()
    },[])

    return (
        <div style={{ width: "100%", position: "relative" }}>
            <PlayerVideoStyle 
                style={{display: "none"}}
                playing={videoFile.playing} 
                url={videoFile.value?.file} 
                pip={true} 
                onPause={()=> { 
                    PlayPause(false)
                }}
                onPlay={()=> { 
                    PlayPause(true)
                }}
                onEnded={handlerSetPlaylistRandom}
                onSeek={e => console.log('onSeek', e)}
                onProgress={handleProgress}
            />
            <canvas style={{
                width: '250px',
                height: '250px',
                background: 'azure',
                position: 'absolute',
                bottom: '10px',
                right: '7px'
            }}></canvas> 
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