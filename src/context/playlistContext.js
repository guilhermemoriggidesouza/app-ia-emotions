import React from 'react'

export const playlistsContext = React.createContext({
    playlists: false,
    setPlaylists: ()=>{}
});

export const selectedPlaylistContext = React.createContext({
    selectedPlaylist: "", 
    setSelectedPlaylist: ()=>{}
})