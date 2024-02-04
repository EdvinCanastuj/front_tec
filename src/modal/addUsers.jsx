import { useEffect, useState } from "react";
import "./style.css";

const AddUser = ({ setOpenModal }) => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        cel: '',
        correo: '',
        password: '',
        tipo_rol: '',
    });

    const [roles, setRoles] = useState([]);
    const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false);
    useEffect(() => {
        fetch('http://localhost:4000/rol')
            .then(res => res.json())
            .then(data => {
                setRoles(data);
            })
            .catch(err => console.log('Error al obtener los roles', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }
    const handleSelectOpen = () => {
        setIsRoleSelectOpen(true);
    };

    const handleSelectClose = () => {
        setIsRoleSelectOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                setUserData({
                    nombre: '',
                    apellido: '',
                    cel: '',
                    correo: '',
                    password: '',
                    tipo_rol: '',
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
                    <h3>Agregar nuevo Usuario</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Nombre</label>
                        <input
                            type="text"
                            class="form-control"
                            id="nombre"
                            name="nombre"
                            value={userData.nombre}
                            onChange={handleInputChange}
                            placeholder="Eje 'Juan'"
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Apellido</label>
                        <input
                            type="text"
                            class="form-control"
                            id="apellido"
                            name="apellido"
                            value={userData.apellido}
                            onChange={handleInputChange}
                            placeholder="Eje 'Ramos'"
                            required
                        />
                    </div>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            <label for="exampleInputPassword1">Celular</label>
                            <input
                                type="number"
                                class="form-control"
                                id="cel"
                                name="cel"
                                value={userData.cel}
                                onChange={handleInputChange}
                                placeholder=""
                            />
                        </div>
                        <div className="form-group col-md-6"><label for="exampleFormControlSelect1">Rol</label>
                            <div
                                className={`select-wrapper ${isRoleSelectOpen ? 'select-open' : ''
                                    }`}
                            >
                                <select
                                    className="form-control"
                                    id="tipo_rol"
                                    name="tipo_rol"
                                    value={userData.tipo_rol}
                                    onClick={handleSelectOpen}
                                    onBlur={handleSelectClose}
                                    onChange={handleInputChange}
                                    placeholder="Eje 'User'"
                                >
                                    <option value="">Elige un rol</option>
                                    {roles.map(rol => (
                                        <option key={rol.id_rol} value={rol.id_rol}>
                                            {rol.tipo_rol}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <div class="form-row">
                            <div className="form-group col-md-6">
                                <label for="exampleInputPassword1">Correo</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="correo"
                                    name="correo"
                                    value={userData.correo}
                                    onChange={handleInputChange}
                                    placeholder="Eje 'Ramos'"
                                    required
                                />
                            </div>
                            <div className="form-group col-md-6">

                                <label for="exampleInputPassword1">Contraseña</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    placeholder=""
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
export default AddUser;