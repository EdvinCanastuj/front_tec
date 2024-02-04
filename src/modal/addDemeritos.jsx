import { useEffect, useState } from "react";
import "./style.css";
import { useUserId } from "../scenas/login/UserIdContext";
const AddDemerito = ({ setOpenModal }) => {
    const { userId } = useUserId();

    const [userData, setUserData] = useState({
        id_usuario: userId,
        id_razon: '',
        id_estudiante: '',
        curso: '',
        cantidad: '',
    });
    const [usuario, setUsuario] = useState([]);
    const [razon, setRazon] = useState([]);
    const [estudiante, setEstudiante] = useState([]);

    const [isRazonSelectOpen, setIsRazonSelectOpen] = useState(false);
    const [isEstudianteSelectOpen, setIsEstudianteSelectOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/usuario/'+userId)
            .then(res => res.json())
            .then(data => {
                setUsuario(data)
                })
            .catch(err => console.log('Error al obtener las razones', err));
            

        fetch('http://localhost:4000/razon')
            .then(res => res.json())
            .then(data => {
                setRazon(data);
            })
            .catch(err => console.log('Error al obtener las razones', err));
        fetch('http://localhost:4000/estudiante')
            .then(res => res.json())
            .then(data => {
                setEstudiante(data);
            })
            .catch(err => console.log('Error al obtener los estudiantes', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }
    const handleSelectOpenRazon = () => {
        setIsRazonSelectOpen(true);
    };
    const handleSelectCloseRazon = () => {
        setIsRazonSelectOpen(false);
    };
    const handleSelectOpenEstudiante = () => {
        setIsEstudianteSelectOpen(true);
    };
    const handleSelectCloseEstudiante = () => {
        setIsEstudianteSelectOpen(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/demerito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                setUserData({
                    id_usuario: userId,
                    id_estudiante: '',
                    id_razon: '',
                    curso: '',
                    cantidad: '',
                    
                });
                setOpenModal(false);
            } else {
                console.log('Error al crear el usuario');
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
                    <h3>Ingresar Demerito</h3>
                </div>
                <script>
                </script>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Profesor </label>
                        <input
                            type="text"
                            class="form-control"
                            id="id_usuario"
                            name="id_usuario"
                            value={usuario.map(usuario => usuario.nombre + " " + usuario.apellido)}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Estudiante</label>
                        <div
                            className={`select-wrapper ${isEstudianteSelectOpen ? 'select-open' : ''
                                }`}
                        >
                            <select
                                className="form-control"
                                id="id_estudiante"
                                name="id_estudiante"
                                //value={userData.tipo_rol}
                                onClick={handleSelectOpenEstudiante}
                                onBlur={handleSelectCloseEstudiante}
                                onChange={handleInputChange}
                                placeholder=""
                            >
                                <option value="">Elige un estudiante</option>
                                {estudiante.map(estudiante => (
                                    <option key={estudiante.id_estudiante} value={estudiante.id_estudiante}>
                                        {estudiante.nombres} {estudiante.apellidos}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Curso</label>
                        <input
                            type="text"
                            class="form-control"
                            id="curso"
                            name="curso"
                            value={userData.curso}
                            onChange={handleInputChange}
                            placeholder=""
                        />
                    </div>
                    <div class="form-row">
                        <div class="form-row">
                            <div className="form-group col-md-6">
                                <label for="exampleFormControlSelect1">Razon </label>
                                <div
                                    className={`select-wrapper ${isRazonSelectOpen ? 'select-open' : ''
                                        }`}
                                >
                                    <select
                                        className="form-control"
                                        id="id_razon"
                                        name="id_razon"
                                        value={userData.id_razon}
                                        onClick={handleSelectOpenRazon}
                                        onBlur={handleSelectCloseRazon}
                                        onChange={handleInputChange}
                                        placeholder=""
                                    >
                                        <option value="">Elige una Razon </option>
                                        {razon.map(razon => (
                                            <option key={razon.id_razon} value={razon.id_razon}>
                                                {razon.tipo_razon}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="exampleInputPassword1">Cantidad</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="cantidad"
                                    name="cantidad"
                                    value={userData.cantidad}
                                    onChange={handleInputChange}
                                    placeholder=""
                                    required
                                />
                            </div>

                        </div>
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
export default AddDemerito;