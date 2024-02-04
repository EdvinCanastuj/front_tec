import { useState } from "react";
import "./style.css";

const AddStudent = ({ setOpenModal }) => {
    const [studentData, setStudentData] = useState({
        nombres: '',
        apellidos: '',
        grado: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value,
        });
    }
    

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/estudiante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });
            if (response.ok) {
                setStudentData({
                    nombres: '',
                    apellidos: '',
                    grado: '',
                    
                });
                setOpenModal(false);
            } else {
                console.log('Error al crear el estudiante');
            }

        } catch (err) {
            console.log('Error de conexion', err);
        }
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h3>Agregar nuevo Estudiante</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Nombres</label>
                        <input
                            type="text"
                            class="form-control"
                            id="nombres"
                            name="nombres"
                            value={studentData.nombres}
                            onChange={handleInputChange}
                            placeholder="Eje 'Juan Jose'"
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Apellidos</label>
                        <input
                            type="text"
                            class="form-control"
                            id="apellidos"
                            name="apellidos"
                            value={studentData.apellidos}
                            onChange={handleInputChange}
                            placeholder="Eje 'Ramos Lopez'"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Grado</label>
                        <input
                            type="text"
                            class="form-control"
                            id="grado"
                            name="grado"
                            value={studentData.grado}
                            onChange={handleInputChange}
                            placeholder="Eje '5to Biologia A'"
                            required
                        />
                    </div>
                    
                    <div className="footer">
                        <button
                            onClick={() => {
                            setOpenModal(false);
                            }}
                            id="cancelBtn"
                            >
                            Cancel
                        </button>
                            <button type="submit">Continue</button>
                        </div>
                </form>
            </div>
        </div>
    )
}





export default AddStudent;