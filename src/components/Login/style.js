import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';


const Content = styled.div`
    height: 100%;
    position: absolute;
    left: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: #121212;
    overflow: hidden;
    text-align: center;
`

const LoginArea = styled.div`
    display:inline-block;
`

const ContainerLogin = styled.div`
    position: relative;
    top: 50%;
    display: inline-block;
    transform: translateY(-50%);
    width:90%;
`

const Logo = styled.img`
    width: 30px;
    height: 30px;
    margin-right:12px;
`;

const LoginContainer = styled.a`
    border: solid 3px #1db954;
    display: flex;
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 20px;
    border-radius: 20px;
    backgorund: #000000;

    @media(max-width: 400px) {
        position: absolute;
        display: block;
        width: 90%;
        left: 0px;
        margin: 0px 10px;
    }
`

export {
    Content,
    LoginArea,
    ContainerLogin,
    Logo,
    LoginContainer
}

