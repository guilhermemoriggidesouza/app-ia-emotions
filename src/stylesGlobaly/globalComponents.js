
import styled from 'styled-components'
import otf from './fonts/lineto-circular-black.otf';
import woff from './fonts/lineto-circular-black.woff';
import woff2 from './fonts/lineto-circular-black.woff2';
import ttf from './fonts/lineto-circular-black.ttf';
import svg from './fonts/lineto-circular-black.svg';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle` 
    @font-face {
        font-family: "Circular-Black";
        src: url("./fonts/lineto-circular-black.eot"); /* IE9 Compat Modes */
        src: url("./fonts/lineto-circular-black.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
            url("${otf}") format("opentype"), /* Open Type Font */
            url("${svg}") format("svg"), /* Legacy iOS */
            url("${ttf}") format("truetype"), /* Safari, Android, iOS */
            url("${woff}") format("woff"), /* Modern Browsers */
            url("${woff2}") format("woff2"); /* Modern Browsers */
        font-weight: normal;
        font-style: normal;
    }
    * {    
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    body {
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
        font-family: Circular-Black, sans-serif;
    }
`;

const Button = styled.button`
    background: transparent;
    border-radius: 35px;
    border: 2px solid #1db954;
    color: #1db954;
    margin: ${props => props.my || "0em"} ${props => props.mx || "0em"};
    margin-right: ${props => props.mr || "0em"};
    width: ${props => props.w};
    padding: 0.5em 1em;
    transition: .2s all;
  
    &:hover{
        transition: .3s all;
        background: #1db954;
        color: #FFFFFF;
    }
    &:disabled{
        transition: .3s all;
        background: #1db954;
        opacity: 0.5;
        color: #FFFFFF;
    }
`
const Text = styled.p`
    font-size : ${props => props.size};
    padding: ${props => props.py || "0em"} ${props => props.px || "0em"};
    padding-bottom: ${props => props.pb || "0em"};
    color :${props => props.color || "#FFFFFF"};
    white-space: ${props => props.wrap || "nowrap"}!important; 
    text-overflow: ${props => props.elip || "ellipsis"};
    margin: ${props => props.my || "0em"} ${props => props.mx || "0em"};
    margin-left: ${props => props.ml || "0em"};
    align-self: ${props => props.as || "inherit"};
    opacity:${props => props.low_opacity ? "0.3" :"1"};
    ${
        props => {
            return props.tlines ? (`
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            `): ``
        }
    }

`

const Dflex = styled.div`
    display:flex;
    justify-content: ${props => props.jc || "start"}
`

const Dblock = styled.div`
    display:block;
`

const Input = styled.input.attrs(props => ({
    type: props.type,
}))`
    width:100%;
    margin: ${props => props.my || "0em"} ${props => props.mx || "0em"};
    margin-bottom: ${props => props.mb || "0em"};
    padding: ${props => props.py || "0em"} ${props => props.px || "1em"};
    ${props => props.pr ? `padding-right:${props.pr};` : "" }
    color: #000;
    border: 0;
    border-radius: 500px;
`

export {
    Button,
    Text,
    GlobalStyle,
    Dflex,
    Input,
    Dblock
}