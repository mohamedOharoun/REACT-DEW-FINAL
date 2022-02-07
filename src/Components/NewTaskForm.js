import { useState } from "react";

export const NewTaskForm = (item) => {
    const myStorage = window.localStorage;
    const maxChars = 125;
    const [counter, setCounter] = useState(0);
    const [isInValid, setIsInValid] = useState(false);

    const sendTask = async (e) => {
        e.preventDefault();

        const url = 'https://api-dew.herokuapp.com/api/v1/tasks';

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer ' + myStorage.getItem('token'));
        postHeaders.append('Content-type', 'application/json');


        const data = {
            "name": document.getElementById('name').value,//Obtenemos el nombre del formulario
            "content": document.getElementById('content').value//Obtenemos el contenido del formulario
        }
        
        await fetch(url, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
        })
        .then(() => item.addItem())//Invocaremos a la función para que actualice la lista de notas automáticamente al usaurio
        .then(() => document.getElementById('formNewTask').reset())//Ponemos en blanco el formulario tras mandar los datos exitosamente
        .catch(err => console.log(err));
    };

    return (
        <div className="col-lg-3 d-flex flex-column justify-content-center mt-3">
            <form id="formNewTask" className="form needs-validation" onSubmit={(e) => !isInValid ? sendTask(e) : e.preventDefault()}>
                <div className="form-control d-flex flex-column">

                    <div className="d-flex flex-column">
                        <label htmlFor="name" className="form-label align-self-center">Name</label>
                        <input className="form-control" type="text" id="name" name="name" minLength={3} maxLength="20" autoComplete="off" required/>
                        <div className="invalid-feedback">It can only be 250 characters long</div>
                    </div>

                    <br/>

                    <div className="d-flex flex-column">
                        <label htmlFor="content" className="visually-hidden">Task Content</label>
                        <textarea rows="10" id="content" className={"form-control"  + (isInValid ? " is-invalid" : "")} htmlFor="content" onChange={(e) => {setCounter(e.target.value.length); e.target.value.length > maxChars ? setIsInValid(true) : setIsInValid(false)}} required></textarea>
                        <div className="form-text align-self-end">{counter}/{maxChars}</div>
                        <div className="invalid-feedback">It can only be {maxChars} characters long{isInValid}</div>
                    </div>

                    <br/>

                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}

export default NewTaskForm;