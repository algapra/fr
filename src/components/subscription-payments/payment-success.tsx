import React, { ChangeEvent, ElementType, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, Box, Typography, styled, ButtonProps } from '@mui/material';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

const SuccessPayment = ({ open, onClose, isEditMode }: any) => {
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [room, setRoom] = useState([]);
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/15.png')
  const [inputValue, setInputValue] = useState<string>('')

  const handleDepartmentChange = (event: any) => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);

    // Reset role when department changes
    setRole('');
    setRoom([]);
  };

  const getRoleOptions = () => {
    switch (department) {
      case 'engineer':
        return ['Backend Developer', 'Frontend Developer'];
      case 'product':
        return ['UI Designer', 'UX Designer'];
      default:
        return [];
    }
  };

  const getRoomOptions = () => {
    switch (department) {
      case 'engineer':
        return ['11A', '11C'];
      case 'product':
        return ['11B', '11D'];
      default:
        return [];
    }
  };

  const handleRoomChange = (event: any) => {
    setRoom(event.target.value);
  };

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/avatars/15.png')
  }


  const handleSubmit = () => {
    if (isEditMode) {
      // Handle edit form submission
    } else {
      // Handle add form submission
    }
    onClose();
  };

  return (
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
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        {isEditMode ? 'Edit Member' : 'Add Member'}
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <form>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                    Reset
                  </ResetButtonStyled>
                  <Typography sx={{ mt: 4, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='ID Member'
                placeholder='M12332300'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth placeholder='John' label='First Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth placeholder='Doe' label='Last Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='department-select'>Department</InputLabel>
                <Select
                  labelId='department-select'
                  value={department}
                  onChange={handleDepartmentChange}
                  label='Department'
                >
                  <MenuItem value=''>Select Department</MenuItem>
                  <MenuItem value='engineer'>Engineer</MenuItem>
                  <MenuItem value='product'>Product</MenuItem>
                  <MenuItem value='research'>Research</MenuItem>
                  <MenuItem value='marketing'>Marketing</MenuItem>
                  <MenuItem value='design'>Design</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='role-select'>Role</InputLabel>
                <Select
                  labelId='role-select'
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  label='Role'
                >
                  <MenuItem value=''>Select Role</MenuItem>
                  {getRoleOptions().map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='room-select'>Room</InputLabel>
                <Select
                  labelId='room-select'
                  value={room}
                  onChange={handleRoomChange}
                  label='Room'
                  multiple
                >
                  <MenuItem value=''>Select Room</MenuItem>
                  {getRoomOptions().map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth placeholder='10' label='Maximal Access' />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
          {isEditMode ? 'Save' : 'Create'}
        </Button>
        <Button variant='outlined' color='secondary' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPayment;
