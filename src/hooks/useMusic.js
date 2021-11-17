import { modifyPlaylistMusics, removeMusic } from '../services/PlaylistService'
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

    async function handlerRemoveMusic(id, idplaylist) {
        try{
            await removeMusic(id, idplaylist)
        }catch(error){
            alert(error)
        }
    }

    async function changeOrderMusic(selectPlaylist, actualPos, newPos){
        const newPlaylists = [...playlists]
        const newMusics = arrayMove(selectPlaylist.music, actualPos, newPos)
        newPlaylists[playlists.indexOf(selectPlaylist)].music = newMusics
        setPlaylists(newPlaylists)
        await modifyPlaylistMusics(selectPlaylist._id, newMusics)
        return newPlaylists
    }
    
    async function handlerSetPlaylistByEmotion(nameEmotion) {
        try{
            if(!nameEmotion || !playlists){
                return
            }

            let newPlaylist = []
            if(selectedPlaylist.music){
                newPlaylist = await changeOrderMusic(selectedPlaylist, 0, selectedPlaylist.music.length-1)
            }
            if(newPlaylist){
                const [selectPlaylist] = newPlaylist.filter(playlist => playlist.title.toLowerCase() == nameEmotion.toLowerCase())
                if(selectPlaylist && selectPlaylist.music && selectPlaylist.music.length > 0){
                    const [file] = selectPlaylist.music
                    selectMusic(selectPlaylist, file)
                }
            }

        }catch(error){

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
        handlerSetPlaylistByEmotion,
        handlerSetMusic,
        changeOrderMusic,
        selectMusic,
        handlerRemoveMusic
    }
}