import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const colums = [
{
    field: 'id_historial', 
    headerName: 'ID',
    width: 50, 
},
{
    field: 'Profesor',
    headerName: 'Profesor',
    width: 150,
    editable: true,
},
{
    field: 'Estudiante',
    headerName: 'Estudiante',
    width: 150,
    editable: true,
},

{
    field: 'grado',
    headerName: 'Grado',
    width: 200,
    editable: true,
},
{
    field: 'cantidad',
    headerName: 'Cantidad',
    width: 100,
    editable: true,
},
{
    field: 'comentario',
    headerName: 'Comentario',
    width: 200,
    editable: true,
},
{
    field: 'Creado',
    headerName: 'Creacion',
    width: 200,
    editable: true,
},
{
    field: 'Ultima_Modificacion',
    headerName: 'Ultima Modificacion',
    width: 100,
    editable: true,
},
{
    field: 'curso',
    headerName: 'Curso',
    width: 200,
    editable: true,
},
{
    field: 'tipo_razon',
    headerName: 'Razon',
    width: 200,
    editable: true,
},
{
    field: 'estado',
    headerName: 'Estado',
    width: 200,
    editable: true,
},
]

const TablaHistorialDemerito = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
        const response = await fetch('http://localhost:4000/historial');
        if(!response.ok){
            throw new Error('Error al obtener datos de la API');
        }
        const data = await response.json();
        const dataWithIds = data.map((item, index) => ({ ...item, id: index }));
        setData(dataWithIds);
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <div>
            <div className="dataTable">
                <DataGrid
                    className="dataGrid"
                    rows={data}
                    columns={colums}
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
                        pageSizeOptions={[15]}
                        // checkboxSelection
                        disableRowSelectionOnClick
                        disableColumnFilter
                        disableDensitySelector
                        disableColumnSelector
                    
                />
            </div>
        </div>
    )
}

export default TablaHistorialDemerito;