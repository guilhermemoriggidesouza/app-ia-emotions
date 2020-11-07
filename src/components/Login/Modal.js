import React, {useState, useEffect, useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Text, Button, Dflex, Input } from '../../stylesGlobaly/globalComponents'
import { openSubsContext } from '../../context/modalSubsContext';
import { createLogin } from "../../services/LoginService"

export default function ModalSubs() {
    const [openModalSubs, setOpenModalSubs] = useContext(openSubsContext)
    const [loginInput, setLoginInput] = useState("") 
    const [nameInput, setNameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    async function handlerSubmit(){
        const resp = await createLogin({
            login: loginInput,
            username: nameInput,
            password: passwordInput
        })
        setOpenModalSubs(false)
    }

    return (
        <div>
            <Dialog 
                open={openModalSubs} 
                onClose={()=>setOpenModalSubs(false)} 
                PaperProps={{
                    style: {
                        backgroundColor: '#121212',
                        boxShadow: 'none',
                        borderRadius: 20
                    },
                }} 
            >
                <DialogContent>
                        <Text size="28px">Spotifeel</Text>
                        <Input mb="12px" py="10px" type="text" placeholder="Login" onChange={e => setLoginInput(e.target.value)}/>
                        <Input mb="12px" py="10px" type="text" placeholder="Nome" onChange={e => setNameInput(e.target.value)}/>
                        <Input mb="12px" py="10px" type="password" placeholder="Senha" onChange={e => setPasswordInput(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpenModalSubs(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handlerSubmit} >
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}