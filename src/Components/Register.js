import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (changeComponent) => {
    const [credentials, setCredentials] = useState(false);
    const style = {width: '100%'};
    const myStorage = window.localStorage;
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        
        const url = 'https://api-dew.herokuapp.com/api/v1/login/register';

        const postHeaders = new Headers();
        postHeaders.append('Content-type', 'application/json');

        const data = {
            "name": document.getElementById('name-register').value,
            "email": document.getElementById('email-register').value,
            "password": document.getElementById('password-register').value
        }
        
        const res = await fetch(url, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
        })
        .then(res => res.status === 201 ? res.json() : wrongCredentials(true))//Permitiremos el acceso o informaremos de un error en el registro según el status htttp
        .catch(err => console.log(err));

        if(res){
            myStorage.clear();//Borramos los datos que haya en caso de que se haya usado la aplicación por otro usuario
            myStorage.setItem('token', res.token)
            myStorage.setItem('name', res.user.name)
        }
        //Redireccionaremos si se ha podido añadir un token
        if(myStorage.getItem('token') && myStorage.getItem('token')){
            navigate('/');
        }
    };
    //En caso de que el usuario desee cambiar a un formulario de login
    const login = (e) => {
        e.preventDefault();
        changeComponent.changeToLogin();
    };
    //Mostrará un mensaje en caso de que haya un error en el registro
    const wrongCredentials = (state) => {
        setCredentials(state);
    };

    return (
        
        <div style={style} className="col-12 d-flex flex-column justify-content-center align-items-center">
            <form id="formNewTask" className="col-11 col-sm-6 form needs-validation justify-content-cent align-items-center" onSubmit={(e) => registerUser(e)}>
                <div className="form-control d-flex flex-column justify-content-center align-items-center">
    
                    <div className="mb-3 col-8 mt-5">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="form-control" type="name" id="name-register" name="name" minLength="3" maxLength="50" required/>
                    </div>

                    <div className="mb-3 col-8">
                        <label htmlFor="email" className="form-label">E-Mail</label>
                        <input className="form-control" type="email" id="email-register" name="email"/>
                    </div>
    
                    <div className="mb-3 col-8">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className="form-control" type="password" id="password-register" name="password" minLength="3" required/>
                    </div>
                    
                    <button className="btn btn-primary mb-3">Register</button>
    
                    <div className={"alert alert-danger alert-dismissible fade show col-8" + (credentials ? '' : ' d-none')} role="alert">
                        Error Registering
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => wrongCredentials(false)}></button>
                    </div>

                    <button className="btn btn-link mb-5" onClick={e => login(e)}>Already have an account? Log In Here</button>
                </div>
            </form>
        </div>
    );
};

export default Register;