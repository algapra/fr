// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Box, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import AddOrEditAccessDialog from './AddOrEditAccess'

const RowOptions = ({ id }: { id: number | string }) => {
  const [openAccessCard, setOpenEditAccessCard] = useState<boolean>(false)

  console.log(id);

  const handleDelete = () => {
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title='Edit Access' >
        <IconButton size='small' onClick={() => setOpenEditAccessCard(true)}>
          <Icon icon='tabler:pencil' fontSize={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete Access'>
        <IconButton size='small' onClick={handleDelete}>
          <Icon icon='tabler:trash' fontSize={20} />
        </IconButton>
      </Tooltip>
      <AddOrEditAccessDialog open={openAccessCard} onClose={() => setOpenEditAccessCard(false)} isEditMode={true} />
    </Box>
  )
}

const AccessColumn: GridColumns = [
  {
    flex: 0.2,
    minWidth: 100,
    field: 'role',
    headerName: 'Role Name',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.role}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 80,
    headerName: 'Department',
    field: 'department',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.department}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'room_access',
    minWidth: 80,
    headerName: 'Room Access',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.room_access}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'quote_access',
    headerName: 'Quote Access',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.quote_access}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params: GridRenderCellParams) => <RowOptions id={params.row.id} />
  },
]


export default AccessColumn
