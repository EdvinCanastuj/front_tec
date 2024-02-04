import { useState } from 'react';
import EstudianteTab from "../tablas/tablaEstudiantes";
import "./style.css";
import AddStudent from "../../modal/addStudents";

const StudentAdd = () => {
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
                    <h1>Estudiantes</h1>
                    <button
                        className="btnAdd"
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >Agregar Estudiante</button>
                    <br />
                    <button className='btn'>
                        Carga masiva
                    </button>
                </div>
                    <EstudianteTab slug="students"/>
                    {modalOpen && <AddStudent setOpenModal={setModalOpen} />}

            </div>
        </div>
    )
}

export default StudentAdd;