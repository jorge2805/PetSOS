import { useDispatch, useSelector } from "react-redux"

import { startNewNote } from "../../store/journal"
import moment from 'moment';
import 'moment/dist/locale/es-do';
moment.locale('es-do')

import { AddOutlined } from "@mui/icons-material"
import { Box, IconButton, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';

import { UserLayout } from "../layout/UserLayout"
import { AdminLayout } from "../layout/AdminLayout"

import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const ListadoReportesPage = () => {
  
  const dispatch = useDispatch();
  const {isSaving, active } = useSelector( state => state.journal);

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

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <AdminLayout>
      
      <Typography variant="h5" sx={{mb: 1}} color='primary'>Listado de Reportes</Typography>

      <Box style={{ width: '100%' }}>
      <DataGrid
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
