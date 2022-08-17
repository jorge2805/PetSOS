import { useSelector } from "react-redux"

import moment from 'moment';
import 'moment/dist/locale/es-do';
moment.locale('es-do')

import { Box, Typography } from "@mui/material"
import { DataGrid, esES } from '@mui/x-data-grid';


import { AdminLayout } from "../layout/AdminLayout"



export const ListadoReportesPage = () => {


  const {notes: notesData} = useSelector(state => state.journal);

        //Status 0: Sin Guardar
        //Status 1: Pendiente de Cambios
        //Status 2: Pendiente de aprobacion
        //Status 3: Rechazada
        //Status 4: Aprobada
        //Status 5: Resuelta
        //Status 6: Expirada

  const notes =  notesData.map((row) => {
    return {...row, 
      date: moment(row.date).format('LL'), 
      status: (row.status === 0) ? 'Sin Guardar' :
              (row.status === 1) ? 'Pendiente de Cambios' :
              (row.status === 2) ? 'Pendiente de aprobacion' :
              (row.status === 3) ? 'Rechazada' :
              (row.status === 4) ? 'Aprobada' :
              (row.status === 5) ? 'Resuelta' :
              'Expirada' 
    }
  })

  return (
    <AdminLayout>
      
      <Typography variant="h5" sx={{mb: 1}} color='primary'>Listado de Reportes</Typography>

      <Box style={{ width: '100%' }}>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}        
        autoHeight
        rows={notes}
        columns={[
          { field: 'title', headerName: 'Nombre', flex: 1 },
          { field: 'provincia', headerName: 'Provincia', flex: 1},
          { field: 'municipio', headerName: 'Municipio', flex: 1},
          { field: 'raza', headerName: 'Raza', flex: 1},
          { field: 'sexo', headerName: 'Sexo', flex: 1},
          { field: 'date', headerName: 'Fecha', flex: 1},
          { field: 'status', headerName: 'Estatus', flex: 1},
        ]
        }
        pageSize={10}
        rowsPerPageOptions={[10]}        
      />
    </Box>
    </AdminLayout>
  )
}
