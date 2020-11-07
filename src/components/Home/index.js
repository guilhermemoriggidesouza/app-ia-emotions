import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { loginContext } from '../../context/loginContext'
import { playlistsContext, SelectedPlaylistContext } from '../../context/playlistContext'
import { filePlayingContext } from '../../context/filePlaying'
import { Content, BottomNav, ControllerMusics, PlayerVideoStyle } from './style'
import { Text, Button, Dflex, Input } from '../../stylesGlobaly/globalComponents'
import Playlist from './playlist'
import Player from './player'
import Emotions from './emotions'
import useDeviceDetect from '../../hooks/detectDevice'
import usePlayer from '../../hooks/usePlayer'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import VideocamIcon from '@material-ui/icons/Videocam';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { makeStyles } from '@material-ui/core/styles';
import useMusic from '../../hooks/useMusic'

const useStyles = makeStyles({
    root: {
        color: "#FFFFFF",
        '&$selected': {
            color: "#1db954",
        },
    },
    selected: {},
});

const Home = ()=>{
    const style = useStyles()
    const [loginSession, setLoginSession] = useContext(loginContext)
    const [playlists, setPlaylists] = useState([])
    const [videoFile, setVideoFile] = useState({});
    const { PlayPause } = usePlayer([videoFile, setVideoFile], [playlists, setPlaylists]);
    const { isMobile } = useDeviceDetect();
    const [valueIndexed, setValueIndexed] = useState(0);
    const tabs = [useRef(null), useRef(null), useRef(null)]
    const playerRef = useRef(null)
    const [selectedPlaylist, setSelectedPlaylist] = useState({});
    const { handlerSetPlaylistRandom } = useMusic(
        [videoFile, setVideoFile],
        [playlists, setPlaylists],
        [selectedPlaylist, setSelectedPlaylist]
    )

    useEffect(()=>{
        if(!loginSession.login && !loginSession._id && !loginSession.username){
            window.location.href = "/"
        }
    }, [loginSession])

    const handleProgress = (state) => {
        console.log(videoFile.seeking)
        if (!videoFile.seeking) {
            const newVideoFile = {...videoFile} 
            newVideoFile.played = state.played
            setVideoFile(newVideoFile)
        }
    }

    return (
        <Content>
            <playlistsContext.Provider value={[playlists, setPlaylists]}>
                <SelectedPlaylistContext.Provider value={[selectedPlaylist, setSelectedPlaylist]}>
                    <filePlayingContext.Provider value={[videoFile, setVideoFile]}>
                        <Text py="26px" size="20px">Bem Vindo {loginSession.username}</Text>
                        {!isMobile ? 
                            <div>
                                <Playlist user={loginSession}/>     
                                <ControllerMusics>
                                    <PlayerVideoStyle 
                                        playing={videoFile.playing} 
                                        url={videoFile.value?.file} 
                                        ref={playerRef}
                                        onPause={()=> { 
                                            PlayPause(false)
                                        }}
                                        onPlay={()=> { 
                                            PlayPause(true)
                                        }}
                                        onEnded={()=>{
                                            handlerSetPlaylistRandom()
                                        }
                                        }
                                        onProgress={handleProgress}
                                    />
                                    <Emotions/>
                                </ControllerMusics>
                            <Player player={playerRef}/>
                            </div>
                            : 
                            <div>
                                <div ref={tabs[0]}>
                                    <Playlist user={loginSession} />  
                                </div>     
                                <div ref={tabs[1]} style={{display: "none"}}>
                                    <PlayerVideoStyle 
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
                                </div>
                                <div ref={tabs[2]} style={{display: "none"}}>
                                    <Emotions />
                                </div>
                                <div>
                                    <Player player={playerRef} bottom="56px" height="60px"/>
                                </div>

                                <BottomNav
                                    value={valueIndexed}
                                    onChange={(event, newValue) => {
                                        tabs.map((element)=>element.current.style.display = "none")
                                        tabs[newValue].current.style.display = "block"
                                        setValueIndexed(newValue)
                                    }}
                                    showLabels
                                >
                                    <BottomNavigationAction label="Playlist" classes={style} icon={<QueueMusicIcon />} />
                                    <BottomNavigationAction label="Video" classes={style} icon={<VideocamIcon />} />
                                    <BottomNavigationAction label="Emoção" classes={style} icon={<EmojiEmotionsIcon />} />
                                </BottomNav>
                            </div>
                        }
                    </filePlayingContext.Provider>
                </SelectedPlaylistContext.Provider>
            </playlistsContext.Provider>
        </Content>
    );
}

export default Home;