import React, {useState, useEffect, useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { openAddContext } from '../../../context/modalAddMusicContext';
import DragAndDrop from './DragDropInput'
import { playlistsContext, SelectedPlaylistContext } from '../../../context/playlistContext'
import usePlaylist from '../../../hooks/usePlaylist';

export default function ModalAdd(props) {
    const [selectedPlaylist, setSelectedPlaylist] = useContext(SelectedPlaylistContext)
    const [openModalAdd, setOpenModalAdd] = useContext(openAddContext)
    const [playlists, setPlaylists] = useContext(playlistsContext)
    const { addingMusic, addingMusicLink } = usePlaylist([playlists, setPlaylists], [selectedPlaylist, setSelectedPlaylist])
    
    const handleDrop = async (files) => {
        addingMusic(files, props.playlist, props.user._id )
        setOpenModalAdd(false)
    }

    const handleSave = async (link) =>{
        addingMusicLink(link, props.playlist, props.user._id )
        setOpenModalAdd(false)
    }

    return (
        <div>
            <Dialog 
                open={openModalAdd} 
                onClose={()=>setOpenModalAdd(false)} 
                PaperProps={{
                    style: {
                        backgroundColor: '#121212',
                        boxShadow: 'none',
                        borderRadius: 20,
                        width: "90%"
                    },
                }} 
            >
                <DialogContent>
                    <DragAndDrop handleDrop={handleDrop} handleSave={handleSave}></DragAndDrop>
                </DialogContent>
            </Dialog>
        </div>
    );
}