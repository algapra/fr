// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GridToolbarFilterButton } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Typography } from '@mui/material'

interface Props {
  title: string;
  value: string
  clearSearch: () => void
  onChange: (e: ChangeEvent) => void
}

const TopTable = (props: Props) => {
  return (
    <Box
      sx={{
        gap: 2,
        mt: 5,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <Typography variant='h6' fontWeight={700}>
        {props.title}
      </Typography>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
      }}>
        <TextField
          size='small'
          value={props.value}
          onChange={props.onChange}
          placeholder='Search…'
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon icon='tabler:search' fontSize={20} />
              </Box>
            ),
            endAdornment: (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                <Icon icon='tabler:x' fontSize={20} />
              </IconButton>
            )
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto'
            },
            '& .MuiInputBase-root > svg': {
              mr: 2
            }
          }}
        />
        <GridToolbarFilterButton placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </Box>
    </Box>
  )
}

export default TopTable
