import React from 'react'

export const playlistsContext = React.createContext({
    playlists: false,
    setPlaylists: ()=>{}
});

export const SelectedPlaylistContext = React.createContext({
    selectedPlaylist: "", 
    setSelectedPlaylist: ()=>{}
})