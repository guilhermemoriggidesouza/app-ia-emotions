import React, { useState, useEffect, useContext, useRef, Component } from 'react';
import { Text, Button, Dflex, Input } from '../../../stylesGlobaly/globalComponents'
import SendIcon from '@material-ui/icons/Send';
import { ButtonYt, ContainerYoutubeInput } from "../style";

function DragDropInput(props) {
    const [dragging, setDragging] = useState(false)
    const [input, setInput] = useState("")
    const dropRef = useRef(null);
    let dragCounter = 0;

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true)
        }
    }
    const handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter--
        if (dragCounter > 0) return
        setDragging(false)
    }
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            props.handleDrop(e.dataTransfer.files)
            e.dataTransfer.clearData()
            dragCounter = 0
        }
    }

    useEffect(()=>{
        dragCounter = 0
        let div = dropRef.current
        div.addEventListener('dragenter', handleDragIn)
        div.addEventListener('dragleave', handleDragOut)
        div.addEventListener('dragover', handleDrag)
        div.addEventListener('drop', handleDrop)
    }, [])

    return(
        <div
            style={{display: 'inline-block', position: 'relative', height: 300, width: "100%"}}
            ref={dropRef}
        >
            <div 
                style={{
                    border: 'dashed #3c3c3c 4px',
                    backgroundColor: '#121212',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0, 
                    right: 0,
                    zIndex: 9999
                }}
            >
                {dragging ?
                    <div 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            transform: `translateY(-50%)`,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}
                    >
                        <div>Solte aqui :)</div>
                    </div> :
                    <div 
                        style={{
                            position: 'relative',
                            top: '50%',
                            right: 0,
                            transform: `translateY(-50%)`,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}
                        >
                        Arraste aqui Ou
                        <ContainerYoutubeInput>
                            <Input mb="12px" py="10px" pr="40px" type="text" placeholder="link do yotube" onChange={e => setInput(e.target.value)} value={input}/>
                            <ButtonYt color="primary" onClick={()=>props.handleSave(input)} component="span">
                                <SendIcon style={{color: "#1db954"}} />
                            </ButtonYt>
                        </ContainerYoutubeInput>
                    </div>
                }
                <tr></tr>
            </div>
        </div>
    )

}

export default DragDropInput