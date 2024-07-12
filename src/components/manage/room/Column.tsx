// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Tooltip, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import AddOrEditRoomDialog from './AddOrEditRoom'

const RowOptions = ({ id }: { id: number | string }) => {
  const [openRoomCard, setOpenEditRoomCard] = useState<boolean>(false)
  console.log(id);
  
  const handleDelete = () => {
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title='Edit Room' >
        <IconButton size='small' onClick={() => setOpenEditRoomCard(true)}>
          <Icon icon='tabler:pencil' fontSize={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete Room'>
        <IconButton size='small' onClick={handleDelete}>
          <Icon icon='tabler:trash' fontSize={20} />
        </IconButton>
      </Tooltip>
      <AddOrEditRoomDialog open={openRoomCard} onClose={() => setOpenEditRoomCard(false)} isEditMode={true} />
    </Box>
  )
}

export const columns: GridColumns = [
  {
    flex: 0.2,
    minWidth: 100,
    field: 'id_room',
    headerName: 'ID Room',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.id_room}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 80,
    headerName: 'Room Name',
    field: 'room_name',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.room_name}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'floor',
    minWidth: 80,
    headerName: 'Floor',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.floor}
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
