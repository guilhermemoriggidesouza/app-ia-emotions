import React, { useState, useMemo, useContext, useEffect } from 'react';
import { InfosMusic, PlayerAudio, TimeLine, AnimatedText, AnimatedSpan } from './style'
import { filePlayingContext } from '../../context/filePlayingContext'
import { playerContext } from '../../context/playerContext'
import { animationTittleContext } from '../../context/animationTittleContext'
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import usePlayer from '../../hooks/usePlayer'
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { selectedPlaylistContext } from '../../context/playlistContext'

const Player = (props) => {
    const [videoFile, setVideoFile] = useContext(filePlayingContext)
    const [progressObs, setProgressObs] = useContext(playerContext)
    const [playing, setPlaying] = useState(false)
    const [title, setTitle] = useContext(animationTittleContext)
    const [selectedPlaylist, setSelectedPlaylist] = useContext(selectedPlaylistContext)
    const { PlayPause, findMusicByNextBack, handleSeekMouseDown, handleSeekChange, handleProgress, handleSeekMouseUp } = usePlayer();
    
    useEffect(() =>{
        handleProgress(progressObs)
    }, [progressObs])

    return (
        <PlayerAudio bottom={props.bottom} height={props.height}>
            <InfosMusic>
                <IconButton onClick={()=> {
                    const music = selectedPlaylist.music.filter((e)=> e.value._id == videoFile.value._id)[0]
                    findMusicByNextBack(music.back, selectedPlaylist.music.length-1)
                }}>
                    <SkipPreviousIcon style={{ color: "#FFFFFF" }}></SkipPreviousIcon>
                </IconButton>
                <IconButton onClick={()=>{
                    PlayPause(!videoFile.playing)
                    setPlaying(!videoFile.playing)
                    // observableProgress()
                }}>
                    {!videoFile.playing ? <PlayArrowIcon style={{ color: "#FFFFFF" }}></PlayArrowIcon> : <PauseIcon style={{ color: "#FFFFFF" }}></PauseIcon>}
                </IconButton>
                <IconButton onClick={()=>{
                    const music = selectedPlaylist.music.filter((e)=> e.value._id == videoFile.value._id)[0]
                    findMusicByNextBack(music.next, 0)
                }}>
                    <SkipNextIcon style={{ color: "#FFFFFF" }}></SkipNextIcon>
                </IconButton>
            </InfosMusic>
            <InfosMusic>
                {useMemo(()=>
                <TimeLine
                whyDidYouRender ={true}
                type='range' min={0} max={0.999999} step='any'
                value={videoFile.value ? videoFile.played : 0.0}
                onMouseDown={handleSeekMouseDown}
                onChange={(e)=>handleSeekChange(e.target.value)}
                onMouseUp={(e)=>handleSeekMouseUp(e.target.value, props.player.current)}
                ></TimeLine>
                ,[videoFile.value, videoFile.played])}
                { 
                    useMemo(()=>
                        <AnimatedText whyDidYouRender ={true} my='10px' ta='left' >
                        {
                            !playing ? title : <>
                                <AnimatedSpan mx='20px' to="-100%" from="0%">{title}</AnimatedSpan>
                                <AnimatedSpan mx='20px' to="-100%" from="0%">{title}</AnimatedSpan>
                            </>
                        }
                        </AnimatedText>
                    , [playing, title])
                }
            </InfosMusic>
        </PlayerAudio>
    )
}

export default Player;