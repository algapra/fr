import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';

const AddOrEditAccessDialog = ({ open, onClose, isEditMode }: any) => {
  const [department, setDepartment] = useState('');
  const [room, setRoom] = useState([]);

  const handleDepartmentChange = (event: any) => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);

    // Reset role when department changes
    setRoom([]);
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
      aria-labelledby='add-or-edit-role'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      aria-describedby='add-or-edit-role-description'
    >
      <DialogTitle
        id='add-or-edit-role'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        {isEditMode ? 'Edit Role' : 'Add Role'}
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
            <Grid item xs={12}>
              <TextField fullWidth placeholder='Fullstack Developer' label='Role Name' />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField fullWidth placeholder='10' label='Quote Access' />
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

export default AddOrEditAccessDialog;
