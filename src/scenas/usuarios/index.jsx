import { useState } from 'react';
import UsuarioTab from "../tablas/tablaUsuarios";
import "./style.css";
import AddUser from "../../modal/addUsers";

const UserAdd = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <div>
            <div className='users'>
                <div className='info'>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>Usuarios</h1>
                    <button
                        className="btnAdd"
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >Agregar Usuario</button>
                </div>
                    <UsuarioTab slug="users"/>
                    {modalOpen && <AddUser setOpenModal={setModalOpen} />}

            </div>
        </div>
    )
}

export default UserAdd;

