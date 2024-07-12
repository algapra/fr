import React, { ChangeEvent, ElementType, useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  Typography,
  styled,
  ButtonProps,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { useMember } from '@/src/hooks/useMember';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import to from 'await-to-js';
import { apiRequest } from '@/src/utils/request';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const AddOrEditMemberDialog = ({ open, onClose, isEditMode, data }: any) => {
  const { refreshMembers, createMember, updateMember, checkMemberProperty } =
    useMember();

  interface FormDataMember {
    fullName: string;
    nik: string;
    role: string;
    statuses: string;
  }

  const memberSchema: yup.SchemaOf<FormDataMember> = yup.object().shape({
    fullName: yup.string().required('Fullname harus diisi'),
    nik: yup.string().required('ID Member harus diisi'),
    role: yup.string().required('Role harus diisi'),
    statuses: yup.string().required('Status harus diisi'),
  });

  const {
    control: memberControl,
    setError: setMemberError,
    handleSubmit: handleMemberSubmit,
    formState: { errors: memberErrors },
    reset,
  } = useForm<FormDataMember>({
    mode: 'onBlur',
    resolver: yupResolver(memberSchema),
    defaultValues: {
      fullName: isEditMode ? data.fullName : '',
      nik: isEditMode ? data.nik : '',
      role: isEditMode ? data.role : '',
      statuses: isEditMode ? data.statuses[0].type : '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        fullName: isEditMode ? data.fullName : '',
        nik: isEditMode ? data.nik : '',
        role: isEditMode ? data.role : '',
        statuses: isEditMode ? data.statuses[0].type : '',
      });
    }
  }, [open, isEditMode, data, reset]);

  const [imgSrc, setImgSrc] = useState<string>(data?.avatar ?? '/images/avatars/15.png');
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      const selectedFile = files[0];
      if (selectedFile.size <= 1024 * 1024) {
        reader.onload = () => {
          setImgSrc(reader.result as string);
          if (reader.result !== null) {
            setInputValue(reader.result as string);
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert('Please select an image with a size less than 1MB.');
        setImgSrc(imgSrc);
        setInputValue(inputValue);
      }
    }
  };
  const handleInputImageReset = () => {
    setInputValue('');
    setImgSrc('/images/avatars/15.png');
  };

  async function uploadImageToRegister(
    image_data: any,
    user_id: string,
    user_name: string,
  ) {
    const [err] = await to(
      apiRequest.post(
        '/face-recognition/register',
        {
          image: image_data,
          user_id: user_id,
          user_name: user_name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    if (err) {
      console.log('Gagal mengunggah gambar ke server', err);

      return;
    }
  }

  const handleSubmit = (d: FormDataMember) => {
    setLoading(true); 
    if (isEditMode) {
      updateMember(data.id as string, d);
      refreshMembers();
      onClose();
      setLoading(false);
    } else {
      if (d?.nik) {
        checkMemberProperty('nik', {
          nik: d.nik,
        })
          .then(() => {
            createMember({ ...d, avatar: inputValue }).then(data => {
              uploadImageToRegister(
                inputValue,
                data.data.id,
                d.fullName,
              ).then(() => {
                refreshMembers();
                onClose();
                setLoading(false);
              });
            });
          })
          .catch(() => {
            setMemberError('nik', {
              type: 'manual',
              message: 'ID Member already exists',
            });
            setLoading(false);
          });
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='add-or-edit-member'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
        aria-describedby='add-or-edit-member-description'
      >
        <DialogTitle
          id='add-or-edit-member'
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
          {isEditMode ? 'Edit Member' : 'Add Member'}
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
            onSubmit={handleMemberSubmit(d => {
              handleSubmit(d as any);
            })}
          >
            <Grid container spacing={6}>
              <Grid
                item
                xs={12}
                className={`${isEditMode ? 'flex items-center' : ''}`}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled src={imgSrc} alt='Profile Pic' />
                  {!isEditMode && (
                    <Grid>
                      <ButtonStyled
                        component='label'
                        variant='contained'
                        htmlFor='account-settings-upload-image'
                      >
                        Upload New Photo
                        <input
                          hidden
                          type='file'
                          value={undefined}
                          defaultValue={data?.avatar}
                          accept='image/png, image/jpeg'
                          onChange={handleInputImageChange}
                          id='account-settings-upload-image'
                        />
                      </ButtonStyled>
                      <ResetButtonStyled
                        color='secondary'
                        variant='outlined'
                        onClick={handleInputImageReset}
                      >
                        Reset
                      </ResetButtonStyled>
                      <Typography sx={{ mt: 4, color: 'text.disabled' }}>
                        Allowed PNG or JPEG. Max size of 800K.
                      </Typography>
                    </Grid>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='nik'
                    control={memberControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        value={value}
                        onBlur={onBlur}
                        label='ID Member'
                        onChange={onChange}
                        placeholder='M1343123'
                        error={Boolean(memberErrors.nik)}
                      />
                    )}
                  />
                  {memberErrors.nik && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {memberErrors.nik.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='fullName'
                    control={memberControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        value={value}
                        fullWidth
                        onBlur={onBlur}
                        label='Full Name'
                        onChange={onChange}
                        placeholder='John Doe'
                        error={Boolean(memberErrors.fullName)}
                      />
                    )}
                  />
                  {memberErrors.fullName && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {memberErrors.fullName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='statuses'
                    control={memberControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <InputLabel id='status-select'>Status</InputLabel>
                        <Select
                          labelId='status-select'
                          onBlur={onBlur}
                          value={value}
                          onChange={onChange}
                          label='Status'
                        >
                          <MenuItem value=''>Select Status</MenuItem>
                          <MenuItem value='Active'>Active</MenuItem>
                          <MenuItem value='Inactive'>Inactive</MenuItem>
                        </Select>
                      </>
                    )}
                  />
                  {memberErrors.statuses && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {memberErrors.statuses.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='role'
                    control={memberControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <InputLabel id='role-select'>Role</InputLabel>
                        <Select
                          labelId='role-select'
                          onBlur={onBlur}
                          value={value}
                          onChange={onChange}
                          label='Role'
                        >
                          <MenuItem value=''>Select Role</MenuItem>
                          <MenuItem value='Backend Developer'>
                            Backend Developer
                          </MenuItem>
                          <MenuItem value='Frontend Developer'>
                            Frontend Developer
                          </MenuItem>
                          <MenuItem value='Fullstack Developer'>
                            Fullstack Developer
                          </MenuItem>
                          <MenuItem value='UI/UX Designer'>
                            UI/UX Designer
                          </MenuItem>
                          <MenuItem value='QA'>QA</MenuItem>
                        </Select>
                      </>
                    )}
                  />
                  {memberErrors.role && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {memberErrors.role.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
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
             {loading ? <CircularProgress disableShrink color='inherit' size={24}/> : isEditMode ? 'Save' : 'Create'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={onClose}>
              Cancel
            </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddOrEditMemberDialog;
