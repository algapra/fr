"use client"

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Customs Components Imports
import PageHeaderComponent from 'src/components/manage/PageHeader'
import Table from 'src/components/manage/room/Table'

const DataGrid = () => {
  return (
    <Grid container spacing={6}>
      <PageHeaderComponent title='Manage Room' />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default DataGrid
