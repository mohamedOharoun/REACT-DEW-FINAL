import { useState } from 'react';
import {Enter} from './Enter';
import {Register} from './Register';

export const Login = () => {
    const style = {height: '100%'};

    const [login, setLogin] = useState(true);
    //Permite cambiar entre un componente de login o de registro
    const changeToComponent = () => {
        setLogin(!login)
    }

    return (
    <div style={style} className="container">
        <div style={style} className='col-12 d-flex  align-items-center'>
            {login && <Enter changeToRegister={changeToComponent}/>}
            {!login && <Register changeToLogin={changeToComponent}/>}
        </div>
    </div> )
};

export default Login;