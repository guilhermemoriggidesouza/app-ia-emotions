import React from "react";

export default function usePlayer([videoFile, setVideoFile], [selectedPlaylist, setSelectedPlaylist]){
    function findMusicByNextBack(idMusic, indexOfEndCircle){
        let musicFind = {}
        if(!idMusic){
            musicFind = selectedPlaylist.music[indexOfEndCircle]
        }else{
            let arrayMusicsFind = selectedPlaylist.music.filter((music)=>music.value._id == idMusic)
            console.log(arrayMusicsFind)
            musicFind = arrayMusicsFind[0]
        }
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

    return { 
        PlayPause,
        findMusicByNextBack,
    }
}