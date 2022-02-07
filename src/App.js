import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './Components/MainPage';
import Login from './Components/Login';

//Se encargará de enrutar la aplicación según la dirección IP
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    );
}

export default App;