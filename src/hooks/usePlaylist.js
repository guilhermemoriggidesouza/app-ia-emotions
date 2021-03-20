import { useContext } from "react";
import { modifyPlaylistMusics, getPlaylistByIdUser, getTitleVideo, insertIntoPlaylistMusicOtherSite, insertIntoPlaylistMusics } from '../services/PlaylistService'
import { selectedPlaylistContext, playlistsContext } from '../context/playlistContext'

export default function usePlaylist() {
    const [playlists, setPlaylists] = useContext(playlistsContext)
    const [selectedPlaylist, setSelectedPlaylist] = useContext(selectedPlaylistContext)
    
    async function playlistsUser(userId) {
        const infoPlaylists = await getPlaylistByIdUser(userId)
        if (Array.isArray(infoPlaylists) && infoPlaylists.length > 0) {
            setPlaylists(infoPlaylists)
        }
    }

    const addingMusic = async (files, idPlaylist, userId) => {
        var formData = new FormData()
        var arrFiles = [...files]
        arrFiles.forEach((file) => {
            formData.append('file', file)
        })
        await insertIntoPlaylistMusics(idPlaylist, formData)
        const infoPlaylists = await getPlaylistByIdUser(userId)
        setPlaylists(infoPlaylists)
    }

    const addingMusicLink = async (link, idPlaylist, userId) => {
        if (!link) return
        const infoMusica = await getTitleVideo(link)
        await insertIntoPlaylistMusicOtherSite(idPlaylist, {
            url: link,
            title: infoMusica.items[0].snippet.title
        })
        const infoPlaylists = await getPlaylistByIdUser(userId)
        setPlaylists(infoPlaylists)
        setSelectedPlaylist(infoPlaylists.filter(playlist => playlist._id == idPlaylist)[0])
    }

    return {
        playlistsUser,
        addingMusic,
        addingMusicLink
    }

}




