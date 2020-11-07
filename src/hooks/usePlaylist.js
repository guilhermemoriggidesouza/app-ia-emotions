import { modifyPlaylistMusics, getPlaylistByIdUser, getTitleVideo, insertIntoPlaylistMusicOtherSite, insertIntoPlaylistMusics } from '../services/PlaylistService'
import arrayMove from 'array-move'

export default function usePlaylist([playlists, setPlaylists]) {

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
            console.log(file)
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
    }

    return {
        playlistsUser,
        addingMusic,
        addingMusicLink
    }

}




