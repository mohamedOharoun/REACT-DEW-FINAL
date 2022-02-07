import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import {NewTaskForm} from './NewTaskForm';
import {TasksList} from './TasksList';
import {REE_DATA} from './REE_DATA';
import {Menu} from './Menu';
import {Footer} from './Footer';



function MainPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  //Comprueba que están todas las credenciales siempre que entre en la página
  useEffect(() => {
    const checkLogIn = () => {
      const myStorage = window.localStorage;
      //Obtener las credenciales del usario
      const user = {
        name: myStorage.getItem('name'),
        token: myStorage.getItem('token')
      }
      
      if(!user.token && !user.name){
        navigate('/login');
      }

      setName(user.name);
    }

    checkLogIn();
    
  }, [navigate]);
  

  const style = {height: '100%'};
  const [item, setItem] = useState(false);
  //Actualiza el listado de notas tras introducir una nueva
  const addItem = () => {
    setItem(!item);
  };

  return (
    <div className='container-fluid p-0'>
      <Menu name={name}/>
        <div className="container mb-3" style={{style}}>
          <div className="row" style={style}>
            <NewTaskForm item={item} addItem={addItem}/>
            <TasksList item={item}/>
            <REE_DATA/>
          </div>
        </div>
      <Footer/>
    </div>
  );
}

export default MainPage;