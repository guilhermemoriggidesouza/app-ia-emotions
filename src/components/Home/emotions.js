import { playlistsContext, SelectedPlaylistContext } from '../../context/playlistContext'
import { filePlayingContext } from '../../context/filePlaying'
import React, { useState, useEffect, useContext } from 'react';
import { getLastMusicByPlaylist, modifyPlaylistMusics } from '../../services/PlaylistService'
import { Text, Button, Dflex, Input } from '../../stylesGlobaly/globalComponents'
import useMusic from '../../hooks/useMusic'

const Emotions = (props)=>{
    const [selectedPlaylist, setSelectedPlaylist] = useContext(SelectedPlaylistContext)
    const [playlists, setPlaylists] = useContext(playlistsContext)
    const [videoFile, setVideoFile] = useContext(filePlayingContext)
    const { handlerSetPlaylistRandom } = useMusic(
        [videoFile, setVideoFile],
        [playlists, setPlaylists],
        [selectedPlaylist, setSelectedPlaylist]
    )

    useEffect(()=>{
        console.log(playlists)
        setSelectedPlaylist(playlists)
    },[])

    return (
        <div style={{ width: "100%" }}>
            <Text my="20px">Playlist Selecionada: {selectedPlaylist.title}</Text>
            <Button my="20px" onClick={handlerSetPlaylistRandom}>Mudar Playlist</Button>
        </div>
    )
}

export default Emotions;