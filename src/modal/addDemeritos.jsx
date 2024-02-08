import { useEffect, useState } from "react";
import "./style.css";
import { useUserId } from "../scenas/login/UserIdContext";
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';

const AddDemerito = ({ setOpenModal }) => {
    const { userId } = useUserId();
    const [ id_grado, setGradoId ] = useState('');

    const [userData, setUserData] = useState({
        id_usuario: userId,
        id_razon: '',
        id_estudiante: '',
        curso: '',
        cantidad: '',
        comentario: '',
    });
    const [usuario, setUsuario] = useState([]);
    const [razon, setRazon] = useState([]);
    const [estudiante, setEstudiante] = useState([]);
    const [grado, setGrado] = useState([]);


    const [isRazonSelectOpen, setIsRazonSelectOpen] = useState(false);
    const [isEstudianteSelectOpen, setIsEstudianteSelectOpen] = useState(false);
    const [isGradoSelectOpen, setIsGradoSelectOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/usuario/'+userId)
            .then(res => res.json())
            .then(data => {
                setUsuario(data)
                })
            .catch(err => console.log('Error al obtener las razones', err));
            
        fetch('http://localhost:4000/grado/')
            .then(res => res.json())
            .then(data => {
                setGrado(data);
            })
            .catch(err => console.log('Error al obtener los grados', err));
            
        fetch('http://localhost:4000/razon')
            .then(res => res.json())
            .then(data => {
                setRazon(data);
            })
            .catch(err => console.log('Error al obtener las razones', err));
        fetch('http://localhost:4000/estudiante/'+id_grado)
            .then(res => res.json())
            .then(data => {
                setEstudiante(data);
            })
            .catch(err => console.log('Error al obtener los estudiantes', err));
    }, [id_grado, userId]);
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
    const handleSelectOpenGrado = () => {
        setIsGradoSelectOpen(true);
    };
    const handleSelectCloseGrado = () => {
        setIsGradoSelectOpen(false);
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
                    comentario: '',
                    
                });
                setOpenModal(false);
            } else {
                console.log('Error al crear el usuario');
            }
        } catch (err) {
            console.log('Error de conexion', err);
        }
    }
    console.log(id_grado)
    return (
        <div className="modalBackground">
            <div className="modalContainer">
            <div className="form-row">
    <div className="form-group col-12 col-md-3"/>
    <div className="form-group col-12 col-md-9 d-flex justify-content-between align-items-center">
        <div className="title">
            <h4>Ingresar Demerito</h4>
        </div>
        <div className="titleCloseBtn">
            <button
                onClick={() => {
                    setOpenModal(false);
                }}
            >
                X
            </button>
        </div>
    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label for="exampleFormControlSelect1">Profesor: </label>
                        <input
                            type="text"
                            className="form-labele"
                            id="id_usuario"
                            name="id_usuario"
                            value={usuario.map(usuario => usuario.nombre + " " + usuario.apellido)}
                            readOnly
                        />
                    </div>
                    <div className="form-group ">
                        <label for="exampleFormControlSelect1">Grado</label>
                        <div
                            //style={{ height: 35}}
                            className={`select-wrapper ${isGradoSelectOpen ? 'select-open' : ''
                                }`}
                        >
                            <Autocomplete
                                options={grado}
                                getOptionLabel={(option) => option.grado}
                                //style={{ width: 400, padding: 2, paddingTop: 8}}
                                onOpen={handleSelectOpenGrado}
                                onClose={handleSelectCloseGrado}
                                onChange={(event, newValue) => {
                                    setGradoId(newValue ? newValue.id_grado : "");
                                }}
                                renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Estudiante</label>
                        <div
                            //style={{ height: 35}}
                            className={`select-wrapper ${isEstudianteSelectOpen ? 'select-open' : ''
                                }`}
                        >
                            <Autocomplete
                                id="id_estudiante"
                                options={estudiante}
                                getOptionLabel={(option) => option.nombres + " " + option.apellidos}
                                //style={{ width: 400, padding: 2, paddingTop: 8}}
                                onOpen={handleSelectOpenEstudiante}
                                onClose={handleSelectCloseEstudiante}
                                onChange={(event, newValue) => {
                                    handleInputChange({ target: { name: 'id_estudiante', value: newValue ? newValue.id_estudiante : "" } });
                                }}
                                renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Curso</label>
                        <input
                            type="text"
                            className="form-control"
                            id="curso"
                            name="curso"
                            value={userData.curso}
                            onChange={handleInputChange}
                            placeholder=""
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Comentario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="comentario"
                            name="comentario"
                            value={userData.comentario}
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