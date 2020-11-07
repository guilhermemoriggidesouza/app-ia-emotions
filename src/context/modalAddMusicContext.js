import React from 'react'

export const openAddContext = React.createContext({
    openModalAdd: false,
    setOpenModalAdd: ()=>{}
});