import React from 'react'

export const loginContext = React.createContext({
    loginSession: {},
    setLoginSession: ()=>{}
});
