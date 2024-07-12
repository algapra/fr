'use client';

// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';

// ** MUI Imports
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Tooltip, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ** Types Imports
import { DataMemberType } from 'src/@fake-db/types';

// ** Data Import
import TopTable from 'src/components/manage/TopTable';
import { useMember } from '@/src/hooks/useMember';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Sutom Components
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Types Imports
import { ThemeColor } from '@/src/@core/layouts/types';

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials';
import AddOrEditMemberDialog from './AddOrEditMember';
import DialogConfirmation from './DialogConfirmation';
import { Member } from '@/src/services/member';
import { dailyAttendaceFormat } from '@/src/utils/presenseFormat';

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

interface StatusObj {
  [key: string]: {
    type: string;
    color: ThemeColor;
    warna: string;
  };
}

interface RowOptionsProps {
  data: Member;
}

const Table = () => {
  const { members, refreshMembers, isLoading } = useMember();

  const datas = members?.items || [];

  // ** States
  const [pageSize, setPageSize] = useState<number>(7);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<DataMemberType[]>([]);

  useEffect(() => {
    refreshMembers();
  }, [refreshMembers]);

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = datas.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field]);
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  // ** renders client column
  const renderClient = (params: GridRenderCellParams) => {
    const { row } = params;
    const stateNum = Math.floor(Math.random() * 6);
    const states = [
      'success',
      'error',
      'warning',
      'info',
      'primary',
      'secondary',
    ];
    const color = states[stateNum];

    if (row.avatar.length) {
      return (
        <CustomAvatar
          src={row.avatar}
          sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }}
        />
      );
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={color as ThemeColor}
          sx={{
            mr: 3,
            fontSize: '.8rem',
            width: '1.875rem',
            height: '1.875rem',
          }}
        >
          {getInitials(row.fullName ? row.fullName : 'John Doe')}
        </CustomAvatar>
      );
    }
  };

  const statusObj: StatusObj = {
    Active: { type: 'Active', color: 'success', warna: 'green' },
    Inactive: { type: 'Inactive', color: 'error', warna: '#d32f2f' },
  };

  const RowOptions: React.FC<RowOptionsProps> = ({ data }) => {
    const [openMemberCard, setOpenEditMemberCard] = useState<boolean>(false);
    const [openDialogConfirmation, setOpenEditDialogConfirmation] =
      useState<boolean>(false);

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Edit Member'>
          <IconButton size='small' onClick={() => setOpenEditMemberCard(true)}>
            <Icon icon='tabler:pencil' fontSize={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete Member'>
          <IconButton
            size='small'
            onClick={() => setOpenEditDialogConfirmation(true)}
          >
            <Icon icon='tabler:trash' fontSize={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title='View Detail'>
          <IconButton
            size='small'
            component={Link}
            href={`/manage-member/detail-member/${data.id}`}
          >
            <Icon icon='tabler:eye' fontSize={20} />
          </IconButton>
        </Tooltip>
        <DialogConfirmation
          open={openDialogConfirmation}
          onClose={() => setOpenEditDialogConfirmation(false)}
          isDeleted={true}
          id={data.id}
        />
        <AddOrEditMemberDialog
          open={openMemberCard}
          onClose={() => setOpenEditMemberCard(false)}
          isEditMode={true}
          data={data}
        />
      </Box>
    );
  };

  const columns: GridColumns = [
    {
      flex: 0.275,
      minWidth: 200,
      maxWidth: 400,
      field: 'fullName',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='body2'
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                {row.fullName}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.nik}
              </Typography>
            </Box>
          </Box>
        );
      },
    },

    // {
    //   flex: 0.2,
    //   maxWidth: 150,
    //   minWidth: 100,
    //   headerName: 'Department',
    //   field: 'department',
    //   renderCell: (params: GridRenderCellParams) => (
    //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
    //       {params.row.department}
    //     </Typography>
    //   )
    // },
    {
      flex: 0.2,
      minWidth: 100,
      maxWidth: 270,
      field: 'role',
      headerName: 'Role',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.role}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 100,
      maxWidth: 120,
      field: 'statuses',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const status = statusObj[params.row.statuses[0]?.type] || '';

        return (
          <Typography
            variant='body2'
            sx={{ color: status.warna, textTransform: 'capitalize' }}
          >
            <FiberManualRecordIcon
              sx={{ fontSize: 10, marginRight: 1, fontWeight: 800 }}
            />
            {status.type}
          </Typography>
        );
      },
    },

    // {
    //   flex: 0.125,
    //   field: 'room_access',
    //   minWidth: 140,
    //   maxWidth: 220,
    //   headerName: 'Room Access',
    //   renderCell: (params: GridRenderCellParams) => (
    //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
    //       {params.row.room_access.join(', ')}
    //     </Typography>
    //   )
    // },
    {
      flex: 0.125,
      field: 'attendances',
      minWidth: 180,

      // maxWidth: 200,
      headerName: 'Daily Attendance',
      renderCell: (params: GridRenderCellParams) => {
        const attendance = dailyAttendaceFormat(params.row.attendances);

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {attendance.start} - {attendance.end} : {attendance.totalHour}
          </Typography>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) => (
        <RowOptions data={params.row} />
      ),
    },
  ];

  return (
    <Card>
      <DataGrid
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
            title: 'List Member',
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.target.value),
          },
          baseButton: {
            variant: 'outlined',
            color: 'primary',
          },
        }}
      />
    </Card>
  );
};

export default Table;
