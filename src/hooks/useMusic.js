import { getLastMusicByPlaylist, modifyPlaylistMusics } from '../services/PlaylistService'
import arrayMove  from 'array-move'
import { useContext } from 'react';
import { selectedPlaylistContext, playlistsContext } from '../context/playlistContext'
import { filePlayingContext } from '../context/filePlayingContext'
import { animationTittleContext } from '../context/animationTittleContext'

export default function useMusic(){
    const [playlists, setPlaylists] = useContext(playlistsContext)
    const [selectedPlaylist, setSelectedPlaylist] = useContext(selectedPlaylistContext)
    const [title, setTitle] = useContext(animationTittleContext)
    const [videoFile, setVideoFile] = useContext(filePlayingContext)

    async function selectMusic(selectPlaylist, music){
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
            console.log(file)
            selectMusic(selectPlaylist, file)
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
            selectMusic(selectedPlaylist, musicFind[0])
        }
    }

    return {
        handlerSetPlaylistRandom,
        handlerSetMusic,
        changeOrderMusic,
        selectMusic
    }
}