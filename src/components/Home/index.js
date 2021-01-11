import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { loginContext } from '../../context/loginContext'
import { playlistsContext, SelectedPlaylistContext } from '../../context/playlistContext'
import { filePlayingContext } from '../../context/filePlaying'
import { Content, BottomNav, ControllerMusics } from './style'
import { Text, Button, Dflex, Input } from '../../stylesGlobaly/globalComponents'
import Playlist from './playlist'
import Player from './player'
import Emotions from './emotions'
import useDeviceDetect from '../../hooks/detectDevice'
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
                    <filePlayingContext.Provider value={[videoFile, setVideoFile]}>
                        <Text py="26px" size="20px">Bem Vindo {loginSession.username}</Text>
                        {!isMobile ? 
                            <div>
                                <Playlist user={loginSession}/>     
                                <ControllerMusics>
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