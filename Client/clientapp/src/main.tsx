import ReactDOM from 'react-dom/client'
import './CSS/Styles.css'
import React, {StrictMode} from "react";
import 'jotai-devtools/styles.css';
import {BrowserRouter} from "react-router-dom";
import App from './Components/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>
)
