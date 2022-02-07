
export const TaskCard = (task) => {
    const myStorage = window.localStorage;

    const changeCompleted = async (completed, index, id) => {
        const url = `https://api-dew.herokuapp.com/api/v1/tasks/${id}`;

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer ' + myStorage.getItem('token'));
        postHeaders.append('Content-type', 'application/json');

        const data = {
            "name": document.getElementById('name' + index).textContent,//Accedemos al texto de nombre
            "content": document.getElementById('content' + index).textContent,//Accedemos al texto de contenido
            "completed": !completed
        }
        
        await fetch(url, {
                method: 'PATCH',
                headers: postHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
        }).then(task.setEdit(true));//Actualizará la lista tras borrar
    };

    const deleteComponent = async (id) => {
        const url = `https://api-dew.herokuapp.com/api/v1/tasks/${id}`;

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer '+ myStorage.getItem('token'));
        
        await fetch(url, {
                method: 'DELETE',
                headers: postHeaders,
                redirect: 'follow'
        }).then(task.setEdit(true));//Actualizará la lista tras borrar
    };

    return (<article key={task.task._id} className="card mb-3">
    <div className="d-flex flex-column card-body">
        <div className="d-flex justify-content-between">
            <h4 id={"name" + task.index}>{task.task.name}</h4>
            
            <div onClick={() => changeCompleted(task.task.completed, task.index, task.task._id)} className={"align-self-end btn btn-"+ (task.task.completed ? 'success' : 'secondary')}>{task.task.completed ? 'Done' : 'Pending'}</div>
        </div>
        

        <div id={"content" + task.index} className="m-3 self-align-center text-center fs-5">{task.task.content}</div>

        

   <div className="d-flex justify-content-between">
        <button className="btn btn-primary align-self-start" onClick={() => task.setChange(false)}>Edit</button>
        <button onClick={() => deleteComponent(task.task._id)} className="btn btn-danger align-self-end">Delete</button> 
   </div>
    </div>
   
</article>)
};

export default TaskCard;