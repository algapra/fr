"use client"

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Import
import Table from 'src/components/manage/member/Table'
import PageHeaderComponent from 'src/components/manage/PageHeader'

const DataGrid = () => {
  return (
    <Grid container spacing={6}>
      <PageHeaderComponent title='Manage Member' />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default DataGrid
