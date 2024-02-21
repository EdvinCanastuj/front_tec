import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css";
import { useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const columns = [
    {
        field: 'id_demerito',
        headerName: 'ID',
        width: 10
    },
    {
        field: 'Profesor',
        headerName: 'Profesor',
        width: 150,
        editable: false,
    },
    {
        field: 'fecha',
        headerName: 'fecha',
        width: 110,
        editable: false,
    },
    {
        field: 'tipo_razon',
        headerName: 'Razon',
        width: 150,
        editable: false,
    },
    {
        field: 'Estudiante',
        headerName: 'Estudiante',
        width: 150,
        editable: false,
    },
    {
        field: 'grado',
        headerName: 'Grado',
        width: 110,
        editable: false,
    },
    {
        field: 'curso',
        headerName: 'Curso',
        width: 110,
        editable: false,
    },
    {
        field: 'cantidad',
        headerName: 'Cantidad',
        width: 80,
        editable: false,
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

const DemeritoTable = () => {
    const [id_grado, setGradoId] = useState('');
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [intervalCount, setIntervalCount] = useState(0);
    const [selectedDemeritoId, setSelectedDemeritoId] = useState(null);
    const [isRazonSelectOpen, setIsRazonSelectOpen] = useState(false);
    const [isEstadoSelectOpen, setIsEstadoSelectOpen] = useState(false);
    const [razon, setRazon] = useState([]);
    const [estado, setEstado] = useState([]);
    const [isGradoSelectOpen, setIsGradoSelectOpen] = useState(false);
    const [grado, setGrado] = useState([]);
    const [isEstudianteSelectOpen, setIsEstudianteSelectOpen] = useState(false);
    const [estudiante, setEstudiante] = useState([]);
    const [addDemeritoOpen, setAddDemeritoOpen] = useState(false);
    const [demeritoId, setDemeritoId] = useState('');

    const [editNombre, setEditNombre] = useState('');
    const [editApellido, setEditApellido] = useState('');
    const [editrazon, setEditRazon] = useState('');
    const [editNombres, setEditNombres] = useState('');
    const [editApellidos, setEditApellidos] = useState('');
    const [editGrado, setEditGrado] = useState('');
    const [editCurso, setEditCurso] = useState('');
    const [editCantidad, setEditCantidad] = useState('');
    const [editComentario, setEditComentario] = useState('');
    const [editestado, setEditEstado] = useState('');

    const [edit_id_razon, setEditIdRazon] = useState('');
    const [edit_id_estudiante, setEditIdEstudiante] = useState('');
    const [edit_id_curso, setEditIdCurso] = useState('');
    const [edit_id_cantidad, setEditIdCantidad] = useState('');
    const [edit_id_comentario, setEditIdComentario] = useState('');
    const [edit_id_estado, setEditIdEstado] = useState('');



    const updateData = async () => {
        try {
            const response = await fetch('http://localhost:4000/demerito');
            if (!response.ok) {
                throw new Error('Error al obtener la apy');
            }
            const data = await response.json();
            const datawithId = data.map((item, index) => ({ ...item, id: index }));
            setData(datawithId);

        } catch (e) {
            console.error('Error al obtener la apy', e);
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/demerito');
            if (!response.ok) {
                throw new Error('Error al obtener la apy');
            }
            const data = await response.json();
            const datawithId = data.map((item, index) => ({ ...item, id: index }));
            setData(datawithId);

        } catch (e) {
            console.error('Error al obtener la apy', e);
        }
    }
    const fetchData1 = async () => {
        try {
            const response = await fetch('http://localhost:4000/demerito/demeritos');
            if (!response.ok) {
                throw new Error('Error al obtener la apy');
            }
            const data = await response.json();
            const datawithId = data.map((item, index) => ({ ...item, id: index }));
            setData1(datawithId);
        } catch (e) {
            console.error('Error al obtener la apy', e);
        }
    };
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            updateData();
            setIntervalCount(intervalCount + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [intervalCount]);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData1();
    }, []);
    useEffect(() => {
        fetch('http://localhost:4000/estudiante/' + id_grado)
            .then(res => res.json())
            .then(data => {
                setEstudiante(data);
            })
            .catch(err => console.log('Error al obtener los estudiantes', err));
        fetch('http://localhost:4000/grado/')
            .then(res => res.json())
            .then(data => {
                setGrado(data);
            })
            .catch(err => console.log('Error al obtener los grados', err));

        fetch('http://localhost:4000/estado')
            .then(res => res.json())
            .then(data => {
                setEstado(data);
            })
            .catch(err => console.log('Error al obtener las razones', err));

        fetch('http://localhost:4000/razon')
            .then(res => res.json())
            .then(data => {
                setRazon(data);
            })
            .catch(err => console.log('Error al obtener las razones', err));
    }, [id_grado]);
    const handleViewClick = (id_demerito) => {
        setDemeritoId(id_demerito);
        
        const demeritos = data1.filter((item) => item.id_demerito === id_demerito);
        if (demeritos.length > 0) {
            const demerito = demeritos[0];
            setEditNombre(demerito.nombre);
            setEditApellido(demerito.apellido);
            setEditRazon(demerito.tipo_razon);
            setEditNombres(demerito.nombres);
            setEditApellidos(demerito.apellidos);
            setEditGrado(demerito.grado);
            setEditCurso(demerito.curso);
            setEditIdCurso(demerito.curso);
            setEditCantidad(demerito.cantidad);
            setEditIdCantidad(demerito.cantidad);
            setEditComentario(demerito.comentario);
            setEditIdComentario(demerito.comentario);
            setEditIdRazon(demerito.id_razon);
            setEditIdEstudiante(demerito.id_estudiante);
            setEditEstado(demerito.estado);
            setEditIdEstado(demerito.id_estado);
            setAddDemeritoOpen(true);
        }
    };


    const handleDeleteClick = (demerito_id) => {
        setSelectedDemeritoId(demerito_id);
        setDialogOpen(true);
    };
    const handleCancelDelete = () => {
        setDialogOpen(false);
        window.history.back();
    };
    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/demerito/${selectedDemeritoId}`, {
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
        setAddDemeritoOpen(false);
    };
    const handleSelectOpenRazon = () => {
        setIsRazonSelectOpen(true);
    };
    const handleSelectCloseRazon = () => {
        setIsRazonSelectOpen(false);
    };
    const handleSelectOpenEstado = () => {
        setIsEstadoSelectOpen(true);
    };
    const handleSelectCloseEstado = () => {
        setIsEstadoSelectOpen(false);
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
    const handleUpdateDemerito = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:4000/demerito/${demeritoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        id_razon: edit_id_razon,
                        id_estudiante: edit_id_estudiante,
                        curso: edit_id_curso,
                        cantidad: edit_id_cantidad,
                        comentario: edit_id_comentario,
                        id_estado: edit_id_estado
                    }
                ),
            });
            if (response.ok) {
                setAddDemeritoOpen(false);
                fetchData();
            } else {
                console.error('Error al actualizar el usuario');
                console.log(edit_id_razon, edit_id_estudiante, edit_id_curso, edit_id_cantidad, edit_id_comentario, edit_id_estado, demeritoId)
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
                columns={columns.map((column) =>
                    column.field === 'actions' ? {
                        ...column,
                        renderCell: (params) => (
                            <div className='action'>
                                <div className="view"  >
                                    <img src="/view.svg" alt="" onClick={() => handleViewClick(params.row.id_demerito)} />
                                </div>
                                <div className="delete" onClick={() => handleDeleteClick(params.row.id_demerito)}>
                                    <img src="/delete.svg" alt="" />
                                </div>
                            </div>
                        ),
                    } : column
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

            {addDemeritoOpen && (
                <div className='confirmation-dialog'>
                    <div className='confirmation-dialog-1' style={{ height: "625px" }}>
                        <h2>Modificar Demerito</h2>
                        <form onSubmit={handleUpdateDemerito}>
                            {/* nombre profesor */}
                            <div className='form-group'>
                                <label htmlFor="nombre"> Profesor :</label>
                                <input type="text" id="nombre" defaultValue={`${editNombre} ${editApellido}`} />
                            </div>
                            {/* Grado estudiante */}
                            <div className='form-group'>
                                <label htmlFor="exampleFormControlSelect1">Grado</label>
                                <div className={`select-wrapper ${isGradoSelectOpen ? 'select-open' : ''}`}>
                                    <Autocomplete
                                        value={grado.find(option => option.grado === editGrado)} 
                                        options={grado}
                                        getOptionLabel={(option) => option.grado}
                                        onOpen={handleSelectOpenGrado}
                                        onClose={handleSelectCloseGrado}
                                        onChange={(event, newValue) => {
                                            setGradoId(newValue ? newValue.id_grado : "");
                                            setEditGrado(newValue ? newValue.grado : "");
                                            setEditNombres("");
                                            setEditApellidos("");
                                        }}
                                        renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label for="exampleFormControlSelect1">Estudiante</label>
                                <div
                                    className={`select-wrapper ${isEstudianteSelectOpen ? 'select-open' : ''
                                        }`}
                                >
                                    <Autocomplete
                                        id="id_estudiante"
                                        options={estudiante}
                                        getOptionLabel={(option) => option.nombres + " " + option.apellidos}
                                        onOpen={handleSelectOpenEstudiante}
                                        onClose={handleSelectCloseEstudiante}
                                        onChange={(event, newValue) => {
                                            setEditIdEstudiante(newValue ? newValue.id_estudiante : "");
                                            setEditNombres(newValue ? newValue.nombres : "");
                                            setEditApellidos(newValue ? newValue.apellidos : "");
                                        }}
                                        renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                        // value={estudiante.find(option => option.nombres === editNombres && option.apellidos === editApellidos)}
                                        value={editNombres && editApellidos ? estudiante.find(option => option.nombres === editNombres && option.apellidos === editApellidos) : null}
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label for="exampleFormControlSelect1">Razon</label>
                                <div
                                    //style={{ height: 35}}
                                    className={`select-wrapper ${isRazonSelectOpen ? 'select-open' : ''
                                        }`}
                                >
                                    <Autocomplete
                                        id="id_razon"
                                        options={razon}
                                        getOptionLabel={(option) => option.tipo_razon}
                                        onOpen={handleSelectOpenRazon}
                                        onClose={handleSelectCloseRazon}
                                        onChange={(event, newValue) => {
                                            setEditIdRazon(newValue ? newValue.id_razon : "");
                                            setEditRazon(newValue ? newValue.tipo_razon : "");
                                        }}
                                        renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                        value={razon.find(option => option.tipo_razon === editrazon)}
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label for="exampleInputPassword1">Curso</label>
                                <input
                                    type="text"
                                    className="form-control form-labeles"
                                    id="curso"
                                    name="curso"
                                    value={editCurso}
                                    onChange={(newValue) => {
                                        setEditIdCurso(newValue.target.value);
                                        setEditCurso(newValue.target.value);
                                    }}
                                />
                            </div>
                            <div className='form-group'>
                                <label for="exampleInputPassword1">Comentario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="comentario"
                                    name="comentario"
                                    value={editComentario}
                                    onChange={(newValue) => {
                                        setEditIdComentario(newValue.target.value);
                                        setEditComentario(newValue.target.value);
                                    }}
                                />
                            </div>
                            <div className='form-group'>
                                <label for="exampleInputPassword1">Cantidad</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="cantidad"
                                    name="cantidad"
                                    value={editCantidad}
                                    onChange={(newValue) => {
                                        setEditIdCantidad(newValue.target.value);
                                        setEditCantidad(newValue.target.value);
                                    }}
                                />
                                
                            </div>
                            <div className='form-group'>
                                <label for="exampleFormControlSelect1">Estado</label>
                                <div
                                    //style={{ height: 35}}
                                    className={`select-wrapper ${isEstadoSelectOpen ? 'select-open' : ''
                                        }`}
                                >
                                    <Autocomplete
                                        id="id_estado"
                                        options={estado}
                                        getOptionLabel={(option) => option.estado}
                                        onOpen={handleSelectOpenEstado}
                                        onClose={handleSelectCloseEstado}
                                        onChange={(event, newValue) => {
                                            setEditIdEstado(newValue ? newValue.id_estado : "");
                                            setEditEstado(newValue ? newValue.estado : "");
                                        }}
                                        renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                        value={estado.find(option => option.estado === editestado)}
                                    />
                                </div>
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
    );
}
export default DemeritoTable;
