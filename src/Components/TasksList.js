import React, {useState, useEffect} from 'react';
import {TaskItem} from './TaskItem';

export const TasksList = (item) => {
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [, setChange] = useState(true);

    useEffect(() => {
        const myStorage = window.localStorage;

        const getTasks = async () => {
            const tasks = await fetch('https://api-dew.herokuapp.com/api/v1/tasks', {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + myStorage.getItem('token')
                    })
                })
                .then(res => res.json())
                .then(res => res.tasks);
    
            setTasks(tasks);
        };

        getTasks();
        setEdit(false);
    }, [edit, item]);

    return (
        <div key={'taskList'} className="col-lg-5 mt-3">
        {tasks.map((task, index) => {
            return(
                <TaskItem key={task._id} task={task} index={index} setChange={setChange} setEdit={setEdit}/>
            );
        })}
        </div>
    )
}

export default TasksList;