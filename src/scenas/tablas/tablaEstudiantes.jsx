import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'id_estudiante',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'nombres',
        headerName: 'Nombres',
        width: 150,
        editable: true,
    },
    {
        field: 'apellidos',
        headerName: 'Apellidos',
        width: 110,
        editable: true,
    },
    {
        field: 'grado',
        headerName: 'Grado',
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
const EstudianteTab = () => {
    const [data, setData] = useState([]);
    //descomentar la siguiente linea para usar consulta personalizada
    //const [data1, setData1] = useState([]);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [isAddStudentOpen, setAddStudentOpen] = useState(false);
    const [intervalCount, setIntervalCount] = useState(0);


    // variables para editar o modificar
    const [editNombreId, setEditNombreId] = useState(null);
    const [editNombres, setEditNombres] = useState('');
    const [editApellidos, setEditApellidos] = useState('');
    const [editGrado, setEditGrado] = useState('');

    const updateData = async () => {
        try {
            const response = await fetch('http://localhost:4000/estudiante');
            if (!response.ok) {
                throw new Error('Error al obtener datos de la API');
            }
            const data = await response.json();
            const dataWithId = data.map((item) => ({ ...item, id: item.id_estudiante }));
            setData(dataWithId);
        }
        catch (err) {
            console.error('Error al obtener los datos de la api: ', err);
        }
    };
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/estudiante');
            if (!response.ok) {
                throw new Error('Error al obtener datos de la API');
            }
            const data = await response.json();
            const dataWithId = data.map((item) => ({ ...item, id: item.id_estudiante }));
            setData(dataWithId);
        }
        catch (err) {
            console.error('Error al obtener los datos de la api: ', err);
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
    const handleDeleteClick = (studentId) => {
        setSelectedStudentId(studentId);
        setDialogOpen(true);
    };
    

    const handleViewClick = (studentId) => {
        const estudiantes = data.filter((item) => item.id === studentId);
        if (estudiantes) {
            setEditNombreId(estudiantes.id);
            setEditNombres(estudiantes.nombres);
            setEditApellidos(estudiantes.apellidos);
            setEditGrado(estudiantes.grado);
            setAddStudentOpen(true);
        }
    };
    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/usuario/${selectedStudentId}`, {
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
        setAddStudentOpen(false);
    };

    const handleCancelDelete = () => {
        setDialogOpen(false);
        window.history.back();
    };
    const handleUpdateEstudiante = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/estudiante/${editNombreId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombres: editNombres,
                    apellido: editApellidos,
                    grado: editGrado,
                }),
            });
            if (response.ok) {
                setAddStudentOpen(false);
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
                                        <img src="/view.svg" alt="" onClick={() => handleViewClick(params.row.id_estudiante)} />
                                    </div>
                                    <div className='delete' onClick={() => handleDeleteClick(params.row.id_estudiante)}>
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
                        <p>¿Está seguro de que desea eliminar este estudiante?</p>
                        <div className="footer">
                            <button onClick={handleConfirmDelete}>Aceptar</button>
                            <button id="cancelBtn" onClick={handleCancelDelete}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Formulario para editar o modificar */}
            {isAddStudentOpen && (
                <div className="confirmation-dialog">
                    <div className="confirmation-dialog-1" style={{ height: "625px" }}>
                        <h4>Editar Estudiante</h4>
                        <form onSubmit={handleUpdateEstudiante}>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Nombres</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    // id="nombre"
                                    // name="nombre"
                                    value={editNombres}
                                    onChange={(e) => setEditNombres(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Apellidos</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="apellidos"
                                    name="apellidos"
                                    value={editApellidos}
                                    onChange={(e) => setEditApellidos(e.target.value)}
                                />
                            </div>
                            <div class="form-row">
                                <div className="form-group col-md-6">
                                    <label for="exampleInputPassword1">Grado</label>
                                    <input
                                        type="text" ç
                                        class="form-control"
                                        id="nombre_estudiante"
                                        name="nombre_estudiante"
                                        value={editGrado}
                                        onChange={(e) => setEditGrado(e.target.value)}
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
    )
}
export default EstudianteTab;