"use client"

// ** MUI Imports
import Grid from '@mui/material/Grid'

// import TableColumns from 'src/components/manage/member/detail/TableColumns'
// import ProfileMember from 'src/components/manage/member/detail/ProfileMember'
// import IdentityMember from 'src/components/manage/member/detail/IdentityMember'
// import ContactMember from 'src/components/manage/member/detail/ContactMember'

import DetailContent from '@/src/components/manage/member/detail/DetailContent'


const DataGrid = () => {
  return (
    <Grid container spacing={6}>
      <DetailContent />
    </Grid>
  )
}

export default DataGrid
