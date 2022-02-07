import {  Link, useNavigate } from "react-router-dom";

export const Menu = (name) => {
    const style = {width: "100%"}
    const navigate = useNavigate();

    //Borra los token de identificación y envía al usuario fuera de identificación
    const logOut = () => {
        const myStorage = window.localStorage;
        myStorage.clear();

        if(!(myStorage.getItem('token')) && !(myStorage.getItem('name'))){
            navigate('/login');
        }
    };

    return(
        <nav style={style} className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
            <span className="text-light fs-5 ms-lg-3 ms-2">Plan Your Time</span>

            <ul className="navbar-nav me-lg-3 list-group list-group-horizontal">
                <li className="nav-item mt-2 text-light d-none d-lg-block">Welcome, {name.name}</li>

                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item mt-2 text-light m-3 ms-lg-1 me-lg-1">
                    |
                </li>

                <li className="nav-item me-2">
                    <button className="btn btn-link nav-link" onClick={logOut}>Log Out</button>
                </li>
            </ul>

        </nav>
    );
}

export default Menu;