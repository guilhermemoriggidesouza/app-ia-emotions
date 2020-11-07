import React from 'react'

export const filePlayingContext = React.createContext({
    videoFile: {
        playing: false,
    },
    setVideoFile: ()=>{}
});