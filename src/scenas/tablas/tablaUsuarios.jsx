import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css"

import { useEffect, useState } from 'react';

const columns = [
    {
        field: 'id_usuario',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'nombre',
        headerName: 'Nombre',
        width: 150,
        editable: true,
    },
    {
        field: 'apellido',
        headerName: 'Apellido',
        width: 110,
        editable: true,
    },
    {
        field: 'tipo_rol',
        headerName: 'Rol',
        width: 110,
        editable: true,
    },
    {
        field: 'correo',
        headerName: 'Correo',
        width: 150,
        editable: true,
    },

    {
        field: "actions",
        headerName: "Acciones",
        width: 100,
        renderCell: (params) => {
            return <div className='action'>
                <div className="view">
                    <img src="/client/public/view.svg" alt="" />
                </div>
                <div className="delete">
                    <img src="/client/public/delete.svg" alt="" />
                </div>
            </div>
        }
    },
];

const UsuarioTab = () => {
    const [data, setData] = useState([]);
    //descomentar la siguiente linea para usar consulta personalizada
    const [data1, setData1] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    const [intervalCount, setIntervalCount] = useState(0);


    // variables para editar o modificar
    const [editNombreId, setEditNombreId] = useState(null);
    const [editNombre, setEditNombre] = useState('');
    const [editApellido, setEditApellido] = useState('');
    const [editRol, setEditRol] = useState('');
    const [editCorreo, setEditCorreo] = useState('');
    const [cel, setCel] = useState('');
    const [password, setPassword] = useState('');

    const updateData = async () => {
        try {
            const response = await fetch('http://localhost:4000/usuario');
            if (!response.ok) {
                throw new Error('Error al obtener datos de la API');
            }
            const data = await response.json();
            const dataWithId = data.map((item, index) => ({ ...item, id: index }));
            setData(dataWithId);
        }
        catch (err) {
            console.error('Error al obtener los datos de la api: ', err);
        }
    };
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/usuario');
            if (!response.ok) {
                throw new Error('Error al obtener datos de la API');
            }
            const data = await response.json();
            const dataWithId = data.map((item, index) => ({ ...item, id: index }));
            setData(dataWithId);
        }
        catch (err) {
            console.error('Error al obtener los datos de la api: ', err);
        }
    };
    const fetchData1 = async () => {
        try {
            const response = await fetch('http://localhost:4000/usuario');
            if (!response.ok) {
                throw new Error('Error al obtener datos de la API');
            }
            const data = await response.json();

            // Agrega un id único a cada fila basado en el índice
            const dataWithIds = data.map((item, index) => ({ ...item, id: index }));

            setData1(dataWithIds); // Actualiza el estado con los datos que tienen identificadores únicos
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            updateData();
            // Incrementa el contador del intervalo
            setIntervalCount(intervalCount + 1);
        }, 5000); // Actualiza cada 5 segundos (ajusta el valor según tus necesidades)
        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, [intervalCount]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData1();
    }, []);


    useEffect(() => {
        fetch('http://localhost:4000/rol')
            .then(response => response.json())
            .then(data => {
                setRoles(data);
            })
            .catch(error => {
                console.error('Error al obtener los roles', error);
            });
    }, []);

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setDialogOpen(true);
    };

    const handleViewClick = (id_usuario) => {
        const usuarios = data1.filter((item) => item.id_usuario === id_usuario);
        if (usuarios.length > 0) {
            const usuario = usuarios[0]; // Obtiene el primer usuario del array
            setEditNombreId(id_usuario);
            setEditNombre(usuario.nombre);
            setEditApellido(usuario.apellido);
            setEditRol(usuario.tipo_rol);
            setEditCorreo(usuario.correo);
            setCel(usuario.cel);
            setPassword(usuario.password);

            setAddUserOpen(true);
        }
    };
    //Eliminar usuario
    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/usuario/${selectedUserId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDialogOpen(false);
                fetchData();
            } else {
                console.error('Error al eliminar el usuario');
            }

        }
        catch (err) {
            console.error('Error al eliminar el usuario: ', err);
        }

    };
    const handleCancelModificar = () => {
        setAddUserOpen(false);
    };

    const handleCancelDelete = () => {
        setDialogOpen(false);
        window.history.back();
    };
    const handleUpdateUsuario = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/usuario/${editNombreId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: editNombre,
                    apellido: editApellido,
                    tipo_rol: editRol,
                    correo: editCorreo,
                    cel: cel,
                    password: password,
                }),
            });
            if (response.ok) {
                setAddUserOpen(false);
                fetchData();
            } else {
                console.error('Error al actualizar el usuario');
            }
        } catch (err) {
            console.error('Error al actualizar el usuario: ', err);
        }

    };


    return (
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={data}
                // columns={columns}
                columns={columns.map((column) =>
                    column.field === 'actions'
                        ? {
                            ...column,
                            renderCell: (params) => (
                                <div className='action'>
                                    <div className='view'>
                                        <img src="/view.svg" alt="" onClick={() => handleViewClick(params.row.id_usuario)} />
                                    </div>
                                    <div className='delete' onClick={() => handleDeleteClick(params.row.id_usuario)}>
                                        <img src='/delete.svg' alt='' />
                                    </div>
                                </div>
                            ),
                        }
                        : column
                )}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    }
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />

            {/* Cuadro de diálogo de confirmación */}
            {isDialogOpen && (
                <div className='confirmation-dialog'>
                    <div className='confirmation-dialog-1'>
                        <p>¿Está seguro de que desea eliminar este usuario?</p>
                        <div className="footer">
                            <button onClick={handleConfirmDelete}>Aceptar</button>
                            <button id="cancelBtn" onClick={handleCancelDelete}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Formulario para editar o modificar */}
            {isAddUserOpen && (
                <div className="confirmation-dialog">
                    <div className="confirmation-dialog-1" style={{ height: "625px" }}>
                        <h4>Editar Usuario</h4>
                        <form onSubmit={handleUpdateUsuario}>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Nombre</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    // id="nombre"
                                    // name="nombre"
                                    value={editNombre}
                                    onChange={(e) => setEditNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Apellido</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="apellido"
                                    name="apellido"
                                    value={editApellido}
                                    onChange={(e) => setEditApellido(e.target.value)}
                                />
                            </div>
                            <div class="form-row">
                                <div className="form-group col-md-6">
                                    <label for="exampleInputPassword1">Correo</label>
                                    <input
                                        type="text" ç
                                        class="form-control"
                                        id="nombre_usuario"
                                        name="nombre_usuario"
                                        value={editCorreo}
                                        onChange={(e) => setEditCorreo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="exampleFormControlSelect1">Rol</label>

                                <select
                                    className="form-control"
                                    // id="id_rol"
                                    // name="id_rol"
                                    value={editRol}
                                    onChange={(e) => setEditRol(e.target.value)}
                                >
                                    {/* <option value={editedRol}></option> */}
                                    {roles.map(rol => (
                                        <option key={rol.id_rol} value={rol.id_rol}>
                                            {rol.tipo_rol}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="footer">
                                <button id="cancelBtn" onClick={handleCancelModificar}>Cancelar</button>
                                <button type="submit">Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default UsuarioTab;


