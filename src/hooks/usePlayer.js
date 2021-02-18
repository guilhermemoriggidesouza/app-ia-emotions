import { useContext } from "react";
import { selectedPlaylistContext } from '../context/playlistContext'
import { filePlayingContext } from '../context/filePlayingContext'

export default function usePlayer(){
    const [videoFile, setVideoFile] = useContext(filePlayingContext)
    const [selectedPlaylist, setSelectedPlaylist] = useContext(selectedPlaylistContext)
    function findMusicByNextBack(idMusic, indexOfEndCircle){
        let musicFind = {}
        if(!idMusic){
            musicFind = selectedPlaylist.music[indexOfEndCircle]
        }else{
            musicFind= selectedPlaylist.music.filter((music)=>music.value._id == idMusic)[0]
        }
        console.log()
        if(musicFind){
            const newVideoFile = {...videoFile}
            newVideoFile.value = musicFind.value
            newVideoFile.next = musicFind.next
            newVideoFile.back = musicFind.back
            setVideoFile(newVideoFile)
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
            console.log(state)
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