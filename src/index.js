import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import  AllRoutes from './Routes';
import { loginContext } from './context/loginContext';
import { GlobalStyle } from './stylesGlobaly/globalComponents'
import Logoff from './components/Logoff'

function App() {
    const sessionJson = localStorage.sessionIaEmotions ? JSON.parse(localStorage.sessionIaEmotions) : ""
    const [loginSession, setloginSession] = useState(sessionJson);
    return (
        <Router>
            <loginContext.Provider value = {[ loginSession, setloginSession ]}>
                <Logoff />
                <GlobalStyle/>
                <AllRoutes />
            </loginContext.Provider>
        </Router>
    );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//dev
// serviceWorker.unregister();

//prod
serviceWorker.register();
