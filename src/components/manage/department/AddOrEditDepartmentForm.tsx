import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useDepartment } from '@/src/hooks/useDepartment';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Department } from '@/src/services/departments';

const AddOrEditDepartmentDialog = ({
  open,
  onClose,
  isEditMode,
  data,
}: any) => {
  const {
    refreshDepartments,
    createDepartment,
    updateDepartment,
    checkDepartmentProperty,
  } = useDepartment();

  interface FormDataDepartment {
    department: string;
  }

  const departmentSchema: yup.SchemaOf<FormDataDepartment> = yup
    .object()
    .shape({
      department: yup.string().required(),
    });

  const {
    control: departmentControl,
    setError: setDepartmentError,
    handleSubmit: handleDepartmentSubmit,
    formState: { errors: departmentErrors },
  } = useForm<FormDataDepartment>({
    mode: 'onBlur',
    resolver: yupResolver(departmentSchema),
  });

  const handleSubmit = (d: Department) => {
    if (isEditMode) {
      updateDepartment(data.id as string, d);
      refreshDepartments();
      onClose();
    } else {
      if (d?.department) {
        checkDepartmentProperty('department', {
          department: d.department,
        })
          .then(() => {
            createDepartment(d);
            refreshDepartments();
            onClose();
          })
          .catch(() => {
            setDepartmentError('department', {
              type: 'manual',
              message: 'Department already exists',
            });
          });
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='add-or-edit-department'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      aria-describedby='add-or-edit-department-description'
    >
      <DialogTitle
        id='add-or-edit-department'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
          pt: theme => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
        }}
      >
        {isEditMode ? 'Edit Department' : 'Add Department'}
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
        }}
      >
        <form
          onSubmit={handleDepartmentSubmit(d => {
            handleSubmit(d as Department);
          })}
        >
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='department'
                  control={departmentControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      defaultValue={isEditMode ? data.department : ''}
                      onBlur={onBlur}
                      label='Department'
                      onChange={onChange}
                      placeholder='Engineer'
                      error={Boolean(departmentErrors.department)}
                    />
                  )}
                />
                {departmentErrors.department && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {departmentErrors.department.message}
                  </FormHelperText>
                )}
              </FormControl>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                  pb: theme => [
                    `${theme.spacing(8)} !important`,
                    `${theme.spacing(12.5)} !important`,
                  ],
                }}
              >
                <Button variant='contained' sx={{ mr: 2 }} type='submit'>
                  {isEditMode ? 'Save' : 'Create'}
                </Button>
                <Button variant='outlined' color='secondary' onClick={onClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditDepartmentDialog;
