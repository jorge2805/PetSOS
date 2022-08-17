import { useDispatch, useSelector } from "react-redux"

import { startNewNote } from "../../store/journal"
import moment from 'moment';
import 'moment/dist/locale/es-do';
moment.locale('es-do')

import { AddOutlined } from "@mui/icons-material"
import { IconButton, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

import { UserLayout } from "../layout/UserLayout"
import { AdminLayout } from "../layout/AdminLayout"

import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const ListadoReportesPage = () => {
  
  const dispatch = useDispatch();
  const {isSaving, active } = useSelector( state => state.journal);

  const {notes} = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <AdminLayout>
      
      <Typography variant="h5" sx={{mb: 1}} color='primary'>Listado de Reportes</Typography>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Descripción</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.body}</TableCell>
              <TableCell align="right">{moment(row.date).format('LL')}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </AdminLayout>
  )
}
