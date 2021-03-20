import { useContext } from "react";
import { selectedPlaylistContext } from '../context/playlistContext'
import { filePlayingContext } from '../context/filePlayingContext'
import useMusic from './useMusic'

export default function usePlayer(){
    const [videoFile, setVideoFile] = useContext(filePlayingContext)
    const [selectedPlaylist, setSelectedPlaylist] = useContext(selectedPlaylistContext)
    const { selectMusic } = useMusic()

    function findMusicByNextBack(idMusic, indexOfEndCircle){
        let musicFind = {}
        if(!idMusic){
            musicFind = selectedPlaylist.music[indexOfEndCircle]
        }else{
            musicFind= selectedPlaylist.music.filter((music)=>music.value._id == idMusic)[0]
        }
        if(musicFind){
            selectMusic(selectedPlaylist, musicFind)            
        }
    }

    function PlayPause(playing){
        const newVideoFile = {...videoFile}
        newVideoFile.playing = playing
        setVideoFile(newVideoFile)
    }

    const handleSeekMouseDown = e => {
        const newVideoFile = {...videoFile}
        newVideoFile.seeking = true
        setVideoFile(newVideoFile)
    }

    const handleSeekChange = (value) => {
        const newVideoFile = {...videoFile}
        newVideoFile.played = parseFloat(value)
        setVideoFile(newVideoFile)
    }

    const handleSeekMouseUp = (value, reference) => {
        const newVideoFile = {...videoFile}
        newVideoFile.seeking = false

        setVideoFile(newVideoFile)
        reference.seekTo(parseFloat(value))
    }
    
    const handleProgress = (state) => {
        if (!videoFile.seeking) {
            const newVideoFile = {...videoFile} 
            newVideoFile.played = state.played
            setVideoFile(newVideoFile)
        }
    }
    return { 
        PlayPause,
        findMusicByNextBack,
        handleSeekMouseDown,
        handleSeekChange,
        handleProgress,
        handleSeekMouseUp
    }
}