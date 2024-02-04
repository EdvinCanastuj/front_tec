import "./style.css";
import logo from "../login/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserRole } from "../login/UserRoleContext";
import 'react-toastify/dist/ReactToastify.css';
import Bienvenida from "../home/index";
import UserAdd from "../usuarios/index";
import Demeritos from "../demerito/index";





const Navbar = () => {
    const { userRole } = useUserRole();
    const [showBienvenida, setShowBienvenida] = useState(true);
    const [showUserAdd, setShowUserAdd] = useState(false);
    const [showDemerito, setShowDemerito] = useState(false);


    const allSideMenu = document.querySelectorAll('#sidebar .sidebar-menu.top li a');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        toast.success("Seción cerrada exitosamente");
    }

    allSideMenu.forEach((item) => {
        const li = item.parentElement;
        item.addEventListener('click', function() {
            allSideMenu.forEach((i) => 
            i.parentElement.classList.remove('active'));
            li.classList.add('active');
        });
    });

    const handleMenuToggle = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('hide');
    }
    //funcion del home
    const handerBienvenidaClick = () => {
        setShowBienvenida(true);
        setShowUserAdd(false);
        setShowDemerito(false);

    }
    //funcion para Usuarios
    const handerUserClick = () => {
        setShowBienvenida(false);
        setShowUserAdd(true);
        setShowDemerito(false);

    }
    //funcion para demeritos
    const handerDemeritoClick = () => {
        setShowBienvenida(false);
        setShowUserAdd(false);
        setShowDemerito(true);
    }


    return (
        <div><section id="sidebar">
        <a href className="brand" style={{cursor: "pointer"}} onClick={handerBienvenidaClick}>
            <i className="bx bxs-smile"></i>
            <span className="text">Teczion</span>
        </a>
        <ul className="side-menu top">
        {userRole === 'admin' && (
            <>
                <li className="active">
                    <a href="#rmeritos" >
                        <i className="bx bxs-user"></i>
                        <span className="text">Registrar Méritos</span>
                    </a>
                    
                </li>
            
                <li>
                    <a  href="#rdemeritos" onClick={handerDemeritoClick}>
                        <i className="bx bxs-user"></i>
                        <span className="text">Registrar Deméritos</span>
                    </a>
                </li>


                <li>
                    <a href="#cargarestudiantes" >
                        <i className="bx bxs-dashboard" ></i>
                        <span className="text">Cargar Estudiantes</span>
                    </a>
                </li>



                <li>
                    <a href="#hmeritos" >
                        <i className='bx bxs-folder'></i>
                        <span className="text">Historial de Meritos</span>
                    </a>
                </li>

                <li>
                    <a href="#hdemeritos" >
                        <i className='bx bxs-spreadsheet'></i>
                        <span className="text">Historial de Deméritos</span>
                    </a>
                </li>

                <li>
                    <a href="#usuarios" onClick={handerUserClick}>
                        <i className='bx bxs-report'></i>
                        <span className="text">Usuarios</span>
                    </a>
                </li>
            </>
            )}
            {userRole === 'usuario' && (
                <>
                    <li className="active">
                    <a href="#rmeritos" >
                        <i className="bx bxs-user"></i>
                        <span className="text">Registrar Méritos</span>
                    </a>
                    
                </li>
            
                <li>
                    <a  href="#rdemeritos">
                        <i className="bx bxs-user"></i>
                        <span className="text">Registrar Deméritos</span>
                    </a>
                </li>
                <li>
                    <a href="#hmeritos" >
                        <i className='bx bxs-folder'></i>
                        <span className="text">Historial de Meritos</span>
                    </a>
                </li>

                <li>
                    <a href="#hdemeritos" >
                        <i className='bx bxs-spreadsheet'></i>
                        <span className="text">Historial de Deméritos</span>
                    </a>
                </li>

                    {/* <li>
                        <a href="#reporte" onClick={handerReporteClick}>
                            <i className='bx bxs-report'></i>
                            <span className="text">Tus Reportes</span>
                        </a>
                    </li> */}
                </>
            )}
        </ul>

        <ul className="side-menu">
            <li>
                <a href className="logout" onClick={handleLogout}>
                    <i className="bx bxs-log-out-circle"></i>
                    <span className="text">Salir</span>
                </a>
            </li>
        </ul>
    </section>


    
    <section id="content">
        <nav>
            <i className='bx bx-menu' onClick={handleMenuToggle}></i>
            <a href className="profile">
                <img src={logo} alt="" />
            </a>
            <a href style={{cursor: "pointer"}} onClick={handerBienvenidaClick} className="nav-link"> <h4> <b>Méritos y Deméritos</b> </h4> </a>
            <form action="#">
            </form>

            <input type="checkbox" id="switch-mode" hidden/>
            <label for="switch-mode" class="switch-mode"></label>

            <a href className="profile">
                <img src={logo} alt="" />
            </a>
        </nav>

        <main>
            {showBienvenida && <Bienvenida />}
            {showUserAdd && <UserAdd />}
            {showDemerito && <Demeritos />}
            
        </main>
    </section>
    </div>
    )
}

export default Navbar;




