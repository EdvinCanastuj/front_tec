import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css";
import { useEffect, useState } from 'react';

const columns = [
    {
        field: 'id_demerito',
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
        field: 'fecha',
        headerName: 'fecha',
        width: 110,
        editable: true,
    },
    {
        field: 'tipo_razon',
        headerName: 'Razon',
        width: 150,
        editable: true,
    },
    {
        field: 'nombres',
        headerName: 'Nombre',
        width: 150,
        editable: true,
    },
    {
        field: 'apellidos',
        headerName: 'Apellido',
        width: 110,
        editable: true,
    },
    {
        field: 'grado',
        headerName: 'Grado',
        width: 110,
        editable: true,
    },
    {
        field: 'curso',
        headerName: 'Curso',
        width: 110,
        editable: true,
    },
    {
        field: 'cantidad',
        headerName: 'Cantidad',
        width: 110,
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

const DemeritoTable = () => {

    const [data, setData] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [intervalCount, setIntervalCount] = useState(0);

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
        </div>
    );
}
export default DemeritoTable;
