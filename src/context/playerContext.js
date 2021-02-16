import React from 'react'

export const playerContext = React.createContext({
    progressObs:{},
    setProgressObs: ()=>{}
});

export const playerEmotionContext = React.createContext({
    endedObs: {},
    setEndedObs: ()=>{}
});