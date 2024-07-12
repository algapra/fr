"use client"

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Imports
import Table from 'src/components/manage/department/Table'
import PageHeaderComponent from 'src/components/manage/PageHeader'

const DataGrid = () => {
  return (
    <Grid container spacing={6}>
      <PageHeaderComponent title='Manage Department' />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default DataGrid
