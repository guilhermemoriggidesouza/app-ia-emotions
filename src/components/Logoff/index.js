import React, { useState, useEffect, useContext } from 'react';
import { loginContext } from '../../context/loginContext'
import CloseIcon from '@material-ui/icons/Close';
import { ButtonLogoff, ContainerOff } from './style'
import IconButton from '@material-ui/core/IconButton';
import useDeviceDetect from '../../hooks/detectDevice' 


const Logoff = ()=>{
    const [loginSession, setLoginSession] = useContext(loginContext)    
    const { isMobile } = useDeviceDetect()

    function handlerLogoff(){
        localStorage.sessionIaEmotions = ""
        setLoginSession({})
    }

    return (
        <ContainerOff>
            {
                !isMobile ?
                    loginSession.username &&<IconButton onClick={handlerLogoff} style={{float:"right", color: "#FFFFFF", zIndex:999, marginRight: "3rem"}}>
                        <CloseIcon style={{color: "#FFFFFF"}}/>
                    </IconButton>

                :   loginSession.username && <IconButton onClick={handlerLogoff} style={{float:"left", color: "#FFFFFF", zIndex:999}}>
                        <CloseIcon style={{color: "#FFFFFF"}}/>
                    </IconButton>
            }
        </ContainerOff>
    )
}

export default Logoff;