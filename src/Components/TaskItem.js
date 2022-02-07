import { useState } from "react";
import {TaskCard} from './TaskCard';
import {TaskItemEdit} from './TaskItemEdit';

export const TaskItem = (task) => {
    const [change, setChange] = useState(true);//Nos permitirá modificar el componente

    return(
        <>
            {change && <TaskCard task={task.task} index={task.index} setEdit={task.setEdit} setChange={setChange}/>}

            {!change && (<TaskItemEdit task={task.task} index={task.index} setEdit={task.setEdit} setChange={setChange}/>)}
        </>
    );
}

export default TaskItem;