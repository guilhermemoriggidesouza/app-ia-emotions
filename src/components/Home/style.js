import styled from 'styled-components'
import {keyframes} from 'styled-components'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ReactPlayer from 'react-player'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import MenuIcon from '@material-ui/icons/Menu';

const Content = styled.div`
    height: 100%;
    position: absolute;
    left: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: #000000;
    overflow: auto;
    text-align: center;
`
const PlaylistContainer = styled.div`
    margin-top: 3rem!important;
    flex: 0 0;
    display: flex;
    padding: 0 20px;
    overflow: auto;
    justify-content:center;

    &:last-child{
        padding:30px;
    }

    @media(max-width: 1400px) {
        justify-content:end;
    }

    ::-webkit-scrollbar {
        margin-top:12px;
        height: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #ffffff00; 
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #121212; 
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #282828; 
    }
`
const CardPlaylist = styled.div`
    background: #121212;
    padding: 1rem;
    border-radius: 20px;
    height: inherit;
`
const CardMusic = styled.div`
    display: flex;
    color: #ffffff;
    background: #282828;
    padding: .5rem 1rem;
    border-radius: 20px;
    margin: .5rem;
    justify-content: space-between;
    transition: opacity 0.2s;
    
    &:active{
        opacity: 0.5;
    }
    $:focus{
        opacity: 0.5;
    }
`
const ContainerList = styled.div`
    overflow: auto;
    height: 40vh;
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #ffffff00; 
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #282828; 
        border-radius:10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #ffffff80; 
    }
`

const GridItemPlaylist = styled.div`
    margin: 10px;
    min-width:320px;
    max-width:320px;

    @media(max-width: 800px) {
        min-width:250px;
        max-width:250px;
        font-size:14px!important;
    }
`

const GridOverflow = styled(Grid)`
    height: inherit;
    
`
const ButtonYt = styled(IconButton)`
    padding: 6px!important;
    margin-left: -40px!important;
    height:fit-content;
`
const ContainerYoutubeInput = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    margin-top:12px;
`

const PlayerVideoStyle = styled(ReactPlayer)`
    width: 100%!important;
    height: 40vh!important;
    border: solid 3px #282828!important;
`

const BottomNav = styled(BottomNavigation)`
    position: fixed;
    bottom: 0%;
    width: 100%;
    background-color: #121212!important;
`

const ControllerMusics = styled.div`
    display: flex;
    margin: 1em 10em;
    margin-bottom: 10rem;

    @media(max-width: 800px) {
        margin: 1em 1em;
        display: block;
    }

    @media(max-width: 1200px) {
        margin: 1em 3em;
    }
`
const PlayerAudio = styled.div`
    background: #282828;
    height: ${props=>props.height || "100px"};
    width: 100%;
    position: fixed;
    bottom: ${props=>props.bottom || "0"};
`

const IconButtonPlay = styled(IconButton)`
    padding: 12px!important;
`

const MenuIconChangeMusic = styled(MenuIcon)`
    align-self: center;
`

const TimeLine = styled.input`
    display: block!important;
    height:2px;
    margin: auto!important;
    -webkit-appearance: none;
    background: #ffffff;
    outline: none;
    width: 100%;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 15px;
		height: 15px;
		border-radius: 50%;
        background: #1db954!important;
		cursor: pointer;
		transition: all 0.15s ease-in-out;
		&:hover {
            background: #1db954!important;
			transform: scale(1.2);
		}
	}
	&::-moz-range-thumb {
		width: 15px;
		height: 15px;
		border: 0;
		border-radius: 50%;
        background: #1db954!important;
		cursor: pointer;
		transition: background 0.15s ease-in-out;
		&:hover {
            background: #1db954!important;
		}
	}
`

const InfosMusic = styled.div`
    width: 90%!important;
    margin: auto;
`

const AnimatedText = styled.div`
    text-align: ${props => props.ta || "inherit"};
    width: 300px;
    display: flex;
    white-space: nowrap;
    font-size: 12px;
    overflow: hidden;
    margin: ${props => props.my || "0em"} ${props => props.mx || "0em"};
    color: white;
`
const slide = (from, to) => keyframes`
    from {
        transform: translateX(${from});
    }
    
    to {
        transform: translateX(${to});
    }
`;

const AnimatedSpan = styled.div`
    padding: ${props => props.my || "0em"} ${props => props.mx || "0em"};
    margin-left: ${props => props.from};
    animation: ${props => slide(props.to, props.from)} 6s infinite linear;
`
export {
    Content,
    PlaylistContainer,
    CardPlaylist,
    CardMusic,
    ContainerList,
    GridOverflow,
    ButtonYt,
    ContainerYoutubeInput,
    GridItemPlaylist,
    PlayerVideoStyle,
    BottomNav,
    ControllerMusics,
    PlayerAudio,
    IconButtonPlay,
    MenuIconChangeMusic,
    TimeLine,
    InfosMusic,
    AnimatedText,
    AnimatedSpan,
}