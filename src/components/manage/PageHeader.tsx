'use client'

// ** MUI Imports
import PageHeader from '@/src/@core/components/page-header'
import { Grid, Menu, MenuItem, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Link from 'next/link'
import { MouseEvent } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import AddOrEditMemberDialog from './member/AddOrEditMember'
import AddOrEditAccessDialog from './access/AddOrEditAccess'
import AddOrEditDepartmentDialog from './department/AddOrEditDepartmentForm'
import AddOrEditRoomDialog from './room/AddOrEditRoom'
import fileDownload from 'js-file-download';
import { RecordPresensiType } from '@/src/@fake-db/types'
import { Member } from '@/src/services/member'
import { useAuth } from '@/src/hooks/useAuth'

interface Props {
  title: string;
  dataPresensi?: RecordPresensiType[];
  dataMember?: Member;
}

const PageHeaderComponent = (props: Props) => {
  const [openMemberCard, setOpenMemberCard] = useState<boolean>(false)
  const [openAccessCard, setOpenAccessCard] = useState<boolean>(false)
  const [openDepartmentCard, setOpenDepartmentCard] = useState<boolean>(false)
  const [openRoomCard, setOpenRoomCard] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleExportClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const handleExportToPDF = () => {
    const doc: any = new jsPDF();

    // Tambahkan judul
    doc.setFontSize(30);
    doc.text('Detail Member', 10, 10); // Koordinat (x, y) untuk posisi teks

    doc.setFontSize(14);
    const identityTitle = 'Identity Member:';
    const identityTextHeight = doc.getTextDimensions(identityTitle).h;
    doc.text(identityTitle, 10, 30); // Koordinat (x, y) untuk posisi teks
    doc.line(10, 30 + identityTextHeight + 2, 110, 30 + identityTextHeight + 2); // Garis horizontal di bawah 'Identity Member'
    doc.setFontSize(12);
    const identityText = `Full Name: ${props.dataMember?.fullName}\nRole: ${props.dataMember?.role}\nNIK: ${props.dataMember?.nik}`;
    const identityTextLines = doc.splitTextToSize(identityText, 100); // Pisahkan teks menjadi beberapa baris
    doc.text(identityTextLines, 10, 45); // Koordinat (x, y) untuk posisi teks

    // Informasi Kontak (sebelah kanan)
    // doc.setFontSize(14);
    // const contactTitle = 'Contact Member:';
    // const contactTextHeight = doc.getTextDimensions(contactTitle).h;
    // doc.text(contactTitle, 120, 30); // Koordinat (x, y) untuk posisi teks
    // doc.line(120, 30 + contactTextHeight + 2, 210, 30 + contactTextHeight + 2); // Garis horizontal di bawah 'Contact Member' 
    // doc.setFontSize(12);
    // const contactText = 'Email: johndoe@example.com\nPhone: 123-456-7890';
    // const contactTextLines = doc.splitTextToSize(contactText, 100); // Pisahkan teks menjadi beberapa baris
    // doc.text(contactTextLines, 120, 45); // Koordinat (x, y) untuk posisi teks

    // Tambahkan subjudul 'Record Presensi'
    doc.setFontSize(14);
    const subtitleHeight = 70;
    doc.text('Record Presensi', 10, subtitleHeight); // Koordinat (x, y) untuk posisi teks

    // Tentukan posisi awal tabel record presensi
    const startY = subtitleHeight + 10; // Tambahkan sedikit jarak antara subjudul dan tabel

    const tableColumnNames = ['Presense', 'Date Access', 'Attendance In', 'Attendance Out', 'Attendance Total',];
    const tableRows = props.dataPresensi?.map(row => [
      row.presense,
      row.date,
      row.in,
      row.out,
      row.total,
    ]);

    // Gambar tabel record presensi
    doc.autoTable({
      head: [tableColumnNames],
      body: tableRows,
      startY: startY, // Tentukan posisi awal tabel di bawah judul dan subjudul
      margin: { top: subtitleHeight + 20 } // Tambahkan margin atas agar tidak menumpuk
    });

    // Simpan laporan sebagai file PDF
    doc.save('exported_records.pdf');

    handleExportClose();
  };


  const handleExportToCSV = () => {
    const dataToExport = props.dataPresensi?.map(row => ({
      Presense: row.presense,
      Date: row.date,
      AttendanceIn: row.in,
      AttendanceOut: row.out,
      AttendanceTotal: row.total,
    }));

    // Buat isi file Excel dengan data yang telah diubah
    if (dataToExport) {
      const csvContent = [
        Object.keys(dataToExport[0]).join(','), // Header kolom
        ...dataToExport.map(item => Object.values(item).join(','))
      ].join('\n');

      // Simpan sebagai file Excel dengan format CSV
      fileDownload(csvContent, 'exported_records.csv');
      handleExportClose();
    } else {
      // Handle the case where dataToExport is undefined
      console.error("Data to export is undefined.");
    }
  };
  const { user } = useAuth()
  const namaUser = user?.rawUserMetadata.name
  
  return (
    <>
      {props.title === 'Manage Member' && (
        <PageHeader
          title={
            <Grid display={'flex'}>
              <Typography variant='h4' fontWeight={700} width={1140}>
                {props.title}
              </Typography>
              <Grid spacing={6.5} gap={2} display={'flex'} justifyContent="end" width={1140}>
                <Button variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={() => setOpenMemberCard(true)}>
                  <Icon fontSize='1.125rem' icon='tabler:user' />
                  Add Member
                </Button>
              </Grid>
              <AddOrEditMemberDialog open={openMemberCard} onClose={() => setOpenMemberCard(false)} isEditMode={false} />
            </Grid>
          }
        />
      )}
      {props.title === 'Manage Access' && (
        <PageHeader
          title={
            <Grid display={'flex'}>
              <Typography variant='h4' fontWeight={700} width={1140}>
                {props.title}
              </Typography>
              <Grid spacing={6.5} gap={2} display={'flex'} justifyContent='end' width={1140}>
                <Button variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={() => setOpenAccessCard(true)}>
                  <Icon fontSize='1.125rem' icon='tabler:plus' />
                  Add Role
                </Button>
              </Grid>
              <AddOrEditAccessDialog open={openAccessCard} onClose={() => setOpenAccessCard(false)} isEditMode={false} />
            </Grid>
          }
        />
      )}
      {props.title === 'Dashboard' && (
        <PageHeader
          title={
            <Grid display={'flex'}>
              <Typography variant='h4' fontWeight={700} width={1000}>
                {namaUser?.toLocaleUpperCase()}
              </Typography>
              <Grid spacing={6.5} gap={2} display={'flex'} justifyContent="end" width={1140}>
                {/* <Button variant='contained' sx={{ '& svg': { mr: 2 } }}>
                  <Icon fontSize='1.125rem' icon='tabler:filter' />
                  Filter
                </Button> */}
                <Button component={Link} href='/manage-member' variant='contained' sx={{ '& svg': { mr: 2 } }}>
                  <Icon fontSize='1.125rem' icon='tabler:user' />
                  Manage Member
                </Button>
              </Grid>
            </Grid>
          }
        />
      )}
      {props.title === 'Detail Member' && (
        <PageHeader
          title={
            <Grid display={'flex'}>
              <Typography variant='h4' fontWeight={700} width={1140}>
                {props.title}
              </Typography>
              <Grid item xs={6} textAlign="right">
                <Button variant='contained' onClick={handleExportClick}>
                  <Icon fontSize='1.125rem' icon='tabler:file-download' />
                  Export Record
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleExportClose}
                >
                  <MenuItem onClick={handleExportToPDF}>Export to PDF</MenuItem>
                  <MenuItem onClick={handleExportToCSV}>Export to CSV</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          }
        />
      )}
      {props.title === 'Manage Department' && (
        <PageHeader
          title={
            <Grid display={'flex'}>
              <Typography variant='h4' fontWeight={700} width={1140}>
                {props.title}
              </Typography>
              <Grid spacing={6.5} gap={2} display={'flex'} justifyContent="end" width={1140}>
                <Button variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={() => setOpenDepartmentCard(true)}>
                  <Icon fontSize='1.125rem' icon='tabler:plus' />
                  Add Department
                </Button>
              </Grid>
              <AddOrEditDepartmentDialog open={openDepartmentCard} onClose={() => setOpenDepartmentCard(false)} isEditMode={false} />
            </Grid>
          }
        />
      )}
      {props.title === 'Manage Room' && (
        <PageHeader
          title={
            <Grid display={'flex'}>
              <Typography variant='h4' fontWeight={700} width={1140}>
                {props.title}
              </Typography>
              <Grid spacing={6.5} gap={2} display={'flex'} justifyContent="end" width={1140}>
                <Button variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={() => setOpenRoomCard(true)}>
                  <Icon fontSize='1.125rem' icon='tabler:plus' />
                  Add Room
                </Button>
              </Grid>
              <AddOrEditRoomDialog open={openRoomCard} onClose={() => setOpenRoomCard(false)} isEditMode={false} />
            </Grid>
          }
        />
      )}
    </>
  )
}

export default PageHeaderComponent
