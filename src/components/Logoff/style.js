
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

const ButtonLogoff = styled(Button)`
    background: transparent!important;
    border-radius: 35px!important;
    border: 2px solid #1db954!important;
    color: #1db954!important;
    padding: 0.5em 1em!important;
    transition: .2s all!important;
    z-index: 999;
    float: right;
    margin-top: 1rem!important;
    margin-right: 3rem!important;

    &:hover{
        transition: .3s all!important;
        background: #1db954!important;
        color: #FFFFFF!important;
    }
    &:disabled{
        transition: .3s all!important;
        background: #1db954!important;
        opacity: 0.5!important;
        color: #FFFFFF!important;
    }
`;

const ContainerOff = styled.div`
`;

export {
    ButtonLogoff,
    ContainerOff
}
