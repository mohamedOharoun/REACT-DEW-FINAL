import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Enter = (changeComponent) => {
    const [credentials, setCredentials] = useState(false);
    const style = {width: '100%'};
    const myStorage = window.localStorage;
    const navigate = useNavigate();
    //Método que enviará las credenciales para comprobar su fiabilidad y obtener el token de identificación
    const logInUser = async (e) => {
        e.preventDefault();

        
        const url = 'https://api-dew.herokuapp.com/api/v1/login/login';

        const postHeaders = new Headers();
        postHeaders.append('Content-type', 'application/json');

        const data = {
            "email": document.getElementById('email').value,//Obtener el contenido del campo email
            "password": document.getElementById('password').value//Obtener el contenido del campo contraseña
        }
        
        const res = await fetch(url, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
        })
        .then(res => res.status === 200 ? res.json() : wrongCredentials(true))//Permitiremos el acceso o informaremos de un error en el login según el status htttp
        .catch(err => console.log(err));
        //Guardamos las credenciales
        if(res){
            myStorage.clear();
            myStorage.setItem('token', res.token)
            myStorage.setItem('name', res.user.name)
        }
        //Si las credenciales están disponibles el usuario será diriigo a la aplicación
        if(myStorage.getItem('token') && myStorage.getItem('token')){
            navigate('/');
        }
    };
    
    const wrongCredentials = (state) => {
        setCredentials(state);
    };

    const register = (e) => {
        e.preventDefault();
        changeComponent.changeToRegister();
    };

    return (
        
        <div style={style} className="col-12 d-flex flex-column justify-content-center align-items-center">
            <form id="formNewTask" className="col-11 col-sm-6 form needs-validation justify-content-cent align-items-center" onSubmit={(e) => logInUser(e)}>
                <div className="form-control d-flex flex-column justify-content-center align-items-center">
    
                    <div className="mb-3 col-8 mt-5">
                        <label htmlFor="email" className="form-label">E-Mail</label>
                        <input className="form-control" type="email" id="email" name="email"/>
                    </div>
    
                    <div className="mb-3 col-8">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className="form-control" type="password" id="password" name="password"/>
                    </div>
                    
                    <button className="btn btn-primary mb-3">Login</button>

                    <div className={"alert alert-danger alert-dismissible fade show col-8" + (credentials ? '' : ' d-none')} role="alert">
                        Wrong Credentials
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => wrongCredentials(false)}></button>
                    </div>
    
                    <button className="btn btn-link mb-5" onClick={(e) => register(e)}>No account? Register now</button>
                </div>
            </form>
        </div>
    );
};

export default Enter;