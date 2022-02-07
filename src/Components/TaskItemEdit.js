import { useState } from "react";
export const TaskItemEdit = (task) => {
    const myStorage = window.localStorage;
    const maxChars = 125;
    const [counter, setCounter] = useState(0);
    const [isInValid, setIsInValid] = useState(false);
    const [isDone, setIsDone] = useState(task.task.completed);
    const [name, setName] = useState(task.task.name);
    const [content, setContent] = useState(task.task.content);

    //Enviar los datos del formulario de editar nota
    const sendTask = async (e, index) => {
        e.preventDefault();

        const url = `https://api-dew.herokuapp.com/api/v1/tasks/${task.task._id}`;

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer ' + myStorage.getItem('token'));
        postHeaders.append('Content-Type', 'application/json');


        const data = {
            "name": name,//Accedemos al contenido de nombre
            "content": content,//Accedemos al texto de contenido
            "completed": isDone//Accedemos al estado de la nota
        }
        
        await fetch(url, {
                method: 'PATCH',
                headers: postHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
        })
        .then(() => task.setChange(true))//Cambiamos el componente
        .then(() => task.setEdit(true))//Actualizamos la lista de notas para que se muestren al usuario los cambios
        .catch(err => console.log(err));
    };

    const cancelEdit = (e) => {
        e.preventDefault();

        task.setChange(true);//Cambiamos al otro componente
    }

    return <div key={task._id + 'itemEdit'} className="d-flex flex-column justify-content-center mb-3">
    <form className="form needs-validation" onSubmit={(e) => !isInValid ? sendTask(e, task.index) : e.preventDefault()}>
        <div className="form-control d-flex flex-column">

            <div className="d-flex flex-column">
                <label htmlFor="name" className="form-label align-self-center">Name</label>
                <input className="form-control" type="text" id={"nameEdit" + task.index} name="name" minLength={3} maxLength="20" value={name} onChange={e => setName(e.target.value)} autoComplete="off" required/>
                <div className="invalid-feedback">It can only be 250 characters long</div>
            </div>

            <br/>

            <div className="d-flex flex-column">
                <label htmlFor="content" className="visually-hidden">Task Content</label>
                <textarea value={content} rows="5" id={"contentEdit" + task.index} 
                className={"form-control"  + (isInValid ? " is-invalid" : "")} 
                htmlFor="content"
                onChange={(e) => {
                    setCounter(e.target.value.length); 
                    e.target.value.length > maxChars ? setIsInValid(true) : setIsInValid(false);
                    setContent(e.target.value);
                }} required></textarea>
                <div className="form-text align-self-end">{counter}/{maxChars}</div>
                <div className="invalid-feedback">It can only be {maxChars} characters long{isInValid}</div>
            </div>

            <br/>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id={"completedEdit" + task.index} onClick={() => setIsDone(!isDone)} defaultChecked={isDone}/>
                <label className="form-check-label" htmlFor="completed">{isDone ? 'Done' : 'Pending'}</label>
            </div>
            <br/>

            <div className="d-flex d-lg-column justify-content-between">
                <button type="submit" className="btn btn-success">Save</button>
                <button type="submit" className="btn btn-danger" onClick={(e) => cancelEdit(e)}>Cancel</button>
            </div>
            
        </div>
    </form>
</div>
}