import React, { useState, useEffect, useContext } from 'react';
import { Content, LoginArea, ContainerLogin, Logo, LoginContainer } from './style'
import { Text, Button, Dflex, Input } from '../../stylesGlobaly/globalComponents'
import logoSvg from './img/logo.svg';
import loadingSvg from '../../stylesGlobaly/loading.json';
import Lottie from 'react-lottie';
import { loginContext } from '../../context/loginContext'
import { validatePasswordAndLogin } from "../../services/LoginService"
import ModalSubs from "./Modal"
import { openSubsContext } from '../../context/modalSubsContext';

const Login = ()=>{
    const [loginSession, setLoginSession] = useContext(loginContext)
    const [disabledLoginButton, setDisabledLoginButton] = useState(false)
    const [loginInput, setLoginInput] = useState("") 
    const [passwordInput, setPasswordInput] = useState("")
    const [open, setOpen] = useState(false) 
    const [loading, setLoading] = useState(false) 
    const [retornoLoading, setRetornoLoading] = useState("")
    
    function prepeareToLogin(){
        setDisabledLoginButton(true)
        setLoading(true)
        setRetornoLoading("")
        setLoginSession({})
    }

    async function LoginHandler(){
        prepeareToLogin()
        const infoLogin = await validatePasswordAndLogin(loginInput, passwordInput)
        if(infoLogin.resp){
            localStorage.sessionIaEmotions = JSON.stringify(infoLogin.resp)
            setLoginSession(JSON.parse(localStorage.sessionIaEmotions))
            
        } else {
            setRetornoLoading(infoLogin.msg)
        }
        setDisabledLoginButton(false)
        setLoading(false)
    }

    useEffect(()=>{
        setLoginInput('')
        setLoginInput('')
    }, [])

    return (
        <div>
            <Content>
                <ContainerLogin>
                    <Dflex jc="center">
                        <Logo src={logoSvg} />
                        <Text size="28px">Spotifeel</Text>
                    </Dflex>
                    <Text wrap="wrap" elip="inherit" size="16px" pb="12px">A IA que identifica sua musica pela sua emoção</Text>
                    <LoginArea>
                        <Input mb="12px" py="10px" type="text" placeholder="Login" onChange={e => setLoginInput(e.target.value)} value={loginInput}/>
                        <Input mb="12px" py="10px" type="password" placeholder="Senha" onChange={e => setPasswordInput(e.target.value)} value={passwordInput}/>
                        <Dflex>
                            <Button w="40%" size="18px" mr="12px" onClick={LoginHandler} disabled={disabledLoginButton}>Login</Button>
                            <Button w="60%" onClick={()=>setOpen(true)}>Click Aqui para se inscrever</Button>
                        </Dflex>
                    </LoginArea>
                    { 
                        loading? <Lottie 
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: loadingSvg,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice"
                                }
                            }}
                            height={40}
                            width={40}
                        /> : <Text size="16px" pb="12px">{retornoLoading}</Text>
                    }
                </ContainerLogin>
                
            </Content>
            { loginSession.username &&
                <LoginContainer href="/home">
                    <Text wrap="wrap" elip="inherit" size="16px" px="4px" color="#aaaaaa">Você está logado como:  </Text>
                    <Text wrap="wrap" elip="inherit" size="16px">{loginSession.username}</Text>
                </LoginContainer>
            }
            
            <openSubsContext.Provider value={[open, setOpen]}>
                <ModalSubs/>
            </openSubsContext.Provider>
        </div>
    );
}

export default Login;