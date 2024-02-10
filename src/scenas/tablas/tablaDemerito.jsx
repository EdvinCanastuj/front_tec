import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css";
import { useEffect, useState } from 'react';

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

    const [data, setData] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [intervalCount, setIntervalCount] = useState(0);
    const [selectedDemeritoId, setSelectedDemeritoId] = useState(null);

    const updateData = async () => {
        try{
            const response = await fetch('http://localhost:4000/demerito');
            if(!response.ok){
                throw new Error('Error al obtener la apy');
            }
            const data = await response.json();
            const datawithId = data.map((item, index) => ({...item, id: index}));
            setData(datawithId);

        }catch(e){
            console.error('Error al obtener la apy',e);
        }
    }

    const fetchData = async () => {
        try{
            const response = await fetch('http://localhost:4000/demerito');
            if(!response.ok){
                throw new Error('Error al obtener la apy');
            }
            const data = await response.json();
            const datawithId = data.map((item, index) => ({...item, id: index}));
            setData(datawithId);

        }catch(e){
            console.error('Error al obtener la apy',e);
        }
    }

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
                            <div className="view">
                                <img src="/view.svg" alt="" />
                            </div>
                            <div className="delete">
                                <img src="/delete.svg" alt="" onClick={() => handleDeleteClick(params.row.id_demerito)}/>
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
                    slots={{toolbar: GridToolbar}}
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

        </div>
    );
}
export default DemeritoTable;
