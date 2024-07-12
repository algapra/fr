'use client'

import { ChangeEvent, useState } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { RecordPresensiType } from 'src/@fake-db/types'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import TopTable from 'src/components/manage/TopTable'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColumns = [
  {
    flex: 0.2,
    minWidth: 80,
    headerName: 'PRESENSE',
    field: 'presense',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'green' }}>
        <FiberManualRecordIcon sx={{ fontSize: 10, marginRight: 1 }} />
        {params.row.presense}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 80,
    headerName: 'DATE ACCESS',
    field: 'date',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.date}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 80,
    headerName: 'ATTENDANCE IN',
    field: 'in',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.in}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 80,
    headerName: 'ATTENDANCE OUT',
    field: 'out',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.out}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 80,
    headerName: 'ATTENDANCE TOTAL',
    field: 'total',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.total}
      </Typography>
    )
  },

  // {
  //   flex: 0.2,
  //   minWidth: 80,
  //   headerName: 'ROOM ACCESS',
  //   field: 'room_access',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //       {params.row.room_access}
  //     </Typography>
  //   )
  // },
  // {
  //   flex: 0.2,
  //   minWidth: 80,
  //   headerName: 'ACCESS HOURS',
  //   field: 'access_hours',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //       {params.row.access_hours}
  //     </Typography>
  //   )
  // },
  // {
  //   flex: 0.2,
  //   minWidth: 80,
  //   headerName: 'TOTAL ACCESS',
  //   field: 'total_access',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //       {params.row.total_access}
  //     </Typography>
  //   )
  // },
  // {
  //   flex: 0.2,
  //   minWidth: 80,
  //   headerName: 'QUOTA ACCESS',
  //   field: 'quota_access',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //       {params.row.quota_access}
  //     </Typography>
  //   )
  // },
]

const TableColumns = ({ datas, isLoading }: { datas: RecordPresensiType[], isLoading: boolean} ) => {
  // ** States
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<RecordPresensiType[]>([])
  
  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = datas.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (
    <Card>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "white",
            color: "#000000",
            fontWeight: "bold"
          }
        }}
        loading={isLoading}
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        components={{ Toolbar: TopTable }}
        rows={filteredData.length ? filteredData : datas}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        componentsProps={{
          toolbar: {
            title: "Record Presensi",
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          },
          baseButton: {
            variant: 'outlined',
            color: 'primary',
          }
        }}
      />
    </Card>
  )
}

export default TableColumns
