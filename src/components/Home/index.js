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
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { makeStyles } from '@material-ui/core/styles';
import { playerContext, playerEmotionContext } from '../../context/playerContext'
import { animationTittleContext } from '../../context/animationTittleContext'

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
    const [progressObs, setProgressObs] = useState({})
    const [newMusic, setNewMusic] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [endedObs, setEndedObs] = useState({})
    const { isMobile } = useDeviceDetect();
    const [valueIndexed, setValueIndexed] = useState(0);
    const tabs = [useRef(null), useRef(null)]
    const playerRef = useRef(null)
    const [selectedPlaylist, setSelectedPlaylist] = useState({});

    useEffect(()=>{
        if(!loginSession.login && !loginSession._id && !loginSession.username){
            window.location.href = "/"
        }
    }, [loginSession])
    

    return (
        <Content>
            <playlistsContext.Provider value={[playlists, setPlaylists]}>
                <SelectedPlaylistContext.Provider value={[selectedPlaylist, setSelectedPlaylist]}>
                    <animationTittleContext.Provider value={[playing, setPlaying]}>
                        <filePlayingContext.Provider value={[videoFile, setVideoFile]}>
                                <PlayerVideoStyle 
                                    style={{display: "none"}}
                                    playing={videoFile.playing} 
                                    url={videoFile.value?.file} 
                                    pip={true} 
                                    onProgress={(state)=> setProgressObs(state)}
                                    onEnded={() => setNewMusic(true)}
                                    onSeek={e => console.log('onSeek', e)}
                                    ref={playerRef}
                                />
                                <Text py="26px" size="20px">Bem Vindo {loginSession.username}</Text>
                                {!isMobile ? 
                                    <div>
                                        <Playlist user={loginSession}/>
                                        <playerEmotionContext.Provider value={[endedObs, setEndedObs]}>
                                            <ControllerMusics>
                                                <Emotions player={playerRef} newMusic={[newMusic, setNewMusic]}/>
                                            </ControllerMusics>
                                        </playerEmotionContext.Provider>
                                        <playerContext.Provider value={[progressObs, setProgressObs]}>
                                                <Player player={playerRef}/>
                                        </playerContext.Provider>    
                                    </div>
                                    : 
                                    <div>
                                        <div ref={tabs[0]}>
                                            <Playlist user={loginSession} />  
                                        </div>     
                                        <div ref={tabs[1]} style={{display: "none"}}>
                                            <Emotions player={playerRef} newMusic={[newMusic, setNewMusic]}/>
                                        </div>
                                        <div>
                                            <playerContext.Provider value={[progressObs, setProgressObs]}>
                                                <Player player={playerRef} bottom="56px" height="60px"/>
                                            </playerContext.Provider>    
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
                                            <BottomNavigationAction label="Emoção" classes={style} icon={<EmojiEmotionsIcon />} />
                                        </BottomNav>
                                    </div>
                                }
                        </filePlayingContext.Provider>
                    </animationTittleContext.Provider>
                </SelectedPlaylistContext.Provider>
            </playlistsContext.Provider>
        </Content>
    );
}

export default Home;