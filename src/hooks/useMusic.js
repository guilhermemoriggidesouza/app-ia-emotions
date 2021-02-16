import { getLastMusicByPlaylist, modifyPlaylistMusics } from '../services/PlaylistService'
import arrayMove  from 'array-move'
import { useContext } from 'react';

export default function useMusic(
    [videoFile, setVideoFile],
    [playlists, setPlaylists],
    [selectedPlaylist, setSelectedPlaylist],
    [title, setTitle]
){
    async function _selectMusic(selectPlaylist, music){
        const newVideoFile = {...music}
        newVideoFile.playing = videoFile.playing
        setSelectedPlaylist(selectPlaylist)
        setTitle(newVideoFile.value.title)
        setVideoFile(newVideoFile)
    } 

    async function changeOrderMusic(selectPlaylist, actualPos, newPos){
        const newPlaylists = [...playlists]
        const newMusics = arrayMove(selectPlaylist.music, actualPos, newPos)
        newPlaylists[playlists.indexOf(selectPlaylist)].music = newMusics
        setPlaylists(newPlaylists)
        await modifyPlaylistMusics(selectPlaylist._id, newMusics)
    }
    
    async function handlerSetPlaylistRandom() {
        if(selectedPlaylist.music){
            changeOrderMusic(selectedPlaylist, 0, selectedPlaylist.music.length-1)
        }

        const selectPlaylist = playlists[Math.floor(Math.random() * 4)]
        if(playlists.length > 0) {
            const file = await getLastMusicByPlaylist(selectPlaylist)
            _selectMusic(selectPlaylist, file)
        }
       
    }

    async function handlerSetMusic(musicFile) {
        let selectedPlaylist = {}
        let musicFind = {}
        for(let element of playlists){
            musicFind = element.music.filter((music)=>music.value._id == musicFile._id)
            if(musicFind.length>0){
                selectedPlaylist = element
                break
            }
        }

        if(playlists.length > 0) {
            _selectMusic(selectedPlaylist, musicFind[0])
        }
    }

    return {
        handlerSetPlaylistRandom,
        handlerSetMusic,
        changeOrderMusic
    }
}