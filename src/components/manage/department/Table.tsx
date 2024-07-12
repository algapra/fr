'use client';

// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import { GridColumns, GridRenderCellParams, DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import { Box, Tooltip, Typography } from '@mui/material';

// ** Types Imports
import { DataDepartmentType } from 'src/@fake-db/types';

// ** Customs Import
import TopTable from '@/src/components/manage/TopTable';
import { useDepartment } from '@/src/hooks/useDepartment';
import AddOrEditDepartmentDialog from './AddOrEditDepartmentForm';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
import DialogConfirmation from './DialogConfirmation';
import { Department } from '@/src/services/departments';

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const Table = () => {
  const { departments, refreshDepartments } = useDepartment();

  const datas = departments?.items || [];

  // ** States
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<DataDepartmentType[]>([]);

  useEffect(() => {
    refreshDepartments();
  }, []);

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

  interface RowOptionsProps {
    data: Department;
  }

  const RowOptions: React.FC<RowOptionsProps> = ({ data }) => {
    const [openDepartmentCard, setOpenEditDepartmentCard] =
      useState<boolean>(false);
    const [openDialogConfirmation, setOpenEditDialogConfirmation] =
      useState<boolean>(false);

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Edit Department'>
          <IconButton
            size='small'
            onClick={() => setOpenEditDepartmentCard(true)}
          >
            <Icon icon='tabler:pencil' fontSize={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete Department'>
          <IconButton
            size='small'
            onClick={() => setOpenEditDialogConfirmation(true)}
          >
            <Icon icon='tabler:trash' fontSize={20} />
          </IconButton>
        </Tooltip>
        <DialogConfirmation
          open={openDialogConfirmation}
          onClose={() => setOpenEditDialogConfirmation(false)}
          isDeleted={true}
          id={data.id}
        />
        <AddOrEditDepartmentDialog
          open={openDepartmentCard}
          onClose={() => setOpenEditDepartmentCard(false)}
          isEditMode={true}
          data={data}
        />
      </Box>
    );
  };

  const columns: GridColumns = [
    {
      flex: 0.2,
      minWidth: 80,
      maxWidth: 200,
      headerName: 'Department',
      field: 'department',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.department}
        </Typography>
      ),
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
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        components={{ Toolbar: TopTable }}
        rows={filteredData.length ? filteredData : datas}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        componentsProps={{
          toolbar: {
            title: 'List Department',
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.target.value),
          },
          baseButton: {
            variant: 'contained',
          },
        }}
      />
    </Card>
  );
};

export default Table;
